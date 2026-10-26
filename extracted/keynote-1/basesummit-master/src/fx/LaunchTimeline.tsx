import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { Particle } from './Particle'

/* The launch calendar: one axis, September 2026 to September 2027, so every
 * date — launch, the platforms, the release waves — lands in the same place. */
const W = 1640
const AX0 = 260, AX1 = 1600
const MONTHS = 12
const px = (m: number) => AX0 + ((AX1 - AX0) * m) / MONTHS
const TICKS: { m: number; label: string }[] = [
  { m: 1, label: 'T10/2026' },
  { m: 4, label: 'T1/2027' },
  { m: 7, label: 'T4/2027' },
  { m: 10, label: 'T7/2027' },
]
const LAUNCH_DATE: string = '1/10/2026'
const JAN_DATE: string = 'T1/2027'
const LAUNCH = 1, JAN = 4, APR = 7
const ease = [0.2, 0.8, 0.2, 1] as const

function Axis({ y }: { y: number }) {  return (
    <g>
      <line x1={AX0 - 40} x2={AX1 + 30} y1={y} y2={y} stroke="var(--line-strong)" strokeWidth={1.2} />
      <path d={`M ${AX1 + 42} ${y} l -12 -7 v 14 z`} fill="var(--line-strong)" />
      {TICKS.map(tick => (
        <g key={tick.m}>
          <line x1={px(tick.m)} x2={px(tick.m)} y1={y - 7} y2={y + 7} stroke="var(--line-strong)" strokeWidth={1.2} />
          <text x={px(tick.m)} y={y + 36} textAnchor="middle" fontSize={20} className="muted">{tick.label}</text>
        </g>
      ))}
    </g>
  )
}

interface MarkerProps {
  m: number
  y0: number
  y1: number
  label: string
  sub?: string
  on: boolean
  /** The sub line can arrive later than the marker itself. */
  subOn?: boolean
  delay?: number
}

/** A dated vertical marker with its label above. */
function Marker({ m, y0, y1, label, sub, on, subOn, delay = 0 }: MarkerProps) {
  const reduce = useReducedMotion()
  const x = px(m)
  const showSub = subOn ?? on
  return (
    <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5, delay: on ? delay : 0 }}>
      <motion.line x1={x} x2={x} y1={y0} y2={y1} stroke="var(--blue-300)" strokeWidth={1.4} strokeDasharray="5 7"
        initial={false} animate={{ pathLength: on ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, delay: on ? delay : 0, ease: 'easeInOut' }} />
      <text x={x} y={y0 - 36} textAnchor="middle" fontSize={26} className="sd">{label}</text>
      {sub && (
        <motion.text x={x} y={y0 - 8} textAnchor="middle" fontSize={18} className="muted"
          initial={false} animate={{ opacity: showSub ? 1 : 0 }} transition={{ duration: 0.5, delay: showSub ? 0.3 : 0 }}>
          {sub}
        </motion.text>
      )}
    </motion.g>
  )
}

/* ── Timeline: launch, side by side, then Classic closes to new customers —
   and, on a lane above the platforms, what ships in each of the two release
   waves (folded in from the former releases slide, 2026-09-23) ── */
const H = 560
const REL_Y = 136, CHIP_H = 38, CHIP_GAP = 8
const AG_Y = 250, CL_Y = 360, BAR_H = 56, AXIS_Y = 490

type Tone = 'blue' | 'cyan' | 'amber'
const STROKE: Record<Tone, string> = { blue: 'var(--line-strong)', cyan: 'var(--cyan-300)', amber: 'var(--amber-300)' }
/** The two release waves: each arrives with the step that opens its span. */
const WAVES: { m0: number; m1: number; items: { name: string; tone: Tone }[]; at: number }[] = [
  { m0: LAUNCH, m1: JAN, at: 1, items: [{ name: 'Kiến trúc service', tone: 'blue' }, { name: 'AI Copilots', tone: 'cyan' }] },
  { m0: JAN, m1: APR, at: 2, items: [{ name: 'AI Studio', tone: 'cyan' }, { name: 'Amber desktop', tone: 'amber' }] },
]

export function LaunchTimeline() {
  const step = useStep()
  const reduce = useReducedMotion()
  const both = step >= 1
  const closed = step >= 2
  const agX = px(LAUNCH), agW = AX1 - agX
  const janX = px(JAN)
  const mid = (y: number) => y + BAR_H / 2
  const gapY = AG_Y + BAR_H + 20   // the bracket line between the two lanes; captions sit under it
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <Axis y={AXIS_Y} />
      <Marker m={LAUNCH} y0={106} y1={AXIS_Y + 8} label={LAUNCH_DATE}
        sub="Chính thức ra mắt" on delay={0.2} />
      <Marker m={JAN} y0={106} y1={AXIS_Y + 8} label={JAN_DATE}
        sub="Classic ngừng nhận khách hàng mới" on={both} subOn={closed} delay={0.1} />

      {/* The product lane: what ships in each wave, on the span it ships in */}
      <motion.text x={0} y={REL_Y + CHIP_H + CHIP_GAP / 2 + 10} fontSize={28} className="sd"
        initial={false} animate={{ opacity: both ? 1 : 0 }} transition={{ duration: 0.5, delay: both ? 0.35 : 0 }}>
        Sản phẩm
      </motion.text>
      {WAVES.map((w, i) => {
        const on = step >= w.at
        const x0 = px(w.m0) + 10, x1 = px(w.m1) - 10
        return (
          <motion.g key={i} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: on ? 0.35 : 0, ease }}>
            <text x={x0} y={REL_Y - 10} fontSize={17} className="muted">{`Đợt ${i + 1}`}</text>
            {w.items.map((it, j) => {
              const y = REL_Y + j * (CHIP_H + CHIP_GAP)
              return (
                <g key={j}>
                  <rect x={x0} y={y} width={x1 - x0} height={CHIP_H} rx={8} fill="var(--navy-800)"
                    stroke={STROKE[it.tone]} strokeWidth={it.tone === 'blue' ? 1 : 1.5} />
                  <text x={x0 + 14} y={y + 26} fontSize={20}>{it.name}</text>
                </g>
              )
            })}
          </motion.g>
        )
      })}

      <text x={0} y={mid(AG_Y) + 10} fontSize={28} className="sd">Agentic OS</text>
      <text x={0} y={mid(CL_Y) + 10} fontSize={28} className="sd">Classic</text>

      {/* Classic is already running; from Jan 2027 it is open to existing customers only */}
      <rect x={AX0 - 40} y={CL_Y} width={janX - (AX0 - 40)} height={BAR_H} rx={10} fill="var(--navy-700)" stroke="var(--line-strong)" />
      <motion.rect x={janX} y={CL_Y} width={AX1 - janX} height={BAR_H} rx={10} stroke="var(--line-strong)" fill="var(--navy-700)"
        strokeDasharray={closed ? '6 8' : undefined}
        initial={false} animate={{ fillOpacity: closed ? 0 : 1 }} transition={{ duration: 0.6 }} />
      <motion.text x={(janX + AX1) / 2} y={mid(CL_Y) + 7} textAnchor="middle" fontSize={19} className="muted"
        initial={false} animate={{ opacity: closed ? 1 : 0 }} transition={{ duration: 0.5, delay: closed ? 0.3 : 0 }}>
        {'chỉ dành cho khách hàng hiện tại'}
      </motion.text>

      {/* The Agentic OS starts at launch and keeps going */}
      <motion.rect x={agX} y={AG_Y} height={BAR_H} rx={10} fill="var(--blue-500)" fillOpacity={0.85}
        initial={{ width: 0 }} animate={{ width: agW }} transition={{ duration: reduce ? 0 : 1.1, delay: 0.5, ease }} />
      <path id="lt-enrol" d={`M ${janX} ${mid(AG_Y)} H ${AX1 - 12}`} fill="none" stroke="none" />
      {closed && [0, 1, 2, 3].map(i => <Particle key={i} path="lt-enrol" dur={3.4} begin={-i * 0.85} tone="blue" r={8} />)}

      {/* Between the lanes: side by side until January, then new customers enrol on the new platform */}
      <motion.g initial={false} animate={{ opacity: both ? 1 : 0 }} transition={{ duration: 0.5, delay: both ? 0.3 : 0 }}>
        <line x1={agX} x2={janX} y1={gapY} y2={gapY} stroke="var(--line-strong)" strokeWidth={1.2} />
        <line x1={agX} x2={agX} y1={gapY - 6} y2={gapY + 6} stroke="var(--line-strong)" strokeWidth={1.2} />
        <line x1={janX} x2={janX} y1={gapY - 6} y2={gapY + 6} stroke="var(--line-strong)" strokeWidth={1.2} />
        <text x={(agX + janX) / 2} y={gapY + 22} textAnchor="middle" fontSize={18} className="muted">
          {'hai phiên bản chạy song song'}
        </text>
      </motion.g>
      <motion.text x={janX + 18} y={gapY + 22} fontSize={18} className="tone-blue"
        initial={false} animate={{ opacity: closed ? 1 : 0 }} transition={{ duration: 0.5, delay: closed ? 0.3 : 0 }}>
        {'khách hàng mới tự động bắt đầu tại đây'}
      </motion.text>
    </svg>
  )
}
