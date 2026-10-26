import {
  Menu, Columns3, ChevronRight, MoreHorizontal, DollarSign, User, Building2, Flag, Pencil, Eye, Users, UserPlus, Paperclip,
  ShoppingCart, FileText, Mail, Calendar, Phone, MessageSquare, CheckSquare, ChevronDown, ClipboardCheck, MessagesSquare,
  BookOpen, Network, Workflow, Send, Timer, Bot, Sparkles, FilePen, Activity, Info, Plus,
} from 'lucide-react'
import { TopBar } from './Window'
import { Av, Pill, SideRow, Sec } from './parts'
import { PfRail, SALES_RAIL } from './PlatformMocks'

/* Sales › a deal opened, as the capture shows it: the stage bar across the
   top, the deal's own sidebar — collaborations, smart ops, agent flows — and
   three columns: overview and contacts, the custom fields by group, owner
   and team, forecasts, files, discussion. Invented names and numbers. */
const STAGES = ['1 Thẩm định (Đã đặt SQL)', 'Đã họp trong 24H', '2 Khám phá (SAL)', 'Đã đặt demo lần 2', 'Đã demo lần 2', '3 Giải pháp (Opp)', '4 Thương mại (Đề xuất)', '5 Thanh toán', 'Onboard / Cập nhật']

const Kv = ({ k, v, tag }: { k: string; v: React.ReactNode; tag?: boolean }) => (
  <div className="mk-dd-kv"><span>{k}</span>{tag ? <b className="tag">{v}</b> : <b>{v}</b>}</div>
)

export function DealDetailMock() {
  return (
    <div className="mk-pf mk-dd">
      <TopBar />
      <div className="mk-app">
        <PfRail active="pipelines" items={SALES_RAIL} />
        <div className="mk-side" style={{ width: 216 }}>
          <SideRow icon={<DollarSign size={15} />} label="Deal" on />
          <SideRow icon={<ShoppingCart size={15} />} label="Thương mại" />
          <SideRow icon={<FileText size={15} />} label="Ghi chú" />
          <SideRow icon={<Mail size={15} />} label="Email" />
          <SideRow icon={<Calendar size={15} />} label="Cuộc họp" />
          <SideRow icon={<Phone size={15} />} label="Cuộc gọi" />
          <SideRow icon={<MessageSquare size={15} />} label="Trò chuyện" />
          <SideRow icon={<CheckSquare size={15} />} label="Công việc" />
          <Sec><span><ChevronDown size={12} style={{ verticalAlign: -2 }} /> CỘNG TÁC</span></Sec>
          <SideRow icon={<ClipboardCheck size={15} />} label="Việc cần làm" />
          <SideRow icon={<MessagesSquare size={15} />} label="Phản hồi" />
          <SideRow icon={<BookOpen size={15} />} label="Bài viết" />
          <SideRow icon={<Network size={15} />} label="Sơ đồ tổ chức" />
          <Sec><span><ChevronDown size={12} style={{ verticalAlign: -2 }} /> VẬN HÀNH THÔNG MINH</span></Sec>
          <SideRow icon={<Workflow size={15} />} label="Tự động hóa" />
          <SideRow icon={<Send size={15} />} label="Chuỗi email" />
          <SideRow icon={<Timer size={15} />} label="SLA" />
          <SideRow icon={<Bot size={15} />} label="Luồng agent" />
          <div className="mk-pf-sidefoot">
            <div className="row"><Sparkles size={15} /><span>Copilot</span><Pill kind="medium">BETA</Pill></div>
            <SideRow icon={<FilePen size={15} />} label="Sửa deal" />
            <SideRow icon={<Activity size={15} />} label="Nhật ký hoạt động" />
          </div>
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <Menu size={15} style={{ color: 'var(--mk-muted)' }} />
            <span className="crumb" style={{ fontWeight: 500, color: 'var(--mk-muted)' }}><Columns3 size={14} /> Base | Sales Pipeline <ChevronRight size={13} className="sep" /> <span style={{ color: 'var(--mk-ink)' }}>MY - Stampin Confectionary - Kysy</span></span>
            <span className="mk-btn" style={{ background: 'var(--mk-green)' }}>Thắng</span>
            <span className="mk-btn" style={{ marginLeft: 0, background: 'var(--mk-red)' }}>Thua</span>
            <MoreHorizontal size={16} style={{ color: 'var(--mk-muted)', marginLeft: 6 }} />
          </div>
          <div className="mk-dd-title">
            <div>
              <b>MY - Stampin Confectionary - Kysy</b>
              <div className="meta"><span><DollarSign size={13} />$0</span><span><User size={13} />Kysy</span><span><Building2 size={13} />Stampin Confectionary</span></div>
            </div>
            <div className="owner"><Av p="L" size={38} /><div><b>Jolie Carter</b><span>Người phụ trách</span></div></div>
          </div>
          <div className="mk-dd-stages">
            {STAGES.map((s, i) => <span key={s} className={i < 4 ? 'done' : i === 4 ? 'on' : undefined}>{s}</span>)}
          </div>
          <div className="mk-dd-sub">
            <span><Columns3 size={13} /> Base | Sales Pipeline <ChevronRight size={12} /> <i /> Đã demo lần 2</span>
            <span className="r">Xác suất: <b>100%</b><em><Flag size={13} /> Đặt ngày chốt dự kiến</em></span>
          </div>
          <div className="mk-dd-body">
            <div className="col">
              <div className="mk-pf-box">
                <div className="bh"><b>Tổng quan</b><Pencil size={13} /></div>
                <Kv k="Giá trị dự kiến" v={<Pill kind="medium">Đang mở</Pill>} />
                <div className="mk-dd-kv"><span>USD</span><b className="big">0</b></div>
                <div className="mk-dd-kv"><span>Xác suất</span><b className="prob">100</b></div>
                <Kv k="Pipeline" v={<>Base | Sales Pipeline<br />› Đã demo lần 2</>} />
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Liên hệ chính</b><Pencil size={13} /></div>
                <div className="contact"><span className="mk-av" style={{ background: '#DC2626', width: 40, height: 40, fontSize: 16 }}>K</span><div><b>Kysy</b><span>Quản lý</span></div><ChevronRight size={14} /></div>
                <Kv k="Điện thoại" v="601-284-82661" />
                <Kv k="Email" v={<span style={{ color: 'var(--mk-blue-ink)' }}>kysy_93@example.com</span>} />
                <Kv k="Nhãn" v="—" />
                <Kv k="SĐT khác" v="—" />
                <Sec>LIÊN HỆ KHÁC (0) <Plus size={12} /></Sec>
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Khách hàng chính</b><Pencil size={13} /></div>
                <div className="contact"><span className="mk-av" style={{ background: '#7C3AED', width: 40, height: 40, fontSize: 13 }}>SC</span><div><b>Stampin Confectionary</b></div><ChevronRight size={14} /></div>
              </div>
            </div>
            <div className="col mid">
              <div className="mk-pf-box">
                <div className="bh"><b>Trường tùy chỉnh</b><Pencil size={13} /></div>
                <div className="fh"><span>19/52 trường</span><span><Eye size={13} /> Hiện trường trống (33)</span></div>
                <div className="grp"><ChevronDown size={13} /> Thông tin chung</div>
                <Kv k="• Quốc gia" v="Malaysia" tag />
                <Kv k="Loại deal" v="Mới" tag />
                <Kv k="Vì sao deal này thành SAL? Bước tiếp theo là gì?" v="đã gặp thế hệ thứ hai của gia đình, thêm một buổi với đội ngũ trước khi đề xuất lên ban lãnh đạo" />
                <Kv k="ID nguồn lead v2" v="lead221515" />
                <Kv k="Liên hệ chính v2" v="27425" />
                <Kv k="Khách hàng chính v2" v="27425" />
                <Kv k="ID deal v2" v="144,186.00" />
                <Kv k="Link deal v2" v="https://standard.base.vn/sales/deal/144186" />
                <Kv k="Ngày SAL" v="03/09/2026" />
                <Kv k="Ngày đặt demo lần 2" v="03/09/2026" />
                <Kv k="Trạng thái SQL" v="Hoàn thành" tag />
                <Kv k="Ngày tạo deal" v="27/08/2026" />
                <div className="grp"><ChevronDown size={13} /> <i className="n">1</i> Thẩm định (Đã đặt SQL)</div>
                <Kv k={'(P) Vấn đề'} v="Đã xác nhận vấn đề. Trạng thái: đã xác nhận — quy trình hiện tại rất thủ công, gây sai sót và kém hiệu quả; đôi khi bỏ lỡ tin nhắn và đơn hàng của khách; nhân viên quá tải với việc nhập liệu và đóng gói đơn." />
              </div>
            </div>
            <div className="col">
              <div className="mk-pf-box">
                <div className="bh"><b>Phụ trách &amp; đội ngũ</b></div>
                <div className="contact framed"><Av p="L" size={40} /><div><b>Jolie Carter</b><span>Người phụ trách</span></div><Pencil size={13} /></div>
                <div className="line"><b>Cộng tác viên (0)</b><em><Users size={13} /> Cộng tác</em></div>
                <span className="hint">Cộng tác cùng đồng đội của bạn</span>
                <div className="line"><b>Người theo dõi</b><em>Thêm người theo dõi <UserPlus size={13} style={{ marginLeft: 8 }} /> Theo dõi</em></div>
                <span className="hint">Chưa có người theo dõi.</span>
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Dự báo</b></div>
                <div className="line"><span className="cap">0 MỤC DỰ BÁO</span><em><Plus size={12} /> Đưa vào dự báo</em></div>
                <span className="hint">Chưa thuộc kỳ dự báo nào.</span>
                <Kv k="Giá trị có trọng số" v={<>$0 <small>(100%)</small></>} />
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Tệp</b><Paperclip size={13} /></div>
                <span className="hint">Chưa có tệp đính kèm.</span>
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Thảo luận</b></div>
                <div className="compose">Viết bình luận…</div>
                <div className="line"><span className="cap"><Info size={12} /> Nhấn Enter …</span><em>Gửi</em></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
