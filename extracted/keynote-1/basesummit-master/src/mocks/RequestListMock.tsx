import type { CSSProperties } from 'react'
import {
  Home, Bell, ScanSearch, BarChart3, Settings, PlusCircle, PlayCircle, Search, ChevronRight, LayoutGrid,
  FileText, Layers, Tag, Star, Check, X, ChevronDown,
} from 'lucide-react'
import { BrandMark } from '../ui/Brand'

/* Work · Base Request: the "List of requests" at the real product's density —
   star, title with its group and first line, status, who asked, the approvers
   with their verdicts, the date and the unread dot. Every person and request
   is invented; avatars are initials, never photos. */

type St = 'Pending' | 'Approved' | 'Rejected'
type V = 'ok' | 'no' | ''
interface Row { title: string; desc: string; st: St; who: string; hue: number; online?: boolean; appr: [number, V][]; more?: number; date: string; dot: 'grey' | 'blue' | 'red'; open?: boolean }

const ROWS: Row[] = [
  { title: 'Đề xuất chi phí sửa văn phòng Hà Nội', desc: 'Group: Đề xuất chủ trương mua hàng hoá - Dịch vụ · Chi phí cùng hạng mục của tháng trước', st: 'Rejected', who: 'Trần Thu Ngân', hue: 340, appr: [[210, 'no'], [30, ''], [260, '']], more: 1, date: 'Jan 27, 2026', dot: 'grey' },
  { title: 'Gửi tiết kiệm tháng 01.2026_lần 2', desc: 'Group: Direct request · Kính gửi anh/chị, căn cứ tình hình tài chính hiện tại em xin đề xuất', st: 'Pending', who: 'Lê Hải Yến', hue: 12, appr: [[150, ''], [200, 'ok'], [290, '']], date: 'Jan 26, 2026', dot: 'blue' },
  { title: 'Đề xuất bổ nhiệm Business Consulting Team Leader', desc: 'Group: Đề xuất bổ nhiệm CBQL · Thông tin vị trí hiện tại', st: 'Pending', who: 'Phan Quốc Trung', hue: 220, online: true, appr: [[330, ''], [100, ''], [40, '']], date: 'Jan 20, 2026', dot: 'blue', open: true },
  { title: 'Xin làm việc từ xa từ ngày 20/1/2026', desc: 'Group: HN | Làm việc từ xa (WFH) · Phân loại WFH: Đối tượng 3 (CBNV gặp tình huống đặc biệt)', st: 'Pending', who: 'Nguyễn Hoàng Long', hue: 260, appr: [[20, 'ok'], [180, ''], [300, '']], more: 1, date: 'Jan 20, 2026', dot: 'red' },
  { title: 'Đề xuất hạng mục Giải vinh danh 2025', desc: 'Group: Đề xuất chủ trương mua hàng hoá - Dịch vụ · Chi phí cùng hạng mục', st: 'Approved', who: 'Ngô Thanh Tâm', hue: 90, appr: [[210, 'ok'], [30, 'ok'], [270, 'ok']], more: 1, date: 'Jan 19, 2026', dot: 'grey' },
  { title: '[RCĐN] Mục tiêu 2026', desc: 'Group: Direct request · Kính gửi anh chị, sau buổi bảo vệ mục tiêu và kế hoạch để thống nhất', st: 'Approved', who: 'Trương Bảo Duy', hue: 200, appr: [[150, 'ok']], date: 'Jan 19, 2026', dot: 'grey' },
  { title: 'LEAD GEN | ĐỀ XUẤT MỞ & KHAI THÁC KÊNH TIKTOK', desc: 'Group: Direct request · Kính gửi anh/chị, nhằm mở rộng độ phủ thương hiệu', st: 'Rejected', who: '@thuylinh02', hue: 170, appr: [[240, ''], [10, 'ok'], [60, 'no']], more: 1, date: 'Jan 19, 2026', dot: 'grey' },
  { title: 'RCHN - Đề xuất thăng cấp, điều chuyển T1.2026', desc: 'Group: Đề xuất tăng lương/thăng cấp/hạ cấp · Khối/Phòng ban: Revenue', st: 'Pending', who: 'Lưu Minh Phương', hue: 280, appr: [[120, 'ok'], [220, 'ok'], [350, '']], date: 'Jan 19, 2026', dot: 'grey' },
  { title: 'Đề xuất làm việc từ xa chiều ngày 16/01/2026', desc: 'Group: HN | Làm việc từ xa (WFH) · Phân loại WFH: Đối tượng 3', st: 'Pending', who: 'Nguyễn Thị Minh', hue: 320, online: true, appr: [[30, 'ok'], [190, '']], date: 'Jan 16, 2026', dot: 'grey' },
  { title: 'Xin làm việc từ xa', desc: 'Group: HCM | Làm việc từ xa (WFH) · Phân loại WFH: Đối tượng 3 (CBNV gặp tình huống đặc biệt)', st: 'Pending', who: 'Nguyễn Thị Minh', hue: 320, online: true, appr: [[250, 'ok'], [60, 'ok'], [140, '']], date: 'Jan 16, 2026', dot: 'red' },
  { title: 'Đề xuất phương án điều chỉnh thang bảng lương chức danh', desc: 'Group: Đề xuất duyệt chính sách · Phạm vi áp dụng toàn công ty', st: 'Pending', who: '@hoangyen02', hue: 175, appr: [[10, 'ok'], [230, '']], date: 'Jan 16, 2026', dot: 'red' },
  { title: 'Đặng Văn Hoà đề xuất lên Level 4', desc: 'Group: ĐN | Sales - Đề xuất thăng cấp/hạ cấp · Loại đề xuất: Thăng cấp · Vị trí chuyên môn', st: 'Approved', who: 'Đặng Văn Hoà', hue: 45, appr: [[200, 'ok'], [300, 'ok']], date: 'Jan 14, 2026', dot: 'grey' },
  { title: 'Lê Thị Hạnh - Đề xuất thăng cấp', desc: 'Group: ĐN | Sales - Đề xuất thăng cấp/hạ cấp · Loại đề xuất: Thăng cấp · Vị trí chuyên môn', st: 'Approved', who: 'Lê Thị Hạnh', hue: 15, appr: [[110, 'ok'], [270, 'ok']], date: 'Jan 03, 2026', dot: 'grey' },
  { title: 'RCĐN - Đề xuất thăng cấp Quý 1/2026 (Đợt T1/2026)', desc: 'Group: Đề xuất tăng lương/thăng cấp/hạ cấp · Khối/Phòng ban: Revenue', st: 'Pending', who: 'Từ Thị Mai', hue: 300, appr: [[200, 'ok'], [340, 'ok'], [80, '']], date: 'Jan 16, 2026', dot: 'blue' },
  { title: 'Đề xuất bổ nhiệm Acting Associate Team Leader', desc: 'Group: Đề xuất bổ nhiệm CBQL · Thông tin vị trí hiện tại', st: 'Rejected', who: 'Đỗ Hồng Phúc', hue: 30, appr: [[220, 'ok'], [130, 'no'], [260, '']], more: 1, date: 'Jan 16, 2026', dot: 'grey' },
  { title: 'Đề xuất chương trình bảo hiểm sức khoẻ 2026', desc: 'Group: Đề xuất chủ trương mua hàng hoá - Dịch vụ · Chi phí cùng hạng mục', st: 'Pending', who: 'Phạm Thuỳ Linh', hue: 355, appr: [[190, 'ok'], [310, 'ok'], [50, '']], date: 'Jan 15, 2026', dot: 'blue' },
  { title: 'Xin ý kiến về chủ trương sử dụng phần mềm CRM từ T1.2026', desc: 'Group: Đề xuất chủ trương mua hàng hoá - Dịch vụ · Chi phí cùng hạng mục', st: 'Pending', who: 'Lưu Minh Phương', hue: 280, appr: [[160, ''], [20, ''], [240, '']], date: 'Jan 15, 2026', dot: 'grey' },
  { title: 'Đề xuất bổ nhiệm Acting BDR Team Leader', desc: 'Group: Đề xuất bổ nhiệm CBQL · Thông tin vị trí hiện tại', st: 'Approved', who: 'Trần Thị Như Ý', hue: 330, appr: [[100, 'ok'], [210, 'ok'], [0, 'ok']], date: 'Jan 15, 2026', dot: 'grey' },
  { title: 'Đề xuất lên vị trí Associate Team Leader', desc: 'Group: Đề xuất bổ nhiệm CBQL · Thông tin vị trí hiện tại, vị trí đề xuất', st: 'Rejected', who: 'Trần Cẩm Tú', hue: 195, appr: [[60, 'no'], [250, '']], date: 'Jan 14, 2026', dot: 'grey' },
  { title: 'Đề xuất danh sách tăng lương bộ phận quý 01/2026', desc: 'Group: Đề xuất tăng lương/thăng cấp/hạ cấp · Khối/Phòng ban: Vận hành', st: 'Pending', who: 'Phạm Hồng Anh', hue: 230, online: true, appr: [[20, 'ok'], [150, '']], date: 'Jan 14, 2026', dot: 'blue' },
]

const bg = (h: number): CSSProperties => ({ background: `hsl(${h} 58% 52%)` })

function Ini({ name, hue, size, online }: { name: string; hue: number; size: number; online?: boolean }) {
  const w = name.replace('@', '').split(' ')
  const t = w.length > 1 ? w[w.length - 2][0] + w[w.length - 1][0] : w[0].slice(0, 2)
  return <span className="mk-rq-av" style={{ ...bg(hue), width: size, height: size, fontSize: size * 0.38 }}>{t.toUpperCase()}{online && <i className="on" />}</span>
}

const APPR_NAMES = ['Minh Khoa', 'Thu Trang', 'Đức Anh', 'Hải Đăng', 'Bảo Ngọc']

export function RequestListMock() {
  const tabs = ['ALL', 'MY TURN', 'OVERDUE', 'PENDING', 'APPROVED', 'REJECTED', 'RETURNED', 'STARRED', 'SAVED DRAFT']
  return (
    <div className="mk-rq">
      <div className="mk-rq-rail">
        <i className="logo"><BrandMark /></i>
        <span className="on"><Home size={21} fill="currentColor" /></span>
        <span className="bd"><Bell size={21} fill="currentColor" /><b>12</b></span>
        <ScanSearch size={21} />
        <BarChart3 size={21} />
        <Settings size={21} />
        <span className="sep" />
        <PlusCircle size={21} />
        <PlayCircle size={21} />
      </div>

      <div className="mk-rq-side">
        <div className="me">
          <Ini name="Nguyễn Minh Anh" hue={205} size={44} />
          <div><b>Nguyễn Minh Anh</b><span>Giám đốc Sản phẩm</span></div>
        </div>
        <div className="search">Search anything<Search size={15} /></div>
        <div className="row on"><LayoutGrid size={16} />All</div>
        <div className="row"><FileText size={16} />Sent to me</div>
        <div className="row"><Layers size={16} />Created by me</div>
        <div className="row"><Tag size={16} />Following</div>
        <div className="sec">IMPORTANT<ChevronDown size={12} fill="currentColor" /></div>
        <div className="row"><Star size={16} fill="currentColor" />Direct requests</div>
      </div>

      <div className="mk-rq-main">
        <div className="mk-rq-head">
          <div>
            <b>List of requests</b>
            <div className="tabs">{tabs.map((t, i) => <span key={t} className={i === 0 ? 'on' : undefined}>{t}</span>)}</div>
          </div>
          <span className="q">Search requests<Search size={15} /></span>
          <span className="btn">Filters <ChevronRight size={14} /></span>
          <span className="btn blue">Create request</span>
        </div>
        <div className="mk-rq-rows">
          {ROWS.map((r, i) => (
            <div key={i} className={`mk-rq-row${r.open ? ' open' : ''}`}>
              <Star size={16} className="st" />
              <span className="tt"><b>{r.title}</b><span>{r.desc}</span></span>
              <span className={`pill ${r.st.toLowerCase()}`}>{r.st}</span>
              <span className="who"><Ini name={r.who} hue={r.hue} size={24} online={r.online} /><span>{r.who}</span></span>
              <ChevronRight size={14} className="chev" />
              <span className="appr">
                {r.appr.map(([h, v], j) => (
                  <span key={j} className="aw">
                    <Ini name={APPR_NAMES[j % APPR_NAMES.length]} hue={h} size={26} />
                    {v === 'ok' && <i className="ok"><Check size={8} strokeWidth={4} /></i>}
                    {v === 'no' && <i className="no"><X size={8} strokeWidth={4} /></i>}
                  </span>
                ))}
                {r.more && <span className="more">{r.more}</span>}
              </span>
              <span className="date">{r.date}</span>
              <i className={`dot ${r.dot}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
