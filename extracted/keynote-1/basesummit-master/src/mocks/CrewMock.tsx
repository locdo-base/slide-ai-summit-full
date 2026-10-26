import { Plus, Users } from 'lucide-react'

interface A { name: string; role: string; reports?: string; adapter: string; spend: number; budget: number; live?: boolean; n?: number }

const ENG: A[] = [
  { name: 'CTO', role: 'Chief Technology Officer · Manager', adapter: 'claude_local', spend: 22, budget: 100, n: 3 },
  { name: 'ClaudeCoder', role: 'Senior Engineer (Claude)', reports: 'CTO', adapter: 'claude_local', spend: 184, budget: 300, live: true },
  { name: 'CodexCoder', role: 'Senior Engineer (Codex)', reports: 'CTO', adapter: 'codex_local', spend: 96, budget: 300 },
  { name: 'Reviewer', role: 'Code Reviewer', reports: 'CTO', adapter: 'claude_local', spend: 41, budget: 120, live: true },
]
const MKT: A[] = [
  { name: 'CMO', role: 'Chief Marketing Officer · Manager', adapter: 'claude_local', spend: 12, budget: 80, n: 2 },
  { name: 'Writer', role: 'Senior Copywriter', reports: 'CMO', adapter: 'gemini_local', spend: 58, budget: 150, live: true },
  { name: 'Designer', role: 'Brand Designer', reports: 'CMO', adapter: 'claude_local', spend: 27, budget: 150 },
]

function Card({ a, mark }: { a: A; mark?: boolean }) {
  return (
    <div className="card">
      <div className="top"><Users size={15} color="#2563EB" /><span className="nm">{a.name}</span>{a.live && <span className="live" />}</div>
      <div className="role">{a.role}</div>
      <div className="rep">{a.reports ? `reports to ${a.reports}` : `${a.n} reports`}</div>
      <div className="bud" {...(mark ? { 'data-callout': 'budget' } : {})}>
        <div className="l"><span>this month</span><b>${a.spend} / ${a.budget}</b></div>
        <div className="bar"><i style={{ width: `${Math.round((a.spend / a.budget) * 100)}%` }} /></div>
      </div>
      <div className="ft"><code>{a.adapter}</code>{a.live && <span>· live</span>}</div>
    </div>
  )
}

/* Crew: agents as an org chart with a payroll — roles, reporting lines, a
   monthly budget each, and the button that adds one more. */
export function CrewMock() {
  return (
    <div className="mk-pane">
      <div className="ph">Agents <span className="sub">Northwind Logistics · 9 agents in 3 workspaces</span>
        <span className="right"><span className="mk-btn" data-callout="hire"><Plus size={14} />Hire agent</span></span></div>
      <div className="mk-crew">
        <div className="ws">Engineering</div>
        <div className="grid">{ENG.map((a, i) => <Card key={a.name} a={a} mark={i === 1} />)}</div>
        <div className="ws">Marketing</div>
        <div className="grid">{MKT.map(a => <Card key={a.name} a={a} />)}</div>
      </div>
    </div>
  )
}
