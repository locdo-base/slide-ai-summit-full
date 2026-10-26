import { createContext, useContext } from 'react'
import type { ChapterDef } from './types'

export interface DeckInfo {
  /** Keynote name — the first crumb along the top of every slide. */
  title: string
  /** Chapter labels, in talk order; the rail groups its slide list under them. */
  chapters: ChapterDef[]
}

export const DeckContext = createContext<DeckInfo>({ title: '', chapters: [] })
export const useDeck = () => useContext(DeckContext)

export interface SlideInfo {
  /** The slide's own title — the crumb after the keynote name. */
  title: string
  /** What the crumb says instead, where the slide gives one. */
  crumb?: string
  /** The keynote's last slide — it carries an *End of keynote* mark for the
   *  presenter. */
  last?: boolean
}

/** Provided per rendered slide: by the stage for the slide in play, and by
 *  every preview for the slide it draws — so a thumbnail names itself, not the
 *  slide on stage. */
export const SlideContext = createContext<SlideInfo>({ title: '' })
export const useSlide = () => useContext(SlideContext)
