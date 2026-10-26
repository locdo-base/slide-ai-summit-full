import { useEffect, useRef, type CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'
import { useStageSize } from '../engine/Stage'

interface Props {
  /** Defaults to the stage, so the field fills whatever aspect ratio is set. */
  width?: number
  height?: number
  count?: number
  /** 0 = parallel lanes, 1 = every lane funnels to the right-centre. */
  converge?: number
  /** Mirror the field: lanes leave one point at the left and spread out. */
  diverge?: boolean
  style?: CSSProperties
}

/** Deterministic PRNG so the field looks the same every time the slide opens. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const smooth = (u: number) => u * u * (3 - 2 * u)

/** `#RRGGBB` (what the tokens hold) at a given alpha, for canvas fills. */
function fade(hex: string, alpha: number) {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex)
  if (!m) return `rgba(179,210,255,${alpha})`
  return `rgba(${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)},${alpha})`
}

interface P { x: number; y0: number; v: number; s: number; a: number; ph: number; f: number }

/** A canvas of luminous streaks moving left to right, gently funnelling toward
 *  one point — work from everywhere, flowing into one model. */
export function FlowField({ width: w, height: h, count = 170, converge = 0.55, diverge = false, style }: Props) {
  const stage = useStageSize()
  const width = w ?? stage.w
  const height = h ?? stage.h
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Streak colour comes from the palette, so the field follows the theme.
    const css = getComputedStyle(canvas)
    const tailCol = css.getPropertyValue('--blue-300').trim() || '#7FB4FF'
    const head = css.getPropertyValue('--blue-200').trim() || '#B3D2FF'
    const spark = css.getPropertyValue('--white').trim() || '#FFFFFF'

    const rnd = mulberry32(7)
    const ps: P[] = Array.from({ length: count }, () => ({
      x: rnd() * width,
      y0: 60 + rnd() * (height - 120),
      v: 40 + rnd() * 110,
      s: 1.2 + rnd() * 2.2,
      a: 0.12 + rnd() * 0.55,
      ph: rnd() * Math.PI * 2,
      f: 0.6 + rnd() * 1.2,
    }))
    const cy = height / 2
    const yAt = (p: P, x: number, t: number) => {
      const u = Math.min(1, Math.max(0, x / width))
      const k = 1 - converge * smooth(diverge ? 1 - u : u)
      return cy + (p.y0 - cy) * k + Math.sin(t * p.f + p.ph) * 6
    }

    let raf = 0
    let running = true
    let last = performance.now()
    let t = 0

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt
      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'
      for (const p of ps) {
        if (!reduce) {
          p.x += p.v * dt
          if (p.x > width + 60) { p.x = -60; p.y0 = 60 + rnd() * (height - 120) }
        }
        const y = yAt(p, p.x, t)
        const tail = p.v * 0.24 + 8
        const xt = p.x - tail
        const yt = yAt(p, xt, t)
        const g = ctx.createLinearGradient(xt, yt, p.x, y)
        g.addColorStop(0, fade(tailCol, 0))
        g.addColorStop(1, fade(head, p.a))
        ctx.strokeStyle = g
        ctx.lineWidth = p.s
        ctx.beginPath()
        ctx.moveTo(xt, yt)
        ctx.lineTo(p.x, y)
        ctx.stroke()
        ctx.fillStyle = fade(spark, Math.min(1, p.a + 0.3))
        ctx.beginPath()
        ctx.arc(p.x, y, p.s * 0.55, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduce && !document.hidden) raf = requestAnimationFrame(draw)
      else running = false
    }
    raf = requestAnimationFrame(draw)

    const onVis = () => {
      if (!document.hidden && !running && !reduce) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [width, height, count, converge, diverge, reduce])

  return <canvas ref={ref} style={{ width, height, display: 'block', ...style }} />
}
