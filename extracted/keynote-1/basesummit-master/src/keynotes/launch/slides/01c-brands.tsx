import { SlideFrame } from '../../../ui/SlideFrame'
import { useBrand } from '../../../ui/Brand'
import { AppsGrid } from '../../../mocks/AppsGrid'

/* The new product line-up: the platform's launcher as a page. The one slide
 * whose body is white — the marks are drawn for a light surface. Sits right
 * after the Agentic OS statement: the new platform, then its brands. */
export function LaunchBrandsSlide() {
  const { wordmark } = useBrand()
  return (
    <SlideFrame
      chapter="platform"
      layout="stack"
      headline=<>The new {wordmark}: bộ thương hiệu sản phẩm hoàn toàn mới.</>
      figureClass="paper"
    >
      <AppsGrid />
    </SlideFrame>
  )
}
