import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Home, Bookmark, Circle, List, ChevronDown, ChevronRight, Plus, Search, Calendar, Target, Activity, BarChart3, Settings,
  Columns3, Table2, GanttChart, CalendarDays, ListTodo, Info, Link2, Layers, Gauge, MessageSquare, Paperclip,
  Building2, Menu, Box, Briefcase, Landmark, MoreHorizontal, Trash2,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Pill, Overdue, Due, Status, Tools, Who, Av } from './parts'
import { TasksHomeMock } from './TasksHomeMock'
import { ApprovalTasksPage } from './ApprovalTasksPage'
import { useWalk, type WalkStep } from '../ui/Walk'

/* The unified task model as a walk through six screens, a few seconds each:
   the Tasks home — one place for every service's work; a service's own
   works list — the same tasks, service-driven; a request's approvers each
   getting an approval task in their own list; one work request opened,
   nested as deep as the work goes; work assigned to a unit on the org chart;
   and the plan the work streams into. Every name is invented. */
type Page = 'home' | 'service' | 'approvals' | 'nested' | 'org' | 'plan'

export const TASKS_WALK: (WalkStep & { key: Page })[] = [
  { key: 'home', name: 'Một nơi duy nhất', ms: 3600 },
  { key: 'service', name: 'Theo từng service', ms: 3600 },
  { key: 'approvals', name: 'Phê duyệt tự tạo công việc', ms: 4600 },
  { key: 'nested', name: 'Lồng nhau không giới hạn', ms: 3800 },
  { key: 'org', name: 'Giao theo sơ đồ tổ chức', ms: 3800 },
  { key: 'plan', name: 'Gắn vào kế hoạch', ms: 3800 },
]

const Ghost = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => <span className="mk-btn ghost" style={{ marginLeft: 0, ...style }}>{children}</span>
const Blue = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => <span className="mk-btn" style={{ marginLeft: 0, ...style }}>{children}</span>

const WORK_REQUESTS = [['E', 'Ban điều hành', '#2563EB'], ['O', 'Vận hành', '#16A34A'], ['P', 'Sản phẩm', '#7C3AED'], ['M', 'Marketing', '#DB2777'], ['S', 'Kinh doanh & RCs', '#0891B2'], ['O', 'Khác', '#6B7280']]
const WORKSPACES = [['M', 'Marketing & Kinh doanh', '#DB2777'], ['P', 'Sản phẩm & Kỹ thuật…', '#7C3AED']]

/** The Tasks app shell — rail, sidebar with Executive open, and the service's
 *  own column — around a page. */
function Shell({ active, col, children }: { active: string; col?: ReactNode; children: ReactNode }) {
  return (
    <>
      <TopBar />
      <div className="mk-app">
        <Rail active="tasks" />
        <div className="mk-side">
          <div className="title"><Circle size={15} />Công việc</div>
          <SideRow icon={<Home size={15} />} label="Trang chủ" />
          <SideRow icon={<Bookmark size={15} />} label="Việc của tôi" />
          <Sec>YÊU CẦU CÔNG VIỆC <Search size={13} /></Sec>
          {WORK_REQUESTS.map(([l, n, c], i) => (
            i === 0 ? (
              <div key={n}>
                <SideRow ltr={l} color={c} label={n} />
                <div className="mk-tw-sub">
                  <span><i style={{ background: '#2563EB' }} />Báo cáo điều hành</span>
                  <span className={active === 'directives' ? 'on' : undefined}><i style={{ background: '#111827' }} />Chỉ đạo điều hành</span>
                  <span><i style={{ background: '#7C3AED' }} />Sáng kiến chiến lược</span>
                </div>
              </div>
            ) : <SideRow key={n} ltr={l} color={c} label={n} chev />
          ))}
          <Sec>KHÔNG GIAN LÀM VIỆC</Sec>
          {WORKSPACES.map(([l, n, c]) => <SideRow key={n} ltr={l} color={c} label={n} chev />)}
        </div>
        {col}
        <div className="mk-main">{children}</div>
      </div>
    </>
  )
}

function ServiceCol({ active }: { active: 'works' | 'schedules' }) {
  return (
    <div className="mk-side mk-tw-col">
      <SideRow icon={<List size={15} />} label="Công việc" on={active === 'works'} />
      <div className="mk-tw-n">4</div>
      <SideRow icon={<Calendar size={15} />} label="Lịch biểu" on={active === 'schedules'} />
      <Sec>KẾT QUẢ</Sec>
      <SideRow icon={<Target size={15} />} label="Đầu ra" />
      <SideRow icon={<Gauge size={15} />} label="Khối lượng việc" />
      <div className="mk-tw-hr" />
      <SideRow icon={<Activity size={15} />} label="Hoạt động" />
      <SideRow icon={<BarChart3 size={15} />} label="Báo cáo" />
      <SideRow icon={<Settings size={15} />} label="Cài đặt" />
    </div>
  )
}

function Head({ crumb, tabs, on }: { crumb: string; tabs: [ReactNode, string][]; on: string }) {
  return (
    <>
      <div className="mk-head">
        <span className="crumb" style={{ color: 'var(--mk-muted)', fontWeight: 500 }}>Ban điều hành <ChevronRight size={14} className="sep" /> <b style={{ color: 'var(--mk-ink)' }}>{crumb}</b> <ChevronDown size={13} className="sep" /> <Info size={14} className="sep" /> <Bookmark size={14} className="sep" /></span>
        <span className="mk-btn"><Plus size={15} />Tạo công việc<span className="split"><ChevronDown size={14} /></span></span>
      </div>
      <div className="mk-subhead">
        {tabs.map(([icon, t]) => <span key={t} className={`mk-tab${t === on ? ' on' : ''}`}>{icon}{t}</span>)}
      </div>
    </>
  )
}

const TABS: [ReactNode, string][] = [
  [<List size={14} />, 'Danh sách'], [<Columns3 size={14} />, 'Kanban'], [<Table2 size={14} />, 'Bảng'], [<GanttChart size={14} />, 'Tiến độ'], [<CalendarDays size={14} />, 'Lịch'], [<ListTodo size={14} />, 'Lịch trình'],
]

/* ── Service-driven: Executive › Executive Directives › Works ─────────── */

function ServicePage() {
  return (
    <>
      <Head crumb="Chỉ đạo điều hành" tabs={TABS} on="Danh sách" />
      <div className="mk-body">
        <div className="mk-card">
          <div className="t"><Status /><span className="name">Xây dựng Trung tâm trợ giúp &amp; beacon</span><Pill kind="high" caret>Cao</Pill><Tools /></div>
          <div className="m"><span className="code">EXD-26</span><span className="svc">Chỉ đạo điều hành</span><Who p="L" /><Due d="15/09" /><span>4 ngày trước</span></div>
          <div className="kids">
            <div className="kid"><Status sm /><span className="code">EXD-28</span><span>Soạn nội dung trung tâm trợ giúp</span></div>
            <div className="kid"><Status sm /><span className="code">EXD-27</span><span>Dựng trang trung tâm trợ giúp</span></div>
          </div>
        </div>
        <div className="mk-card">
          <div className="t"><Status /><span className="name">Rà soát &amp; sửa lỗi dữ liệu chat v3</span><Pill kind="critical" caret>Khẩn cấp</Pill><Overdue /><Tools /></div>
          <div className="m"><span className="code">EXD-25</span><span className="svc">Chỉ đạo điều hành</span><Who p="K" /><Due d="14/09" /><span>4 ngày trước</span></div>
        </div>
        <div className="mk-card">
          <div className="t"><Status /><span className="name">Khởi động sáng kiến cắt giảm chi phí Q2</span><Pill kind="critical" caret>Khẩn cấp</Pill><Tools /></div>
          <div className="m"><span className="code">EXD-20</span><span className="svc">Chỉ đạo điều hành</span><Who p="B" /><Due d="02/08" /><span>2 tuần trước</span></div>
          <div className="kids">
            <div className="kid"><Status sm /><span className="code">EXD-22</span><span>Đàm phán lại hợp đồng nhà cung cấp lớn</span></div>
            <div className="kid done"><Status done sm /><span className="code">EXD-21</span><span>Hoàn tất kiểm kê license SaaS</span></div>
          </div>
        </div>
        <div className="mk-card">
          <div className="t"><Status /><span className="name">Tài liệu HĐQT — Rà soát Q3</span><Pill kind="medium" caret>Trung bình</Pill><Tools /></div>
          <div className="m"><span className="code">EXD-19</span><span className="svc">Chỉ đạo điều hành</span><Who p="E" /><Due d="30/09" /><span>1 tuần trước</span></div>
        </div>
      </div>
    </>
  )
}

/* ── Infinitely nested: one work request opened, five levels deep ───────── */

interface Node { code: string; name: string; who: string; l: number; done?: boolean; prio?: 'critical' | 'high' | 'medium'; open?: boolean; n?: number }

const TREE: Node[] = [
  { code: 'EXD-30', name: 'Ra mắt 2026 — Kuala Lumpur', who: 'E', l: 0, prio: 'critical', open: true, n: 14 },
  { code: 'EXD-31', name: 'Địa điểm và sản xuất', who: 'Z', l: 1, prio: 'high', open: true, n: 6 },
  { code: 'EXD-34', name: 'Đặt địa điểm — hội trường chính', who: 'Z', l: 2, done: true },
  { code: 'EXD-35', name: 'Sân khấu, âm thanh và ánh sáng', who: 'Z', l: 2, open: true, n: 3 },
  { code: 'EXD-38', name: 'Báo giá — ba nhà cung cấp', who: 'Q', l: 3, open: true, n: 2 },
  { code: 'EXD-40', name: 'So sánh báo giá và đề xuất', who: 'Q', l: 4, done: true },
  { code: 'EXD-41', name: 'Đề xuất mua — nhà cung cấp sân khấu', who: 'J', l: 4, prio: 'high' },
  { code: 'EXD-39', name: 'Thiết kế và in backdrop', who: 'L', l: 3 },
  { code: 'EXD-36', name: 'Phòng thảo luận nhóm', who: 'Z', l: 2 },
  { code: 'EXD-32', name: 'Diễn giả và chương trình', who: 'B', l: 1, open: true, n: 4 },
  { code: 'EXD-42', name: 'Xác nhận diễn giả chính', who: 'B', l: 2, done: true },
  { code: 'EXD-43', name: 'Kịch bản demo — AI Operation Services', who: 'E', l: 2, prio: 'high' },
  { code: 'EXD-33', name: 'Khách mời và truyền thông', who: 'H', l: 1, n: 4 },
]

function NestedPage() {
  return (
    <>
      <Head crumb="Chỉ đạo điều hành" tabs={TABS} on="Danh sách" />
      <div className="mk-tw-detail">
        <div className="mk-tw-doc">
          <div className="mk-tw-title">
            <Status />
            <b>Ra mắt 2026 — Kuala Lumpur</b>
            <Pill kind="critical" caret>Khẩn cấp</Pill>
            <span className="meta"><span className="code">EXD-30</span><span className="svc">Chỉ đạo điều hành</span><Who p="E" /><Due d="10/10" /></span>
          </div>
          <div className="mk-tw-treehead"><Layers size={14} />Việc con <Pill kind="grey">14 · 5 cấp</Pill><span className="right"><Pill kind="green">6 xong</Pill><Pill kind="high">1 quá hạn</Pill></span></div>
          <div className="mk-tw-tree">
            {TREE.map(t => (
              <div key={t.code} className={`row l${t.l}${t.done ? ' done' : ''}`} style={{ '--l': t.l } as CSSProperties}>
                <span className="guide" />
                <span className="tog">{t.n ? <ChevronDown size={12} /> : <span className="leaf" />}</span>
                <Status done={t.done} sm />
                <span className="code">{t.code}</span>
                <span className="name">{t.name}</span>
                {t.prio && <Pill kind={t.prio}>{t.prio === 'critical' ? 'Khẩn cấp' : t.prio === 'high' ? 'Cao' : 'Trung bình'}</Pill>}
                {t.n && <span className="count">{t.n}</span>}
                <span className="who"><Av p={t.who} size={18} /></span>
              </div>
            ))}
            <div className="add">+ Thêm việc con — ở bất kỳ cấp nào</div>
          </div>
        </div>
        <div className="mk-tw-aside">
          <div className="blk">
            <b>Tổng hợp lên</b>
            <div className="bar"><i style={{ width: '43%' }} /></div>
            <span>6/14 hoàn thành · từ lá lên gốc</span>
          </div>
          <div className="blk">
            <b>Kế hoạch liên kết</b>
            <span className="link"><Link2 size={13} />Lộ trình 2026 › Hiện diện thị trường › Ra mắt 2026</span>
          </div>
          <div className="blk">
            <b>Người theo dõi</b>
            <span className="avs"><Av p="E" size={22} /><Av p="B" size={22} /><Av p="Z" size={22} /><Av p="H" size={22} /><em>+5</em></span>
          </div>
          <div className="blk muted"><MessageSquare size={13} /> 12 bình luận · <Paperclip size={13} /> 4 tệp</div>
        </div>
      </div>
    </>
  )
}

/* ── Assign on the org chart: Company › Organization › one unit's work ──── */

interface Unit { name: string; n: number; l: number; open?: boolean; on?: boolean; unit?: boolean }

const UNITS: Unit[] = [
  { name: 'Base.vn', n: 15, l: 0, open: true, unit: true },
  { name: 'Khối Thương mại', n: 9, l: 1, open: true, on: true, unit: true },
  { name: 'Phát triển kinh doanh', n: 3, l: 2 },
  { name: 'Quốc tế', n: 5, l: 2 },
  { name: 'Marketing', n: 5, l: 2 },
  { name: 'Kinh doanh', n: 4, l: 2 },
  { name: 'Ban điều hành', n: 4, l: 1 },
  { name: 'Tài chính & Hành chính', n: 6, l: 1, open: true, unit: true },
  { name: 'Kế toán', n: 3, l: 2 },
  { name: 'Cơ sở vật chất', n: 4, l: 2 },
  { name: 'Kế hoạch tài chính', n: 4, l: 2 },
  { name: 'Pháp chế & Tuân thủ', n: 6, l: 1, open: true, unit: true },
  { name: 'Tuân thủ', n: 4, l: 2 },
  { name: 'Pháp chế doanh nghiệp', n: 3, l: 2 },
  { name: 'Văn phòng CEO', n: 2, l: 1 },
  { name: 'Khối Vận hành', n: 10, l: 1, open: true, unit: true },
  { name: 'Vận hành khách hàng', n: 5, l: 2 },
  { name: 'Đảm bảo chất lượng', n: 3, l: 2 },
  { name: 'Chuỗi cung ứng', n: 5, l: 2 },
  { name: 'Khối Nhân sự', n: 7, l: 1, open: true, unit: true },
  { name: 'Đào tạo & Phát triển', n: 3, l: 2 },
  { name: 'Vận hành nhân sự', n: 5, l: 2 },
]

type OrgStatus = 'Mở' | 'Đang làm' | 'Hoàn thành'
interface OrgRow { st: OrgStatus; code: string; name: string; bang?: 1 | 2 | 3; who: string; dri: string; due: string; late?: boolean; upd: string }

const ORG_ROWS: OrgRow[] = [
  { st: 'Mở', code: 'RPT-092', name: 'Báo cáo tuần Marketing — 30/03', who: 'Đơn vị', dri: 'Eric', due: '15/09/2026', upd: '4 phút trước' },
  { st: 'Đang làm', code: 'EXD-020', name: 'Khởi động sáng kiến cắt giảm chi phí Q2', bang: 3, who: 'Duke', dri: 'Eric', due: '14/10/2026', upd: '1 ngày trước' },
  { st: 'Mở', code: 'EXD-024', name: 'Soạn kế hoạch vận hành H2', bang: 2, who: 'Eric', dri: 'Eric', due: '28/09/2026', upd: '2 ngày trước' },
  { st: 'Đang làm', code: 'EXD-022', name: 'Đàm phán lại hợp đồng nhà cung cấp lớn', bang: 2, who: 'Jane', dri: 'Eric', due: '28/09/2026', upd: '2 ngày trước' },
  { st: 'Đang làm', code: 'MKT-143', name: 'Xây lại mô hình attribution cho kênh trả phí', bang: 2, who: 'Đơn vị', dri: 'Duke', due: '30/09/2026', upd: '3 ngày trước' },
  { st: 'Đang làm', code: 'MKT-144', name: 'Giảm 15% CAC trên hai kênh trả phí lớn nhất', bang: 2, who: 'Đơn vị', dri: 'Duke', due: '09/09/2026', late: true, upd: '3 ngày trước' },
  { st: 'Mở', code: 'MKT-145', name: 'Gộp các landing page về một mẫu', who: 'Đơn vị', dri: 'Hazel', due: '11/10/2026', upd: '3 ngày trước' },
  { st: 'Hoàn thành', code: 'RPT-091', name: 'Báo cáo tuần Kinh doanh — 21/03', who: 'Jane', dri: 'Eric', due: '06/09/2026', upd: '8 ngày trước' },
]

const ST_KIND: Record<OrgStatus, string> = { 'Mở': 'medium', 'Đang làm': 'high', 'Hoàn thành': 'green' }

function OrgPage() {
  return (
    <>
      <TopBar />
      <div className="mk-app">
        <Rail active="company" />
        <div className="mk-tw-orgtree">
          <div className="hd">Sơ đồ tổ chức <Pill kind="grey">106</Pill></div>
          <div className="mk-pf-quick" style={{ width: 'auto', margin: '0 12px 8px' }}><Search size={14} />Tìm đơn vị…</div>
          {UNITS.map(u => (
            <div key={u.name} className={`u l${u.l}${u.on ? ' on' : ''}${u.unit ? ' unit' : ''}`}>
              <span className="tog">{u.l < 2 && u.unit ? <ChevronDown size={13} /> : u.l === 2 ? <ChevronRight size={13} /> : null}</span>
              {u.unit && <Building2 size={13} className="ico" />}
              <span className="nm">{u.name}</span>
              <span className="n">{u.n}</span>
            </div>
          ))}
        </div>
        <div className="mk-main">
          <div className="mk-head" style={{ height: 60 }}>
            <span className="mk-tw-orgbadge"><Building2 size={15} /></span>
            <span className="crumb" style={{ fontSize: 16 }}>Khối Thương mại</span>
            <span className="mk-tw-orgmeta">· <b>KHỐI</b> · <b>COMM</b> · Brian · 1 thành viên</span>
            <Ghost style={{ marginLeft: 'auto' }}><Calendar size={13} />30 ngày qua <ChevronDown size={12} /></Ghost>
            <span className="mk-pf-quick" style={{ width: 220 }}><Search size={14} />Tìm công việc…</span>
          </div>
          <div className="mk-tw-orgchips">
            <span className="on">Tổng 8</span><span className="blue">3 Mở</span><span className="amber">4 Đang làm</span><span className="green">1 Hoàn thành</span>
            <span className="inc"><i /> Gồm đơn vị con</span>
          </div>
          <div className="mk-tw-orgtable">
            <table>
              <thead><tr><th>Trạng thái</th><th>Mã</th><th>Tên</th><th>Người phụ trách</th><th>DRI</th><th>Hạn</th><th>Cập nhật</th></tr></thead>
              <tbody>
                {ORG_ROWS.map(r => (
                  <tr key={r.code}>
                    <td><Pill kind={ST_KIND[r.st]}>{r.st.toUpperCase()}</Pill></td>
                    <td className="code">{r.code}</td>
                    <td className="nm">{r.name}</td>
                    <td><span className="asg">{r.bang && <i className={`b${r.bang}`}>{'!'.repeat(r.bang)}</i>}<span className={r.who === 'Đơn vị' ? 'unit' : undefined}>{r.who}</span></span></td>
                    <td>{r.dri}</td>
                    <td className={r.late ? 'late' : undefined}>{r.due}</td>
                    <td className="upd">{r.upd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Streamlined into plan: Work plans › Product Planning 2026 ──────────── */

interface PlanItem { name: string; l: number; own?: string; links?: number; due?: string; open?: boolean; on?: boolean }

const PLAN_TREE: PlanItem[] = [
  { name: 'Nền tảng & Hạ tầng', l: 0, own: 'Eric', links: 10, due: '04/07/2026', open: true },
  { name: 'Gia cố nền tảng multi-tenant', l: 1, own: 'Quinn', links: 4, open: true },
  { name: 'Kiểm tra cách ly tenant', l: 2, own: 'Quinn', links: 2, on: true },
  { name: 'Gộp kết nối & phân vùng', l: 2, links: 1, due: '29/03/2026' },
  { name: 'Công cụ migration schema', l: 2, own: 'Duke', links: 1 },
  { name: 'Giám sát & Độ tin cậy', l: 1, own: 'Kevin', links: 5, open: true },
  { name: 'Triển khai tracing', l: 2, links: 3, due: '25/08/2026' },
  { name: 'Dashboard SLO', l: 2, links: 2, due: '03/04/2026' },
  { name: 'Runbook xử lý sự cố', l: 2, own: 'Jolie' },
  { name: 'Trải nghiệm lập trình viên', l: 1, own: 'Duke', links: 1, open: true },
  { name: 'Đồng bộ môi trường dev local', l: 2, due: '25/08/2026' },
  { name: 'Tăng tốc CI pipeline', l: 2, own: 'Duke', due: '08/06/2026' },
  { name: 'Thư viện component', l: 2, own: 'Jolie', links: 1, due: '13/08/2026' },
  { name: 'Trải nghiệm sản phẩm cốt lõi', l: 0, own: 'Brian', links: 9, open: true },
  { name: 'Trung tâm công việc hợp nhất', l: 1, own: 'Eric', links: 1, open: true },
  { name: 'Thiết kế lại hộp thư trang chủ', l: 2, own: 'Eric' },
  { name: 'Tìm kiếm liên service', l: 2, own: 'Hazel' },
  { name: 'Lưu chế độ xem & ghim', l: 2, own: 'Quinn', links: 1, due: '14/08/2026' },
  { name: 'Bộ lập kế hoạch & Liên kết', l: 1, own: 'Duke', links: 3, due: '03/08/2026', open: true },
  { name: 'Cây hạng mục kế hoạch', l: 2, links: 1, due: '19/03/2026' },
  { name: 'Mô hình liên kết công việc', l: 2, own: 'Kevin', links: 1, due: '19/08/2026' },
]

const PLAN_LINKS = [
  { code: 'QA-88', name: 'Xuất báo cáo regression hằng đêm', svc: 'QA & Kiểm thử', c: '#F59E0B' },
  { code: 'RPT-093', name: 'Báo cáo sprint Kỹ thuật — 30/03', svc: 'Báo cáo điều hành', c: '#2563EB' },
]

function PlanPage() {
  return (
    <>
      <TopBar />
      <div className="mk-app">
        <Rail active="plans" />
        <div className="mk-side">
          <div className="title"><Menu size={15} />Kế hoạch công việc</div>
          <SideRow icon={<Layers size={15} />} label="Kế hoạch" on />
          <Sec>SERVICE LẬP KẾ HOẠCH</Sec>
          <SideRow icon={<Box size={15} />} label="Base Product Planning" />
          <SideRow icon={<Briefcase size={15} />} label="Base Business Planning" />
          <SideRow icon={<Landmark size={15} />} label="Base Finance Planning" />
        </div>
        <div className="mk-main mk-tw-wp">
          <div className="plan">
            <div className="mk-head">
              <Box size={16} style={{ color: 'var(--mk-blue)' }} />
              <span className="crumb" style={{ color: 'var(--mk-muted)', fontWeight: 500 }}>Base Product Plan… <ChevronRight size={14} className="sep" /> <b style={{ color: 'var(--mk-ink)', fontSize: 16 }}>Kế hoạch Sản phẩm 2026</b> <Pill kind="grey">52</Pill></span>
              <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 14, color: 'var(--mk-muted)' }}><Plus size={16} /><MoreHorizontal size={16} /></span>
            </div>
            <div className="mk-pf-quick" style={{ width: 'auto', margin: '10px 16px 6px', border: 0, padding: 0 }}><Search size={14} />Tìm trong kế hoạch…</div>
            <div className="tree">
              {PLAN_TREE.map(t => (
                <div key={t.name} className={`pi l${t.l}${t.on ? ' on' : ''}`}>
                  <span className="tog">{t.open ? <ChevronDown size={13} /> : null}</span>
                  <i className={`sq l${t.l}`} />
                  <span className="nm">{t.name}</span>
                  {t.own && <span className="own">{t.own}</span>}
                  {t.links && <span className="lk"><Link2 size={12} />{t.links}</span>}
                  {t.due && <span className="due">{t.due}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="links">
            <div className="mk-head" style={{ height: 60 }}>
              <span className="mk-tw-orgbadge" style={{ background: 'var(--mk-green)' }}><Layers size={15} /></span>
              <span className="crumb" style={{ fontSize: 16 }}>Kiểm tra cách ly tenant</span>
              <span className="mk-tw-orgmeta">· <b>LUỒNG VIỆC</b></span>
              <span className="mk-tw-orgmeta" style={{ marginLeft: 'auto' }}>DRI Quinn</span>
              <Blue><Plus size={14} />Liên kết việc</Blue>
              <MoreHorizontal size={16} style={{ color: 'var(--mk-muted)' }} />
            </div>
            <div className="mk-tw-orgchips"><span className="on">2 việc liên kết</span><span className="mk-pf-quick" style={{ marginLeft: 'auto', width: 200, padding: '0 10px', height: 30 }}><Search size={13} />Tìm liên kết…</span></div>
            <div className="mk-tw-orgtable">
              <table>
                <thead><tr><th>Mã</th><th>Việc liên kết</th><th>Service</th><th /></tr></thead>
                <tbody>
                  {PLAN_LINKS.map(r => (
                    <tr key={r.code}><td className="code">{r.code}</td><td className="nm">{r.name}</td><td><span className="svc"><i style={{ background: r.c }} />{r.svc}</span></td><td><Trash2 size={14} style={{ color: 'var(--mk-dim)' }} /></td></tr>
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

const PAGES: Record<Page, () => ReactNode> = {
  home: () => <TasksHomeMock />,
  service: () => <Shell active="directives" col={<ServiceCol active="works" />}><ServicePage /></Shell>,
  approvals: () => <ApprovalTasksPage />,
  nested: () => <Shell active="directives" col={<ServiceCol active="works" />}><NestedPage /></Shell>,
  org: () => <OrgPage />,
  plan: () => <PlanPage />,
}

export function TasksWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % TASKS_WALK.length), TASKS_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const page: Page = walk ? TASKS_WALK[walk.index].key : reduce ? 'home' : TASKS_WALK[own].key
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
