import { SlideFrame } from '../../../ui/SlideFrame'
import { Frame } from '../../../mocks/Window'
import { AgentTasksMock } from '../../../mocks/AgentTasksMock'
import { Reveal } from '../../../ui/Reveal'

/* Intelligence 1.0 — what the new platform is for today: not just a
 * better-looking, more unified software — the question, then three pills that
 * answer it. The words stand in the left column; the agent's
 * own task list — drawn (mocks/AgentTasksMock) — sits to the right in the
 * product-shot frame and runs off the stage's edge. */
const PILLS = ['Chuẩn vận hành cho người + Agents', 'Thiết lập Business context', 'Agents ở tất cả mọi nơi']

export function IntelligenceOneSlide() {
  return (
    <SlideFrame
      chapter="operation"
      layout="split"
      headline="Intelligence 1.0."
      lead="Có gì hơn ngoài một phần mềm đẹp hơn, thống nhất hơn?"
      figureClass="bleed agent-tasks"
      aside={
        <Reveal at={0} delay={0.6} from="none">
          <div className="i1-pills">
            {PILLS.map(t => <span key={t} className="pill">{t}</span>)}
          </div>
        </Reveal>
      }
    >
      <div className="shot"><Frame url="/app/aiplatform/agents/grace/tasks" zoom={1.1} width={1040}><AgentTasksMock /></Frame></div>
    </SlideFrame>
  )
}
