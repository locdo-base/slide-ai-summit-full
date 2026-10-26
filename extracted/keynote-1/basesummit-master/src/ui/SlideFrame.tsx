import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Chapter } from '../engine/types'
import { useDeck, useSlide } from '../engine/deckContext'
import { Reveal } from './Reveal'
import { Brand } from './Brand'

/** Figures are drawn at the size that reads best on a 2:1 stage. On a shorter
 *  stage — 3:1, say — this scales the whole figure down to the room it has,
 *  rather than letting it run off the bottom. At 2:1 it is a no-op, and a
 *  `bleed` figure (product windows that leave the stage on purpose) opts out. */
function FitFigure({ className, children }: { className?: string; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const fit = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const off = className?.split(' ').includes('bleed')

  useEffect(() => {
    const b = box.current, f = fit.current
    if (!b || !f || off) return
    // offsetWidth/Height are the untransformed layout size, so measuring never
    // has to undo the scale we are about to apply.
    const measure = () => {
      const k = Math.min(1, b.clientHeight / f.offsetHeight, b.clientWidth / f.offsetWidth)
      setScale(Number.isFinite(k) && k > 0 ? k : 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(b)
    ro.observe(f)
    return () => ro.disconnect()
  }, [off])

  return (
    <div className={`frame-figure${className ? ' ' + className : ''}`} ref={box}>
      <div className="frame-fit" ref={fit} style={off || scale === 1 ? undefined : { transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

/** The crumb separator — a chevron on the 16 grid, sized by the text it sits in. */
function Chevron() {
  return (
    <svg className="crumb-sep" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 3.5 4.5 4.5L6 12.5" />
    </svg>
  )
}

/** One line the presenter wants to remember, under the lead. A string shows
 *  from the slide's first state; an object can be bound to a build step, or
 *  given a `delay` in seconds to arrive on its own. */
export type Cue = string | { text: ReactNode; at?: number; until?: number; delay?: number }

interface Props {
  /** The chapter the slide sits in. Accepted for the slide files that pass it;
   *  the header draws a breadcrumb now, not chapter words. */
  chapter?: Chapter
  /** Short memory lines under the lead — a talk without a notes screen still
   *  has its beats on the slide. Keep them to a phrase each. */
  cues?: Cue[]
  /** Hide the keynote name and chapter words (title / closing slides); the
   *  brand stays. */
  bare?: boolean
  headline?: ReactNode
  lead?: ReactNode
  /** A second lead that replaces the first from step `lead2At` on. */
  lead2?: ReactNode
  lead2At?: number
  /** A third lead that replaces the second from step `lead3At` on. */
  lead3?: ReactNode
  lead3At?: number
  layout?: 'split' | 'stack' | 'center'
  headAt?: number
  leadAt?: number
  /** Whether the lead's room is held before it shows (default). `false` gives
   *  the figure that room until the lead arrives; the fit box then scales the
   *  figure down to make way. */
  leadKeep?: boolean
  /** Extra class on the figure cell, e.g. "bleed" for product windows. */
  figureClass?: string
  /** Under the leads, in the text column: the presenter's cues (`ui/Cues`) —
   *  the few words that stand in for speaker notes when there is no notes
   *  screen in the hall. */
  aside?: ReactNode
  children?: ReactNode
}

/** The one slide layout: a breadcrumb along the top — brand │ keynote › slide
 *  — a headline and one lead line, and the figure. Split puts the figure
 *  beside the words; stack puts it beneath. */
export function SlideFrame({ bare, layout = 'split', lead2At = 1, lead3At = 2, headAt = 0, leadAt = 0, leadKeep = true, figureClass, aside, cues, children, ...copy }: Props) {
  const { title } = useDeck()
  const { title: slide, crumb, last } = useSlide()
  const headline = copy.headline, lead = copy.lead, lead2 = copy.lead2, lead3 = copy.lead3
  const cueList = cues?.map(c => (typeof c === 'string' ? { text: c } : c))
  return (
    <div className={`frame frame-${layout}`}>
      <div className="frame-top">
        <div className="frame-brand">
          <Brand />
          {!bare && title && (
            <span className="frame-crumbs">
              <span className="frame-deck">{title}</span>
              {/* An opener named after its keynote shows the one crumb. */}
              {slide && slide !== title && <><Chevron /><span className="frame-slide">{crumb ?? slide}</span></>}
            </span>
          )}
        </div>
      </div>
      <div className="frame-body">
        {(headline || lead || aside || cueList) && (
          <div className="frame-text">
            {headline && <Reveal at={headAt}><h1 className="h1">{headline}</h1></Reveal>}
            {lead && (
              <div className="lead-stack">
                <Reveal at={leadAt} until={lead2 ? lead2At : undefined} delay={headAt === leadAt ? 0.18 : 0} keep={leadKeep}>
                  <p className="lead">{lead}</p>
                </Reveal>
                {lead2 && (
                  <Reveal at={lead2At} until={lead3 ? lead3At : undefined} delay={0.2}>
                    <p className="lead">{lead2}</p>
                  </Reveal>
                )}
                {lead3 && (
                  <Reveal at={lead3At} delay={0.2}>
                    <p className="lead">{lead3}</p>
                  </Reveal>
                )}
              </div>
            )}
            {cueList && (
              <ul className="cues">
                {cueList.map((c, i) => (
                  <Reveal key={i} at={c.at ?? 0} until={c.until} delay={c.delay ?? (c.at ? 0 : 0.35 + i * 0.08)} from="none" keep={!c.at && !c.until}>
                    <li>{c.text}</li>
                  </Reveal>
                ))}
              </ul>
            )}
            {aside}
          </div>
        )}
        {children && <FitFigure className={figureClass}>{children}</FitFigure>}
      </div>
      {/* The presenter's cue that the next click leaves the keynote. */}
      {last && <div className="frame-end">End of keynote</div>}
    </div>
  )
}
