import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { SETTINGS_WALK } from '../../../mocks/PipelineSettingsMock'

/* One place to set up every app: apps become a thin address for their
   services, and the services hold the operating logic — so they can be
   configured in the app or on the shared settings page. The screen is the
   Sales Pipeline's settings dialog walking its pages on its own — stages,
   accesses, permissions, views, layouts — with the walk's indicator under
   the lead. No click. */
export function UnifiedSettingsSlide() {
  return (
    <Walk steps={SETTINGS_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Mô hình cài đặt thống nhất."
        lead="Thống nhất và gần như giống hệt nhau trên tất cả các services. App gần như không phải cài đặt."
        aside={<WalkBar />}
        screens={[{ mock: 'pipeline-settings' }]}
      />
    </Walk>
  )
}
