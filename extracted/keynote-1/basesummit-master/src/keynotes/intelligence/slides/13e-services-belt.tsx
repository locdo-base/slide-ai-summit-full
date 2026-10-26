import { SlideFrame } from '../../../ui/SlideFrame'
import { ServiceBelt } from '../../../fx/ServiceBelt'

/* After the New Base.vn: what "no more software" looks like. The rework
   landing page's services belt — fifty services sliding past in three lanes,
   one held open beside them — carries the point that services are universal
   modules: different work, different depth, the same five things stated. The
   headline alone, so the belt has the room; and this one slide is on a
   white ground, as the landing page is (service-belt.css rebinds the theme
   slots inside its frame). */
export function ServicesBeltSlide() {
  return (
    <SlideFrame
      layout="stack"
      headline="Không còn phần mềm, chỉ còn các Services."
      figureClass="belt-fig"
    >
      <ServiceBelt />
    </SlideFrame>
  )
}
