import { motion, useReducedMotion } from 'motion/react'
import { APP_GROUPS, type AppGroup, type AppTile } from './apps.generated'

/* The platform's app launcher — the Applications tab of the Company dialog
   (platform/frontend/components/AppsLauncher.jsx) — drawn as a page: group
   sections in platform.json order, each a two-column grid of tiles (mark,
   name, one-line purpose). The marks are the svgs the public app serves at
   /fav/{appkey}, rendered ahead of time by scripts/app-icons.mjs so the deck
   needs no network in the hall.

   Three newspaper columns, read top to bottom then across — every group on
   one page (a two-page split, one click apart, was tried and Eric preferred
   the whole line-up at once). The split is by hand so the columns land
   level; a group left out of it (Platform & Core services — plumbing, not a
   product brand) is not shown. */
const COLUMNS: string[][] = [
  ['aiops', 'salesops', 'marketingops'],
  ['workops', 'workforce'],
  ['peopleops', 'comops', 'automations'],
]

const byKey = new Map(APP_GROUPS.map(g => [g.key, g]))
const columns = COLUMNS.map(keys => keys.map(k => byKey.get(k)).filter((g): g is AppGroup => !!g))

/** The number of apps the page shows — for the notes and the doc. */
export const APPS_SHOWN = columns.flat().reduce((n, g) => n + g.apps.length, 0)

/* Each mark is its own document: the builder's gradient ids repeat from icon
   to icon, so inlining the svgs would make every tile borrow the first one's
   fill. */
const src = (svg: string) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)

function Tile({ app }: { app: AppTile }) {
  return (
    <div className="mk-apps-tile" data-callout={app.key}>
      <img src={src(app.svg)} alt="" />
      <div className="mk-apps-body">
        <div className="mk-apps-label">{app.name}</div>
        {app.title && <div className="mk-apps-sub">{app.title}</div>}
      </div>
    </div>
  )
}

export function AppsGrid() {
  const reduce = useReducedMotion()
  let order = 0
  return (
    <div className="mk-apps">
      {columns.map((groups, c) => (
        <div key={c} className="mk-apps-col">
          {groups.map(g => {
            const i = order++
            return (
              <motion.section key={g.key} className="mk-apps-section"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.25 + i * 0.09, ease: [0.2, 0.8, 0.2, 1] }}>
                <div className="mk-apps-heading">{g.name}</div>
                <div className="mk-apps-grid">
                  {g.apps.map(a => <Tile key={a.key} app={a} />)}
                </div>
              </motion.section>
            )
          })}
        </div>
      ))}
    </div>
  )
}
