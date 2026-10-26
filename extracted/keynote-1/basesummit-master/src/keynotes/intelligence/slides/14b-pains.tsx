import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* Before the demo: the pains customers name, as a ledger. Eight rows land one
   by one — number, the pain in the customer's own words — and the line that
   hands over to the demo follows on the right. No click. */
const PAINS = [
  'Công việc ở khắp mọi nơi: Từ request, workflow, goal, wework, ...',
  'Duyệt ở rất nhiều apps, không có cách nào để xem được hết',
  'Settings phức tạp theo từng apps',
  'Khó đánh giá hiệu quả nhân viên và phòng ban',
  'Giao việc cho phòng ban thế nào?',
  'Tích hợp và truyền dữ liệu giữa các apps rất khó',
  'Làm việc với bên ngoài thế nào? Có cách nào để khách hàng tạo workflow job?',
  'Có cách nào để tôi biết cả công ty đang sử dụng Base như thế nào?',
]

const PAIN_AT = (i: number) => 0.3 + i * 0.22

export function PainsSlide() {
  return (
    <SlideFrame layout="stack" headline="The new Base: 10 năm lắng nghe và thấu hiểu">
      <div className="ledger">
        <ol className="ledger-rows">
          {PAINS.map((p, i) => (
            <li key={p} className="ledger-row">
              <Reveal at={0} delay={PAIN_AT(i)} from="none" className="ledger-n">{String(i + 1).padStart(2, '0')}</Reveal>
              <Reveal at={0} delay={PAIN_AT(i)} className="ledger-pain"><span>{p}</span></Reveal>
            </li>
          ))}
        </ol>
        <Reveal at={0} delay={PAIN_AT(PAINS.length) + 0.8} className="ledger-go">
          <div className="shots-pill">Xem demo thực tế</div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
