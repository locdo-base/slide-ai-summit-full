import {
  Bot, Users, ListChecks, Wrench, LayoutList, MessageSquare, Brain, Zap, FileText, Sparkles, Plug, Search, List, LayoutGrid,
  Plus, MoreHorizontal, ChevronDown, ChevronRight, Circle, CircleDot, CircleAlert, CircleCheck, CalendarClock, User, Flag,
} from 'lucide-react'
import { TopBar } from './Window'
import { Rail, Sec } from './parts'

/* Agents › Grace › Tasks — the agent's own task list, as it ships: what the
   agent has to do, where each task came from (a schedule, a person, a
   trigger, the assistant), when it is due and how urgent. Seeded with a
   chief of staff's week; the chrome is the product's own. */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** Dates are kept as `dd/mm` in the data and read `12 Sep`. */
const day = (dm: string) => {
  const [d, m] = dm.split('/').map(Number)
  return `${d} ${MONTHS[m - 1]}`
}

const RAIL = [
  { key: 'agents', label: 'Agents', Icon: Bot },
  { key: 'copilots', label: 'Copilots', Icon: Users },
  { key: 'tasks', label: 'Tasks', Icon: ListChecks },
  { key: 'tools', label: 'Tools', Icon: Wrench },
]

type Origin = 'schedule' | 'you' | 'trigger' | 'assistant'
interface Task { name: string; note?: string; desc: string; origin: Origin; created: string; due?: string; late?: boolean; prio: 'high' | 'normal' }
interface Group { key: string; label: string; Icon: typeof Circle; tasks: Task[]; collapsed?: boolean; count?: number }

const ORIGIN: Record<Origin, { label: string; Icon: typeof Circle }> = {
  schedule: { label: 'Schedule', Icon: CalendarClock },
  you: { label: 'You', Icon: User },
  trigger: { label: 'Trigger', Icon: Zap },
  assistant: { label: 'Assistant', Icon: Sparkles },
}

const GROUPS: Group[] = [
  {
    key: 'todo', label: 'To do', Icon: Circle, tasks: [
      { name: 'Morning briefing for Eric', desc: 'What changed overnight, what Eric needs to decide, what I promised.', origin: 'schedule', created: '12/09', prio: 'high' },
      { name: "Decline Thursday's panel", desc: 'Short and polite; offer a Q1 slot instead.', origin: 'you', created: '10/09', due: '14/09', prio: 'normal' },
      { name: 'Chase three unanswered emails', desc: "Support escalation, vendor renewal, Jolie's design question.", origin: 'you', created: '09/09', due: '13/09', late: true, prio: 'high' },
    ],
  },
  {
    key: 'doing', label: 'Doing', Icon: CircleDot, tasks: [
      { name: 'Brief for Monday stand-up', desc: 'Weekend items, what needs Eric, what I said I would do.', origin: 'trigger', created: '11/09', due: '12/09', late: true, prio: 'high' },
    ],
  },
  {
    key: 'blocked', label: 'Blocked', Icon: CircleAlert, tasks: [
      { name: 'Sort out the Singapore trip', note: "Waiting for the airline to confirm — two flight times don't match.", desc: 'Two meetings clash with the flight on the 14th.', origin: 'assistant', created: '07/09', due: '11/09', late: true, prio: 'high' },
    ],
  },
  {
    key: 'done', label: 'Done', Icon: CircleCheck, tasks: [
      { name: 'Week 36 customer feedback summary', desc: 'Three recurring themes, one feature request; sent to the Product team.', origin: 'schedule', created: '08/09', due: '08/09', prio: 'normal' },
      { name: 'Book a room, send Q3 review invite', desc: 'Saigon room, 14:00 Wednesday, all six department heads invited.', origin: 'you', created: '05/09', due: '10/09', prio: 'normal' },
    ],
  },
]

const SIDE: { icon: typeof Circle; label: string; n?: number; on?: boolean; sec?: string }[] = [
  { icon: LayoutList, label: 'Overview' },
  { icon: MessageSquare, label: 'Chats', n: 25 },
  { icon: Brain, label: 'Memory', n: 10 },
  { sec: 'OPERATIONS', icon: ListChecks, label: 'Tasks', n: 5, on: true },
  { icon: Zap, label: 'Triggers' },
  { sec: 'KNOWLEDGE', icon: FileText, label: 'Docs', n: 23 },
  { icon: Sparkles, label: 'Skills', n: 6 },
  { sec: 'CAPACITIES', icon: Plug, label: 'Connections', n: 3 },
  { icon: Wrench, label: 'Tools', n: 5 },
]

export function AgentTasksMock() {return (
    <>
      <TopBar />
      <div className="mk-app">
        <Rail active="tasks" items={RAIL} />
        <div className="mk-side at-side">
          <div className="at-agent">
            <span className="av">G</span>
            <div><b>Grace</b><small>{'Chief of staff — keeps the calendar and what Eric needs to sign off'}</small></div>
          </div>
          {SIDE.map(r => (
            <div key={r.label} style={{ display: 'contents' }}>
              {r.sec && <Sec>{r.sec}</Sec>}
              <div className={`row${r.on ? ' on' : ''}`}><r.icon size={15} /><span>{r.label}</span>{r.n !== undefined && <em>{r.n}</em>}</div>
            </div>
          ))}
        </div>
        <div className="mk-main">
          <div className="mk-head at-head">
            <span className="crumb">Tasks</span>
            <span className="at-tabs">
              <span className="on"><ListChecks size={13} />Tasks <span className="n">5</span></span>
              <span><CalendarClock size={13} />Scheduled <span className="n">3</span></span>
              <span><CircleCheck size={13} />Approvals <span className="n">2</span></span>
            </span>
            <span className="at-search"><Search size={13} />Search tasks…</span>
            <span className="at-seg"><span className="on"><List size={13} />List</span><span><LayoutGrid size={13} />Board</span></span>
            <span className="mk-btn"><Plus size={15} />Create task</span>
          </div>
          <div className="at-body">
            {GROUPS.map(g => (
              <section key={g.key} className={`at-group ${g.key}`}>
                <header>
                  {g.collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  <g.Icon size={14} className="ic" />
                  <b>{g.label}</b><span className="n">{g.count ?? g.tasks.length}</span>
                  <Plus size={14} className="add" />
                </header>
                {!g.collapsed && (
                  <table className="at-table">
                    <colgroup>
                      {/* `12 Sep` runs wider than `12/09`: English takes the date columns' room from Description */}
                      <col style={{ width: '35%' }} /><col style={{ width: '21.5%' }} /><col style={{ width: '12%' }} /><col style={{ width: '9.5%' }} /><col style={{ width: '10%' }} /><col style={{ width: '10%' }} /><col style={{ width: '2%' }} />
                    </colgroup>
                    <thead><tr><th>Task</th><th>Description</th><th data-callout={g.key === 'todo' ? 'origin' : undefined}>Origin</th><th>Created</th><th>Due date</th><th>Priority</th><th /></tr></thead>
                    <tbody>
                      {g.tasks.map(task => {
                        const o = ORIGIN[task.origin]
                        return (
                          <tr key={task.name}>
                            <td><span className="tk"><span className="chk" /><span className="tn"><b>{task.name}</b>{task.note && <small>{task.note}</small>}</span></span></td>
                            <td className="desc">{task.desc}</td>
                            <td><span className="at-origin"><o.Icon size={11} />{o.label}</span></td>
                            <td className="d">{day(task.created)}</td>
                            <td className={`d${task.late ? ' late' : ''}`}>{task.due ? day(task.due) : '—'}</td>
                            <td><span className={`at-prio ${task.prio}`}><Flag size={10} />{task.prio === 'high' ? 'High' : 'Normal'}</span></td>
                            <td className="more"><MoreHorizontal size={14} /></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
