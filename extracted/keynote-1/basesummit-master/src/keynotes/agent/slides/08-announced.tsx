import { SlideFrame } from '../../../ui/SlideFrame'
import { AnnouncementDecay } from '../../../fx/AnnouncementDecay'

/* Why rules are broken for people: announced once, forgotten. One state:
   the curve draws itself and the new hire arrives on its own. No click. */
export function AnnouncedSlide() {
  return (
    <SlideFrame
      chapter="rules"
      headline="Quản lý rules và chính sách đang hỏng ở đâu?"
      lead="Sự chú ý phai dần. Nhân viên mới không bao giờ đọc sổ tay nhân viên; đội sales không bao giờ mở sales kit."
      cues={['rules hôm nay = thông báo', 'sự chú ý giảm dần qua từng tuần', 'người mới chưa từng thấy']}
    >
      <AnnouncementDecay personAt={0} />
    </SlideFrame>
  )
}
