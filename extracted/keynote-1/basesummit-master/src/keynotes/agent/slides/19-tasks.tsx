import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { AGENT_TASKS_WALK } from '../../../mocks/AgentTasksWalkMock'

/* Agent in operation: where an agent's tasks come from, three screens a
   click apart — its own task box, tasks handed to it in chat, and tasks a
   service operation assigns to it — with the walk's indicator under the lead. */
export function TasksSlide() {
  return (
    <Walk steps={AGENT_TASKS_WALK}>
      <ScreenSlide
        chapter="operation"
        headline="Tasks — cho cả agents."
        lead="Tasks của agent đến từ đâu."
        aside={<WalkBar />}
        screens={[{ mock: 'agent-tasks-walk' }]}
      />
    </Walk>
  )
}
