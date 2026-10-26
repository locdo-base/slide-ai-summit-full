import { Home, BookOpen, ClipboardList, Inbox, Hash, Archive, Sparkles, Search, Building2, Layers, ClipboardCheck, Plus, Filter, ArrowUpDown } from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Pill } from './parts'

const RAIL = [
  { key: 'rules', label: 'Rules', Icon: BookOpen },
  { key: 'tasks', label: 'Tasks', Icon: Layers },
  { key: 'assessment', label: 'Assessment', Icon: ClipboardCheck },
  { key: 'company', label: 'Company', Icon: Building2 },
]

type Kind = 'Policy' | 'Guideline' | 'Skill' | 'Playbook'
const KIND: Record<Kind, string> = { Policy: 'medium', Guideline: 'green', Skill: 'violet', Playbook: 'cyan' }

interface Rule {
  code: string
  name: string
  kind: Kind
  services?: string[]
  agents?: string[]
  scope: string
  regs: string
  status: 'Published' | 'In review' | 'Draft'
  updated: string
  /** `data-callout` hooks for the slide's rings. */
  mark?: boolean
}

const RULES: Rule[] = [
  { code: 'POL-009', name: 'Discount authority', kind: 'Policy', services: ['Sales pipeline'], agents: ['Deal copilot'], scope: 'Sales · EMEA', regs: 'Never exceed 15% without CFO sign-off · 4 more', status: 'Published', updated: '2 days ago', mark: true },
  { code: 'POL-014', name: 'Travel and expense policy', kind: 'Policy', services: ['Expenses'], scope: 'All staff', regs: 'Trip > $1,500 → budget owner approves · 3 more', status: 'Published', updated: '2 days ago' },
  { code: 'SKL-007', name: 'Quote review', kind: 'Skill', services: ['Sales pipeline'], agents: ['Deal copilot'], scope: 'Quotes over $10k', regs: 'Price only from the pricing engine · never invent a number', status: 'Published', updated: '5 days ago' },
  { code: 'GDL-021', name: 'Approval SLA', kind: 'Guideline', services: ['Requests'], agents: ['Request copilot'], scope: 'Managers', regs: 'Respond within 2 working days · escalate on day 3', status: 'Published', updated: '1 week ago' },
  { code: 'SKL-011', name: 'Invoice extraction', kind: 'Skill', services: ['Accounts payable'], agents: ['Contract Reader'], scope: 'Supplier invoices', regs: 'PO number missing → null, never guess', status: 'Published', updated: '1 week ago' },
  { code: 'GDL-018', name: 'Design review rubric v2', kind: 'Guideline', services: ['Work review'], agents: ['Reviewer'], scope: 'Product · Design', regs: 'Quality 40 · Timeliness 25 · Collaboration 20 · Docs 15', status: 'Published', updated: '2 weeks ago' },
  { code: 'POL-031', name: 'Customer data handling', kind: 'Policy', agents: ['All agents'], scope: 'Company-wide', regs: 'Never email customer data · redact PII in summaries', status: 'Published', updated: '3 weeks ago' },
  { code: 'PLB-003', name: 'Renewal playbook', kind: 'Playbook', services: ['Renewals'], agents: ['Renewal agent'], scope: 'Customer success', regs: '6 steps · start 90 days before term end', status: 'In review', updated: 'today' },
  { code: 'POL-033', name: 'Remote work policy', kind: 'Policy', scope: 'All staff', regs: 'Draft — 2 sections open', status: 'Draft', updated: 'yesterday' },
]

/* Rules › All rules: every rule in the company in one register — its kind,
   the service or agent it is linked to, its scope and the regulations it
   carries. A rule is a first-class entity, like a service. */
export function RulesListMock() {
  return (
    <>
      <TopBar placeholder="Search rules…" />
      <div className="mk-app">
        <Rail active="rules" items={RAIL} />
        <div className="mk-side">
          <div className="title"><BookOpen size={15} />Work rules</div>
          <SideRow icon={<Home size={15} />} label="Home" />
          <SideRow icon={<BookOpen size={15} />} label="Rules" on />
          <SideRow icon={<ClipboardList size={15} />} label="Assignments" />
          <SideRow icon={<Inbox size={15} />} label="Inbox" />
          <Sec>SERVICES</Sec>
          <SideRow ltr="P" color="#2563EB" label="Policies" chev />
          <SideRow ltr="G" color="#16A34A" label="Guidelines" chev />
          <SideRow ltr="S" color="#7C3AED" label="Skills" chev />
          <SideRow ltr="P" color="#0891B2" label="Playbooks" chev />
          <Sec>CHANNELS</Sec>
          <SideRow icon={<Hash size={14} />} label="all-staff" />
          <SideRow icon={<Hash size={14} />} label="finance" />
          <SideRow icon={<Hash size={14} />} label="sales" />
          <Sec>&nbsp;</Sec>
          <SideRow icon={<Archive size={15} />} label="Archived" />
          <SideRow icon={<Sparkles size={15} />} label="Ask Workrules" />
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb">Rules <span className="sep">·</span> <span style={{ fontWeight: 500, color: 'var(--mk-muted)' }}>48 rules across the company · 41 published · 7 in review</span></span>
            <span className="mk-btn ghost" style={{ marginLeft: 'auto' }}><Filter size={14} />Filter</span>
            <span className="mk-btn ghost" style={{ marginLeft: 0 }}><ArrowUpDown size={14} />Updated</span>
            <span className="mk-btn" style={{ marginLeft: 0 }}><Plus size={14} />New rule</span>
          </div>
          <div className="mk-filters">
            {['All', 'Policies', 'Guidelines', 'Skills', 'Playbooks'].map((f, i) => <span key={f} className={i === 0 ? 'on' : undefined}>{f}</span>)}
            <span style={{ border: 0, color: 'var(--mk-dim)' }}>|</span>
            <span><Layers size={11} style={{ verticalAlign: -1, marginRight: 4 }} />Linked to a service</span>
            <span><Sparkles size={11} style={{ verticalAlign: -1, marginRight: 4 }} />Linked to an agent</span>
          </div>
          <div className="mk-search" style={{ margin: '12px 16px 0' }}>
            <Search size={15} />Search rules — by keyword, by meaning, or ask…
          </div>
          <div className="mk-rules">
            <div className="mk-table">
              <table>
                <thead>
                  <tr><th>Rule</th><th>Kind</th><th>Linked to</th><th>Scope</th><th>Regulations</th><th>Status</th><th>Updated</th></tr>
                </thead>
                <tbody>
                  {RULES.map(r => (
                    <tr key={r.code}>
                      <td><div className="from"><b style={{ color: 'var(--mk-ink)' }}>{r.name}</b><small>{r.code}</small></div></td>
                      <td><Pill kind={KIND[r.kind]}>{r.kind}</Pill></td>
                      <td>
                        <span className="lk" data-callout={r.mark ? 'linked' : undefined}>
                          {r.services?.map(s => <Pill key={s} kind="grey"><Layers size={10} />{s}</Pill>)}
                          {r.agents?.map(a => <Pill key={a} kind="violet"><Sparkles size={10} />{a}</Pill>)}
                          {!r.services && !r.agents && <span style={{ color: 'var(--mk-dim)' }}>—</span>}
                        </span>
                      </td>
                      <td>{r.scope}</td>
                      <td><span className="regs" data-callout={r.mark ? 'regs' : undefined}>{r.regs}</span></td>
                      <td><Pill kind={r.status === 'Published' ? 'green' : r.status === 'In review' ? 'high' : 'grey'}>{r.status}</Pill></td>
                      <td style={{ color: 'var(--mk-muted)', whiteSpace: 'nowrap' }}>{r.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
