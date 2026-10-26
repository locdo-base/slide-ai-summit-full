import type { ReactNode } from 'react'
import type { Chapter } from '../engine/types'
import { mock } from '../mocks/catalog'
import { Frame } from '../mocks/Window'
import { EmptyScreen } from '../mocks/Placeholder'
import { SlideFrame } from './SlideFrame'
import { Reveal } from './Reveal'

/** Every screen is drawn as a full app window this wide on the stage, whatever
 *  its catalog frame — the same wide window on every screen slide (the Tasks
 *  home's: 1540 at zoom 1.15). A screen's zoom only changes how big the app
 *  inside is drawn. */
const STAGE_WIDE = 1771

/** One product screen on a screen slide: a catalog mock, a capture under
 *  `public/screens`, or — empty mode — the labelled rectangle a capture will
 *  fill later. */
export interface Screen {
  /** A mock id from `src/mocks/catalog.tsx`. */
  mock?: string
  /** A capture, e.g. `/screens/settings.png` — takes over from `mock`. */
  src?: string
  /** No mock and no capture yet: the screen's name, drawn in an empty window. */
  placeholder?: string
  /** The address bar's path; defaults to the catalog frame's. */
  url?: string
  /** How big the app is drawn; defaults to the catalog frame's zoom. Raise it
   *  for an app drawn for a small frame, so it fills the wide window. */
  zoom?: number
  /** Build step it enters at. A second screen stands stepped down and right
   *  over the first. */
  at?: number
}

function ScreenWindow({ screen }: { screen: Screen }) {
  if (screen.src) return <img src={screen.src} alt="" style={{ width: STAGE_WIDE }} />
  if (screen.placeholder) {
    return (
      <Frame url={screen.url ?? '/app'} zoom={1} width={STAGE_WIDE}>
        <EmptyScreen label={screen.placeholder} />
      </Frame>
    )
  }
  const m = mock(screen.mock ?? '')
  const zoom = screen.zoom ?? m.frame.zoom
  return (
    <Frame url={screen.url ?? m.frame.url ?? '/app'} zoom={zoom} width={Math.round(STAGE_WIDE / zoom)}>
      <m.component />
    </Frame>
  )
}

interface Props {
  chapter?: Chapter
  headline: ReactNode
  lead?: ReactNode
  lead2?: ReactNode
  lead2At?: number
  /** The cues under the leads — see `ui/Cues`. */
  aside?: ReactNode
  screens: Screen[]
}

/** A slide whose proof is a product screen: the words in the left column, the
 *  screen to the right as a full app window, running off the stage's right and
 *  bottom edges. While a capture is on its way a catalog mock or an empty
 *  window stands in, and swapping it in is one prop — `{ src: '/screens/x.png' }`. */
export function ScreenSlide({ chapter, headline, lead, lead2, lead2At, aside, screens }: Props) {
  return (
    <SlideFrame chapter={chapter} layout="split" headline={headline} lead={lead} lead2={lead2} lead2At={lead2At} aside={aside} figureClass="bleed screens">
      {screens.map((s, i) => (
        <Reveal key={i} at={s.at ?? 0} className={`screen screen-${i + 1}`}>
          <div className="shot"><ScreenWindow screen={s} /></div>
        </Reveal>
      ))}
    </SlideFrame>
  )
}
