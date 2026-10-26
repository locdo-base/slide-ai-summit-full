import { SlideFrame } from '../../../ui/SlideFrame'

const HEAD = [
  ['Assistants', 'agent cá nhân'],
  ['Copilots', 'agent của service'],
  ['Workflow agents', 'agent hệ thống'],
  ['Desktop agents', 'cá nhân, trên desktop'],
  ['Expert agents', 'agent của nền tảng'],
]

interface Row { k: string; v: string[]; own?: boolean }

/* Five values a row — one per column, Desktop agents included. */
const ROWS: Row[] = [
  { k: 'Sở hữu', own: true, v: ['Mỗi người dùng', 'Service', 'Hệ thống', 'Mỗi người dùng — trên máy của họ', 'Nền tảng — bạn thuê về'] },
  { k: 'Mục tiêu', v: ['Hỗ trợ mọi việc chủ sở hữu giao, linh hoạt', 'Giúp người dùng dùng service và hoàn thành việc hiệu quả', 'Chạy một chức năng theo quy trình chuẩn hóa', 'Làm việc ngay trên máy bạn — ứng dụng, trình duyệt, màn hình', 'Mang chuyên môn sâu — pháp lý, thuế, tài chính — khi cần'] },
  { k: 'Bộ nhớ', v: ['Cá nhân — về chủ sở hữu', 'Cá nhân — về từng người dùng service', 'Không — input / output cố định', 'Cá nhân — lưu trên máy', 'Kiến thức chuyên môn — dùng chung, không cá nhân'] },
  { k: 'Ai dùng', v: ['Chỉ chủ sở hữu', 'Bất kỳ người dùng nào của service', 'Bất kỳ ai, từ bất kỳ service nào', 'Chỉ chủ sở hữu', 'Bất kỳ workspace nào thuê nó'] },
  { k: 'Context', v: ['Mọi thứ trong phạm vi của chủ sở hữu', 'Một service — object, rules, tools của nó', 'Đúng input được giao — không gì khác', 'Máy của bạn — ứng dụng, tệp, màn hình', 'Vụ việc được giao, cộng lĩnh vực của nó'] },
  { k: 'Trong Base.vn', v: ['Grace — chief of staff', 'Deal copilot trong Sales pipeline', 'Kiểm tra rule trong luồng request', 'Amber trên desktop', 'Chuyên gia pháp lý rà soát hợp đồng'] },
]

/* The five kinds side by side — one row per dimension, all at once. No click. */
export function CompareSlide() {
  return (
    <SlideFrame
      chapter="anatomy"
      layout="stack"
      headline="Năm loại agent, đặt cạnh nhau."
    >
      <table className="cmp five">
        <thead>
          <tr>
            <th />
            {HEAD.map(([n, s]) => <th key={n}>{n}<small>{s}</small></th>)}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(r => (
            <tr key={r.k} className={r.own ? 'own' : undefined}>
              <td>{r.k}</td>
              {r.v.map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </SlideFrame>
  )
}
