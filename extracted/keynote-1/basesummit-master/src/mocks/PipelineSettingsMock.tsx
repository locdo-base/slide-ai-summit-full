import { useEffect, useState, type ReactNode } from 'react'
import {
  Columns3, X, FileText, ListChecks, ShieldCheck, Lock, Eye, LayoutGrid, PieChart, Activity, Sparkles,
  Tag, Award, XCircle, Plus, Check, GripVertical, MoreHorizontal, Pencil, ChevronDown, MoreVertical,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { SideRow, Sec, Av } from './parts'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Sales Pipeline › Settings, as the captures show it: the dialog header, the
   settings nav on the left, and the page. The mock walks its pages on its own
   — Pipeline stages, Accesses & visibilities, Permissions, Custom views,
   Customized layouts — a few seconds each, the nav highlight following, then
   round again. Every one of these is a service setting, so the same page
   shape holds for every app. */
type Page = 'stages' | 'access' | 'permissions' | 'views' | 'layouts'
/** Every page the dialog's nav can light — the walk's five, and Data fields for the fields walk. */
export type SettingsPage = Page | 'fields'

/** The walk: each page, its short name for the slide, and how long it stays. */
export const SETTINGS_WALK: (WalkStep & { key: Page })[] = [
  { key: 'stages', name: 'Giai đoạn', ms: 3400 },
  { key: 'access', name: 'Truy cập', ms: 3400 },
  { key: 'permissions', name: 'Phân quyền', ms: 3400 },
  { key: 'views', name: 'Chế độ xem', ms: 3000 },
  { key: 'layouts', name: 'Bố cục', ms: 3400 },
]

const STAGES: { n?: string; name: string; p: number; c: string }[] = [
  { n: '1', name: 'Thẩm định (Đã đặt SQL)', p: 10, c: '#2563EB' },
  { name: 'Đã họp trong 24H', p: 20, c: '#2563EB' },
  { n: '2', name: 'Khám phá (SAL)', p: 50, c: '#D97706' },
  { name: 'Đã đặt demo lần 2', p: 80, c: '#D97706' },
  { name: 'Đã demo lần 2', p: 100, c: '#D97706' },
]
const SWATCHES = ['#2563EB', '#7C3AED', '#0F766E', '#D97706', '#DC2626', '#DB2777', '#0E7490', '#334155']

// Invented people — the captures' real names must not go on stage.
const ACCESS: [string, string][] = [
  ['Z', 'Hazel Do'], ['L', 'Jolie Dang'], ['Q', 'Quinn Bui'], ['J', 'Jane Tran'], ['H', 'Helen Ngo'], ['D', 'Daniel Pham'],
  ['V', 'Kevin Kim'], ['K', 'Duke Hoang'], ['B', 'Brian Le'], ['E', 'Eric Vu'],
]

const PERMS: { name: string; desc: string; code: string; on: boolean[] }[] = [
  { name: 'Sửa thông tin chung', desc: 'Sửa mọi thông tin deal, trừ các trường kiểm soát và vòng đời', code: 'edit.general', on: [true, true, true, true] },
  { name: 'Sửa trường kiểm soát', desc: 'Sửa người phụ trách, cộng tác viên, liên hệ chính và khách hàng chính', code: 'edit.primary', on: [false, true, true, false] },
  { name: 'Cập nhật vòng đời deal', desc: 'Đánh dấu thắng hoặc thua, mở lại deal đã đóng', code: 'edit.lifecycle', on: [false, true, true, false] },
  { name: 'Thao tác cơ bản', desc: 'Công việc, việc cần làm, hoạt động đã ghi', code: 'ops.general', on: [true, true, true, true] },
  { name: 'Thao tác email', desc: 'Gửi và đọc email từ deal', code: 'ops.mail', on: [true, true, true, true] },
  { name: 'Thao tác cuộc họp', desc: 'Lên lịch và xem lại cuộc họp của deal', code: 'ops.meeting', on: [true, true, true, true] },
  { name: 'Tài liệu', desc: 'Tải lên, ký và chia sẻ tài liệu deal', code: 'ops.docs', on: [true, true, true, false] },
]
const PERM_COLS = ['Người theo dõi pipeline', 'Người theo dõi deal', 'Quản lý của người phụ trách', 'Đồng cấp của người phụ trách']

const LAYOUTS: { name: string; desc: string; active?: boolean }[] = [
  { name: 'Bố cục mặc định', desc: 'Trang deal chuẩn của ứng dụng. Không tùy chỉnh.' },
  { name: 'Tiêu chuẩn', desc: 'Ba cột: dữ liệu bên trái, công việc ở giữa, nhân sự và tệp bên phải.', active: true },
  { name: 'Hai cột', desc: 'Dữ liệu bên trái, công việc bên phải. Không có thanh bên — hợp với màn hình hẹp.' },
  { name: 'Ưu tiên hoạt động', desc: 'Luồng công việc rộng ở giữa với hai thanh hẹp hai bên.' },
  { name: 'Ưu tiên dữ liệu', desc: 'Hai cột dữ liệu dày, luồng hoạt động đẩy sang cột thứ ba hẹp.' },
]

function Toggle({ on, green }: { on?: boolean; green?: boolean }) {
  return <span className={`mk-toggle${on ? (green ? '' : ' blue') : ' off'}`} />
}
const Radio = ({ on }: { on?: boolean }) => <span className={`mk-ps-radio${on ? ' on' : ''}`} />
const Box = ({ on }: { on?: boolean }) => <span className={`mk-ps-box${on ? ' on' : ''}`}>{on && <Check size={12} strokeWidth={3} />}</span>
const Bar = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="mk-head mk-ps-bar"><span className="crumb">{title}</span>{children}</div>
)

function StagesPage() {
  return (
    <>
      <Bar title="Giai đoạn pipeline">
        <span className="opt"><Toggle on />Xác suất deal tùy chỉnh</span>
        <span className="opt"><Toggle on />Bật màu giai đoạn</span>
        <span className="vr" />
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}>Hủy</span>
        <span className="mk-btn" style={{ marginLeft: 0 }}>Lưu</span>
      </Bar>
      <div className="mk-ps-stages">
        {STAGES.map((s, i) => (
          <div key={s.name} className="mk-ps-stage" style={{ '--c': s.c } as React.CSSProperties}>
            <div className="sh">
              <div className="nm">{s.n && <i>{s.n}</i>}<b>{s.name}</b></div>
              <div className="sub">{s.p}% · Không ứ đọng</div>
            </div>
            <div className="sb">
              <label>Tên</label>
              <div className="in">{s.n && <i>{s.n}</i>}{s.name}</div>
              <label>Xác suất</label>
              <div className="in">{s.p}<span className="unit">%</span></div>
              <div className="row"><label>Ứ đọng sau (ngày)</label><Toggle /></div>
              <label>Màu giai đoạn</label>
              <div className="sw">
                {SWATCHES.map(c => <span key={c} className={c === s.c ? 'on' : undefined} style={{ background: c }} />)}
                <span className="rainbow" />
              </div>
            </div>
            <div className="foot"><X size={13} />Xóa giai đoạn này</div>
            {i < STAGES.length - 1 && <span className="add"><Plus size={13} /></span>}
          </div>
        ))}
      </div>
    </>
  )
}

function AccessPage() {
  return (
    <>
      <Bar title="Truy cập & hiển thị" />
      <div className="mk-ps-access">
        <section>
          <b>Ai được truy cập pipeline?</b>
          <p>Truy cập nghĩa là được nhìn thấy pipeline, không đồng nghĩa với quyền truy cập các deal bên trong.</p>
          <div className="radios"><span><Radio />Mọi người đều truy cập được</span><span><Radio on />Giới hạn người truy cập</span></div>
          <div className="panel">
            <div className="check"><Box on />Cho phép theo người dùng cụ thể</div>
            <div className="chips">
              {ACCESS.map(([k, name]) => <span key={name} className="chip"><Av p={k} size={20} />{name}<X size={11} /></span>)}
            </div>
            <div className="pick">Chọn người</div>
            <div className="check"><Box />Cho phép theo nhóm người dùng</div>
          </div>
        </section>
        <section>
          <b>Ai được tạo deal mới trong pipeline?</b>
          <p>Việc tạo deal yêu cầu quyền truy cập ở trên.</p>
          <div className="radios"><span><Radio on />Ai truy cập được đều tạo được deal mới</span><span><Radio />Giới hạn người tạo deal mới</span></div>
        </section>
        <section>
          <b>Ai được tạo báo cáo trên pipeline?</b>
          <p>Báo cáo chạy trên mọi deal của pipeline. Yêu cầu quyền truy cập ở trên.</p>
          <div className="radios"><span><Radio on />Ai truy cập được đều tạo được báo cáo</span><span><Radio />Giới hạn người tạo báo cáo</span></div>
        </section>
      </div>
    </>
  )
}

function PermissionsPage() {
  return (
    <>
      <Bar title="Phân quyền" />
      <div className="mk-ps-perms">
        <p>Chủ pipeline và người phụ trách deal luôn có đầy đủ quyền — bảng này không áp dụng cho họ.</p>
        <p>Workspace này chưa định nghĩa vai trò service nào.</p>
        <div className="grid">
          <div className="th"><b>Quyền</b>{PERM_COLS.map(c => <span key={c}>{c}</span>)}</div>
          {PERMS.map(p => (
            <div key={p.code} className="tr">
              <div className="pm"><div><b>{p.name}</b><span className="desc">{p.desc}</span></div><code>{p.code}</code></div>
              {p.on.map((on, i) => <span key={i} className="cell"><Box on={on} /></span>)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function ViewsPage() {
  return (
    <>
      <Bar title="Chế độ xem tùy chỉnh" />
      <div className="mk-ps-views">
        <div className="list">
          <div className="vw"><GripVertical size={15} /><Toggle on green /><b>Deal mới quý này</b><span className="tag">Công khai</span><span className="tag">Bảng</span><MoreHorizontal size={16} className="more" /></div>
          <div className="vw"><GripVertical size={15} /><Toggle on green /><b>🍀 Deal của tôi</b><span className="tag">Công khai</span><MoreHorizontal size={16} className="more" /></div>
          <div className="vw"><GripVertical size={15} /><Toggle green /><b>Enterprise pipeline</b><span className="tag">Riêng tư</span><span className="tag">Kanban</span><MoreHorizontal size={16} className="more" /></div>
        </div>
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}><Plus size={14} />Tạo chế độ xem</span>
      </div>
    </>
  )
}

function LayoutsPage() {
  return (
    <>
      <Bar title="Bố cục tùy chỉnh" />
      <div className="mk-ps-layouts">
        <p>Chọn cách hiển thị trang deal cho mọi người dùng của pipeline này. Chuyển đổi tức thì — mỗi mẫu giữ nguyên cách sắp xếp riêng.</p>
        {LAYOUTS.map(l => (
          <div key={l.name} className={`lo${l.active ? ' on' : ''}`}>
            <i>{l.active ? <Check size={16} /> : <LayoutGrid size={16} />}</i>
            <div><b>{l.name}</b><span>{l.desc}</span></div>
            {l.active && <span className="active">Đang dùng</span>}
          </div>
        ))}
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}><Pencil size={14} />Sửa bố cục</span>
      </div>
    </>
  )
}

/* Settings › Data fields, as the capture shows it: the custom fields card,
   each field numbered with its scope, its type and key, its options as
   chips, and where it shows. */
const FIELDS: { name: string; type: string; key: string; opts?: [string, string][]; more?: number; flags: string[] }[] = [
  { name: 'Quốc gia', type: 'Lựa chọn', key: 'custom_country', opts: [['Malaysia', '#2563EB'], ['Philippines', '#CA8A04'], ['Nam Phi', '#B45309'], ['Singapore', '#7C3AED'], ['Thái Lan', '#0E7490'], ['Việt Nam', '#16A34A']], more: 45, flags: ['QUAN TRỌNG', 'TRÊN FORM', 'TRONG VIEW'] },
  { name: 'Loại deal', type: 'Lựa chọn', key: 'custom_deal_type', opts: [['Mới', '#94A3B8'], ['Upsales', '#94A3B8'], ['Cross-sales', '#94A3B8'], ['Gia hạn Y2', '#94A3B8'], ['Gia hạn Y3', '#94A3B8'], ['Mới - Hợp đồng nhiều năm', '#94A3B8']], more: 1, flags: ['TRÊN FORM', 'TRONG VIEW'] },
  { name: 'Tư vấn kinh doanh', type: 'Người dùng', key: 'custom_business_consultant', flags: ['TRÊN FORM', 'TRONG VIEW'] },
  { name: 'Ngành', type: 'Văn bản', key: 'custom_industry', flags: ['TRÊN FORM', 'TRONG VIEW'] },
  { name: 'Quy mô công ty', type: 'Lựa chọn', key: 'custom_company_size', opts: [['1–10', '#94A3B8'], ['11–50', '#94A3B8'], ['51–200', '#94A3B8'], ['201–1,000', '#94A3B8']], more: 2, flags: ['TRÊN FORM', 'TRONG VIEW'] },
]

export function FieldsPage() {
  return (
    <>
      <Bar title="Trường dữ liệu" />
      <div className="mk-ps-fields">
        <div className="card">
          <div className="ch"><b>Trường tùy chỉnh</b><ChevronDown size={18} /></div>
          {FIELDS.map((f, i) => (
            <div key={f.key} className="fld">
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <div className="body">
                <div className="t"><b>{f.name}</b><span className="global">CHUNG</span></div>
                <div className="k"><span>{f.type}</span><code>{f.key}</code></div>
                {f.opts && (
                  <div className="opts">
                    {f.opts.map(([o, c]) => <span key={o}><i style={{ background: c }} />{o}</span>)}
                    {f.more && <span className="more">+{f.more} nữa</span>}
                  </div>
                )}
                <div className="flags">{f.flags.map(fl => <span key={fl} className={fl === 'QUAN TRỌNG' ? 'imp' : undefined}>{fl}</span>)}</div>
              </div>
              <MoreVertical size={16} className="dots" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/** The dialog itself — header, settings nav lit on `page`, and the main pane for its body. */
export function SettingsDialog({ page, children }: { page: SettingsPage; children: ReactNode }) {
  return (
    <div className="mk-ps">
      <div className="mk-ps-head">
        <span className="app"><Columns3 size={18} /></span>
        <div className="t"><b>Base | Sales Pipeline</b><span>Sales Pipeline · Cài đặt</span></div>
        <X size={18} className="x" />
      </div>
      <div className="mk-app">
        <div className="mk-side">
          <Sec>PIPELINE</Sec>
          <SideRow icon={<FileText size={15} />} label="Thông tin chung" />
          <SideRow icon={<ListChecks size={15} />} label="Trường dữ liệu" on={page === 'fields'} />
          <SideRow icon={<Columns3 size={15} />} label="Giai đoạn pipeline" on={page === 'stages'} />
          <SideRow icon={<ShieldCheck size={15} />} label="Truy cập & hiển thị" on={page === 'access'} />
          <SideRow icon={<Lock size={15} />} label="Phân quyền" on={page === 'permissions'} />
          <SideRow icon={<Eye size={15} />} label="Chế độ xem tùy chỉnh" on={page === 'views'} />
          <SideRow icon={<LayoutGrid size={15} />} label="Bố cục tùy chỉnh" on={page === 'layouts'} />
          <SideRow icon={<PieChart size={15} />} label="Phân khúc" />
          <SideRow icon={<Activity size={15} />} label="Luồng công việc" />
          <SideRow icon={<Sparkles size={15} />} label="AI Copilot" />
          <Sec>DỮ LIỆU THAM CHIẾU</Sec>
          <SideRow icon={<Tag size={15} />} label="Nhãn & thẻ" />
          <SideRow icon={<Award size={15} />} label="Lý do thắng" />
          <SideRow icon={<XCircle size={15} />} label="Lý do thua" />
        </div>
        <div className="mk-main mk-ps-main">{children}</div>
      </div>
    </div>
  )
}

const PAGES: Record<Page, () => React.JSX.Element> = {
  stages: StagesPage, access: AccessPage, permissions: PermissionsPage, views: ViewsPage, layouts: LayoutsPage,
}

export function PipelineSettingsMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % SETTINGS_WALK.length), SETTINGS_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const page: Page = walk ? SETTINGS_WALK[walk.index].key : reduce ? 'access' : SETTINGS_WALK[own].key
  const Body = PAGES[page]

  return (
    <SettingsDialog page={page}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={page} className="mk-ps-page"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          <Body />
        </motion.div>
      </AnimatePresence>
    </SettingsDialog>
  )
}
