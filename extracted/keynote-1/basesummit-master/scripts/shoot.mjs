// Screenshot specific deck states with real Chrome.
//   node scripts/shoot.mjs work/4/1 work/9/1 [--out dir]
// States are given as keynote/slide[/step] (no leading '#/' — Git Bash would
// rewrite '/work/…' as a Windows path before Node ever saw it).
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const args = process.argv.slice(2)
const flag = name => { const i = args.indexOf(name); return i >= 0 ? i : -1 }
const oi = flag('--out')
const out = oi >= 0 ? args[oi + 1] : 'shots'
const isValue = i => oi >= 0 && i === oi + 1
const states = args.filter((a, i) => !a.startsWith('--') && !isValue(i)).map(a => a.replace(/^#?\/?/, ''))
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 960 } })

/** The stage is 1920 wide but its height follows the deck's aspect ratio, so the
 *  frame is sized from the page rather than assumed. */
const stageSize = () => page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement)
  return { w: parseFloat(cs.getPropertyValue('--stage-w')), h: parseFloat(cs.getPropertyValue('--stage-h')) }
})

for (const s of states) {
  await page.goto(`http://localhost:5801/?bare=1#/${s}`)   // ?bare=1 = stage only, no presenter chrome
  await page.waitForSelector('.stage')
  const size = await stageSize()
  if (page.viewportSize().height !== size.h) { await page.setViewportSize({ width: size.w, height: size.h }); await page.waitForTimeout(200) }
  await page.waitForTimeout(3200)
  const name = s.replace(/\//g, '-')
  await page.screenshot({ path: `${out}/${name}.png` })
  console.log('shot', name)
}
await browser.close()
