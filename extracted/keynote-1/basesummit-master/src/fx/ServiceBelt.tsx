import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import { SERVICES, TINT, TINT_BG, type Family, type Service } from './serviceBeltData'

/* The services belt from the rework landing page's "Run on the same model"
   act: lanes of service cards sliding alternate ways (pure CSS), and one
   service held open beside them that cycles every DWELL ms. The argument is
   the uniform card anatomy — a leave request and a $48k deal render from the
   same function — and, at fifty services in three lanes, the size of the
   list. Cards are white product surfaces on the navy stage, drawn at the
   reference's pixels and zoomed as a whole: the lanes a little under 1 so
   three fit the cell, the open service above 1 so the hall can read it. */

const DWELL = 6000
const LANES = 3
const LANE_ZOOM = 0.92
const SPOT_ZOOM = 1.15
/** Where the open service sits: on the frame's right edge (`--frame-x`). */
const FRAME_X = 140

/** The services with an open-service detail — what the spotlight cycles. */
const SPOT = SERVICES.filter(s => s.detail)

const Spark = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <rect x="2" y="2" width="4.6" height="4.6" rx="1.3" /><rect x="9.4" y="2" width="4.6" height="4.6" rx="1.3" />
    <rect x="2" y="9.4" width="4.6" height="4.6" rx="1.3" /><rect x="9.4" y="9.4" width="4.6" height="4.6" rx="1.3" />
  </svg>
)
const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15" /><path d="M14 7l5 5-5 5" /></svg>
const Rule = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M4 12h16M4 17h7" /><circle cx="18" cy="7" r="2.4" /><circle cx="14" cy="17" r="2.4" /></svg>

const FAMILY_ICON: Record<Family, ReactNode> = {
  sales: <><path d="M4 18l5-5 4 3 7-8" /><path d="M15 8h5v5" /></>,
  mkt: <path d="M3 6h18l-7 8v6l-4-2v-4z" />,
  work: <><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M8 12l3 3 5-6" /></>,
  people: <><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 0114 0" /></>,
  it: <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />,
}

/** One belt card — the same five blocks for every service. */
function Card({ s }: { s: Service }) {
  const edge = `${(50 / s.stages.length).toFixed(2)}%`
  return (
    <article className={`svb-card ${s.family}`}>
      <div className="svb-top"><span className="svb-dot" /><span className="svb-nm">{s.name}</span><span className="svb-app">{s.app}</span></div>
      <div className="svb-row">
        <span className="svb-lb">Input → Output</span>
        <div className="svb-io"><span>{s.input}</span><Arrow /><span className="out">{s.output}</span></div>
      </div>
      <div className="svb-row">
        <span className="svb-lb">Operational stages</span>
        <div className="svb-stgw">
          <div className="svb-rail" style={{ '--e': edge } as CSSProperties}>
            {s.stages.map(st => <span className="svb-st" key={st}><u /><i>{st}</i></span>)}
          </div>
          {s.stagesMore > 0 && <span className="svb-more">+{s.stagesMore}</span>}
        </div>
      </div>
      <div className="svb-row">
        <span className="svb-lb">Rules</span>
        <div className="svb-rule"><Rule /><p>{s.rule}{s.rulesMore > 0 && <em>+{s.rulesMore} nữa</em>}</p></div>
      </div>
      <div className="svb-row">
        <span className="svb-lb">Operators</span>
        <div className="svb-opr">
          <span className="svb-ops">
            {s.people.map(p => <span key={p} style={{ background: TINT[s.family] }}>{p}</span>)}
            {Array.from({ length: s.agents }, (_, k) => <span key={`a${k}`} className="ag"><Spark /></span>)}
          </span>
          <span className="svb-who">{s.people.length} người · {s.agents} agent</span>
        </div>
      </div>
    </article>
  )
}

/** The open-service detail, held beside the belt, one service at a time. */
function Spotlight({ start = 1 }: { start?: number }) {
  const [at, setAt] = useState(start)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setAt(n => (n + 1) % SPOT.length), DWELL)
    return () => clearTimeout(t)
  }, [at, reduce])
  const s = SPOT[at], d = s.detail!, c = TINT[s.family], bg = TINT_BG[s.family]
  const tint = { color: c, borderColor: `${c}33`, background: bg }
  const head = (label: string) => <div className="svb-h" style={{ color: c }}><u style={{ background: c }} />{label}</div>
  return (
    <aside className="svb-spot" aria-live="polite">
      <div className="svb-stop"><span className="now">Đang mở</span><span className="cnt">{at + 1} / {SPOT.length}</span></div>
      <div className="svb-bar"><i key={at} className={reduce ? '' : 'run'} style={{ '--dwell': `${DWELL}ms` } as CSSProperties} /></div>
      <div className="svb-in" key={`in-${at}`}>
        <div className="svb-head">
          <span className="ico" style={{ background: bg }}>
            <svg viewBox="0 0 24 24" style={{ stroke: c }} aria-hidden="true">{FAMILY_ICON[s.family]}</svg>
          </span>
          <div><h3>{s.name}</h3><span className="handle">{d.handle}</span></div>
        </div>
        <div className="svb-blk">{head('Mục tiêu')}<p className="goal">{d.goal}</p></div>
        <div className="svb-blk">
          {head('Output object')}
          <div className="svb-obj">
            {d.fields.slice(0, 4).map(([f, t]) => <div key={f}><b>{f}</b><i style={tint}>{t}</i></div>)}
          </div>
        </div>
        <div className="svb-blk">
          {head('Rules của service')}
          {d.rules.slice(0, 2).map((r, n) => <div className="svb-prule" key={r}><i style={tint}>0{n + 1}</i><p>{r}</p></div>)}
        </div>
        <div className="svb-blk">
          {head('Agent bên trong')}
          <div className="svb-agent"><span className="ic"><Spark /></span><div><b>{d.agent[0]}</b><p>{d.agent[1]}</p></div></div>
        </div>
      </div>
    </aside>
  )
}

export function ServiceBelt() {
  const lanes: Service[][] = Array.from({ length: LANES }, () => [])
  SERVICES.forEach((s, i) => lanes[i % LANES].push(s))
  return (
    <div className="svbelt">
      <div className="svb-lanes" style={{ zoom: LANE_ZOOM }}>
        {lanes.map((lane, i) => (
          <div className={`svb-lane ${'abc'[i]}`} key={i}>
            {/* twice over, so the loop point is seamless */}
            {[...lane, ...lane].map((s, k) => <Card s={s} key={`${s.name}-${k}`} />)}
          </div>
        ))}
      </div>
      <div className="svb-fade" aria-hidden="true" />
      <span className="svb-well" aria-hidden="true" />
      <div className="svb-spotwrap" style={{ zoom: SPOT_ZOOM, right: FRAME_X / SPOT_ZOOM }}>
        <Spotlight />
      </div>
    </div>
  )
}
