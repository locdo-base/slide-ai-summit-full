import { ChevronDown, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react'
import { Pill } from './parts'

/* The real "New assistant" dialog: the boundary is decided by what you create. */
export function NewAssistantMock() {
  return (
    <div className="mk-dialog">
      <div className="dh">
        <h3>New assistant</h3>
        <div className="sub" data-callout="own">Yours alone — nobody else in the workspace can open it.</div>
      </div>
      <div className="df">
        <div className="mk-field">
          <label>Name</label>
          <div className="in">Grace</div>
          <div className="hint">Give it a person's name — you'll be talking to it by name.</div>
        </div>
        <div className="mk-field">
          <label>Persona</label>
          <div className="in">Chief of staff — keeps my week straight</div>
          <div className="hint">Who they are to you, in one line.</div>
        </div>
        <div className="mk-field">
          <label>Model</label>
          <div className="in"><Sparkles size={13} style={{ margin: 0, color: 'var(--mk-blue)' }} />Claude Sonnet 5 <ChevronDown size={14} /></div>
          <div className="hint">The LLM this assistant runs on.</div>
        </div>
      </div>
      <div className="db">
        <span className="mk-btn ghost">Cancel</span>
        <span className="mk-btn">Create assistant</span>
      </div>
    </div>
  )
}

/* A shared agent's duty: bound to exactly one service, with its guardrails. */
export function DutyMock() {
  return (
    <div className="mk-pane mk-duty">
      <div className="ph">
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--mk-muted)', fontWeight: 500, fontSize: 12 }}>Agents <ChevronRight size={12} /> Deal-risk analyst <ChevronRight size={12} /> Duties</span>
        <span className="right"><Pill kind="green">Active</Pill></span>
      </div>
      <div className="pb">
        <div className="row">
          <b>Service</b>
          <div>
            <span data-callout="service" style={{ display: 'inline-flex' }}><Pill kind="medium">Sales pipeline</Pill></span>
            <span className="hint">The service this duty acts on — required. The agent sees nothing outside it.</span>
          </div>
        </div>
        <div className="row"><b>Instruction</b><div>Flag deals at risk of slipping this quarter. Give a reason a human can check in one minute.</div></div>
        <div className="row"><b>Output</b><div className="chips"><Pill kind="grey">queue</Pill><Pill kind="grey">priority</Pill><Pill kind="grey">reason</Pill></div></div>
        <div className="row"><b>Actions</b><div className="chips"><Pill kind="cyan">read deals</Pill><Pill kind="cyan">comment</Pill></div></div>
        <div className="row">
          <b>Rules <span style={{ fontWeight: 500 }}>3</span></b>
          <div className="rules">
            <div><ShieldCheck size={13} color="#16A34A" />Never change a deal stage.</div>
            <div><ShieldCheck size={13} color="#16A34A" />EMEA deals only.</div>
            <div><ShieldCheck size={13} color="#16A34A" />Flag — never email the customer.</div>
          </div>
        </div>
        <div className="foot">Where it's used: <b>Sales pipeline</b> · <b>Renewal workflow</b> · 3 tasks active · Updated 16 Aug</div>
      </div>
    </div>
  )
}
