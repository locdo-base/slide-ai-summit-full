import { Sparkles, ChevronDown, CheckCircle2, Circle, User } from 'lucide-react'
import { Pill } from './parts'

/* The workflow builder's agent stage peek: a "Simple Agent" — one instruction,
   one model, one output shape, one outcome. */
export function AgentPeekMock() {
  return (
    <div className="mk-peek">
      <div className="ph">
        <span className="ic"><Sparkles size={16} /></span>
        <span className="tt"><b>Extract invoice</b><span>Simple Agent</span></span>
      </div>
      <div className="pf">
        <div className="mk-field">
          <label>Agent</label>
          <div className="in"><Sparkles size={13} style={{ margin: 0, color: '#7C3AED' }} />Contract Reader <ChevronDown size={14} /></div>
          <div className="hint">The reusable agent that runs this stage.</div>
        </div>
        <div className="mk-field">
          <label>Instruction</label>
          <div className="ta" data-callout="instruction">Read the attached invoice and extract the PO number, supplier, total and line items. If the PO number is missing, return it as null — never guess.</div>
          <div className="hint">What the agent should do at this stage — the duty it's assigned. Saved on connect as the agent's duty on this workflow.</div>
        </div>
        <div className="mk-field">
          <label>Model</label>
          <div className="in">Claude Sonnet 5 <ChevronDown size={14} /></div>
        </div>
        <div className="mk-field">
          <label>Output structure</label>
          <div className="schema"><code>po_number</code><code>supplier</code><code>total</code><code>currency</code><code>line_items[]</code></div>
          <div className="hint">One outcome: next. No branching, no human interaction.</div>
        </div>
      </div>
      <div className="pb2"><span className="del">Delete agent stage</span><span className="mk-btn">Save changes</span></div>
    </div>
  )
}

/* A workflow run: one ledger mixing human stage tasks and agent tasks. */
export function JobLedgerMock() {
  return (
    <div className="mk-ledger">
      <div className="lh">Invoice INV-2026-0912 <span className="sub">Accounts payable · run 1,248</span><span style={{ marginLeft: 'auto' }}><Pill kind="green">In progress</Pill></span></div>
      <div className="stg">Intake</div>
      <div className="op"><User size={15} color="#64748B" /><span className="n">Upload invoice</span><Pill kind="grey">Stage task</Pill><span style={{ color: 'var(--mk-green)' }}><CheckCircle2 size={15} /></span></div>
      <div className="stg">Extract invoice</div>
      <div className="op agent" data-callout="agentrow"><Sparkles size={15} color="#7C3AED" /><span className="n">Extract: INV-2026-0912</span><Pill kind="violet">Agent</Pill><span style={{ color: 'var(--mk-green)' }}><CheckCircle2 size={15} /></span>
        <span className="ins">Read the attached invoice and extract the PO number, supplier, total and line items…</span></div>
      <div className="stg">Check against PO</div>
      <div className="op agent"><Sparkles size={15} color="#7C3AED" /><span className="n">Match: PO-4471</span><Pill kind="violet">Agent</Pill><span style={{ color: 'var(--mk-green)' }}><CheckCircle2 size={15} /></span></div>
      <div className="stg">Approve payment</div>
      <div className="op"><User size={15} color="#64748B" /><span className="n">Jane · CFO approval</span><Pill kind="grey">Stage task</Pill><span style={{ color: 'var(--mk-dim)' }}><Circle size={15} /></span></div>
    </div>
  )
}
