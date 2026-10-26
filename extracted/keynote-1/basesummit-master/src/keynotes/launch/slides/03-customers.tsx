import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { ClassicStaysScene, TogetherScene } from '../../../fx/LaunchScenes'

/* Existing customers: Classic stays, and the move is a joint restructuring. */
export function LaunchCustomersSlide() {  return (
    <SlideFrame
      chapter="customers"
      layout="stack"
      headline="Khách hàng hiện tại: Đồng hành cùng thực hiện."
      lead="Classic vẫn được duy trì, và việc chuyển sang nền tảng mới được lên kế hoạch cùng các bạn."
    >
      <div className="cols3 ops two">
        <Reveal at={1}>
          <div className="col">
            <ClassicStaysScene />
            <h2 className="h2">{'Classic vẫn duy trì'}</h2>
            <p>{'Chúng tôi duy trì phiên bản Classic trong nhiều năm.'}</p>
          </div>
        </Reveal>
        <Reveal at={2}>
          <div className="col">
            <TogetherScene />
            <h2 className="h2">{'Đồng hành tái cấu trúc'}</h2>
            <p>{'Kiến trúc mới thay đổi rất nhiều. Giữ lại gì, bỏ đi gì — chúng ta cùng quyết định.'}</p>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
