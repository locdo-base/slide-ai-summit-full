import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* To find the answer, go back twenty years: the world as it was is one line
   under the headline, and then one man's mandate at Amazon fades in on its
   own a couple of seconds later. No click. */
export function BezosSlide() {
  return (
    <SlideFrame
      layout="stack"
      headline="Để tìm câu trả lời, hãy quay về lịch sử. Hơn 20 năm trước."
      lead="Khi internet vừa mới phổ biến, và CHƯA có AI."
    >
      <div className="bezos">
        <Reveal at={0} delay={2} className="quote">
          <blockquote>
            <p>“Everything at Amazon must be a service.<br />Make it or you are out of here.”</p>
            <footer><b>Jeff Bezos</b><span>Amazon · 2002</span></footer>
          </blockquote>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
