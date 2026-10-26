import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Particle } from './Particle'
import { useStep } from '../engine/step'

interface Stage { name: string; gloss: string }

const STAGES: Stage[] = [
  { name: 'Soạn thảo', gloss: 'bản nháp, phiên bản, tệp' },
  { name: 'Phê duyệt', gloss: 'duyệt trước khi áp dụng' },
  { name: 'Ban hành', gloss: 'kênh, thông báo' },
  { name: 'Xác nhận & đánh giá', gloss: 'xác nhận đã đọc, kiểm tra kiến thức' },
  { name: 'Tra cứu', gloss: 'tìm theo ngữ nghĩa, hỏi' },
]

interface Props {
  width?: number; height?: number; id?: string
  /** The step the first stage lights on (default 1) — unless `auto` is set. */
  firstAt?: number
  /** Run on its own: the first stage lights `start` seconds in, the next each
   *  `every` seconds after. No clicks. */
  auto?: { start: number; every: number }
}

const ease = [0.2, 0.8, 0.2, 1] as const

/** The policy lifecycle as a ring: five stages, one per click or on a timer,
 *  with rules running round the loop once it is complete — and the people it
 *  is built for at the centre. 880 × 680. */
export function RuleLifecycle({ width = 880, height = 680, id = 'lc', firstAt = 1, auto }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const [lit, setLit] = useState(0)
  useEffect(() => {
    if (!auto) return
    if (reduce) { setLit(STAGES.length); return }
    if (lit >= STAGES.length) return
    const t = setTimeout(() => setLit(lit + 1), (lit === 0 ? auto.start : auto.every) * 1000)
    return () => clearTimeout(t)
  }, [auto, lit, reduce])
  const cx = 440, cy = 340, r = 230
  const pid = `${id}-ring`
  const ringD = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`
  const shown = auto ? lit : Math.max(0, Math.min(STAGES.length, step - firstAt + 1))
  const complete = shown >= STAGES.length
  const n = STAGES.length

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <circle cx={cx} cy={cy} r={r + 60} fill="url(#halo-blue)" />
      <path id={pid} d={ringD} fill="none" stroke="var(--line)" strokeWidth={1.2} />
      {/* the arc lit as far as the talk has come */}
      <motion.path d={ringD} fill="none" stroke="var(--blue-300)" strokeWidth={1.8}
        initial={false} animate={{ pathLength: shown / n, opacity: shown ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: 'easeInOut' }} />
      {complete && [0, 1, 2].map(i => (
        <Particle key={i} path={pid} dur={9} begin={-i * 3} r={9} tone={i === 1 ? 'cyan' : 'blue'} />
      ))}

      {STAGES.map((s, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r
        const on = i < shown
        const lx = cx + Math.cos(a) * (r + 104), ly = cy + Math.sin(a) * (r + 104)
        const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end'
        const two = s.name.includes(' & ')
        return (
          <motion.g key={s.name} initial={false} animate={{ opacity: on ? 1 : 0.18 }}
            transition={{ duration: reduce ? 0 : 0.55, ease }}>
            {/* The node grows into place by its radius — scaling an SVG group
                pivots around the wrong origin mid-tween and stutters. */}
            <motion.circle cx={x} cy={y} fill="var(--navy-800)" stroke={on ? 'var(--blue-300)' : 'var(--line)'} strokeWidth={1.6}
              initial={false} animate={{ r: on ? 54 : 46 }} transition={{ duration: reduce ? 0 : 0.55, ease }} />
            <text x={x} y={y - 12} textAnchor="middle" fontSize={15} className="dim">{`0${i + 1}`}</text>
            {two
              ? <><text x={x} y={y + 8} textAnchor="middle" fontSize={19}>{s.name.split(' & ')[0]}</text><text x={x} y={y + 30} textAnchor="middle" fontSize={19}>{'& ' + s.name.split(' & ')[1]}</text></>
              : <text x={x} y={y + 14} textAnchor="middle" fontSize={19}>{s.name}</text>}
            <text x={lx} y={ly + (Math.sin(a) > 0.3 ? 16 : Math.sin(a) < -0.3 ? -6 : 6)} textAnchor={anchor} fontSize={19} className="muted">{s.gloss}</text>
          </motion.g>
        )
      })}

      {/* at the centre: who it is built for */}
      <motion.g initial={false} animate={{ opacity: shown ? 1 : 0.5 }} transition={{ duration: 0.6 }}>
        <text x={cx} y={cy - 26} textAnchor="middle" fontSize={30} className="sd">{'Work rules'}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={19} className="muted">{'xây cho con người trước'}</text>
        <motion.text x={cx} y={cy + 38} textAnchor="middle" fontSize={19} className="tone-agent" initial={false}
          animate={{ opacity: complete ? 1 : 0 }} transition={{ delay: complete ? 0.6 : 0 }}>{'rồi đến agent đọc'}</motion.text>
      </motion.g>
    </svg>
  )
}
