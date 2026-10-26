import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'

const SERVICE = ['AGENTS.md', 'enrich(deal)', 'project(deal)', 'createTask(…)', 'duyệt báo giá', 'rules giai đoạn']
const AGENT = ['AGENTS.md', 'tìm kiếm web', 'gửi email', 'tóm tắt', 'lịch', 'bộ nhớ']
const SHARED = ['bình luận', 'đọc deal']

const MONO = 'ui-monospace, SFMono-Regular, Consolas, monospace'
const ease = [0.2, 0.8, 0.2, 1] as const

function Chip({ x, y, label, tone, w = 190 }: { x: number; y: number; label: string; tone: string; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 19} width={w} height={38} rx={8} fill="var(--navy-900)" stroke={tone} strokeOpacity={0.6} />
      <circle cx={x - w / 2 + 18} cy={y} r={4} fill={tone} />
      <text x={x - w / 2 + 32} y={y + 6} fontSize={18} style={{ fontFamily: MONO }}>{label}</text>
    </g>
  )
}

interface Props { unionAt?: number; width?: number; height?: number }

/** Two sets — what the service defines, what the agent brings — overlapping;
 *  on cue the union is drawn round both in the human colour, with the formula
 *  beneath. 880 × 660. */
export function UnionSets({ unionAt = 1, width = 880, height = 660 }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const union = step >= unionAt
  const r = 218, cy = 300
  const c1 = 300, c2 = 580
  const half = (c2 - c1) / 2
  const h = Math.sqrt(r * r - half * half)
  const mx = (c1 + c2) / 2
  // the outer boundary of both circles: over the left one, back over the right
  const hull = `M ${mx} ${cy - h} A ${r} ${r} 0 1 0 ${mx} ${cy + h} A ${r} ${r} 0 1 0 ${mx} ${cy - h} Z`
  const B = 'var(--blue-300)', C = 'var(--cyan-300)', A = 'var(--amber-300)'

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <circle cx={c1} cy={cy} r={r} fill="var(--blue-500)" fillOpacity={0.08} stroke={B} strokeWidth={1.6} />
      <circle cx={c2} cy={cy} r={r} fill="var(--cyan-300)" fillOpacity={0.06} stroke={C} strokeWidth={1.6} />
      <text x={c1 - 60} y={cy - r - 48} textAnchor="middle" fontSize={23} className="tone-blue">{'Service · Sales pipeline'}</text>
      <text x={c2 + 60} y={cy - r - 48} textAnchor="middle" fontSize={23} className="tone-agent">{'Agent · Grace'}</text>
      <text x={c1 - 60} y={cy - r - 20} textAnchor="middle" fontSize={17} className="dim">{'AGENTS.md, tools & rules do service định nghĩa'}</text>
      <text x={c2 + 60} y={cy - r - 20} textAnchor="middle" fontSize={17} className="dim">{'AGENTS.md, tools & rules agent mang theo'}</text>

      {/* six each, 54 apart, so the top and bottom chips stay inside the circle */}
      {SERVICE.map((s, i) => <Chip key={s} x={c1 - 74} y={cy - 135 + i * 54} label={s} tone={B} />)}
      {AGENT.map((s, i) => <Chip key={s} x={c2 + 74} y={cy - 135 + i * 54} label={s} tone={C} />)}
      {SHARED.map((s, i) => <Chip key={s} x={mx} y={cy - 30 + i * 60} label={s} tone="var(--blue-100)" w={140} />)}

      <motion.path d={hull} fill="none" stroke={A} strokeWidth={2.4} strokeDasharray="14 10"
        initial={false} animate={{ pathLength: union ? 1 : 0, opacity: union ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 1.4, ease: 'easeInOut' }} />
      <motion.text x={mx} y={cy + r + 52} textAnchor="middle" fontSize={24} className="tone-human" initial={false}
        animate={{ opacity: union ? 1 : 0 }} transition={{ delay: union ? 0.9 : 0 }}>{'UNION — tất cả những gì cả hai biết làm'}</motion.text>

      <motion.g initial={false} animate={{ opacity: union ? 1 : 0, y: union ? 0 : 10 }} transition={{ duration: reduce ? 0 : 0.6, delay: union ? 1.1 : 0, ease }}>
        <rect x={40} y={cy + r + 78} width={width - 80} height={90} rx={12} fill="var(--navy-800)" stroke="var(--line)" />
        <text x={70} y={cy + r + 114} fontSize={22} style={{ fontFamily: MONO }}>
          <tspan className="dim">tools  = </tspan><tspan className="tone-blue">service.tools</tspan><tspan className="tone-human">  ∪  </tspan><tspan className="tone-agent">agent.tools</tspan>
        </text>
        <text x={70} y={cy + r + 150} fontSize={22} style={{ fontFamily: MONO }}>
          <tspan className="dim">rules  = </tspan><tspan className="tone-blue">service.rules</tspan><tspan className="tone-human">  ∪  </tspan><tspan className="tone-agent">agent.rules</tspan>
        </text>
      </motion.g>
    </svg>
  )
}
