import { SlideFrame } from '../../../ui/SlideFrame'
import { RuleSplitFigure } from '../../../fx/RuleSplit'

/* Made for human, optimized for agent: the page people read appears on its
   own once the slide lands, the briefing agents read follows a beat later.
   No click; one lead throughout. */
export function BothSlide() {
  return (
    <SlideFrame
      chapter="rules"
      layout="stack"
      headline="Xây cho con người. Tối ưu cho agent."
      lead="Rules được lưu trong vector database để tìm kiếm ngữ nghĩa, và tự động chắt lọc cho agent với lượng token tối thiểu."
    >
      <RuleSplitFigure auto={{ human: 0.5, agent: 0.9 }} kindsAt={Infinity} />
    </SlideFrame>
  )
}
