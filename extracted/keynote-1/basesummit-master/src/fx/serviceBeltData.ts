/* The services on the belt — the rework landing page's act 01 list
   (C:/ai/landing/rework/src/components/home/act-same/actSameData.js), put
   into Vietnamese and grown to fifty so the belt reads as a whole company.
   Twenty of them carry the open-service detail the spotlight cycles through.
   All demo data is invented. */

export type Family = 'sales' | 'mkt' | 'work' | 'people' | 'it'

export interface ServiceDetail {
  handle: string
  goal: string
  fields: [string, string][]
  rules: string[]
  agent: [string, string]
}

export interface Service {
  name: string
  /** The app the service belongs to, on the card's pill. */
  app: string
  family: Family
  input: string
  output: string
  stages: string[]
  /** Stages past the ones shown. */
  stagesMore: number
  rule: string
  rulesMore: number
  /** Initials of the people operating it. */
  people: string[]
  agents: number
  detail?: ServiceDetail
}

const s = (
  name: string, app: string, family: Family, input: string, output: string,
  stages: string[], stagesMore: number, rule: string, rulesMore: number, people: string[], agents: number,
  detail?: ServiceDetail,
): Service => ({ name, app, family, input, output, stages, stagesMore, rule, rulesMore, people, agents, detail })

export const SERVICES: Service[] = [
  /* ── Sales ── */
  s('Pipeline doanh nghiệp', 'Bán hàng', 'sales', 'Lead đủ điều kiện', 'Deal thắng',
    ['Đánh giá', 'Phạm vi', 'Đề xuất', 'Đàm phán'], 5, 'Giảm giá trên 10% chuyển deal desk', 3, ['D', 'A'], 1, {
      handle: 'sales.pipeline.enterprise',
      goal: 'Đưa mọi deal doanh nghiệp đến một quyết định — và chỉ gọi deal desk khi mức giảm giá thật sự cần.',
      fields: [['deal_id', 'UUID'], ['account_id', 'UUID'], ['stage', 'ENUM'], ['amount', 'MONEY']],
      rules: ['Giảm giá trên 10% phải qua deal desk trước khi gửi báo giá.', 'Deal không vào Đàm phán khi chưa có người quyết định ngân sách.'],
      agent: ['Pipeline Agent', 'Đánh dấu deal không có hoạt động 14 ngày và soạn bước tiếp theo cho người phụ trách.'],
    }),
  s('Báo giá doanh nghiệp', 'Báo giá', 'sales', 'Deal đã duyệt', 'Báo giá đã ký',
    ['Soạn', 'Định giá', 'Duyệt'], 0, 'Giá dưới sàn chặn gửi', 1, ['A'], 1, {
      handle: 'sales.quote.enterprise',
      goal: 'Định giá deal đã duyệt theo bảng giá hiện hành, và chỉ áp dụng mức giảm mà người bán này được phép.',
      fields: [['quote_id', 'UUID'], ['deal_id', 'UUID'], ['total', 'MONEY'], ['discount_pct', 'NUM']],
      rules: ['Giá dưới sàn chặn gửi ngay lập tức.', 'Mọi báo giá hết hạn sau 30 ngày trừ khi deal desk gia hạn.'],
      agent: ['Quote Agent', 'Định giá lại theo pricebook trực tiếp và chỉ ra chính xác thay đổi so với phiên bản trước.'],
    }),
  s('Hợp đồng mới', 'Hợp đồng', 'sales', 'Báo giá đã ký', 'Hợp đồng có hiệu lực',
    ['Soạn', 'Redline', 'Ký', 'Lưu'], 0, 'Điều khoản ngoài chuẩn chuyển Pháp chế', 5, ['D', 'L'], 1, {
      handle: 'sales.contract.new',
      goal: 'Biến báo giá đã ký thành hợp đồng có hiệu lực, Pháp chế chỉ xem những phần ngoài chuẩn.',
      fields: [['contract_id', 'UUID'], ['quote_id', 'UUID'], ['signers', 'JSON[]'], ['executed_at', 'DATE']],
      rules: ['Điều khoản ngoài chuẩn tự động chuyển Pháp chế.', 'Chưa đủ hai chữ ký thì chưa tạo đơn hàng.'],
      agent: ['Redline Agent', 'So từng điều khoản với mẫu chuẩn và chỉ đánh dấu những điểm khác.'],
    }),
  s('Đơn hàng tiêu chuẩn', 'Đơn hàng', 'sales', 'Hợp đồng có hiệu lực', 'Đơn đã giao',
    ['Xác nhận', 'Lấy hàng', 'Giao'], 2, 'Tồn kho dưới 5 giữ đơn lại', 2, ['H'], 2, {
      handle: 'sales.order.standard',
      goal: 'Giao đúng những gì đã ký, và giữ đơn lại thay vì giao thứ hợp đồng không có.',
      fields: [['order_id', 'UUID'], ['contract_id', 'UUID'], ['lines', 'JSON[]'], ['ship_by', 'DATE']],
      rules: ['Tồn kho dưới 5 đơn vị giữ đơn lại để xem xét.', 'Không thêm được dòng hàng ngoài hợp đồng.'],
      agent: ['Fulfilment Agent', 'Đối chiếu tồn kho với đơn và báo thiếu hụt trước ngày giao.'],
    }),
  s('Hợp đồng gia hạn', 'Hợp đồng', 'sales', 'Gói sắp hết hạn', 'Hợp đồng gia hạn',
    ['Đánh dấu', 'Định giá', 'Ký'], 1, '90 ngày trước hạn tự mở', 4, ['M'], 1, {
      handle: 'sales.contract.renewal',
      goal: 'Mở mọi gia hạn đủ sớm để nó là một cuộc trò chuyện, không phải một cuộc chạy nước rút.',
      fields: [['renewal_id', 'UUID'], ['subscription_id', 'UUID'], ['uplift_pct', 'NUM'], ['term_months', 'NUM']],
      rules: ['90 ngày trước khi hết hạn, gia hạn tự mở.', 'Tăng giá trên 8% cần chủ tài khoản ký duyệt.'],
      agent: ['Renewal Agent', 'Mở gia hạn trước 90 ngày kèm lịch sử sử dụng và hỗ trợ.'],
    }),
  s('Lead đối tác', 'Bán hàng', 'sales', 'Giới thiệu từ đối tác', 'Lead đã phân bổ',
    ['Tiếp nhận', 'Kiểm tra', 'Phân bổ'], 0, 'Trùng tài khoản thì gắn vào, không tạo mới', 2, ['P'], 1),
  s('Demo sản phẩm', 'Bán hàng', 'sales', 'Yêu cầu demo', 'Demo đã thực hiện',
    ['Xếp lịch', 'Chuẩn bị', 'Demo', 'Ghi nhận'], 0, 'Không xác nhận trong 24h thì nhắc lại', 1, ['A', 'S'], 1),
  s('Chăm sóc khách hàng', 'Khách hàng', 'sales', 'Ticket khách hàng', 'Vấn đề đã giải quyết',
    ['Tiếp nhận', 'Xử lý', 'Đóng'], 1, 'Khách doanh nghiệp phản hồi trong 2 giờ', 3, ['C', 'S'], 2),
  s('Đấu thầu dự án', 'Bán hàng', 'sales', 'Hồ sơ mời thầu', 'Hồ sơ dự thầu đã nộp',
    ['Đọc', 'Phân tích', 'Soạn', 'Nộp'], 1, 'Giá trị trên 5 tỷ cần Giám đốc duyệt', 2, ['D', 'K'], 2),
  s('Onboarding khách hàng', 'Khách hàng', 'sales', 'Hợp đồng có hiệu lực', 'Khách đã go-live',
    ['Kick-off', 'Cài đặt', 'Đào tạo', 'Go-live'], 0, 'Trễ go-live 1 tuần báo CSM lead', 2, ['C'], 1),

  /* ── Marketing ── */
  s('Lead từ quảng cáo', 'Lead', 'mkt', 'Form quảng cáo', 'Lead đã chấm điểm',
    ['Thu thập', 'Chấm điểm', 'Phân bổ'], 0, 'Điểm trên 80 chuyển team KL', 3, ['N'], 2, {
      handle: 'marketing.lead.paid_social',
      goal: 'Chấm điểm và phân bổ mọi lead trả phí trong vài phút, để tốc độ phản hồi không phụ thuộc ai đang online.',
      fields: [['lead_id', 'UUID'], ['campaign_id', 'UUID'], ['score', 'NUM'], ['owner_id', 'UUID']],
      rules: ['Điểm trên 80 chuyển team KL trong 5 phút.', 'Lead trùng tài khoản có sẵn thì gắn vào, không tạo bản sao.'],
      agent: ['Lead Agent', 'Chấm điểm theo độ phù hợp và ý định, khử trùng lặp và phân bổ theo khu vực.'],
    }),
  s('Meta Ads', 'Quảng cáo', 'mkt', 'Brief chiến dịch', 'Chi tiêu và hiệu quả',
    ['Brief', 'Chạy', 'Tối ưu'], 1, 'CPL vượt mục tiêu tạm dừng ad set', 2, ['N'], 2, {
      handle: 'marketing.ads.meta',
      goal: 'Giữ ngân sách ở những ad set thật sự tạo ra lead đạt chuẩn, không phải tạo ra click.',
      fields: [['adset_id', 'UUID'], ['spend', 'MONEY'], ['leads', 'NUM'], ['cpl', 'MONEY']],
      rules: ['Chi phí mỗi lead vượt mục tiêu thì tạm dừng ad set.', 'Đổi ngân sách cần chủ ngân sách, không phải agent.'],
      agent: ['Ads Agent', 'Theo dõi chi phí mỗi lead đạt chuẩn hàng giờ và tạm dừng cái nào lệch mục tiêu.'],
    }),
  s('Chuỗi webinar', 'Sự kiện', 'mkt', 'Đăng ký', 'Đã tham dự và chấm điểm',
    ['Đăng ký', 'Nhắc', 'Tham dự', 'Chấm điểm'], 0, 'Vắng mặt chuyển danh sách nuôi dưỡng', 1, ['N', 'A'], 1, {
      handle: 'marketing.event.webinar',
      goal: 'Chạy cả sự kiện như một service, để điểm danh và theo dõi sau đó không còn là hai bảng tính rời.',
      fields: [['event_id', 'UUID'], ['registrations', 'NUM'], ['attended', 'NUM'], ['scored', 'BOOL']],
      rules: ['Vắng mặt chuyển sang danh sách nuôi dưỡng, không phải danh sách gọi.', 'Tham dự trên 30 phút tính là có tương tác.'],
      agent: ['Event Agent', 'Gửi nhắc theo lịch và chấm điểm tham dự ngay khi phiên kết thúc.'],
    }),
  s('Nội dung blog', 'Nội dung', 'mkt', 'Ý tưởng bài viết', 'Bài đã đăng',
    ['Dàn ý', 'Viết', 'Duyệt', 'Đăng'], 0, 'Bài chưa có từ khoá không được duyệt', 2, ['N', 'T'], 2),
  s('Email nuôi dưỡng', 'Email', 'mkt', 'Lead chưa sẵn sàng', 'Lead đã kích hoạt',
    ['Phân nhóm', 'Gửi', 'Đo'], 0, 'Mở 3 email liên tiếp chuyển Sales', 2, ['N'], 1),
  s('Google Ads', 'Quảng cáo', 'mkt', 'Bộ từ khoá', 'Chi tiêu và chuyển đổi',
    ['Từ khoá', 'Chạy', 'Tối ưu'], 1, 'CPA vượt 120% tạm dừng', 2, ['N'], 2),
  s('Chương trình giới thiệu', 'Growth', 'mkt', 'Khách giới thiệu', 'Thưởng đã trả',
    ['Ghi nhận', 'Xác minh', 'Trả thưởng'], 0, 'Chỉ trả thưởng khi người mới thanh toán', 1, ['G'], 1),
  s('Khảo sát NPS', 'Khách hàng', 'mkt', 'Phản hồi khách hàng', 'Điểm và hành động',
    ['Gửi', 'Thu thập', 'Phân tích'], 0, 'Điểm dưới 6 mở ticket chăm sóc', 2, ['C', 'N'], 1),
  s('Mạng xã hội', 'Nội dung', 'mkt', 'Lịch nội dung', 'Bài đã đăng và đo',
    ['Lên lịch', 'Duyệt', 'Đăng', 'Đo'], 0, 'Bài nhắc thương hiệu khác cần duyệt', 1, ['T'], 2),

  /* ── Work & finance ── */
  s('Đợt xuất hoá đơn', 'Tài chính', 'work', 'Đơn đã giao', 'Hoá đơn đã phát hành',
    ['Soạn', 'Rà soát', 'Phát hành'], 0, 'Quá hạn 30 ngày bắt đầu nhắc nợ', 4, ['H'], 2, {
      handle: 'finance.invoice.run',
      goal: 'Xuất hoá đơn cho đúng những gì đã giao, đúng ngày giao, và đòi nợ mà không ai phải nhớ.',
      fields: [['invoice_id', 'UUID'], ['order_id', 'UUID'], ['amount', 'MONEY'], ['due_date', 'DATE']],
      rules: ['Quá hạn 30 ngày bắt đầu chuỗi nhắc nợ.', 'Không xuất hoá đơn cho đơn chưa giao.'],
      agent: ['Collections Agent', 'Gửi lịch nhắc và chỉ leo thang những tài khoản phớt lờ nó.'],
    }),
  s('Yêu cầu thiết bị', 'Yêu cầu', 'work', 'Yêu cầu trên 5 triệu', 'Mua sắm đã duyệt',
    ['Tạo', 'Duyệt', 'Đặt mua'], 1, 'Vượt hạn mức cần chủ trung tâm chi phí', 3, ['F'], 1, {
      handle: 'work.request.equipment',
      goal: 'Ai cũng xin được thứ mình cần, và hạn mức quyết định ai phải duyệt.',
      fields: [['request_id', 'UUID'], ['item', 'TEXT'], ['unit_cost', 'MONEY'], ['approved', 'BOOL']],
      rules: ['Vượt hạn mức tự duyệt cần chủ trung tâm chi phí.', 'Món ngoài danh mục cần lý do bằng văn bản.'],
      agent: ['Request Agent', 'Điền form từ danh mục và chọn đúng người duyệt theo trung tâm chi phí.'],
    }),
  s('Luồng phê duyệt', 'Quy trình', 'work', 'Hạng mục vượt hạn mức', 'Quyết định có hồ sơ',
    ['Chuyển', 'Quyết định'], 0, '3 ngày chưa quyết định thì leo thang', 6, ['F', 'H'], 1, {
      handle: 'work.workflow.approval',
      goal: 'Biến mọi phê duyệt thành một hồ sơ có hạn, thay vì một tin nhắn ai đó đang chờ.',
      fields: [['approval_id', 'UUID'], ['subject_ref', 'TEXT'], ['decision', 'ENUM'], ['decided_at', 'DATE']],
      rules: ['3 ngày không quyết định thì leo thang một cấp.', 'Người duyệt không được duyệt yêu cầu của chính mình.'],
      agent: ['Escalation Agent', 'Nhắc người duyệt, rồi leo thang khi quá hạn.'],
    }),
  s('Follow-up bán hàng', 'Công việc', 'work', 'Lead chưa liên hệ', 'Đã liên hệ và ghi nhận',
    ['Giao', 'Liên hệ', 'Ghi nhận'], 0, 'Đã liên hệ trong 48h thì bỏ qua', 1, ['A', 'H'], 2, {
      handle: 'work.task.sales_followup',
      goal: 'Biến danh sách lead chưa chạm thành việc được giao kèm kịch bản, để follow-up không phụ thuộc trí nhớ.',
      fields: [['task_id', 'UUID'], ['lead_id', 'UUID'], ['owner_id', 'UUID'], ['outcome', 'ENUM']],
      rules: ['Đã liên hệ trong 48 giờ thì bỏ qua.', '3 lần không liên lạc được thì đóng việc.'],
      agent: ['Follow-up Agent', 'Lập batch, chia theo độ phù hợp và ghi mọi lần thử vào lead.'],
    }),
  s('Dự án triển khai', 'Dự án', 'work', 'Phạm vi đã ký', 'Milestone đã bàn giao',
    ['Kế hoạch', 'Thực hiện', 'Rà soát', 'Bàn giao'], 2, 'Milestone trễ báo nhà tài trợ', 4, ['M', 'T'], 1, {
      handle: 'work.project.delivery',
      goal: 'Giao đúng những gì đã ký, và ngày trễ hiện ra với nhà tài trợ đúng ngày nó trễ.',
      fields: [['project_id', 'UUID'], ['contract_id', 'UUID'], ['milestones', 'JSON[]'], ['health', 'ENUM']],
      rules: ['Milestone trễ tự động báo nhà tài trợ.', 'Phạm vi thêm phải truy về một thay đổi đã ký.'],
      agent: ['Delivery Agent', 'Theo dõi ngày milestone và viết ghi chú trạng thái trước buổi họp tuần.'],
    }),
  s('Đề nghị thanh toán', 'Chi phí', 'work', 'Hoá đơn chứng từ', 'Đã hoàn ứng',
    ['Nộp', 'Duyệt', 'Chi'], 0, 'Thiếu chứng từ chặn duyệt', 3, ['H'], 1, {
      handle: 'work.expense.claim',
      goal: 'Hoàn tiền nhanh khi giấy tờ đúng, và nói chính xác thiếu gì khi không đúng.',
      fields: [['claim_id', 'UUID'], ['amount', 'MONEY'], ['receipt', 'FILE'], ['paid_at', 'DATE']],
      rules: ['Thiếu chứng từ chặn duyệt, không chặn cả đề nghị.', 'Vượt định mức thì phần chênh cần lý do.'],
      agent: ['Receipt Agent', 'Đọc chứng từ, khớp với đề nghị và báo lệch trước khi duyệt.'],
    }),
  s('Mua sắm nhà cung cấp', 'Mua hàng', 'work', 'Nhu cầu mua', 'PO đã phát hành',
    ['Yêu cầu', 'So giá', 'Duyệt', 'Đặt'], 0, 'Trên 50 triệu cần 3 báo giá', 3, ['F', 'P'], 1),
  s('Đóng sổ tháng', 'Tài chính', 'work', 'Kỳ kế toán', 'Báo cáo đã chốt',
    ['Đối chiếu', 'Điều chỉnh', 'Chốt'], 1, 'Chênh lệch chưa giải trình không được chốt', 5, ['H', 'K'], 2),
  s('Họp tuần phòng ban', 'Công việc', 'work', 'Lịch họp', 'Biên bản và việc giao',
    ['Chuẩn bị', 'Họp', 'Ghi nhận'], 0, 'Việc chưa có người nhận không được đóng', 1, ['M'], 1),
  s('Xử lý khiếu nại', 'Khách hàng', 'work', 'Khiếu nại', 'Kết luận có hồ sơ',
    ['Tiếp nhận', 'Xác minh', 'Xử lý', 'Đóng'], 0, 'Khiếu nại về tiền phản hồi trong 24h', 3, ['C', 'H'], 1),
  s('Quản lý tài sản', 'Hành chính', 'work', 'Tài sản mới', 'Tài sản có chủ',
    ['Nhập', 'Gắn nhãn', 'Bàn giao'], 1, 'Không kiểm kê 12 tháng bị đánh dấu', 2, ['F'], 1),
  s('Đặt phòng họp', 'Hành chính', 'work', 'Yêu cầu phòng', 'Phòng đã đặt',
    ['Chọn', 'Xác nhận'], 0, 'Không check-in sau 15 phút tự huỷ', 1, ['F'], 1),
  s('Công tác phí', 'Chi phí', 'work', 'Kế hoạch công tác', 'Đã quyết toán',
    ['Đề xuất', 'Duyệt', 'Tạm ứng', 'Quyết toán'], 0, 'Quyết toán trễ 7 ngày sau chuyến đi bị nhắc', 2, ['H'], 1),
  s('Kiểm soát chất lượng', 'Vận hành', 'work', 'Lô sản phẩm', 'Lô đạt chuẩn',
    ['Lấy mẫu', 'Kiểm tra', 'Kết luận'], 0, 'Lỗi trên 2% giữ cả lô', 3, ['Q'], 2),
  s('Báo cáo tuần', 'Công việc', 'work', 'Số liệu tuần', 'Báo cáo đã gửi',
    ['Tổng hợp', 'Soạn', 'Gửi'], 0, 'Số liệu thiếu nguồn không đưa vào', 1, ['M'], 2),

  /* ── People ── */
  s('Nghỉ phép năm', 'Nghỉ phép', 'people', 'Đơn xin nghỉ', 'Ngày nghỉ đã duyệt',
    ['Đề nghị', 'Duyệt'], 1, 'Báo trước dưới 3 ngày cần ngoại lệ', 4, ['F'], 1, {
      handle: 'people.leave.annual',
      goal: 'Duyệt nghỉ phép theo số ngày còn thật và độ phủ nhân sự thật, không phải theo phỏng đoán.',
      fields: [['leave_id', 'UUID'], ['from_date', 'DATE'], ['to_date', 'DATE'], ['days', 'NUM']],
      rules: ['Báo trước dưới 3 ngày làm việc cần ngoại lệ.', 'Hai người cùng team nghỉ cùng ngày sẽ cảnh báo quản lý.'],
      agent: ['Leave Agent', 'Kiểm tra số ngày còn, quy tắc báo trước và ai cũng nghỉ tuần đó trước khi tới quản lý.'],
    }),
  s('Chấm công ca', 'Chấm công', 'people', 'Check-in', 'Giờ công tính lương',
    ['Check-in', 'Check-out', 'Chốt'], 0, 'Quên check-out đánh dấu để sửa', 5, ['K'], 2, {
      handle: 'people.timesheet.shift',
      goal: 'Tạo ra giờ công tính lương mà không ai phải đối chiếu bằng tay vào cuối tháng.',
      fields: [['entry_id', 'UUID'], ['employee_id', 'UUID'], ['hours', 'NUM'], ['corrected', 'BOOL']],
      rules: ['Quên check-out thì đánh dấu để sửa, không đoán.', 'Tăng ca vượt trần cần duyệt trước.'],
      agent: ['Attendance Agent', 'Đánh dấu ca thiếu check-out và đề xuất sửa theo mẫu ca.'],
    }),
  s('Lương tháng', 'Lương', 'people', 'Giờ công', 'Phiếu lương đã trả',
    ['Thu thập', 'Tính', 'Rà soát', 'Trả'], 0, 'Chênh lệch trên 5% giữ cả đợt', 8, ['H', 'K'], 1, {
      handle: 'people.payroll.monthly',
      goal: 'Chạy lương từ giờ công và nghỉ phép đã đúng sẵn, và dừng đợt lương khi có gì đó bất thường.',
      fields: [['run_id', 'UUID'], ['period', 'TEXT'], ['gross', 'MONEY'], ['net', 'MONEY']],
      rules: ['Chênh lệch trên 5% giữ cả đợt để rà soát.', 'Không chạy lương khi kỳ chấm công còn mở.'],
      agent: ['Payroll Agent', 'So đợt lương với tháng trước từng dòng và liệt kê mọi chênh lệch trên 5%.'],
    }),
  s('Tuyển kỹ sư', 'Tuyển dụng', 'people', 'Yêu cầu tuyển', 'Offer đã ký',
    ['Sàng lọc', 'Phỏng vấn', 'Offer'], 4, 'Hai lần từ chối đóng yêu cầu tuyển', 2, ['T', 'M'], 1, {
      handle: 'people.hiring.engineering',
      goal: 'Lấp vị trí bằng một quy trình mà mọi ứng viên đều đi qua như nhau.',
      fields: [['req_id', 'UUID'], ['candidate_id', 'UUID'], ['stage', 'ENUM'], ['offered', 'BOOL']],
      rules: ['Hai lần từ chối ở vòng offer thì đóng yêu cầu tuyển.', 'Mỗi vòng phỏng vấn cần scorecard trước khi mở vòng sau.'],
      agent: ['Screening Agent', 'Tóm tắt từng hồ sơ theo scorecard — không bao giờ tự loại ai.'],
    }),
  s('Onboarding nhân viên', 'Nhân sự', 'people', 'Offer đã ký', 'Sẵn sàng ngày đầu',
    ['Hồ sơ', 'Tài khoản', 'Thiết bị', 'Đào tạo'], 0, 'Chưa có tài khoản trước ngày 1 báo IT', 3, ['T', 'E'], 2),
  s('Đánh giá hiệu suất', 'Nhân sự', 'people', 'Kỳ đánh giá', 'Kết quả đã chốt',
    ['Tự đánh giá', 'Quản lý', 'Hiệu chỉnh', 'Chốt'], 0, 'Xếp loại cao nhất cần ví dụ cụ thể', 2, ['M', 'T'], 1),
  s('Đào tạo nội bộ', 'Đào tạo', 'people', 'Nhu cầu đào tạo', 'Chứng nhận hoàn thành',
    ['Đăng ký', 'Học', 'Kiểm tra'], 0, 'Không đạt bài kiểm tra thì học lại', 1, ['T'], 1),
  s('Nghỉ việc', 'Nhân sự', 'people', 'Đơn nghỉ việc', 'Đã bàn giao và thu hồi',
    ['Tiếp nhận', 'Bàn giao', 'Thu hồi', 'Quyết toán'], 0, 'Ngày cuối thu hồi mọi quyền truy cập', 3, ['T', 'E'], 1),
  s('Tăng ca', 'Chấm công', 'people', 'Đề nghị tăng ca', 'Giờ tăng ca đã duyệt',
    ['Đề nghị', 'Duyệt', 'Xác nhận'], 0, 'Trên 40 giờ/tháng cần Giám đốc', 2, ['K'], 1),

  /* ── IT ── */
  s('Sự cố bảo mật', 'Helpdesk', 'it', 'Báo cáo từ bất kỳ ai', 'Sự cố đã xử lý',
    ['Phân loại', 'Điều tra', 'Khoanh vùng', 'Đóng'], 0, 'Phishing tới IT Security trong 15 phút', 5, ['E'], 2, {
      handle: 'it.helpdesk.security',
      goal: 'Đưa một thứ đáng ngờ tới IT Security trong vài phút, từ bất kỳ ai, không cần biết quy trình.',
      fields: [['incident_id', 'UUID'], ['type', 'ENUM'], ['severity', 'ENUM'], ['resolved', 'BOOL']],
      rules: ['Phishing tới IT Security trong 15 phút.', 'Không đóng báo cáo khi chưa nêu nguyên nhân.'],
      agent: ['Triage Agent', 'Đối chiếu báo cáo với các chiến dịch đã biết và soạn sự cố kèm mức độ nghiêm trọng.'],
    }),
  s('Đăng nhập & thiết bị', 'Truy cập', 'it', 'Yêu cầu truy cập', 'Quyền đã cấp',
    ['Kiểm tra', 'Cấp', 'Rà soát'], 1, 'Thiết bị mới cần chủ xác nhận', 8, ['E'], 1, {
      handle: 'it.access.signin',
      goal: 'Cấp đúng quyền người ta cần và thu lại đúng ngày họ không cần nữa.',
      fields: [['session_id', 'UUID'], ['user_id', 'UUID'], ['device', 'TEXT'], ['scope', 'ENUM']],
      rules: ['Thiết bị mới cần chủ xác nhận trước khi được tin cậy.', 'Quyền ngoài vai trò cần chủ dữ liệu, không phải IT.'],
      agent: ['Access Agent', 'Rà soát quyền thường trực hàng quý và đề xuất những gì nên thu hồi.'],
    }),
  s('Helpdesk IT', 'Helpdesk', 'it', 'Ticket nhân viên', 'Ticket đã giải quyết',
    ['Tiếp nhận', 'Xử lý', 'Đóng'], 0, 'Ưu tiên cao phản hồi trong 1 giờ', 2, ['E'], 2),
  s('Cấp phát máy tính', 'Thiết bị', 'it', 'Yêu cầu máy', 'Máy đã bàn giao',
    ['Duyệt', 'Chuẩn bị', 'Bàn giao'], 0, 'Máy trên 3 năm được thay', 1, ['E', 'F'], 1),
  s('Thay đổi hệ thống', 'Vận hành IT', 'it', 'Yêu cầu thay đổi', 'Thay đổi đã triển khai',
    ['Đề xuất', 'Rà soát', 'Triển khai', 'Xác minh'], 0, 'Thay đổi production cần kế hoạch rollback', 3, ['E'], 1),
  s('Sao lưu dữ liệu', 'Vận hành IT', 'it', 'Lịch sao lưu', 'Bản sao đã kiểm chứng',
    ['Chạy', 'Kiểm chứng', 'Lưu'], 0, 'Bản sao lỗi báo ngay trong 30 phút', 2, ['E'], 2),
  s('Cấp phép phần mềm', 'Truy cập', 'it', 'Yêu cầu license', 'License đã gán',
    ['Yêu cầu', 'Duyệt', 'Gán'], 0, 'Không dùng 60 ngày thì thu hồi', 1, ['E'], 1),
]

/* One colour per family — the reference's light palette, kept as-is since the
   cards are white product surfaces on the navy stage. */
export const TINT: Record<Family, string> = { sales: '#6435D4', mkt: '#BB2079', work: '#0A6E80', people: '#99610A', it: '#1F6F4A' }
export const TINT_BG: Record<Family, string> = { sales: '#F5F1FE', mkt: '#FDEEF6', work: '#E9F5F8', people: '#FDF4E5', it: '#E9F5EF' }
