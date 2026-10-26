import { SlideFrame } from '../../../ui/SlideFrame'
import { Monolith } from '../../../fx/Monolith'
import { useStep } from '../../../engine/step'
import { Reveal } from '../../../ui/Reveal'

/* Why the mandate: Amazon was one huge monolith. Four clicks walk the
   coupling story on the drawing to the right — needs, both change, conflict,
   blow-up — and the last click turns the picture on the room: our business
   operations look almost the same. */
export function MonolithSlide() {
  const step = useStep()
  return (
    <SlideFrame
      headline="Vì sao?"
      lead={<><strong>Amazon</strong> = Một khối monolith khổng lồ, mọi thứ kết nối chằng chịt với nhau</>}
      lead2="Quy trình này phụ thuộc quy trình kia. Thay đổi một — cả hai phải thay đổi."
      lead2At={1}
      lead3="Rồi xung đột với quy trình thứ ba, thứ tư. Mọi thứ vỡ tung."
      lead3At={3}
      aside={
        <Reveal at={5}>
          <p className="monolith-turn">Vận hành doanh nghiệp của chúng ta: <em>gần như y hệt.</em></p>
        </Reveal>
      }
    >
      <Monolith step={step} needAt={1} changeAt={2} conflictAt={3} blowAt={4} />
    </SlideFrame>
  )
}
