import { motion, useReducedMotion } from 'motion/react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useBrand } from '../../../ui/Brand'
import { useStep } from '../../../engine/step'

/* The announcement, then the architecture behind it. On arrival the new
   brand stands alone in the centre, as on the launch deck: an eyebrow, the
   brand line, the name big across the stage, the hand-written line under it.
   The one click moves it to the left, smaller, and the right fills in: the
   new Base's architecture in three points, and one point raised — ten years
   of listening — which the next slide's ledger opens. */
const POINTS = [
  'Toàn diện, tối ưu cho từng luồng nghiệp vụ, và hướng đến con người.',
  'Không nghĩ đến tính năng phần mềm, nghĩ đến luồng nghiệp vụ (service) và cấu trúc input/output.',
  'AI Agents là lực lượng lao động mới và đặc biệt quan trọng.',
  'Đóng gói và chuẩn hóa tri thức trở thành việc phải làm.',
]
const POINT_AT = (i: number) => 0.9 + i * 0.25
const ease = [0.2, 0.8, 0.2, 1] as const

export function DemoIntroSlide() {
  const { wordmark } = useBrand()
  const reduce = useReducedMotion()
  const on = useStep() >= 1
  const move = { duration: reduce ? 0 : 0.8, ease }
  return (
    <SlideFrame layout="center">
      <div className={`brand2${on ? ' on' : ''}`}>
        <motion.div layout className="os-statement" transition={move}>
          <Reveal at={0}>
            <motion.div layout="position" className="os-eyebrow" transition={move}>
              Định vị thương hiệu mới
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 3.5 4.5 4.5L6 12.5" />
              </svg>
            </motion.div>
          </Reveal>
          <Reveal at={0} delay={0.15}>
            <motion.div layout="position" className="os-of" transition={move}>The new {wordmark}:</motion.div>
          </Reveal>
          <Reveal at={0} delay={0.4}>
            <motion.h1 layout="position" className="os-name" transition={move}>The Agentic Operating System</motion.h1>
          </Reveal>
          <Reveal at={0} delay={0.8}>
            <motion.div layout="position" className="brand2-runs" transition={move}>Running on AI operation services</motion.div>
          </Reveal>
        </motion.div>

        <div className="brand2-right">
          <Reveal at={1} delay={0.6}><h2 className="brand2-h">Kiến trúc Base mới</h2></Reveal>
          <ul className="newarch-points">
            {POINTS.map((p, i) => (
              <Reveal key={p} at={1} delay={POINT_AT(i)}><li>{p}</li></Reveal>
            ))}
          </ul>
          <Reveal at={1} delay={POINT_AT(POINTS.length) + 0.3} from="left" className="brand2-listen">
            <p className="newarch-point">10 năm <em>lắng nghe</em><br />và <em>thấu hiểu</em></p>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
