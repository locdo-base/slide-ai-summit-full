import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  Home, Columns3, Building2, Users, Inbox, Activity, BarChart3, Settings, Filter, Plus, Search, ChevronRight, ChevronDown,
  Timer, Copy, History, PenSquare, Megaphone, UserSquare2, Send, GitBranch, Radio, Layers, Compass, Lightbulb,
  Mail, Phone, MessageSquare, Workflow, Route, MessagesSquare, FileText, Calendar, Sparkles, ArrowLeft, Lock,
  ClipboardCheck, SendHorizonal, Bookmark, FilePen, Cpu, LayoutGrid, Star, Briefcase, FileSignature, FolderOpen,
  Award, UserMinus, CalendarOff, Receipt, Grid2x2, Menu, Wallet, Clock, Network, IdCard, ChevronLeft, Pin, Globe,
  ScanSearch, Eye, UserPlus, FlaskConical, ExternalLink, MoreHorizontal, AlertCircle, Check, CircleDot,
  HeartHandshake, GraduationCap, Package, Database, Languages, Newspaper, ChevronsUpDown, X, type LucideIcon,
} from 'lucide-react'
import { TopBar } from './Window'
import { useBrand } from '../ui/Brand'
import { Av, Pill, SideRow, Sec, PEOPLE } from './parts'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Five product screens for the platform tour — Sales, Marketing, Work, HR,
   Hiring — drawn from the real product's layout with invented data: no real
   person, no real customer. Each fills a 1490 × 920 window. */

const Ghost = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => <span className="mk-btn ghost" style={{ marginLeft: 0, ...style }}>{children}</span>
const Blue = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => <span className="mk-btn" style={{ marginLeft: 0, ...style }}>{children}</span>

/* ── Sales · pipeline board ────────────────────────────────────────────── */

export const SALES_RAIL = [
  { key: 'home', label: 'Trang chủ', Icon: Home },
  { key: 'pipelines', label: 'Pipeline', Icon: Columns3 },
  { key: 'accounts', label: 'Khách hàng', Icon: Building2 },
  { key: 'contacts', label: 'Liên hệ', Icon: Users },
  { key: 'inboxes', label: 'Hộp thư', Icon: Inbox },
  { key: 'forecast', label: 'Dự báo', Icon: Activity },
  { key: 'reports', label: 'Báo cáo', Icon: BarChart3 },
]

interface Deal { title: string; sub?: string; who: string; value: string; tags?: string[] }
interface Stage { n?: string; name: string; count: number; sum: string; pct: string; color: string; deals: Deal[] }

const STAGES: Stage[] = [
  { n: '1', name: 'Sàng lọc (Đã đặt SQL)', count: 454, sum: '$374,913', pct: '37% pipeline', color: '#2563EB', deals: [
    { title: 'UK - Northwind Traders - Alex Morgan', sub: 'Alex Morgan · Northwind Traders', who: 'Z', value: '$0' },
    { title: 'UK - Fabrikam Logistics - Priya Nair', sub: 'Priya Nair · Fabrikam Logistics', who: 'Z', value: '$0' },
    { title: 'DE - Contoso Pharma - Jonas Weber', sub: 'Jonas Weber · Contoso Pharma', who: 'D', value: '$0' },
    { title: 'SG - Tailspin Toys - Mei Tan', sub: 'Mei Tan · Tailspin Toys', who: 'Q', value: '$0' },
    { title: 'AU - Wide World Importers - Sam Reilly', sub: 'Sam Reilly · Wide World Importers', who: 'D', value: '$0' },
  ] },
  { name: 'Đã họp 24H', count: 61, sum: '$34,348', pct: '3% pipeline', color: '#0891B2', deals: [
    { title: 'PH - Adatum Prefab - Leo Santos', sub: 'Leo Santos · Adatum Prefab', who: 'Z', value: '$799' },
    { title: 'MY - Litware Auto - Chen Wei', sub: 'Chen Wei · Litware Auto', who: 'V', value: '$0', tags: ['Q2 | Vấn đề mơ hồ'] },
    { title: 'MY - Alpine Services - Hana Lim', sub: 'Hana Lim · Alpine Services', who: 'Q', value: '$0' },
    { title: 'MY - Proseware - Eddie Cole', sub: 'Eddie Cole · Proseware', who: 'Q', value: '$0' },
    { title: 'PH - Vista Venice - Diane Reyes', sub: 'Diane Reyes · Vista Venice', who: 'Z', value: '$0' },
  ] },
  { n: '2', name: 'Khám phá (SAL)', count: 96, sum: '$250,812', pct: '25% pipeline', color: '#EA580C', deals: [
    { title: 'MY - Relecloud Rehab - Rinnie Zain', sub: 'Rinnie Zain · Relecloud Rehab', who: 'D', value: '$0' },
    { title: 'MY - World Skills Academy - V. Kumar', sub: 'V. Kumar · World Skills Academy', who: 'D', value: '$1,499', tags: ['D1 | Từ trên xuống', 'Q3 | Chưa có trigger'] },
    { title: 'MY - Vervelink Worldwide - Simon Raj', sub: 'Simon Raj · Vervelink Worldwide', who: 'D', value: '$1,499', tags: ['D1 | Từ trên xuống', 'Q2 | Vấn đề mơ hồ'] },
    { title: 'MY - SG Global Support - Shamita Rao', sub: 'Shamita Rao · SG Global Support', who: 'D', value: '$2,499', tags: ['D2 | Từ dưới lên', 'Q2 | Vấn đề mơ hồ'] },
  ] },
  { name: 'Đã đặt demo lần 2', count: 19, sum: '$43,386', pct: '4% pipeline', color: '#D97706', deals: [
    { title: 'MY - Ferris Swimming Academy - Iza Hamid', sub: 'Iza Hamid · Ferris Swimming Academy', who: 'D', value: '$0' },
    { title: 'PH - City Advertising Ventures - Dexter Lim', sub: 'Dexter Lim · City Advertising Ventures', who: 'V', value: '$0', tags: ['Công tác 26/07'] },
    { title: 'PH - ALC Medical Equipment - Harold Cruz', sub: 'Harold Cruz · ALC Medical Equipment', who: 'Z', value: '$0', tags: ['D2 | Từ dưới lên'] },
    { title: 'ZA - The 4 Pillars - Ryan Kruger', sub: 'Ryan Kruger · The 4 Pillars', who: 'D', value: '$2,499', tags: ['Đối tác','Q2 | Vấn đề mơ hồ'] },
  ] },
]

export function SalesPipelineMock() {
  return (
    <div className="mk-pf">
      <TopBar />
      <div className="mk-app">
        <PfRail active="pipelines" items={SALES_RAIL} />
        <div className="mk-side">
          <div className="title"><Columns3 size={15} />Sales Pipeline <ChevronDown size={13} style={{ marginLeft: 'auto', color: 'var(--mk-dim)' }} /></div>
          <SideRow icon={<LayoutGrid size={15} />} label="Pipeline" on />
          <SideRow icon={<Layers size={15} />} label="Deal" />
          <SideRow icon={<CircleDot size={15} />} label="Dự báo" />
          <SideRow icon={<Activity size={15} />} label="Nhật ký hoạt động" />
          <div className="mk-pf-sidefoot">
            <SideRow icon={<Timer size={15} />} label="SLA" />
            <SideRow icon={<Copy size={15} />} label="Trùng lặp" />
            <SideRow icon={<History size={15} />} label="Lịch sử nhập & xuất" />
            <SideRow icon={<PenSquare size={15} />} label="Sửa pipeline" />
            <SideRow icon={<Settings size={15} />} label="Cài đặt" />
          </div>
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb" style={{ fontWeight: 500 }}>Xem: <b>Deal hiển thị</b> <ChevronDown size={13} /></span>
            <span className="mk-pf-kpis"><b>727</b> deal · Tổng: <b>$1,019,186</b> · Dự kiến: <b>$520,203</b></span>
            <span className="mk-pf-quick"><Search size={14} />Lọc nhanh deal</span>
            <Ghost>Bộ lọc <ChevronRight size={13} /></Ghost>
            <Blue><Plus size={14} />Thêm deal</Blue>
          </div>
          <div className="mk-pf-board">
            {STAGES.map(s => (
              <div key={s.name} className="mk-pf-col">
                <div className="mk-pf-stage" style={{ '--c': s.color } as CSSProperties}>
                  <div className="nm">{s.n && <i>{s.n}</i>}<b>{s.name}</b><span className="cnt">{s.count}</span></div>
                  <div className="sum"><Activity size={13} /><b>{s.sum}</b> · {s.pct}</div>
                </div>
                {s.deals.map(d => (
                  <div key={d.title} className="mk-pf-deal">
                    {d.tags && <div className="tags">{d.tags.map(t => <Pill key={t} kind="medium">{t}</Pill>)}</div>}
                    <b>{d.title}</b>
                    {d.sub && <div className="sub"><span>{d.sub}</span><i><ChevronRight size={12} /></i></div>}
                    <div className="ft"><span className="who"><Av p={d.who} size={20} />{PN[d.who]}</span><b>{d.value}</b></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const PN: Record<string, string> = { Z: 'Hazel', D: 'Daniel', Q: 'Quinn', V: 'Kevin', H: 'Helen', K: 'Duke', J: 'Jane', B: 'Brian', E: 'Eric', L: 'Jolie' }

/** The app rail with any icon set; the platform mocks' rails are taller than
 *  the shared one, so they draw their own. */
export function PfRail({ active, items }: { active: string; items: { key: string; label: string; Icon: typeof Home }[] }) {
  return (
    <div className="mk-rail mk-pf-rail">
      {items.map(({ key, label, Icon }) => (
        <div key={key} className={`tile${key === active ? ' on' : ''}`}><i><Icon size={17} /></i>{label}</div>
      ))}
      <div className="spacer" />
      <div className="foot"><Settings size={16} /></div>
    </div>
  )
}

/* ── Marketing · a lead record ─────────────────────────────────────────── */

const Kv = ({ k, v, mono, dim }: { k: string; v: ReactNode; mono?: boolean; dim?: boolean }) => (
  <div className="mk-pf-kv"><span>{k}</span><b style={{ fontFamily: mono ? 'ui-monospace, Consolas, monospace' : undefined, fontWeight: mono ? 500 : undefined, color: dim ? 'var(--mk-dim)' : undefined }}>{v}</b></div>
)

export function LeadDetailMock() {
  const stages = ['Mới', 'Đang liên hệ', 'Đã kết nối', 'Chưa kết nối', 'Đạt chuẩn Marketing', 'Không đạt']
  return (
    <div className="mk-pf">
      <TopBar />
      <div className="mk-app">
        <div className="mk-side" style={{ width: 225 }}>
          <div className="title"><Megaphone size={15} />Lead</div>
          <SideRow icon={<Users size={15} />} label="Tất cả lead" />
          <SideRow icon={<UserSquare2 size={15} />} label="Hồ sơ" />
          <SideRow icon={<Megaphone size={15} />} label="Chiến dịch" />
          <SideRow icon={<Send size={15} />} label="Chuỗi gửi" />
          <SideRow icon={<GitBranch size={15} />} label="Luồng lead" />
          <Sec>SERVICE LEAD</Sec>
          <SideRow ltr="C" color="#DC2626" label="CRM" chev />
          <Sec>CỔNG SỰ KIỆN</Sec>
          <SideRow icon={<Radio size={15} />} label="Cổng inbound" chev />
          <div className="mk-pf-sidefoot">
            <SideRow icon={<Layers size={15} />} label="Kho lead" />
            <SideRow icon={<Compass size={15} />} label="Tìm kiếm lead" />
            <SideRow icon={<Lightbulb size={15} />} label="Phân tích" />
            <SideRow icon={<Settings size={15} />} label="Cài đặt" />
          </div>
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="mk-pf-back"><ArrowLeft size={14} /></span>
            <span className="crumb" style={{ fontWeight: 500, color: 'var(--mk-muted)' }}>CRM <span className="sep">/</span> <span style={{ color: 'var(--mk-ink)' }}>Maya Lindqvist</span></span>
            <Ghost style={{ marginLeft: 'auto' }}><Search size={13} />Tìm kiếm</Ghost>
          </div>
          <div className="mk-pf-leadhead">
            <span className="mk-pf-bigav">ML</span>
            <div className="who">
              <b>Maya Lindqvist</b>
              <span>Trưởng phòng Ngành hàng · <strong>Ridgeway Stores</strong></span>
              <small><Mail size={13} />maya.lindqvist@example.com <Phone size={13} style={{ marginLeft: 10 }} /></small>
            </div>
            <span className="score">Chưa chấm điểm</span>
            <Ghost>Giao lại</Ghost>
            <Blue>Chuyển đổi <ChevronDown size={13} /></Blue>
            <Ghost style={{ padding: '0 8px' }}><MoreHorizontal size={14} /></Ghost>
          </div>
          <div className="mk-pf-stages">
            {stages.map((s, i) => <span key={s} className={i < 2 ? 'done' : i === 2 ? 'on' : undefined}>{i < 2 ? <Check size={12} /> : i === 2 ? <CircleDot size={11} /> : null}{s}{i < stages.length - 1 && <ChevronRight size={12} className="sep" />}</span>)}
            <span className="age"><b>1 ngày</b> ở bước này</span>
          </div>
          <div className="mk-pf-lead">
            <div className="col">
              <Sec>PHỤ TRÁCH</Sec>
              <div className="mk-pf-box">
                <div className="owner"><Av p="D" size={30} /><div><b>Daniel Park</b><span>Phụ trách · Chuyên viên kinh doanh</span></div></div>
                <div className="mk-pf-kv"><span>Người theo dõi</span><b style={{ color: 'var(--mk-muted)', fontWeight: 500 }}>Chưa có</b></div>
              </div>
              <Sec>THÔNG TIN LEAD <span style={{ fontWeight: 500, letterSpacing: 0, textTransform: 'none' }}>Quản lý trường hiển thị</span></Sec>
              <div className="mk-pf-box">
                <Kv k="Email" v="maya.lindqvist@example.com" />
                <Kv k="Điện thoại" v="—" dim />
                <Kv k="Chức danh" v="Trưởng phòng Ngành hàng" />
                <Kv k="Công ty" v="Ridgeway Stores" />
                <Kv k="Tiền tố" v="Thêm tiền tố" dim />
                <Kv k="ID ngoài" v="demo-lead-394" mono />
                <Kv k="ID ẩn danh" v="—" dim />
              </div>
            </div>
            <div className="col mid">
              <div className="mk-pf-tabs">
                <span className="on"><MessageSquare size={14} />Dòng lead</span>
                <span><Workflow size={14} />Tự động hóa</span>
                <span><Route size={14} />Hành trình <em>5</em></span>
                <span><MessagesSquare size={14} />Thảo luận</span>
              </div>
              <div className="mk-pf-subtabs"><span className="on">Dòng tin</span><span>Nhật ký</span></div>
              <div className="mk-pf-composer">
                <div className="kinds"><span><FileText size={14} />Ghi chú</span><span><Mail size={14} />Email</span><span><Phone size={14} />Cuộc gọi</span><span><Calendar size={14} />Cuộc họp</span></div>
                <div className="line"><span className="mk-av" style={{ background: '#DBEAFE', color: '#1D4ED8', width: 26, height: 26, fontSize: 10 }}>DP</span>Thêm ghi chú, gửi email, ghi lại cuộc gọi…</div>
              </div>
              <div className="mk-pf-box">
                <b style={{ fontSize: 14 }}>Việc cần làm</b>
                <div className="mk-pf-todo"><i />Tạo việc, dùng @ để gắn thẻ người theo dõi</div>
              </div>
              <div className="mk-filters" style={{ padding: 0 }}>
                {['Tất cả', 'Ghi chú', 'Email', 'Cuộc gọi', 'Cuộc họp', 'Cập nhật'].map((f, i) => <span key={f} className={i === 0 ? 'on' : undefined}>{f}</span>)}
                <span style={{ marginLeft: 'auto', border: 0 }}>Mới nhất <ChevronDown size={12} style={{ verticalAlign: -2 }} /></span>
              </div>
              <div style={{ color: 'var(--mk-muted)', fontSize: 13 }}>Chưa có hoạt động.</div>
            </div>
            <div className="col">
              <Sec>NGUỒN &amp; PHÂN BỔ</Sec>
              <div className="mk-pf-box">
                <div className="src"><span className="q">?</span><div><b>Tìm kiếm — Yêu cầu mua sỉ — Form</b><Pill kind="grey">API</Pill></div></div>
                <div className="mk-pf-kv"><span><i className="dot" style={{ background: '#2563EB' }} />Chạm đầu <Lock size={11} /> —</span><b style={{ fontWeight: 500, color: 'var(--mk-muted)' }}>1 ngày trước</b></div>
                <div className="mk-pf-kv"><span><i className="dot" style={{ background: '#16A34A' }} />Chạm cuối —</span><b style={{ fontWeight: 500, color: 'var(--mk-muted)' }}>1 ngày trước</b></div>
                <b style={{ fontSize: 12.5, marginTop: 6 }}>Phân bổ quảng cáo</b>
                <Kv k="Tài khoản QC" v="demo-gg-act-1" mono />
                <Kv k="Chiến dịch" v="demo-google-camp-4" mono />
                <Kv k="Quảng cáo" v="demo-google-ad-4" mono />
              </div>
              <Sec>BỔ SUNG · HỒ SƠ DOANH NGHIỆP <span style={{ color: 'var(--mk-blue-ink)', letterSpacing: 0, textTransform: 'none' }}><Sparkles size={12} style={{ verticalAlign: -2 }} /> Bổ sung</span></Sec>
              <div className="mk-pf-box empty">
                <span className="glow"><Sparkles size={18} /></span>
                <b>Chưa có dữ liệu bổ sung</b>
                <span>Lấy hồ sơ doanh nghiệp &amp; liên hệ từ nhà cung cấp đã kết nối.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Work · requests ───────────────────────────────────────────────────── */

/* The Requests home at the real product's density: every row carries its
   service and department, the approval status, who asked, who is on turn
   (with their verdict on the avatar), the date, a bookmark and the unread
   dot; the sidebar lists the approval services with one opened. Invented
   people and requests. Fits the stage's visible column at the walk's zoom
   so the whole row shows. */
type RStatus = 'Pending' | 'Approved' | 'Rejected'
type Verdict = 'ok' | 'no' | 'wait'
interface Req { title: string; meta: string[]; status: RStatus; who: string; whoName: string; online?: boolean; appr: [string, Verdict][]; date: string; dot?: 'blue' | 'red' }

const REQS: Req[] = [
  { title: 'Hazel Brooks — Đề xuất nghỉ việc', meta: ['Service: Nghỉ việc'], status: 'Pending', who: 'Z', whoName: 'Hazel Brooks', online: true, appr: [['H', 'wait'], ['B', 'wait']], date: '31/08' },
  { title: '[Tháng 7/2026] Chương trình Builder', meta: ['Service: Thưởng & hoa hồng', 'Phòng ban: Sản phẩm & Kỹ thuật'], status: 'Pending', who: 'Q', whoName: 'Quinn Adler', online: true, appr: [['B', 'ok'], ['J', 'wait']], date: '10/08', dot: 'blue' },
  { title: '[Tháng 7/2026] Chương trình Builder', meta: ['Service: Thưởng & hoa hồng', 'Phòng ban: Giải pháp'], status: 'Pending', who: 'L', whoName: 'Jolie Park', online: true, appr: [['B', 'ok'], ['J', 'wait']], date: '10/08', dot: 'blue' },
  { title: '[Q3-2025] Thanh toán ngân hàng cho Base VN — Builder', meta: ['Service: Thanh toán ngân hàng'], status: 'Approved', who: 'V', whoName: 'Kevin Osei', appr: [['J', 'ok']], date: '07/08' },
  { title: 'Duke Ellis — Đề xuất nghỉ việc', meta: ['Service: Nghỉ việc', 'Họ tên: Duke Ellis'], status: 'Pending', who: 'K', whoName: 'Duke Ellis', online: true, appr: [['H', 'wait']], date: '04/08', dot: 'blue' },
  { title: 'Du lịch công ty 2026 — kế hoạch & ngân sách', meta: ['Service: Đề xuất trực tiếp'], status: 'Approved', who: 'H', whoName: 'Helen Moss', online: true, appr: [['B', 'ok'], ['E', 'ok']], date: '27/07' },
  { title: 'Kế hoạch tuyển dụng — Team Growth', meta: ['Service: Đề xuất trực tiếp'], status: 'Rejected', who: 'H', whoName: 'Helen Moss', online: true, appr: [['B', 'ok'], ['E', 'no']], date: '27/07', dot: 'red' },
  { title: 'T6-26 | Thanh toán quảng cáo FB', meta: ['Service: Thanh toán ngân hàng'], status: 'Pending', who: 'V', whoName: 'Kevin Osei', appr: [['J', 'wait']], date: '20/07', dot: 'blue' },
  { title: 'Thanh toán ngân hàng cho Base VN — Outsourcing', meta: ['Service: Thanh toán ngân hàng'], status: 'Pending', who: 'V', whoName: 'Kevin Osei', appr: [['J', 'wait']], date: '20/07', dot: 'blue' },
  { title: 'Đề xuất nghỉ việc — Chăm sóc khách hàng', meta: ['Service: Nghỉ việc', 'Họ tên: Mia Chen'], status: 'Pending', who: 'D', whoName: 'Daniel Reyes', appr: [['H', 'wait'], ['B', 'wait']], date: '15/07' },
  { title: '[Tháng 6/2026] Chương trình Builder', meta: ['Service: Thưởng & hoa hồng', 'Phòng ban: Sản phẩm & Kỹ thuật'], status: 'Pending', who: 'Q', whoName: 'Quinn Adler', online: true, appr: [['B', 'ok'], ['J', 'wait']], date: '10/07', dot: 'blue' },
  { title: 'Đề xuất nghỉ việc', meta: ['Service: Nghỉ việc', 'Họ tên: Oliver Grant', 'Hiệu lực: 31/07'], status: 'Pending', who: 'H', whoName: 'Helen Moss', online: true, appr: [['B', 'wait'], ['E', 'wait']], date: '08/07' },
  { title: 'T5-26 | Thanh toán quảng cáo FB', meta: ['Service: Thanh toán ngân hàng'], status: 'Approved', who: 'V', whoName: 'Kevin Osei', appr: [['J', 'ok']], date: '01/07' },
]
/* Display text per status; the status value itself stays English because it is the pill's CSS class. */
const RSTATUS_VI: Record<RStatus, string> = { Pending: 'Đang chờ', Approved: 'Đã duyệt', Rejected: 'Từ chối' }

const HR_SERVICES = ['Thực hiện quyền chọn', 'Cấp thêm thiết bị', 'Công tác nước ngoài']

export function RequestsMock() {
  const { product } = useBrand()
  const tabs: [string, string?][] = [['TẤT CẢ', '447'], ['ĐẾN LƯỢT TÔI'], ['QUÁ HẠN'], ['ĐANG CHỜ'], ['ĐÃ DUYỆT'], ['TỪ CHỐI'], ['TRẢ LẠI']]
  return (
    <div className="mk-pf">
      <TopBar />
      <div className="mk-app">
        <div className="mk-side" style={{ width: 250 }}>
          <div className="title"><ClipboardCheck size={15} />Đề xuất <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 10, color: 'var(--mk-dim)' }}><Plus size={13} /></span></div>
          <SideRow icon={<Home size={15} />} label="Trang chủ" on />
          <SideRow icon={<Inbox size={15} />} label="Gửi đến tôi" />
          <SideRow icon={<SendHorizonal size={15} />} label="Tôi đã gửi" />
          <Sec>QUAN TRỌNG</Sec>
          <SideRow icon={<Bookmark size={15} />} label="Đã lưu" />
          <SideRow icon={<Send size={15} />} label="Đề xuất trực tiếp" />
          <SideRow icon={<FilePen size={15} />} label="Bản nháp" />
          <SideRow icon={<Cpu size={15} />} label="Đề xuất hệ thống" />
          <Sec>SERVICE PHÊ DUYỆT <Search size={12} /></Sec>
          <SideRow ltr="F" color="#2563EB" label="Tài chính" chev />
          <div className="row open"><span className="ltr" style={{ background: '#7C3AED' }}>H</span><span>Nhân sự</span><ChevronDown size={13} className="chev" /></div>
          {HR_SERVICES.map(n => <div key={n} className="row sub"><i className="bullet" />{n}</div>)}
          <SideRow ltr="P" color="#0891B2" label="Sản phẩm" chev />
          <div className="mk-pf-sidefoot">
            <SideRow icon={<LayoutGrid size={15} />} label="Service" />
            <SideRow icon={<BarChart3 size={15} />} label="Báo cáo" />
            <SideRow icon={<Settings size={15} />} label="Cài đặt" />
            <div className="mk-pf-ws"><span className="ltr" style={{ background: '#2563EB' }}>R</span>{product}<ChevronsUpDown size={13} className="chev" /></div>
          </div>
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb" style={{ fontSize: 16 }}>Đề xuất</span>
            <span className="mk-pf-quick" style={{ marginLeft: 'auto', width: 260 }}><Search size={14} />Tìm đề xuất</span>
            <Blue><Plus size={14} />Tạo đề xuất</Blue>
          </div>
          <div className="mk-pf-reqtabs">
            {tabs.map(([t, n], i) => <span key={t} className={i === 0 ? 'on' : undefined}>{t}{n && <em>{n}</em>}</span>)}
            <Ghost style={{ marginLeft: 'auto' }}>Bộ lọc <ChevronRight size={13} /></Ghost>
          </div>
          <div className="mk-pf-reqs">
            {REQS.map((r, i) => (
              <div key={i} className={`mk-pf-req${r.dot === 'blue' ? ' blue' : ''}`}>
                <i className="cb" />
                <span className="ttl">{r.title}</span>
                <ChevronRight size={12} className="chev" />
                <span className="svc">{r.meta.map((m, j) => <Fragment key={j}>{j > 0 && <b> · </b>}{m}</Fragment>)}</span>
                <Pill kind={r.status.toLowerCase()}>{RSTATUS_VI[r.status]}</Pill>
                <span className="who"><span className={`avw${r.online ? ' online' : ''}`}><Av p={r.who} size={24} /></span>{r.whoName}</span>
                <ChevronRight size={12} className="chev" />
                <span className="appr">{r.appr.map(([a, v]) => (
                  <span key={a} className={`avw ${v}`}><Av p={a} size={24} />{v === 'ok' && <i><Check size={7} strokeWidth={4} /></i>}{v === 'no' && <i><X size={7} strokeWidth={4} /></i>}</span>
                ))}</span>
                <span className="date">{r.date}</span>
                <Bookmark size={14} className="bk" />
                <i className={`dot${r.dot ? ' ' + r.dot : ''}`} />
              </div>
            ))}
          </div>
          <div className="mk-pf-pager">
            <span>Hiển thị 1–25 / 447</span>
            <span className="pages"><ChevronLeft size={13} /><b className="on">1</b><b>2</b><b>3</b><b>4</b>…<b>18</b><ChevronRight size={13} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── HR · the employee register ────────────────────────────────────────── */

interface Emp { name: string; code: string; job: string; dept: string; office: string; type: string; status: 'Active' | 'Probation' | 'On leave'; start: string; color: string }

const EMPS: Emp[] = [
  { name: 'Amelia Hart', code: 'EMP-0001', job: 'Tổng giám đốc', dept: 'Ban điều hành', office: 'London', type: 'Toàn thời gian', status: 'Active', start: '02/08/2016', color: '#F59E0B' },
  { name: 'Benjamin Cole', code: 'EMP-0003', job: 'Giám đốc công nghệ', dept: 'Kỹ thuật', office: 'London', type: 'Toàn thời gian', status: 'Active', start: '03/10/2016', color: '#2563EB' },
  { name: 'Charlotte Reyes', code: 'EMP-0010', job: 'Trưởng phòng Phát triển KD', dept: 'Kinh doanh', office: 'Singapore', type: 'Toàn thời gian', status: 'Active', start: '13/12/2016', color: '#DB2777' },
  { name: 'Daniel Park', code: 'EMP-0016', job: 'Chuyên viên kinh doanh', dept: 'Kinh doanh', office: 'Singapore', type: 'Toàn thời gian', status: 'Active', start: '29/08/2017', color: '#0891B2' },
  { name: 'Elena Fischer', code: 'EMP-0021', job: 'Giám đốc Chăm sóc khách hàng', dept: 'Chăm sóc KH', office: 'Berlin', type: 'Toàn thời gian', status: 'Active', start: '09/10/2017', color: '#7C3AED' },
  { name: 'Felix Okafor', code: 'EMP-0034', job: 'Tư vấn kinh doanh', dept: 'Tư vấn', office: 'London', type: 'Toàn thời gian', status: 'On leave', start: '05/05/2018', color: '#64748B' },
  { name: 'Grace Whitfield', code: 'EMP-0036', job: 'Quản lý Onboarding khách hàng', dept: 'Chăm sóc KH', office: 'Berlin', type: 'Toàn thời gian', status: 'Active', start: '05/05/2018', color: '#16A34A' },
  { name: 'Hazel Brooks', code: 'EMP-0047', job: 'Chuyên viên phát triển KD (SDR)', dept: 'Kinh doanh', office: 'Singapore', type: 'Toàn thời gian', status: 'Active', start: '11/06/2018', color: '#EA580C' },
  { name: 'Isaac Lindgren', code: 'EMP-0067', job: 'Trưởng nhóm Tư vấn', dept: 'Tư vấn', office: 'London', type: 'Toàn thời gian', status: 'Active', start: '11/08/2018', color: '#2563EB' },
  { name: 'Julia Moreau', code: 'EMP-0079', job: 'Phó giám đốc Doanh thu', dept: 'Doanh thu', office: 'Berlin', type: 'Toàn thời gian', status: 'Active', start: '24/09/2018', color: '#0891B2' },
  { name: 'Kevin Osei', code: 'EMP-0081', job: 'Quản lý Chăm sóc khách hàng', dept: 'Chăm sóc KH', office: 'London', type: 'Toàn thời gian', status: 'Active', start: '24/09/2018', color: '#DB2777' },
  { name: 'Leah Novak', code: 'EMP-0103', job: 'Chuyên viên Phát triển khách hàng', dept: 'Kinh doanh', office: 'Singapore', type: 'Hợp đồng', status: 'Active', start: '17/12/2018', color: '#7C3AED' },
  { name: 'Marcus Reed', code: 'EMP-0118', job: 'Kỹ sư phần mềm', dept: 'Kỹ thuật', office: 'Berlin', type: 'Toàn thời gian', status: 'Probation', start: '01/07/2026', color: '#059669' },
  { name: 'Nora Salim', code: 'EMP-0121', job: 'Thiết kế sản phẩm', dept: 'Sản phẩm', office: 'London', type: 'Toàn thời gian', status: 'Probation', start: '15/07/2026', color: '#F59E0B' },
]
/* Display text per status; the status value stays English because it picks the pill colour. */
const ESTATUS_VI: Record<Emp['status'], string> = { Active: 'Đang làm việc', Probation: 'Thử việc', 'On leave': 'Nghỉ phép' }

export function HrisMock() {
  const init = (n: string) => n.split(' ').map(w => w[0]).join('')
  return (
    <div className="mk-pf">
      <TopBar />
      <div className="mk-app">
        <div className="mk-side" style={{ width: 225 }}>
          <div className="title"><Building2 size={15} />Hệ thống nhân sự <ChevronLeft size={13} style={{ marginLeft: 'auto', color: 'var(--mk-dim)' }} /></div>
          <SideRow icon={<Home size={15} />} label="Trang chủ" />
          <SideRow icon={<IdCard size={15} />} label="Nhân viên" on />
          <SideRow icon={<FileSignature size={15} />} label="Hợp đồng" />
          <SideRow icon={<FolderOpen size={15} />} label="Tài liệu" />
          <SideRow icon={<MessageSquare size={15} />} label="Đề xuất thay đổi" />
          <Sec>SỰ NGHIỆP</Sec>
          <SideRow icon={<Compass size={15} />} label="Lộ trình" />
          <SideRow icon={<FileText size={15} />} label="Vị trí công việc" />
          <SideRow icon={<Briefcase size={15} />} label="Chức vụ" />
          <SideRow icon={<Award size={15} />} label="Khen thưởng" />
          <SideRow icon={<UserMinus size={15} />} label="Nghỉ việc" />
          <SideRow icon={<CalendarOff size={15} />} label="Nghỉ phép" />
          <Sec>LƯƠNG THƯỞNG</Sec>
          <SideRow icon={<Receipt size={15} />} label="Thuế" />
          <div className="mk-pf-sidefoot">
            <SideRow icon={<Grid2x2 size={15} />} label="Ứng dụng liên quan" />
            <SideRow icon={<BarChart3 size={15} />} label="Báo cáo" />
            <SideRow icon={<Settings size={15} />} label="Cài đặt" />
          </div>
        </div>
        <div className="mk-side mk-pf-side2">
          <div className="title"><Menu size={15} />Nhân viên</div>
          <SideRow icon={<LayoutGrid size={15} />} label="Tổng quan" on />
          <SideRow icon={<Wallet size={15} />} label="Lương và phúc lợi" />
          <SideRow icon={<Receipt size={15} />} label="Thuế, bảo hiểm và …" />
          <SideRow icon={<Clock size={15} />} label="Lịch làm việc và chấm…" />
          <SideRow icon={<Network size={15} />} label="Tổ chức" />
          <SideRow icon={<IdCard size={15} />} label="Thông tin cá nhân và…" />
          <div className="mk-pf-sidefoot mk-pf-counts">
            {[['Tổng nhân viên', 128, '#111827'], ['Đang làm việc', 117, '#16A34A'], ['Thử việc', 6, '#F59E0B'], ['Nghỉ phép', 3, '#F59E0B'], ['Đã nghỉ', 2, '#9CA3AF']].map(([l, n, c]) => (
              <div key={l as string}><i style={{ borderColor: c as string, background: l === 'Tổng nhân viên' || l === 'Đang làm việc' ? (c as string) : 'transparent' }} />{l}<b>{n}</b></div>
            ))}
          </div>
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb" style={{ fontSize: 15 }}>Tổng quan</span>
            <span className="mk-pf-quick" style={{ marginLeft: 'auto', width: 260 }}><Search size={14} />Tìm tên, mã, email…</span>
            <Blue><Plus size={14} />Thêm nhân viên <span className="split"><ChevronDown size={13} /></span></Blue>
          </div>
          <div className="mk-pf-filterbar">
            {['Mọi trạng thái', 'Mọi workspace', 'Mọi văn phòng', 'Mọi vị trí', 'Mọi loại'].map(f => <span key={f}><Filter size={12} />{f} <ChevronDown size={12} /></span>)}
            <span style={{ marginLeft: 'auto' }}>Tên (A–Z) <ChevronDown size={12} /></span>
            <span className="n">128 nhân viên</span>
          </div>
          <div className="mk-pf-emps">
            <div className="mk-table">
              <table>
                <thead><tr><th>Nhân viên</th><th>Mã</th><th>Vị trí</th><th>Phòng ban</th><th>Văn phòng</th><th>Loại</th><th>Trạng thái</th><th>Ngày vào</th></tr></thead>
                <tbody>
                  {EMPS.map(e => (
                    <tr key={e.code}>
                      <td><span className="who"><span className="mk-av" style={{ width: 26, height: 26, fontSize: 10, background: e.color }}>{init(e.name)}</span><b style={{ color: 'var(--mk-ink)' }}>{e.name}</b></span></td>
                      <td className="code">{e.code}</td>
                      <td>{e.job}</td>
                      <td>{e.dept}</td>
                      <td>{e.office}</td>
                      <td>{e.type}</td>
                      <td><Pill kind={e.status === 'Active' ? 'green' : e.status === 'Probation' ? 'high' : 'grey'}>{ESTATUS_VI[e.status]}</Pill></td>
                      <td style={{ color: 'var(--mk-muted)', whiteSpace: 'nowrap' }}>{e.start}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Hiring · a job's candidate pipeline ───────────────────────────────── */

const HIRE_RAIL = [
  { key: 'home', label: 'Trang chủ', Icon: Home },
  { key: 'candidates', label: 'Ứng viên', Icon: Users },
  { key: 'acquire', label: 'Nguồn tuyển', Icon: FolderOpen },
  { key: 'interviews', label: 'Phỏng vấn', Icon: Calendar },
  { key: 'reports', label: 'Báo cáo', Icon: BarChart3 },
  { key: 'tests', label: 'Bài test', Icon: FlaskConical },
  { key: 'external', label: 'Test ngoài', Icon: ExternalLink },
]

interface Cand { name: string; src: string; due: string; late?: boolean; stars: number; color: string; who: string }
interface HStage { name: string; count: number; overdue: number; sla: string; color?: string; cands: Cand[] }

const HSTAGES: HStage[] = [
  { name: 'Ứng tuyển', count: 3, overdue: 1, sla: '24.00h', color: '#EF4444', cands: [
    { name: 'Olivia Bennett', src: 'qua LinkedIn', due: 'Quá hạn 2 ngày', late: true, stars: 0, color: '#F9A8D4', who: 'H' },
    { name: 'Marcus Reed', src: 'qua website tuyển dụng', due: 'Còn 21 giờ', stars: 0, color: '#93C5FD', who: 'H' },
    { name: 'Priya Nair', src: 'Giới thiệu', due: 'Còn 23 giờ', stars: 0, color: '#FCD34D', who: 'B' },
  ] },
  { name: 'Loại', count: 1, overdue: 0, sla: '24.00h', cands: [
    { name: 'Tom Lindgren', src: 'qua job board', due: 'Đã đóng', stars: 1, color: '#CBD5E1', who: 'H' },
  ] },
  { name: 'Sàng lọc TA', count: 2, overdue: 0, sla: '48.00h', color: '#3B82F6', cands: [
    { name: 'Sara Okafor', src: 'qua LinkedIn', due: 'Còn 2 ngày', stars: 3, color: '#6EE7B7', who: 'H' },
    { name: 'Ethan Walsh', src: 'Giới thiệu', due: 'Còn 1 ngày', stars: 4, color: '#A5B4FC', who: 'B' },
  ] },
  { name: 'Phỏng vấn V1', count: 1, overdue: 0, sla: '72.00h', color: '#3B82F6', cands: [
    { name: 'Chloe Martin', src: 'qua website tuyển dụng', due: 'Phỏng vấn T5 10:00', stars: 4, color: '#FDBA74', who: 'Q' },
  ] },
  { name: 'Phỏng vấn V2', count: 1, overdue: 0, sla: '72.00h', color: '#3B82F6', cands: [
    { name: 'Liam Foster', src: 'qua LinkedIn', due: 'Phỏng vấn T6 14:00', stars: 5, color: '#C4B5FD', who: 'E' },
  ] },
]

export function HiringMock() {
  const init = (n: string) => n.split(' ').map(w => w[0]).join('')
  return (
    <div className="mk-pf">
      <TopBar />
      <div className="mk-app">
        <PfRail active="home" items={HIRE_RAIL} />
        <div className="mk-main">
          <div className="mk-pf-jobhead">
            <div className="t">
              <b>[HQ] Tư vấn kinh doanh</b>
              <div className="meta"><Pill kind="ok">JOB-55861</Pill><span className="live"><i />ĐANG TUYỂN</span><span><Clock size={12} />09/09 — 09/10/2026</span><span><b>8</b> ứng viên</span><span><Globe size={12} />Website</span></div>
            </div>
            <Ghost><Filter size={13} />Tất cả ứng viên</Ghost>
            <Ghost style={{ color: '#15803D', borderColor: '#86EFAC' }}><Eye size={13} />Xem nhanh</Ghost>
            <Blue><ScanSearch size={14} />AI Pro Scan <span className="split"><ChevronDown size={13} /></span></Blue>
            <Ghost><UserPlus size={13} />Thêm ứng viên <ChevronDown size={12} /></Ghost>
            <Ghost style={{ padding: '0 8px' }}><MoreHorizontal size={14} /></Ghost>
          </div>
          <div className="mk-pf-hstages">
            {HSTAGES.map(s => (
              <div key={s.name} className="st">
                <div className="nm">{s.name}<ChevronRight size={12} /></div>
                <i className="bar" style={{ background: s.color ?? 'var(--mk-line)' }} />
                <div className="ft"><span>{s.count} ứng viên · {s.overdue} quá hạn</span><span><Timer size={12} />{s.sla}</span></div>
              </div>
            ))}
          </div>
          <div className="mk-pf-hboard">
            {HSTAGES.map(s => (
              <div key={s.name} className="col">
                {s.cands.map(c => (
                  <div key={c.name} className="mk-pf-cand">
                    <div className="top"><Pill kind={c.late ? 'overdue' : c.due === 'Đã đóng' ? 'grey' : 'medium'}>{c.due}</Pill><span className="pin"><Pin size={12} /><Av p={c.who} size={18} /></span></div>
                    <div className="who">
                      <span className="mk-av" style={{ width: 40, height: 40, fontSize: 14, background: c.color, color: '#1F2937' }}>{init(c.name)}{c.late && <AlertCircle size={13} className="alert" />}</span>
                      <div><b>{c.name}</b><span>{c.src}</span></div>
                    </div>
                    <div className="stars">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={15} fill={i <= c.stars ? '#F59E0B' : 'none'} color={i <= c.stars ? '#F59E0B' : '#CBD5E1'} />)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Workforce · the service registry ──────────────────────────────────── */

interface Svc { name: string; icon: LucideIcon; color: string; id: string; app: string; model: string; scope: string; desc: string; dept: string; owners: string[] }

const SVCS: Svc[] = [
  { name: 'Văn hóa và Giá trị', icon: HeartHandshake, color: '#DB2777', id: 'aEZOCfo0-XlAbrzKSnZ-gAw9ogRo6GY', app: 'academy', model: 'ACADEMY.TRAINING', scope: 'standard', desc: 'Chương trình tuân thủ và hội nhập bắt buộc cho mọi nhân viên mới — về giá trị, ứng xử và bảo mật.', dept: 'Nhân sự & Văn hóa', owners: ['H'] },
  { name: 'Đào tạo khách hàng', icon: GraduationCap, color: '#2563EB', id: 'aEWSwNc0-OZxaq7TpCt-68u3e52Cn99', app: 'academy', model: 'ACADEMY.TRAINING', scope: 'standard', desc: 'Chương trình sản phẩm và onboarding dành cho khách hàng doanh nghiệp. Mỗi lượt ghi danh theo dõi tiến độ hoàn thành.', dept: 'Chăm sóc KH', owners: ['V'] },
  { name: 'Sản phẩm nội bộ', icon: Package, color: '#7C3AED', id: 'aEXmnjpQ-bsWJyyuZkQ-AQZVxMddzhF', app: 'academy', model: 'ACADEMY.TRAINING', scope: 'standard', desc: 'Kiến thức sản phẩm nội bộ cho đội kỹ thuật, hỗ trợ và CS. Học theo khóa.', dept: 'Kỹ thuật', owners: ['K', 'L'] },
  { name: 'Nội dung', icon: FileText, color: '#D97706', id: 'aF6oErwp-jYMjnT0n6M-oRfIjIfD4N7', app: 'aiplatform', model: 'AITASKS.CONTENT', scope: 'standard', desc: 'Các workflow AI task thuộc nhóm Nội dung.', dept: 'Marketing', owners: ['Z'] },
  { name: 'Xử lý dữ liệu', icon: Database, color: '#0891B2', id: 'aF6oErwu-M0OdTDifhA-16FTjeNXh0g', app: 'aiplatform', model: 'AITASKS.DATA', scope: 'standard', desc: 'Các workflow AI task thuộc nhóm Xử lý dữ liệu.', dept: 'Kỹ thuật', owners: ['K'] },
  { name: 'Tổng hợp', icon: Sparkles, color: '#64748B', id: 'aF6oErx2-UGoxBWQmlQ-P8veMTids6k', app: 'aiplatform', model: 'AITASKS.GENERAL', scope: 'standard', desc: 'Các workflow AI task thuộc nhóm Tổng hợp.', dept: 'Vận hành', owners: ['B'] },
  { name: 'Nhân sự & Tuyển dụng', icon: UserPlus, color: '#16A34A', id: 'aF6oErwf-0vnTyBf64D-fPoqB2zIC3a', app: 'aiplatform', model: 'AITASKS.HR', scope: 'standard', desc: 'Các workflow AI task thuộc nhóm Nhân sự & Tuyển dụng.', dept: 'Nhân sự & Văn hóa', owners: ['H'] },
  { name: 'Nghiên cứu', icon: FlaskConical, color: '#4F46E5', id: 'aF6oErwl-8mogMgZqFY-nLYvQDNB7tk', app: 'aiplatform', model: 'AITASKS.RESEARCH', scope: 'standard', desc: 'Các workflow AI task thuộc nhóm Nghiên cứu.', dept: 'Marketing', owners: ['Z', 'Q'] },
  { name: 'Dịch thuật', icon: Languages, color: '#0F766E', id: 'aF6oErwy-ZRf1InVTF0-HEVc8lPmtxY', app: 'aiplatform', model: 'AITASKS.TRANSLATION', scope: 'standard', desc: 'Các workflow AI task thuộc nhóm Dịch thuật.', dept: 'Marketing', owners: ['Z'] },
  { name: 'Bài viết', icon: Newspaper, color: '#EA580C', id: 'aF40hMYJ-1Ctn2Dltff-F0yg4HSIYV8', app: 'content', model: 'CONTENT.DATABASE', scope: 'standard', desc: 'Nội dung biên tập dài, xuất bản dạng headless.', dept: 'Marketing', owners: ['Z'] },
  { name: 'Khách hàng', icon: Users, color: '#059669', id: 'aF40hMYO-ZwzOwLK2qg-1qpTz4eMLlc', app: 'content', model: 'CONTENT.DATABASE', scope: 'standard', desc: 'Hồ sơ khách hàng được tham chiếu trong case study và chiến dịch.', dept: 'Chăm sóc KH', owners: ['V', 'D'] },
  { name: 'Sales pipeline', icon: Columns3, color: '#0891B2', id: 'aF7pQr1s-KdLm3NopQx-Ye9ZaBcDeF2', app: 'sales', model: 'SALES.PIPELINE', scope: 'standard', desc: 'Deal từ sàng lọc đến chốt, với giai đoạn, dự báo và báo giá.', dept: 'Kinh doanh', owners: ['D', 'Q'] },
  { name: 'Hoàn ứng chi phí', icon: Receipt, color: '#16A34A', id: 'aF8rSt2u-VwXy4ZabCd-Ef0GhIjKlM3', app: 'request', model: 'REQUEST.APPROVAL', scope: 'standard', desc: 'Đề nghị thanh toán chi phí của nhân viên, chuyển quản lý và tài chính phê duyệt.', dept: 'Tài chính', owners: ['J'] },
]

const DEPTS: { name: string; code: string; color: string }[] = [
  { name: 'Kinh doanh', code: 'SA', color: '#0891B2' },
  { name: 'Marketing', code: 'MK', color: '#DB2777' },
  { name: 'Chăm sóc KH', code: 'CS', color: '#16A34A' },
  { name: 'Nhân sự & Văn hóa', code: 'PC', color: '#7C3AED' },
  { name: 'Tài chính', code: 'FI', color: '#D97706' },
  { name: 'Kỹ thuật', code: 'EN', color: '#2563EB' },
  { name: 'Vận hành', code: 'OP', color: '#475569' },
]
const USERS = ['D', 'Z', 'V', 'H', 'J', 'K', 'Q', 'B', 'L']

type RegistryView = 'all' | 'dept' | 'user'
/** The registry's walk: the holistic list, then the same services by department, then by user. */
export const REGISTRY_WALK: (WalkStep & { key: RegistryView })[] = [
  { key: 'all', name: 'Toàn cảnh', ms: 3600 },
  { key: 'dept', name: 'Theo phòng ban', ms: 3600 },
  { key: 'user', name: 'Theo người dùng', ms: 3600 },
]

function SvcRow({ s, inGroup }: { s: Svc; inGroup?: boolean }) {
  return (
    <tr className={inGroup ? 'in' : undefined}>
      <td>
        <span className="svc">
          <i style={{ color: s.color, background: `color-mix(in srgb, ${s.color} 12%, #fff)` }}><s.icon size={18} /></i>
          <span><b>{s.name}</b><code>{s.id}</code></span>
        </span>
      </td>
      <td><code>{s.app}</code></td>
      <td><span className="model"><Pill kind="grey">{s.model}</Pill><code>{s.model.toLowerCase()}</code></span></td>
      <td><code>{s.scope}</code></td>
      <td className="desc">{s.desc}</td>
    </tr>
  )
}

function RegistryRows({ view }: { view: RegistryView }) {
  if (view === 'all') return <>{SVCS.map(s => <SvcRow key={s.id} s={s} />)}</>
  if (view === 'dept') {
    return (
      <>
        {DEPTS.map(d => {
          const rows = SVCS.filter(s => s.dept === d.name)
          if (!rows.length) return null
          return (
            <Fragment key={d.name}>
              <tr className="grp"><td colSpan={5}><span className="gh"><i style={{ background: d.color }}>{d.code}</i>{d.name}<span className="cnt">{rows.length} service</span></span></td></tr>
              {rows.map(s => <SvcRow key={s.id} s={s} inGroup />)}
            </Fragment>
          )
        })}
      </>
    )
  }
  return (
    <>
      {USERS.map(u => {
        const rows = SVCS.filter(s => s.owners.includes(u))
        if (!rows.length) return null
        return (
          <Fragment key={u}>
            <tr className="grp"><td colSpan={5}><span className="gh"><Av p={u} size={26} />{PEOPLE[u].name}<span className="role">· {PEOPLE[u].role}</span><span className="cnt">{rows.length} service</span></span></td></tr>
            {rows.map(s => <SvcRow key={s.id} s={s} inGroup />)}
          </Fragment>
        )
      })}
    </>
  )
}

/** The Workforce app's sidebar, lit on `active`. */
export function WorkforceSide({ active }: { active: 'services' | 'fields' }) {
  return (
    <div className="mk-side" style={{ width: 225 }}>
      <div className="title"><Compass size={15} />Workforce <ChevronLeft size={13} style={{ marginLeft: 'auto', color: 'var(--mk-dim)' }} /></div>
      <SideRow icon={<Home size={15} />} label="Trang chủ" />
      <SideRow icon={<Network size={15} />} label="Sơ đồ tổ chức" />
      <SideRow icon={<Users size={15} />} label="Nhân sự" />
      <Sec>WORKFORCE</Sec>
      <SideRow icon={<Layers size={15} />} label="Service" on={active === 'services'} />
      <SideRow icon={<UserSquare2 size={15} />} label="Vai trò service" />
      <SideRow icon={<ClipboardCheck size={15} />} label="Trường dữ liệu" on={active === 'fields'} />
      <SideRow icon={<Briefcase size={15} />} label="Tài nguyên" />
      <SideRow icon={<Grid2x2 size={15} />} label="Workspace" />
      <Sec>ĐẦU RA</Sec>
      <SideRow icon={<Award size={15} />} label="Đầu ra" />
      <SideRow icon={<Activity size={15} />} label="Giám sát" />
      <SideRow icon={<Timer size={15} />} label="Khối lượng việc" />
      <SideRow icon={<Star size={15} />} label="Đánh giá" />
      <SideRow icon={<Sparkles size={15} />} label="Atlas AI" />
      <div className="mk-pf-sidefoot">
        <SideRow icon={<Settings size={15} />} label="Cài đặt" />
      </div>
    </div>
  )
}

/* Workforce › Services: every service in the company in one register — its
   app, its model, its scope and what it is for. Drawn from Eric's capture
   with invented rows. Inside a <Walk> the view follows the slide — the
   holistic list, then grouped by department, then by user; alone it runs
   its own timer through the same three. */
export function ServiceRegistryMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % REGISTRY_WALK.length), REGISTRY_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const view: RegistryView = walk ? REGISTRY_WALK[walk.index].key : reduce ? 'all' : REGISTRY_WALK[own].key

  return (
    <div className="mk-pf">
      <TopBar />
      <div className="mk-app">
        <WorkforceSide active="services" />
        <div className="mk-main">
          <div className="mk-head">
            <span className="mk-pf-reghead">
              <span className="crumb" style={{ fontSize: 16 }}>Danh mục service <span style={{ fontWeight: 500, color: 'var(--mk-muted)', fontSize: 13 }}>Tổng 215</span></span>
              <span className="mk-pf-view">
                {REGISTRY_WALK.map(v => <span key={v.key} className={v.key === view ? 'on' : undefined}>{v.name}</span>)}
              </span>
            </span>
            <span className="mk-pf-quick" style={{ marginLeft: 'auto', width: 300 }}><Search size={14} />Tìm service…</span>
            <Ghost>Bộ lọc <ChevronRight size={13} /></Ghost>
          </div>
          <div className="mk-pf-svcs" style={{ position: 'relative' }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={view}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
                <table>
                  <thead><tr><th>Service</th><th>App</th><th>Model</th><th>Phạm vi</th><th>Mô tả</th></tr></thead>
                  <tbody><RegistryRows view={view} /></tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
