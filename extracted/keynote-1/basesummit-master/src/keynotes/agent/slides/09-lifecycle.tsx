import { SlideFrame } from '../../../ui/SlideFrame'
import { RuleLifecycle } from '../../../fx/RuleLifecycle'

/* Introducing Work rules: a complete rule and policy management framework —
   the lifecycle ring lights stage by stage on its own, each with its cue.
   No click. */
export function LifecycleSlide() {
  return (
    <SlideFrame
      chapter="rules"
      headline="Giới thiệu Base.vn Work rules."
      lead="Một framework quản lý rules và chính sách hoàn chỉnh."
      cues={[
        { text: 'Soạn thảo — viết bản nháp, quản lý phiên bản, đính kèm tệp', delay: 1.2 },
        { text: 'Phê duyệt — được duyệt trước khi áp dụng', delay: 2.6 },
        { text: 'Ban hành — đến các kênh, kèm thông báo', delay: 4.0 },
        { text: 'Xác nhận & đánh giá — xác nhận đã đọc và kiểm tra kiến thức', delay: 5.4 },
        { text: 'Tra cứu — tìm theo ngữ nghĩa, hoặc chỉ cần hỏi', delay: 6.8 },
      ]}
    >
      <RuleLifecycle auto={{ start: 1.2, every: 1.4 }} />
    </SlideFrame>
  )
}
