import { MessageSquare, Globe, Headphones, Terminal, Puzzle, Settings, RefreshCw, Sparkles, ChevronRight, ChevronDown } from 'lucide-react'
import { useBrand, type BrandInfo } from '../ui/Brand'

/* Amber Desktop — the Assistant view: sessions | chat | environment.
   Labels and layout follow the real app (68px rail, 300px environment
   sidebar, model picker, tool-call rows, composer placeholder). */

const apps = (b: BrandInfo) => [
  { name: 'Google Chrome', title: `${b.wordmark} — Tasks · Home`, fg: true },
  { name: 'Microsoft Excel', title: 'Northwind Q3 forecast.xlsx' },
  { name: 'Outlook', title: 'Inbox — 14 unread' },
  { name: 'Slack', title: '#sales-emea' },
  { name: 'Figma', title: 'Onboarding flow v1' },
  { name: 'Windows Terminal', title: 'pwsh' },
]
const tabs = (b: BrandInfo) => [
  { title: 'Northwind — Pipeline', url: `${b.domain}/app/sales` },
  { title: 'useEffect – React', url: 'react.dev' },
  { title: 'Contract D-2291 — Contracts', url: `${b.domain}/app/contract` },
]

export function AmberMock() {
  const brand = useBrand()
  const APPS = apps(brand), TABS = tabs(brand)
  return (
    <div className="am-window">
      <div className="am-title">
        <span className="am-logo">A</span><span className="wm">Amber</span>
        <span className="route">/chat</span>
        <span className="user"><i>E</i>Eric Pham</span>
      </div>
      <div className="am-body">
        <div className="am-rail">
          <div className="on"><MessageSquare size={18} />Assistant</div>
          <div><Globe size={18} />Browser</div>
          <div><Headphones size={18} />Listen</div>
          <span className="sp" />
          <div><Terminal size={18} />Sandbox</div>
          <div><Puzzle size={18} />Plugins</div>
          <div><Settings size={18} />Settings</div>
        </div>

        <div className="am-sessions">
          <div className="new">+ New chat</div>
          <div className="row on">Northwind renewal prep</div>
          <div className="row">Parse Q3 forecast CSV</div>
          <div className="row">Summarize useEffect docs</div>
          <div className="row">New chat</div>
        </div>

        <div className="am-chat">
          <div className="am-chat-head">
            <h4>Assistant</h4>
            <span className="model"><i />Anthropic (Claude) · claude-opus-5 <ChevronDown size={12} /></span>
            <span className="clear">Clear</span>
          </div>
          <div className="am-msgs">
            <div className="am-msg user">What am I working on right now?</div>
            <div className="am-msg bot">
              <span className="role">Amber</span>
              <div className="am-think"><Sparkles size={12} />Thought process <ChevronRight size={12} /></div>
              <div className="am-tool"><i /><code>list_running_apps</code> 6 windows <span className="st">done</span></div>
              <div className="am-tool"><i /><code>list_browser_tabs</code> 3 tabs <span className="st">done</span></div>
              <div>You're in {brand.wordmark} Tasks on FAC-518 (the HVAC repair), with the Northwind Q3 forecast open in Excel and the Northwind pipeline tab beside it. Outlook has 14 unread.</div>
            </div>
            <div className="am-msg user">Open the Northwind deal and draft the renewal email from the forecast.</div>
            <div className="am-msg bot">
              <span className="role">Amber</span>
              <div className="am-think"><Sparkles size={12} />Thought process <ChevronRight size={12} /></div>
              <div className="am-tool"><i /><code>browser_open</code> {brand.domain}/app/sales/deals/D-2291 <span className="st">done</span></div>
              <div className="am-tool"><i /><code>browser_read_page</code> 4,120 chars <span className="st">done</span></div>
              <div className="am-tool"><i className="run" /><code>run_code</code> python · forecast.csv → renewal figures <span className="st">running…</span></div>
            </div>
          </div>
          <div className="am-composer">
            <div className="ph">Ask Amber to do something — it can see your apps, drive the browser, and run code…</div>
            <span className="send">Send</span>
          </div>
        </div>

        <div className="am-env" data-callout="env">
          <h5>Environment <RefreshCw size={12} style={{ marginLeft: 'auto', color: 'var(--am-dim)' }} /></h5>
          <div className="sec">
            <b>Focused</b>
            <div className="focused">{brand.wordmark} — Tasks · Home — Google Chrome</div>
          </div>
          <div className="sec">
            <b>Running apps <span>{APPS.length}</span></b>
            {APPS.map(a => <div key={a.name} className="row"><i className={a.fg ? 'fg' : undefined} />{a.name}<small>· {a.title}</small></div>)}
          </div>
          <div className="sec">
            <b>Browser tabs <span>{TABS.length}</span></b>
            {TABS.map(t => <div key={t.title} className="row"><i />{t.title}<small>· {t.url}</small></div>)}
          </div>
          <div className="foot">updated 10:42:03 AM · everything stays on this machine</div>
        </div>
      </div>
    </div>
  )
}
