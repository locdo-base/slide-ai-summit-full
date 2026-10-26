import { SlideFrame } from '../../../ui/SlideFrame'
import { LaunchTimeline } from '../../../fx/LaunchTimeline'

/* Launch: 1 October 2026; both versions side by side until January 2027,
 * with release wave 1 (service architecture, AI copilots); then Classic
 * closes to new customers and wave 2 ships (AI Studio, Amber desktop). The
 * releases were a slide of their own until 2026-09-23. */
export function LaunchTimelineSlide() {
  return (
    <SlideFrame
      chapter="timeline"
      layout="stack"
      figureClass="launch-tl"
      headline="Lộ trình ra mắt."
      lead="Chính thức ra mắt ngày 1/10/2026, ngay sau sự kiện tại TP.HCM."
      lead2="Đến hết tháng 01/2027, Classic và Agentic OS mới chạy song song. Đợt 1 ra mắt kiến trúc service và AI Copilots."
      lead2At={1}
      lead3="Từ tháng 01/2027, Classic dừng nhận khách hàng mới — khách hàng mới bắt đầu trên nền tảng mới. Đợt 2 ra mắt AI Studio và Amber desktop."
      lead3At={2}
    >
      <LaunchTimeline />
    </SlideFrame>
  )
}
