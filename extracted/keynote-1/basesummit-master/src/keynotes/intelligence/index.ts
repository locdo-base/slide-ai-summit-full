import type { Keynote } from '../../engine/types'
import { TitleSlide } from './slides/01-title'
import { ArchitectureSlide } from './slides/01a-architecture'
import { TopicSlide } from './slides/01b-topic'
import { ManyAisSlide } from './slides/02-many-ais'
import { MyWorkSlide } from './slides/03-my-work'
import { PlatformSlide, PLATFORM_STEPS } from './slides/04-platform'
import { CurrentSoftwareSlide } from './slides/05-current-software'
import { HumanAgentSlide } from './slides/06-human-agent'
import { NextTokenSlide } from './slides/06a-next-token'
import { ContextSlide } from './slides/06c-context'
import { AdoptionGapSlide } from './slides/06d-adoption-gap'
import { FragmentedSlide } from './slides/06e-fragmented'
import { BuildContextSlide } from './slides/06f-build-context'
import { RethinkSlide } from './slides/07-rethink'
import { BezosSlide } from './slides/08-bezos'
import { MonolithSlide } from './slides/09-monolith'
import { ServiceStopSlide } from './slides/09b-service-stop'
import { SoaPrinciplesSlide } from './slides/10-soa-principles'
import { SoaIndustrySlide } from './slides/11-soa-industry'
import { SoaBusinessSlide } from './slides/12-soa-business'
import { NewBaseSlide } from './slides/13-new-base'
import { ServiceSlide } from './slides/13a-service-context'
import { ContextDiscoverySlide } from './slides/13b-context-discovery'
import { HomeAppSlide } from './slides/13d-home-app'
import { ServicesBeltSlide } from './slides/13e-services-belt'
import { DemoIntroSlide } from './slides/14-demo-intro'
import { PainsSlide } from './slides/14b-pains'
import { HolisticViewSlide } from './slides/15-holistic-view'
import { UnifiedSettingsSlide } from './slides/16-unified-settings'
import { UnifiedUiSlide } from './slides/16a-unified-ui'
import { UnifiedTasksSlide } from './slides/16b-unified-tasks'
import { UnifiedOperatorsSlide } from './slides/17-unified-operators'
import { UnifiedDataFieldsSlide } from './slides/18-unified-data-fields'
import { UnifiedApprovalsSlide } from './slides/19-unified-approvals'
import { ServiceExchangeSlide } from './slides/20-service-exchange'
import { AutonomousSlide } from './slides/21-autonomous'
import { ExternalSlide } from './slides/21a-external'
import { OutputDrivenSlide } from './slides/21b-output-driven'
import { ClosingSlide } from './slides/22-closing'
import { walkPace } from '../../ui/Walk'
import { UI_WALK } from '../../mocks/UiWalkMock'
import { TASKS_WALK } from '../../mocks/TasksWalkMock'
import { OPERATORS_WALK } from '../../mocks/OperatorsWalkMock'
import { FIELDS_WALK } from '../../mocks/FieldsWalkMock'
import { EXCHANGE_WALK } from '../../mocks/ExchangeWalkMock'
import { EXTERNAL_WALK } from '../../mocks/ExternalWalkMock'
import { OPS_WALK } from '../../mocks/OpsWalkMock'
import { OUTPUTS_WALK } from '../../mocks/OutputsWalkMock'
import { SETTINGS_WALK } from '../../mocks/PipelineSettingsMock'
import { REGISTRY_WALK } from '../../mocks/PlatformMocks'

/* Rebuilt 2026-09-14 to Eric's script (docs/keynote-intelligence.md). The
   notes below are that script, lightly edited, with `[step n]` binding each
   beat to a click. The slides themselves carry a little more text than a
   clean deck would — leads that swap per click and short cue lines — because
   the hall may have no speaker-notes screen. Slides 17–25 are the product
   tour from the AI Summit deck — title, subtitle, one screen each; catalog
   mocks stand in until captures come: `screens={[{ src: '/screens/<file>.png' }]}`. */
export const intelligence: Keynote = {
  id: 'intelligence',
  title: 'Intelligence Architecture',
  subtitle: 'AI, and the architecture where people and agents work together',
  chapters: [
    { id: 'opening', label: 'Opening' },
    { id: 'problem', label: 'The problem' },
    { id: 'context', label: 'Why context matters' },
    { id: 'soa', label: 'Service architecture' },
    { id: 'services', label: 'AI Operation Services' },
  ],
  slides: [
    {
      id: 'title', title: 'Intelligence Architecture', component: TitleSlide,
      notes: 'Xin chào! Xin chào tất cả các bạn!\n'
          + 'Tôi thực sự rất vui và cảm xúc khi quay trở lại sân khấu để kể tiếp câu chuyện của Base.\n'
          + 'WoW! Không khí sự kiện của chúng ta hôm nay thật tuyệt vời.',
      keywords: 'Mark Zuck | Marc Benioff Styles | WoW',
    },
    {
      id: 'ten-years', title: 'Ten years looking back', crumb: 'Build for AI - look back', chapter: 'opening', component: MyWorkSlide,
      notes: 'Để xây một tương lai mới với AI, chúng ta hãy nhìn lại quá khứ.\n'
          + 'Base đã đồng hành với hơn 12.000 doanh nghiệp Việt Nam.\n'
          + 'Các bạn không chỉ là niềm cảm hứng, là lý do cho sự trưởng thành và phát triển của Base.\n'
          + 'Chính các bạn đã giúp Base học hỏi và phát triển rất nhiều tính năng mới.\n'
          + 'Giúp Base vươn xa không chỉ trong nước, mà cả thế giới.',
      keywords: 'Nhìn lại hành trình | Building for the future',
    },
    {
      id: 'platform', title: 'An extensive platform', crumb: '10 years of work @ Base', chapter: 'opening', steps: PLATFORM_STEPS, component: PlatformSlide,
      notes: 'Trong suốt 10 năm qua, chúng ta đã cùng nhau xây dựng một nền tảng toàn diện.\n'
          + '[step 1] HRM.\n[step 2] Tuyển dụng.\n[step 3] Giao tiếp.\n[step 4] Bán hàng.',
    },
    {
      id: 'architecture', title: 'Base\'s architecture', crumb: 'Kiến trúc Base', chapter: 'opening', component: ArchitectureSlide,
      notes: 'Đằng sau nền tảng đó là một kiến trúc — và đây là đề xuất của Base.\n'
          + 'Elastic: các app bao phủ nhiều phạm vi và lĩnh vực.\n'
          + 'Modular: mỗi app được tối ưu cho một lĩnh vực.\n'
          + 'Human-driven — nhân bản: hướng đến con người, tập trung, không phải chuyển ngữ cảnh, một nơi duy nhất cho cả công ty.',
    },
    {
      id: 'topic', title: 'Our topic today', chapter: 'opening', component: TopicSlide,
      notes: 'Hôm nay chúng ta sẽ nói về AI và Kiến trúc Trí tuệ — của phần mềm, của công việc và của agent.\n'
          + 'Lần đầu tiên sau hàng nghìn năm, loài người chúng ta phải đối diện với một thực thể thông minh hơn chính mình.\n'
          + 'AI agent là một lực lượng lao động mới: chúng tìm kiếm nhanh hơn, lưu trữ nhiều dữ liệu hơn bộ não của chúng ta, và phối hợp với nhau hiệu quả hơn.',
    },
    {
      id: 'many-ais', title: 'A lot of AI', crumb: 'AI landscape', chapter: 'opening', component: ManyAisSlide,
      notes: 'Nhưng AI cũng vô cùng đa dạng. Có rất nhiều AI. Chúng ta có Claude. Chúng ta có OpenAI.\n'
          + 'Là những nhà lãnh đạo doanh nghiệp, chúng ta quan tâm nhiều hơn đến giá trị của AI trong công việc: tác động của nó lên con người, quy trình và dữ liệu của chúng ta.',
    },
    {
      id: 'current-software', title: 'Current software architecture', chapter: 'problem', steps: 1, component: CurrentSoftwareSlide,
      crumb: 'Finding the answer',
      notes: 'Nhưng chúng tôi cũng luôn tự hỏi mình cùng một câu hỏi: liệu nó đã đủ tốt cho tương lai chưa? Chúng ta có thể làm điều gì tốt hơn không?\n'
          + 'Khi AI xuất hiện, chúng tôi nhận ra loại phần mềm hiện tại — loại phần mềm mà chúng ta đã dành cả đời để xây dựng — KHÔNG CÒN phù hợp nữa.\n'
          + '[step 1] Phần mềm hiện tại được xây dựng theo hướng tính năng. Chúng ta xây hết tính năng này đến tính năng khác. Hàng nghìn tính năng. Mỗi tính năng giải quyết một vấn đề nhỏ mà người dùng có thể gặp trong công việc hằng ngày và khi khám phá phần mềm.\n'
          + 'Phần mềm hiện tại có thể mô tả là: một tập hợp thao tác UI được tạo ra cho con người sử dụng, và một cách biểu diễn dữ liệu với cấu trúc bị ẩn đi. Gần như tất cả. 99 phần trăm.\n'
          + 'Và nó không còn phù hợp với AI.',
    },
    {
      id: 'human-agent', title: '99% of software', chapter: 'problem', component: HumanAgentSlide,
      notes: '99 phần trăm phần mềm là một tập hợp thao tác UI được tạo ra cho con người sử dụng, cộng với một cách biểu diễn dữ liệu. Phần mềm được làm ra cho con người — cho cách chúng ta suy nghĩ và hành động.\n'
          + 'Nhưng agent không suy nghĩ và hành động theo cách đó. Nó không cần nhiều thao tác UI. Nó cần hiểu dữ liệu: với cấu trúc rõ ràng, không CHỈ là một cách biểu diễn.',
    },

    /* ── Why context matters: the six slides shared with the Agent keynote ── */
    {
      id: 'next-token', title: 'The next token', chapter: 'context', steps: 1, component: NextTokenSlide,
      crumb: 'So what is AI model?',
      notes: 'Trước khi nói về agent, hãy lùi lại một bước: cốt lõi của mọi trợ lý AI hiện nay là một Mô hình Ngôn ngữ Lớn — LLM. Và ở mức cơ bản nhất, ý tưởng đơn giản đến bất ngờ: nó liên tục dự đoán token tiếp theo nên là gì — stateless: độc lập, phi trạng thái, và theo xác suất. “Cảm ơn bạn đã…” — đặt hàng, chờ đợi, ủng hộ, đến sự kiện AI Summit.\n'
          + 'Có lẽ các bạn đang tự hỏi: token là gì? Token đơn giản là một đơn vị thông tin nhỏ mà AI dùng để đọc và tạo ra ngôn ngữ — chữ “predictable” gồm ba token. Đó là tất cả những gì các bạn cần biết về token.\n'
          + '[step 1] Đây là chỗ thú vị. LLM luôn dự đoán điều gì đến tiếp theo — và thường có nhiều hơn một câu trả lời hợp lý. Đó là lý do cùng một prompt có thể cho ra kết quả khác nhau: lần 1 chọn “đặt hàng”, lần 2 chọn “chờ đợi”.',
    },
    {
      id: 'context', title: 'Context', chapter: 'context', steps: 1, component: ContextSlide,
      crumb: 'Điều gì giúp dự đoán tốt hơn',
      notes: 'Vậy điều gì giúp dự đoán tốt hơn? [Dừng lại]\n'
          + 'Tự hiện ra, không cần click: Context — ngữ cảnh. AI càng có nhiều ngữ cảnh, nó càng hiểu rõ bạn muốn nói gì, điều gì quan trọng, điều gì đã xảy ra, bạn kỳ vọng gì — và từ đó, điều gì nên đến tiếp theo.'
          + '[step 1] Quay lại ví dụ: cùng prompt “Cảm ơn bạn đã…”, cùng những nhánh dự đoán. Rồi thêm ngữ cảnh — một sự thật: hôm nay là ngày tổ chức AI Summit; một nguồn: bạn là khách hàng của Base; một hành động: bạn vừa mới check-in. Và xác suất dồn hẳn về một nhánh: “đến sự kiện AI Summit” — 90 phần trăm. Context is everything.',
    },
    {
      id: 'adoption-gap', title: 'The adoption gap', chapter: 'context', component: AdoptionGapSlide,
      crumb: 'Khoảng cách ứng dụng AI',
      notes: 'Và điều này tạo ra một khoảng cách thú vị. Năng lực của AI đang tiến lên cực kỳ nhanh.\n'
          + 'Các cá nhân học cách sử dụng nó khá nhanh.\n'
          + 'Nhưng doanh nghiệp thì chậm hơn rất nhiều. Theo báo cáo của MIT năm 2025, 95% AI copilot không tạo ra được tác động kinh doanh thực sự. Vì sao vậy?',
    },
    {
      id: 'fragmented', title: 'Business context is fragmented', chapter: 'context', component: FragmentedSlide,
      crumb: 'Business context: phân mảnh, cô lập, loãng dần',
      notes: 'Hãy nghĩ về cách chúng ta dùng AI với tư cách cá nhân. Lần đầu mở ChatGPT, Claude hay Gemini, nó gần như không biết gì về bạn. Khi nó hiểu công việc, sở thích, những gì bạn đã làm trước đó, nó trở nên hữu ích hơn. Đó là personal context — ngữ cảnh cá nhân.\n'
          + 'Doanh nghiệp là một bài toán hoàn toàn khác. Chúng ta chưa bao giờ thiết kế tổ chức để AI có thể hiểu được. Kinh nghiệm, bí quyết nằm trong đầu từng cá nhân; dữ liệu nằm rải rác trong các phần mềm riêng lẻ — CRM, ERP, email, WhatsApp, Excel, tài liệu — không cái nào liên kết với cái nào.\n'
          + 'Vì vậy doanh nghiệp liên tục tạo ra tri thức và dữ liệu, nhưng rất ít trong số đó được tích lũy lại. Và rồi chúng ta kỳ vọng AI làm việc trong mớ hỗn độn đó — hãy xem nó nhảy từ hệ thống này sang hệ thống khác và lần nào cũng va vào tường. Làm sao AI hiểu được doanh nghiệp, khi chính doanh nghiệp chưa bao giờ kết nối những gì mình biết?',
    },
    {
      id: 'build-context', title: 'We have to build it', chapter: 'context', component: BuildContextSlide,
      crumb: 'Why we build what we build',
      notes: 'Every company can buy tokens. Every company can access the same model.\n'
          + 'But we cannot buy our business context.\n'
          + 'We have to build it. No shortcut. [Hold two seconds]\n'
          + 'That is why we build what we build: services that hold the models and the context, rules that people and agents both follow, tasks that come from real work. So — what exactly is an agent?',
    },
    {
      id: 'rethink', title: 'The quest to re-architecture software', crumb: 'Tái kiến trúc phần mềm', chapter: 'problem', component: RethinkSlide,
      notes: 'Đó là lý do chúng ta cần suy nghĩ lại về phần mềm và tái kiến trúc nó. Mục tiêu của chúng tôi là xây dựng một kiến trúc mới, để con người và AI có thể cùng nhau làm việc.\n'
          + 'Làm việc ở đây nghĩa là: tạo ra kết quả liên tục — đo bằng kết quả, đánh giá và cải tiến sau mỗi chu kỳ; tạo ra business context — để AI có thể cộng tác hiệu quả và thông minh hơn; và thừa hưởng, phát triển Base Architecture — toàn diện, tối ưu, nhân bản, mở ra cho AI.\n'
          + 'Nó cũng có nghĩa là một môi trường trao quyền cho CẢ con người và AI. Tốt nhất, nó trao quyền cho con người và tận dụng sức mạnh của AI. Nó giúp chúng ta — những con người — trở nên mạnh mẽ hơn.',
    },
    {
      id: 'bezos', title: 'Back to history', crumb: 'Quay về lịch sử', chapter: 'soa', component: BezosSlide,
      notes: 'Để tìm câu trả lời, chúng ta hãy quay về lịch sử. Hơn 20 năm trước, khi internet vừa mới trở nên phổ biến. Khi đó chưa có AI đáng kể nào. Chưa có hàng nghìn GPU và CPU cùng làm việc với nhau.\n'
          + 'Có một người tên là Jeff Bezos, ở công ty của ông ấy tên là Amazon. Ông ấy nói: "Everything at Amazon must be a service. Make it or you are out of here." — Mọi thứ ở Amazon phải là một dịch vụ. Làm đi, hoặc rời khỏi đây.',
    },
    {
      id: 'monolith', title: 'The monolith', crumb: 'Khối monolith', chapter: 'soa', steps: 5, component: MonolithSlide,
      notes: 'Vậy vì sao Jeff phải đưa ra mệnh lệnh này? Amazon khi đó là một hệ thống monolith khổng lồ. Mọi thứ đều kết nối với nhau. Người ta gọi đó là coupling — hay sự phụ thuộc.\n'
          + '[step 1] Một quy trình cần một quy trình khác mới chạy được.\n'
          + '[step 2] Muốn thay đổi, cả hai đều phải thay đổi.\n'
          + '[step 3] Nhưng thay đổi ở một quy trình lại tạo ra xung đột, vì nó còn phải kết nối với quy trình thứ ba, thứ tư.\n'
          + '[step 4] Và mọi thứ cứ thế vỡ tung khi hệ thống phát triển. Đó gọi là coupling.\n'
          + '[step 5] Hãy nghĩ về cách chúng ta quản trị. Về vận hành doanh nghiệp của chúng ta. Nó gần như y hệt.',
    },
    {
      id: 'service', title: 'Everything must be a service', crumb: 'Mọi thứ là service', chapter: 'soa', component: ServiceStopSlide,
      notes: 'Jeff nói: mọi thứ phải là một service. Vậy service là gì? Và kiến trúc hướng dịch vụ — SOA — là gì?',
    },
    {
      id: 'soa-principles', title: 'Service architecture: three principles', chapter: 'soa', steps: 3, component: SoaPrinciplesSlide,
      notes: 'What is a service? SOA builds around services. We can put it in three simple principles.\n'
          + '[step 1] The "Who" — identity, modularity. Every service is purpose-driven. You can name it and write it in plain English.\n'
          + '[step 2] The "Interfaces": inputs plus outputs. You declare what each service can do for the OUTSIDE — again in plain English, with explicit declarations. They are decoupled; they run on demand. When a service needs another service, it just asks: "What can you do for me?"\n'
          + '[step 3] The "How" — the internal engines. This is probably the most interesting. Services do not need to expose their internals, because they must change and evolve over time. After serving long enough, they learn patterns to optimise and improve. But the interface — how it connects externally — does NOT change. This is very important.',
    },
    {
      id: 'soa-industry', title: 'SOA and applications', crumb: 'SOA và ứng dụng', chapter: 'soa', steps: 1, component: SoaIndustrySlide,
      notes: 'SOA đã thay đổi ngành công nghệ ở quy mô rất lớn. Nó trở thành tiêu chuẩn của mọi hệ thống lớn — là xương sống của Amazon, AWS, Google, Microsoft và tất cả mọi người.\n'
          + '[step 1] Nhưng đó cũng chính là kiến trúc chúng ta cần — cho CẢ kiến trúc phần mềm lẫn vận hành doanh nghiệp CỦA CHÚNG TA.',
    },
    {
      id: 'soa-business', title: 'SOA for business operations', crumb: 'SOA cho vận hành doanh nghiệp', chapter: 'soa', steps: 1, component: SoaBusinessSlide,
      notes: 'SOA cho vận hành doanh nghiệp: từ monolith đến vận hành thông minh ở quy mô lớn. Mọi thứ là một service — cùng một nguyên tắc, áp dụng cho vận hành doanh nghiệp.\n'
          + '"Who": con người và phòng ban của chúng ta. Mỗi người đều có tên, có mục tiêu và nhiệm vụ.\n'
          + '"Interfaces": họ có một tập hợp chức năng — đầu vào và đầu ra của công việc. Đầu ra của chức năng này trở thành đầu vào của chức năng khác. Lẽ ra phải như vậy. Nhưng thực tế, vận hành doanh nghiệp của chúng ta KHÔNG đẹp như thế. Nó vẫn là một khối monolith, giống Amazon 20 năm trước.\n'
          + '"How": chúng ta vẫn để mỗi người, mỗi phòng ban làm việc độc lập. Họ được giao việc — đôi khi kèm một quy trình chuẩn — nhưng KHÔNG được giao sẵn lời giải.\n'
          + '[step 1] VÀ ĐIỀU ĐÁNG CHÚ Ý NHẤT: AI agent CỦA CHÚNG TA CẦN ĐÚNG GIAO THỨC ĐÓ để cùng làm việc. Who: con người, phòng ban — và AI agent. Mỗi người, kể cả agent, đều có tên, mục tiêu và nhiệm vụ. Interfaces và How vẫn giữ nguyên.',
    },

    /* ── Inside a service: business context, context discovery, tools and rules — moved from the Agent keynote ── */
    {
      id: 'service-context', title: 'Business context trong kiến trúc Service', chapter: 'soa', component: ServiceSlide,
      crumb: 'Business context trong kiến trúc Service',
      notes: 'Như đã nói ở phần trước, service là nơi con người và agent cùng làm việc. Agent trở nên đặc biệt có ý nghĩa khi làm việc trong context của một service.\n'
          + 'Và đây là lúc mọi thứ bắt đầu thú vị theo cách ĐẸP NHẤT — vì chính ở đây, kiến trúc service trở nên khác biệt hoàn toàn.\n'
          + 'Trên màn hình, không cần click: service KHÔNG còn chỉ là nơi chứa các thứ. Nó nắm giữ model và context: object model, operators, mục đích và system prompt, rules, tools, skills.',
    },
    {
      id: 'context-discovery', title: 'Context discovery trong service', chapter: 'soa', steps: 4, component: ContextDiscoverySlide,
      crumb: 'Context discovery trong một service',
      notes: 'Minh họa đơn giản cách khám phá context. Trong service, ta làm việc trên các object vận hành. Giả sử bạn chỉ có một object id — một deal — và không gì khác. Trang deal đứng bên phải, copilot của service bên cạnh; mỗi click khoanh phần trang mà lời gọi đọc tới.\n'
          + '[step 1] getObject(id) → object và service_id của nó. Giờ agent biết object và service.\n'
          + '[step 2] getService(service_id) → giờ nó biết định nghĩa service, context, system prompt, data model của object.\n'
          + '[step 3] getRules(service), getTools(service), và AGENTS.md của service → giờ nó có đầy đủ context vận hành: phải tuân theo gì, được làm gì, và làm việc thế nào.\n'
          + '[step 4] Ví dụ các tool: enrich(deal), project(deal), createTask(deal, task)… Agent hành động ngay trên deal — trong service, trên object.',
    },
    {
      id: 'home-app', title: 'Khi chúng ta đã có đầy đủ business context', chapter: 'soa', component: HomeAppSlide,
      crumb: 'Base Home app',
      notes: 'Khi business context đã đầy đủ, đây là nơi nó hiện ra: Base Home app — một nơi chung để con người làm việc cùng agents trên tất cả các services.\n'
          + 'Bên trái là Service Assistant. Một yêu cầu rất đời thường của sales: "Gửi báo giá cho Maslow và lấy chữ ký." Assistant suy nghĩ, rồi đi qua 4 bước trong 3 services — đọc deal và báo giá cũ trong Enterprise Pipeline, tính lại giá trong Enterprise Quote, kiểm tra discount rule cho APAC, và chuẩn bị yêu cầu ký trong New Business Contract.\n'
          + 'Câu trả lời trích đúng rule của công ty: giảm 8%, trong hạn mức 10% — nên không cần qua deal desk. Báo giá được điền sẵn từ 3 services — nhưng chưa gửi. Bấm "Send for signature" hay không là quyền của người dùng. Assistant cũng nói rõ nó đã cân nhắc gì mà không dùng: không phải Renewal Quote, không phải Partner-sourced Pipeline.\n'
          + 'Bên phải là các service hubs. Để ý ba service sáng lên "in use": Enterprise Pipeline, Enterprise Quote, New Business Contract — đúng những service assistant vừa đi qua. Agent không làm việc ngoài context; nó làm việc trong các services, với rules và tools của từng service. [Dừng một nhịp] Và mỗi service đều có một copilot.',
    },
    {
      id: 'new-base', title: 'The New Base.vn', crumb: 'Base.vn mới', chapter: 'soa', component: NewBaseSlide,
      notes: 'Đó là một hệ thống lý tưởng. Và đó cũng chính là hệ thống chúng tôi muốn giới thiệu với các bạn ngay bây giờ: Base.vn mới với AI Operation Services.\n'
          + 'Chúng ta KHÔNG CÒN NÓI VỀ PHẦN MỀM nữa. Mọi thứ trở thành service — service-driven, output-driven và AI-driven: chuẩn hoá toàn bộ vận hành qua các services, mọi vận hành hướng đến kết quả liên tục — có thể đánh giá và tối ưu, con người và AI cùng làm việc và tạo ra business context — phục vụ con người là ưu tiên.\n'
          + 'Và hệ thống trở thành một mạng lưới các services kết nối với nhau — CHO CẢ CON NGƯỜI VÀ AI.',
    },
    {
      id: 'services-belt', title: 'Only services', crumb: 'Không còn phần mềm, chỉ còn services', chapter: 'soa', component: ServicesBeltSlide,
      notes: 'Không còn phần mềm. Chỉ còn các services. [Chỉ vào belt] Đây là các services đang chạy trong một doanh nghiệp trên Base mới — sales, marketing, work, people, IT. Khác việc, khác độ sâu, khác rules bên trong.\n'
          + 'Nhưng mọi service đều khai báo đúng năm thứ: cái gì đi vào, cái gì đi ra, các stages nó đi qua, rules nó chạy theo, và ai vận hành nó. Services là các module vạn năng.\n'
          + 'Và một người hay một agent đều vận hành service qua cùng một giao diện — không có "AI surface" riêng, không copy-paste.',
    },
    {
      id: 'demo-intro', title: 'The new Base.vn', crumb: 'Công bố định vị thương hiệu mới', chapter: 'services', steps: 1, component: DemoIntroSlide,
      notes: 'Tôi xin công bố định vị thương hiệu mới của Base: The Agentic Operating System — running on AI operation services.\n'
          + '[step 1] Kiến trúc của Base mới, bốn điểm mấu chốt: toàn diện, tối ưu cho từng luồng nghiệp vụ, và hướng đến con người; không nghĩ đến tính năng phần mềm mà nghĩ đến luồng nghiệp vụ — service — và cấu trúc input/output; AI agents là lực lượng lao động mới và đặc biệt quan trọng; đóng gói và chuẩn hoá tri thức trở thành việc phải làm.\n'
          + 'Và một điều nữa: 10 năm lắng nghe và thấu hiểu. Những gì các bạn đã nói với chúng tôi — ở slide tiếp theo.',
    },
    {
      id: 'pains', title: 'How service architecture transforms Base', crumb: 'Service architecture × Base', chapter: 'services', component: PainsSlide,
      notes: 'Vậy kiến trúc service thay đổi Base như thế nào? Hãy bắt đầu từ những vấn đề mà các bạn vẫn gặp mỗi ngày:\n'
          + 'Công việc ở khắp mọi nơi. Duyệt ở rất nhiều apps, không có cách nào để xem được hết. Settings phức tạp theo từng app. Khó đánh giá hiệu quả nhân viên và phòng ban. Giao việc cho phòng ban thế nào? Tích hợp và truyền dữ liệu giữa các apps rất khó. Làm việc với bên ngoài thế nào? Có cách nào để khách hàng tạo workflow job? Và: có cách nào để tôi biết cả công ty đang sử dụng Base như thế nào?\n'
          + 'Hãy cùng xem nó hoạt động thế nào trên nhiều lĩnh vực và ứng dụng — bằng một bản demo thực tế. Trên mỗi màn hình: con người cần gì, và agent cần gì.',
    },
    {
      id: 'holistic-view', title: 'Universal service registry', crumb: 'Danh mục service', chapter: 'services', steps: 2, autoplay: walkPace(REGISTRY_WALK), component: HolisticViewSlide,
      notes: 'Vậy kiến trúc service mang lại những lợi ích đặc biệt gì?\n'
          + 'Các bạn có thể thực sự nhìn thấy mọi việc công ty phải xử lý — từ mọi phòng ban.\n'
          + 'Không còn phải vào từng app một — các service được chuẩn hoá ở tầng hệ thống.',
    },
    {
      id: 'unified-settings', title: 'Unified setting model', crumb: 'Mô hình cài đặt', chapter: 'services', steps: 4, autoplay: walkPace(SETTINGS_WALK), component: UnifiedSettingsSlide,
      notes: 'Rất nhiều khách hàng từng hỏi chúng tôi: vì sao không thể có một nơi để thiết lập và quản trị tất cả các app cùng lúc?\n'
          + 'Trước đây điều đó thực sự không thể, vì mỗi app có một logic riêng. Nhưng bây giờ, chúng ta thực sự làm được.\n'
          + 'App đơn giản trở thành địa chỉ chứa các service — một lớp rất mỏng — còn service nắm toàn bộ logic vận hành.\n'
          + 'Và các bạn có thể cấu hình service cả bên trong app lẫn trên trang cài đặt chung.',
    },
    {
      id: 'unified-ui', title: 'Unified user interface', crumb: 'Chuẩn hóa giao diện', chapter: 'services', steps: 2, autoplay: walkPace(UI_WALK), component: UnifiedUiSlide,
      notes: 'Không chỉ cài đặt — giao diện người dùng cũng được chuẩn hóa. Trải nghiệm, layout và điều hướng thống nhất trên tất cả các app.\n'
          + 'Đây là app Request: sidebar với các services của app, và nội dung ở giữa.\n'
          + '[step 1] App Task — cùng một layout.\n'
          + '[step 2] App Workflows — vẫn cùng một layout. Vì mọi app đều là tập hợp các services, học một app là dùng được tất cả.',
    },
    {
      id: 'unified-tasks', title: 'Unified task model', crumb: 'Mô hình công việc', chapter: 'services', steps: 5, autoplay: walkPace(TASKS_WALK), component: UnifiedTasksSlide,
      notes: 'Công việc. Lần đầu tiên các bạn có một nơi để xem tất cả công việc đến từ tất cả các service — đề xuất, công việc trong quy trình, phê duyệt, deal, tài liệu. Một kho, một hộp thư, cho mọi người thực hiện — cả con người và agent.\n'
          + 'Mỗi trang một ý: một nơi duy nhất; theo từng service — mỗi service giữ danh sách công việc của riêng mình, vẫn là những công việc đó; phê duyệt tự tạo công việc — một đề xuất có 3 người duyệt thì 3 công việc phê duyệt tự động vào danh sách công việc của từng người; lồng nhau không giới hạn — một đề xuất mở sâu đến đâu công việc đi đến đó, và tiến độ được cộng dồn từ dưới lên; giao theo sơ đồ tổ chức — công việc thuộc về một đơn vị, không chỉ một người; gắn vào kế hoạch — mọi công việc đều chảy vào kế hoạch mà nó phục vụ.',
    },
    {
      id: 'unified-operators', title: 'Unified operator model', crumb: 'Mô hình người vận hành', chapter: 'services', steps: 2, autoplay: walkPace(OPERATORS_WALK), component: UnifiedOperatorsSlide,
      notes: 'Chúng ta có thể biết chính xác — không chỉ bức tranh tổng thể, mà cụ thể từng người, từng phòng ban chịu trách nhiệm cho công việc nào.\n'
          + 'Các bạn có thể giao việc KHÔNG CHỈ bằng cách tag thành viên — mà theo vị trí công việc trên sơ đồ tổ chức.\n'
          + 'Đây là một thay đổi lớn mà khách hàng đã chờ đợi nhiều năm.',
    },
    {
      id: 'unified-data-fields', title: 'Unified data field model', crumb: 'Mô hình trường dữ liệu', chapter: 'services', steps: 1, autoplay: walkPace(FIELDS_WALK), component: UnifiedDataFieldsSlide,
      notes: 'Hệ thống trường dữ liệu — custom fields — là một tính năng đặc biệt quan trọng.\n'
          + 'Trước đây nó bị phân mảnh, vì phải gắn vào rất nhiều app được xây dựng độc lập với nhau.\n'
          + 'Giờ đây các bạn có một bộ trường chuẩn, có thể cấu hình ở tầng công ty.\n'
          + 'Điều đó không chỉ quan trọng cho việc cấu hình. Nó đặc biệt quan trọng khi dữ liệu phải được truyền liên tục qua nhiều service. Các bạn có một cấu trúc dữ liệu đồng bộ và thống nhất.',
    },
    {
      id: 'unified-approvals', title: 'Unified approval model', crumb: 'Mô hình phê duyệt', chapter: 'services', component: UnifiedApprovalsSlide,
      notes: 'Phê duyệt là một phần đặc biệt quan trọng trong rất nhiều service vận hành.\n'
          + 'Trước đây mỗi app tự tạo ra chuẩn phê duyệt riêng, đôi khi khiến việc quản lý trở nên rất khó khăn.\n'
          + 'Trong phiên bản mới, toàn bộ kiến trúc phê duyệt được xây dựng ở tầng hệ thống. Các bạn có thể phê duyệt trong từng app, và xem mọi phê duyệt trong Request.',
    },
    {
      id: 'service-exchange', title: 'Service exchange', crumb: 'Kết nối service', chapter: 'services', steps: 1, autoplay: walkPace(EXCHANGE_WALK), component: ServiceExchangeSlide,
      notes: 'Kết nối các service với nhau thật dễ dàng, ở tầng nền tảng.\n'
          + 'Các bạn có thể chọn mô hình kết nối, thậm chí ánh xạ đến từng trường dữ liệu.\n'
          + 'Và bên trong mỗi service, cũng dễ dàng thấy nó kết nối ra bên ngoài như thế nào.',
    },
    {
      id: 'external', title: 'External connections', crumb: 'Kết nối ra bên ngoài', chapter: 'services', steps: 1, autoplay: walkPace(EXTERNAL_WALK), component: ExternalSlide,
      notes: 'Không chỉ kết nối giữa các service với nhau — mọi service vận hành đều kết nối ra bên ngoài theo cùng một chuẩn.\n'
          + 'Webforms: khách hàng, ứng viên, đối tác gửi form — bản ghi được tạo thẳng trong service, không cần tài khoản.\n'
          + '[step 1] Service gateways: mỗi service có một cổng kết nối chuẩn — xác thực, giới hạn và ghi log — để mọi hệ thống bên ngoài gọi vào.',
    },
    {
      id: 'autonomous', title: 'Powerful', crumb: 'Mạnh mẽ', chapter: 'services', steps: 2, autoplay: walkPace(OPS_WALK), component: AutonomousSlide,
      notes: 'Việc chuẩn hoá mọi service vận hành có khiến các app yếu đi không?\n'
          + 'Thực tế là không. Chúng ta có những chuẩn chung để service đảm bảo: mô hình và ngữ cảnh.\n'
          + 'Chuẩn nằm ở tầng định nghĩa, cấu hình và cách các service giao tiếp với nhau — còn những gì chúng có thể thực thi thì mở rộng không giới hạn.\n'
          + 'Ví dụ trước mặt các bạn là app Sales Pipeline, được xây dựng lại từ đầu: mạnh mẽ và toàn diện.',
    },
    {
      id: 'output-driven', title: 'Output-driven', crumb: 'Hướng đầu ra', chapter: 'services', steps: 3, autoplay: walkPace(OUTPUTS_WALK), component: OutputDrivenSlide,
      notes: 'Và mọi service đều hướng đầu ra. Cùng một mô hình đầu ra vận hành ở mọi nơi, nên việc cải tiến diễn ra liên tục.\n'
          + 'Mỗi trang một ý: danh mục đầu ra — mọi loại đầu ra mà công ty đo đếm, doanh thu, deal, báo cáo, case study; các bản ghi được quản lý đằng sau một đầu ra, mỗi bản ghi gắn với đơn vị công việc đã tạo ra nó; khối lượng công việc mà mỗi bản ghi tiêu tốn, theo từng người, từng ngày; và đánh giá công việc — những lần review chấm điểm công việc theo bộ tiêu chí.',
    },
    {
      id: 'closing', title: 'Service architecture', chapter: 'services', component: ClosingSlide,
      notes: 'Đây chính là kiến trúc mà chúng tôi muốn giới thiệu với tất cả các bạn.\n'
          + 'SOA KHÔNG thay đổi vấn đề chúng ta muốn giải quyết. Nó thay đổi cách chúng ta tiếp cận: có cấu trúc hơn, ở quy mô lớn.\n'
          + 'Đó là NHỮNG KHỐI NỀN TẢNG, là MÔI TRƯỜNG VẬN HÀNH KHÉP KÍN, để chúng ta có thể làm việc thật tốt cùng agent.\n'
          + 'Bốn điều chúng ta kiến trúc lại: phần mềm — vận hành — business context — và ngôn ngữ giao tiếp giữa con người và agent.',
    },
  ],
}
