import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* After the platform tour: the proposition behind it — Base's architecture,
   in three Vietnamese words with their glosses, the English term beside
   each number, in the three-column stop layout. The
   three arrive in order on their own. No click. */
const POINTS = [
  { n: '01', en: 'Elastic', word: 'Toàn diện', gloss: 'Các app bao phủ nhiều phạm vi và lĩnh vực.' },
  { n: '02', en: 'Modular', word: 'Tối ưu', gloss: 'Mỗi app được xây dựng tối ưu cho một lĩnh vực.' },
  { n: '03', en: 'Human-driven', word: 'Nhân bản', gloss: 'Hướng đến con người: tập trung, không phải chuyển ngữ cảnh, một nơi duy nhất cho cả công ty.' },
]

export function ArchitectureSlide() {
  return (
    <SlideFrame
      layout="stack"
      headline="Base’s architecture."
    >
      <div className="cols3 stop">
        {POINTS.map((p, i) => (
          <Reveal key={p.word} at={0} delay={0.6 + i * 0.5}>
            <div className="col">
              <span className="stop-n">{p.n} · {p.en}</span>
              <h2 className="h2">{p.word}</h2>
              <p>{p.gloss}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}
