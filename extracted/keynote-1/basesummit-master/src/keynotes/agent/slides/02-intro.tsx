import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* The two questions the talk answers, and at the foot what useful means. */
export function IntroSlide() {
  return (
    <SlideFrame
      layout="center"
      headline="What is exactly an agent?"
      lead={<>How to make it <em className="hl">useful</em> in our business operation?</>}
      aside={
        <Reveal at={0} delay={1} from="none">
          <div className="intro-foot">
            <b>Useful</b><span className="eq">=</span>
            <span className="pill">Does real work</span>
            <span className="pill">Produces results</span>
            <span className="pill">Follows the rules</span>
          </div>
        </Reveal>
      }
    />
  )
}
