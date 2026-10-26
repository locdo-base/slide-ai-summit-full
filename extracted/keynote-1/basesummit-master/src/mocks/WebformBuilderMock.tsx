import type { ReactNode } from 'react'
import {
  Bookmark, ChevronDown, ChevronRight, Menu, Search, Type, AlignLeft, Hash, Calendar, CalendarClock, CircleDot,
  ListChecks, ToggleLeft, Mail, Link2, Phone, DollarSign, Eye, SlidersHorizontal, PanelRight, Plus, Link, GripVertical,
  Copy, Trash2,
} from 'lucide-react'
import { TopBar } from './Window'
import { WorkflowsSide } from './WorkflowJobsMock'

/* Workflows · Builder · Form: the webform a customer fills in from outside,
   built inside the service — the field palette, and the form's sections with
   every field linked to the service's input fields. One field is selected.
   Invented form. */

const PALETTE: [string, typeof Type][] = [
  ['Văn bản', Type], ['Đoạn văn', AlignLeft], ['Số', Hash], ['Ngày', Calendar], ['Ngày & Giờ', CalendarClock],
  ['Danh sách chọn', CircleDot], ['Chọn nhiều', ListChecks], ['Có/Không', ToggleLeft], ['Email', Mail], ['URL', Link2],
  ['Điện thoại', Phone], ['Tiền tệ', DollarSign],
]

function Field({ label, req, input, icon, select, on, wide }: { label: string; req?: boolean; input: string; icon?: ReactNode; select?: boolean; on?: boolean; wide?: boolean }) {
  return (
    <div className={`fld${on ? ' on' : ''}${wide ? ' wide' : ''}`}>
      {on && <span className="tools"><SlidersHorizontal size={12} /><Copy size={12} /><Trash2 size={12} /></span>}
      {on && <GripVertical size={14} className="grip" />}
      <div className="lb">{label}{req && <i>*</i>}<span className="map"><Link size={10} />{label}</span></div>
      <div className="in">{icon}{input}{select && <ChevronDown size={14} className="dd" />}</div>
    </div>
  )
}

export function WebformBuilderMock() {
  return (
    <div className="mk-pf mk-wf mk-fb">
      <TopBar />
      <div className="mk-app">
        <WorkflowsSide />
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb" style={{ fontSize: 15 }}>Quy trình onboarding khách hàng <ChevronDown size={13} className="sep" /> <Bookmark size={14} className="sep" /> <ChevronRight size={14} className="sep" /></span>
            <span className="mk-wf-tabs"><span>Lượt chạy</span><span>Nhóm</span><span>Tự động hóa</span><span>Báo cáo</span><span className="on">Trình dựng</span><span>Cài đặt</span></span>
          </div>
          <div className="mk-fb-bar">
            <Menu size={15} /><b>Trình dựng form</b>
            <span className="tabs"><span>WORKFLOW</span><span className="on">FORM</span><span>PHÂN CÔNG</span><span>AGENT</span></span>
          </div>
          <div className="mk-fb-body">
            <div className="pal">
              <div className="ptabs"><span className="on">Tất cả trường</span><span>Gợi ý</span></div>
              <div className="ps"><Search size={13} />Tìm loại trường…</div>
              <div className="sec">CƠ BẢN</div>
              {PALETTE.map(([n, I]) => <div key={n} className="pi"><I size={14} />{n}</div>)}
            </div>
            <div className="canvas">
              <div className="ch"><b>Tiếp nhận khách hàng mới</b><ChevronDown size={14} /><span className="acts"><span><Eye size={14} />Xem trước</span><SlidersHorizontal size={14} /><PanelRight size={14} className="blue" /></span></div>
              <div className="card">
                <div className="st"><ChevronDown size={14} /><div><b>Hồ sơ công ty</b><span>Khách hàng là ai.</span></div></div>
                <div className="grid">
                  <Field label="Tên công ty" req input="VD: Acme Logistics" on />
                  <Field label="Website công ty" input="https://" icon={<Link2 size={13} />} />
                  <Field label="Ngành" input="– Chọn –" select />
                  <Field label="Quy mô công ty" req input="– Chọn –" select />
                  <Field label="Trụ sở" input="Thành phố, quốc gia" />
                  <Field label="Khu vực" req input="– Chọn –" select />
                </div>
                <div className="drop"><Plus size={13} />Kéo trường vào đây hoặc bấm để thêm trường mới</div>
                <div className="st second"><ChevronDown size={14} /><div><b>Hợp đồng &amp; thương mại</b><span>Lấy từ đơn hàng đã ký.</span></div></div>
                <div className="grid">
                  <Field label="Gói" req input="– Chọn –" select />
                  <Field label="Số seat đã mua" req input="0" icon={<Hash size={13} />} />
                  <Field label="Giá trị hợp đồng năm" req input="0.00" icon={<DollarSign size={13} />} />
                  <Field label="Ngày bắt đầu HĐ" req input="DD/MM/YYYY" icon={<Calendar size={13} />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
