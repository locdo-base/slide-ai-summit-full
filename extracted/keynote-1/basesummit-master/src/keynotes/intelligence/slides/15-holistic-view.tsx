import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { REGISTRY_WALK } from '../../../mocks/PlatformMocks'

/* What a service architecture gives you, first: every operation running in
   the company, from every department, in one view — services standardised at
   the system layer, so nobody opens app after app. The screen is the service
   registry, drawn from Eric's capture with invented rows, walking its three
   views on its own — the holistic list, the same services by department, and
   by user — with the walk's indicator under the lead. No click. */
export function HolisticViewSlide() {
  return (
    <Walk steps={REGISTRY_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Toàn cảnh mọi hoạt động của công ty."
        lead="Quản lý tất cả các hoạt động thông qua các services vận hành."
        aside={<WalkBar />}
        screens={[{ mock: 'service-registry' }]}
      />
    </Walk>
  )
}
