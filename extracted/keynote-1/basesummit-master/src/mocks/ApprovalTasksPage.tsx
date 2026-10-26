import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ClipboardCheck, Home, Inbox, SendHorizonal, ChevronRight, CheckCircle2, Circle, Clock, ListTodo, Plus,
} from 'lucide-react'
import { TopBar } from './Window'
import { Av, Pill, PEOPLE } from './parts'

/* One page of the tasks walk: approvals become tasks. It opens in the
   Requests app on a request with three approvers; each approver
   row spawns its approval task; then the view hands over to the Tasks app,
   where the three task cards fly into each approver's own works list and
   land on top. Everything is laid out on fixed coordinates so the cards fly
   in the page's own space — the window's zoom and the stage's scale never
   touch the path. Invented people and request. */

const APPROVERS = [
  { p: 'B', role: 'COO' },
  { p: 'J', role: 'CFO' },
  { p: 'E', role: 'Nhà sáng lập & CEO' },
]

/* Page coordinates, below the top bar. */
const ROW_Y = [314, 376, 438]          // approver rows in the Requests scene
const CHIP = { x: 648, w: 300, h: 42 }  // where each approval task pops out
const LANE_X = [28, 368, 708]           // the three works lists in the Tasks scene
const LANE_W = 318
const LAND_Y = 128                      // the top slot of each list

const EXISTING: [string, string][][] = [
  [['Rà soát nhà cung cấp Q3', 'OPS-212'], ['Kiểm kê kho — Hà Nội', 'OPS-208']],
  [['Khóa sổ tháng 8', 'FIN-341'], ['Dự báo dòng tiền Q4', 'FIN-338']],
  [['Tài liệu HĐQT — Rà soát Q3', 'EXD-19'], ['Kế hoạch tuyển dụng 2027', 'EXD-17']],
]

type Phase = 0 | 1 | 2 | 3

export function ApprovalTasksPage() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduce ? 3 : 0)
  useEffect(() => {
    if (reduce) return
    const t = [setTimeout(() => setPhase(1), 700), setTimeout(() => setPhase(2), 2300), setTimeout(() => setPhase(3), 3700)]
    return () => t.forEach(clearTimeout)
  }, [reduce])
  const inTasks = phase >= 2

  return (
    <>
      <TopBar />
      <div className="mk-at">
        {/* ── Requests app: the request and its approvers ── */}
        <motion.div className="mk-at-scene req" initial={false}
          animate={inTasks ? { opacity: 0, x: -60 } : { opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="side">
            <div className="title"><ClipboardCheck size={15} />Đề xuất</div>
            <div className="row"><Home size={15} />Trang chủ</div>
            <div className="row"><Inbox size={15} />Gửi đến tôi</div>
            <div className="row on"><SendHorizonal size={15} />Tôi đã gửi</div>
            <div className="sec">SERVICE PHÊ DUYỆT</div>
            <div className="row"><i style={{ background: '#16A34A' }}>F</i>Tài chính</div>
            <div className="row"><i style={{ background: '#7C3AED' }}>H</i>Nhân sự</div>
            <div className="row"><i style={{ background: '#F59E0B' }}>P</i>Mua sắm</div>
          </div>
          <div className="doc">
            <div className="crumb"><i style={{ background: '#F59E0B' }}>P</i>Mua sắm <ChevronRight size={13} /> <b>Đề xuất mua sắm</b> <code>PR-2026-00118</code><span className="st">Đang chờ</span></div>
            <h3>Laptop cho đội Kinh doanh — 12 chiếc</h3>
            <div className="kv"><span>Người tạo</span><b><Av p="D" size={20} />Daniel <em>(Nhân viên kinh doanh)</em></b></div>
            <div className="kv"><span>Số tiền (VND)</span><b>384,000,000</b></div>
            <div className="kv"><span>Hạn</span><b>19/09/2026</b></div>
            <div className="apphead">NGƯỜI DUYỆT <span>· 0/3 ĐÃ DUYỆT · mỗi người nhận một việc phê duyệt</span></div>
            {APPROVERS.map((a, i) => (
              <div key={a.p} className={`appr${phase >= 1 ? ' lit' : ''}`} style={{ top: ROW_Y[i] }}>
                <Av p={a.p} size={32} />
                <div><b>{PEOPLE[a.p].name}</b><span>{a.role}</span></div>
                <Clock size={15} className="wait" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tasks app: each approver's own works list ── */}
        <motion.div className="mk-at-scene tasks" initial={false}
          animate={inTasks ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: inTasks ? 0.15 : 0 }}>
          <div className="thead"><Circle size={15} /><b>Công việc</b><ChevronRight size={13} /><span>Đội của tôi</span><span className="hint">— mỗi người một danh sách, mọi service</span></div>
          {APPROVERS.map((a, i) => (
            <div key={a.p} className="lane" style={{ left: LANE_X[i], width: LANE_W }}>
              <div className="lh"><Av p={a.p} size={26} /><b>{PEOPLE[a.p].name}</b><span>Việc của tôi</span><Plus size={14} className="add" /></div>
              <motion.div className="stack" initial={false} animate={{ y: phase >= 2 ? 64 : 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: phase >= 2 ? 0.3 + i * 0.12 : 0 }}>
                {EXISTING[i].map(([n, c]) => (
                  <div key={c} className="card"><Circle size={14} className="o" /><div><b>{n}</b><code>{c}</code></div></div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* ── The approval tasks: pop out of the approver rows, fly into the lists ── */}
        {APPROVERS.map((a, i) => {
          const from = { x: CHIP.x, y: ROW_Y[i] + 7 }
          const to = { x: LANE_X[i] + 10, y: LAND_Y }
          const at = phase >= 2 ? to : from
          return (
            <motion.div key={a.p} className={`mk-at-task${phase >= 3 ? ' landed' : ''}`}
              initial={false}
              animate={{
                x: at.x, y: at.y, width: phase >= 2 ? LANE_W - 20 : CHIP.w,
                opacity: phase >= 1 ? 1 : 0,
                scale: phase === 1 ? 1 : phase >= 2 ? 1 : 0.6,
              }}
              transition={{
                x: { duration: 0.9, ease: [0.5, 0, 0.2, 1], delay: phase >= 2 ? 0.25 + i * 0.12 : 0 },
                y: { duration: 0.9, ease: [0.3, -0.2, 0.2, 1], delay: phase >= 2 ? 0.25 + i * 0.12 : 0 },
                width: { duration: 0.9, ease: [0.5, 0, 0.2, 1], delay: phase >= 2 ? 0.25 + i * 0.12 : 0 },
                opacity: { duration: 0.3, delay: phase === 1 ? i * 0.22 : 0 },
                scale: { type: 'spring', stiffness: 420, damping: 22, delay: phase === 1 ? i * 0.22 : 0 },
              }}
            >
              <ListTodo size={15} className="ic" />
              <div><b>Duyệt: Laptop cho Kinh doanh</b><code>PR-2026-00118</code></div>
              {phase >= 3 ? <Pill kind="green">Mới</Pill> : <CheckCircle2 size={15} className="ok" />}
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
