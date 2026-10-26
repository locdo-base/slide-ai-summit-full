import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'

export interface TreeNode {
  code: string
  name: string
  children?: TreeNode[]
  /** Ghost node — "and so on". */
  ghost?: boolean
}

interface Placed { node: TreeNode; level: number; x: number; y: number; order: number }
interface Edge { from: Placed; to: Placed }

const NODE_W = 302, NODE_H = 58, LEVEL_GAP = 330, ROW = 78

function layout(root: TreeNode) {
  const placed: Placed[] = []
  const edges: Edge[] = []
  let row = 0
  let order = 0
  const walk = (node: TreeNode, level: number): Placed => {
    const kids = node.children ?? []
    const p: Placed = { node, level, x: level * LEVEL_GAP, y: 0, order: order++ }
    if (!kids.length) {
      p.y = row++ * ROW
    } else {
      const ys = kids.map(k => { const c = walk(k, level + 1); edges.push({ from: p, to: c }); return c.y })
      p.y = (Math.min(...ys) + Math.max(...ys)) / 2
    }
    placed.push(p)
    return p
  }
  walk(root, 0)
  return { placed, edges, rows: row }
}

interface Props {
  root: TreeNode
  width?: number
  height?: number
  /** Plan overlay: label chips, and which node codes it aligns. Shown at `planAt`. */
  plan?: { chain: string[]; links: string[] }
  planAt?: number
}

/** A work-request tree unfolding level by level, and a plan aligning to it. */
export function NestedTree({ root, width = 1640, height = 500, plan, planAt = 1 }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const { placed, edges, rows } = layout(root)
  const treeH = (rows - 1) * ROW + NODE_H
  const top = height - treeH - 10
  const ease = [0.2, 0.8, 0.2, 1] as const
  const dur = reduce ? 0 : 0.6
  const delayOf = (p: Placed) => (reduce ? 0 : 0.2 + p.level * 0.45 + p.order * 0.03)
  const byCode = new Map(placed.map(p => [p.node.code, p]))
  const planOn = !!plan && step >= planAt

  // Plan chain sits along the top; the last chip is the initiative that links down.
  const chipY = 30, chipH = 48
  const chipXs: number[] = []
  let cx = 0
  const chipW = (s: string) => Math.max(200, s.length * 13.5 + 44)
  ;(plan?.chain ?? []).forEach(s => { chipXs.push(cx); cx += chipW(s) + 56 })
  const lastChip = plan ? { x: chipXs[chipXs.length - 1], w: chipW(plan.chain[plan.chain.length - 1]) } : null

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <g transform={`translate(0 ${top})`}>
        {edges.map((e, i) => {
          const x1 = e.from.x + NODE_W, y1 = e.from.y + NODE_H / 2
          const x2 = e.to.x, y2 = e.to.y + NODE_H / 2
          const d = `M ${x1} ${y1} C ${x1 + 70} ${y1}, ${x2 - 70} ${y2}, ${x2} ${y2}`
          return (
            <motion.path
              key={i} d={d} fill="none" strokeWidth={1.3}
              stroke={e.to.node.ghost ? 'var(--line)' : 'var(--line-strong)'}
              strokeDasharray={e.to.node.ghost ? '6 8' : undefined}
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: dur, delay: delayOf(e.to) - 0.25, ease: 'easeInOut' }}
            />
          )
        })}
        {placed.map(p => (
          <motion.g
            key={p.node.code}
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: dur, delay: delayOf(p), ease }}
          >
            <rect
              x={p.x} y={p.y} width={NODE_W} height={NODE_H} rx={7}
              fill={p.node.ghost ? 'transparent' : 'var(--navy-800)'}
              stroke={planOn && plan!.links.includes(p.node.code) ? 'var(--blue-300)' : 'var(--line)'}
              strokeWidth={planOn && plan!.links.includes(p.node.code) ? 1.8 : 1}
              strokeDasharray={p.node.ghost ? '6 8' : undefined}
              style={{ transition: 'stroke .5s, stroke-width .5s' }}
            />
            {p.node.ghost ? (
              <text x={p.x + NODE_W / 2} y={p.y + 38} textAnchor="middle" fontSize={26} className="dim">{p.node.name}</text>
            ) : (
              <>
                <text x={p.x + 18} y={p.y + 23} fontSize={15} className="dim">{p.node.code}</text>
                <text x={p.x + 18} y={p.y + 46} fontSize={21}>{p.node.name}</text>
              </>
            )}
          </motion.g>
        ))}
      </g>

      {plan && (
        <g>
          {plan.chain.map((label, i) => {
            const x = chipXs[i], w = chipW(label)
            const last = i === plan.chain.length - 1
            return (
              <motion.g key={i} initial={false} animate={{ opacity: planOn ? 1 : 0, y: planOn ? 0 : -12 }}
                transition={{ duration: dur, delay: planOn ? i * 0.18 : 0, ease }}>
                <rect x={x} y={chipY} width={w} height={chipH} rx={24}
                  fill={last ? 'var(--navy-700)' : 'transparent'} stroke={last ? 'var(--blue-300)' : 'var(--line-strong)'} />
                <text x={x + w / 2} y={chipY + 31} textAnchor="middle" fontSize={22} className={last ? undefined : 'muted'}>{label}</text>
                {i < plan.chain.length - 1 && (
                  <line x1={x + w + 6} x2={x + w + 50} y1={chipY + chipH / 2} y2={chipY + chipH / 2} stroke="var(--line-strong)" strokeWidth={1.2} />
                )}
              </motion.g>
            )
          })}
          {lastChip && plan.links.map((code, i) => {
            const p = byCode.get(code)
            if (!p) return null
            const x1 = lastChip.x + lastChip.w / 2, y1 = chipY + chipH
            const x2 = p.x + NODE_W / 2, y2 = top + p.y
            const d = `M ${x1} ${y1} C ${x1} ${y1 + 90}, ${x2} ${y2 - 90}, ${x2} ${y2}`
            return (
              <motion.path key={code} d={d} fill="none" stroke="var(--blue-300)" strokeWidth={1.4} strokeDasharray="4 7"
                initial={false} animate={{ pathLength: planOn ? 1 : 0, opacity: planOn ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.9, delay: planOn ? 0.5 + i * 0.2 : 0, ease: 'easeInOut' }} />
            )
          })}
        </g>
      )}
    </svg>
  )
}
