import { SlideFrame } from '../../../ui/SlideFrame'
import { ServiceHolds } from '../../../fx/ServiceHolds'

/* Rules in service context: the service card, already showing what it holds
   — models and contexts. Still; no click, no turn. */
export function ServiceSlide() {
  return (
    <SlideFrame
      chapter="operation"
      headline={<span className="svc-h">Business context<br />trong kiến trúc Service</span>}
      lead={<>Khả năng <em className="hl">thấu hiểu</em> và phát triển, <em className="hl">mở rộng</em> Context đặc biệt hiệu quả.</>}
    >
      <ServiceHolds still />
    </SlideFrame>
  )
}
