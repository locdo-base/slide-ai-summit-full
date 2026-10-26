import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'

/* Amazon before the mandate — one huge monolith, drawn as processes wired to
   each other. Four clicks tell the coupling story: one process needs another
   to run; to change one, both must change; the change conflicts with the
   third and the fourth; and as the system grows, everything is lit and the
   whole thing shakes. 880 × 640, for the split layout. */

const W = 880, H = 640
const ease = [0.2, 0.8, 0.2, 1] as const
const BLUE = 'var(--blue-300)', AMBER = 'var(--amber-300)', LINE = 'var(--line)', LINE_STRONG = 'var(--line-strong)'

interface Node { id: string; x: number; y: number; label: string }

/** Twelve processes on a loose ring with four inside — the shape of a system
 *  that grew rather than was designed. */
const NODES: Node[] = [
  { id: 'a', x: 300, y: 300, label: 'Orders' },
  { id: 'b', x: 560, y: 250, label: 'Payments' },
  { id: 'c', x: 620, y: 470, label: 'Shipping' },
  { id: 'd', x: 260, y: 500, label: 'Inventory' },
  { id: 'e', x: 120, y: 160, label: 'Catalog' },
  { id: 'f', x: 420, y: 90, label: 'Accounts' },
  { id: 'g', x: 760, y: 120, label: 'Pricing' },
  { id: 'h', x: 820, y: 330, label: 'Tax' },
  { id: 'i', x: 780, y: 580, label: 'Returns' },
  { id: 'j', x: 460, y: 590, label: 'Reports' },
  { id: 'k', x: 90, y: 400, label: 'Search' },
  { id: 'l', x: 90, y: 590, label: 'Email' },
]

/** Every process wired to several others: the coupling. */
const EDGES: [string, string][] = [
  ['a', 'b'], ['a', 'd'], ['a', 'e'], ['a', 'f'], ['a', 'k'], ['a', 'j'],
  ['b', 'c'], ['b', 'f'], ['b', 'g'], ['b', 'h'],
  ['c', 'd'], ['c', 'h'], ['c', 'i'], ['c', 'j'],
  ['d', 'k'], ['d', 'l'], ['d', 'j'],
  ['e', 'f'], ['e', 'k'], ['f', 'g'], ['g', 'h'], ['h', 'i'], ['i', 'j'], ['j', 'l'], ['k', 'l'], ['e', 'g'],
]

/** The story's cast: A needs B; A and B change; the change conflicts with C and D. */
const A = 'a', B = 'b', CD = ['c', 'd']
const AB_EDGE = ['a', 'b']
const CONFLICT_EDGES = [['b', 'c'], ['a', 'd'], ['b', 'h'], ['c', 'd']]

interface Props {
  step: number
  needAt?: number
  changeAt?: number
  conflictAt?: number
  blowAt?: number
}

export function Monolith({ step, needAt = 1, changeAt = 2, conflictAt = 3, blowAt = 4 }: Props) {
  const reduce = useReducedMotion()
  const byId = useMemo(() => new Map(NODES.map(n => [n.id, n])), [])
  const need = step >= needAt, change = step >= changeAt, conflict = step >= conflictAt, blow = step >= blowAt
  const isEdge = (e: [string, string], pair: string[]) => (e[0] === pair[0] && e[1] === pair[1]) || (e[0] === pair[1] && e[1] === pair[0])

  const nodeState = (id: string): 'idle' | 'lit' | 'hot' => {
    if (blow) return 'hot'
    if (conflict && CD.includes(id)) return 'hot'
    if (change && (id === A || id === B)) return 'hot'
    if (need && (id === A || id === B)) return 'lit'
    return 'idle'
  }
  const edgeState = (e: [string, string]): 'idle' | 'lit' | 'hot' => {
    if (blow) return 'hot'
    if (conflict && CONFLICT_EDGES.some(p => isEdge(e, p))) return 'hot'
    if (change && isEdge(e, AB_EDGE)) return 'hot'
    if (need && isEdge(e, AB_EDGE)) return 'lit'
    return 'idle'
  }

  return (
    <motion.svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}
      animate={blow && !reduce ? { x: [0, -3, 3, -2, 2, 0], y: [0, 2, -2, 1, -1, 0] } : { x: 0, y: 0 }}
      transition={blow ? { duration: 0.5, repeat: Infinity, repeatDelay: 1.6 } : { duration: 0.3 }}>
      <circle cx={W / 2} cy={H / 2} r={330} fill="url(#halo-blue)" opacity={blow ? 0.25 : 0.55} style={{ transition: 'opacity 1s' }} />

      {EDGES.map(e => {
        const p = byId.get(e[0])!, q = byId.get(e[1])!
        const s = edgeState(e)
        return (
          <motion.line key={e.join('-')} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
            initial={false}
            animate={{
              stroke: s === 'hot' ? AMBER : s === 'lit' ? BLUE : LINE,
              strokeWidth: s === 'idle' ? 1.2 : s === 'lit' ? 3 : 3.2,
              opacity: s === 'idle' ? (need ? 0.55 : 1) : 1,
            }}
            transition={{ duration: 0.6, ease }}
            strokeDasharray={s === 'hot' && !blow ? '10 8' : undefined}
          />
        )
      })}

      {NODES.map(n => {
        const s = nodeState(n.id)
        const r = n.id === A || n.id === B ? 34 : 26
        return (
          <g key={n.id}>
            {s !== 'idle' && (
              <motion.circle cx={n.x} cy={n.y} r={r + 14} fill="none"
                stroke={s === 'hot' ? AMBER : BLUE} strokeWidth={1.4}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0.7, 0], scale: [0.9, 1.35] }}
                transition={{ duration: reduce ? 0 : 1.8, repeat: reduce ? 0 : Infinity, ease: 'easeOut' }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }} />
            )}
            <motion.circle cx={n.x} cy={n.y} r={r}
              initial={false}
              animate={{ fill: s === 'hot' ? 'color-mix(in srgb, var(--amber-300) 22%, var(--navy-800))' : 'var(--navy-800)', stroke: s === 'hot' ? AMBER : s === 'lit' ? BLUE : LINE_STRONG, strokeWidth: s === 'idle' ? 1.2 : 2.2 }}
              transition={{ duration: 0.6, ease }} />
            <text x={n.x} y={n.y + 6} fontSize={17} textAnchor="middle" className={s === 'hot' ? 'tone-human' : s === 'lit' ? 'tone-blue' : 'muted'}
              style={{ transition: 'fill .6s' }}>{n.label}</text>
          </g>
        )
      })}

      {/* the beats, written beside the pair the story follows */}
      <motion.g initial={false} animate={{ opacity: need && !change ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <text x={430} y={236} fontSize={22} textAnchor="middle" className="tone-blue">phụ thuộc</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: change && !conflict ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <text x={415} y={236} fontSize={22} textAnchor="middle" className="tone-human">cả hai phải đổi</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: conflict && !blow ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <text x={600} y={372} fontSize={22} textAnchor="middle" className="tone-human">xung đột</text>
        <text x={280} y={410} fontSize={22} textAnchor="middle" className="tone-human">xung đột</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: blow ? 1 : 0, y: blow ? 0 : 10 }} transition={{ duration: 0.6, ease }}>
        <rect x={W / 2 - 150} y={H / 2 + 56} width={300} height={68} rx={34} fill="var(--navy-900)" stroke={AMBER} strokeWidth={1.5} />
        <text x={W / 2} y={H / 2 + 102} fontSize={34} textAnchor="middle" className="sd tone-human">Coupling</text>
      </motion.g>
    </motion.svg>
  )
}
