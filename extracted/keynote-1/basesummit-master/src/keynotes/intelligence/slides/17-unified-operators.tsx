import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { OPERATORS_WALK } from '../../../mocks/OperatorsWalkMock'

/* Who runs each service: owners, followers, reporters — always known. Three
   screens walked on their own: an approval block assigned by org unit, the
   same by position (a seat, with or without a holder), and a work flow where
   a step is an agent of its own — with the walk's indicator under the lead.
   No click. */
export function UnifiedOperatorsSlide() {
  return (
    <Walk steps={OPERATORS_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Chuẩn hóa vai trò thực thi & trách nhiệm."
        lead="Thiết lập và phân rõ trách nhiệm của cá nhân và phòng ban bên trong mỗi service."
        aside={<WalkBar />}
        screens={[{ mock: 'operators-walk' }]}
      />
    </Walk>
  )
}
