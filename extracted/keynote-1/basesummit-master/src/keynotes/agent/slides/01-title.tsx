import { FlowField } from '../../../fx/FlowField'
import { Reveal } from '../../../ui/Reveal'
import { Brand } from '../../../ui/Brand'

/* Cover: from one point, many agents fan out. */
export function TitleSlide() {
  return (
    <div className="title-field">
      <FlowField converge={0.7} diverge />
      <div className="title-veil" />
      <Brand corner />
      <div className="title-words">
        <Reveal at={0}><div className="kicker">AI Summit 2026</div></Reveal>
        <Reveal at={0} delay={0.15}><h1 className="display">Agent Architecture</h1></Reveal>
        <Reveal at={0} delay={0.3}><p className="title-sub">Để AI agents làm việc cho con người <em>hiệu quả</em> và <em>thông minh</em></p></Reveal>
      </div>
      <Reveal at={0} delay={0.6} className="title-facts">
        <div className="title-facts-row">
          <span className="title-fact"><b>Model</b></span>
          <span className="title-fact"><b>Context</b></span>
          <span className="title-fact"><b>Execution</b></span>
        </div>
      </Reveal>
    </div>
  )
}
