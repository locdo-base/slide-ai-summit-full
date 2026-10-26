import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* The need to re-architect software, so that humans and AI work together.
   What "work" has to mean — three words — arrives in order on its own. No
   click; the environment that empowers both is spoken. */
const WORK = [
  { n: '01', word: 'Tạo ra kết quả liên tục', gloss: 'Công việc được đo bằng kết quả. Có thể cải tiến và đánh giá để tốt hơn sau mỗi chu kỳ.' },
  { n: '02', word: 'Tạo ra business context', gloss: 'Để AI có thể cộng tác hiệu quả và thông minh hơn.' },
  { n: '03', word: 'Thừa hưởng, phát triển Base Architecture', gloss: 'Toàn diện, tối ưu, nhân bản — và mở ra cho AI.' },
]

export function RethinkSlide() {
  return (
    <SlideFrame
      layout="stack"
      headline="Tìm một kiến trúc phần mềm kiểu mới"
      lead={<>Để <strong>con người + AI</strong> cùng nhau <strong className="hi">làm việc</strong>.</>}
    >
      <div className="cols3 stop rethink">
        {WORK.map((p, i) => (
          <Reveal key={p.word} at={0} delay={0.6 + i * 0.5}>
            <div className="col">
              <span className="stop-n">{p.n}</span>
              <h2 className="h2">{p.word}</h2>
              <p>{p.gloss}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}
