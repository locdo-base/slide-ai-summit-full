import { createContext, useContext, type CSSProperties, type ReactNode } from 'react'
import { useStep } from '../engine/step'

/* A walk: a mock that moves through its pages one click at a time, and the
   slide that shows where it is. The slide wraps its screen in <Walk steps>
   (and declares steps.length - 1 build steps in the deck), the mock reads
   useWalk() to know which page to draw, and <WalkBar /> in the slide's text
   column lists the steps by their short names with a bar running on the
   current one — so the room knows what is on and what has been. The bar
   fills over the step's `ms` and then waits for the presenter's click —
   unless the slide is declared `autoplay: walkPace(steps)` in the deck, when
   the page turns by itself once its animation has played. */

export interface WalkStep {
  key: string
  /** The short name shown on the slide. */
  name: string
  /** How long the bar takes to fill, in ms — the pace of the page's own
   *  animation, not a deadline. */
  ms: number
}

interface WalkState { steps: WalkStep[]; index: number }
const Ctx = createContext<WalkState | null>(null)

/** Binds the walk to the slide's build step; children read it with useWalk(). */
export function Walk({ steps, children }: { steps: WalkStep[]; children: ReactNode }) {
  const step = useStep()
  const index = Math.max(0, Math.min(steps.length - 1, step))
  return <Ctx.Provider value={{ steps, index }}>{children}</Ctx.Provider>
}

/** The bar runs a quarter faster than the step's `ms` — Eric's pace. */
const PACE = 0.75

/** How long an autoplaying deck holds each page: until its bar has filled,
 *  plus a short beat. The last page holds for the presenter's click — the
 *  walk turns its own pages, but never leaves the slide by itself. Pass it
 *  as the slide's `autoplay`. */
export const walkPace = (steps: WalkStep[], holdMs = 300) =>
  steps.map((s, i) => (i === steps.length - 1 ? Infinity : (s.ms * PACE + holdMs) / 1000))

/** The walk this component is inside, or null when it stands alone (the gallery). */
export const useWalk = () => useContext(Ctx)

/** The indicator: every step's short name, a bar filling while it is on, full once it has been. */
export function WalkBar() {
  const w = useWalk()
  if (!w) return null
  return (
    <ol className="walk">
      {w.steps.map((st, i) => {
        const state = i < w.index ? 'done' : i === w.index ? 'now' : 'next'
        return (
          <li key={st.key} className={`walk-step ${state}`}>
            <span className="walk-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="walk-name">{st.name}</span>
            <span className="walk-track"><i key={`${state}-${i}`} style={{ '--dur': `${Math.round(st.ms * PACE)}ms` } as CSSProperties} /></span>
          </li>
        )
      })}
    </ol>
  )
}
