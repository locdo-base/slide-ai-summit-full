import { Search, Star, ChevronDown, X, Crown, Phone, History, StickyNote, ArrowRight } from 'lucide-react'
import './thirdparty.css'

/* A Salesforce Lightning opportunities board, as the screenshot shows it:
   the console tabs, the list-view header, the stage path with a pipeline
   total per column, cards with account and warning — and the pipeline
   donut. Drawn compact (680px) so it sits beside the HRM list. */

interface Card { name: string; amount: string; account: string }
const STAGES: { name: string; n: number; total: string; cards: Card[] }[] = [
  { name: 'Qualification', n: 37, total: '$1,747,375', cards: [
    { name: 'Allied Technologies - New Business', amount: '$20,000.00', account: 'Allied Technologies' },
    { name: 'Amptech Corporation - Add-On', amount: '$61,550.00', account: 'Amptech Corporation' },
    { name: 'Big Sky & Sons - Add-On Business', amount: '$72,000.00', account: 'Big Sky & Sons' },
    { name: 'Biospan, LLC. - Services', amount: '$77,700.00', account: 'Biospan, LLC.' },
  ] },
  { name: 'Needs Analysis', n: 30, total: '$1,396,291', cards: [
    { name: 'Advanced Communications - Services', amount: '$40,000.00', account: 'Advanced Communications' },
    { name: 'Allied Technologies - Add-On', amount: '$26,000.00', account: 'Allied Technologies' },
    { name: 'Amptech Corporation - Add-On', amount: '$81,100.00', account: 'Amptech Corporation' },
    { name: 'Amptech Corporation - Services', amount: '$41,000.00', account: 'Amptech Corporation' },
  ] },
  { name: 'Proposal/Quote', n: 4, total: '$328,250', cards: [
    { name: 'Employnet - Services - 12 mo', amount: '$100,500.00', account: 'Employnet' },
    { name: 'Haven Enterprises - Add-On', amount: '$61,500.00', account: 'Haven Enterprises' },
    { name: 'Southern Sound Co. - Add-On', amount: '$124,600.00', account: 'Southern Sound Co.' },
    { name: 'Towson Inc. - Add-On Business', amount: '$41,650.00', account: 'Towson Inc.' },
  ] },
  { name: 'Negotiation', n: 4, total: '$207,350', cards: [
    { name: 'Opportunity Resources Inc - Add-On', amount: '$41,000.00', account: 'Opportunity Resources Inc' },
    { name: 'Tyconet - Add-On Business', amount: '$70,000.00', account: 'Tyconet' },
    { name: 'Opportunity Resources Inc - New', amount: '$55,250.00', account: 'Opportunity Resources Inc' },
    { name: 'Tyconet - New Business', amount: '$41,100.00', account: 'Tyconet' },
  ] },
  { name: 'Closed Won', n: 2, total: '$124,700', cards: [
    { name: 'Big Sky & Sons - Add-On Business', amount: '$66,000.00', account: 'Big Sky & Sons' },
    { name: 'Tech Labs - Add-On Business', amount: '$58,700.00', account: 'Tech Labs' },
  ] },
]

/** The pipeline-by-stage donut: seven slices in Lightning's chart palette. */
function Donut() {
  const slices: [number, string][] = [[0.28, '#1B96FF'], [0.18, '#032D60'], [0.15, '#0D9DDA'], [0.14, '#04A5A5'], [0.12, '#E4C07A'], [0.08, '#DD7A01'], [0.05, '#BA0517']]
  const r = 30, cx = 44, cy = 44, C = 2 * Math.PI * r
  let acc = 0
  return (
    <svg width={88} height={88} viewBox="0 0 88 88">
      {slices.map(([f, c], i) => {
        const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth={16} strokeDasharray={`${f * C} ${C}`} strokeDashoffset={-acc * C} transform={`rotate(-90 ${cx} ${cy})`} />
        acc += f
        return el
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill="#181818" fontFamily="inherit">8.9M</text>
    </svg>
  )
}

export function SalesforceMock() {
  return (
    <div className="sf">
      <div className="sf-top">
        <span className="logo" />
        <span className="q"><Search />Search Opportunities and more…</span>
        <span className="icons"><Star /><ChevronDown /><span className="me" /></span>
      </div>
      <div className="sf-tabs">
        <span className="app"><i />Lightning Sales Co…</span>
        <span className="on">Opportunities</span>
        <span><Star />Bennie Caudle <ChevronDown /><X /></span>
        <span>Advanced Commun… <ChevronDown /><X /></span>
        <span>Ben Seale <ChevronDown /><X /></span>
      </div>
      <div className="sf-head">
        <span className="crown"><Crown /></span>
        <span><div className="k">OPPORTUNITIES</div><div className="t">* My Open Opportunities ▾</div></span>
        <span className="new">New</span>
      </div>
      <div className="sf-meta">77 items • Sorted by Amount • Updated a minute ago<span className="btns"><i /><i /><i /><i className="on" /><i /></span></div>
      <div className="sf-body">
        <div className="sf-board">
          {STAGES.map(s => (
            <div key={s.name} className="sf-col">
              <div className="sf-stage">{s.name} ({s.n})</div>
              <div className="sf-sum">{s.total}</div>
              {s.cards.map(c => (
                <div key={c.name} className="sf-card">
                  <span className="n">{c.name}<ChevronDown /></span>
                  <span className="a">{c.amount}</span>
                  <span className="c">{c.account}</span>
                  <span className="s">{s.name}<i /></span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="sf-charts">
          <div className="h">Charts <ArrowRight size={10} /></div>
          <div className="sel">Pipeline By Stage <ChevronDown size={9} /></div>
          <Donut />
          <div className="row"><span>Qualification</span><span>1,963,125</span></div>
          <div className="row"><span>Needs Analysis</span><span>1,585,019.5</span></div>
          <div className="row"><span>Value Proposition</span><span>1,341,890.4</span></div>
        </div>
      </div>
      <div className="sf-foot"><span><Phone />Phone</span><span><History />History</span><span><StickyNote />Notes</span></div>
    </div>
  )
}
