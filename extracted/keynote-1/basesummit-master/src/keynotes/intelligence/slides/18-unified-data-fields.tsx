import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { FIELDS_WALK } from '../../../mocks/FieldsWalkMock'

/* Custom fields, once fragmented across independently built apps, become one
   standard set configured at the company layer — one data structure as data
   moves from service to service. Two screens walked on their own: the field
   registry in Workforce, then the same fields configured inside one service —
   with the walk's indicator under the lead. No click. */
export function UnifiedDataFieldsSlide() {
  return (
    <Walk steps={FIELDS_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Mô hình trường dữ liệu thống nhất."
        lead="Mô hình dữ liệu chuẩn hoá cho các đối tượng vận hành của service."
        aside={<WalkBar />}
        screens={[{ mock: 'fields-walk' }]}
      />
    </Walk>
  )
}
