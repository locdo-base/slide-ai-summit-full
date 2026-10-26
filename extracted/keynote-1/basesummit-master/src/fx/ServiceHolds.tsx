import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Boxes, FileText, Target, ShieldCheck, Wrench, Sparkles } from 'lucide-react'
import { useStep } from '../engine/step'

const THINGS = ['bảng deal', 'biểu mẫu', 'nút bấm', 'danh sách', 'báo cáo', 'phân quyền', 'bộ lọc', 'xuất dữ liệu']

const HOLDS = [
  { Icon: Boxes, k: 'Object model', v: 'deal — trường dữ liệu, vòng đời, quan hệ' },
  { Icon: FileText, k: 'AGENTS.md', v: 'vai trò · cách làm việc · giới hạn của agent' },
  { Icon: Target, k: 'Purpose & context', v: 'chốt deal — system prompt' },
  { Icon: ShieldCheck, k: 'Rules', v: 'thẩm quyền chiết khấu · chỉ EMEA · không gửi email' },
  { Icon: Wrench, k: 'Tools', v: 'enrich(deal) · project(deal) · createTask(deal)' },
  { Icon: Sparkles, k: 'Skills', v: 'rà soát báo giá · dự báo · cảnh báo rủi ro' },
]

const ease = [0.2, 0.8, 0.2, 1] as const

interface Props {
  holdsAt?: number
  /** Set, the card turns on its own this many seconds after the slide lands
   *  — no click; `holdsAt` is then ignored. */
  holdsAfter?: number
  /** Set, the card is what it holds from the first frame — no chips, no turn. */
  still?: boolean
}

/** One service card. First a container of things — the software we had —
 *  then, on cue, what a service holds now: models and contexts. 880 wide. */
export function ServiceHolds({ holdsAt = 1, holdsAfter, still }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const [turned, setTurned] = useState(false)
  useEffect(() => {
    if (holdsAfter === undefined) return
    const t = setTimeout(() => setTurned(true), reduce ? 0 : holdsAfter * 1000)
    return () => clearTimeout(t)
  }, [holdsAfter, reduce])
  const holds = still || (holdsAfter === undefined ? step >= holdsAt : turned)
  const d = (s: number) => (reduce || still ? 0 : s)

  return (
    <div className="svc">
      <motion.div className={`svc-card${holds ? ' holds' : ''}`} initial={false} transition={{ duration: d(0.6), ease }}>
        <div className="svc-head">
          <span className="svc-name">Service · Sales pipeline</span>
          <span className="svc-kick">
            <motion.span initial={false} animate={{ opacity: holds ? 0 : 1 }} transition={{ duration: d(0.35) }}>chỉ là nơi chứa các thứ</motion.span>
            <motion.span className="on" initial={false} animate={{ opacity: holds ? 1 : 0 }} transition={{ duration: d(0.5), delay: d(holds ? 0.2 : 0) }}>nắm giữ model và context</motion.span>
          </span>
        </div>
        <div className="svc-layers">
          <motion.div className="svc-things" initial={false} animate={{ opacity: holds ? 0 : 1, y: holds ? -10 : 0 }} transition={{ duration: d(0.45) }}>
            {THINGS.map(t => <span key={t}>{t}</span>)}
          </motion.div>
          <div className="svc-holds">
            {HOLDS.map((h, i) => (
              <motion.div key={h.k} className="svc-row" initial={false}
                animate={{ opacity: holds ? 1 : 0, y: holds ? 0 : 12 }}
                transition={{ duration: d(0.5), delay: holds ? d(0.25 + i * 0.1) : 0, ease }}>
                <i><h.Icon size={22} strokeWidth={1.7} /></i>
                <b>{h.k}</b>
                <span>{h.v}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
