import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Users, Layers, Briefcase, Activity, Star,
  ChevronLeft, ChevronRight, BarChart3, List, DollarSign, Handshake, FileText, BookOpen,
  ArrowUpRight, Search, Shuffle, Zap, UserPlus, GraduationCap, ClipboardList, Package, Truck,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TopBar } from './Window'
import { Rail, Sec, Av, PEOPLE } from './parts'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Output-driven: the Workforce app's output models as a walk through four
   screens — the output registry (every kind of output the company counts),
   the managed records behind one of them, the workload every record costs,
   and the reviews that rate the work. Every name is invented. */
type Page = 'registry' | 'records' | 'workload' | 'reviews'

export const OUTPUTS_WALK: (WalkStep & { key: Page })[] = [
  { key: 'registry', name: 'Danh mục đầu ra', ms: 3800 },
  { key: 'records', name: 'Danh sách tất cả kết quả công việc', ms: 3800 },
  { key: 'workload', name: 'Khối lượng công việc', ms: 3800 },
  { key: 'reviews', name: 'Đánh giá công việc', ms: 4000 },
]

const Ghost = ({ children, style, on }: { children: ReactNode; style?: CSSProperties; on?: boolean }) => (
  <span className={`mk-btn ghost${on ? ' mk-ow-on' : ''}`} style={{ marginLeft: 0, ...style }}>{children}</span>
)

/** The page: the rail, the page's own menu, and the page — no master panel. */
function Shell({ col, children }: { col: ReactNode; children: ReactNode }) {
  return (
    <>
      <TopBar />
      <div className="mk-app">
        <Rail active="company" />
        {col}
        <div className="mk-main">{children}</div>
      </div>
    </>
  )
}

const Col = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mk-side mk-ow-col"><div className="title" style={{ fontSize: 16 }}>{title}</div>{children}</div>
)
const ColRow = ({ icon, label, n, on }: { icon: ReactNode; label: string; n?: string; on?: boolean }) => (
  <div className={`row${on ? ' on' : ''}`}>{icon}<span>{label}</span>{n && <em className="mk-ow-n">{n}</em>}</div>
)

/* ── Output registry ───────────────────────────────────────────────────── */

const OUTPUTS = [
  { name: 'Doanh thu', Icon: DollarSign, c: '#16A34A', soft: '#DCFCE7', people: 12, records: 28, pct: 89, big: '$758K', sub: '$758K trong 30 ngày qua', more: 8, bars: [1, 1, 1, 1, 1, 1, 1, 1, 10] },
  { name: 'Deal', Icon: Handshake, c: '#6366F1', soft: '#E0E7FF', people: 12, records: 30, pct: 83, big: '30', sub: '30 trong 30 ngày qua', more: 8, bars: [1, 1, 1, 1, 1, 1, 1, 3, 10] },
  { name: 'Báo cáo', Icon: FileText, c: '#2563EB', soft: '#DBEAFE', people: 14, records: 29, pct: 83, big: '29', sub: '29 trong 30 ngày qua', more: 10, bars: [1, 1, 1, 1, 1, 1, 1, 9, 10] },
  { name: 'Case study', Icon: BookOpen, c: '#D97706', soft: '#FEF3C7', people: 12, records: 25, pct: 80, big: '25', sub: '25 trong 30 ngày qua', more: 8, bars: [1, 1, 1, 1, 1, 1, 1, 2, 10] },
]

function Ring({ pct, c }: { pct: number; c: string }) {
  const r = 24, circ = 2 * Math.PI * r
  return (
    <span className="mk-ow-ring" style={{ color: c }}>
      <svg width={64} height={64} viewBox="0 0 64 64">
        <circle cx={32} cy={32} r={r} fill="none" stroke="var(--mk-line-soft)" strokeWidth={5} />
        <circle cx={32} cy={32} r={r} fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" strokeDasharray={`${circ * pct / 100} ${circ}`} transform="rotate(-90 32 32)" />
      </svg>
      <b>{pct}%</b>
    </span>
  )
}

const AVS = ['Z', 'D', 'Q', 'L', 'H', 'K']

function RegistryPage() {
  return (
    <Shell col={
      <Col title="Đầu ra">
        <ColRow icon={<BarChart3 size={15} />} label="Tổng quan" on />
        <ColRow icon={<List size={15} />} label="Bản ghi" />
        <ColRow icon={<Layers size={15} />} label="Service" />
        <ColRow icon={<Users size={15} />} label="Nhân sự" />
        <Sec>SERVICE ĐẦU RA</Sec>
        <ColRow icon={<DollarSign size={15} />} label="Doanh thu" n="$758K" />
        <ColRow icon={<Handshake size={15} />} label="Deal" n="30" />
        <ColRow icon={<FileText size={15} />} label="Báo cáo" n="29" />
        <ColRow icon={<BookOpen size={15} />} label="Case study" n="25" />
      </Col>
    }>
      <div className="mk-head" style={{ height: 60 }}><span className="crumb" style={{ fontSize: 16 }}>Tổng quan</span><span className="mk-ow-meta">112 đầu ra · 15 người · 94 hoàn thành</span></div>
      <div className="mk-ow-cards">
        {OUTPUTS.map((o, i) => (
          <div key={o.name} className="mk-ow-card">
            <div className="hd">
              <i style={{ background: o.soft, color: o.c }}><o.Icon size={22} /></i>
              <div><b>{o.name}</b><span>{o.people} người · {o.records} bản ghi</span></div>
              <Ring pct={o.pct} c={o.c} />
            </div>
            <div className="big">{o.big}<span><ArrowUpRight size={15} />100%</span></div>
            <div className="sub">{o.sub}</div>
            <div className="bars">{o.bars.map((h, j) => <i key={j} style={{ height: h === 1 ? 3 : h * 4, background: o.c, opacity: h === 1 ? 0.35 : h < 10 ? 0.45 : 1 }} />)}</div>
            <div className="ago"><span>8 tuần trước</span><span>Tuần này</span></div>
            <div className="ft"><span className="avs">{AVS.slice(i % 2, i % 2 + 4).map(p => <Av key={p} p={p} size={26} />)}<em>+{o.more}</em></span><ChevronRight size={16} /></div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

/* ── Managed records: Deals ────────────────────────────────────────────── */

const RECORDS: [string, string, string, string, string, string, boolean?][] = [
  ['Thỏa thuận hợp tác', 'Z', 'Chỉ đạo điều hành', 'EXD-024', 'Soạn kế hoạch vận hành H2', '28/09/2026'],
  ['Gia hạn hợp đồng', 'L', 'Chỉ đạo điều hành', 'EXD-022', 'Đàm phán lại hợp đồng nhà cung cấp lớn', '27/09/2026'],
  ['Thỏa thuận hợp tác', 'B', 'IT/Hạ tầng', 'IT-1045', 'Xử lý Wi-Fi chập chờn', '27/09/2026'],
  ['Deal upsell', 'K', 'Mua hàng', 'PRC-43', 'Giảm tồn kho an toàn hàng bán chậm', '26/09/2026'],
  ['Thắng khách hàng chiến lược', 'K', 'Marketing', 'MKT-145', 'Hợp nhất các landing page', '25/09/2026'],
  ['Thắng khách hàng chiến lược', 'Z', 'Sản phẩm', 'PRD-289', 'Xuất bản tài liệu OpenAPI', '23/09/2026', true],
  ['Deal enterprise mới', 'H', 'IT/Hạ tầng', 'IT-1053', 'Tối ưu quy mô cluster dư thừa', '22/09/2026'],
  ['Deal enterprise mới', 'B', 'Bảo trì cơ sở', 'FAC-526', 'Thay đèn khẩn cấp bị hỏng', '22/09/2026'],
  ['Gia hạn hợp đồng', 'V', 'Bảo trì cơ sở', 'FAC-522', 'Cải tạo chiếu sáng sảnh', '22/09/2026'],
  ['Gia hạn hợp đồng', 'Z', 'Mua hàng', 'PRC-46', 'Đấu thầu lại chuyển phát khu vực', '21/09/2026'],
  ['Gia hạn hợp đồng', 'E', 'Chỉ đạo điều hành', 'EXD-024', 'Soạn kế hoạch vận hành H2', '19/09/2026', true],
  ['Thắng khách hàng chiến lược', 'E', 'Chỉ đạo điều hành', 'EXD-024', 'Soạn kế hoạch vận hành H2', '18/09/2026', true],
  ['Cơ hội cross-sell', 'Q', 'Mua hàng', 'PRC-43', 'Giảm tồn kho an toàn hàng bán chậm', '17/09/2026'],
  ['Deal upsell', 'J', 'IT/Hạ tầng', 'IT-1055', 'Viết bài hướng dẫn tự phục vụ', '17/09/2026'],
]

function RecordsPage() {
  return (
    <Shell col={
      <Col title="Đầu ra">
        <ColRow icon={<BarChart3 size={15} />} label="Tổng quan" />
        <ColRow icon={<List size={15} />} label="Bản ghi" />
        <ColRow icon={<Layers size={15} />} label="Service" />
        <ColRow icon={<Users size={15} />} label="Nhân sự" />
        <Sec>SERVICE ĐẦU RA</Sec>
        <ColRow icon={<DollarSign size={15} />} label="Doanh thu" n="$758K" />
        <ColRow icon={<Handshake size={15} />} label="Deal" n="30" on />
        <ColRow icon={<FileText size={15} />} label="Báo cáo" n="29" />
        <ColRow icon={<BookOpen size={15} />} label="Case study" n="25" />
      </Col>
    }>
      <div className="mk-head" style={{ height: 60 }}>
        <span className="crumb" style={{ fontSize: 16 }}>Deal <ChevronRight size={14} className="sep" /></span>
        <span className="mk-ow-tabs"><span className="on"><List size={14} />Bản ghi</span><span><Activity size={14} />Tổng quan</span><span><Layers size={14} />Nguồn</span><span><Users size={14} />Nhân sự</span><span><Briefcase size={14} />Nhiệm vụ</span></span>
        <span className="mk-pf-quick" style={{ marginLeft: 'auto', width: 240 }}><Search size={14} />Tìm bản ghi…</span>
      </div>
      <div className="mk-ow-stats"><span>30 bản ghi</span><span className="blue">30 tổng</span><span>25 hoàn thành</span><span className="amber">5 đang chạy</span></div>
      <div className="mk-ow-table">
        <table>
          <thead><tr><th /><th>Tên</th><th>Người phụ trách</th><th>Nguồn</th><th>Đơn vị việc</th><th style={{ textAlign: 'right' }}>Giá trị</th><th style={{ textAlign: 'right' }}>Ghi nhận</th></tr></thead>
          <tbody>
            {RECORDS.map((r, i) => (
              <tr key={i}>
                <td><i className={`dot${r[6] ? ' amber' : ''}`} /></td>
                <td className="nm">{r[0]}</td>
                <td><span className="who"><Av p={r[1]} size={22} />{PEOPLE[r[1]].name}</span></td>
                <td>{r[2]}</td>
                <td className="wu"><b>{r[3]}</b> {r[4]}</td>
                <td className="val">1</td>
                <td className="rec">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  )
}

/* ── Workload: hours per person per day ────────────────────────────────── */

const DAYS = ['3 T5', '4 T6', '5 T7', '6 CN', '7 T2', '8 T3', '9 T4', '10 T5', '11 T6', '12 T7', '13 CN', '14 T2', '15 T3', '16 T4']
const LOAD: { p: string; rec: number; total: number; h: (number | null)[] }[] = [
  { p: 'B', rec: 16, total: 69, h: [null, 3.5, 6.1, 5.3, null, null, null, null, null, 4.1, 3.0, null, 0.9, 1.0] },
  { p: 'Z', rec: 11, total: 55, h: [null, 6.8, null, null, null, null, null, null, 4.2, null, null, null, null, 7.3] },
  { p: 'Q', rec: 9, total: 42, h: [null, null, null, 2.4, null, null, 4.3, null, null, 10.0, 5.9, null, null, 5.5] },
  { p: 'K', rec: 10, total: 41, h: [null, null, null, null, null, 7.3, null, 7.7, null, null, null, null, null, 8.7] },
  { p: 'V', rec: 8, total: 34, h: [null, 3.4, null, 2.1, null, null, null, 2.9, null, null, 0.7, null, null, null] },
  { p: 'E', rec: 9, total: 33, h: [null, 5.3, null, null, null, null, null, null, 2.7, null, null, null, null, 6.6] },
  { p: 'D', rec: 7, total: 30, h: [null, null, null, null, 1.9, null, null, null, 11, null, null, null, null, 1.2] },
  { p: 'L', rec: 7, total: 29, h: [null, null, null, null, null, null, 7.7, 6.0, null, null, 6.0, null, null, null] },
  { p: 'H', rec: 5, total: 26, h: [null, null, 5.9, null, null, null, null, null, null, null, null, null, null, null] },
  { p: 'J', rec: 5, total: 25, h: [null, null, null, null, null, null, null, null, null, null, null, null, 7.4, null] },
]

function WorkloadPage() {
  return (
    <Shell col={
      <Col title="Khối lượng">
        <ColRow icon={<BarChart3 size={15} />} label="Tổng quan" on />
        <ColRow icon={<Layers size={15} />} label="Service" />
        <ColRow icon={<Users size={15} />} label="Nhân sự" />
        <Sec>SERVICE KHỐI LƯỢNG</Sec>
        <ColRow icon={<Shuffle size={15} />} label="Liên nhóm" n="191h" />
        <ColRow icon={<Star size={15} />} label="Lãnh đạo" n="167h" />
        <ColRow icon={<Zap size={15} />} label="Thực thi" n="133h" />
        <ColRow icon={<UserPlus size={15} />} label="Tuyển dụng & Phỏng vấn" />
        <ColRow icon={<GraduationCap size={15} />} label="Đào tạo & Huấn luyện" />
        <ColRow icon={<ClipboardList size={15} />} label="Hành chính & Tuân thủ" />
      </Col>
    }>
      <div className="mk-head" style={{ height: 60 }}>
        <span className="crumb" style={{ fontSize: 16 }}>Tổng quan</span><span className="mk-ow-meta">15 người · 8h/ngày · Mọi người · mọi service</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 6 }}><span className="mk-btn" style={{ marginLeft: 0 }}>Ngày</span><Ghost>Tuần</Ghost><Ghost on>Hôm nay</Ghost><Ghost style={{ padding: '0 8px' }}><ChevronLeft size={14} /></Ghost><Ghost style={{ padding: '0 8px' }}><ChevronRight size={14} /></Ghost></span>
      </div>
      <div className="mk-ow-grid">
        <div className="row hd"><div className="who"><b style={{ fontSize: 17 }}>Tháng 9/2026</b></div>{DAYS.map((d, i) => <div key={d} className={`cell${i === 10 ? ' today' : ''}`}><small>THG 9 {d.split(' ')[0]}</small><b>{d}</b></div>)}</div>
        {LOAD.map(l => (
          <div key={l.p} className="row">
            <div className="who"><ChevronRight size={13} className="tog" /><Av p={l.p} size={38} /><div><b>{PEOPLE[l.p].name}</b><span>{l.rec} bản ghi · {l.total}h tổng</span></div></div>
            {l.h.map((h, i) => <div key={i} className={`cell${h == null ? ' none' : h > 8 ? ' over' : ' has'}`}>{h == null ? '—' : `${h}h`}{h != null && <i style={{ width: `${Math.min(h / 8, 1) * 100}%` }} />}</div>)}
          </div>
        ))}
      </div>
    </Shell>
  )
}

/* ── Work assessment: Reviews ──────────────────────────────────────────── */

const VERDICTS: [string, number, string][] = [['Đã duyệt', 5, '#2E8B72'], ['Có điều kiện', 4, '#D6A23A'], ['Tốt', 11, '#2E8B72'], ['Đạt', 5, '#3B6EE8'], ['Chưa đạt', 1, '#D6A23A']]
const SCORES: { p: string; n: number; a?: string; b?: string; c?: string; all: number }[] = [
  { p: 'J', n: 2, c: '4', all: 80 },
  { p: 'Q', n: 2, a: '3.93', all: 79 },
  { p: 'B', n: 2, a: '4', b: '7.7', all: 79 },
  { p: 'H', n: 3, b: '7.8', all: 78 },
  { p: 'Z', n: 9, a: '3.79', c: '3.85', all: 76 },
  { p: 'D', n: 1, b: '7.3', all: 73 },
  { p: 'L', n: 4, a: '3.6', c: '3.7', all: 72 },
]

function ReviewsPage() {
  const total = VERDICTS.reduce((n, v) => n + v[1], 0)
  return (
    <Shell col={
      <Col title="Đánh giá">
        <ColRow icon={<BarChart3 size={15} />} label="Tổng quan" on />
        <ColRow icon={<List size={15} />} label="Bản ghi" />
        <ColRow icon={<Layers size={15} />} label="Service" />
        <ColRow icon={<Users size={15} />} label="Nhân sự" />
        <Sec>SERVICE ĐÁNH GIÁ</Sec>
        <ColRow icon={<Users size={15} />} label="Đánh giá phối hợp" n="3.5" />
        <ColRow icon={<Truck size={15} />} label="Hiệu suất nhà cung cấp" n="7.17" />
        <ColRow icon={<Package size={15} />} label="Chất lượng bàn giao" n="3.89" />
      </Col>
    }>
      <div className="mk-head" style={{ height: 60 }}><span className="crumb" style={{ fontSize: 16 }}>Tổng quan</span><span className="mk-ow-meta">28 đánh giá · 10 người được chấm · 14 người chấm</span></div>
      <div className="mk-ow-rv">
        <div className="kpis">
          {[['26', 'ĐÁNH GIÁ ĐÃ NỘP', '2 còn bản nháp'], ['73%', 'TRUNG BÌNH', 'theo thang riêng của từng bộ tiêu chí'], ['10', 'NGƯỜI ĐƯỢC CHẤM', '14 người chấm'], ['3', 'BỘ TIÊU CHÍ ĐANG DÙNG', '2 đánh giá không nêu tên người']].map(([n, l, s]) => (
            <div key={l} className="kpi"><b>{n}</b><span>{l}</span><small>{s}</small></div>
          ))}
        </div>
        <div className="sec"><span>PHÂN BỔ KẾT LUẬN</span><em>chỉ bản cuối — bản nháp không tính</em></div>
        <div className="mix">
          <div className="bar">{VERDICTS.map(v => <i key={v[0]} style={{ width: `${v[1] / total * 100}%`, background: v[2] }} />)}</div>
          <div className="leg">{VERDICTS.map(v => <span key={v[0]}><i style={{ background: v[2] }} />{v[0]} <b>{v[1]}</b></span>)}</div>
        </div>
        <div className="sec"><span>BẢNG ĐIỂM</span><em>3 bộ tiêu chí</em></div>
        <div className="board">
          <table>
            <thead><tr><th>Nhân sự</th><th><Users size={13} /> Đánh giá phối hợp</th><th><Truck size={13} /> Hiệu suất nhà cung cấp</th><th><Package size={13} /> Chất lượng bàn giao</th><th style={{ textAlign: 'right' }}>Tổng thể</th></tr></thead>
            <tbody>
              {SCORES.map(s => (
                <tr key={s.p}>
                  <td><span className="who"><Av p={s.p} size={34} /><span><b>{PEOPLE[s.p].name}</b><small>{s.n} đánh giá</small></span></span></td>
                  <td>{s.a ? <em className="score">{s.a}</em> : '—'}</td>
                  <td>{s.b ? <em className="score">{s.b}</em> : '—'}</td>
                  <td>{s.c ? <em className="score">{s.c}</em> : '—'}</td>
                  <td className="all">{s.all}% <ChevronRight size={14} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  )
}

const PAGES: Record<Page, () => ReactNode> = { registry: RegistryPage, records: RecordsPage, workload: WorkloadPage, reviews: ReviewsPage }

export function OutputsWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % OUTPUTS_WALK.length), OUTPUTS_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const page: Page = walk ? OUTPUTS_WALK[walk.index].key : reduce ? 'registry' : OUTPUTS_WALK[own].key
  const Body = PAGES[page]
  return (
    <div className="mk-tw">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={page} className="mk-tw-page"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          <Body />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
