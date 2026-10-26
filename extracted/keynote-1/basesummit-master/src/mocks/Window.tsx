import { motion, useReducedMotion } from 'motion/react'
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Search, Bell, HelpCircle, Moon, Play, ChevronDown } from 'lucide-react'
import { useStep } from '../engine/step'
import { BrandMark, useBrand } from '../ui/Brand'

export interface FrameProps {
  /** Full mode: browser chrome with this URL. Omit for compact mode. */
  url?: string
  /** CSS zoom — a reflow, so type stays crisp. */
  zoom?: number
  width?: number
  children: ReactNode
}

export interface WindowProps extends FrameProps {
  x?: number
  y?: number
  /** Build step at which the window enters (default 0). */
  at?: number
  style?: CSSProperties
}

/** The product window itself, in normal flow: the app surface at its zoom,
 *  with browser chrome when it has a URL. The address bar names the configured
 *  brand's host, so the window matches the mark on the slide. */
export function Frame({ url, zoom = 1.3, width = 1540, children }: FrameProps) {
  const { domain } = useBrand()
  return (
    <div className="mk-window" style={{ zoom, width }}>
      {url && (
        <div className="mk-chrome">
          <i style={{ background: '#FE5F58' }} /><i style={{ background: '#FCBC3F' }} /><i style={{ background: '#34C648' }} />
          <div className="url"><b>{domain}</b>{url}</div>
        </div>
      )}
      {children}
    </div>
  )
}

/** A product window on the stage: enters once from below, then holds. Placed at
 *  its true size; whatever runs past the stage edge is cropped by the stage. */
export function Window({ x = 0, y = 0, at = 0, style, zoom = 1.3, width = 1540, ...frame }: WindowProps) {
  const step = useStep()
  const reduce = useReducedMotion()
  const on = step >= at
  return (
    <motion.div
      className="mk-place"
      style={{ left: x, top: y, width: width * zoom, ...style }}
      initial={at === 0 ? { opacity: 0, y: reduce ? 0 : 40 } : false}
      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 40 }}
      transition={{ duration: reduce ? 0 : 0.9, ease: [0.2, 0.8, 0.2, 1], delay: on && at === 0 ? 0.25 : 0 }}
    >
      <Frame zoom={zoom} width={width} {...frame} />
    </motion.div>
  )
}

/** The platform top bar every app shares — the configured brand's mark and
 *  name on the left, as the real header draws them. */
export function TopBar({ placeholder = 'Tìm kiếm…' }: { placeholder?: string }) {
  const { product } = useBrand()
  return (
    <div className="mk-topbar">
      <div className="brand"><i><BrandMark /></i>{product}</div>
      <div className="search"><Search size={14} />{placeholder}<kbd>Ctrl+K</kbd></div>
      <div className="icons">
        <HelpCircle size={17} />
        <span className="badge99"><Bell size={17} /><b>99+</b></span>
        <Moon size={17} />
        <Play size={15} />
        <span className="me" /><ChevronDown size={14} />
      </div>
    </div>
  )
}

interface CalloutProps {
  /** The `data-callout` value of the element inside a sibling window to ring. */
  target: string
  label?: ReactNode
  at?: number
  side?: 'down' | 'up' | 'right' | 'up-right' | 'down-right'
  pad?: number
  /** A popover rather than a one-line tag: the label wraps in a fixed-width box. */
  boxed?: boolean
}

interface Box { x: number; y: number; w: number; h: number }

const same = (a: Box, b: Box) =>
  Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) < 0.5 && Math.abs(a.w - b.w) < 0.5 && Math.abs(a.h - b.h) < 0.5

/** A cyan ring drawn around one element of a window at a build step — the
 *  speaker's finger. It measures the target, so zoom and layout never drift —
 *  and it only appears once the target has stopped moving, so a window that is
 *  still sliding in never leaves the ring where the window *was*. */
export function Callout({ target, label, at = 1, side = 'down', pad = 8, boxed }: CalloutProps) {
  const step = useStep()
  const on = step >= at
  const ref = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<Box | null>(null)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    const cell = el?.parentElement
    if (!el || !cell) return
    const measure = (strict: boolean): Box | null => {
      const t = cell.querySelector<HTMLElement>(`[data-callout="${target}"]`)
      if (!t) return null
      // A window still entering — or waiting at its start offset to — carries a
      // transform; measured then, the ring would sit where the window was.
      if (strict) {
        const tf = getComputedStyle(t.closest<HTMLElement>('.mk-place') ?? t).transform
        if (tf !== 'none' && tf !== 'matrix(1, 0, 0, 1, 0, 0)') return null
      }
      const cr = cell.getBoundingClientRect()
      const tr = t.getBoundingClientRect()
      // The stage is transform-scaled: screen px → stage px through the cell's own ratio.
      const scale = cell.offsetWidth ? cr.width / cell.offsetWidth : 1
      return {
        x: (tr.left - cr.left) / scale - pad,
        y: (tr.top - cr.top) / scale - pad,
        w: tr.width / scale + pad * 2,
        h: tr.height / scale + pad * 2,
      }
    }
    if (!on) { setReady(false); return }

    // Poll each frame until the target's box has held still for a few frames
    // (its window may still be entering), then place the ring and show it.
    let raf = 0
    let last: Box | null = null
    let still = 0
    const t0 = performance.now()
    const tick = () => {
      const b = measure(performance.now() - t0 < 3000)
      still = b && last && same(b, last) ? still + 1 : 0
      last = b
      if (b && (still >= 4 || performance.now() - t0 > 3000)) { setBox(b); setReady(true); return }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onResize = () => { const b = measure(false); if (b) setBox(b) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [target, pad, on])

  const shown = on && ready && !!box
  return (
    <motion.div
      ref={ref}
      className={`mk-callout ${side}${boxed ? ' boxed' : ''}`}
      style={box ? { left: box.x, top: box.y, width: box.w, height: box.h } : { left: 0, top: 0, width: 0, height: 0 }}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 1.04 }}
      transition={{ duration: shown ? 0.5 : 0.25, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {label && <span className="lbl">{label}</span>}
    </motion.div>
  )
}
