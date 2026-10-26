import { SlideFrame } from '../../../ui/SlideFrame'
import { AgentsMdPair } from '../../../fx/AgentsMdPair'

/* AGENTS.md — the agent's instructions, the fourth part the topics slide
   promised. Two real files side by side: the Enterprise Pipeline service's
   and Grace the assistant's. An agent working inside a service reads both.
   Plays on its own. No click. */
export function AgentsMdSlide() {
  return (
    <SlideFrame
      chapter="operation"
      layout="stack"
      headline={<span className="amd-h1">AGENTS.md — hướng dẫn của agent.</span>}
      lead="Đóng gói tri thức cho agents & services."
      figureClass="wide"
    >
      <AgentsMdPair />
    </SlideFrame>
  )
}
