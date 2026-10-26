import { ScreenSlide } from '../../../ui/ScreenSlide'

/* Approval built once at the system layer instead of a standard per app:
   approve in any app, see every approval in Request. The requests list is
   the screen. */
export function UnifiedApprovalsSlide() {
  return (
    <ScreenSlide
      chapter="services"
      headline="Mô hình phê duyệt thống nhất."
      lead="Phê duyệt trong bất kỳ app nào — và xem mọi phê duyệt ở một nơi, trong Request."
      screens={[{ mock: 'requests', url: '/app/request/home', zoom: 0.85 }]}
    />
  )
}
