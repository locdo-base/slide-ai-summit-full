import { memo, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Home, LayoutGrid, PanelsTopLeft, Bot, Presentation, SquareFunction, Box, Settings, Sparkles, Check, Loader2, Database, ArrowUpRight, Lock, Star, Lightbulb, MapPin, Calendar, Clock, Users, Car, Video, Ticket, Mail, Zap } from 'lucide-react'
import { SlidePreview } from '../engine/SlidePreview'
import { keynotes } from '../keynotes'
import { useBrand } from '../ui/Brand'
import { ramp, typed, typeTime, T_END } from '../fx/ScenePlayer'
import { Av, PEOPLE } from './parts'
import './studio.css'

/* AI Studio — the desktop app, building something from one prompt. The
   window is the real app's frame (title bar, the sidebar: Home · Apps · Pages
   · Agents · Slides · Functions, Harness · Settings); the builder runs off the
   scene clock: the prompt types itself, Generate is pressed, the build steps
   tick through, and the result rises into the preview. Each scene hands the
   builder its prompt, its steps and the artifact to show. The artifacts are
   seeded with the persona company's own numbers and names, so they read as
   real pages, not placeholders. */

type Nav = 'apps' | 'pages' | 'slides'
const NAV: { key: Nav | 'home' | 'agents' | 'functions'; label: string; Icon: typeof Home }[] = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'apps', label: 'Apps', Icon: LayoutGrid },
  { key: 'pages', label: 'Pages', Icon: PanelsTopLeft },
  { key: 'agents', label: 'Agents', Icon: Bot },
  { key: 'slides', label: 'Slides', Icon: Presentation },
  { key: 'functions', label: 'Functions', Icon: SquareFunction },
]

export interface BuildSpec {
  nav: Nav
  prompt: string
  /** The build's steps: what it reads, designs, writes, connects. */
  steps: { label: string; detail?: string }[]
  /** The kind of thing it made — the preview's tab. */
  kind: string
}

/** Where the clock stands in a build: typing starts at 0.4 s, Generate is
 *  pressed 0.5 s after the last character, steps tick every 0.8 s, and the
 *  artifact appears 0.9 s after the last step. */
export function buildTimes(spec: BuildSpec) {
  const tGo = 0.4 + typeTime(spec.prompt) + 0.5
  const tStep = (k: number) => tGo + 0.4 + k * 0.8
  const tReady = tStep(spec.steps.length - 1) + 0.9
  return { tGo, tStep, tReady }
}

export function StudioBuild({ spec, t, children }: { spec: BuildSpec; t: number; children: ReactNode }) {
  const { tGo, tStep, tReady } = buildTimes(spec)
  const phase = t < tGo ? 'typing' : t < tReady ? 'building' : 'ready'
  const text = typed(spec.prompt, t, 0.4)
  const shown = phase === 'building' ? spec.steps.filter((_, k) => t >= tStep(k)).length : spec.steps.length
  return (
    <div className="sd-window">
      <div className="sd-title">
        <span className="sd-mark"><Sparkles size={11} /></span><b>AI Studio</b>
        <span className="win"><i>—</i><i>▢</i><i>✕</i></span>
      </div>
      <div className="sd-body">
        <aside className="sd-side">
          {NAV.map(n => <div key={n.key} className={`row${n.key === spec.nav ? ' on' : ''}`}><n.Icon size={15} />{n.label}</div>)}
          <span className="sp" />
          <div className="row"><Box size={15} />Harness</div>
          <div className="row"><Settings size={15} />Settings</div>
        </aside>
        <main className={`sd-main ${phase}`}>
          <div className="sd-composer">
            <div className="text">
              {text}{phase === 'typing' && <i className="caret" />}
            </div>
            <div className="foot">
              <span className="chip model"><Sparkles size={11} />Claude Opus 5</span>
              <span className="chip data"><Database size={11} />Base.vn data · connected</span>
              {phase === 'ready'
                ? <span className="built"><Check size={12} />Built in {Math.round(tReady - tGo)}s</span>
                : <span className={`go${phase === 'building' ? ' pressed' : ''}`}>{phase === 'building' ? <><Loader2 size={13} className="spin" />Building…</> : 'Generate'}</span>}
            </div>
          </div>
          {phase === 'building' && (
            <div className="sd-progress">
              {spec.steps.slice(0, shown).map((s, k) => (
                <div key={s.label} className={`row${k === shown - 1 ? ' live' : ''}`}>
                  <i>{k === shown - 1 ? <Loader2 size={12} className="spin" /> : <Check size={12} />}</i>
                  <span>{s.label}</span>{s.detail && <small>{s.detail}</small>}
                </div>
              ))}
            </div>
          )}
          {phase === 'ready' && (
            <div className="sd-preview" style={{ opacity: ramp(t, tReady, 0.5), transform: `translateY(${(1 - ramp(t, tReady, 0.6)) * 18}px)` }}>
              <div className="tabs"><span className="on">Preview</span><span>Code</span><span>Data</span><span className="kind">{spec.kind}</span></div>
              <div className="pane">{children}</div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

/* ── Artifacts ───────────────────────────────────────────────────────────── */

const n0 = (n: number) => Math.round(n).toLocaleString('en-US')

function Kpis({ items, p }: { items: { label: string; value: number; fmt: (v: number) => string; delta?: string; warn?: boolean }[]; p: number }) {
  return (
    <div className="sd-kpis">
      {items.map(k => (
        <div key={k.label} className="kpi">
          <span className="l">{k.label}</span>
          <span className="v">{k.fmt(k.value * p)}</span>
          {k.delta && <span className={`d${k.warn ? ' warn' : ''}`}>{k.delta}</span>}
        </div>
      ))}
    </div>
  )
}

function Bars({ title, sub, rows, p, max, unit }: { title: string; sub?: string; rows: { label: string; value: number }[]; p: number; max: number; unit?: (v: number) => string }) {
  return (
    <div className="sd-card">
      <h5>{title}{sub && <small>{sub}</small>}</h5>
      <div className="sd-bars">
        {rows.map(r => (
          <div key={r.label} className="bar">
            <span className="l">{r.label}</span>
            <span className="track"><i style={{ width: `${(r.value / max) * 100 * p}%` }} /></span>
            <span className="v">{unit ? unit(r.value * p) : n0(r.value * p)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const DEALS: { deal: string; owner: string; stage: string; next: string; value: string }[] = [
  { deal: 'Harbor Logistics — WMS rollout', owner: 'D', stage: 'Negotiation', next: 'Pricing review · Thu 18 Sep', value: '$1.8M' },
  { deal: 'Lee & Ward Corp — CRM + Contract', owner: 'Z', stage: 'Proposal', next: 'Demo for the CFO · Fri 19 Sep', value: '$1.2M' },
  { deal: 'Meadow Retail — 42 stores', owner: 'Q', stage: 'Closing', next: 'Signing · Mon 22 Sep', value: '$960K' },
  { deal: 'Bluefield Pharma — Compliance', owner: 'D', stage: 'Discovery', next: 'Requirements workshop', value: '$740K' },
  { deal: 'Ocean Foods — Sales + DMS', owner: 'Z', stage: 'Negotiation', next: 'Legal redlines', value: '$620K' },
  { deal: 'Northwind Traders — renewal', owner: 'D', stage: 'Closing', next: 'Renewal call · Wed 17 Sep', value: '$580K' },
]

const CRM_RISK: string = 'Harbor Logistics and Ocean Foods have had no activity for 9 days — $2.4M at risk this month.'

/** A CRM report from Base Sales — pipeline by stage, the top deals, one insight. */
export function CrmReport({ p }: { p: number }) {
  const { wordmark } = useBrand()
  return (
    <div className="sd-report">
      <div className="head">
        <div><h4>Sales pipeline — Q3 2026</h4><span>{wordmark} Sales · 1,284 deals in 12 pipelines · 6 owners · updated 2 minutes ago</span></div>
        <span className="src"><Database size={12} />Connected: {wordmark} Sales</span>
      </div>
      <Kpis p={p} items={[
        { label: 'Pipeline value', value: 48.2, fmt: v => `$${v.toFixed(1)}M`, delta: '+12% vs Q2' },
        { label: 'Won this quarter', value: 137, fmt: v => `${n0(v)} deals`, delta: '$21.6M · +21 deals' },
        { label: 'Win rate', value: 31.4, fmt: v => `${v.toFixed(1)}%`, delta: '+2.3 pt' },
        { label: 'Avg. sales cycle', value: 26, fmt: v => `${Math.round(v)} days`, delta: '−4 days vs Q2' },
      ]} />
      <div className="sd-two">
        <Bars title="Pipeline by stage" sub="open deals" p={p} max={520} unit={v => `${n0(v)} deals`} rows={[
          { label: 'Discovery', value: 512 }, { label: 'Qualified', value: 348 }, { label: 'Proposal', value: 214 },
          { label: 'Negotiation', value: 126 }, { label: 'Closing', value: 84 },
        ]} />
        <div className="sd-card">
          <h5>Top deals<small>this month · by value</small></h5>
          <table className="sd-table">
            <colgroup><col style={{ width: '38%' }} /><col style={{ width: '15%' }} /><col style={{ width: '16%' }} /><col style={{ width: '21%' }} /><col style={{ width: '10%' }} /></colgroup>
            <thead><tr><th>Deal</th><th>Owner</th><th>Stage</th><th>Next step</th><th className="r">Value</th></tr></thead>
            <tbody>
              {DEALS.map(d => (
                <tr key={d.deal}>
                  <td>{d.deal}</td>
                  <td><Av p={d.owner} size={16} />{PEOPLE[d.owner].name}</td>
                  {/* `sd-stage`, not `stage`: the deck's stage element owns that class name. */}
                  <td><span className={`sd-stage ${d.stage.toLowerCase()}`}>{d.stage}</span></td>
                  <td>{d.next}</td>
                  <td className="r">{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sd-insight" style={{ opacity: ramp(p, 0.6, 0.4) }}>
        <Lightbulb size={14} /><span><b>Negotiation is 3 days slower than in Q2.</b> {CRM_RISK}</span>
      </div>
    </div>
  )
}

/** A people report from Base HRIS — headcount by team, the hiring funnel. */
export function HrReport({ p }: { p: number }) {
  const { wordmark } = useBrand()
  return (
    <div className="sd-report">
      <div className="head">
        <div><h4>People — September 2026</h4><span>{wordmark} HRIS · 412 employees in 9 teams · Hiring · 17 open roles · updated today 08:00</span></div>
        <span className="src"><Database size={12} />Connected: {wordmark} HRIS · Hiring</span>
      </div>
      <Kpis p={p} items={[
        { label: 'Headcount', value: 412, fmt: v => n0(v), delta: '+23 this month' },
        { label: 'New hires', value: 23, fmt: v => n0(v), delta: '7 Engineering · 6 Sales' },
        { label: 'Attrition, 12 months', value: 4.1, fmt: v => `${v.toFixed(1)}%`, delta: '−0.8 pt vs last year' },
        { label: 'Time to hire', value: 23, fmt: v => `${Math.round(v)} days`, delta: '−5 days' },
      ]} />
      <div className="sd-two even">
        <Bars title="Headcount by team" p={p} max={130} rows={[
          { label: 'Engineering', value: 128 }, { label: 'Sales', value: 96 }, { label: 'Customer Success', value: 54 },
          { label: 'Finance & People', value: 50 }, { label: 'Operations', value: 46 }, { label: 'Marketing', value: 38 },
        ]} />
        <Bars title="Hiring funnel" sub="Q3 · offer acceptance 74%" p={p} max={1840} rows={[
          { label: 'Applied', value: 1840 }, { label: 'Screened', value: 412 }, { label: 'Interviewed', value: 96 },
          { label: 'Offered', value: 31 }, { label: 'Hired', value: 23 },
        ]} />
      </div>
      <div className="sd-insight" style={{ opacity: ramp(p, 0.6, 0.4) }}>
        <Lightbulb size={14} /><span><b>Engineering hires 6 days faster since the referral programme.</b> 9 of 23 hires this quarter came through referrals; Sales still averages 31 days.</span>
      </div>
    </div>
  )
}

const AGENDA: { time: string; title: string; sub: string; tag: 'Keynote' | 'Demo' | 'Networking' }[] = [
  { time: '13:30', title: 'Welcome & networking', sub: 'Main lobby · coffee, check-in from 13:00', tag: 'Networking' },
  { time: '14:00', title: 'Keynote 1 — Intelligence Architecture', sub: 'Eric · Founder & CEO', tag: 'Keynote' },
  { time: '14:45', title: 'Keynote 2 — Service Architecture', sub: 'Brian · COO', tag: 'Keynote' },
  { time: '15:30', title: 'Keynote 3 — Work Architecture', sub: 'Jane · CFO', tag: 'Keynote' },
  { time: '16:15', title: 'Launching Timeline & One more thing', sub: 'Eric · AI Studio, live demo', tag: 'Demo' },
  { time: '17:00', title: 'Networking reception', sub: 'Rooftop · until 19:00', tag: 'Networking' },
]
const WHY: { Icon: typeof Home; title: string; text: string }[] = [
  { Icon: Sparkles, title: 'Intelligence architecture', text: 'Two principles, three architectures — Intelligence, Service, Work — to reorganise the enterprise for the AI era.' },
  { Icon: Zap, title: 'The Agentic OS launch', text: 'A new platform after ten years: 62 apps, one shared model of work for people and Agents.' },
  { Icon: Bot, title: 'AI Studio, live on stage', text: 'One prompt, one app running on Base.vn — reports, landing pages, slides — built right at the event.' },
]
const SPEAKERS: { p: string; topic: string }[] = [
  { p: 'E', topic: 'Intelligence Architecture · Launching Timeline' },
  { p: 'B', topic: 'Service Architecture — everything is a service' },
  { p: 'J', topic: 'Work Architecture — Tasks, Rules, Outputs' },
  { p: 'H', topic: 'Programme host · Q&A' },
]
const ADDRESS: string = '8 Harbor Street, District 1'

/** A landing page for the summit — in the preview's own browser: hero with a
 *  ticket card, the numbers, why attend, the timetable, speakers, venue,
 *  registration, footer. Builds in on `p`, then rolls down on `scroll`. */
export function LandingPage({ p, scroll = 0 }: { p: number; scroll?: number }) {
  const { domain, wordmark } = useBrand()
  const view = useRef<HTMLDivElement>(null)
  const flow = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ view: 0, page: 0 })
  // the page's height follows its copy, so it is measured again when the language changes
  useLayoutEffect(() => {
    const v = view.current, f = flow.current
    if (v && f) setDims({ view: v.clientHeight, page: f.scrollHeight })
  }, [])
  const max = Math.max(0, dims.page - dims.view)
  const y = scroll * max
  const thumbH = dims.page ? (dims.view * dims.view) / dims.page : 0
  const thumbY = dims.page ? (y / dims.page) * dims.view : 0
  const at = (from: number) => ({ opacity: ramp(p, from, 0.5), transform: `translateY(${(1 - ramp(p, from, 0.5)) * 10}px)` })
  return (
    <div className="sd-landing">
      <div className="url"><Lock size={10} />aisummit2026.{domain}</div>
      <div className="site">
        <div className="nav">
          <b><i><Sparkles size={11} /></i>AI Summit <span>2026</span></b>
          <span className="links">{'Agenda · Speakers · Venue · Partners · FAQ'}</span>
          <span className="cta sm">{'Register'}</span>
        </div>
        <div className="view" ref={view}>
          <div className="flow" ref={flow} style={{ transform: `translateY(${-y}px)` }}>
            <div className="hero">
              <div className="words">
                <span className="kicker" style={at(0)}><Calendar size={11} />{'Thu 24 Sep 2026 · 13:30'}<i /><MapPin size={11} />{'GEM Center, Ho Chi Minh City'}</span>
                <h1 style={at(0.12)}>Welcome to the Future:<br />The Intelligence Economy</h1>
                <p style={at(0.28)}>{`Four keynotes on intelligence architecture for the enterprise — Intelligence, Service, Work — and the launch timeline for the Agentic OS, ${wordmark}'s new platform.`}</p>
                <div className="ctas" style={at(0.4)}><span className="cta">{'Register now'}</span><span className="ghost">{'See the agenda'} <ArrowUpRight size={12} /></span></div>
              </div>
              <div className="ticket" style={at(0.34)}>
                <div className="tk-head"><Ticket size={13} /><b>{'Invitation'}</b><span>{`Free for ${wordmark} customers`}</span></div>
                <div className="count"><div><b>12</b><span>{'days'}</span></div><div><b>04</b><span>{'hours'}</span></div><div><b>26</b><span>{'min'}</span></div></div>
                <div className="seats"><span>{'148 of 600 seats left'}</span><i><i style={{ width: '75%' }} /></i></div>
                <div className="tk-foot"><Check size={11} />{'Confirmation by email within 24 hours'}</div>
              </div>
            </div>
            <div className="stats" style={at(0.5)}>
              <div><b>600+</b><span>{'business leaders'}</span></div>
              <div><b>4</b><span>{'keynotes'}</span></div>
              <div><b>24</b><span>{'speakers & guests'}</span></div>
              <div><b>62</b><span>{'apps launching'}</span></div>
            </div>
            <div className="sec why" style={at(0.6)}>
              <h6>{'Why attend'}</h6>
              <div className="cards">
                {WHY.map(w => <div key={w.title}><i><w.Icon size={16} /></i><b>{w.title}</b><span>{w.text}</span></div>)}
              </div>
            </div>
            <div className="sec timetable">
              <div className="sec-head"><h6>{'Agenda'}</h6><span>{'Thu 24 Sep · 13:30 — 19:00 · GEM Center'}</span></div>
              {AGENDA.map(a => (
                <div key={a.time} className="row">
                  <b>{a.time}</b>
                  <div><span className="t">{a.title}</span><span className="s">{a.sub}</span></div>
                  {/* `tag-demo`, not `demo`: that bare word is the player's layout class. */}
                  <span className={`tag tag-${a.tag.toLowerCase()}`}>{a.tag}</span>
                </div>
              ))}
            </div>
            <div className="sec speakers">
              <div className="sec-head"><h6>{'Speakers'}</h6><span>{`The ${wordmark} team`}</span></div>
              <div className="cards">
                {SPEAKERS.map(s => (
                  <div key={s.p}><Av p={s.p} size={44} /><b>{PEOPLE[s.p].name}</b><small>{PEOPLE[s.p].role} · {wordmark}</small><span>{s.topic}</span></div>
                ))}
              </div>
            </div>
            <div className="sec venue">
              <div className="map">
                <div className="grid" /><div className="road h" /><div className="road v" />
                <div className="pin"><MapPin size={14} /></div>
                <div className="label"><b>GEM Center</b><span>{ADDRESS}</span></div>
              </div>
              <div className="facts">
                <h6>{'Venue'}</h6>
                <div><Clock size={13} /><b>13:00</b><span>{'check-in opens'}</span></div>
                <div><Car size={13} /><b>{'Basement B1–B2'}</b><span>{'free parking'}</span></div>
                <div><Users size={13} /><b>Business casual</b><span>dress code</span></div>
                <div><Video size={13} /><b>Livestream</b><span>{"for guests who can't attend"}</span></div>
              </div>
            </div>
            <div className="register">
              <div><h6>{'Register to attend'}</h6><p>{`Free for ${wordmark} customers. Seating is limited — priority goes to executives and department heads.`}</p></div>
              <div className="form">
                <span>{'Full name'}</span><span>{'Work email'}</span><span>{'Company'}</span><span>{'Job title'}</span><span className="cta">{'Save my seat'}</span>
              </div>
            </div>
            <div className="foot">
              <span>© 2026 {wordmark} · AI Summit</span>
              <span><Mail size={11} />summit@{domain}</span>
              <span>{'Terms · Privacy'}</span>
            </div>
          </div>
          {max > 0 && <i className="scrollbar"><i style={{ height: thumbH, transform: `translateY(${thumbY}px)` }} /></i>}
        </div>
      </div>
    </div>
  )
}

/** The slide deck — this very keynote's slides, drawn by the deck itself. */
const Thumbs = memo(function Thumbs({ shown }: { shown: number }) {
  const launch = keynotes.find(k => k.id === 'launch')
  const slides = (launch?.slides ?? []).filter(s => s.id !== 'one-more-thing')
  return (
    <div className="sd-thumbs">
      {slides.map((s, k) => (
        <div key={s.id} className={`thumb${k < shown ? ' on' : ''}`}>
          {/* The preview fills a positioned box; the box keeps the stage's ratio. */}
          <div className="box">
            <SlidePreview component={s.component} title={s.title} crumb={s.crumb} step={s.steps ?? 0} still
              deck={{ title: launch?.title ?? '', chapters: launch?.chapters ?? [] }} />
          </div>
          <span>{k + 1} · {s.title}</span>
        </div>
      ))}
    </div>
  )
})

export function SlidesDeck({ p }: { p: number }) {  const shown = Math.floor(p * 7)
  return (
    <div className="sd-slides">
      <div className="head">
        <div><h4>Lộ trình ra mắt</h4><span>{'10 slides · 2 : 1 · Be Vietnam Pro + Inter · speaker notes · AI Summit 2026'}</span></div>
        <span className="src"><Star size={12} />Made with AI Studio › Slides · Claude Code</span>
      </div>
      <Thumbs shown={shown} />
    </div>
  )
}

/* ── The four builds the demo runs ───────────────────────────────────────── */

/** The prompts name the product, so they follow the configured brand — and the
 *  language: the prompt is resolved here, so `buildTimes` (which types it out)
 *  times each build by the prompt actually shown. */
export function useSpecs(): Record<'crm' | 'hr' | 'landing' | 'slides', BuildSpec> {
  const { wordmark, domain } = useBrand()
  return useMemo(() => ({
    crm: {
      nav: 'apps', kind: 'App · report',
      prompt: `Tạo báo cáo CRM cho đội Sales: pipeline theo giai đoạn, top deal trong tháng, tỷ lệ thắng — dùng dữ liệu từ ${wordmark} Sales.`,
      steps: [
        { label: `Reading your ${wordmark} data`, detail: 'Sales · 1,284 deals · 12 pipelines · 6 owners' },
        { label: 'Designing the report', detail: '4 KPIs · pipeline by stage · top deals · 1 insight' },
        { label: 'Writing the app', detail: 'React · 4 components · 2 queries' },
        { label: `Connecting to ${wordmark}`, detail: 'deals, pipelines, owners, activities' },
      ],
    },
    hr: {
      nav: 'apps', kind: 'App · report',
      prompt: `Tạo báo cáo nhân sự tháng 9: nhân sự theo team, tuyển dụng, nghỉ việc — từ ${wordmark} HRIS.`,
      steps: [
        { label: `Reading your ${wordmark} data`, detail: 'HRIS · 412 employees · Hiring · 17 open roles' },
        { label: 'Designing the report', detail: '4 KPIs · headcount by team · hiring funnel' },
        { label: 'Writing the app', detail: 'React · 3 components · 2 queries' },
        { label: `Connecting to ${wordmark}`, detail: 'employees, teams, candidates, offers' },
      ],
    },
    landing: {
      nav: 'pages', kind: 'Page · landing',
      prompt: 'Tạo landing page cho sự kiện AI Summit 2026.',
      steps: [
        { label: 'Reading the brief', detail: 'AI Summit 2026 · 24 Sep · GEM Center · 4 keynotes' },
        { label: 'Designing the page', detail: 'hero · agenda · speakers · registration' },
        { label: 'Writing the page', detail: '4 sections · responsive · English copy' },
        { label: 'Publishing a preview', detail: `aisummit2026.${domain}` },
      ],
    },
    slides: {
      nav: 'slides', kind: 'Deck · 7 slides',
      prompt: 'Tạo bộ slide keynote “Lộ trình ra mắt” cho AI Summit 2026: lộ trình, khách hàng hiện tại, sản phẩm mới.',
      steps: [
        { label: 'Reading the outline', detail: '7 slides · 4 chapters · speaker notes' },
        { label: 'Designing the deck', detail: '2 : 1 stage · Be Vietnam Pro · navy, one blue' },
        { label: 'Building the slides with Claude Code', detail: 'React · motion · 7 slides · 3 product mocks' },
        { label: 'Rendering previews' },
      ],
    },
  }), [wordmark, domain])
}

/** The CRM build on its last frame — the gallery's still of the window. */
export function StudioBuilderStill() {
  const s = useSpecs()
  return <StudioBuild spec={s.crm} t={T_END}><CrmReport p={1} /></StudioBuild>
}
