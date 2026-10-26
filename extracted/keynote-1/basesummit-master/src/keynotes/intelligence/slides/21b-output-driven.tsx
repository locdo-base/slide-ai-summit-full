import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { OUTPUTS_WALK } from '../../../mocks/OutputsWalkMock'

/* Output-driven: every service ends in an output the company counts, and the
   same output models run everywhere — shown as a walk through four screens
   on its own: the output registry, the managed records behind one output,
   the workload every record costs, and the reviews that rate the work. The
   walk's indicator sits under the lead. No click. */
export function OutputDrivenSlide() {
  return (
    <Walk steps={OUTPUTS_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Chuẩn hóa đầu ra."
        lead="Kết quả công việc, khối lượng công việc và chất lượng công việc."
        aside={<WalkBar />}
        screens={[{ mock: 'outputs-walk' }]}
      />
    </Walk>
  )
}
