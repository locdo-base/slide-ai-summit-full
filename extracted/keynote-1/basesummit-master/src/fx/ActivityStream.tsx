import type { CSSProperties } from 'react'

const LINES = [
  'Moved deal D-2291 to Negotiation',
  'Closed ticket #4412',
  'Signed NDA with Northwind',
  'Approved expense claim',
  'Sent proposal to Contoso',
  'Merged pull request #812',
  'Rescheduled onboarding call',
  'Commented on WR-1188',
  'Uploaded Q3 forecast v4',
  'Completed compliance training',
  'Replied in #sales-emea',
  'Logged 2h on Import wizard',
  'Marked job A-3021 as done',
  'Created request: laptop for new hire',
  'Updated forecast for Northwind',
  'Attended weekly pipeline review',
]

/** An endless, slightly restless log of what people did today. HTML, because
 *  a looping vertical marquee is one CSS animation. */
export function ActivityStream({ width = 480, height = 560, style }: { width?: number; height?: number; style?: CSSProperties }) {
  const list = [...LINES, ...LINES]
  return (
    <div className="stream" style={{ width, height, ...style }}>
      <ul>
        {list.map((l, i) => <li key={i} style={{ opacity: 0.45 + ((i * 7) % 5) * 0.11 }}>{l}</li>)}
      </ul>
    </div>
  )
}
