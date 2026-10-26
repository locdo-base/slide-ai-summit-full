import { SlideFrame } from '../../../ui/SlideFrame'
import { Walk, WalkBar } from '../../../ui/Walk'
import { MockWindow } from '../../../mocks/catalog'
import { COPILOT_WALK } from '../../../mocks/CopilotWalkMock'

/* Every service has a copilot: the Request app's, two screens a click apart
   — embedded natively beside a purchasing request, then answering from the
   object, the policy, the flow and the history. The walk's indicator under
   the lead; the whole window stands on stage. */
export function CopilotSlide() {
  return (
    <Walk steps={COPILOT_WALK}>
      <SlideFrame
        chapter="anatomy"
        headline="Mỗi service đều có một copilot."
        lead="Nhúng sẵn ngay trong service. Nó hiểu object, service và các rules của service đó."
        aside={<WalkBar />}
        figureClass="bleed copilot-fig"
      >
        <MockWindow id="copilot-walk" x={0} y={0} />
      </SlideFrame>
    </Walk>
  )
}
