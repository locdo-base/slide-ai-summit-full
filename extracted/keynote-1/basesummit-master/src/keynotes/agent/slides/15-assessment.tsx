import { SlideFrame } from '../../../ui/SlideFrame'
import { Callout } from '../../../mocks/Window'
import { MockWindow } from '../../../mocks/catalog'

/* Product proof: one review record, written by the agent from the rule —
   the task page with the Review drawer open, as the product draws it. One
   state: the ring on the criteria comes on its own once the window has
   landed. No click. */
export function AssessmentSlide() {
  return (
    <SlideFrame
      chapter="rules"
      headline="Đánh giá công việc ở quy mô lớn."
      lead="Mọi đơn vị vận hành đều được đánh giá công bằng, qua rules chuẩn và agent."
      cues={[
        'điểm và mức xếp hạng, từ rule',
        'lý do cho từng tiêu chí, dẫn chiếu rule',
        'các bước đã chạy, có lưu lại',
      ]}
      figureClass="bleed"
    >
      <MockWindow id="assessment" x={0} y={0} />
      <Callout target="summary" label="lý do cho từng tiêu chí, từ rule" at={0} side="up" />
    </SlideFrame>
  )
}
