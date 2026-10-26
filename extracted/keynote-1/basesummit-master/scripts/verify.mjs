// Drives the running deck with real Chrome: walks every slide and step by
// keyboard, records the hash after each press, screenshots each state, and
// reports any element that lands outside the 1920x960 stage.
//   node scripts/verify.mjs [keynote] [outDir]
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const keynote = process.argv[2] || 'intelligence'
const out = process.argv[3] || 'shots'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 960 } })
const errors = []
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`))
page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })

await page.goto(`http://localhost:5801/?bare=1#/${keynote}/1`)   // ?bare=1 = stage only, no presenter chrome
await page.waitForSelector('.stage')

// The stage is 1920 wide but as tall as the deck's aspect ratio makes it.
const stage = await page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement)
  return { w: parseFloat(cs.getPropertyValue('--stage-w')), h: parseFloat(cs.getPropertyValue('--stage-h')) }
})
if (stage.h !== 960) { await page.setViewportSize({ width: stage.w, height: stage.h }); await page.waitForTimeout(200) }
console.log(`stage ${stage.w} x ${stage.h}`)

const overflow = async () => page.evaluate(({ W, H }) => {
  const stage = document.querySelector('.stage')
  const sr = stage.getBoundingClientRect()
  const scale = sr.width / W
  const bad = []
  for (const el of stage.querySelectorAll('.slide *')) {
    if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) continue
    const st = getComputedStyle(el)
    if (st.opacity === '0' || st.visibility === 'hidden' || st.display === 'none') continue
    if (el.closest('.stream')) continue   // clipped marquee, by design
    if (el.closest('.bleed')) continue    // product windows bleed off-stage, by design
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const x1 = (r.left - sr.left) / scale, y1 = (r.top - sr.top) / scale
    const x2 = (r.right - sr.left) / scale, y2 = (r.bottom - sr.top) / scale
    if (x2 > W + 5 || y2 > H + 5 || x1 < -5 || y1 < -5) {
      const tag = el.tagName.toLowerCase()
      const txt = (el.textContent || '').trim().slice(0, 40)
      bad.push(`${tag}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''} [${Math.round(x1)},${Math.round(y1)}→${Math.round(x2)},${Math.round(y2)}] ${txt}`)
    }
  }
  return bad.slice(0, 8)
}, { W: stage.w, H: stage.h })

const log = []
let guard = 0
let prevHash = ''
while (guard++ < 80) {
  const hash = await page.evaluate(() => location.hash)
  if (hash === prevHash) break
  if (!hash.startsWith(`#/${keynote}/`)) break   // Next past the last slide opens the next keynote
  prevHash = hash
  await page.waitForTimeout(3200)          // let builds and count-ups settle
  const name = hash.replace(/^#\//, '').replace(/\//g, '-')
  await page.screenshot({ path: `${out}/${name}.png` })
  const bad = await overflow()
  log.push(`${hash}${bad.length ? '\n   OVERFLOW: ' + bad.join('\n   OVERFLOW: ') : ''}`)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(150)
}

// Walk back with ArrowLeft and by clicking, checking the hash sequence is sane.
const back = []
for (let i = 0; i < 6; i++) { await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(120); back.push(await page.evaluate(() => location.hash)) }
const clicks = []
for (let i = 0; i < 4; i++) { await page.mouse.click(960, 480); await page.waitForTimeout(120); clicks.push(await page.evaluate(() => location.hash)) }

console.log(log.join('\n'))
console.log('\nArrowLeft x6:', back.join(' '))
console.log('click x4:   ', clicks.join(' '))
console.log('\nerrors:', errors.length ? '\n' + errors.join('\n') : 'none')
await browser.close()
