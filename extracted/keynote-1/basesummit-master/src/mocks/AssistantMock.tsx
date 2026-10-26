import { Sparkles, Brain, MessageSquare, Plus } from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Pill } from './parts'
import { AGENTS_RAIL } from './AgentsParts'

const MEMORY = [
  { t: 'Prefers the first meeting after 09:30', w: '3w' },
  { t: 'Owns the Northwind account personally', w: '2w' },
  { t: 'Reviews design work on Thursdays', w: '2w' },
  { t: 'Delegates IT requests to Duke', w: '6d' },
  { t: 'Says "ship it" when a decision is final', w: '4d' },
  { t: 'Wants approvals summarised, not forwarded', w: '2d' },
]

/* A personal assistant's chat, with the memory it keeps of its owner beside it. */
export function AssistantMock() {
  return (
    <>
      <TopBar placeholder="Search agents…" />
      <div className="mk-app">
        <Rail active="assistant" items={AGENTS_RAIL} />
        <div className="mk-side">
          <div className="title"><Sparkles size={15} />Assistant</div>
          <Sec>MY ASSISTANTS</Sec>
          <SideRow ltr="G" color="#7C3AED" label="Grace" on />
          <SideRow ltr="T" color="#0891B2" label="Theo" />
          <Sec>&nbsp;</Sec>
          <SideRow icon={<Plus size={14} />} label="New assistant" />
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb">Grace <span className="sep">·</span> <span style={{ fontWeight: 500, color: 'var(--mk-muted)' }}>Chief of staff — keeps my week straight</span></span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--mk-muted)' }}><Sparkles size={13} color="var(--mk-blue)" />Claude Sonnet 5</span>
          </div>
          <div className="mk-subhead">
            <span className="mk-tab">Overview</span>
            <span className="mk-tab on">Chats <span className="n">4</span></span>
            <span className="mk-tab">Tasks <span className="n">2</span></span>
            <span className="mk-tab">Triggers</span>
            <span className="mk-tab">Memory <span className="n">12</span></span>
            <span className="mk-tab">Capacities <span className="n">7</span></span>
            <span className="mk-tab">Instructions</span>
          </div>
          <div className="mk-asst">
            <div className="mk-chat">
              <div className="u">Prep my day.</div>
              <div className="a">
                <span className="who"><Sparkles size={13} color="var(--mk-blue)" />Grace</span>
                <div>Three things need you before noon:</div>
                <ol>
                  <li><b>Northwind renewal, 14:00.</b> Daniel sent the forecast last night — the quote is $48,500, up 12% on last year.</li>
                  <li><b>Two approvals are waiting on you:</b> FAC-518 (HVAC repair, overdue) and IT-1044 (VPN profiles). Duke can take IT-1044.</li>
                  <li><b>Jolie's Draft flow v1</b> review closes today — Thursday is your design day, so I put it at 11:00.</li>
                </ol>
                <div className="used">read <Pill kind="grey">Calendar</Pill><Pill kind="grey">Sales pipeline</Pill><Pill kind="grey">Work requests</Pill><Pill kind="grey">Assessments</Pill> · your scope only</div>
              </div>
              <div className="u">Move IT-1044 to Duke and tell him why.</div>
              <div className="a">
                <span className="who"><Sparkles size={13} color="var(--mk-blue)" />Grace</span>
                <div>Reassigned IT-1044 to Duke with a note: "VPN profiles for the macOS rollout — Eric asked you to own this one; due Friday." Want me to add it to your Friday check-in?</div>
              </div>
              <div className="comp"><MessageSquare size={14} style={{ marginRight: 8 }} />Message Grace…</div>
            </div>
            <div className="mk-mem" data-callout="memory">
              <h5><Brain size={15} color="var(--mk-blue)" />Memory</h5>
              <div className="sub">What Grace knows about you</div>
              {MEMORY.map(m => <div key={m.t} className="m">{m.t}<small>{m.w}</small></div>)}
              <div className="foot">12 memories go into every prompt · yours alone — no admin can open it</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
