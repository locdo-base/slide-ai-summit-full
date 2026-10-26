import { FlowField } from '../../../fx/FlowField'
import { Reveal } from '../../../ui/Reveal'
import { Brand } from '../../../ui/Brand'

/* The cover: the summit, the keynote and its theme over the flow field, and
   the summit name in a pill along the foot. The claim of the day has
   its own slide next. */
export function TitleSlide() {
  return (
    <div className="title-field">
      <FlowField converge={0.62} />
      <div className="title-veil" />
      <Brand corner />
      <div className="title-words wide">
        <Reveal at={0}><div className="kicker">AI Summit 2026</div></Reveal>
        <Reveal at={0} delay={0.15}><h1 className="display">Intelligence Architecture</h1></Reveal>
        <Reveal at={0} delay={0.45}>
          <div className="trio"><span>Welcome to the Future: The Intelligence Economy</span></div>
        </Reveal>
      </div>
      <div className="title-facts">
        <div className="title-facts-row">
          <Reveal at={0} from="none">
            <span className="title-fact title-fact-who"><b>Base AI Summit - 2026.</b></span>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
