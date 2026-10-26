import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* The ideal system, and the one we introduce now: the New Base.vn with AI
   Operation Services. No more software talk — everything becomes a service,
   built on the same three parts the SOA slides just named. */
const PARTS = [
  { n: '01', word: 'Service-driven', echo: 'Chuẩn hoá toàn bộ vận hành thông qua các services (ai làm, làm được gì, làm thế nào).' },
  { n: '02', word: 'Output-driven', echo: 'Tất cả vận hành đều phải hướng đến việc tạo ra kết quả liên tục. Có thể đánh giá và tối ưu.' },
  { n: '03', word: 'AI-driven', echo: 'Con người và AI cùng làm việc và tạo ra business context. Phục vụ con người là ưu tiên.' },
]

export function NewBaseSlide() {
  return (
    <SlideFrame
      layout="stack"
      headline="Base.vn mới: Một chuẩn vận hành chung của doanh nghiệp."
      lead={<>Không còn phần mềm, chỉ có <em className="hl">Operation</em> services. Con người và AI cùng làm việc trong các services.</>}
    >
      <div className="cols3 stop parts">
        {PARTS.map((p, i) => (
          <Reveal key={p.word} at={0} delay={0.3 + i * 0.14}>
            <div className="col">
              <span className="stop-n">{p.n}</span>
              <h2 className="h2">{p.word}</h2>
              <p>{p.echo}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}
