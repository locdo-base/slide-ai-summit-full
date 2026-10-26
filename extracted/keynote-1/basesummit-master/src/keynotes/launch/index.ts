import type { Keynote } from '../../engine/types'
import { TitleSlide } from './slides/01-title'
import { LaunchBrandsSlide } from './slides/01c-brands'
import { LaunchTimelineSlide } from './slides/02-timeline'
import { LaunchCustomersSlide } from './slides/03-customers'
import { ClosingSlide } from './slides/07-closing'

export const launch: Keynote = {
  id: 'launch',
  title: 'Launching Timeline',
  subtitle: 'Lộ trình, Khách hàng, Sản phẩm',
  chapters: [
    { id: 'platform', label: 'Nền tảng phần mềm' },
    { id: 'timeline', label: 'Lộ trình' },
    { id: 'customers', label: 'Khách hàng' },
    { id: 'releases', label: 'Ra mắt sản phẩm' },
  ],
  slides: [
    {
      id: 'title', title: 'Lộ trình ra mắt', component: TitleSlide,
      notes: 'Lộ trình ra mắt. Gồm ba phần: lộ trình, điều đó có ý nghĩa gì với khách hàng hiện tại, và các sản phẩm sẽ ra mắt.',
    },
    {
      id: 'brands', title: 'Bộ nhận diện app mới', chapter: 'platform', component: LaunchBrandsSlide,
      notes: 'Và đây là hệ sản phẩm của nền tảng mới: toàn bộ thương hiệu được làm mới — 62 app trong 8 nhóm service: AI & Agentic, Sales & Customer, Marketing, Work, Workforce, People, Communications, Automations. Mỗi nhóm có màu riêng, mỗi app có biểu tượng riêng. Hai đợt ra mắt sản phẩm nằm ngay trên lộ trình ở slide tiếp theo.',
    },
    {
      id: 'timeline', title: 'Lộ trình ra mắt', chapter: 'timeline', steps: 2, autoplay: [1.5, 1.5, Infinity], component: LaunchTimelineSlide,
      notes: 'Chính thức ra mắt: ngày 1/10/2026 — ngay sau sự kiện tại TP.HCM.\n[step 1] Chúng tôi duy trì song song cả phiên bản Classic và Agentic OS mới đến hết tháng 01/2027. Đây cũng là đợt ra mắt thứ nhất: các kiến trúc service và AI copilots.\n[step 2] Sau đó, chúng tôi dừng phiên bản Classic với khách hàng mới. Khách hàng mới sẽ tự động sử dụng nền tảng mới. Và từ tháng 1/2027 là đợt thứ hai: AI Studio và Amber desktop.',
    },
    {
      id: 'customers', title: 'Khách hàng hiện tại', chapter: 'customers', steps: 2, autoplay: [0.8, 1.4, Infinity], component: LaunchCustomersSlide,
      notes: 'Với khách hàng hiện tại: đồng hành cùng thực hiện.\n[step 1] Chúng tôi duy trì phiên bản Classic trong nhiều năm.\n[step 2] Chuyển đổi sang nền tảng mới cần nỗ lực từ cả phía các bạn và đội ngũ của chúng tôi. Kiến trúc mới có rất nhiều thay đổi — giữ lại gì, bỏ đi gì — chúng ta cần cùng nhau quyết định.',
    },
    {
      id: 'closing', title: 'Một khởi đầu', component: ClosingSlide,
      notes: 'Sự kiện hôm nay chưa phải là tất cả những gì chúng tôi muốn làm.\nĐây chỉ là MỘT KHỞI ĐẦU. Vẫn còn rất nhiều điều chúng tôi sẽ tiếp tục hoàn thiện. Vẫn còn nhiều tính năng có thể chưa hoàn chỉnh.\nBase.vn rất mong nhận được sự đồng hành của các bạn trên chặng đường phía trước.',
    },
  ],
}
