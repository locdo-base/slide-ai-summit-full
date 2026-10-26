# Keynote: Launching Timeline

The launch plan as its own deck (Eric: a launcher item, not a chapter of Work
Architecture). Deck lives in `src/keynotes/launch/`. Open with `npm run dev`
then `http://localhost:5801/#/launch/1`. Verify with `node scripts/verify.mjs launch`.

Presenter controls — slide rail, build pips, speaker notes — are in
[`presenting.md`](presenting.md).

## Language

Slide copy, speaker notes and chrome are **English** only. Dates read 1 Oct
2026, Jan 2027, Q2 2027. The app names, purposes and group headings on the
brands page are product strings, not copy.

## The plan (Eric's notes, 2026-09-09)

1. **The Agentic OS** (added 2026-09-12): the announcement itself, right after
   the cover — after ten years, a new product architecture and platform. One
   statement slide.
2. **The new Base.vn** (added 2026-09-12): the completely new product brands —
   the platform's launcher as a page, straight after the announcement (Eric
   moved it up from before the release waves).
3. **Official launch: 1 Oct 2026**, after the HCMC event.
4. Classic and the new **Agentic OS** run side by side until **Jan 2027**.
5. After that, Classic closes to new customers; new customers enrol on the new
   platform automatically.
6. **Existing customers — working together:** Classic stays for many years;
   migration takes effort from both sides (what to keep, what not); **free
   upgrades until the end of Q2 2027**, paid after.
7. **One more thing** (added 2026-09-12): the keynote's tease, then AI Studio —
   our desktop app — on its Apps page, just before the release waves.
8. **Releases:** 1 Oct 2026 → 1 Jan 2027: service architectures & AI copilots;
   Jan 2027: AI Studio & Amber desktop.
9. **Intelligence 1.0 / 2.0 and the close** (added 2026-09-12): why the whole
   platform was re-architected — a place for people and agents to work
   together, shown as the agent's own task list; the 2027 research agenda in
   four boxes (self-improving agents, reinforcement learning, team agents, AI
   workspace); and the close — today is only a beginning.

Chapters — **Software Platform · Timeline · Customers · Releases · Intelligence** — group the rail's slide list; the header carries a breadcrumb.

## Slide map

| # | Slide | Chapter | Layout | Steps | What moves |
|---|---|---|---|---|---|
| 1 | Title | — | field | 0 | Flow field converging; trio Lộ trình · Khách hàng · Ra mắt sản phẩm |
| 2 | The Agentic OS | Software Platform | center | 0 | Eyebrow *Software Platform ›*, the brand line *The new Base.vn:*, then *The Agentic Operating System* on two lines at 150px, its colour drifting blue → cyan → white; the block scales down on a shorter stage |
| 3 | Brand-new app logos *(product)* | Software Platform | stack, white body | 0 | The launcher's app grid — 62 apps in 8 groups, each with its real mark — on one page, sections cascading in; the header keeps the deck's ground, the body is a white sheet |
| 4 | Launch timeline | Timeline | stack | 2 | Calendar Sep 2026 → Sep 2027; launch marker 1/10/2026; both lanes side by side to Jan 2027; then Classic turns dashed ("chỉ dành cho khách hàng hiện tại") and dots flow along the Agentic OS lane as new customers enrol |
| 5 | Existing customers | Customers | stack | 3 | Classic bar runs off the edge past 2030; you + our team decide keep / let go row by row; free-upgrade meter to the end of Q2 2027, paid after |
| 6 | One more thing *(product · animated demo)* | Releases | tease → words → scene player | 7 | *One more thing!* alone on the dark stage; a click brings the words (AI Studio; No Code then, AI now); the next click starts the demo, which runs itself through six scenes — CRM report, People report, landing page, this deck's own slides, Studio → Base.vn → Claude Code, publish + database — each a build step; the list down the left names them and fills a bar as each plays |
| 7 | Product releases | Releases | stack | 2 | Same calendar; wave 1 Oct 2026 → Jan 2027 (service architectures, AI copilots); wave 2 from Jan 2027 (AI Studio, Amber desktop in its own accent) |
| 8 | Intelligence 1.0 *(product)* | Intelligence | stack, bleed | 0 | The agent's task list as it ships — the Rework screenshot Eric supplied, in the product-shot frame, top-aligned and running off the bottom of the stage |
| 9 | Intelligence 2.0 | Intelligence | stack | 3 | Four glass boxes over a blue–cyan bloom: Self-improving agents · Reinforcement learning · Team agents · AI Workspace — one per click, the last two together |
| 10 | A beginning | — | field | 0 | The cover's field, diverging: *Chỉ là một sự khởi đầu.* over *Cảm ơn các bạn · Hẹn gặp lại* |

Figures: `src/fx/LaunchTimeline.tsx` (shared axis for slides 4 and 7) and
`src/fx/LaunchScenes.tsx` (the three 480×220 scenes on slide 5).

## One more thing (slide 6)

Eric's brief (2026-09-12): *One more thing! Text, then animated demos* — the
scenes run themselves, as in the design-system deck's Canvas walkthrough
(`Keynote4 Universal of Work.html#6`, the LED player). The build:

- **Step 0** the tease; **step 1** the words — *AI Studio* and the then / now
  pair (No Code was never good enough for ordinary users; with AI it is);
  **steps 2–7** the demo, one scene per step.
- **`src/fx/ScenePlayer.tsx`** is the player, ported from the reference: each
  scene has a length in seconds, its content animates off the clock `t`, and
  when the clock passes the length the next scene starts — until the last,
  which finishes and holds. The list of scenes runs down the left — a fifth
  of the width, as Eric asked — the active entry lifted, showing its one line
  and filling a bar as its clock runs, done ones ticked; the scene plays on
  the right. A glass bar bottom-right (prev · pause · next · restart · *Scene
  i/N · name*) fades when the mouse rests; **Space** pauses (taken ahead of
  the deck's "next"). Because every scene is a build step, ← → step scenes as
  they step anything else, the rail shows a pip per scene, and the projector
  window follows the presenter's scene for scene. The headline stays *AI
  Studio.* through the demo; the copy lives in the list.
- **Seeded content.** The reports carry the persona company's own numbers
  (₫48.2 tỷ pipeline, 412 employees, six named deals with owners and next
  steps, one insight line each); the landing page has the summit's date,
  venue, agenda and speakers; the publish and database panes name the real
  hosts (`platform.<brand domain>`, `pg-7f3a.db.<brand domain>`). Styles are
  in `src/mocks/studio.css`, its own sheet like `thirdparty.css`.
- **The scenes** (`slides/03b-one-more-thing.tsx` holds the list, copy and
  lengths): four builds in the AI Studio window (`src/mocks/StudioDemo.tsx` —
  the prompt types itself, Generate, the build steps tick, the result rises
  into the preview): a CRM report from Base Sales (18 s), a People report from
  HRIS (13 s), the AI Summit 2026 landing page — a whole event site (hero with
  a ticket card and countdown, the numbers, why attend, the timetable with
  speakers and tags, speaker cards, a drawn venue map with the practical
  facts, registration, footer) that scrolls itself down over eight seconds
  (18 s), and the slides — this
  deck's own slides, drawn by the deck at thumbnail size via `SlidePreview`
  (15 s). Then two figures on the navy (`src/mocks/StudioExtras.tsx`): Studio →
  Base.vn → Claude Code | Codex (13 s), and the two supports acting out their own
  clicks — publish to `platform.<brand domain>`, a Postgres / MySQL database
  (18 s). About 95 s end to end.
- The gallery holds the window as `studio-builder` — the CRM build on its last
  frame.
- Under reduced motion every scene sits on its last frame and nothing advances
  by itself.

## The brands page (slide 3)

The page is the platform's own app launcher — the Applications tab of the
Company dialog (`platform/frontend/components/AppsLauncher.jsx`, opened from
`CompanyDialog.jsx`) — redrawn at stage density:

- **Data comes from the registry.** `scripts/app-icons.mjs` reads
  `C:/ai/apps/platform/platform.json`, keeps what the launcher keeps (drops
  `hidden` apps, hidden groups, `internal` plumbing), buckets by group in
  `groups[]` order, and renders each app's mark with the public app's favicon
  builder (`C:/ai/apps/public/fav/builder.mjs` over `fav/apps/{appkey}.svg`,
  coloured by `app-icon-colors.js` or the group palette) — the exact svg
  `/fav/{appkey}` serves. It writes `src/mocks/apps.generated.ts`, which is
  committed, so the deck draws the page offline. Re-run it after an app,
  a colour or a glyph changes.
- **`src/mocks/AppsGrid.tsx`** lays the groups out in three newspaper columns
  (AI & Agentic · Sales & Customer · Marketing │ Work · Workforce │ People ·
  Communications · Automations); `COLUMNS` is the split, by hand so the
  columns land level. A two-page version — four groups, then four more on a
  click — was tried on 2026-09-12 and Eric preferred the whole line-up at
  once. *Platform & Core services* (Home, Drive, Account, Settings, Sysadmin,
  Media, Test Center, Platform) is left out — plumbing, not a product brand;
  add `'platform'` to a column in `COLUMNS` to show it.
- **The white body.** `figureClass="paper"` on the `SlideFrame` paints the
  figure cell white and bleeds it to the stage edges and bottom; the header
  above keeps the navy ground with a blue glow at the top right, and its
  headline is a size down (56px, one row — Eric: the header takes one row
  only) so the grid beneath sits at 1 : 1. The marks are drawn for a light
  surface and would sink into the navy — this is the one slide with that
  customisation (`src/theme/components.css`).

## The Agentic OS statement (slide 2)

Eric's brief (2026-09-12): *Software Platform › The new Base.vn: The Agentic
Operating System — big, super catchy, an animated colour on the name.* The
slide (`slides/01b-agentic-os.tsx`) is the centre layout with no headline of
its own: an eyebrow, the brand line — it follows the configured brand, so
*The new Base.vn:* under Base.vn — and the name as the `h1`, two lines at 150px
in the display face with a gradient clipped to the letters that drifts through
the deck's blues and the agent's cyan (`.os-name` in `src/theme/components.css`;
still under `prefers-reduced-motion`). The line is a product statement, so it
stays English and, like the cover's display line, carries no full stop. The
rail groups it under its own chapter, *Software Platform*.

## Intelligence and the close (slides 8–10)

Eric's outline (2026-09-12) numbered these 6–8; they sit after Product
releases as 8–10. Slide 8's lead is my Vietnamese for his *What's more than
just beautiful AI and more effective software to let human/AI work together*;
the screenshot is `public/screens/agent-tasks.png`, the Rework build's agent
task list, so it still shows the Rework mark (it needs a fresh Base capture). Slide 9
reads his "04 boxes" as his three notes with the third split in two — Team
agents (Agent Orchestration) and AI Workspace (a shared place and runtime for agents and people).
Slide 10 was "design yourself": the cover's field run in reverse, one line,
two words of thanks; its last note line completes his *Base.vn rất hi vọng nhận
được sự ủng hộ…*.

## Open points

1. The keep / let-go rows on slide 5 (Quy trình, Quy tắc phê duyệt · Báo cáo
   cũ, Dashboard cũ) are illustrative — swap in real migration items.
2. "HCMC event" is shown as *sự kiện tại TP.HCM* — confirm the event name to
   show on stage.
3. The brands page shows 62 of the launcher's 70 apps (the core-services group
   is left out, see above). *AI platform* has no raw glyph yet in
   `public/fav/apps`, so it carries the generic spark, as it does in the
   product.
4. The rail title and breadcrumb of slide 3 are "Brand-new app logos"; the
   headline reads *The new Base.vn*, the wordmark taken from `src/ui/Brand.tsx`.
   The slide file is `slides/01c-brands.tsx` — numbered after the Agentic OS
   statement it follows.
