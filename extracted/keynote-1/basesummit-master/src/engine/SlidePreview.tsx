import { useEffect, useRef, useState, type ComponentType } from 'react'
import { MotionConfig } from 'motion/react'
import type { SlideProps } from './types'
import { StepContext } from './step'
import { DeckContext, SlideContext, type DeckInfo } from './deckContext'
import { useStageSize } from './Stage'

interface Props {
  component: ComponentType<SlideProps>
  /** The slide's title, for the breadcrumb along its top. */
  title?: string
  /** The breadcrumb, where it says more than the title. Defaults to the title. */
  crumb?: string
  /** Draw it under another keynote's name — the presenter previewing the
   *  next keynote's opener. Defaults to the deck it is rendered in. */
  deck?: DeckInfo
  /** The keynote's last slide, drawn with its *End of keynote* mark. */
  last?: boolean
  /** Build to draw. */
  step: number
  /** Freeze motion — every figure lands on its final frame and the canvas
   *  fields draw once instead of running a loop. For thumbnails. */
  still?: boolean
  /** Wait until it is scrolled into view before mounting. For long lists. */
  lazy?: boolean
}

/** A slide drawn at stage size and scaled to fit its box — the rail's
 *  thumbnails and the presenter's previews run the same slide code the stage
 *  runs, not pictures of it. (Not to be confused with `ui/SlideFrame`, which is
 *  the layout a slide is composed in.) */
export function SlidePreview({ component: C, title = '', crumb, last, deck, step, still = false, lazy = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { w: stageW, h: stageH } = useStageSize()
  const [scale, setScale] = useState(0)
  const [live, setLive] = useState(!lazy)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      const { width, height } = el.getBoundingClientRect()
      setScale(Math.min(width / stageW, height / stageH))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [stageW, stageH])

  // Long rails mount their previews as they are scrolled to, and keep them.
  useEffect(() => {
    const el = ref.current
    if (!el || live) return
    const io = new IntersectionObserver(
      es => { if (es.some(e => e.isIntersecting)) { setLive(true); io.disconnect() } },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [live])

  const slide = (
    <SlideContext.Provider value={{ title, crumb, last }}>
      <StepContext.Provider value={step}>
        <C step={step} />
      </StepContext.Provider>
    </SlideContext.Provider>
  )
  const body = deck ? <DeckContext.Provider value={deck}>{slide}</DeckContext.Provider> : slide
  return (
    <div className="slide-preview" ref={ref} aria-hidden>
      {live && scale > 0 && (
        // The matte is the slide's rendered rectangle to the pixel, so a border
        // drawn on it hugs the slide instead of the letterbox around it.
        <div className="slide-preview-matte" style={{ width: stageW * scale, height: stageH * scale }}>
          <div
            className="slide-preview-stage"
            style={{ width: stageW, height: stageH, transform: `scale(${scale})` }}
          >
            {still ? <MotionConfig reducedMotion="always">{body}</MotionConfig> : body}
          </div>
        </div>
      )}
    </div>
  )
}
