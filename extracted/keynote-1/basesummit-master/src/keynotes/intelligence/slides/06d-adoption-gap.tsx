import { motion, useReducedMotion } from 'motion/react'
import { SlideFrame } from '../../../ui/SlideFrame'

/* 4 of 6: capability runs away from adoption — individuals follow, the
   business lags. The three curves draw one after another on their own; once
   the business curve lands, the number that proves it fades in to the right. */
const CURVES = [
  { d: 'M120 694 C 700 690, 1240 620, 1400 110', y: 110, tone: '#5EE7FF', label: 'Năng lực mô hình LLM' },
  { d: 'M120 696 C 760 694, 1280 660, 1400 460', y: 460, tone: '#E06BFF', label: 'Cá nhân ứng dụng AI' },
  { d: 'M120 698 C 760 697, 1280 688, 1400 640', y: 640, tone: '#6BFFA8', label: 'Doanh nghiệp ứng dụng AI' },
]

export function AdoptionGapSlide() {
  const reduce = useReducedMotion()
  return (
    <SlideFrame layout="center">
      <div className="gap">
        <p className="ctx-kicker">Năng lực AI và khoảng cách ứng dụng</p>
        <div className="gap-row">
          <svg viewBox="0 0 1860 760" width={1110} height={453} style={{ overflow: 'visible' }}>
            <defs>
              <marker id="ctx-arr" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={9} markerHeight={9} orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" /></marker>
            </defs>
            <g stroke="var(--line)" strokeDasharray="2 8">
              {[180, 350, 520].map(y => <line key={y} x1={120} y1={y} x2={1500} y2={y} />)}
              {[580, 1040].map(x => <line key={x} x1={x} y1={80} x2={x} y2={700} />)}
            </g>
            <line x1={120} y1={700} x2={1520} y2={700} stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#ctx-arr)" />
            <line x1={120} y1={700} x2={120} y2={70} stroke="var(--muted)" strokeWidth={2.5} markerEnd="url(#ctx-arr)" />
            <text x={820} y={760} textAnchor="middle" fontSize={34} fill="var(--dim)">Thời gian</text>
            <text x={56} y={400} textAnchor="middle" fontSize={34} fill="var(--dim)" transform="rotate(-90 56 400)">Năng lực / Mức độ ứng dụng</text>
            {CURVES.map((c, i) => {
              const delay = reduce ? 0 : 0.7 * (i + 1)
              return (
                <g key={c.label}>
                  <motion.path d={c.d} fill="none" stroke={c.tone} strokeWidth={3.5}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: reduce ? 0 : 1.2, ease: 'easeIn' }} />
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + (reduce ? 0 : 1.1), duration: reduce ? 0 : 0.4 }}>
                    <circle cx={1400} cy={c.y} r={11} fill={c.tone} />
                    <text x={1436} y={c.y + 13} fontSize={38} fill={c.tone} style={{ fontFamily: 'var(--font-display)' }}>{c.label}</text>
                  </motion.g>
                </g>
              )
            })}
          </svg>
          <motion.div className="gap-stat" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 3.6, duration: reduce ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
            <b>95%</b>
            <p>AI copilot không tạo ra tác động kinh doanh thực sự</p>
            <small>Nguồn — Báo cáo MIT, 2025</small>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  )
}
