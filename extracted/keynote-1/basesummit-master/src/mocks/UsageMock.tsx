import { Settings, Bot, Cpu, BarChart3, User, DollarSign, Activity, Gauge, TrendingUp, Layers } from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec } from './parts'
import { AGENTS_RAIL } from './AgentsParts'

/* Daily cost, last 30 days — a jagged line that reads as real traffic. */
const DAYS = [34, 66, 65, 61, 68, 55, 42, 30, 62, 74, 70, 84, 80, 26, 24, 62, 76, 72, 70, 78, 33, 22, 60, 84, 66, 76, 30, 34, 82]
const LABELS = ['Aug 16', 'Aug 22', 'Aug 28', 'Sep 3', 'Sep 9', 'Sep 14']

const KPIS = [
  { c: '#3B82F6', Icon: DollarSign, l: 'Total spend', v: '$1,989', s: '$66.31 / day avg' },
  { c: '#6366F1', Icon: Activity, l: 'Requests', v: '112,927', s: '3,764 / day avg' },
  { c: '#A855F7', Icon: Cpu, l: 'Total tokens', v: '326.91M', s: '250.72M in · 76.19M out' },
  { c: '#14B8A6', Icon: Gauge, l: 'Avg cost / request', v: '$0.02', s: '2.9K tokens / req' },
]

const PROVIDERS = [
  { n: 'Anthropic', c: '#D97757', pct: 58, req: '42,104', v: '$1,163' },
  { n: 'OpenAI', c: '#10A37F', pct: 31, req: '38,660', v: '$617' },
  { n: 'Google', c: '#4285F4', pct: 11, req: '32,163', v: '$209' },
]
const TOKENS = [
  { n: 'Input', c: '#2563EB', pct: 77, v: '250.72M' },
  { n: 'Output', c: '#93C5FD', pct: 23, v: '76.19M' },
]

function Trend() {
  const W = 1000, H = 300, top = 20, bottom = 280
  const pts = DAYS.map((d, i) => [(i / (DAYS.length - 1)) * W, bottom - ((d - 15) / 75) * (bottom - top)] as const)
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const last = pts[pts.length - 1]
  return (
    <div className="mk-us-chart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="us-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3B82F6" stopOpacity="0.32" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[top, (top + bottom) / 2, bottom - 40, bottom].map(y => (
          <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="#E5E7EB" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
        ))}
        <polygon points={`0,${bottom} ${line} ${W},${bottom}`} fill="url(#us-fill)" />
        <polyline points={line} fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <i className="dot" style={{ right: 20, top: `${(last[1] / H) * 100}%` }} />
      <div className="x">{LABELS.map(l => <span key={l}>{l}</span>)}</div>
    </div>
  )
}

/* Settings › Usage: LLM consumption across providers for the last 30 days —
   the four numbers, the daily trend, and the split by provider and by token. */
export function UsageMock() {
  return (
    <>
      <TopBar />
      <div className="mk-app">
        <Rail active="settings" items={AGENTS_RAIL} />
        <div className="mk-side">
          <div className="title"><Settings size={15} />Settings</div>
          <SideRow icon={<Bot size={15} />} label="Agents" />
          <SideRow icon={<Cpu size={15} />} label="Models" />
          <SideRow icon={<BarChart3 size={15} />} label="Usage" on />
          <Sec>Account</Sec>
          <SideRow icon={<User size={15} />} label="Profile" />
        </div>
        <div className="mk-main mk-us">
          <div className="mk-head">
            <span className="crumb"><BarChart3 size={16} />Usage <span style={{ fontWeight: 400, color: 'var(--mk-muted)' }}>LLM consumption across providers — last 30 days</span></span>
            <span className="mk-us-seg">{['7d', '30d', '90d'].map(r => <span key={r} className={r === '30d' ? 'on' : undefined}>{r}</span>)}</span>
          </div>
          <div className="mk-us-body">
            <div className="mk-us-kpis">
              {KPIS.map(k => (
                <div key={k.l} className="mk-us-kpi" style={{ borderTopColor: k.c }}>
                  <div className="l"><i style={{ color: k.c, background: `color-mix(in srgb, ${k.c} 12%, #fff)` }}><k.Icon size={15} /></i>{k.l}</div>
                  <div className="v">{k.v}</div>
                  <div className="s">{k.s}</div>
                </div>
              ))}
            </div>
            <div className="mk-us-card">
              <div className="hd"><TrendingUp size={16} />Trend<span className="mk-us-seg">{['Cost', 'Requests', 'Tokens'].map(r => <span key={r} className={r === 'Cost' ? 'on' : undefined}>{r}</span>)}</span></div>
              <Trend />
            </div>
            <div className="mk-us-split">
              <div className="mk-us-card">
                <div className="hd"><Layers size={16} />Spend by provider</div>
                {PROVIDERS.map(p => (
                  <div key={p.n} className="mk-us-bar">
                    <div className="r"><i style={{ background: p.c }} />{p.n}<span className="pct">{p.pct}% · {p.req} req</span><b>{p.v}</b></div>
                    <div className="t"><span style={{ width: `${p.pct}%`, background: p.c }} /></div>
                  </div>
                ))}
              </div>
              <div className="mk-us-card">
                <div className="hd"><Cpu size={16} />Token mix</div>
                {TOKENS.map(p => (
                  <div key={p.n} className="mk-us-bar">
                    <div className="r"><i style={{ background: p.c }} />{p.n}<span className="pct">{p.pct}%</span><b>{p.v}</b></div>
                    <div className="t"><span style={{ width: `${p.pct}%`, background: p.c }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
