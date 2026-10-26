import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  Home, BookOpen, ClipboardList, Inbox, Menu, FileText, BookMarked, Folder, List, User, Pencil, Archive,
  Search, ChevronDown, ChevronRight, Plus, Megaphone, UserCheck, Send, Box, TrendingUp, Compass, Users,
  Sparkles, Layers, ExternalLink, FolderOpen, FolderClosed,
  BarChart3, Settings, ChevronsUpDown, CheckCircle2, Clock, Bookmark, Link2, Workflow, ScrollText,
} from 'lucide-react'
import { TopBar } from './Window'
import { WorkflowsSide } from './WorkflowJobsMock'
import { SideRow, Sec, Pill } from './parts'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Work rules, five screens a click apart — no master rail, the app column only: the Rules register (every rule a
   system-level entity), a rule page with its linked services and agents, a service's settings with the rules and
   agents bound to it (the same link from the service side), the Inbox of rollouts (the announcement), and the
   Assignments — readings and attestations someone asked you to do (the
   attestation). Built to Eric's screenshots of the product. */

type Page = 'rules' | 'linked' | 'service' | 'rollouts' | 'assignments'

export const RULES_WALK: (WalkStep & { key: Page })[] = [
  { key: 'rules', name: 'Thực thể ở tầng hệ thống', ms: 4000 },
  { key: 'linked', name: 'Liên kết với service & agent', ms: 4000 },
  { key: 'service', name: 'Gắn chặt theo từng Service', ms: 4400 },
  { key: 'rollouts', name: 'Công bố', ms: 3800 },
  { key: 'assignments', name: 'Xác nhận', ms: 4000 },
]

type Kind = 'Procedure' | 'Guideline' | 'Standard' | 'Decision' | 'Policy'
const KIND: Record<Kind, string> = { Procedure: 'medium', Guideline: 'green', Standard: 'cyan', Decision: 'violet', Policy: 'high' }
/* What the pill says; the English kind stays the key for its colour. */
const KIND_VI: Record<string, string> = { Procedure: 'Quy trình', Guideline: 'Hướng dẫn', Standard: 'Tiêu chuẩn', Decision: 'Quyết định', Policy: 'Chính sách', Directive: 'Chỉ thị' }

const RULES: { kind: Kind; code: string; name: string }[] = [
  { kind: 'Procedure', code: 'PRO-094', name: 'Quy trình tiếp nhận phản hồi khách hàng' },
  { kind: 'Procedure', code: 'PRO-093', name: 'Quy trình đánh giá kết quả thử nghiệm' },
  { kind: 'Guideline', code: 'GLN-052', name: 'Hướng dẫn chọn cỡ mẫu thử nghiệm' },
  { kind: 'Procedure', code: 'PRO-092', name: 'Quy trình thiết kế A/B test' },
  { kind: 'Standard', code: 'STD-111', name: 'Tiêu chuẩn thử nghiệm sản phẩm' },
  { kind: 'Decision', code: 'DEC-016', name: 'Quyết định về North Star Metric' },
  { kind: 'Procedure', code: 'PRO-095', name: 'Quy trình thông báo khai tử tính năng' },
  { kind: 'Standard', code: 'STD-110', name: 'Tiêu chuẩn tracking sự kiện' },
  { kind: 'Policy', code: 'POL-051', name: 'Chính sách ngừng hỗ trợ tính năng' },
  { kind: 'Standard', code: 'STD-109', name: 'Tiêu chuẩn chỉ số sản phẩm' },
  { kind: 'Guideline', code: 'GLN-051', name: 'Hướng dẫn Hội đồng tư vấn khách hàng' },
  { kind: 'Procedure', code: 'PRO-091', name: 'Quy trình kiểm tra sẵn sàng phát hành' },
]

const TYPES = [['Điều lệ', 'CHT'], ['Quyết định', 'DEC'], ['Chỉ thị', 'DIR'], ['Biểu mẫu', 'FRM'], ['Hướng dẫn', 'GLN'], ['Sổ tay', 'MAN'], ['Chính sách', 'POL'], ['Quy trình', 'PRO'], ['Quy chế', 'REG'], ['Tiêu chuẩn', 'STD']]

const ASSIGNED = [
  { Icon: Box, name: 'Hội nhập team Sản phẩm', by: 'Helen', due: '20/9', rules: 12, read: 9, quiz: '8 / 10', state: 'in progress' as const },
  { Icon: TrendingUp, name: 'Hội nhập team Kinh doanh', by: 'Daniel', due: '26/9', rules: 8, read: 2, quiz: '—', state: 'in progress' as const },
  { Icon: Users, name: 'Nhân sự & Chính sách chung', by: 'Jane', due: '12/9', rules: 15, read: 15, quiz: '10 / 10', state: 'attested' as const },
  { Icon: Compass, name: 'Lãnh đạo & Quản lý', by: 'Brian', due: '3/10', rules: 6, read: 0, quiz: '—', state: 'not started' as const },
]

/* The app column every page shares: Work rules — Home, Rules, Assignments,
   Inbox; the important and service sections; reports and settings at the foot. */
export type RulesNav = 'rules' | 'assignments' | 'inbox' | 'personal' | 'service' | 'company'

export function RulesSide({ on }: { on: RulesNav }) {
  return (
    <div className="mk-side mk-rw-side">
      <div className="title"><BookMarked size={15} />Work rules</div>
      <SideRow icon={<Home size={15} />} label="Trang chủ" />
      <SideRow icon={<BookOpen size={15} />} label="Quy định" on={on === 'rules'} />
      <SideRow icon={<ClipboardList size={15} />} label="Được giao" on={on === 'assignments'} />
      <SideRow icon={<Inbox size={15} />} label="Hộp thư" on={on === 'inbox'} />
      <Sec>QUAN TRỌNG</Sec>
      <SideRow icon={<BookOpen size={15} />} label="Quy định cá nhân" on={on === 'personal'} />
      <Sec>SERVICE QUY ĐỊNH</Sec>
      <SideRow icon={<BookOpen size={15} />} label="Phát triển sản phẩm" on={on === 'service'} />
      <SideRow icon={<BookOpen size={15} />} label="Kinh doanh & Marketing" />
      <SideRow icon={<BookOpen size={15} />} label="Chính sách công ty" on={on === 'company'} />
      <SideRow icon={<BookOpen size={15} />} label="Tiêu chuẩn kỹ thuật" />
      <div className="mk-rw-foot">
        <SideRow icon={<BarChart3 size={15} />} label="Báo cáo" />
        <SideRow icon={<Settings size={15} />} label="Cài đặt" />
        <div className="tenant"><b>B</b>Base.vn<ChevronsUpDown size={13} /></div>
      </div>
    </div>
  )
}

export function RulesCol({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="mk-rw-col">
      <div className="hd"><Menu size={15} />{title}</div>
      {children}
    </div>
  )
}
export function RulesColRow({ icon, label, on, check, tag, checked, indent }: { icon?: ReactNode; label: string; on?: boolean; check?: boolean; tag?: string; checked?: boolean; indent?: number }) {
  return (
    <div className={`row${on ? ' on' : ''}`} style={indent ? { paddingLeft: 9 + indent * 18 } : undefined}>
      {check && <i className={`cb${checked ? ' on' : ''}`} />}
      {icon}<span className="l">{label}</span>{tag && <small>{tag}</small>}
    </div>
  )
}

export function RulesShell({ on, col, children }: { on: RulesNav; col?: ReactNode; children: ReactNode }) {
  // The main column is sized to what the slide window shows: wider when there is no page menu.
  return (
    <>
      <TopBar />
      <div className="mk-app">
        <RulesSide on={on} />
        {col}
        <div className={`mk-main mk-rw-main${col ? '' : ' wide'}`}>{children}</div>
      </div>
    </>
  )
}

/* 1 · Rules: the register — every rule in the company, a card each. */
function RulesPage() {
  return (
    <RulesShell on="rules" col={
      <RulesCol title="Quy định">
        <RulesColRow icon={<FileText size={14} />} label="Quy định" on />
        <RulesColRow icon={<BookMarked size={14} />} label="Thuật ngữ" />
        <RulesColRow icon={<FileText size={14} />} label="Tài liệu" />
        <RulesColRow icon={<Folder size={14} />} label="Bộ sưu tập" />
        <div className="rule" />
        <RulesColRow check checked icon={<List size={14} />} label="Tất cả" />
        <RulesColRow check icon={<User size={14} />} label="Của tôi" />
        <RulesColRow check icon={<Pencil size={14} />} label="Bản nháp" />
        <RulesColRow check icon={<Archive size={14} />} label="Lưu trữ" />
        <div className="sec">LOẠI QUY ĐỊNH</div>
        <RulesColRow check checked label="Tất cả loại" />
        {TYPES.map(([n, t]) => <RulesColRow key={t} check label={n} tag={t} />)}
      </RulesCol>
    }>
      <div className="mk-head">
        <span className="crumb">Quy định <span style={{ fontWeight: 400, color: 'var(--mk-muted)' }}>328 quy định</span></span>
        <span className="mk-rw-search"><Search size={14} />Tìm quy định…</span>
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}>Tất cả kênh<ChevronDown size={14} /></span>
        <span className="mk-btn" style={{ marginLeft: 0 }}><Plus size={14} />Tạo quy định</span>
      </div>
      <div className="mk-rw-cards">
        {RULES.map(r => (
          <div key={r.code} className="mk-rw-card">
            <div className="t"><Pill kind={KIND[r.kind]}>{KIND_VI[r.kind].toUpperCase()}</Pill><span className="code">{r.code}</span><Pill kind="green">ĐÃ BAN HÀNH</Pill></div>
            <div className="n">{r.name}</div>
            <div className="m">8 giờ trước</div>
          </div>
        ))}
      </div>
    </RulesShell>
  )
}

/* 1b · A rule page: above the content, the box that says which services the
   rule applies inside and which agents read it. */
const DIRECTORY: [string, number, number, boolean?][] = [
  ['Nghiên cứu & Khám phá', 11, 0], ['Lập kế hoạch & Ưu tiên', 16, 0, true], ['Roadmap', 5, 1, true], ['Đặc tả & Yêu cầu', 5, 1],
  ['Xếp hạng ưu tiên', 3, 1], ['Ước lượng & Cam kết', 3, 1], ['Thiết kế & UX', 16, 0], ['Triển khai & Ra mắt', 11, 0],
  ['Phân tích & Thử nghiệm', 7, 0], ['Phản hồi & Vòng đời', 5, 0, true], ['Phản hồi khách hàng', 3, 1], ['Khai tử tính năng', 2, 1],
]
function LinkedPage() {
  return (
    <RulesShell on="service" col={
      <RulesCol title={<><span className="l">Phát triển sản phẩm</span><ChevronDown size={14} style={{ color: 'var(--mk-muted)', flex: 'none' }} /></>}>
        <div className="find"><Search size={13} />Tìm danh mục…<Plus size={13} style={{ marginLeft: 'auto' }} /></div>
        <RulesColRow icon={<FileText size={14} />} label="Quy định" on />
        <RulesColRow icon={<FileText size={14} />} label="Tài liệu" />
        <RulesColRow icon={<BookMarked size={14} />} label="Thuật ngữ" />
        <RulesColRow icon={<Sparkles size={14} />} label="Hỏi AI" />
        <div className="rule" />
        <div className="sec">DANH MỤC QUY ĐỊNH</div>
        {DIRECTORY.map(([n, c, d, open]) => (
          <RulesColRow key={n} indent={d} on={n === 'Roadmap'} tag={String(c)} label={n}
            icon={open ? <FolderOpen size={14} style={{ color: '#EAB308' }} /> : <FolderClosed size={14} style={{ color: '#EAB308' }} />} />
        ))}
      </RulesCol>
    }>
      <div className="mk-head">
        <span className="crumb mk-rw-crumb"><span>Lập kế hoạch & Ưu tiên</span><ChevronRight size={14} /><span>Roadmap</span><ChevronRight size={14} /><b>Tiêu chuẩn truyền thông Roadmap</b></span>
        <span className="mk-btn ghost"><ExternalLink size={13} />Mở toàn trang</span>
      </div>
      <div className="mk-rw-rule">
        <div className="meta">
          <Pill kind="medium">TIÊU CHUẨN</Pill><span className="code">STD-092</span><Pill kind="grey">SẢN PHẨM</Pill><Pill kind="green">ĐÃ BAN HÀNH</Pill>
          <span className="when">v1 · Cập nhật 14 phút trước · Hiệu lực từ 15/12/2025</span>
        </div>
        <div className="linked">
          <div className="col">
            <div className="h"><Layers size={13} />Service liên kết</div>
            <div className="chips"><span><Layers size={11} />Roadmap sản phẩm</span><span><Layers size={11} />Kế hoạch phát hành</span></div>
          </div>
          <div className="col">
            <div className="h"><Sparkles size={13} />Agent liên kết</div>
            <div className="chips"><span className="ag"><Sparkles size={11} />Copilot Roadmap</span><span className="ag"><Sparkles size={11} />Agent kiểm duyệt</span></div>
          </div>
          <div className="note">Áp dụng trong các service này · các agent này đọc trước khi hành động</div>
        </div>
        <div className="doc">
          <h3>Tiêu chuẩn</h3>
          <p>Tiêu chuẩn này quy định các yêu cầu bắt buộc khi truyền thông về roadmap.</p>
          <h3>Yêu cầu</h3>
          <ul>
            <li>Hạng mục chỉ được đưa vào roadmap khi có người phụ trách và kết quả mong đợi rõ ràng.</li>
            <li>Mọi thông tin roadmap công bố ra bên ngoài phải được team Truyền thông duyệt trước.</li>
            <li>Kế hoạch quý lập theo năng lực thực tế, chừa khoảng trống cho hỗ trợ và sửa lỗi.</li>
            <li>Roadmap thể hiện định hướng và thứ tự ưu tiên, không cam kết ngày cụ thể.</li>
          </ul>
          <h3>Ngoại lệ</h3>
          <p>Mọi ngoại lệ cần văn bản miễn trừ của team phụ trách, ghi rõ ngày hết hạn.</p>
        </div>
      </div>
    </RulesShell>
  )
}

/* 1c · The service side of the same link: a workflow's Settings with the
   "AI rules & agents" tab — the rules this service runs under, and the agents
   that read them. Drawn on the Workflows app, Customer Onboarding Process. */
const SVC_RULES: { kind: Kind | 'Directive'; code: string; name: string; where: string; v: string; from?: string }[] = [
  { kind: 'Policy', code: 'POL-021', name: 'Chính sách onboarding khách hàng', where: 'Mọi lượt chạy · đọc trước khi bắt đầu', v: 'v3' },
  { kind: 'Procedure', code: 'PRO-064', name: 'Quy trình khởi tạo workspace', where: 'Giai đoạn: Khởi tạo', v: 'v2' },
  { kind: 'Standard', code: 'STD-045', name: 'Tiêu chuẩn xử lý dữ liệu khách hàng', where: 'Mọi giai đoạn', v: 'v5', from: 'Công ty' },
  { kind: 'Guideline', code: 'GLN-030', name: 'Hướng dẫn buổi kickoff', where: 'Giai đoạn: Kickoff', v: 'v1' },
  { kind: 'Directive', code: 'DIR-007', name: 'Phản hồi đầu tiên trong 1 ngày làm việc', where: 'Mọi lượt chạy · SLA', v: 'v1', from: 'Customer Success' },
  { kind: 'Decision', code: 'DEC-012', name: 'Gói Enterprise có CSM riêng', where: 'Lượt chạy có gói = Enterprise', v: 'v1' },
]
const SVC_KIND: Record<string, string> = { ...KIND, Directive: 'high' }

const SVC_AGENTS: { name: string; role: string; reads: string; does: string; on?: boolean }[] = [
  { name: 'Copilot Onboarding', role: 'Copilot của service', reads: 'cả 6 quy định', does: 'Trả lời trên mọi lượt chạy · soạn brief buổi kickoff', on: true },
  { name: 'Agent khởi tạo', role: 'Workflow agent', reads: 'PRO-064 · STD-045', does: 'Tự chạy trọn giai đoạn Khởi tạo' },
  { name: 'Agent kiểm duyệt', role: 'Workflow agent', reads: 'POL-021 · DIR-007', does: 'Đối chiếu mọi lượt chạy với chính sách trước khi Hoàn thành' },
]

function ServicePage() {
  return (
    <div className="mk-wf mk-rw-svc">
      <TopBar />
      <div className="mk-app">
        <WorkflowsSide />
        <div className="mk-rw-col settings">
          <div className="hd">Cài đặt</div>
          <RulesColRow label="Thông tin chung" />
          <RulesColRow icon={<Sparkles size={14} />} label="Quy định & agent" on />
          <RulesColRow label="Giai đoạn" />
          <RulesColRow label="Trường dữ liệu" />
          <RulesColRow label="Lịch chạy" />
          <RulesColRow label="Chính sách" />
          <RulesColRow label="Quy tắc thực thi" />
          <RulesColRow label="Mẫu in" />
          <RulesColRow label="Tích hợp" />
        </div>
        <div className="mk-main mk-rw-main">
          <div className="mk-head">
            <span className="crumb" style={{ fontSize: 15 }}>Quy trình onboarding khách hàng <ChevronDown size={13} className="sep" /> <Bookmark size={14} className="sep" /> <ChevronRight size={14} className="sep" /></span>
            <span className="mk-wf-tabs"><span>Lượt chạy</span><span>Nhóm</span><span>Tự động hóa</span><span>Báo cáo</span><span>Trình dựng</span><span className="on">Cài đặt</span></span>
          </div>
          <div className="mk-rw-svchead"><b>Quy định &amp; agent</b><span>Các quy định workflow này tuân theo, và các agent đọc chúng.</span></div>
          <div className="mk-rw-svcbody">
            <div className="card" data-callout="service-rules">
              <div className="ch">
                <div><b>Quy định trong service này</b><span>Liên kết từ Work rules. Mọi lượt chạy của workflow này đều tuân theo — cho cả người và agent.</span></div>
                <span className="mk-btn ghost"><Link2 size={14} />Liên kết quy định</span>
              </div>
              <div className="rules">
                {SVC_RULES.map(r => (
                  <div key={r.code} className="r">
                    <span className="k"><Pill kind={SVC_KIND[r.kind]}>{KIND_VI[r.kind].toUpperCase()}</Pill><code>{r.code}</code></span>
                    <span className="n"><b>{r.name}</b><small>{r.where}</small></span>
                    <span className="f">{r.from ? <><Layers size={12} />Kế thừa · {r.from}</> : <><Workflow size={12} />Service này</>}</span>
                    <span className="v">{r.v}</span>
                    <span><Pill kind="green">Đã ban hành</Pill></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="ch">
                <div><b>Agent trong service này</b><span>Các agent làm việc trong workflow này. Mỗi agent đọc quy định trước khi hành động, và trích dẫn chúng trên lượt chạy.</span></div>
                <span className="mk-btn ghost"><Plus size={14} />Thêm agent</span>
              </div>
              <div className="agents">
                {SVC_AGENTS.map(a => (
                  <div key={a.name} className={`ag${a.on ? ' on' : ''}`}>
                    <i><Sparkles size={15} /></i>
                    <div>
                      <b>{a.name}</b>
                      <small>{a.role}</small>
                      <p><ScrollText size={12} />Đọc {a.reads}</p>
                      <p>{a.does}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="ch"><div><b>Quy định đến với agent thế nào</b><span>Bản hướng dẫn cho agent của mỗi quy định được tạo lại mỗi lần ban hành; agent đọc phiên bản mới nhất khi bắt đầu mỗi task.</span></div></div>
              <div className="opts">
                <label><i className="cb on" />Yêu cầu agent trích dẫn quy định đã dùng</label>
                <label><i className="cb on" />Chặn <em>Hoàn thành</em> khi kiểm tra chính sách không đạt</label>
                <label><i className="cb" />Cho phép agent đề xuất sửa quy định</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 2 · Inbox: every rollout — the announcement that reaches each person. */
function RolloutsPage() {
  return (
    <RulesShell on="inbox">
      <div className="mk-head">
        <span className="crumb">Tất cả thông báo<ChevronDown size={15} style={{ color: 'var(--mk-muted)' }} /><span style={{ fontWeight: 400, color: 'var(--mk-muted)', marginLeft: 10 }}>328 quy định · mọi quy định bạn được xem</span></span>
        <span className="mk-rw-search"><Search size={14} />Tìm thông báo…</span>
        <span className="mk-btn ghost" style={{ marginLeft: 0 }}>Lọc<ChevronRight size={14} /></span>
        <span className="mk-btn" style={{ marginLeft: 0 }}><Megaphone size={14} />Tạo thông báo</span>
      </div>
      <div className="mk-rw-table">
        <div className="th"><span>QUY ĐỊNH</span><span>TRẠNG THÁI</span><span>CẬP NHẬT</span></div>
        {RULES.map(r => (
          <div key={r.code} className="tr">
            <span className="rule"><FileText size={16} /><span><b>{r.name}</b><code>{r.code}</code></span></span>
            <span><Pill kind="green">Đã ban hành</Pill></span>
            <span className="when">8 giờ trước</span>
          </div>
        ))}
      </div>
    </RulesShell>
  )
}

/* 3 · Assignments: readings and attestations someone asked you to do — with
   the reading, the attestation and the knowledge check per collection. */
function AssignmentsPage() {
  return (
    <RulesShell on="assignments" col={
      <RulesCol title="Được giao">
        <RulesColRow icon={<UserCheck size={14} />} label="Giao cho tôi" on />
        <RulesColRow icon={<Send size={14} />} label="Tôi đã giao" />
        <div className="sec">ĐỌC & XÁC NHẬN <ChevronDown size={13} /></div>
        <RulesColRow icon={<Box size={14} />} label="Hội nhập team Sản phẩm" />
        <RulesColRow icon={<TrendingUp size={14} />} label="Hội nhập team Kinh doanh" />
        <RulesColRow icon={<Compass size={14} />} label="Lãnh đạo & Quản lý" />
        <RulesColRow icon={<Users size={14} />} label="Nhân sự & Chính sách chung" />
      </RulesCol>
    }>
      <div className="mk-head">
        <span className="crumb">Giao cho tôi <span style={{ fontWeight: 400, color: 'var(--mk-muted)' }}>4 bộ quy định · bạn được yêu cầu đọc và xác nhận</span></span>
      </div>
      <div className="mk-rw-asg">
        <div className="mk-rw-asgkpis">
          <div><span className="l">Giao cho tôi</span><b>4</b><small>bộ quy định</small></div>
          <div><span className="l">Đã đọc</span><b>26 / 41</b><small>trên cả bốn bộ</small></div>
          <div><span className="l">Đã xác nhận</span><b>1 / 4</b><small>2 bộ đến hạn tháng này</small></div>
          <div><span className="l">Kiểm tra kiến thức</span><b>90%</b><small>điểm trung bình</small></div>
        </div>
        {ASSIGNED.map(a => {
          const pct = Math.round((a.read / a.rules) * 100)
          return (
            <div key={a.name} className={`mk-rw-asgcard ${a.state.replace(' ', '-')}`}>
              <div className="ic"><a.Icon size={20} /></div>
              <div className="body">
                <div className="t"><b>{a.name}</b>
                  {a.state === 'attested' ? <Pill kind="green"><CheckCircle2 size={11} />Đã xác nhận</Pill>
                    : a.state === 'in progress' ? <Pill kind="medium"><Clock size={11} />Đang thực hiện</Pill>
                    : <Pill kind="grey">Chưa bắt đầu</Pill>}
                </div>
                <div className="m">Giao bởi {a.by} · {a.rules} quy định · xác nhận trước {a.due}</div>
                <div className="bar"><span style={{ width: `${pct}%` }} /></div>
                <div className="kpi"><span>Đã đọc <b>{a.read} / {a.rules}</b></span><span>Kiểm tra kiến thức <b>{a.quiz}</b></span><span>{pct}%</span></div>
              </div>
            </div>
          )
        })}
      </div>
    </RulesShell>
  )
}

const PAGES: Record<Page, () => ReactNode> = { rules: RulesPage, linked: LinkedPage, service: ServicePage, rollouts: RolloutsPage, assignments: AssignmentsPage }

export function RulesWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % RULES_WALK.length), RULES_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const page: Page = walk ? RULES_WALK[walk.index].key : reduce ? 'rules' : RULES_WALK[own].key
  const Body = PAGES[page]
  return (
    <div className="mk-tw mk-rw">
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
