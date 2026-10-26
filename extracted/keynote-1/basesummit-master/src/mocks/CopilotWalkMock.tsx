import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ClipboardCheck, Plus, Home, Inbox, SendHorizonal, Bookmark, Send, FilePen, Cpu, Search, ChevronDown, ChevronRight,
  ChevronsUpDown, LayoutGrid, BarChart3, Settings, MoreHorizontal, Maximize2, X, Sparkles, Info, History, Paperclip,
  ArrowUp, Type, Hash, AlignLeft, CalendarDays, ThumbsUp, ThumbsDown, Copy, FileText, AlertTriangle, Users, CheckCircle2,
} from 'lucide-react'
import { TopBar } from './Window'
import { Av, Pill, SideRow, Sec } from './parts'
import { useBrand } from '../ui/Brand'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Every service has a copilot — the Request app's, two screens a click apart.
   1 · Embedded natively: a purchasing request open, the Copilot panel beside
   it, focused on this request, with the questions it already knows to ask
   about a request. 2 · Understands the object and the service: the same
   panel answering "summarise this request" — from the fields, the policy,
   the approval flow and the history, the way only the service's own copilot
   can. Everything invented. */

type Page = 'embedded' | 'native'
export const COPILOT_WALK: (WalkStep & { key: Page })[] = [
  { key: 'embedded', name: 'Nhúng sẵn trong service', ms: 4000 },
  { key: 'native', name: 'Hiểu object và service', ms: 5600 },
]

const LIST: { t: string; m: string; on?: boolean; dot: 'orange' | 'grey' }[] = [
  { t: 'Tiệc tri ân khách hàng — H2', m: 'Hạng mục: Tiệc tri ân 80 khách hàng…', dot: 'grey' },
  { t: 'Coaching lãnh đạo cấp cao — H1', m: 'Hạng mục: Coaching lãnh đạo, 12 buổi…', on: true, dot: 'orange' },
  { t: 'Gia hạn phần mềm thiết kế — năm 2027', m: 'Hạng mục: Bộ công cụ thiết kế — gói năm…', dot: 'grey' },
  { t: 'Laptop cho team Kinh doanh — Q4', m: 'Hạng mục: Laptop 14 inch, 8 chiếc…', dot: 'orange' },
  { t: 'Dashboard phân tích doanh thu — Q4', m: 'Hạng mục: Thuê ngoài xây dashboard…', dot: 'grey' },
  { t: 'Giám sát lỗi hệ thống — gói production', m: 'Hạng mục: Dịch vụ giám sát, 30 ngày…', dot: 'grey' },
]

const SUGGEST: [string, string[]][] = [
  ['VỀ ĐỀ XUẤT NÀY', ['Tóm tắt đề xuất này trong vài dòng.', 'Công ty đã từng mua “Coaching lãnh đạo, 12 buổi” chưa?', 'Đề xuất này có thiếu thông tin hay điểm bất thường nào không?']],
  ['BỐI CẢNH', ['Eric còn đề xuất nào khác đang chờ xử lý?', 'So với các đề xuất mua sắm khác thì khoản này thế nào?', 'Còn ai phải duyệt, và đang chờ ai?']],
  ['TRƯỚC KHI QUYẾT ĐỊNH', ['Tiêu chí nào trong chính sách mua sắm chưa đạt, và vì sao?']],
]

/* The answer: what the copilot knows because it lives in the service — the
   object's fields, the service's policy and flow, the service's history. */
const ANSWER: { k: string; Icon: typeof FileText; text: React.ReactNode }[] = [
  { k: 'Đề xuất', Icon: FileText, text: <><b>12 buổi coaching lãnh đạo</b> với Northstar Coaching cho ban điều hành H1 — <b>120.000.000 ₫</b>, cần trước <b>21/9</b>. Do Eric (Founder &amp; CEO) tạo.</> },
  { k: 'Quy định', Icon: AlertTriangle, text: <>Vượt hạn mức <b>50.000.000 ₫</b> duyệt một cấp theo <b>Chính sách mua sắm §3</b>, nên cần CFO duyệt. Northstar <b>chưa có trong danh sách nhà cung cấp</b> — cần thêm 2 báo giá so sánh.</> },
  { k: 'Luồng', Icon: Users, text: <>Bước <b>2 / 3</b>: Brian (COO) đã duyệt ngày 10/9; đang chờ <b>Jane (CFO)</b> 4 ngày — <b>quá hạn 2 ngày</b> so với hạn 13/9.</> },
  { k: 'Lịch sử', Icon: CheckCircle2, text: <>Chưa từng mua dịch vụ coaching; năm nay có <b>hai</b> khoản đào tạo tương tự, đều được duyệt trong 3 ngày.</> },
]

function Panel({ page }: { page: Page }) {
  const { wordmark } = useBrand()
  return (
    <aside className="cw-panel">
      <div className="ph">
        <span className="ai"><Sparkles size={13} /></span><b>Copilot</b><Pill kind="medium">BETA</Pill>
        <span className="acts"><Info size={15} /><History size={15} /><MoreHorizontal size={15} /><X size={15} /></span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {page === 'embedded' ? (
          <motion.div key="embedded" className="pb" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
            <div className="focus"><span>Đang xem:</span><FileText size={12} />Coaching lãnh đạo cấp cao — H1</div>
            <div className="ask on"><Paperclip size={14} /><span>Đặt câu hỏi</span><i><ArrowUp size={13} /></i></div>
            <div className="sugg" data-callout="suggest">
              {SUGGEST.map(([h, qs]) => (
                <div key={h} className="grp">
                  <small>{h}</small>
                  {qs.map(q => <a key={q}>{q}</a>)}
                </div>
              ))}
              <div className="more"><ChevronRight size={13} />Xem thêm</div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="native" className="pb chat" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
            <div className="q">Tóm tắt đề xuất này trong vài dòng.</div>
            <div className="a" data-callout="answer">
              {ANSWER.map(({ k, Icon, text }, i) => (
                <motion.div key={k} className="row" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.45, duration: 0.4 }}>
                  <span className="k"><Icon size={12} />{k}</span><p>{text}</p>
                </motion.div>
              ))}
              <motion.div className="src" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                <span>Đã đọc:</span><em>đề xuất này · 6 trường</em><em>Chính sách mua sắm §3</em><em>danh sách nhà cung cấp</em><em>2 đề xuất trước</em>
              </motion.div>
              <motion.div className="fb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
                <ThumbsUp size={12} /><ThumbsDown size={12} /><span><Copy size={12} />Sao chép</span>
              </motion.div>
            </div>
            <motion.div className="next" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
              <span>Soạn tin nhắc Jane</span><span>So sánh hai khoản đào tạo</span>
            </motion.div>
            <div className="focus foot"><span>Đang xem:</span><FileText size={12} />Coaching lãnh đạo cấp cao — H1</div>
            <div className="ask"><Paperclip size={14} /><span>Hỏi tiếp…</span><i><ArrowUp size={13} /></i></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pf">Vận hành bởi {wordmark} AI. Kết quả có thể chưa chính xác.</div>
    </aside>
  )
}

export function CopilotWalkMock() {
  const { product } = useBrand()
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % COPILOT_WALK.length), COPILOT_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const page: Page = walk ? COPILOT_WALK[walk.index].key : reduce ? 'native' : COPILOT_WALK[own].key

  return (
    <div className="mk-pf mk-cw">
      <TopBar />
      <div className="mk-app">
        <div className="mk-side" style={{ width: 226 }}>
          <div className="title"><ClipboardCheck size={15} />Đề xuất <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 10, color: 'var(--mk-dim)' }}><Plus size={13} /></span></div>
          <SideRow icon={<Home size={15} />} label="Trang chủ" />
          <SideRow icon={<Inbox size={15} />} label="Gửi đến tôi" />
          <SideRow icon={<SendHorizonal size={15} />} label="Tôi đã gửi" />
          <Sec>QUAN TRỌNG</Sec>
          <SideRow icon={<Bookmark size={15} />} label="Đã lưu" />
          <SideRow icon={<Send size={15} />} label="Đề xuất trực tiếp" />
          <SideRow icon={<FilePen size={15} />} label="Bản nháp" />
          <SideRow icon={<Cpu size={15} />} label="Đề xuất hệ thống" />
          <div className="gap" />
          <SideRow icon={<ClipboardCheck size={15} />} label="Đề xuất mua sắm" on />
          <Sec>SERVICE PHÊ DUYỆT <Search size={12} /></Sec>
          <div className="row"><span className="ltr" style={{ background: '#0891B2' }}>P</span><span>Sản phẩm</span><ChevronDown size={13} className="chev" /></div>
          <div className="row sub"><i className="bullet" />Chương trình Builder</div>
          <div className="row sub"><i className="bullet" style={{ background: '#F59E0B' }} />Chương trình Nhân tài</div>
          <div className="mk-pf-sidefoot">
            <SideRow icon={<LayoutGrid size={15} />} label="Service" />
            <SideRow icon={<BarChart3 size={15} />} label="Báo cáo" />
            <SideRow icon={<Settings size={15} />} label="Cài đặt" />
            <div className="mk-pf-ws"><span className="ltr" style={{ background: '#2563EB' }}>R</span>{product}<ChevronsUpDown size={13} className="chev" /></div>
          </div>
        </div>

        <div className="cw-list">
          <div className="lh"><b>Đề xuất mua sắm</b><ChevronDown size={14} /></div>
          <div className="lt"><span>TẤT CẢ ĐỀ XUẤT <em>6</em><ChevronDown size={12} /></span><span className="r"><Search size={14} /><MoreHorizontal size={14} /></span></div>
          {LIST.map(r => (
            <div key={r.t} className={`it${r.on ? ' on' : ''}`}>
              <i className="cb" />
              <div><b>{r.t}</b><span>Service: Đề xuất mua sắm · {r.m}</span></div>
              <i className={`dot ${r.dot}`} />
            </div>
          ))}
        </div>

        <div className="mk-main cw-main">
          <div className="mk-head">
            <span className="crumb"><span className="ltr" style={{ background: '#2563EB' }}>F</span>Tài chính <span className="sep">/</span> Đề xuất mua sắm <span className="sep">/</span> <code>PO-2026-00006</code></span>
            <span className="tools"><Pill kind="overdue">Quá hạn</Pill><i><Bookmark size={14} /></i><i className="on"><Sparkles size={14} /></i><i><Maximize2 size={14} /></i><i><MoreHorizontal size={14} /></i><i><X size={14} /></i></span>
          </div>
          <div className="cw-detail">
            <h2>Coaching lãnh đạo cấp cao — H1</h2>
            <h4>Thông tin chính</h4>
            <div className="kv"><span>Tên</span><b>Coaching lãnh đạo cấp cao — H1</b></div>
            <div className="kv"><span>Mã đề xuất</span><b><code>aF6oCyuO-eL5sEqlDoM-c07cdauQru7</code></b></div>
            <div className="kv"><span>Service</span><b>Đề xuất mua sắm <em>(Duyệt tuần tự)</em></b></div>
            <div className="kv"><span>Người tạo</span><b className="who"><Av p="E" size={22} />Eric <em>(Founder &amp; CEO)</em></b></div>
            <div className="kv"><span>Ngày tạo</span><b>15:37, 09/09/2026</b></div>
            <div className="kv"><span>Cập nhật</span><b>4 ngày trước</b></div>
            <div className="kv"><span>Hạn xử lý</span><b>15:37, 13/09/2026</b></div>
            <h4>Trường tùy chỉnh</h4>
            <div className="kv"><span><Type size={13} />Hạng mục</span><b>Coaching lãnh đạo, 12 buổi</b></div>
            <div className="kv"><span><Hash size={13} />Tổng chi phí (VND)</span><b>120.000.000</b></div>
            <div className="kv"><span><Type size={13} />Nhà cung cấp</span><b>Northstar Coaching</b></div>
            <div className="kv col"><span><AlignLeft size={13} />LÝ DO</span><b>Chương trình lãnh đạo H1 — chuẩn bị cho kỳ họp HĐQT và đội ngũ quản lý cấp trung mới.</b></div>
            <div className="kv"><span><CalendarDays size={13} />Cần trước ngày</span><b>21/09/2026</b></div>
            <h4>Thảo luận</h4>
            <div className="disc">Viết bình luận…</div>
          </div>
          <Panel page={page} />
        </div>
      </div>
    </div>
  )
}
