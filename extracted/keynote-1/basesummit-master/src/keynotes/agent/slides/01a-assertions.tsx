import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* Two assertions about the AI era, each next to the line it rewrites: the
   changed word is lit, the word it replaced is struck in the source. No
   click: the two land on their own, one after the other. Brought over from the aisummit deck. */
export function AssertionsSlide() {
  return (
    <SlideFrame layout="stack" headline="AI & vận hành: Model & context">
      <div className="claims">
        <Reveal at={0} delay={0.8}>
          <div className="claim">
            <div className="claim-n">01</div>
            <div>
              <div className="claim-text">If we cannot <em>model</em> it, we cannot manage it.</div>
              <div className="claim-src"><b>Peter Drucker</b>If we cannot <s>measure</s> it, we cannot manage it.</div>
            </div>
          </div>
        </Reveal>
        <Reveal at={0} delay={2.6}>
          <div className="claim">
            <div className="claim-n">02</div>
            <div>
              <div className="claim-text"><em>Context</em> is all you need.</div>
              <div className="claim-src"><b>Gartner</b>Information is the oil of the 21st century.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
