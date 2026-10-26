import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'

/* Thousands of features, each for one tiny problem: a swarm of feature names
   drifting in over whatever sits beneath (the two product screens). Positions
   are seeded, so the swarm is the same on every run and in every thumbnail;
   the chips arrive in a stagger and then hover. Fills the box it is given. */

const FEATURES = [
  'Export to CSV', 'Bulk edit', 'Filter by owner', 'Pin column', 'Share link', 'Duplicate', 'Archive', 'Custom view', 'Kanban',
  'Set reminder', 'Merge duplicates', 'Saved filters', 'Column width', 'Group by stage', 'Import wizard', 'Add tag', 'Watch record',
  'Print view', 'Sort by date', 'Quick add', 'Inline edit', 'Attach file', 'Mention', 'Follow', 'Snooze', 'Recurring', 'Sub-task',
  'Convert to deal', 'Approval chain', 'Field permission', 'Audit log', 'Keyboard shortcut', 'Dark mode', 'Email template',
  'Webhook', 'Conditional field', 'Lookup', 'Rollup', 'Formula field', 'Dependent picklist', 'Record type', 'Page layout',
  'Related list', 'Chatter feed', 'Dashboard widget', 'Report type', 'Scheduled export', 'Mass transfer', 'Territory',
  'Lead scoring', 'Assignment rule', 'Escalation rule', 'Validation rule', 'Sharing rule', 'Queue', 'Macro', 'Quick action',
  'Path', 'Kanban swimlane', 'Favourites', 'Recent items', 'Global search', 'Split view', 'Compact layout',
]

/** A small deterministic generator, so the layout never changes between runs. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

interface Props {
  width?: number
  height?: number
  /** Build step the swarm arrives at. */
  at?: number
  step: number
  count?: number
}

export function FeatureSwarm({ width = 1640, height = 520, at = 1, step, count = 56 }: Props) {
  const reduce = useReducedMotion()
  const on = step >= at
  const chips = useMemo(() => {
    const r = rng(20260914)
    // A loose grid with jitter: even coverage, no two chips on top of each other.
    const cols = 8, rows = Math.ceil(count / cols)
    return FEATURES.slice(0, count).map((label, i) => {
      const c = i % cols, row = Math.floor(i / cols)
      const x = ((c + 0.15 + r() * 0.7) / cols) * width
      const y = ((row + 0.15 + r() * 0.7) / rows) * height
      const rot = (r() - 0.5) * 8
      const size = 19 + Math.round(r() * 8)
      const dur = 5 + r() * 4
      const drift = 6 + r() * 10
      return { label, x, y, rot, size, dur, drift, delay: r() * 1.4 }
    })
  }, [count, width, height])

  return (
    <div className="swarm" style={{ width, height }} aria-hidden="true">
      {chips.map((c, i) => (
        <motion.span
          key={i}
          className="swarm-chip"
          style={{ left: c.x, top: c.y, fontSize: c.size }}
          initial={false}
          animate={on
            ? { opacity: [0, 0.9, 0.9], y: reduce ? 0 : [0, -c.drift, 0], rotate: c.rot, scale: 1 }
            : { opacity: 0, y: 30, rotate: c.rot, scale: 0.8 }}
          transition={on
            ? { opacity: { duration: 0.6, delay: reduce ? 0 : c.delay, times: [0, 0.6, 1] }, scale: { duration: 0.6, delay: reduce ? 0 : c.delay }, y: reduce ? { duration: 0 } : { duration: c.dur, delay: c.delay, repeat: Infinity, ease: 'easeInOut' } }
            : { duration: 0.35 }}
        >
          {c.label}
        </motion.span>
      ))}
    </div>
  )
}
