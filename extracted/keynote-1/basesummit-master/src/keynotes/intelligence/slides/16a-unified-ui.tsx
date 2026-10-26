import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { UI_WALK } from '../../../mocks/UiWalkMock'

/* One interface for every app: because every app is a set of services, they
   share one layout and one way to navigate. The proof is three apps walked
   one per click — Requests, Tasks, Workflows — the same frame each time, with the
   walk's indicator under the lead. */
export function UnifiedUiSlide() {
  return (
    <Walk steps={UI_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Chuẩn hóa giao diện người dùng."
        lead="Thống nhất trải nghiệm, layout và điều hướng trên tất cả các app."
        aside={<WalkBar />}
        screens={[{ mock: 'ui-walk' }]}
      />
    </Walk>
  )
}
