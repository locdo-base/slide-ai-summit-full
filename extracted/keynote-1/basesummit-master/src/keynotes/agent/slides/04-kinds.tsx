import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { AssistantGlyph, CopilotGlyph, WorkflowGlyph, DesktopGlyph, ExpertGlyph } from '../../../fx/KindGlyphs'

export const KINDS = [
  {
    name: 'Assistants', kick: 'agent cá nhân', Glyph: AssistantGlyph,
    line: 'Hỗ trợ mọi việc chủ sở hữu giao — linh hoạt, và chỉ cho riêng họ.',
    owner: 'mỗi người dùng', memory: 'cá nhân — về chủ sở hữu', used: 'cá nhân',
  },
  {
    name: 'Copilots', kick: 'agent của service', Glyph: CopilotGlyph,
    line: 'Giúp bất kỳ ai dùng service và hoàn thành công việc hiệu quả.',
    owner: 'service', memory: 'cá nhân — về từng người dùng', used: 'bất kỳ ai',
  },
  {
    name: 'Workflow agents', kick: 'agent hệ thống', Glyph: WorkflowGlyph,
    line: 'Chuyên biệt theo nghiệp vụ. Chạy một chức năng theo quy trình chuẩn hóa — một tiện ích với input và output cố định.',
    owner: 'hệ thống', memory: 'không — input / output cố định', used: 'bất kỳ ai',
  },
  {
    name: 'Desktop agents', kick: 'cá nhân, chạy trên máy bạn', Glyph: DesktopGlyph,
    line: 'Agent cá nhân đặc biệt chạy trên desktop: context phong phú hơn hẳn — chạy ứng dụng, mở trình duyệt, ghi hình trực tiếp.',
    owner: 'mỗi người dùng', memory: 'cá nhân — lưu trên máy', used: 'cá nhân',
  },
  {
    name: 'Expert agents', kick: 'agent của nền tảng', Glyph: ExpertGlyph,
    line: 'Dùng chung trên nền tảng — chuyên gia pháp lý, thuế. Không do bạn xây: được thuê vào workspace khi cần.',
    owner: 'nền tảng', memory: 'kiến thức chuyên môn — dùng chung', used: 'khi được thuê',
  },
]

/* The five kinds, one column each across the full width, arriving one after
   another on their own — no click. One grid: every column shares the same rows — glyph, name, line,
   facts — so the facts line up across the five whatever the line's length. */
export function KindsSlide() {
  return (
    <SlideFrame chapter="anatomy" layout="stack" headline="Năm loại agent trong Base.vn." figureClass="wide">
      <div className="kinds four five">
        {KINDS.map((k, i) => (
          <Reveal key={k.name} at={0} delay={0.3 + i * 0.55} className="kind">
            <div className="glyph"><k.Glyph /></div>
            <div className="name"><h2 className="h2">{k.name}</h2><div className="kick">{k.kick}</div></div>
            <p>{k.line}</p>
            <dl className="facts">
              <dt>Sở hữu</dt><dd className="own">{k.owner}</dd>
              <dt>Bộ nhớ</dt><dd>{k.memory}</dd>
              <dt>Dùng</dt><dd>{k.used}</dd>
            </dl>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}

