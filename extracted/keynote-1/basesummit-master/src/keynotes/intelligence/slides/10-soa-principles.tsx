import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { ServiceUnit } from '../../../fx/ServiceUnit'
import { useStep } from '../../../engine/step'

/* A circle in the middle asks "What is a service?" with "The who, what,
   how" under it. The first click slides it left and squares it straight into
   the named service card — the Who. Three simple principles, one per click,
   each drawn onto that service (src/fx/ServiceUnit.tsx): the Who — a name and a
   purpose; the What — inputs and outputs declared for the outside; the How —
   an engine that changes inside while the interface does not. */
const PRINCIPLES = [
  {
    n: '01', key: 'The Who', sub: 'Là ai', title: 'Định danh rõ ràng.',
    lines: ['Được đặt tên bằng ngôn ngữ đời thường.'],
  },
  {
    n: '02', key: 'The Interfaces', sub: 'Làm được gì', title: 'Chuẩn hóa các khả năng bên ngoài.',
    lines: ['Đầu vào + đầu ra. Độc lập — chạy khi cần.', '“Bạn có thể làm gì cho tôi?”'],
  },
  {
    n: '03', key: 'The How', sub: 'Làm thế nào', title: 'Vận hành độc lập bên trong.',
    lines: ['Chúng thay đổi, học hỏi, cải tiến.', 'Interface KHÔNG thay đổi.'],
  },
]

export function SoaPrinciplesSlide() {
  const step = useStep()
  return (
    <SlideFrame
      layout="stack"
      headline="Kiến trúc service: ba nguyên tắc."
    >
      <div className="soa">
        <ServiceUnit step={step} askAt={1} askText="Service là gì?" askSub="The who, interfaces, how" whoAt={1} whatAt={2} howAt={3} />
        <div className="soa-cols">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.key} at={i + 1} className={`soa-col${step === i + 1 ? ' now' : ''}`}>
              <div>
                <div className="soa-key"><span className="stop-n">{p.n}</span><b>{p.key}</b><i>{p.sub}</i></div>
                <h2 className="h2">{p.title}</h2>
                {p.lines.map(l => <p key={l}>{l}</p>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}
