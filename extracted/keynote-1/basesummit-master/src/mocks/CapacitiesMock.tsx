import { Plus, Sparkles, Plug, ChevronRight } from 'lucide-react'
import { Pill } from './parts'

const SKILLS = [
  { n: 'Summarise a thread', i: 'Read the whole thread before writing. Output three sections: Decisions, Owners, Open questions. Never invent an owner — if nobody took it, say "unassigned".' },
  { n: 'Prep my day', i: 'Calendar first, then approvals waiting on me, then what is due today. Three items, no more.' },
  { n: 'Review a diff', i: 'Correctness first, then reuse, then naming. Skip style — the formatter owns that.' },
  { n: 'Write the runbook', i: 'Numbered steps a tired person can follow at 02:00.' },
  { n: 'Draft a decline', i: 'Short, warm, and final. Offer one alternative, never two.', off: true },
]
const CONNS = [
  { n: 'Company wiki', t: 'SSE', ep: 'https://mcp.northwind.com/sse', auth: 'bearer' },
  { n: 'Local files', t: 'stdio', ep: 'npx -y @modelcontextprotocol/server-filesystem ~/Documents', auth: 'none' },
  { n: 'Pricing API', t: 'HTTP', ep: 'https://api.northwind.com/pricing', auth: 'apikey' },
]

/* An assistant's Capacities page: skills in prose, connections by address. */
export function CapacitiesMock() {
  return (
    <div className="mk-pane">
      <div className="ph">
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--mk-muted)', fontWeight: 500, fontSize: 12 }}>Grace <ChevronRight size={12} /></span>Capacities
        <span className="sub">what it can do, and what it can reach</span>
      </div>
      <div className="pb mk-caps">
        <div>
          <div className="sec-h">
            <div><h4>Skills</h4><p>Things it knows how to do, in your words. Each one carries the instructions it follows.</p></div>
            <span className="mk-btn ghost"><Plus size={13} />Add skill</span>
          </div>
          <div className="list" data-callout="skills" style={{ marginTop: 10 }}>
            {SKILLS.map(s => (
              <div key={s.n} className={`cap${s.off ? ' off' : ''}`}>
                <span className="nm"><Sparkles size={13} color={s.off ? '#94A3B8' : '#0891B2'} />{s.n}</span>
                <span className="ins">{s.i}</span>
                <span className={`mk-toggle${s.off ? ' off' : ''}`} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="sec-h">
            <div><h4>Connections</h4><p>Systems it can reach — MCP servers and HTTP endpoints. Credentials are never stored here.</p></div>
            <span className="mk-btn ghost"><Plus size={13} />Add connection</span>
          </div>
          <div className="list" data-callout="connections" style={{ marginTop: 10 }}>
            {CONNS.map(c => (
              <div key={c.n} className="cap">
                <span className="nm"><Plug size={13} color="#2563EB" />{c.n} <Pill kind="grey">{c.t}</Pill></span>
                <span className="ep">{c.ep}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Pill kind="low">auth · {c.auth}</Pill><span className="mk-toggle" /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
