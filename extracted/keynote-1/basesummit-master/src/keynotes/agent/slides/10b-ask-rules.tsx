import { ScreenSlide } from '../../../ui/ScreenSlide'

/* The easiest way in: ask. Personal rules › Ask AI plays a short conversation
   on its own — people ask about leave, probation, working from home; the
   copilot answers from the rules they can see and names the rules it used.
   No click. */
export function AskRulesSlide() {
  return (
    <ScreenSlide
      chapter="rules"
      headline="Dễ dàng nhất để con người tiếp cận, tìm hiểu, khám phá."
      lead="Chỉ cần hỏi. Copilot trả lời từ các rules bạn được xem — và nêu rõ rule nó đã dùng."
      screens={[{ mock: 'ask-rules' }]}
    />
  )
}
