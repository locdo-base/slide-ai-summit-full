import { FlowField } from '../../../fx/FlowField'
import { Reveal } from '../../../ui/Reveal'
import { Brand } from '../../../ui/Brand'

/* The topic of the day, alone over the field — the architecture of software,
   works and agents — with the facts about AI agents along the foot from the
   start: the new workforce, and what it does better than us. */
const FACTS = [
  { k: 'Tìm kiếm', v: 'nhanh hơn' },
  { k: 'Lưu trữ', v: 'nhiều dữ liệu hơn' },
  { k: 'Phối hợp', v: 'hiệu quả hơn' },
]

export function TopicSlide() {
  return (
    <div className="title-field">
      <FlowField converge={0.62} />
      <div className="title-veil" />
      <Brand corner />
      <div className="title-words statement">
        <Reveal at={0}><div className="kicker">Chủ đề hôm nay</div></Reveal>
        <Reveal at={0} delay={0.2}>
          <h1 className="title-claim">Kiến trúc của phần mềm thế hệ mới, công việc và quản trị, và <em>AI agents</em>.</h1>
        </Reveal>
      </div>
      <div className="title-facts">
        <div className="title-facts-row">
          <Reveal at={0} delay={0.6} from="none">
            <span className="title-fact title-fact-who"><b>AI agents</b>= Lực lượng lao động mới</span>
          </Reveal>
          {FACTS.map((f, i) => (
            <Reveal key={f.k} at={0} delay={0.8 + i * 0.15} from="none">
              <span className="title-fact"><b>{f.k}</b>{f.v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
