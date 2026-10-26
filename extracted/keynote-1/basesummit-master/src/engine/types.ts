import type { ComponentType } from 'react'

/** A chapter id — one of the keynote's `chapters`. */
export type Chapter = string

export interface ChapterDef {
  id: Chapter
  label: string
}

export interface SlideProps {
  /** Current build step, 0 = the slide's initial state. */
  step: number
}

export interface SlideDef {
  id: string
  title: string
  /** The breadcrumb along the slide's top, where it should say more than the
   *  title. Defaults to the title. */
  crumb?: string
  /** Number of build steps AFTER the initial state (default 0). */
  steps?: number
  /** Run the build steps on the clock instead of the click, and move on to
   *  the next slide once the last step has had its hold. `true` paces the
   *  steps at AUTOPLAY_SECONDS each; a number is the seconds on each step; an
   *  array gives the seconds to hold on each step, the last entry being the
   *  hold on the final step before the next slide — `Infinity` there runs
   *  the steps on the clock but waits for the click to leave the slide. A
   *  click still advances early. The deck stops at its last slide. */
  autoplay?: boolean | number | number[]
  chapter?: Chapter
  /** Speaker notes — toggled on stage with `n`. */
  notes?: string
  /** Delivery cues pinned above the notes, highlighted — `|` separates them,
   *  e.g. `'Mark Zuck | Marc Benioff Styles'`. */
  keywords?: string
  component: ComponentType<SlideProps>
}

export interface Keynote {
  id: string
  title: string
  subtitle?: string
  /** Chapter labels, in talk order — the rail groups its slide list under them. */
  chapters?: ChapterDef[]
  slides: SlideDef[]
  /** Not yet built — listed on the launcher but not openable. */
  soon?: boolean
}
