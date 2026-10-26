import type { Keynote } from '../../engine/types'
import './agent.css'
import { TitleSlide } from './slides/01-title'
import { ArchitectureSlide } from './slides/03-architecture'
import { KindsSlide } from './slides/04-kinds'
import { CompareSlide } from './slides/05-compare'
import { CopilotSlide } from './slides/06b-copilot'
import { AssistantSlide } from './slides/06b2-assistant'
import { TopicsSlide } from './slides/06b3-topics'
import { ToolsCliSlide } from './slides/06c-tools-cli'
import { ToolsMcpSlide } from './slides/06d-tools-mcp'
import { ToolsListSlide } from './slides/06e-tools-list'
import { RulesFirstSlide } from './slides/07b-rules-first'
import { AnnouncedSlide } from './slides/08-announced'
import { LifecycleSlide } from './slides/09-lifecycle'
import { RulesWalkSlide } from './slides/10-rules-walk'
import { AskRulesSlide } from './slides/10b-ask-rules'
import { BothSlide } from './slides/12-both'
import { IntelligenceOneSlide } from './slides/18c-intelligence-1'
import { IntelligenceTwoSlide } from './slides/18d-intelligence-2'
import { TasksSlide } from './slides/19-tasks'
import { RequestGraphSlide } from './slides/20-request-graph'
import { TaskModelsSlide } from './slides/22-task-models'
import { AgentsMdSlide } from './slides/21-agents-md'
import { SummarySlide } from './slides/23-summary'
import { QuoteSlide } from './slides/24-quote'
import { launch } from '../launch'

/* Rebuilt 2026-09-14 to Eric's outline: what an agent is (anatomy, ownership,
   four kinds, models), how agents become effective in the business (work
   rules — taken over from the work deck — then services and tasks). The
   slides carry a little more text than the clean version, so the talk holds
   without a notes screen; the full script is in `notes`. */
export const agent: Keynote = {
  id: 'agent',
  title: 'Agent Architecture',
  subtitle: 'Model, Context, Execution',
  chapters: [
    { id: 'anatomy', label: 'Anatomy' },
    { id: 'rules', label: 'Work rules' },
    { id: 'operation', label: 'Operation' },
    { id: 'launch', label: 'Launching timeline' },
  ],
  slides: [
    {
      id: 'title', title: 'Agent Architecture', component: TitleSlide,
      notes: 'Open on the field: from one point, many agents fanning out. Three words carry the talk — Model, Context, Execution.',
    },
    {
      id: 'architecture', title: 'Agent là gì?', chapter: 'anatomy', steps: 1, component: ArchitectureSlide,
      notes: 'By Jensen Huang, an agent is the model, the harness, tools and skills, and the runtime. That is the generic agent.\n'
          + '[step 1] For business context, our definition changes a bit: an agent is the identity, the LLM model, the harness, tools and skills, and the runtime. Identity comes first — who the agent is and who owns it: a person, a service, or the system — because it shapes all the others. The LLM model comes from the public AI providers. The harness is what runs the model — and the harness needs context: the context is where AGENTS.md — the agent’s instructions — and the tools and skills live, together with the business context, the rules and the data we build. The runtime is the computing environment it all runs in.',
    },

    /* ── Anatomy ─────────────────────────────────────────────────────── */
    {
      id: 'kinds', title: 'Năm loại agent', chapter: 'anatomy', component: KindsSlide,
      notes: 'Để làm được vậy, Base.vn định nghĩa năm loại agent.\n'
          + 'Assistants — agent cá nhân. Thuộc về mỗi người dùng; mục tiêu là hỗ trợ mọi việc chủ sở hữu giao, linh hoạt. Bộ nhớ cá nhân về chủ sở hữu. Dùng cho riêng họ.\n'
          + 'Copilots — agent của service. Thuộc về service; mục tiêu là giúp người dùng dùng service và hoàn thành công việc hiệu quả. Bộ nhớ cá nhân về từng người dùng. Bất kỳ ai cũng dùng được.\n'
          + 'Workflow agents. Thuộc về hệ thống. Agent chuyên biệt theo nghiệp vụ, chạy một chức năng theo quy trình chuẩn hóa — một tiện ích với input/output cố định. Bất kỳ ai cũng dùng được.\n'
          + 'Desktop agents. Một loại agent cá nhân đặc biệt chạy trên desktop. Tiếp cận context và ứng dụng phong phú hơn hẳn: chạy ứng dụng, mở trình duyệt, ghi hình trực tiếp.\n'
          + 'Expert agents — agent của nền tảng. Dùng chung trên nền tảng, không do bạn xây: chuyên gia pháp lý, chuyên gia thuế. Khác bốn loại kia, expert được thuê — gia nhập workspace của bạn khi bạn cần.',
    },
    {
      id: 'compare', title: 'So sánh', chapter: 'anatomy', component: CompareSlide,
      notes: 'Bảng so sánh. Đọc theo hàng đầu tiên: quyền sở hữu quyết định phần còn lại — mục tiêu, bộ nhớ, ai được dùng.\n'
          + 'Hai hàng cuối: context mỗi loại nhìn thấy, và nơi bạn gặp nó trong Base.vn — Grace là chief of staff, deal copilot trong Sales pipeline, kiểm tra rule trong luồng request, Amber trên desktop, và một chuyên gia pháp lý được thuê để rà soát hợp đồng.',
    },
    {
      id: 'copilot', title: 'Every service has a copilot', chapter: 'anatomy', steps: 1, component: CopilotSlide,
      crumb: 'Mỗi service đều có một copilot',
      notes: 'Mỗi service đều có một copilot. Ở đây là copilot của app Request — trên một purchasing request.\n'
          + 'Nhúng sẵn trong service: nó nằm ngay cạnh request, tập trung vào request đó, và đã biết sẵn những câu hỏi đáng hỏi về một request — nó là gì, thiếu gì, ai đang giữ nó.\n'
          + '[step 1] Nó hiểu object và service một cách tự nhiên. Yêu cầu nó tóm tắt: nó đọc các trường, đối chiếu purchasing policy, xem luồng phê duyệt đang ở đâu và trước đó đã xảy ra gì — rồi nói cho bạn bước tiếp theo. Không copy-paste, không phải giải thích ngữ cảnh.',
    },
    {
      id: 'assistant', title: 'Assistants — Trợ lý AI cá nhân', chapter: 'anatomy', component: AssistantSlide,
      crumb: 'Assistants: trợ lý AI cá nhân',
      notes: 'Assistants — trợ lý AI cá nhân. Ở đây là Grace, chief of staff của Eric, trong khung chat.\n'
          + 'Assistant tiếp cận tất cả dữ liệu và tools của user: lịch, email, tasks, các services user được dùng — nên một câu nhắn là đủ để nó đi làm.\n'
          + 'Và nó lưu trữ bộ nhớ dài hạn về user: thói quen, ưu tiên, những gì đã giao — càng dùng càng hiểu chủ của mình.',
    },
    {
      id: 'topics', title: 'Agent architecture', chapter: 'anatomy', component: TopicsSlide,
      crumb: 'Agent architecture: bốn phần',
      notes: 'Slide dừng. Bốn ô tự lần lượt hiện ra — nói theo từng chủ đề, không cần click.\n'
          + 'Tools — hai cửa vào Base cho mọi agent (CLI, MCP) và kho tools.\n'
          + 'Rules — Work rules: business context cho cả con người và agent.\n'
          + 'Tasks — một hệ thống task thống nhất cho agent; giao từ chat, hoặc từ vận hành service.\n'
          + 'AGENTS.md — hướng dẫn của agent nằm trong context: identity, rules, tools, skills.',
    },
    {
      id: 'tools-cli', title: 'Base CLI', chapter: 'anatomy', component: ToolsCliSlide,
      crumb: 'Tools: Base CLI',
      notes: 'Tools — ba phần. Hai cửa vào Base cho mọi agent, rồi kho tools.\n'
          + 'Cửa thứ nhất, Base CLI: một dòng cài đặt — curl trên macOS, Linux, WSL; irm trên Windows. Mọi thao tác trong Base từ dòng lệnh: developer dùng, và agent chạy trên máy của bạn — desktop agent, Claude Code, Codex — cũng dùng y hệt.',
    },
    {
      id: 'tools-mcp', title: 'Base MCP', chapter: 'anatomy', component: ToolsMcpSlide,
      crumb: 'Tools: Base MCP',
      notes: 'Cửa thứ hai, Base MCP: mỗi service của Base là một MCP server tại mcp.base.vn/service/… Thêm vào Claude Code bằng một lệnh, hoặc dán URL vào Cursor, ChatGPT hay agent tự viết — tools của Base thành tools của họ, không cần tích hợp riêng.',
    },
    {
      id: 'tools', title: 'Tools', chapter: 'anatomy', component: ToolsListSlide,
      crumb: 'Tools: service tools & public tools',
      notes: 'Và kho tools. Service tools là API của từng service, có namespace — service:get_object cho mọi service, sales:create_deal, request:approve, task:assign_task… — agent nào bước vào service đó là có ngay. Public tools là thế giới bên ngoài — Slack, Gmail, Zalo, Stripe, GitHub… — nối một lần, mọi agent dùng chung. Danh sách chạy mãi không hết: đó là ý.',
    },

    /* ── Work rules ──────────────────────────────────────────────────── */
    {
      id: 'rules-first', title: 'Rules are the cornerstone', chapter: 'rules', component: RulesFirstSlide,
      crumb: 'Business context: Rules',
      notes: 'Rules rất quan trọng, vì đây KHÔNG chỉ là chuyện của agent. Để vận hành, chúng ta cũng cần rules cho con người. Rules là nền tảng của doanh nghiệp.\n'
          + 'Tôi muốn dành thêm chút thời gian cho phần này. Trước hết, xin giới thiệu Work rules: hệ thống vận hành và quản lý rules.',
    },
    {
      id: 'announced', title: 'What is broken with rules?', chapter: 'rules', component: AnnouncedSlide,
      crumb: 'Rules đang hỏng ở đâu?',
      notes: 'Hãy nói về cách rules được xây cho con người trước — vì nó rất quan trọng, và đang khá hỏng.\n'
          + 'Khi vận hành doanh nghiệp, rules được dùng rất hạn chế. Chủ yếu để thông báo.\n'
          + 'Nhưng sự chú ý phai dần theo thời gian. Người mới có lẽ sẽ không bao giờ đọc sổ tay nhân viên hay sales kit.',
    },
    {
      id: 'lifecycle', title: 'Introducing Work rules', chapter: 'rules', component: LifecycleSlide,
      crumb: 'Giới thiệu Base.vn Work rules',
      notes: 'Xin giới thiệu Base.vn Work rules: một framework quản lý rules và chính sách hoàn chỉnh, trọn vòng đời, từng giai đoạn một.\n'
          + 'Soạn thảo — viết bản nháp, quản lý phiên bản, đính kèm tệp.\n'
          + 'Phê duyệt — được duyệt trước khi áp dụng.\n'
          + 'Ban hành — đến các kênh, kèm thông báo.\n'
          + 'Xác nhận và kiểm tra kiến thức — mọi người xác nhận đã đọc, và chúng ta kiểm tra họ đã hiểu.\n'
          + 'Tra cứu — tìm theo ngữ nghĩa, hoặc chỉ cần hỏi. Khi vòng lặp khép kín, chính những rules đó được agent đọc.',
    },
    {
      id: 'rules-walk', title: 'Work rules, in the product', chapter: 'rules', steps: 4, component: RulesWalkSlide,
      crumb: 'Work rules trong sản phẩm',
      notes: 'Work rules trong sản phẩm. Năm màn hình, mỗi click một màn hình.\n'
          + 'Thực thể ở tầng hệ thống: mọi rule trong công ty nằm trong một sổ đăng ký, như một service — quy trình, hướng dẫn, tiêu chuẩn, quyết định, chính sách.\n'
          + '[step 1] Liên kết với service và agent: một rule liên kết với các service nó áp dụng bên trong và các agent đọc nó — nên agent khi vận hành làm đúng những gì bạn muốn.\n'
          + '[step 2] Gắn chặt theo từng service: nhìn từ phía service — tab AI rules & agents trong cài đặt của một workflow. Sáu rules workflow này chạy theo, rule nào áp dụng ở stage nào, rule nào kế thừa từ công ty; và ba agent làm việc trong service, mỗi agent đọc rules nào trước khi hành động.\n'
          + '[step 3] Công bố: hộp thư rollout — rule được ban hành đến các kênh kèm thông báo tới từng người.\n'
          + '[step 4] Xác nhận: các assignment — bài đọc ai đó giao cho bạn, xác nhận bạn đã đọc, và bài kiểm tra kiến thức để biết bạn đã hiểu.',
    },
    {
      id: 'ask-rules', title: 'Made for the easiest accessibility', chapter: 'rules', component: AskRulesSlide,
      crumb: 'Hỏi AI về rules',
      notes: 'Và nó được xây để dễ tiếp cận nhất có thể. Ai cũng có thể hỏi — bằng lời thường, như hỏi một đồng nghiệp.\n'
          + 'Màn hình tự chạy một đoạn hội thoại ngắn: năm đầu được bao nhiêu ngày phép, nghỉ một tuần khi thử việc, làm việc tại nhà. Copilot trả lời từ các rules đã ban hành mà người này được xem — và lần nào cũng nêu rõ rule nó đã dùng.',
    },
    {
      id: 'both', title: 'For system and human', chapter: 'rules', component: BothSlide,
      crumb: 'Work rules: cho cả hệ thống và con người',
      notes: 'Các bạn không nghe nhầm — rules ở đây là cho CẢ HAI.\n'
          + 'Cho con người: trang, tệp đính kèm, toàn văn — tìm theo từ khóa, theo ngữ nghĩa, hoặc chỉ cần hỏi.\n'
          + 'Rồi, tự hiện ra — cho agent: khi bạn tạo rule có tệp đính kèm, AI trích xuất và tóm tắt nội dung cùng các tệp thành một bản hướng dẫn cho agent. Ngôn ngữ cho agent khác hẳn — ngắn, rõ, không hình thức. Giữ nguyên ý nghĩa với ít token hơn: 240 thay vì 3.100.',
    },

    /* ── Operation ───────────────────────────────────────────────────── */
    {
      id: 'tasks', title: 'Tasks', chapter: 'operation', steps: 2, component: TasksSlide,
      crumb: 'Agent Execution: Tasks',
      notes: 'Tasks cũng rất thú vị. Bạn không chỉ có một hệ thống tasks thống nhất cho con người — bạn còn có một hệ thống tasks thống nhất cho agents. Đây là task box của Grace: agent nào cũng có một cái. Nhìn cột Origin: một lịch, một người, một trigger, assistant.\n'
          + '[step 1] Vậy tasks đến từ đâu? Bạn có thể giao khi chat với agent, tất nhiên — một tin nhắn thành ba tasks trong danh sách của nó.\n'
          + '[step 2] Nhưng đó chưa phải cách hay nhất. Tasks nên được tạo ra từ công việc — và công việc đến từ services. Ở đây một request mua sắm chạy luồng phê duyệt, và một bước của luồng đó là của agent: luồng giao task, không ai phải nhờ.',
    },
    {
      id: 'request-graph', title: 'Context vận hành của service', chapter: 'operation', component: RequestGraphSlide,
      crumb: 'Thực thi task thông minh hơn trong các service vận hành',
      notes: 'Ví dụ, trong app Request bạn định nghĩa một execution graph như thế này. Một agent có thể bước vào và làm node “kiểm tra rule”.\n'
          + 'Khi đến lượt nó, agent được giao một task — trong đúng context đó. Bạn sẽ thấy task tự xuất hiện trong task box của agent. Nghĩa là agent thực sự tham gia công việc cùng con người.\n'
          + 'Và vì nằm trong context, việc thực thi giàu hơn hẳn: khám phá service từ request; tools, skills = UNION(service, agent); hoàn thành task. Điều này đúng trong mọi context — từ phê duyệt, đến lead, deal hay job.',
    },
    {
      id: 'task-models', title: 'Task models', chapter: 'operation', component: TaskModelsSlide,
      notes: 'Để hệ thống mạnh hơn, bốn task models được đưa vào. Bốn ô tự lần lượt hiện ra.\n'
          + 'Tasks — thực thi trực tiếp.\n'
          + 'Approvals — con người trong vòng lặp: agent đề xuất, một người duyệt.\n'
          + 'Schedules — một task chạy tại một thời điểm cụ thể.\n'
          + 'Plans — một task cần nhiều bước. Hiện mới ở dạng preview.',
    },
    {
      id: 'agents-md', title: 'AGENTS.md', chapter: 'operation', component: AgentsMdSlide,
      crumb: 'AGENTS.md: hướng dẫn của agent',
      notes: 'AGENTS.md — phần thứ tư. Hai file thật, cạnh nhau, tự hiện ra — không cần click.\n'
          + 'Bên trái là của một service: Enterprise Pipeline, sales. Mục đích, object deal, ba rules phải đọc trước khi hành động — chiết khấu POL-014, mẫu báo giá, không gửi email cho khách — tools của service, và playbook theo stage.\n'
          + 'Bên phải là của một agent: Grace, chief of staff của Eric. Vai trò, cách làm việc, được làm gì và không được làm gì, tools mang theo, memory.\n'
          + 'Khi Grace bước vào Enterprise Pipeline, nó đọc cả hai: tools = UNION(service, agent); rules = UNION(service, agent).',
    },
    /* ── Launching timeline: the Launch keynote's five slides, shared ──── */
    ...launch.slides.map(s => ({ ...s, id: `launch-${s.id}`, chapter: 'launch' })),

    {
      id: 'intelligence-1', title: 'Intelligence 1.0', chapter: 'operation', component: IntelligenceOneSlide,
      crumb: 'Intelligence 1.0',
      notes: 'Các bạn có thể hỏi vì sao chúng tôi chọn tái kiến trúc toàn bộ nền tảng.\nĐể có giao diện đẹp hơn, dễ dùng hơn? Để có một không gian hiệu quả hơn cho chúng ta làm việc cùng Agents.\nTất nhiên rồi! Nếu không làm được điều đó, chúng ta không thể làm việc hiệu quả với AI.',
    },
    {
      id: 'intelligence-2', title: 'Intelligence 2.0', chapter: 'operation', steps: 3, autoplay: [0.7, 0.7, 0.7, Infinity], component: IntelligenceTwoSlide,
      crumb: 'Intelligence 2.0',
      notes: 'Nhưng tất cả những điều này là sự chuẩn bị cho hàng loạt kế hoạch và nghiên cứu lớn mà chúng tôi sẽ thực hiện trong năm 2027.\n[step 1] Self-improving agents: agent ngày càng thông minh hơn khi thực hiện nhiều công việc hơn.\n[step 2] Reinforcement learning: toàn bộ kiến trúc vận hành và phần mềm, khi hướng tới đầu ra, có một đặc tính rất đẹp: nó cho chúng ta biết kết quả — tốt hay chưa tốt, hiệu quả hay chưa hiệu quả. Đây sẽ là dữ liệu quan trọng nhất để chúng tôi áp dụng RL, giúp hệ thống đề xuất cải tiến dựa trên các mẫu dữ liệu lớn.\n[step 3] Team agents & AI Workspace: personal agents và desktop agents là hai lĩnh vực chúng tôi sẽ dành nhiều thời gian phát triển nhất trong thời gian tới. Chúng tôi cũng sẽ tiếp tục phát triển Agent Orchestration, để nhiều agent có thể cùng lên kế hoạch và làm việc với con người hiệu quả hơn.',
    },
    {
      id: 'summary', title: 'Base Agentic OS', chapter: 'operation', steps: 1, component: SummarySlide,
      crumb: 'The Age of Learning',
      notes: 'Khép lại: sáu khái niệm của Base Agentic OS tự lần lượt hiện ra. [click] Sáu ô dồn sang trái; bên phải: AI trong ba năm đi từ dự đoán the next token đến AGI — và một từ: Learning.\n'
          + 'Service, Service-oriented architecture, Context, Rules, Tasks, AGENTS.md — đây là ngôn ngữ mới của vận hành doanh nghiệp.\n'
          + 'Trong kỷ nguyên AI, model ai cũng mua được. Cái không mua được là tốc độ học của tổ chức. Ai học nhanh, người đó dẫn đầu.',
    },
    {
      id: 'quote', title: 'AI không lấy đi công việc của chúng ta', chapter: 'operation', steps: 1, component: QuoteSlide,
      crumb: 'Lời kết',
      notes: 'Lời kết. Câu đầu hiện cùng slide; câu thứ hai tự hiện sau một nhịp. Masayoshi Son — và nhiều người khác cũng nói vậy. [click] Câu trích dồn sang trái; bên phải: Base sẽ học hỏi cùng bạn, cải tiến cùng bạn, đồng hành cùng bạn để tiến vào kỷ nguyên trí tuệ.',
    },
  ],
}
