import { Package, MessageSquare, Target, CalendarCheck, Star, Award, BarChart3, FileText, Plus, ChevronRight, Building2, Layers, ClipboardCheck } from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Who } from './parts'

const RAIL = [
  { key: 'output', label: 'Output', Icon: Package },
  { key: 'tasks', label: 'Tasks', Icon: Layers },
  { key: 'assessment', label: 'Assessment', Icon: ClipboardCheck },
  { key: 'company', label: 'Company', Icon: Building2 },
]

const SERVICES = [
  { name: 'Revenue 2026', v: '$1,240,000', of: '$4,000,000', pct: 31 },
  { name: 'Deals closed', v: '38', of: '120', pct: 32 },
  { name: 'Reports delivered', v: '21', of: '60', pct: 35 },
]

const RECORDS = [
  { name: 'Northwind — annual plan', from: 'Deal D-2291', where: 'Sales pipeline', to: 'Revenue 2026', val: '$18,000', who: 'D', when: 'Jul 3' },
  { name: 'Contoso onboarding', from: 'Deal D-2278', where: 'Sales pipeline', to: 'Revenue 2026', val: '$12,500', who: 'Z', when: 'Jul 2' },
  { name: 'Q3 forecast', from: 'WR-1201', where: 'Finance work requests', to: 'Reports delivered', val: '1', who: 'J', when: 'Jul 2' },
  { name: 'Import wizard shipped', from: 'Job A-3040', where: 'Product workflow', to: 'Features shipped', val: '1', who: 'L', when: 'Jul 1' },
  { name: 'SaaS license audit', from: 'EXD-021', where: 'Executive directives', to: 'Cost savings', val: '$9,400', who: 'B', when: 'Jun 30' },
  { name: 'Renewal — Fabrikam', from: 'Account F-104', where: 'Customer success', to: 'Revenue 2026', val: '$18,000', who: 'V', when: 'Jun 30' },
]

/* The Outputs dashboard — deliverables counted from every app, each with the
   work it came from and the KPI it counts toward. */
export function OutputsMock() {
  return (
    <>
      <TopBar placeholder="Search outputs…" />
      <div className="mk-app">
        <Rail active="output" items={RAIL} />
        <div className="mk-side">
          <div className="title"><Package size={15} />Output</div>
          <SideRow icon={<MessageSquare size={15} />} label="Feedbacks" />
          <SideRow icon={<Package size={15} />} label="Outputs" on />
          <SideRow icon={<Target size={15} />} label="Goals" />
          <SideRow icon={<CalendarCheck size={15} />} label="Check-ins" />
          <SideRow icon={<Star size={15} />} label="Ratings" />
          <SideRow icon={<Award size={15} />} label="Rewards" />
          <Sec>&nbsp;</Sec>
          <SideRow icon={<BarChart3 size={15} />} label="Reports" />
          <SideRow icon={<FileText size={15} />} label="Templates" />
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb">Outputs</span>
            <span className="mk-view on">Dashboard</span><span className="mk-view">Records</span><span className="mk-view">Today</span>
            <span className="mk-btn"><Plus size={15} />Log output</span>
          </div>
          <div className="mk-out">
            <div className="who">Daniel's deliverables</div>
            <div className="mk-statgrid">
              <div className="mk-stat"><span className="l">Deals closed · this quarter</span><span className="v">12</span><span className="d">+3 this week</span></div>
              <div className="mk-stat"><span className="l">Revenue · this quarter</span><span className="v">$48,500</span><span className="d">+$30,500 this week</span></div>
              <div className="mk-stat"><span className="l">Reports delivered</span><span className="v">7</span><span className="d">+1 this week</span></div>
            </div>
            <div className="mk-table" data-callout="records">
              <div className="th">Recent records <span style={{ fontSize: 12, color: 'var(--mk-muted)', fontWeight: 500 }}>from every app, one register</span></div>
              <table>
                <thead><tr><th>Output</th><th>From</th><th>Counts toward</th><th style={{ textAlign: 'right' }}>Value</th><th>Owner</th><th>When</th></tr></thead>
                <tbody>
                  {RECORDS.map(r => (
                    <tr key={r.name}>
                      <td><b>{r.name}</b></td>
                      <td><span className="from"><span className="code" style={{ fontWeight: 700 }}>{r.from}</span><small>{r.where}</small></span></td>
                      <td>{r.to}</td>
                      <td className="val">{r.val}</td>
                      <td><Who p={r.who} /></td>
                      <td style={{ color: 'var(--mk-muted)' }}>{r.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mk-svcgrid">
              {SERVICES.map(s => (
                <div key={s.name} className="mk-svc-card">
                  <div className="n"><Package size={14} />{s.name}<ChevronRight size={14} /></div>
                  <div className="bar"><i style={{ width: `${s.pct}%` }} /></div>
                  <div className="f"><span><b>{s.v}</b> of {s.of}</span><span>{s.pct}% · company</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
