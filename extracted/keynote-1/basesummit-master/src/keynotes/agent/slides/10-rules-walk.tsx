import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { RULES_WALK } from '../../../mocks/RulesWalkMock'

/* Work rules in the product, five screens a click apart: the rules
   register (a system-level entity), a rule page with the services and agents
   it is linked to, a service's settings with the rules and agents bound to
   it (the same link from the service side), the inbox of rollouts (the announcement),
   and the assignments — readings, attestations, knowledge checks (the
   attestation) — with the walk's indicator under the lead. */
export function RulesWalkSlide() {
  return (
    <Walk steps={RULES_WALK}>
      <ScreenSlide
        chapter="rules"
        headline="Work rules trong sản phẩm."
        lead="Mỗi rule là một thực thể ở tầng hệ thống — gắn với từng service, công bố đến đúng người, rồi được đánh giá."
        aside={<WalkBar />}
        screens={[{ mock: 'rules-walk' }]}
      />
    </Walk>
  )
}
