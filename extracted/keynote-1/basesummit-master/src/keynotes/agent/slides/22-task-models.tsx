import { ListChecks, UserCheck, CalendarClock, Route } from 'lucide-react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

const MODELS = [
  { n: '01', Icon: ListChecks, title: 'Tasks', sub: 'chạy ngay', text: 'Làm việc này ngay. Agent chạy rồi báo lại — trong đúng context được giao.', eg: 'Kiểm tra rule cho REQ-2291' },
  { n: '02', Icon: UserCheck, title: 'Approvals', sub: 'người duyệt', text: 'Agent đề xuất; một người duyệt trước khi bất cứ điều gì xảy ra.', eg: 'Hoàn tiền vượt chính sách → Jane quyết' },
  { n: '03', Icon: CalendarClock, title: 'Schedules', sub: 'theo lịch', text: 'Chạy khi đến giờ — một lần, hoặc theo nhịp riêng của nó.', eg: 'Rà chất lượng dữ liệu mỗi đêm, 02:00' },
  { n: '04', Icon: Route, title: 'Plans', sub: 'nhiều bước', text: 'Một task cần nhiều bước, được vạch sẵn trước khi chạy.', eg: 'Chăm sóc gia hạn — sáu bước', tag: 'chỉ preview' },
]

/* The task models that make the system more powerful. */
export function TaskModelsSlide() {
  return (
    <SlideFrame
      chapter="operation"
      layout="stack"
      headline="Bốn loại tasks."
    >
      <div className="i2-boxes">
        {MODELS.map((m, i) => (
          <Reveal key={m.title} at={0} delay={0.3 + i * 0.55}>
            <div className="i2-box">
              <span className="i2-n">{m.n}</span>
              <m.Icon strokeWidth={1.6} />
              <h3>{m.title} <span className="dim" style={{ fontSize: 24, fontWeight: 400 }}>· {m.sub}</span></h3>
              <p>{m.text}</p>
              {m.tag && <span className="tag">{m.tag}</span>}
              <div className="eg"><b>vd.</b>{m.eg}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}
