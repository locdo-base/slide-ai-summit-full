import { SlideFrame } from '../../../ui/SlideFrame'
import { useStep } from '../../../engine/step'
import { Frame } from '../../../mocks/Window'
import { EmptyScreen } from '../../../mocks/Placeholder'
import { mock } from '../../../mocks/catalog'

/* Not a single system: an extensive platform, shown one category at a time —
   Work, HRM, Tuyển dụng, Giao tiếp, Bán hàng. The categories run down the left; the
   right shows one screen from the active one in a browser window that sits
   tight to the right and bottom edges of the stage. Each click moves on. A
   category without a drawn mock shows the empty window a capture will fill. */
interface Cat {
  key: string
  label: string
  /** A catalog mock to draw, or the name of the screenshot to come. */
  mock?: string
  placeholder?: string
  url: string
  /** The zoom that draws the mock SHOT_W wide in the row's window. */
  zoom?: number
}

const CATS: Cat[] = [
  { key: 'work', label: 'Work', mock: 'request-list', url: '/app/request/all' },
  { key: 'hrm', label: 'HRM', mock: 'hris', url: '/app/hris/employees' },
  { key: 'hiring', label: 'Tuyển dụng', mock: 'hiring', url: '/app/hiring/jobs/55861' },
  { key: 'communication', label: 'Giao tiếp', mock: 'message', url: '/app/message/company' },
  { key: 'sales', label: 'Bán hàng', mock: 'sales-pipeline', url: '/app/sales/pipeline' },
]

export const PLATFORM_STEPS = CATS.length - 1

/* The window's width: the figure's right column plus the stage's right padding. */
const SHOT_W = 1400

function Shot({ cat }: { cat: Cat }) {
  if (cat.mock) {
    const m = mock(cat.mock)
    const zoom = cat.zoom ?? 1   // 1:1 — below that the product type turns to mush once the stage scales down
    return <Frame url={cat.url} zoom={zoom} width={Math.round(SHOT_W / zoom)}><m.component /></Frame>
  }
  return <Frame url={cat.url} zoom={1} width={SHOT_W}><EmptyScreen label={cat.placeholder ?? cat.label} sub={cat.label} height={760} /></Frame>
}

export function PlatformSlide() {
  const step = useStep()
  const active = Math.min(step, CATS.length - 1)
  return (
    <SlideFrame
      layout="stack"
      headline="Một hệ thống software toàn diện."
      figureClass="platform-fig"
    >
      <div className="platform">
        <ol className="plat-groups">
          {CATS.map((c, i) => (
            <li key={c.key} className={`plat-group${i === active ? ' on' : ''}${i < active ? ' done' : ''}`}>
              <div className="plat-head"><b>{c.label}</b></div>
            </li>
          ))}
        </ol>
        <div className="plat-shot bleed">
          {CATS.map((c, i) => (
            <div key={c.key} className={`plat-screen${i === active ? ' on' : ''}`} aria-hidden={i !== active}>
              <div className="shot"><Shot cat={c} /></div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}
