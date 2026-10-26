import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { EXTERNAL_WALK } from '../../../mocks/ExternalWalkMock'

/* Connecting out: every operating service reaches the outside the same way —
   webforms for people, service gateways for systems. Two screens, one per
   click, with the walk's indicator under the lead. The mock is a sample
   until the captures come. */
export function ExternalSlide() {
  return (
    <Walk steps={EXTERNAL_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Kết nối ra bên ngoài."
        lead="Chuẩn hóa kết nối với bên ngoài cho tất cả các service vận hành."
        aside={<WalkBar />}
        screens={[{ mock: 'external-walk' }]}
      />
    </Walk>
  )
}
