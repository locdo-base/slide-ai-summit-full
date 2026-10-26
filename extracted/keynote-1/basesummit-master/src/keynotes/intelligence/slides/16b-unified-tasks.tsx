import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { TASKS_WALK } from '../../../mocks/TasksWalkMock'

/* One task system for every service, shown as a walk through four screens
   on its own — the Tasks home (one place), a service's own works list
   (service-driven), one request opened five levels deep (infinitely nested),
   and the plan the work streams into — with the walk's indicator under the
   lead. No click. */
export function UnifiedTasksSlide() {
  return (
    <Walk steps={TASKS_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Một chuẩn công việc thống nhất."
        lead={<>Công việc ≠ tick done.<br />Công việc&nbsp;=&nbsp;một hành động được giao trong service để tạo ra giá trị.</>}
        aside={<WalkBar />}
        screens={[{ mock: 'tasks-walk' }]}
      />
    </Walk>
  )
}
