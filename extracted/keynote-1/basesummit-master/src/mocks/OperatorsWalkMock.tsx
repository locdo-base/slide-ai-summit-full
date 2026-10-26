import { useEffect, useState } from 'react'
import {
  ShoppingCart, X, Settings, GitBranch, ListChecks, LayoutGrid, ShieldCheck, Webhook, ArrowLeftRight, Bot, Sparkles,
  Printer, Hash, UserPlus, MessageSquare, PenLine, ChevronDown, Search, Trash2, Plus, Menu, AlertTriangle,
  Minimize2, Braces, LayoutTemplate, Save, ZoomOut, Maximize2, ArrowRight, FileText,
  UserCheck, Building2, Wallet, Landmark, Scale, BadgeCheck, CircleDollarSign, Crown, PackageCheck, Banknote, UserRound,
  type LucideIcon,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { SideRow, Sec, Av, PEOPLE } from './parts'
import { useWalk, type WalkStep } from '../ui/Walk'

/* The operator model, as three screens walked on a timer: an approval block
   being edited, its approver picked by org unit (a holder per unit, or none);
   the same picker by position (a seat, with or without a holder); and a work
   flow where a step is an agent of its own — a model, a role, a structured
   prompt — beside the people's steps. Drawn from Eric's captures with
   invented names. Inside a <Walk> the slide drives it; alone it runs its own
   timer. */
type Key = 'orgchart' | 'position' | 'agent'
export const OPERATORS_WALK: (WalkStep & { key: Key })[] = [
  { key: 'orgchart', name: 'Thiết lập theo sơ đồ tổ chức', ms: 3800 },
  { key: 'position', name: 'Thiết lập theo vị trí', ms: 3800 },
  { key: 'agent', name: 'Giao cho agent', ms: 4400 },
]

/* ── Service settings › Approval flow › Edit block ─────────────────────── */

const ORG: { name: string; depth: number; holder?: string; open?: boolean }[] = [
  { name: 'Acme Corp', depth: 0, open: true },
  { name: 'Chăm sóc khách hàng', depth: 1 },
  { name: 'Kỹ thuật', depth: 1, holder: 'K', open: true },
  { name: 'Nhóm DevOps', depth: 2 },
  { name: 'Nhóm Frontend', depth: 2, holder: 'L' },
  { name: 'Nhóm Platform', depth: 2, holder: 'Q' },
  { name: 'Marketing', depth: 1, holder: 'Z', open: true },
  { name: 'Thương hiệu', depth: 2, holder: 'Z' },
  { name: 'Nội dung', depth: 2 },
]

const POSITIONS: { title: string; code: string; holder?: string }[] = [
  { title: 'Chuyên viên kinh doanh', code: 'S-0037' },
  { title: 'Chuyên viên kinh doanh', code: 'S-0036' },
  { title: 'Chuyên viên kinh doanh', code: 'S-0039' },
  { title: 'Chuyên viên kinh doanh', code: 'S-0038' },
  { title: 'Chuyên viên phúc lợi', code: 'S-0048', holder: 'H' },
  { title: 'Giám đốc Nhân sự', code: 'S-0001', holder: 'J' },
  { title: 'Giám đốc Công nghệ', code: 'S-0002', holder: 'K' },
]

/* The purchasing request's approval flow, block by block — enough of them to
   fill the page, each with its own tinted icon, what it checks, who approves
   and how the block is set up. */
const BLOCKS: { name: string; sub: string; Icon: LucideIcon; tint: string; who: string[]; kind: 'FLEXIBLE' | 'FIXED' | 'CONDITIONAL' | 'SYSTEM' }[] = [
  { name: 'Quản lý xét duyệt', sub: 'Quản lý trực tiếp của người đề xuất · một người duyệt là đủ', Icon: UserCheck, tint: '#2563EB', who: ['J', 'H', 'E'], kind: 'FLEXIBLE' },
  { name: 'Trưởng phòng ban', sub: 'Trưởng đơn vị của người đề xuất', Icon: Building2, tint: '#7C3AED', who: ['B'], kind: 'FIXED' },
  { name: 'Kiểm tra ngân sách', sub: 'Số tiền nằm trong ngân sách phòng ban', Icon: Wallet, tint: '#059669', who: ['K'], kind: 'FIXED' },
  { name: 'Kiểm tra tài chính', sub: 'Phòng Tài chính · tất cả phải duyệt', Icon: Landmark, tint: '#0D9488', who: ['J', 'V'], kind: 'FIXED' },
  { name: 'Pháp chế rà soát', sub: 'Chỉ khi có hợp đồng đính kèm', Icon: Scale, tint: '#D97706', who: ['H'], kind: 'CONDITIONAL' },
  { name: 'Rà soát an ninh IT', sub: 'Mua phần mềm & SaaS', Icon: ShieldCheck, tint: '#DC2626', who: ['L', 'K'], kind: 'CONDITIONAL' },
  { name: 'Xác minh nhà cung cấp', sub: 'Chỉ nhà cung cấp mới · mã số thuế & tài khoản ngân hàng', Icon: BadgeCheck, tint: '#0891B2', who: ['Q'], kind: 'CONDITIONAL' },
  { name: 'Mua hàng ký duyệt', sub: 'Vị trí S-0012 · Trưởng bộ phận mua hàng', Icon: PenLine, tint: '#EA580C', who: ['D'], kind: 'FIXED' },
  { name: 'CFO phê duyệt', sub: 'Trên 500,000,000 ₫', Icon: CircleDollarSign, tint: '#DB2777', who: ['J'], kind: 'CONDITIONAL' },
  { name: 'CEO phê duyệt', sub: 'Trên 2,000,000,000 ₫', Icon: Crown, tint: '#4F46E5', who: ['E'], kind: 'CONDITIONAL' },
  { name: 'Phát hành đơn mua hàng', sub: 'Hệ thống tạo PO và báo nhà cung cấp', Icon: FileText, tint: '#475569', who: [], kind: 'SYSTEM' },
  { name: 'Nhận hàng', sub: 'Kho xác nhận đã giao', Icon: PackageCheck, tint: '#65A30D', who: ['Z', 'V'], kind: 'FLEXIBLE' },
  { name: 'Giải ngân thanh toán', sub: 'Kế toán công nợ · khớp với hóa đơn', Icon: Banknote, tint: '#16A34A', who: ['J'], kind: 'FIXED' },
]
const KIND_LABEL = { FLEXIBLE: 'LINH HOẠT', FIXED: 'CỐ ĐỊNH', CONDITIONAL: 'CÓ ĐIỀU KIỆN', SYSTEM: 'HỆ THỐNG' } as const

function SettingsBackdrop() {
  return (
    <div className="mk-op-settings">
      <div className="mk-ps-head">
        <span className="app"><ShoppingCart size={18} /></span>
        <div className="t"><b>Đề xuất mua hàng</b><span>Cài đặt service</span></div>
        <X size={18} className="x" />
      </div>
      <div className="mk-app">
        <div className="mk-side" style={{ width: 250 }}>
          <SideRow icon={<Settings size={15} />} label="Chung" />
          <SideRow icon={<GitBranch size={15} />} label="Luồng phê duyệt" on />
          <SideRow icon={<ListChecks size={15} />} label="Luồng công việc" />
          <SideRow icon={<LayoutGrid size={15} />} label="Trường tùy chỉnh" />
          <SideRow icon={<ShieldCheck size={15} />} label="Phân quyền" />
          <Sec>TỰ ĐỘNG HÓA</Sec>
          <SideRow icon={<Webhook size={15} />} label="Webhooks" />
          <SideRow icon={<ArrowLeftRight size={15} />} label="Trao đổi dữ liệu" />
          <SideRow icon={<Bot size={15} />} label="Bot" />
          <SideRow icon={<Sparkles size={15} />} label="AI Copilot" />
          <Sec>CÀI ĐẶT BỔ SUNG</Sec>
          <SideRow icon={<Printer size={15} />} label="Mẫu in" />
          <SideRow icon={<Hash size={15} />} label="Bộ đếm" />
          <SideRow icon={<UserPlus size={15} />} label="Người theo dõi theo điều kiện" />
          <SideRow icon={<MessageSquare size={15} />} label="Ghi chú bắt buộc" />
          <SideRow icon={<PenLine size={15} />} label="Chữ ký điện tử" />
        </div>
        <div className="mk-main">
          <div className="mk-head mk-ps-bar"><span className="crumb">Luồng phê duyệt</span><span className="mk-btn ghost" style={{ marginLeft: 0 }}>Mẫu <ChevronDown size={13} /></span><span className="mk-btn" style={{ marginLeft: 0 }}><Plus size={14} />Thêm khối</span></div>
          <div className="mk-op-blocks">
            {BLOCKS.map((k, i) => (
              <div key={k.name} className="blk">
                <span className="n">{i + 1}</span>
                <span className="ic" style={{ background: k.tint }}><k.Icon size={17} strokeWidth={2} /></span>
                <span className="tt"><b>{k.name}</b><span>{k.sub}</span></span>
                <span className="who">{k.who.length ? k.who.map(p => <Av key={p} p={p} size={24} />) : <em>Tự động</em>}</span>
                <span className={`k ${k.kind.toLowerCase()}`}>{KIND_LABEL[k.kind]}</span>
                <PenLine size={14} className="ed" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EditBlock({ by }: { by: 'org' | 'position' }) {
  return (
    <div className="mk-op-dialog">
      <div className="dh"><span className="ic"><UserPlus size={18} /></span><div><b>Sửa khối</b><span>Khối linh hoạt</span></div><X size={18} className="x" /></div>
      <div className="dbody">
        <div className="prev"><span className="line">Chuyên viên Marketing sản phẩm</span><div className="sla"><span className="mk-ps-box" />Bật SLA</div></div>
        <div className="appr">
          <div className="ah"><span>NGƯỜI DUYỆT #4</span><Trash2 size={14} /></div>
          <div className="pick">Chọn người dùng, vị trí hoặc đơn vị<ChevronDown size={15} /></div>
          <div className="pop">
            <div className="seg">
              <span className="seg-cap">CHỌN THEO</span>
              <span className="seg-tabs">
                <span>Người dùng</span>
                <span className={by === 'org' ? 'on' : undefined}>Đơn vị</span>
                <span className={by === 'position' ? 'on amber' : undefined}>Vị trí</span>
              </span>
            </div>
            <div className="search"><Search size={14} />{by === 'org' ? 'Tìm đơn vị…' : 'Tìm vị trí…'}</div>
            {by === 'org' ? (
              <div className="tree">
                {ORG.map(u => (
                  <div key={u.name} className={`unit d${u.depth}${u.depth === 0 ? ' top' : ''}`}>
                    <span className="tg">{u.open ? <ChevronDown size={14} /> : <i />}</span>
                    <span className="nm">{u.name}</span>
                    {u.holder ? <span className="holder"><Av p={u.holder} size={20} />{PEOPLE[u.holder].name}</span> : <span className="none">chưa có người đảm nhiệm</span>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="list">
                {POSITIONS.map((p, i) => (
                  <div key={p.code} className={`pos${i === 0 ? ' on' : ''}`}>
                    {p.holder ? <Av p={p.holder} size={34} /> : <span className="seat"><UserRound size={16} /></span>}
                    <div><b>{p.title}</b><span>{p.code} · {p.holder ? PEOPLE[p.holder].name : 'chưa có người đảm nhiệm'}</span></div>
                    <span className="tag">VỊ TRÍ</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dfoot"><span className="mk-btn">Lưu thay đổi</span></div>
    </div>
  )
}

/* ── A work flow with an agent step of its own ─────────────────────────── */

function Node({ x, y, w = 250, kind, title, sub, children }: { x: number; y: number; w?: number; kind: 'S' | 'A' | 'L' | 'T'; title: string; sub: string; children?: React.ReactNode }) {
  const label = { S: 'Hệ thống', A: 'Agent', L: 'Logic', T: 'Công việc' }[kind]
  return (
    <div className={`node k${kind}`} style={{ left: x, top: y, width: w }}>
      <div className="nh"><i>{kind}</i><div><b>{title}</b><span>{sub}</span></div><em>{label}</em></div>
      {children}
    </div>
  )
}
const Branches = ({ items }: { items: [string, string?][] }) => (
  <div className="br"><span className="br-cap">NHÁNH →</span>{items.map(([b, tone]) => <span key={b} className={`b ${tone ?? ''}`}>{b}<ArrowRight size={11} /></span>)}</div>
)
const AgentBody = ({ prompt }: { prompt: string }) => (
  <div className="ab">
    <span className="role"><Bot size={11} />Kiểm định hàng hóa</span>
    <span className="model"><Sparkles size={11} />claude-sonnet-4-6</span><span className="doc"><FileText size={11} />1</span>
    <span className="struct"><Braces size={11} />Có cấu trúc</span>
    <p>“{prompt}”</p>
    <Branches items={[['Tiếp']]} />
  </div>
)

function FlowScreen() {
  return (
    <div className="mk-op-flow">
      <div className="fh">
        <Menu size={16} /><b>Nhận &amp; kiểm tra hàng</b><span className="muted">Hoạt động · v1</span>
        <span className="warn"><AlertTriangle size={13} />Có vòng lặp</span>
        <span className="mk-btn ghost"><Minimize2 size={13} />Thu gọn</span>
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}><Braces size={13} />Xem JSON</span>
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}>Kiểm tra</span>
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}><LayoutTemplate size={13} />Tự sắp xếp</span>
        <span className="mk-btn" style={{ marginLeft: 0 }}><Save size={13} />Lưu</span>
        <span className="mk-btn ghost" style={{ marginLeft: 0, padding: '0 8px' }}><X size={14} /></span>
      </div>
      <div className="fb">
        <div className="palette">
          <b>HÀNH ĐỘNG</b><span className="muted">Kéo vào canvas để thêm nút.</span>
          <b className="todo">CÔNG VIỆC</b>
          {[['Xác nhận', 'Người nhận việc xác nhận đã…'], ['Xét duyệt', 'Người duyệt chấp thuận, từ ch…'], ['Ký duyệt', 'Ký duyệt chính thức (có ký ho…']].map(([n, d]) => <div key={n} className="pa"><i><Plus size={13} /></i><div><b>{n}</b><span>{d}</span></div></div>)}
          <b className="logic">LOGIC</b>
          <div className="pa"><i><Plus size={13} /></i><div><b>Điều kiện</b><span>Rẽ nhánh luồng theo một điều …</span></div></div>
          <b className="sys">HỆ THỐNG</b>
          {[['Thông báo', 'Gửi thông báo trên nền tảng …'], ['Gán trường', 'Ghi giá trị vào ngữ cảnh chạy…']].map(([n, d]) => <div key={n} className="pa"><i><Plus size={13} /></i><div><b>{n}</b><span>{d}</span></div></div>)}
          <b className="ai">AI AGENT</b>
          <div className="pa agent"><i className="ai"><Sparkles size={14} /></i><div><b>Instant Agent <em>AI</em></b><span>MỘT AGENT ĐỘC LẬP</span></div></div>
        </div>
        <div className="canvas">
          <svg className="wires" width={1500} height={900}>
            <path d="M 70 300 H 130 V 340 H 180" />
            <path d="M 440 356 H 500 V 120 H 560" className="g" />
            <path d="M 440 356 H 500 V 560 H 560" className="g" />
            <path d="M 830 200 H 870 V 330 H 900" />
            <path d="M 830 640 H 870 V 330 H 900" />
            <path d="M 1150 330 H 1190 V 60 H 1230" className="g" />
            <path d="M 1150 350 H 1190 V 660 H 1230" />
          </svg>
          <div className="start">▸ Bắt đầu</div>
          <Node x={180} y={300} kind="S" title="Thông báo người đề xuất…" sub="Thông báo"><Branches items={[['Đã gửi → 2', 'ok']]} /></Node>
          <Node x={560} y={60} w={270} kind="A" title="Kiểm tra ảnh giao hàng" sub="Instant Agent"><AgentBody prompt="Xem các ảnh giao hàng đính kèm đề xuất này. Với mỗi ảnh, xác định các mặt hàng…" /></Node>
          <Node x={560} y={500} w={270} kind="A" title="Đối chiếu phiếu đóng gói…" sub="Instant Agent"><AgentBody prompt="Đọc phiếu đóng gói đính kèm và so từng dòng với đơn mua hàng…" /></Node>
          <Node x={900} y={290} w={250} kind="L" title="Có bất thường nào không?" sub="Điều kiện"><Branches items={[['Có', 'ok'], ['Không']]} /></Node>
          <Node x={1230} y={10} w={260} kind="T" title="Mua hàng xét duyệt gi…" sub="Xét duyệt"><div className="asg">1 người nhận</div><Branches items={[['Duyệt', 'ok'], ['Yêu cầu sửa', 'warn'], ['Từ chối', 'bad']]} /></Node>
          <Node x={1230} y={610} w={260} kind="T" title="Người đề xuất xác nhậ…" sub="Xác nhận"><div className="asg">1 người nhận</div><Branches items={[['Đã xác nhận', 'ok']]} /></Node>
          <div className="zoom"><span><Plus size={14} /></span><span><ZoomOut size={14} /></span><span><Maximize2 size={13} /></span></div>
        </div>
      </div>
    </div>
  )
}

export function OperatorsWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % OPERATORS_WALK.length), OPERATORS_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const key: Key = walk ? OPERATORS_WALK[walk.index].key : reduce ? 'orgchart' : OPERATORS_WALK[own].key

  return (
    <div className="mk-op" style={{ position: 'relative' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={key === 'agent' ? 'flow' : 'settings'}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          {key === 'agent' ? <FlowScreen /> : (
            <>
              <SettingsBackdrop />
              <div className="mk-ex-veil" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <EditBlock by={key === 'position' ? 'position' : 'org'} />
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
