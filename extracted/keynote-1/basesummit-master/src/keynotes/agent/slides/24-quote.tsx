import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'

/* The last word. One quote, drawn as the Bezos slide draws its own: the
   first sentence lands with the slide, the second fades in a beat later.
   One click: the quote folds into a left column and Base's own promise
   opens on the right, large, in the cyan the deck keeps for the words that
   matter. The stage is one grid whose columns animate px to px, so the
   quote reflows rather than jumps. */
export function QuoteSlide() {
  const aside = useStep() >= 1
  return (
    <SlideFrame chapter="operation" layout="center" figureClass="learn-fig">
      <div className={`final-stage${aside ? ' aside' : ''}`}>
        <div className="final-left quote">
          <blockquote>
            <p>
              <Reveal at={0} delay={0.3} from="none">“AI không lấy đi công việc của chúng ta.</Reveal>
              <Reveal at={0} delay={1.8} from="none">AI lấy đi công việc của những công ty biết cách sử dụng AI từ những công ty không biết cách sử dụng AI.”</Reveal>
            </p>
            <Reveal at={0} delay={2.8} from="none">
              <footer><b>Masayoshi Son</b><span>SoftBank · và nhiều người khác</span></footer>
            </Reveal>
          </blockquote>
        </div>
        <div className="final-right">
          <Reveal at={1} delay={0.5}>
            <p className="final-kick">Base sẽ</p>
            <p className="final-word">
              <span><em>học hỏi</em> cùng bạn,</span>
              <span><em>cải tiến</em> cùng bạn,</span>
              <span><em>đồng hành</em> cùng bạn</span>
            </p>
            <p className="final-end">để tiến vào kỷ nguyên trí tuệ.</p>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
