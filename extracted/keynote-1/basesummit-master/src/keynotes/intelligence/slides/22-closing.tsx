import { SlideFrame } from '../../../ui/SlideFrame'
import { ServiceGalaxy } from '../../../fx/ServiceGalaxy'
import { useStageSize } from '../../../engine/Stage'

/* The close: the architecture as the landing site draws it — AI Operation
   Services as the sun, the three groups as star clusters around it. The words
   carry the last argument (SOA changes the approach, not the problem); the
   hand-off to the next keynote is spoken, not built. No click. */
export function ClosingSlide() {
  const { h } = useStageSize()
  return (
    <>
      <SlideFrame
        chapter="services"
        headline="Base: The Agentic Operating System"
        lead="Tạo lập một chuẩn mực mới để sẵn sàng đưa con người và doanh nghiệp bước vào kỷ nguyên trí tuệ."
        cues={[
          'Kiến trúc lại phần mềm.',
          'Kiến trúc lại vận hành.',
          'Kiến trúc lại Business context.',
          'Kiến trúc lại ngôn ngữ giao tiếp giữa con người & agent.',
        ]}
      />
      {/* A stage-level layer rather than the frame's figure cell, so the scene
          can be as tall as the stage and bleed its halos past the edges. */}
      <div className="galaxy-stage bleed">
        <ServiceGalaxy
          size={Math.round(h * 1.03)}
          labels={['Hệ thống · Dữ liệu', 'AI Agent', 'Con người']}
          center="AI Operation Services"
        />
      </div>
    </>
  )
}
