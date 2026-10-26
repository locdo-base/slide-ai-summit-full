import { SlideFrame } from '../../../ui/SlideFrame'
import { AiReviewFigure } from '../../../fx/AiReview'

/* Rules do the heavy lifting: work assessment by an agent, from a rule. One
   state — the figure scores and plans on its own. No click. */
export function HeavyLiftingSlide() {
  return (
    <SlideFrame
      chapter="rules"
      headline="Một ứng dụng đặc biệt của work rules: Đánh giá công việc."
      lead="Để agent + rules gánh phần việc nặng."
      cues={[
        'đánh giá: quan trọng, nhưng khó làm đúng',
        'con người thấy nó chủ quan — agent với một rule thì không',
        'một rule vào → điểm số, lý do, các bước review ra',
      ]}
    >
      <AiReviewFigure auto docTitle="Rule" docMeta="bộ tiêu chí đánh giá, dưới dạng rule" />
    </SlideFrame>
  )
}
