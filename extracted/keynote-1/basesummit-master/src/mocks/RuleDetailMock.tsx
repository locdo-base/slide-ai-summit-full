import { Home, BookOpen, ClipboardList, Inbox, Hash, Archive, Sparkles, Search, Paperclip, ChevronRight, Building2, Layers, ClipboardCheck } from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Pill } from './parts'

const RAIL = [
  { key: 'rules', label: 'Rules', Icon: BookOpen },
  { key: 'tasks', label: 'Tasks', Icon: Layers },
  { key: 'assessment', label: 'Assessment', Icon: ClipboardCheck },
  { key: 'company', label: 'Company', Icon: Building2 },
]

/* A published rule: the page people read on the left, the briefing agents
   read on the right — written by the platform on publish. */
export function RuleDetailMock() {
  return (
    <>
      <TopBar placeholder="Search rules…" />
      <div className="mk-app">
        <Rail active="rules" items={RAIL} />
        <div className="mk-side">
          <div className="title"><BookOpen size={15} />Work rules</div>
          <SideRow icon={<Home size={15} />} label="Home" />
          <SideRow icon={<BookOpen size={15} />} label="Rules" on />
          <SideRow icon={<ClipboardList size={15} />} label="Assignments" />
          <SideRow icon={<Inbox size={15} />} label="Inbox" />
          <Sec>SERVICES</Sec>
          <SideRow ltr="P" color="#2563EB" label="Policies" chev />
          <SideRow ltr="G" color="#16A34A" label="Guidelines" chev />
          <SideRow ltr="S" color="#7C3AED" label="Skills" chev />
          <SideRow ltr="P" color="#0891B2" label="Playbooks" chev />
          <Sec>CHANNELS</Sec>
          <SideRow icon={<Hash size={14} />} label="all-staff" />
          <SideRow icon={<Hash size={14} />} label="finance" />
          <SideRow icon={<Hash size={14} />} label="sales" />
          <Sec>&nbsp;</Sec>
          <SideRow icon={<Archive size={15} />} label="Archived" />
          <div data-callout="ask"><SideRow icon={<Sparkles size={15} />} label="Ask Workrules" /></div>
        </div>
        <div className="mk-main">
          <div className="mk-search" data-callout="search">
            <Search size={15} />what is the meal allowance on a two-day trip?
            <span className="modes"><span>keyword</span><span className="on">by meaning</span><span>ask</span></span>
          </div>
          <div className="mk-rule-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--mk-muted)' }}>Policies <ChevronRight size={12} /> Finance</div>
            <h3>Travel and expense policy</h3>
            <div className="badges">
              <Pill kind="grey"><Hash size={10} />all-staff</Pill><Pill kind="grey"><Hash size={10} />finance</Pill><Pill kind="green">Published</Pill>
              <span className="meta" style={{ marginLeft: 8 }}>POL-014 · v3 · Updated 2 days ago · Attestation required</span>
            </div>
          </div>
          <div className="mk-rule-tabs">
            <span className="on">Overview</span><span>Versions</span><span>Announcements</span><span>Activity</span><span>Linked</span>
          </div>
          <div className="mk-rule-body">
            <div className="mk-doc">
              <h4>1. Purpose</h4>
              <p>This policy sets out what the company reimburses for business travel, the approval required before travel is booked, and the evidence needed for every claim.</p>
              <h4>2. Approval</h4>
              <p>Trips over $1,500 in total cost require approval from the budget owner before booking. International travel additionally requires approval from the CFO.</p>
              <h4>3. Allowances</h4>
              <ul>
                <li>Meals: up to $60 per day domestic, $85 per day international. Alcohol is not reimbursable.</li>
                <li>Lodging: standard room at a company-preferred hotel; exceptions need written approval.</li>
                <li>Ground transport: taxis and ride-hailing when public transport is impractical.</li>
              </ul>
              <h4>4. Claims</h4>
              <p>Submit claims within 30 days of return with itemised receipts. Claims over 30 days need the CFO's approval and may be declined.</p>
              <div className="attach">
                <span><Paperclip size={12} />Per-diem matrix 2026.xlsx</span><span><Paperclip size={12} />Preferred hotels.pdf</span><span><Paperclip size={12} />Claim form.docx</span>
              </div>
            </div>
            <div className="mk-guide" data-callout="guide">
              <div className="gh"><Sparkles size={14} />Agent guide <span className="sub">regenerated on publish</span></div>
              <div className="gb">
                <p>Reimburses approved business travel; claims need receipts within 30 days.</p>
                <p><b>Scope</b> — all employees; contractors only if the SOW says so.</p>
                <p><b>Requirements</b></p>
                <ol>
                  <li>Trip &gt; $1,500 total → budget owner approves before booking.</li>
                  <li>International → CFO approval as well.</li>
                  <li>Meals ≤ $60/day domestic, ≤ $85/day international; no alcohol.</li>
                  <li>Claim ≤ 30 days after return, itemised receipts attached.</li>
                </ol>
                <p><b>Exceptions</b> — lodging above standard with written approval; late claims only with CFO approval. Authority for rates: <i>Per-diem matrix 2026.xlsx</i>.</p>
              </div>
              <div className="gf"><b>240 tokens</b> · from 3,100 in the page and attachments · read by agents before acting</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
