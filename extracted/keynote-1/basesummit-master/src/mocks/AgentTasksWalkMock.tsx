import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  LayoutList, MessageSquare, Brain, ListChecks, Zap, FileText, Sparkles, Plug, Wrench, Plus, Copy, RotateCcw, Mic, ArrowUp, Cpu,
  Flag, CalendarClock, User, ClipboardCheck, Send, FilePen, Home, Inbox, SendHorizonal, Bookmark, Search, ChevronDown,
  MoreHorizontal, Maximize2, Bot, X, Check, Clock, Loader, Type, Hash, Hourglass, LayoutGrid,
  BarChart3, Settings, ChevronsUpDown, Workflow, ArrowRight, Users,
} from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Pill, Av } from './parts'
import { AgentTasksMock } from './AgentTasksMock'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Where an agent's tasks come from, three screens a click apart: the agent's
   own task box (the list as it ships), tasks handed to it in chat — the
   assistant turns a message into tasks on its list — and tasks assigned in
   service operation: a request's approval sequence, where one step is the agent's.
   Drawn from Eric's captures; invented people throughout. */

type Page = 'box' | 'chat' | 'flow'

export const AGENT_TASKS_WALK: (WalkStep & { key: Page })[] = [
  { key: 'box', name: 'Mỗi agent một task box', ms: 4000 },
  { key: 'chat', name: 'Giao khi chat', ms: 4200 },
  { key: 'flow', name: 'Giao từ vận hành service', ms: 4200 },
]

/* ── Grace's sidebar, the chat page's — in Vietnamese, as the product reads
   for a Vietnamese workspace; the task box and flow pages keep their own. */
const RAIL_VI = [
  { key: 'agents', label: 'Agents', Icon: Bot },
  { key: 'assistant', label: 'Trợ lý', Icon: Sparkles },
  { key: 'copilots', label: 'Copilots', Icon: Users },
  { key: 'tasks', label: 'Công việc', Icon: ListChecks },
  { key: 'tools', label: 'Công cụ', Icon: Wrench },
]

const SIDE: { icon: typeof LayoutList; label: string; n?: number; on?: boolean; sec?: string }[] = [
  { icon: LayoutList, label: 'Tổng quan' },
  { icon: MessageSquare, label: 'Trò chuyện', n: 20, on: true },
  { icon: Brain, label: 'Bộ nhớ', n: 9 },
  { sec: 'VẬN HÀNH', icon: ListChecks, label: 'Công việc', n: 16 },
  { icon: Zap, label: 'Kích hoạt', n: 12 },
  { sec: 'KIẾN THỨC', icon: FileText, label: 'Tài liệu', n: 21 },
  { icon: Sparkles, label: 'Kỹ năng', n: 6 },
  { sec: 'NĂNG LỰC', icon: Plug, label: 'Kết nối', n: 3 },
  { icon: Wrench, label: 'Công cụ', n: 4 },
]

const NEW_TASKS: { name: string; due: string; prio: 'Cao' | 'Bình thường' }[] = [
  { name: 'Từ chối buổi panel thứ Năm', due: '14/9', prio: 'Bình thường' },
  { name: 'Nhắc lại ba email chưa được trả lời', due: '13/9', prio: 'Cao' },
  { name: 'Sắp xếp chuyến đi Singapore', due: '11/9', prio: 'Cao' },
]

/** The chat page on its own — the assistant slide's screen: Grace, the
 *  personal assistant, turning one message into tasks on her list. */
export const AssistantChatMock = ChatPage

function ChatPage() {
  return (
    <>
      <TopBar placeholder="Tìm kiếm…" />
      <div className="mk-app">
        <Rail active="agents" items={RAIL_VI} />
        <div className="mk-side at-side">
          <div className="at-agent">
            <span className="av">G</span>
            <div><b>Grace</b><small>{'Chief of staff — giữ lịch và những gì Eric cần ký duyệt'}</small></div>
          </div>
          {SIDE.map(r => (
            <div key={r.label} style={{ display: 'contents' }}>
              {r.sec && <Sec>{r.sec}</Sec>}
              <div className={`row${r.on ? ' on' : ''}`}><r.icon size={15} /><span>{r.label}</span>{r.n !== undefined && <em>{r.n}</em>}</div>
            </div>
          ))}
        </div>
        <div className="mk-main mk-ac">
          <div className="mk-ac-thread">
            <div className="u">Từ chối giúp tôi buổi panel thứ Năm, nhắc lại ba email chưa được trả lời, và sắp xếp chuyến đi Singapore trước ngày 14.</div>
            <div className="a">
              <p>Đã rõ. Tôi đã thêm ba công việc vào danh sách của mình:</p>
              <div className="mk-ac-tasks" data-callout="chat-tasks">
                {NEW_TASKS.map(t => (
                  <div key={t.name} className="t">
                    <span className="chk" />
                    <b>{t.name}</b>
                    <span className="meta"><CalendarClock size={12} />Hạn {t.due}<i /><User size={12} />Nguồn: Bạn<i /><Flag size={12} className={t.prio === 'Cao' ? 'hi' : undefined} />{t.prio}</span>
                  </div>
                ))}
              </div>
              <p>Tôi sẽ bắt đầu từ các email — vụ escalation hỗ trợ là lâu nhất. Bạn muốn xem thư từ chối panel trước khi gửi, hay để tôi gửi luôn?</p>
              <div className="acts"><span><Copy size={13} />Sao chép</span><span><RotateCcw size={13} />Thử lại</span><em>Claude Sonnet 5</em></div>
            </div>
            <div className="u">Cho tôi xem thư từ chối trước. Còn lại cứ gửi.</div>
            <div className="a">
              <p>Thư từ chối đã nằm trong bản nháp để bạn xem. Công việc email đang <b>Đang làm</b>, còn chuyến Singapore đang chờ hãng bay — tôi sẽ báo khi giờ bay được xác nhận.</p>
            </div>
          </div>
          <div className="mk-ac-comp">
            <span className="ph">Nhắn cho Grace…</span>
            <span className="bar"><Plus size={16} /><span className="model"><Cpu size={13} />Claude Sonnet 5</span><Mic size={15} /><span className="go"><ArrowUp size={14} /></span></span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── A purchasing request, its approval flow and the tasks the flow made ── */
const STEPS: { p?: string; agent?: boolean; name: string; role: string; state: 'ok' | 'run' | 'wait' }[] = [
  { p: 'B', name: 'Brian', role: 'COO', state: 'ok' },
  { p: 'H', name: 'Helen', role: 'HR Manager', state: 'ok' },
  { agent: true, name: 'Grace', role: 'Agent — budget line & vendor check', state: 'run' },
  { p: 'J', name: 'Jane', role: 'CFO', state: 'wait' },
]

const FLOW_TASKS: { name: string; who: string; agent?: boolean; state: 'Done' | 'In progress' | 'Waiting' }[] = [
  { name: 'Review the request', who: 'Brian', state: 'Done' },
  { name: 'Review the request', who: 'Helen', state: 'Done' },
  { name: 'Check the budget line and the vendor', who: 'Grace', agent: true, state: 'In progress' },
  { name: 'Final approval', who: 'Jane', state: 'Waiting' },
]

const Kv = ({ k, v, I }: { k: string; v: React.ReactNode; I?: typeof Type }) => (
  <div className="kv"><span>{I && <I size={13} />}{k}</span><b>{v}</b></div>
)

/* One node of the run graph — the flow's designer node with its run state
   on it: done, running now, or still waiting. */
function RunNode({ x, y, w = 250, kind, title, sub, state, when, children }: {
  x: number; y: number; w?: number; kind: 'S' | 'A' | 'L' | 'T'; title: string; sub: string
  state: 'done' | 'now' | 'wait'; when?: string; children?: React.ReactNode
}) {
  const label = { S: 'System', A: 'Agent', L: 'Logic', T: 'Todo' }[kind]
  return (
    <div className={`node k${kind} ${state}`} style={{ left: x, top: y, width: w }}>
      <div className="nh"><i>{kind}</i><div><b>{title}</b><span>{sub}</span></div><em>{label}</em></div>
      <div className="rs">
        {state === 'done' ? <><Check size={12} />Done</> : state === 'now' ? <><Loader size={12} className="spin" />Running</> : <><Clock size={12} />Waiting</>}
        {when && <small>· {when}</small>}
      </div>
      {children}
    </div>
  )
}
const Branches = ({ items }: { items: [string, string?][] }) => (
  <div className="br"><span className="cap">BRANCHES →</span>{items.map(([b, tone]) => <span key={b} className={`b ${tone ?? ''}`}>{b}<ArrowRight size={11} /></span>)}</div>
)

function FlowPage() {
  return (
    <>
      <TopBar />
      <div className="mk-app">
        <div className="mk-side" style={{ width: 232 }}>
          <div className="title"><ClipboardCheck size={15} />Requests <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 10, color: 'var(--mk-dim)' }}><Plus size={13} /></span></div>
          <SideRow icon={<Home size={15} />} label="Home" />
          <SideRow icon={<Inbox size={15} />} label="Sent to me" />
          <SideRow icon={<SendHorizonal size={15} />} label="Sent by me" />
          <Sec>IMPORTANT</Sec>
          <SideRow icon={<Send size={15} />} label="Direct requests" />
          <SideRow icon={<FilePen size={15} />} label="Draft requests" />
          <SideRow icon={<Cpu size={15} />} label="System requests" />
          <SideRow icon={<ClipboardCheck size={15} />} label="Purchasing Request" />
          <Sec>APPROVAL SERVICES <Search size={12} /></Sec>
          <SideRow ltr="P" color="#0891B2" label="Product" chev />
          <div className="row open"><span className="ltr" style={{ background: '#16A34A' }}>F</span><span>Finance</span><ChevronDown size={13} className="chev" /></div>
          {['OCBC Payment', 'Purchasing Request', 'Business Fee Payment'].map(n => <div key={n} className={`row sub${n === 'Purchasing Request' ? ' on' : ''}`}><i className="bullet" />{n}</div>)}
          <SideRow ltr="H" color="#7C3AED" label="Human Resources" chev />
          <div className="mk-pf-sidefoot">
            <SideRow icon={<LayoutGrid size={15} />} label="Services" />
            <SideRow icon={<BarChart3 size={15} />} label="Reports" />
            <SideRow icon={<Settings size={15} />} label="Settings" />
            <div className="mk-pf-ws"><span className="ltr" style={{ background: '#2563EB' }}>B</span>Base.vn<ChevronsUpDown size={13} className="chev" /></div>
          </div>
        </div>
        <div className="mk-main mk-fl">
          <div className="mk-head">
            <span className="crumb"><span className="ltr" style={{ background: '#16A34A' }}>F</span>Finance <span className="sep">/</span> Purchasing Request <span className="sep">/</span> <span className="id">PO-2026-00006</span></span>
            <span className="mk-btn ghost warn">Overdue</span>
            <span className="ic"><Bookmark size={15} /></span><span className="ic"><Sparkles size={15} /></span><span className="ic"><Maximize2 size={15} /></span><span className="ic"><MoreHorizontal size={15} /></span><span className="ic"><X size={15} /></span>
          </div>
          <div className="mk-fl-body">
            <div className="doc">
              <h2>Executive coaching engagement — H1</h2>
              <div className="meta"><Kv k="Request service" v={<>Purchasing Request <small>(Sequential)</small></>} /><Kv k="Created by" v={<span className="who"><Av p="E" size={22} />Eric <small>(Founder / CEO)</small></span>} /><Kv k="Total cost (VND)" v="48,000,000" I={Hash} /></div>
              <div className="tabs"><span>Overview</span><span className="on"><Workflow size={13} />Run graph</span><span>Discussion</span><span>Activity</span></div>
              <div className="mk-op-flow run" data-callout="run-graph">
                <div className="canvas">
                  <svg className="wires" width={620} height={400}>
                    <path d="M 40 30 V 40" className="g" />
                    <path d="M 197 80 H 212" className="g" />
                    <path d="M 397 80 H 412" className="g" />
                    <path d="M 507 160 V 190 H 305 V 220" className="b" />
                    <path d="M 212 262 H 197" className="d" />
                    <path d="M 397 262 H 412" className="d" />
                  </svg>
                  <div className="start" style={{ top: 4, left: 12 }}>▸ Start</div>
                  <RunNode x={12} y={40} w={185} kind="T" title="Review the request" sub="Review · Brian, COO" state="done" when="4d ago" />
                  <RunNode x={212} y={40} w={185} kind="T" title="Review the request" sub="Review · Helen, HR" state="done" when="4d ago" />
                  <RunNode x={412} y={40} w={190} kind="A" title="Check budget & vendor" sub="Instant Agent · Grace" state="now" when="12s">
                    <div className="ab"><span className="role"><Bot size={11} />Grace</span><span className="model"><Sparkles size={11} />claude-sonnet-5</span><span className="doc"><FileText size={11} />2</span></div>
                  </RunNode>
                  <RunNode x={12} y={220} w={185} kind="T" title="Final approval" sub="Sign-off · Jane, CFO" state="wait" />
                  <RunNode x={212} y={220} w={185} kind="L" title="Within budget?" sub="Condition" state="wait"><Branches items={[['Yes'], ['No']]} /></RunNode>
                  <RunNode x={412} y={220} w={190} kind="S" title="Return to requester" sub="Notify" state="wait" />
                </div>
              </div>
            </div>
            <aside className="side">
              <h6>APPROVERS</h6>
              <span className="link"><Clock size={13} />Approval progression</span>
              <div className="seq"><b>SEQUENTIAL</b><span>· 2/4 approved</span><Pill kind="grey">SLA 24h</Pill></div>
              <div className="steps" data-callout="flow-step">
                {STEPS.map(s => (
                  <div key={s.name} className={`step ${s.state}${s.agent ? ' agent' : ''}`}>
                    {s.agent ? <span className="bot"><Bot size={14} /></span> : <Av p={s.p!} size={30} />}
                    <div><b>{s.name}</b><small>{s.role}</small></div>
                    <i>{s.state === 'ok' ? <Check size={14} /> : s.state === 'run' ? <Loader size={14} /> : <Clock size={14} />}</i>
                  </div>
                ))}
              </div>
              <h6>TASKS FROM THIS FLOW <em>4</em></h6>
              <div className="ftasks">
                {FLOW_TASKS.map((t, i) => (
                  <div key={i} className={`ft ${t.state === 'Done' ? 'done' : t.state === 'In progress' ? 'run' : 'wait'}`}>
                    <span className="chk" />
                    <div><b>{t.name}</b><small>{t.agent ? <><Bot size={11} />{t.who} · agent</> : t.who}<i /><Zap size={11} />Origin: Flow</small></div>
                    <Pill kind={t.state === 'Done' ? 'green' : t.state === 'In progress' ? 'cyan' : 'grey'}>{t.state}</Pill>
                  </div>
                ))}
              </div>
              <h6>MAIN ACTIONS</h6>
              <div className="log">
                <div><i><Hourglass size={12} /></i><b>Helen</b> approved <small>· 4d ago</small></div>
                <div><i><Hourglass size={12} /></i><b>Brian</b> approved <small>· 4d ago</small></div>
                <div><i className="grey"><Hourglass size={12} /></i><b>Eric</b> request created <small>· 5d ago</small></div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

const PAGES: Record<Page, () => React.JSX.Element> = { box: AgentTasksMock, chat: ChatPage, flow: FlowPage }

export function AgentTasksWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % AGENT_TASKS_WALK.length), AGENT_TASKS_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const page: Page = walk ? AGENT_TASKS_WALK[walk.index].key : reduce ? 'box' : AGENT_TASKS_WALK[own].key
  const Body = PAGES[page]
  return (
    <div className="mk-tw mk-atw">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={page} className="mk-tw-page"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          <Body />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
