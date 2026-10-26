import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'
import { Frame } from '../../../mocks/Window'
import { HrmMock } from '../../../mocks/HrmMock'
import { SalesforceMock } from '../../../mocks/SalesforceMock'
import { FeatureSwarm } from '../../../fx/FeatureSwarm'

/* The current software architecture, and the question we keep asking
   ourselves about it: is it good enough for the future? Two screens at real
   density — the Base HRM register (our earlier decks) and Salesforce. The one click rains the features down on
   them and names what all of it is: feature-driven, a set of UI actions plus
   a system of records; a few seconds later the formula fades in over the
   screens on its own. The second click adds the verdict beneath it: no longer
   working with AI. The 99 percent is spoken. */
export function CurrentSoftwareSlide() {
  const step = useStep()
  return (
    <SlideFrame
      layout="stack"
      headline="Kiến trúc phần mềm hiện tại"
      lead="Câu hỏi: Liệu chúng ta có thể làm tốt hơn không? Liệu sản phẩm có PHÙ HỢP cho tương lai của AI?"
      lead2={<><strong>Hướng tính năng</strong>: Tập hợp thao tác UI + Biểu diễn các bản ghi</>}
      lead2At={1}
    >
      <div className="shots-wrap">
        <div className={`shots bleed${step >= 1 ? ' under' : ''}`}>
          <figure className="shot-fig">
            <div className="shot"><Frame zoom={1.14} width={680}><HrmMock /></Frame></div>
            <figcaption>Ứng dụng HRM <span>Base.vn</span></figcaption>
          </figure>
          <figure className="shot-fig">
            <div className="shot"><Frame zoom={1.14} width={680}><SalesforceMock /></Frame></div>
            <figcaption>Ứng dụng Bán hàng <span>Salesforce</span></figcaption>
          </figure>
        </div>
        <div className="shots-swarm"><FeatureSwarm step={step} at={1} width={1640} height={540} /></div>
        <Reveal at={1} delay={2.5} className="shots-key">
          <div className="shots-formula">
            <div className="shots-pill">Software = <em>UI actions</em> for humans + a <em>representation of records</em></div>
            <Reveal at={1} delay={4}><div className="shots-pill warn">No longer working with AI</div></Reveal>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
