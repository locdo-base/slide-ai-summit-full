import { motion, useReducedMotion } from 'motion/react'

/* Three small scenes for "Existing customers": Classic stays for years, the
 * move is decided together, and upgrades are free until the end of Q2 2027.
 * Each is 480×220, like the ops scenes. */

const B = 'var(--blue-300)', A = 'var(--amber-300)', L = 'var(--line-strong)'
const ease = [0.2, 0.8, 0.2, 1] as const

function Person({ x, y, color, s = 1 }: { x: number; y: number; color: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-8} r={6.5} fill={color} />
      <path d="M -12 13 q 12 -18 24 0" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
    </g>
  )
}

/** Classic keeps running: a bar that runs off the edge, year after year. */
export function ClassicStaysScene() {
  const reduce = useReducedMotion()
  const years = ['2027', '2028', '2029', '2030']
  return (
    <svg width={480} height={220} viewBox="0 0 480 220" style={{ overflow: 'visible' }}>
      <motion.rect x={16} y={70} height={52} rx={10} fill="var(--navy-700)" stroke={L}
        initial={{ width: 0 }} animate={{ width: 414 }} transition={{ duration: reduce ? 0 : 1.4, delay: 0.2, ease }} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: reduce ? 0 : 1.4 }}>
        <line x1={432} x2={462} y1={96} y2={96} stroke={L} strokeWidth={1.4} strokeDasharray="4 6" />
        <path d="M 474 96 l -11 -6 v 12 z" fill={L} />
      </motion.g>
      <text x={34} y={104} fontSize={22} className="sd">Classic</text>
      {years.map((y, i) => {
        const x = 130 + i * 96
        return (
          <motion.g key={y} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: reduce ? 0 : 0.5 + i * 0.28 }}>
            <line x1={x} x2={x} y1={122} y2={136} stroke={L} strokeWidth={1.2} />
            <text x={x} y={162} textAnchor="middle" fontSize={18} className="muted">{y}</text>
          </motion.g>
        )
      })}
      <text x={452} y={162} textAnchor="middle" fontSize={22} className="dim">…</text>
    </svg>
  )
}

const ROWS: { name: string; verdict: 'keep' | 'let go' }[] = [
  { name: 'Quy trình', verdict: 'keep' },
  { name: 'Quy tắc phê duyệt', verdict: 'keep' },
  { name: 'Báo cáo cũ', verdict: 'let go' },
  { name: 'Dashboard cũ', verdict: 'let go' },
]

/** You and our team, deciding item by item what to keep and what to let go. */
export function TogetherScene() {
  const reduce = useReducedMotion()
  const x0 = 104, w = 272
  return (
    <svg width={480} height={220} viewBox="0 0 480 220" style={{ overflow: 'visible' }}>
      <Person x={46} y={104} color={A} s={1.2} />
      <text x={46} y={146} textAnchor="middle" fontSize={17} className="tone-human">{'Các bạn'}</text>
      <g>
        <Person x={422} y={106} color={B} s={0.95} />
        <Person x={446} y={106} color={B} s={0.95} />
        <text x={434} y={146} textAnchor="middle" fontSize={17} className="tone-blue">{'Đội ngũ'}</text>
      </g>
      <line x1={70} x2={x0 - 8} y1={110} y2={110} stroke={L} strokeWidth={1.2} />
      <line x1={x0 + w + 8} x2={398} y1={110} y2={110} stroke={L} strokeWidth={1.2} />
      {ROWS.map((r, i) => {
        const y = 26 + i * 46
        const keep = r.verdict === 'keep'
        return (
          <motion.g key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.2 + i * 0.22, ease }}>
            <rect x={x0} y={y} width={w} height={38} rx={8} fill="var(--navy-800)" stroke="var(--line)" />
            <text x={x0 + 14} y={y + 25} fontSize={18} className={keep ? undefined : 'muted'}>{r.name}</text>
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: reduce ? 0 : 0.6 + i * 0.22 }}>
              {keep ? (
                <path d={`M ${x0 + w - 94} ${y + 20} l 5 5 l 10 -11`} fill="none" stroke={B} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <line x1={x0 + w - 98} x2={x0 + w - 84} y1={y + 19} y2={y + 19} stroke="var(--dim)" strokeWidth={2.2} strokeLinecap="round" />
              )}
              <text x={x0 + w - 12} y={y + 25} textAnchor="end" fontSize={16} className={keep ? 'tone-blue' : 'dim'}>
                {keep ? 'giữ lại' : 'bỏ đi'}
              </text>
            </motion.g>
          </motion.g>
        )
      })}
    </svg>
  )
}

/** A meter from launch to the end of Q2 2027: free until then, paid after. */
export function FreeUntilScene() {
  const reduce = useReducedMotion()
  const x0 = 16, x1 = 464, y = 84, h = 44
  const cut = x0 + ((x1 - x0) * 9) / 12   // nine months after launch: the end of Q2 2027
  return (
    <svg width={480} height={220} viewBox="0 0 480 220" style={{ overflow: 'visible' }}>
      <rect x={x0} y={y} width={x1 - x0} height={h} rx={10} fill="none" stroke={L} strokeDasharray="6 8" />
      <motion.rect x={x0} y={y} height={h} rx={10} fill="var(--blue-500)" fillOpacity={0.85}
        initial={{ width: 0 }} animate={{ width: cut - x0 }} transition={{ duration: reduce ? 0 : 1.3, delay: 0.2, ease }} />
      <text x={x0 + 18} y={y + 29} fontSize={20}>{'nâng cấp miễn phí'}</text>
      <text x={(cut + x1) / 2} y={y + 29} textAnchor="middle" fontSize={18} className="muted">{'tính phí'}</text>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: reduce ? 0 : 1.4 }}>
        <line x1={cut} x2={cut} y1={44} y2={y + h + 14} stroke={B} strokeWidth={1.4} strokeDasharray="5 7" />
        <text x={cut} y={32} textAnchor="middle" fontSize={20} className="sd">{'hết Q2/2027'}</text>
      </motion.g>
      <text x={x0} y={y + h + 40} fontSize={18} className="muted">{'T10/2026'}</text>
      <text x={cut} y={y + h + 40} textAnchor="middle" fontSize={18} className="muted">{'T6/2027'}</text>
    </svg>
  )
}
