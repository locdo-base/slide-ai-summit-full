import { ScreenSlide } from '../../../ui/ScreenSlide'

/* Assistants — the personal agent. The chat page from the Tasks walk (Grace
   turning one message into tasks) stands as the screen; two cues under the
   lead carry the two points. No click. */
export function AssistantSlide() {
  return (
    <ScreenSlide
      chapter="anatomy"
      headline="Assistants — Trợ lý AI cá nhân."
      lead="Thuộc về mỗi người dùng. Làm mọi việc chủ sở hữu giao."
      aside={
        <ul className="cues">
          <li>Tiếp cận tất cả dữ liệu và tools của user.</li>
          <li>Lưu trữ bộ nhớ dài hạn về user.</li>
        </ul>
      }
      screens={[{ mock: 'assistant-chat' }]}
    />
  )
}
