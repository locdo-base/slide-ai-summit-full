import { Sparkles, Lock, ChevronRight, ThumbsUp, ThumbsDown, Copy, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Pill } from './parts'

/* The commerce deal copilot: record-bound "Ask AI". The model never produces a
   number — every figure comes from the pricing engine; AI proposes, you decide. */
export function AskPanelMock() {
  return (
    <div className="mk-ask">
      <div className="ah">
        <div className="t"><Sparkles size={15} color="#7C3AED" />Ask AI <span className="acts"><span>History</span><span>New conversation</span></span></div>
        <div className="s">Quote · Northwind renewal Q-2291 <Pill kind="grey">Sales pipeline</Pill></div>
      </div>
      <div className="body">
        <div className="q">Can we hold the 12% uplift and still clear margin?</div>
        <div className="act">
          <div><i />Read the quote — 4 lines, 3 conditions</div>
          <div><i />Found 2 price rules that apply</div>
          <div><i />Priced 4 lines with the pricing engine</div>
        </div>
        <div className="ans">Yes. At +12% the quote lands at <b>$48,500</b> with a <b>31.4%</b> margin — above the 28% floor for tier-2 volume. The only pressure is line 3, where the multi-year discount already applies.</div>
        <div className="price" data-callout="price">
          <div className="pr"><span>Onboarding package <small>· tier 2</small></span><span>12 seats</span><span>$18,000</span></div>
          <div className="pr"><span>Import at scale <small>· add-on</small></span><span>1</span><span>$9,500</span></div>
          <div className="pr"><span>Support, 3 years <small>· multi-year −10%</small></span><span>3</span><span>$21,000</span></div>
          <div className="pr"><span>Total · margin 31.4%</span><span>from pricing engine</span><span>$48,500</span></div>
        </div>
        <div className="src"><ChevronRight size={12} />Sources · 2 price rules, 1 policy</div>
        <div className="fb"><span><ThumbsUp size={12} /> Helpful</span><span><ThumbsDown size={12} /> Not helpful</span><span><Copy size={12} /> Copy answer</span></div>
      </div>
      <div className="foot">
        <div className="lock" data-callout="lock"><Lock size={12} /><b>AI proposes · you decide</b><span className="tok">Usage today: 4,120 tok</span></div>
        <div className="comp">Ask about this quote…<span className="go">Ask →</span></div>
      </div>
    </div>
  )
}

/* The timesheet approval assistant: advisory only — a person makes the call. */
export function ApprovalCardMock() {
  return (
    <div className="mk-approval">
      <div className="hd"><Sparkles size={15} color="#7C3AED" />Approval assistant</div>
      <div className="sub">Time off request · Quinn · 4 days · Oct 6–9 · submitted 11 days ahead</div>
      <div className="rec" data-callout="rec"><CheckCircle2 size={16} />Recommend: approve <span className="cf">confidence 0.86</span></div>
      <div className="reasons">
        <div><span className="k">balance</span>12 days remaining after this request.</div>
        <div><span className="k">coverage</span>No overlap with Duke or Jolie; sprint review is Oct 10.</div>
        <div><span className="k">policy</span>Notice of 3+ working days met (requested 11 days ahead).</div>
        <div><span className="k">flag</span><span style={{ color: '#B45309' }}>Customer demo on Oct 8 has Quinn as backup presenter.</span></div>
      </div>
      <div className="btns"><span className="mk-btn">Apply</span><span className="mk-btn ghost">Refuse</span><span className="note" style={{ marginLeft: 'auto', alignSelf: 'center' }}>Expires in 14m</span></div>
      <div className="note"><ShieldCheck size={11} style={{ verticalAlign: -1 }} /> Advisory only — no database writes. The approver always makes the final call.</div>
    </div>
  )
}
