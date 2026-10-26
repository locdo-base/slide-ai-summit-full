import { motion } from 'motion/react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'

/* What SOA did to the industry: the standard of every big system, the
   backbone of the companies everyone knows. The click turns it toward us:
   the headline crossfades to the architecture we need — for both software
   and business operation — and the two cards land. */
const BACKBONE = ['Amazon', 'AWS', 'Google', 'Microsoft', '…và tất cả']

export function SoaIndustrySlide() {
  const step = useStep()
  return (
    <SlideFrame
      layout="stack"
      headline={
        <span className="head-swap">
          <motion.span initial={false} animate={{ opacity: step >= 1 ? 0 : 1 }} transition={{ duration: 0.45 }}>SOA: Tiêu chuẩn của ngành cho các hệ thống quy mô lớn.</motion.span>
          <motion.span initial={false} animate={{ opacity: step >= 1 ? 1 : 0 }} transition={{ duration: 0.6, delay: step >= 1 ? 0.2 : 0 }}>SOA: Lời giải cho kiến trúc mới của phần mềm và vận hành doanh nghiệp.</motion.span>
        </span>
      }
    >
      <div className="industry">
        <div className={`backbone${step >= 1 ? ' back' : ''}`}>
          {BACKBONE.map((b, i) => (
            <Reveal key={b} at={0} delay={0.2 + i * 0.1} from="none"><span className={`wordmark${b.startsWith('…') ? ' rest' : ''}`}>{b}</span></Reveal>
          ))}
        </div>
        <div className="both">
          <Reveal at={1}><div className="both-card"><span className="stop-n">CHO</span><b>Kiến trúc phần mềm</b><p>Service, interface, engine.</p></div></Reveal>
          <Reveal at={1} delay={0.15} from="none"><div className="both-and">và</div></Reveal>
          <Reveal at={1} delay={0.2}><div className="both-card"><span className="stop-n">CHO</span><b>Vận hành doanh nghiệp</b><p>Con người, phòng ban — và agent.</p></div></Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
