import { SlideFrame } from '../../../ui/SlideFrame'
import { RequestGraph } from '../../../fx/RequestGraph'

/* Smarter task execution: the Request app's execution graph. One state — the
   task lands and the code appears on a timer. No click. */
export function RequestGraphSlide() {
  return (
    <SlideFrame
      chapter="operation"
      headline="Thực thi task thông minh hơn trong các service vận hành."
      lead="Với khám phá context tự động."
      cues={[
        'đến lượt nó → một task xuất hiện trong task box của agent, đúng context',
        'khám phá service → hợp tools và skills → hoàn thành task',
      ]}
    >
      <RequestGraph auto />
    </SlideFrame>
  )
}
