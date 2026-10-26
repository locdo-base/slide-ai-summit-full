# Keynote: Intelligence Architecture

Eric's opening talk, rebuilt on 2026-09-14 to his new script: AI as an entity
more intelligent than us, what business leaders care about, fifteen years of
enterprise software and one extensive platform; why the software we built is
no longer enough; Bezos, the monolith and the three principles of SOA; SOA for
business operations — and the same protocol for agents; then the New Base.vn
with AI Operation Services, shown service by service (registry, interfaces,
engines, Tasks on one slide, Work Review), closing on the galaxy. 24 slides. Deck lives in
`src/keynotes/intelligence/`. Open with `npm run dev` then
`http://localhost:5801/#/intelligence/1`. Verify with
`node scripts/verify.mjs intelligence shots`.

Presenter controls — slide rail, build pips, speaker notes — are in
[`presenting.md`](presenting.md).

## Language and audience

English only, Base.vn only. The speaker notes (`n`) are Eric's script with
`[step n]` binding each beat to a click.

## Text on the slide

The hall may have no speaker-notes screen, so this deck carries a little more
text than a clean one: leads that swap per click (`lead2At`, `lead3At`), and
two small pieces in `src/ui/Cues.tsx` that sit under the leads through
SlideFrame's `aside` / `cues`:

- **Cues** — short memory lines, a dot each, muted. A cue can be bound to a
  step (`{ text, at, until }`).
- **Needs** — on every demo slide, one line for what *people need* (amber) and
  one for what *agents need* (cyan) from the screen. That is the question the
  demo section answers on each screen.

## Screens

Real mocks where one exists; **empty mode** where none does yet — a browser
window at the right size with the screen's name in it (`src/mocks/Placeholder.tsx`).
Dropping a capture in is one prop: `screens={[{ src: '/screens/<file>.png' }]}`
on a screen slide, or a `mock`/`placeholder` swap in `04-platform.tsx` (slide 5).

| Slide | Screen | Today |
|---|---|---|
| 5 Sales · Marketing · Work · HR · Hiring | pipeline board · lead record · requests · employee register · hiring pipeline | mocks (`src/mocks/PlatformMocks.tsx`) |
| 6 | Base HRM employees · Salesforce opportunities | mocks |
| 17 Service registry | Services register | mock (`ServiceRegistryMock`) |
| 18 Unified setting model | Sales Pipeline settings — five pages one page per click | mock (`PipelineSettingsMock`) |
| 19 Unified task model | Tasks walk — home · service works · nested request · org chart · work plan | mock (`TasksWalkMock`) |
| 20 Unified operator model | Approval block by org unit · by position · flow with an agent step — one page per click | mock (`OperatorsWalkMock`) |
| 21 Unified data field model | Field registry · Sales Pipeline data fields — one page per click | mock (`FieldsWalkMock`) |
| 22 Unified approval model | Requests list | mock |
| 23 Service exchange | Exchanges page · Field mapping dialog — one page per click | mock (`ExchangeWalkMock`) |
| 24 Powerful | Requests · Sales pipeline · Deal record — one page per click | mocks (`OpsWalkMock`) |

## Slide map

Chapters — **Opening · The problem · Service architecture · AI Operation Services** — group the rail.

| # | Slide | Layout | Steps | What happens |
|---|---|---|---|---|
| 1 | Intelligence Architecture | field | 0 | The cover: summit, title and theme over the flow field, with one pill along the foot — *Base AI Summit - 2026.* |
| 1a | My customers are super heroes | field | 0 | From the aisummit deck: over the same field, *Q “What inspires you to work on all of this?”* then *A “My customers are super heroes!”* (amber), and *Thank you all* in a glass pill at the foot |
| 2 | Our topic today | field | 0 | *Architecture of software, works and agents* over the field; along the foot from the start, four pills — AI agents = new workforce · Search faster · Store more data · Collaborate more efficiently |
| 3 | A lot of AI | stack | 0 | No headline. Two halves, each with title and subtitle: **AI landscape** · Diversified in sizes and capacities — nine model names hover in a grid; **Business impact** · FOMO to excitement to confusion — three cards, People · Process · Data. Everything shows on arrival |
| 4 | My work | stack | 0 | *A short introduction about myself* — two numbers count up, 15y of building software and +10,000 business customers; what they taught is in the notes only |
| 5 | An extensive platform | stack | 4 | One-row headline, no lead. Five categories down the left — Sales, Marketing, Work, HR, Hiring — each with a drawn screen to the right (`src/mocks/PlatformMocks.tsx`: pipeline board, lead record, requests list, employee register, hiring pipeline) in a browser window sitting tight to the right and bottom edges of the stage; each click moves a category |
| 6 | Current software architecture | stack | 2 | The question as the lead; two screens at real density; the click rains the feature swarm on them (`src/fx/FeatureSwarm.tsx`) and the lead becomes *Feature-driven: Set of UI actions + System of records*; ~2.5 s later the formula pill fades in over the screens on its own; the second click adds the amber verdict pill *No longer working with AI*; the 99 percent is spoken |
| 7 | 99% of software | stack | 0 | The formula as the headline — *99% of software = a set of UI actions made for **human accessibility** + a **representation** of internal data*, the two phrases in cyan; the screen a person works in (toolbar, table, cursor) beside the same records as an agent needs them — a declared structure, field by field; the agent's card follows the person's on its own ~1 s later |
| 8 | The quest to re-architecture software | stack | 0 | *To let human + AI work together.*; Result-driven · Sustainable · Improving arrive in order on their own; the environment that empowers both is spoken |
| 9 | Back to history | stack | 0 | The world then as the lead line; the Bezos mandate fades in as a quote on its own ~2 s later |
| 10 | The monolith | split | 5 | Twelve processes wired to each other (`src/fx/Monolith.tsx`): needs → both change → conflict → everything lit and shaking, *Coupling*; click 5 turns it on our own operations |
| 11 | Everything must be a service | center | 0 | The stop: Jeff's mandate as the statement, and the two questions it raises — what is a service, what is SOA? |
| 12 | Service architecture | stack | 3 | Headline *Service architecture: three principles.*, no lead, so the figure has the room; a circle in the middle asks *What is a service?* with *The who, what, how* under it; click 1 slides it left and squares it straight into the named card; then one service drawn in three clicks (`src/fx/ServiceUnit.tsx`): the Who (name, purpose), the What (inputs, outputs, *what can you do for me?*), the How (an engine versioning inside while the interface holds); the principle told sits full beside it |
| 13 | SOA and applications | stack | 1 | Headline *SOA: The industry standard for scalable systems.*, no subtitle; Amazon · AWS · Google · Microsoft · everyone; the click crossfades the headline to *SOA: The architecture we need for both software and business operation.* and adds the exact answer for both software architecture and business operations |
| 14 | SOA for business operations | stack | 1 | *Everything is a service: the same principle, for business operation*; the Who / What / How rows arrive together on a stagger; the one click does not leave the slide — the agents join the Who row in cyan and the banner says they need the exact same protocol |
| 15 | The New Base.vn | stack | 0 | Headline *Base.vn: An elastic system of interconnected services.*, lead *For both human and AI to work together.*, and Goals · Interfaces · Engines echoing Who · What · How |
| 16 | Service | stack | 0 | Headline *Service: the building block for business operation.*, lead *No more software, just AI operation services.*; three glass boxes — Unified architecture · Output-driven · AI-native; ~2.5 s later the pill *Let’s see how it works across domains and apps* fades in on its own |
| 17 | Universal service registry | screen | 2 | *Universal service registry.*, lead *A holistic view of all company operations.* — the services register mock (`ServiceRegistryMock`), drawn from Eric's capture, walks three views on its own, ~3.6 s each and round again: Holistic · By department · By user (the view switch in the head follows); the walk's indicator under the lead |
| 18 | Unified setting model | screen | 4 | *Easy to config and govern across apps and domains.* — the Sales Pipeline settings dialog (`PipelineSettingsMock`) walks its pages on its own, ~3.4 s each and round again: Stages · Accesses · Permissions · Views · Layouts, the nav highlight following; the walk's indicator (`src/ui/Walk.tsx`) under the lead names each step with a bar running on the current one; drawn from Eric's captures |
| 19 | Unified task model | screen | 4 | *One place for all the work coming from every service — for people and agents alike.*; one page per click through five pages with the indicator under the lead — One place (Tasks home) · Service-driven (Executive Directives works) · Infinitely nested (one request, five levels) · Assign on org chart (Commercial Division's work) · Streamlined into plan (Product Planning 2026 with linked work) — `src/mocks/TasksWalkMock.tsx` |
| 20 | Unified operator model | screen | 2 | *Always know who is in charge: Owners, followers, reporters.* — three screens one per click (`OperatorsWalkMock`): Assignment by orgchart (the approver picked by org unit, a holder per unit) · Assignment by position (a seat, with or without a holder) · Assign to an agent (a work flow where a step is an agent of its own); drawn from Eric's captures; the walk's indicator under the lead |
| 21 | Unified data field model | screen | 1 | *Standardized data model for service operation objects.* — a walk of two screens on its own (`FieldsWalkMock`): the Workforce field registry (*Unified field registry*), then the Sales Pipeline settings › Data fields (*Easily config per service*); the walk's indicator under the lead |
| 22 | Unified approval model | screen | 0 | *Approve in any app — and see every approval in one place, in Request.* — the requests list |
| 23 | Service exchange | screen | 1 | *Connect services to each other at the platform layer — down to how each field maps.* — two screens one per click (`ExchangeWalkMock`): Service exchange (the Job Offer service's Exchanges page) · Field mapping (the Job Offer → Baseline Planning exchange opened on Transform fields); drawn from Eric's captures; the walk's indicator under the lead |
| 24 | Powerful | screen | 2 | *Powerful: self-governing & independently evolving.*, lead *Standard in how services are defined and connect. Unlimited in what each one can do.* — three screens one per click (`OpsWalkMock`): Simple service operation (Requests list) · Complex service operation (Sales Pipeline board) · With complex work orchestration (a deal opened); the walk's indicator under the lead |
| 25 | Output-driven | screen | 3 | *Unified output models for continuous improvement.*; one page per click through four pages with the indicator under the lead — Output registry (Outputs overview) · Managed records (Deals records) · Workload (hours per person per day) · Work assessment (Reviews scoreboard) — `src/mocks/OutputsWalkMock.tsx` |
| 26 | AI Operation Services | split + stage-level galaxy | 0 | The galaxy (`src/fx/ServiceGalaxy.tsx`) with the sun labelled *AI Operation Services*; cues carry the last argument; the hand-off to the next keynote is spoken, no click |

## Where the script was read a certain way

1. **The cover and the topic are two slides** (Eric, 2026-09-14): the title
   with the summit theme, then *Our topic today — architecture of software,
   works and agents* with the agent pills from the start. The *more intelligent
   than us* line is spoken, not shown; one merged slide was tried and carried
   too much text.
2. **The introduction shows two numbers only** (Eric, 2026-09-14): 15y of
   building software and +10,000 business customers. The ten years on this
   platform and the thousands of leaders are spoken, not shown.
3. **"The outputs of one function become the outputs of another"** is set as
   *inputs* of another (slide 14), which is what the sentence means.
4. **Slide 5 shows 62 apps** (the launcher's line-up minus core services);
   the lead says the count from the data, so it follows the registry.
5. **Slide 6's screens** are the Base HRM register (the current software
   we built, as the earlier decks showed it) and Salesforce (everyone
   else's) — both at the same compact frame (Eric, 2026-09-14).
6. **Slides 20–23** are the Tasks and Work Review material of the former
   Work Architecture deck, which was dropped from the app on 2026-09-14 once
   this deck and the agent deck had taken its content. Tasks is one slide
   here: the Tasks home with the story told over it in two clicks. Each
   gained a Needs strip or cues. The mocks it drew (`tasks-home`, `assessment`,
   `outputs`, `request-card`, `plan-pane`) now list under this deck in the
   gallery; `rule-page` under the agent deck.
7. **Slide 19 (internal engines)** has no mock of the rebuilt Sales Pipeline
   app yet, so it is an empty window.
