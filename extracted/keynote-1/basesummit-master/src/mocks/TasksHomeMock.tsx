import { Home, Bookmark, Circle, List, ChevronDown, ChevronRight, Plus, Pin, Search } from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Pill, Overdue, Due, Status, Tools, Who, Team } from './parts'

/* The Tasks home, as it is — every service's work requests in one list. */

interface Kid { code: string; name: string; done?: boolean }
interface WR {
  name: string; link?: boolean; prio: 'critical' | 'high' | 'medium'
  code: string; svc: string; who?: string; team?: [string, string, string]
  due: string; date: string; pinned?: boolean; kids?: Kid[]
}

const PINNED: WR[] = [
  { name: 'Thay máy nén HVAC cụm B-7', prio: 'critical', code: 'FAC-519', svc: 'Bảo trì cơ sở vật chất', who: 'E', due: '03/07', date: '03/07/2026', pinned: true },
  { name: 'Sửa HVAC phòng máy chủ — nhiệt độ đang tăng', link: true, prio: 'critical', code: 'FAC-518', svc: 'Bảo trì cơ sở vật chất', team: ['BD', 'Tòa nhà', '#2563EB'], due: '04/07', date: '03/07/2026', pinned: true,
    kids: [{ code: 'FAC-520', name: 'Lắp máy lạnh di động tạm thời', done: true }, { code: 'FAC-519', name: 'Thay máy nén HVAC cụm B-7' }] },
  { name: 'Cấu hình VPN cho máy trạm macOS', prio: 'high', code: 'IT-1044', svc: 'IT/Hạ tầng', team: ['NO', 'Mạng', '#0891B2'], due: '04/07', date: '03/07/2026', pinned: true },
]

const REGULAR: WR[] = [
  { name: 'Triển khai cấu hình VPN mới cho đội kỹ thuật', prio: 'high', code: 'IT-1042', svc: 'IT/Hạ tầng', team: ['NO', 'Mạng', '#0891B2'], due: '05/07', date: '03/07/2026',
    kids: [{ code: 'IT-1043', name: 'Cấu hình VPN cho máy trạm Linux', done: true }, { code: 'IT-1044', name: 'Cấu hình VPN cho máy trạm macOS' }] },
  { name: 'Sửa lỗi múi giờ trong báo cáo định kỳ', prio: 'medium', code: 'PRD-286', svc: 'Sản phẩm', team: ['B', 'Backend', '#64748B'], due: '08/07', date: '02/07/2026' },
  { name: 'Khởi động sáng kiến cắt giảm chi phí Q2', prio: 'critical', code: 'EXD-020', svc: 'Chỉ đạo điều hành', who: 'B', due: '02/08', date: '02/07/2026',
    kids: [{ code: 'EXD-022', name: 'Đàm phán lại hợp đồng nhà cung cấp lớn' }, { code: 'EXD-021', name: 'Hoàn tất kiểm kê license SaaS', done: true }] },
  { name: 'Xây tính năng import hàng loạt cho tài khoản doanh nghiệp', prio: 'high', code: 'PRD-283', svc: 'Sản phẩm', team: ['B', 'Backend', '#64748B'], due: '08/07', date: '02/07/2026',
    kids: [{ code: 'PRD-284', name: 'Xây kiểm tra CSV và báo lỗi', done: true }, { code: 'PRD-285', name: 'Xây giao diện tiến độ import hàng loạt' }] },
  { name: 'Khởi động chiến dịch nhận diện sản phẩm Q2', prio: 'high', code: 'MKT-118', svc: 'Marketing & Kinh doanh', who: 'Z', due: '09/07', date: '02/07/2026' },
]

const PRIO_LABEL = { critical: 'Khẩn cấp', high: 'Cao', medium: 'Trung bình' }

function Card({ wr }: { wr: WR }) {
  return (
    <div className={`mk-card${wr.pinned ? ' pinned' : ''}`}>
      <div className="t">
        <Status />
        <span className={`name${wr.link ? ' link' : ''}`}>{wr.name}</span>
        <Pill kind={wr.prio} caret>{PRIO_LABEL[wr.prio]}</Pill>
        <Overdue />
        <Tools pinned={wr.pinned} />
      </div>
      <div className="m">
        <span className="code">{wr.code}</span>
        <span className="svc">{wr.svc}</span>
        {wr.who && <Who p={wr.who} />}
        {wr.team && <Team code={wr.team[0]} name={wr.team[1]} color={wr.team[2]} />}
        <Due d={wr.due} />
        <span>{wr.date}</span>
      </div>
      {wr.kids && (
        <div className="kids" data-callout={wr.code === 'FAC-518' ? 'kids' : undefined}>
          {wr.kids.map(k => (
            <div key={k.code} className={`kid${k.done ? ' done' : ''}`}><Status done={k.done} sm /><span className="code">{k.code}</span><span>{k.name}</span></div>
          ))}
        </div>
      )}
    </div>
  )
}

const WORK_REQUESTS = [['E', 'Ban điều hành', '#2563EB'], ['O', 'Vận hành', '#16A34A'], ['P', 'Sản phẩm', '#7C3AED'], ['M', 'Marketing & Kinh doanh', '#DB2777'], ['O', 'Khác', '#6B7280']]
const WORKSPACES = [['O', '[Chính thức] Công ty', '#2563EB'], ['T', 'Đội ngũ & Văn hóa', '#0891B2'], ['G', 'Tăng trưởng', '#16A34A'], ['P', 'Sản phẩm & Dịch vụ', '#2563EB'], ['P', 'Sản phẩm & Kỹ thuật…', '#7C3AED'], ['I', 'IT / Hạ tầng', '#1D4ED8'], ['F', 'Cơ sở vật chất', '#16A34A'], ['M', 'Marketing & Kinh doanh', '#DB2777'], ['E', 'Kỹ thuật', '#2563EB'], ['C', 'Khách hàng', '#0891B2'], ['M', 'Marketing', '#DB2777'], ['O', 'Vận hành', '#2563EB']]

/** `rail={false}` drops the app rail, for a page comparing app layouts. */
export function TasksHomeMock({ rail = true }: { rail?: boolean }) {
  return (
    <>
      <TopBar />
      <div className="mk-app">
        {rail && <Rail active="tasks" />}
        <div className="mk-side">
          <div className="title"><Circle size={15} />Công việc</div>
          <SideRow icon={<Home size={15} />} label="Trang chủ" on />
          <SideRow icon={<Bookmark size={15} />} label="Việc của tôi" />
          <SideRow icon={<Bookmark size={15} />} label="Bảo trì cơ sở vật chất" />
          <Sec>YÊU CẦU CÔNG VIỆC <Search size={13} /></Sec>
          {WORK_REQUESTS.map(([l, n, c], i) => <SideRow key={i} ltr={l} color={c} label={n} chev />)}
          <Sec>KHÔNG GIAN LÀM VIỆC</Sec>
          {WORKSPACES.map(([l, n, c], i) => <SideRow key={i} ltr={l} color={c} label={n} chev={i === 3 || i === 4 || i === 5 || i === 6 || i === 7} />)}
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb"><Home size={15} />Trang chủ<ChevronRight size={14} className="sep" /></span>
            <span className="mk-view on">Tổng quan</span><span className="mk-view">Kanban</span><span className="mk-view">Theo hạn</span><span className="mk-view">Lịch</span>
            <span className="mk-btn"><Plus size={15} />Tạo công việc<span className="split"><ChevronDown size={14} /></span></span>
          </div>
          <div className="mk-subhead">
            <span className="mk-tab on">Tất cả công việc</span>
            <span className="mk-tab">Giao cho tôi <span className="n">1</span></span>
            <span className="mk-tab">Tôi giao <span className="n">16</span></span>
            <span className="mk-stats">
              <span><b>17</b> đang mở</span><span><b className="red">17</b> quá hạn</span><span><b className="amber">1</b> tạm dừng</span><span><b className="green">9</b> xong</span>
              <span className="sel">Mọi trạng thái <ChevronDown size={13} /></span><span className="sel">Mọi service <ChevronDown size={13} /></span>
            </span>
          </div>
          <div className="mk-body">
            <div className="mk-group pinned"><Pin size={14} />Đã ghim <span className="n">3</span></div>
            {PINNED.map(wr => <Card key={wr.code} wr={wr} />)}
            <div className="mk-group"><List size={14} />Công việc thường <span className="n">25</span></div>
            {REGULAR.map(wr => <Card key={wr.code} wr={wr} />)}
          </div>
        </div>
      </div>
    </>
  )
}
