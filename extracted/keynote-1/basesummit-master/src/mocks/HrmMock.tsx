import { Home, Settings, Bell, Plus, Search, Users, FileText, Briefcase, ListChecks, QrCode, FolderOpen, Inbox, CalendarOff, ShieldCheck, Receipt, Gift, BookOpen, Lightbulb, Award, ChevronDown, Filter, ArrowUpDown, Rows3 } from 'lucide-react'
import './thirdparty.css'

/* The Base HRM employees list, as the screenshot shows it: the dark
   navigation, the tabbed overview, the toolbar, and the register at real
   density — the store of employee records. Drawn compact (680px) so it sits
   beside the Salesforce board. */

// Invented people — the screenshot's real register must not go on stage.
const ROWS: [string, string, string, string, string, string][] = [
  ['Oliver Grant', 'BASE-0001', '@ogrant', 'CEO', '02/08/2016', '#F59E0B'],
  ['Samuel Reed', 'BASE-0003', '@sreed', 'CIO', '03/10/2016', '#2563EB'],
  ['Emily Carter', 'BASE-0010', '@ecarter', 'Business Development Manager', '13/12/2016', '#DB2777'],
  ['Nathan Brooks', 'BASE-0016', '@nbrooks', 'CRM Marketing Expert', '29/08/2017', '#0891B2'],
  ['Sophie Bennett', 'BASE-0021', '@sbennett', 'Director of Customer Success', '09/10/2017', '#7C3AED'],
  ['Thomas Hale', 'BASE-0034', '', 'Middle Business Consulting Team', '05/05/2018', '#64748B'],
  ['Chloe Morgan', 'BASE-0036', '@cmorgan', 'Customer Onboarding Manager', '05/05/2018', '#16A34A'],
  ['Liam Foster', 'BASE-0047', '@lfoster', 'Customer Development Specialist', '11/06/2018', '#EA580C'],
  ['Hannah Wells', 'BASE-0067', '@hwells', 'Acting Business Consulting Lead', '11/08/2018', '#2563EB'],
  ['Ethan Parker', 'BASE-0079', '@eparker', 'Deputy Director of Revenue', '24/09/2018', '#0891B2'],
  ['Grace Turner', 'BASE-0081', '@gturner', 'Operation Manager', '24/09/2018', '#DB2777'],
  ['Owen Mitchell', 'BASE-0103', '@omitchell', 'Customer Development Specialist', '17/12/2018', '#7C3AED'],
]

const SIDE: { grp: string; rows: [string, typeof Users][] }[] = [
  { grp: 'Base Inc', rows: [['Employees', Users], ['Contracts', FileText], ['Careers', Briefcase], ['Job function assignments', ListChecks], ['Checkin codes', QrCode], ['Employee document', FolderOpen], ['Requests', Inbox]] },
  { grp: 'Policies', rows: [['Time-offs', CalendarOff], ['Insurances', ShieldCheck], ['Taxes', Receipt], ['Benefits', Gift]] },
  { grp: 'Work rule', rows: [['Work rules', BookOpen], ['Intellectual properties', Lightbulb]] },
  { grp: 'Merits, recognitions', rows: [['Awards', Award]] },
]

export function HrmMock() {
  return (
    <div className="hrm">
      <div className="hrm-rail">
        <span className="av" />
        <Home /><Settings /><Bell /><Plus />
      </div>
      <div className="hrm-side">
        <div className="org">Base Inc<small>Human resource management</small></div>
        <div className="search"><Search size={9} />Search anything …</div>
        {SIDE.map(s => (
          <div key={s.grp}>
            <div className="grp">{s.grp}<ChevronDown size={10} /></div>
            {s.rows.map(([label, Icon]) => (
              <div key={label} className={`row${label === 'Employees' ? ' on' : ''}`}><Icon /><span>{label}</span></div>
            ))}
          </div>
        ))}
      </div>
      <div className="hrm-main">
        <div className="hrm-head"><h1>Employees</h1><span className="new">Create new</span></div>
        <div className="hrm-tabs">
          <span className="on">OVERVIEW</span><span>SALARIES &amp; OFFERS</span><span>TAXES &amp; LEGALS</span><span>TIMES &amp; ATTENDANCES</span>
          <span className="views"><span>☰ All views</span><span>+ Add view</span></span>
        </div>
        <div className="hrm-tools">
          <span className="q"><Search />Search employees</span>
          <span>Active employees <ChevronDown /></span>
          <span className="on"><Filter />Filters (1)</span>
          <span><ArrowUpDown />Sort</span>
          <span><Rows3 />Row height: Short</span>
        </div>
        <div className="hrm-table">
          <div className="hrm-tr h"><span className="cb" /><span>EMPLOYEE</span><span>CODE</span><span>ACCOUNT</span><span>STATUS</span><span>JOB TITLE</span><span>STARTED</span></div>
          {ROWS.map(([name, code, acct, title, started, color]) => (
            <div key={code} className="hrm-tr">
              <span className="cb" />
              <span className="who"><i style={{ background: color }} />{name}</span>
              <span className="code">{code}</span>
              <span className="acct">{acct}</span>
              <span className="st">Official</span>
              <span>{title}</span>
              <span className="acct">{started}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
