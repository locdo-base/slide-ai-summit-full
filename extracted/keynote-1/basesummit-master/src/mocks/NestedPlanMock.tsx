import { ChevronDown, ChevronRight, Link2, Target, Flag, Layers } from 'lucide-react'
import { Pill, Overdue, Due, Status, Tools, Team, Av, Who } from './parts'

/* Left: one work request at its real density, children inline, deeper levels
   one click away. Right: the plan pane — an alignment tree whose selected
   initiative links to the real work requests. */

export function NestedCardMock() {
  return (
    <div className="mk-pane" style={{ width: 640 }}>
      <div className="ph"><Layers size={15} />Work request <span className="sub">Facilities Maintenance</span><span className="right"><Pill kind="grey">FAC-518</Pill></span></div>
      <div className="pb" style={{ display: 'grid', gap: 10 }}>
        <div className="mk-card pinned">
          <div className="t"><Status /><span className="name link">HVAC repair in server room — temperature rising</span><Pill kind="critical" caret>Critical</Pill><Overdue /><Tools pinned /></div>
          <div className="m"><span className="code">FAC-518</span><span className="svc">Facilities Maintenance</span><Team code="BD" name="Building" /><Due d="Jul 4" /><span>Jul 3, 2026</span></div>
          <div className="kids">
            <div className="kid done"><Status done sm /><span className="code">FAC-520</span><span>Install temporary portable AC units</span></div>
            <div className="kid"><Status sm /><span className="code">FAC-519</span><span>Replace HVAC compressor unit B-7</span></div>
            <div className="kid" style={{ paddingLeft: 24 }}><Status sm /><span className="code">FAC-523</span><span>Order compressor from vendor</span><Pill kind="grey">sub of FAC-519</Pill></div>
            <div className="kid" style={{ paddingLeft: 48 }}><Status done sm /><span className="code">FAC-524</span><span>Approve purchase, Jane</span></div>
          </div>
          <div className="add">+ Add sub-request</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--mk-muted)' }}>
          <Link2 size={13} /> Linked to plan <b style={{ color: 'var(--mk-blue-ink)' }}>Roadmap 2026 › Enterprise self-serve › Onboarding</b>
        </div>
      </div>
    </div>
  )
}

const TREE = [
  { l: 0, kind: 'Plan', name: 'Roadmap 2026', own: 'E' },
  { l: 1, kind: 'Objective', name: 'Enterprise self-serve', own: 'B' },
  { l: 2, kind: 'Initiative', name: 'Onboarding', own: 'L', on: true },
  { l: 2, kind: 'Initiative', name: 'Import at scale', own: 'K' },
  { l: 1, kind: 'Objective', name: 'Revenue 2026', own: 'D' },
  { l: 2, kind: 'Milestone', name: 'Northwind live', own: 'Q' },
]

const LINKED = [
  { code: 'WR-1180', name: 'Launch enterprise onboarding', st: ['green', 'Active'] },
  { code: 'WR-1181', name: 'Design onboarding flow', st: ['green', 'Active'] },
  { code: 'WR-1182', name: 'Build self-serve setup', st: ['grey', 'Open'] },
  { code: 'FAC-518', name: 'HVAC repair in server room', st: ['critical', 'Overdue'] },
]

export function PlanPaneMock() {
  return (
    <div className="mk-pane" style={{ width: 760 }}>
      <div className="ph"><Target size={15} />Roadmap 2026 <span className="sub">48 items</span><span className="right"><Pill kind="cyan"><Link2 size={11} />linked to real work</Pill></span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px' }}>
        <div className="pb">
          <div className="mk-tree">
            {TREE.map((t, i) => (
              <div key={i} className={`ti l${t.l}${t.on ? ' on' : ''}`}>
                {t.l < 2 ? <ChevronDown size={13} /> : <Flag size={12} />}
                <span className="kind">{t.kind}</span><span>{t.name}</span>
                <span className="own"><Av p={t.own} size={16} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="pb" style={{ borderLeft: '1px solid var(--mk-line)', display: 'grid', gap: 10, alignContent: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--mk-ink)' }}>Linked work <Pill kind="grey">4</Pill><ChevronRight size={13} style={{ marginLeft: 'auto', color: 'var(--mk-dim)' }} /></div>
          <div className="mk-linked">
            {LINKED.map(r => (
              <div key={r.code} className="lr"><span className="code">{r.code}</span><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span><span className="pill"><Pill kind={r.st[0]}>{r.st[1]}</Pill></span></div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--mk-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>Owner <Who p="L" /> · progress rolls up from the work</div>
        </div>
      </div>
    </div>
  )
}
