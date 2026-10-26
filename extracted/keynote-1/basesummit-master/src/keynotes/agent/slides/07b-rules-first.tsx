import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* Why we stop on rules first: they are not an agent thing, they are how a
   business runs — people and agents both. A statement slide: the title and
   one line under it — and, a beat later on its own, the turn at the foot:
   but it's highly ineffective. The system the next slides open (Work
   rules) is introduced by the lifecycle slide, not here. */
export function RulesFirstSlide() {
  return (
    <SlideFrame
      chapter="rules"
      layout="center"
      headline="Rules là nền tảng của vận hành."
      lead={<>Là cốt lõi của <em className="hl">business context</em>. Thiết yếu trong vận hành doanh nghiệp: cho cả <em className="hl">con người</em> và <em className="hl">agent</em>.</>}
      aside={
        <Reveal at={0} delay={1.6} from="none">
          <div className="intro-foot"><span className="pill">Nhưng cách làm hiện nay rất kém hiệu quả.</span></div>
        </Reveal>
      }
    />
  )
}
