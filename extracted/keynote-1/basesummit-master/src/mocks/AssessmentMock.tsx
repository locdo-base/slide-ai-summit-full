import {
  CircleDot, ClipboardList, ClipboardCheck, Building2, Menu, Home, Briefcase, Search, ChevronRight, ArrowLeft,
  Activity, GitFork, History, Gauge, Package, CalendarDays, CheckSquare, X, Sparkles, FileText,
  Pencil, Trash2, CheckCircle2, BookOpen,
} from 'lucide-react'
import { TopBar } from './Window'
import { Rail, Sec } from './parts'
import { useBrand } from '../ui/Brand'

/* Tasks › Executive Directives › EXD-020 › Reviews, with the Review drawer
   open on the right, as the product draws it: the record an agent wrote by
   following a rule. The rule (Vendor Performance v3) declares the criteria,
   their weights and the verdict bands; the agent reads the work, scores each
   criterion, says why — per criterion, citing the rule — and lists the steps
   it ran. Everything here is invented. */

const RAIL = [
  { key: 'tasks', label: 'Tasks', Icon: CircleDot },
  { key: 'plans', label: 'Plans', Icon: ClipboardList },
  { key: 'reviews', label: 'Reviews', Icon: ClipboardCheck },
  { key: 'company', label: 'Company', Icon: Building2 },
]

const REQUESTS: [string, string, string][] = [['E', 'Executive', '#334155'], ['O', 'Operations', '#16A34A'], ['P', 'Product', '#7C3AED'], ['M', 'Marketing & Sales', '#DB2777']]
const WORKSPACES: [string, string, string][] = [['I', 'IT / Infra', '#2563EB'], ['F', 'Facilities', '#16A34A'], ['M', 'Marketing & Sales', '#DB2777'], ['P', 'Products & Engine…', '#7C3AED']]

const TABS: { label: string; Icon: typeof Activity; n?: number; on?: boolean }[] = [
  { label: 'Overview', Icon: Activity }, { label: 'Related', Icon: GitFork, n: 2 }, { label: 'Activities', Icon: History },
  { label: 'Workloads', Icon: Gauge }, { label: 'Outputs', Icon: Package }, { label: 'Reviews', Icon: ClipboardCheck, n: 1, on: true },
]

/* The rule's criteria, and what the agent found for each — the "why" cites
   the rule's own section, so the score is traceable back to it. */
const CRITERIA = [
  { label: 'Tuân thủ SLA', w: 30, s: 7, why: 'Rule §2.1 · Đạt 11/12 SLA tháng; một lần vi phạm, đã báo cáo đúng hạn.' },
  { label: 'Chất lượng bàn giao', w: 30, s: 6, why: 'Rule §2.2 · 9/11 output được chấp nhận ngay lần đầu — dưới ngưỡng 85%.' },
  { label: 'Kiểm soát chi phí', w: 25, s: 3, why: 'Rule §2.3 · Tiết kiệm 7% so với mục tiêu 12%; hai lần thay đổi đơn hàng. Dưới ngưỡng.' },
  { label: 'Tuân thủ quy định', w: 15, s: 7, why: 'Rule §2.4 · Đủ bốn bản xác nhận; phụ lục đã ký ngày 2/8.' },
]
const SCORE = 5.7

const STEPS = [
  'Đọc rule: Vendor Performance v3 — tiêu chí, trọng số, mức xếp hạng',
  'Đọc công việc: 11 output, 2 sub-request, 2 bản đánh giá trước',
  'Chấm từng tiêu chí; điểm có trọng số 5,7 / 10 → Có điều kiện',
]

export function AssessmentMock() {
  const { wordmark } = useBrand()
  return (
    <div className="mk-rv">
      <TopBar />
      <div className="mk-app">
        <Rail active="tasks" items={RAIL} />
        <div className="mk-side">
          <div className="title"><Menu size={15} />Tasks</div>
          <div className="row"><Home size={15} /><span>Home</span></div>
          <div className="row"><Briefcase size={15} /><span>My works</span></div>
          <Sec>WORK REQUESTS<Search size={12} /></Sec>
          {REQUESTS.map(([l, name, c]) => (
            <div key={name} className="row"><span className="ltr" style={{ background: c }}>{l}</span><span>{name}</span><ChevronRight size={13} className="chev" /></div>
          ))}
          <Sec>WORKSPACES</Sec>
          {WORKSPACES.map(([l, name, c]) => (
            <div key={name} className="row"><span className="ltr" style={{ background: c }}>{l}</span><span>{name}</span><ChevronRight size={13} className="chev" /></div>
          ))}
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb"><ArrowLeft size={15} color="var(--mk-muted)" />Executive Directives <span className="sep">/</span> EXD-020</span>
          </div>
          <div className="rv-task">
            <div className="tt"><span className="ring" /><b>Triển khai sáng kiến cắt giảm chi phí Q2</b></div>
            <div className="meta">
              <code>EXD-020</code><i>·</i><span className="st">IN PROGRESS</span><i>·</i><span className="crit"><b /> Critical</span><i>·</i>
              <span><GitFork size={13} /><b>1/2</b> active sub-requests</span><i>·</i><span><CheckSquare size={13} /><b>50%</b> complete</span>
            </div>
            <div className="meta"><span>Assigned to: <b>Daniel Reed</b></span><i>·</i><span><CalendarDays size={13} /><b>Oct 14, 2026</b></span><i>·</i><span>in 30 days</span></div>
            <div className="tabs">
              {TABS.map(t => <span key={t.label} className={t.on ? 'on' : undefined}><t.Icon size={14} />{t.label}{t.n !== undefined && <em>{t.n}</em>}</span>)}
            </div>
          </div>
          <div className="rv-body">
            <div className="avg">
              <small>AVERAGE SCORE</small>
              <div><b>{SCORE.toFixed(1)}</b><span>/ 10</span><span className="band">Có điều kiện</span></div>
              <span className="n">1 bản đánh giá cuối</span>
            </div>
            <div className="item on">
              <span className="ai"><Sparkles size={13} /></span>
              <div>
                <b>Gia hạn: có điều kiện — kiểm soát chi phí dưới ngưỡng</b>
                <span>{wordmark} AI · về Daniel Reed · Vendor Performance · Có điều kiện · 19/9/2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* the Review drawer */}
        <div className="rv-veil" />
        <aside className="rv-panel">
          <div className="ph"><b>Review</b><X size={16} /></div>
          <div className="pb">
            <h3>Gia hạn: có điều kiện — kiểm soát chi phí dưới ngưỡng</h3>
            <div className="tags"><span className="rule"><BookOpen size={12} />Vendor Performance v3</span><span className="final">Final</span><span className="agent"><Sparkles size={12} />{wordmark} AI · agent</span></div>

            <div className="sec"><Gauge size={13} />SCORE</div>
            <div className="card score">
              <div className="big"><b>{SCORE.toFixed(1)} / 10</b><span className="band">Có điều kiện</span></div>
              <span className="bar"><i style={{ width: `${SCORE * 10}%` }} /></span>
              <small>4/4 tiêu chí · mức xếp hạng theo rule: Gia hạn 7+ · Có điều kiện 5–7 · Dừng dưới 5</small>
            </div>

            <div className="sec"><FileText size={13} />CRITERIA <span className="from"><Sparkles size={11} />{wordmark} AI chấm, theo rule</span></div>
            <div className="card crit" data-callout="summary">
              {CRITERIA.map(c => (
                <div key={c.label} className={`c${c.s < 5 ? ' low' : ''}`}>
                  <div className="l"><b>{c.label}</b><em>{c.w}%</em><strong>{c.s}</strong></div>
                  <span className="bar"><i style={{ width: `${c.s * 10}%` }} /></span>
                  <p>{c.why}</p>
                </div>
              ))}
            </div>

            <div className="sec"><CheckCircle2 size={13} />REVIEW STEPS</div>
            <div className="card steps">
              {STEPS.map(s => <div key={s}><CheckCircle2 size={13} color="var(--mk-green)" />{s}</div>)}
            </div>
          </div>
          <div className="pf"><span><Pencil size={14} />Edit</span><span className="del"><Trash2 size={14} />Delete</span></div>
        </aside>
      </div>
    </div>
  )
}
