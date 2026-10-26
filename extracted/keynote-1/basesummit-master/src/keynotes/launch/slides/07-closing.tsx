import { FlowField } from '../../../fx/FlowField'
import { Reveal } from '../../../ui/Reveal'
import { Brand } from '../../../ui/Brand'

/* The close, a bookend to the cover: the same field, but diverging — lanes
 * leaving one point and spreading out, because today is only a beginning. */
export function ClosingSlide() {  return (
    <div className="title-field">
      <FlowField converge={0.7} diverge />
      <div className="title-veil" />
      <Brand corner />
      <div className="title-words wide">
        <Reveal at={0}><div className="kicker">AI Summit 2026</div></Reveal>
        <Reveal at={0} delay={0.15}><h1 className="display">{'Chỉ là một khởi đầu.'}</h1></Reveal>
        <Reveal at={0} delay={0.45}>
          <div className="trio">
            <span>{'Trân trọng cảm ơn'}</span>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
