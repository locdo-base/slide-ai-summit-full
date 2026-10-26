# Keynote: Agent Architecture

Working plan for the "agent" keynote. Deck lives in `src/keynotes/agent/`. Open
with `npm run dev` then `http://localhost:5801/#/agent/1`. Verify with
`node scripts/verify.mjs agent shots-agent`.

Rebuilt from scratch on 2026-09-14 to Eric's outline. The work-rules chapter
takes over the rules and assessment material from the former Work
Architecture deck (dropped from the app 2026-09-14); its figures live on in `src/fx/`.

Presenter controls — slide rail, build pips, speaker notes — are in
[`presenting.md`](presenting.md).

## The argument

Two questions. **What exactly is an agent?** Jensen Huang's anatomy — model,
harness, tools and skills, runtime — with one business adjustment made first:
**ownership**. Ownership decides the four kinds Base.vn runs. **How do agents
become effective inside the business?** By following the same rules people
follow (Work rules), by working inside services that hold models and contexts,
and by taking tasks that come from work.

| Chapter | Slides | The point |
|---|---|---|
| **Why context matters** | 2–7 | Why we build what we build. An LLM predicts the next token; the same prompt gives different answers; context makes the prediction better. Capability runs ahead of adoption because business context is fragmented, isolated, diluted — and it cannot be bought, only built. Ported from the Rework keynote (`../references/brian.slide.html`). |
| **Anatomy** | 9–13 | Agent = ownership + LLM model + harness + tools & skills + runtime. Four kinds: assistants (each user), copilots (the service), workflow agents (the system), desktop agents (each user, on the machine). Any model, our keys or yours, metered. |
| **Work rules** | 14–22 | Rules are the cornerstone for people first — and broken today (announced once, forgotten). A lifecycle: develop, review, publish, attest & assess, explore. Rules mean both: the page for people, the briefing for agents. First-class, linked to services and agents, with scope and regulations. Doing the heavy lifting: assessment from a rule. |
| **Operation** | 23–28 | A service holds models and contexts. Context discovery from one id. tools, skills = UNION(service, agent). One task system for agents; tasks come from work — the Request app's execution graph. Four task models: tasks, approvals, schedules, plans (preview). |

## More text on the slides

Eric may have no notes screen in the hall, so the slides carry a little more
than the clean version: leads that swap per build, and short **cues** under
the lead in the text column (`SlideFrame`'s `cues` prop — a string shows from
the start, `{ text, at }` binds a cue to a build). Cues are phrases, never
sentences; the full script stays in `notes` (press `n`).

## Slide map

| # | id | Slide | Chapter | Layout | Steps | What moves / what it shows |
|---|---|---|---|---|---|---|
| 1 | title | Agent Architecture | — | field | 0 | Flow field diverging; four words Model · Tasks · Rules · Operation |
| 2 | next-token | The next token | Why context matters | center | 2 | *It is constantly predicting the next token.* A token stream builds itself on a loop — Thank · you · for · your → order (patience, support); *That’s it.* on its own; click 1 opens the dashed side box *what is a token?*, click 2 the answer and pre · dict · able |
| 3 | different-answers | Different answers | Why context matters | center | 0 | *The cat sat on the ___*: five branches with their odds (mat 42%, sofa 21%, windowsill 12%, keyboard 6%, … 19%); run 1 draws to mat in cyan, run 2 to sofa in amber, on their own |
| 4 | context | Context | Why context matters | center | 1 | *So what makes the prediction better?* alone; the click brings the big word *Context.* and one line on what context gives |
| 5 | adoption-gap | The adoption gap | Why context matters | center | 0 | Three neon curves draw 0.7 s apart on their own: LLM model capability, individual AI adoption, business AI adoption |
| 6 | fragmented | Business context is fragmented | Why context matters | center | 0 | *Business context is Fragmented · Isolated · Diluted* — one business: CRM, ERP, email, WhatsApp, Excel… each with *linked systems · 0*, people holding the know-how, an AI hopping between them and hitting walls. The reference deck’s SVG as drawn (`agent/assets/fragmented.svg`, SMIL inside) |
| 7 | build-context | We have to build it | Why context matters | center | 0 | Three lines on their own: every company can buy tokens / *But we cannot buy our business context* / *We have to build it.* with *No shortcut* in the hand font (Caveat, `agent/assets/caveat-sub.woff2`) |
| 8 | intro | What is an agent? | — | center | 0 | *What is exactly an agent?* as a centred title, *How to make it useful in our business operation?* as its subtitle; no figure |
| 9 | architecture | Agent architecture | Anatomy | stack | 2 | Jensen Huang’s quote is the headline, the four parts lit in cyan; attribution as the lead. Below, one open equation — icon, word, no cards: *Agent = Model + Harness + Tools & skills + Runtime*. **Ownership** slides in first; then each part gets its business gloss (`fx/AgentFormula`) |
| 10 | kinds | Four kinds of agent | Anatomy | stack | 0 | No lead. Four columns across the full width on one subgrid — glyph, name and kick, one line, then Owned by / Memory / Used as a label-value table — so the facts line up across all four; the columns arrive one after another on their own, no click. Owner values cyan; no amber (`fx/KindGlyphs`) |
| 11 | compare | Comparison | Anatomy | stack | 0 | The table, all at once: owned by, goal, memory, used by, context, and where you meet it in Base.vn |
| 12 | models | LLM models *(product)* | Anatomy | full window | 2 | Settings › Models; click 1 rings bring-your-own-key, click 2 replaces the window with the Usage report (`UsageMock`) |
| 13 | copilot | Every service has a copilot | Anatomy | split, window | 1 | The Request app's copilot on a purchasing request, two screens a click apart (`mocks/CopilotWalkMock`): embedded beside the request with the questions it knows to ask; then answering *summarise this request* from the fields, the purchasing policy, the approval flow and the history; the walk's bar under the lead |
| 14 | tools-skills | Agent capacities: Tools and skills | Work rules | stack | 1 | Rules · Tasks · Knowledge — three quiet cards, an icon, the word, one line; the click lifts Rules and Tasks with a cyan glow, dims Knowledge, and shows the pill *We focus on rules and tasks today* |
| 15 | rules-first | Rules are the cornerstone | Work rules | center | 0 | A statement slide: the title, and one line under it — *Crucial in business operations: for both humans and agents.* A beat later, on its own, a pill at the foot: *But it's highly ineffective.* No figure, no card |
| 16 | announced | What is broken with rules? | Work rules | split | 0 | Attention decay curve; the new hire arrives at week 6 on its own once the curve has drawn, no click (`fx/AnnouncementDecay`) |
| 17 | lifecycle | Introducing Work rules | Work rules | split | 0 | *A complete rule and policy management framework.* The lifecycle ring: Develop → Review → Publish → Attest & assess → Explore, lighting on its own about 1.4 s apart with its cue, no click; particles once complete; cues list the five (`fx/RuleLifecycle`) |
| 18 | rules-walk | Work rules, in the product | Work rules | screen | 2 | *Every rule is a first-class entity — announced to the right people, then assessed.*; the screen one page per click through three pages with the indicator under the lead — First-class entity (Rules register) · Announcement (Inbox of rollouts) · Attestation (Assignments: readings, attestations, knowledge checks) — `src/mocks/RulesWalkMock.tsx` |
| 19 | ask-rules | Made for the easiest accessibility *(product)* | Work rules | screen | 0 | *Just ask. The copilot answers from the rules you can see — and names the rules it used.*; Personal rules › Ask AI plays a short conversation on its own — leave, probation, working from home — each answer naming its rules — `src/mocks/AskRulesMock.tsx` |
| 20 | both | For system and human | Work rules | stack | 0 | Rule → AI → page for people on its own ~1.2 s in; the briefing for agents follows ~2.4 s later, tokens 3,100 → 240 (`fx/RuleSplit`) |
| 21 | heavy-lifting | Work assessment | Work rules | split | 0 | Rule → AI → assessment scored, then the review plan builds itself — on a timer, no click (`fx/AiReview`) |
| 22 | assessment | An assessment record *(product)* | Work rules | split, window | 0 | Tasks › EXD-020 › Reviews with the Review drawer open (`mocks/AssessmentMock`): the rule's criteria and bands, the agent's score and reason per criterion, the steps it ran; callout on the criteria |
| 23 | service | Rules in service context | Operation | split | 0 | Headline and one short lead. One service card, still: what a service holds — object model, operators, purpose, rules, tools, skills (`fx/ServiceHolds` with `still`) |
| 24 | context-discovery | Context discovery | Operation | stack | 0 | Five nodes: id → getObject → getService → getRules / getTools → actions, lighting one after another on their own (1.6 s apart, a hold on the last, then round again), each with what the agent knows now (`fx/ContextChain`) |
| 25 | union | Service tools and skills | Operation | split | 0 | Two sets overlapping; the union draws itself round both in amber a beat later, the formula beneath — no click (`fx/UnionSets`) |
| 26 | tasks | Tasks *(product)* | Operation | screen | 2 | *Tasks, for agents too.*, lead *Where an agent’s tasks come from.* Three screens a click apart with the walk indicator: Grace's task box (`mocks/AgentTasksMock`), tasks assigned in chat, tasks assigned in service operation — a purchasing request's approval sequence with the agent as one step (`mocks/AgentTasksWalkMock`) |
| 27 | request-graph | Service operation context | Operation | split | 0 | The Request app's execution graph with the agent node; its turn comes and a task lands in Grace's registry, in context; then the run in pseudo-code (`fx/RequestGraph`) |
| 28 | task-models | Task models | Operation | stack | 4 | Four glass boxes: Tasks · Approvals · Schedules · Plans (preview only), each with an example |
| 29 | one-more-thing | One more thing | — | stack | 7 | AI Studio, shared with the launch deck (`launch/slides/03b-one-more-thing`): the self-running demo — CRM report, People report, landing page, today's slides — then Beyond and the two supports |
| 30 | intelligence-1 | Intelligence 1.0 | — | split, window | 0 | Shared with the launch deck (`launch/slides/05-intelligence-1`): a place for people and AI to work together, Grace's tasks beside |
| 31 | intelligence-2 | Intelligence 2.0 | — | stack | 3 | Shared with the launch deck (`launch/slides/06-intelligence-2`): the 2027 plans — self-improving agents, reinforcement learning, team agents and AI Workspace, one per click |

## Empty mode — what Eric drops in

One window is drawn empty (`mocks/Placeholder` → `EmptyScreen`), sized and
placed so the layout can be judged now:

- **Slide 18** — the Work rules demo. Either run the product live here or drop
  a capture under `public/screens/` and replace the `EmptyScreen` with
  `<img src="/screens/…png" />` inside the same `Window`.

The lifecycle on slide 11 is drawn rather than the Mitratech PolicyHub image
Eric linked (a third-party graphic, and the deck must not depend on the
network in the hall). Its five stages are Eric's: Develop · Review · Publish ·
Attestation & Knowledge Assessment · Exploration.

## Product mocks

Same contract as the other decks (`docs/mocks.md`). Used here: `models`,
`rule-page` (with two new `data-callout` hooks: `search`, `ask`),
`assessment`, `job-ledger`, and two new entries — `rules-list`
(`src/mocks/RulesListMock.tsx`, the company-wide rules register) and
`agent-tasks` (the existing `AgentTasksMock`, now in the catalog, with an
`origin` hook). Mocks from the previous agent deck that this outline no longer
shows — new assistant, duty, capacities, assistant chat, deal copilot,
approval copilot, agent stage, Amber, crew — stay in the catalog (the
intelligence deck uses several as stand-ins) and point at the nearest slide.

## Shared figures

`src/fx/RuleSplit.tsx` and `src/fx/AiReview.tsx` were extracted from the work
deck's slide files on 2026-09-14 so both decks draw the same figure; the work
slides (`08-rules`, `06-ai-review`) import them.

## Open points

1. **Two captures** — slides 10 and 21 are empty mode until Eric's captures
   (or the live product) come.
2. **Expert agents / crew / orchestration** from the previous deck are not in
   this outline; the mocks remain in the catalog if a slide is wanted back.
3. **Wording I chose.** The
   business glosses on the formula cards; the comparison table's *Context* and
   *In Base.vn* rows; the cue phrases; the pseudo-code on slide 21
   (`service = discover(request)`). Eric's own lines are the leads and notes.
4. **Chapter label** — the rail says *Work rules* for the middle chapter
   (Eric's "Agent capacities: Tools and skills" opens it as slide 8, and rules get their own slide 9).

## Design decisions

- Same palette and type as the other decks. Ownership is drawn in the human
  colour (amber): a person decides it. Agents stay cyan; services blue.
- Concept figure first, product proof right after, wherever the product exists.
- Every "flow" claim is a real flow: particles run the lifecycle ring, the
  request graph, the rule split; count-ups on the token meter.
