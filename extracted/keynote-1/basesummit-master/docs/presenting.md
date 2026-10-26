# Presenting

The deck runs its own presenter chrome around the stage: a slide rail on the
left, a control bar under the stage, and speaker notes on the right. All three
sit *outside* the 1920×960 stage — they take width off it rather than covering
it, so nothing ever lands on top of a slide.

Open any keynote (`npm run dev`, then `http://localhost:5801/#/intelligence/1`).

## Two screens, PowerPoint style

Press `p`. Two windows open, kept in step:

| Window | Shows | Goes on |
|---|---|---|
| **Presenter** (this one) | the slide now on screen, the slide coming next, notes for the build in play, the talk clock, the controls | the laptop |
| **Display** (a new window) | the stage and nothing else | the projector |

Either window drives: whichever has the keyboard moves both. Clicking the slide
in the display window advances too — except for the click that brings that
window forward, which is swallowed so focusing the projector never eats a build.

**Putting the display on the projector.** The new window is placed on the second
screen automatically when the browser has the window-management permission
(Chrome asks the first time; the presenter header has a **Move to 2nd screen**
button to retry after granting it). Otherwise drag it across yourself. Then
press `f`, or click **Full screen** on it.

**If the pop-up is blocked**, the presenter window says so. Allow pop-ups for the
site and press `p` again, or open the display URL in a second window by hand:

```
http://localhost:5801/?view=audience#/intelligence/1
```

**Stop presenting** (header button, or `p` again) closes the display window and
returns this one to the normal single-screen view.

The two windows talk over a `BroadcastChannel` — same browser, same origin, no
server and no network. Either window can be reloaded mid-talk and rejoins where
the deck is; the talk clock survives a reload too.

## Keys

| Key | Does |
|---|---|
| `→` `space` `↓` `enter` `page-down` `click` | next build, then next slide — and past the last slide, the next keynote in the programme |
| `←` `↑` `backspace` `page-up` | back one build, then previous slide — and back into the previous keynote |
| `home` / `end` | first / last slide |
| `p` | presenter view on two screens (again: stop) |
| `s` | slide rail |
| `n` | speaker notes |
| `r` | replay the slide from its first build |
| `f` | full screen |
| `h` | clean view — every panel off, stage only |
| `esc` | back to the keynote list |

Panel choices (rail, notes, rail width) are remembered in `localStorage`; the
clean view is not, so a reload always comes back with the panels the presenter
set up.

## The build indicator

Most slides play in several builds — one click each. The control bar carries one
pip per build, lit up to where the deck is, and `+2` for the clicks still left
before the next slide:

```
‹  5 / 17  ›  │  ● ● ○  +1  │  Replay R  │  ▤ ▥ ▭ ⛶  │  Clean H
```

The same pips sit at the bottom-left of every rail thumbnail that has builds, so
the whole shape of the talk is visible at a glance, and both the notes panel and
the presenter display spell it out: *Build 2 of 3 · 1 click left here*.

Click a pip to jump straight to that build.

## Speaker notes

Notes live on the slide definition in `src/keynotes/<deck>/index.ts`. Write one
line per beat, and open a line with a build marker to bind it to a build:

```ts
notes: 'A task no longer means assigning work to one individual.\n'
     + '[step 1] Assign to a team (which names a DRI) or to a whole org unit.\n'
     + '[step 2] Plans align tasks without becoming tasks themselves.',
```

`[step 2]`, `[step]` (the next one) and `[2]` all parse. Lines before any marker
belong to the slide's opening state.

The panel dims every line that is not in play, lights the line for the build now
on screen, and outlines the one the next click brings up — so reading ahead never
loses the place. The foot of the panel names the slide the deck goes to next.

## Slide config

**Slide config** on the keynote list opens a side peek:

- **Aspect ratio** — 2:1 (the default, 1920 × 960), 16:9 (1920 × 1080, fills a
  normal projector) or 3:1 (1920 × 640, wide and short). The stage is always
  1920 wide, so a ratio only changes the vertical room: 16:9 hands the layout
  120px more, 3:1 takes 320px away and the type scale tightens to match. Figures
  are drawn at the size that reads best on a 2:1 stage, so each one scales down
  to the room it has rather than running off the bottom — all three decks are
  overflow-free at all three ratios.
- **Colour theme** — Blue (deep navy, electric blue), Green (green ground,
  clean green) or Violet (indigo ground, violet). A theme rebinds the palette slots
  in `src/theme/themes.css`; every slide, figure, canvas field and panel follows,
  because they all read tokens rather than hexes.
- **Display font** — Be Vietnam Pro (the default, geometric), Sora, Space
  Grotesk, Outfit, Newsreader (serif) or Afacad (narrow — fits long headlines
  on one line).
- **Text font** — Inter, Manrope, Source Sans 3, DM Sans or Space Grotesk.

The decks are English only. The Base mark and wordmark sit top-left of every
slide, title slides included, followed by the keynote name on framed slides; the
mark is the same 24-grid path the app header draws, in `src/ui/Brand.tsx`,
filled with the slide's own colour.

A live slide preview sits at the top of the panel, so a choice is judged on the
real work. Every family is installed locally as a variable font — a keynote must
not depend on a CDN answering in the hall.

Choices are saved per browser and picked up by both presenting windows.

## Resources

**Resources** on the keynote list — or `#/resources` — lists every product window the
decks show, grouped by keynote, drawn by the same code the stage runs. A card
opens the window at 1 : 1 (stage pixels); `←` `→` walk the set, `esc` closes,
and each card links to the slide it appears on. The catalog behind it is
`src/mocks/catalog.tsx`; see `docs/mocks.md`.

## Clean output

`?bare=1` loads the stage alone, with no chrome and nothing remembered:

```
http://localhost:5801/?bare=1#/intelligence/5/1
```

That is what `scripts/shoot.mjs` and `scripts/verify.mjs` use, so screenshots
stay a clean stage-sized frame — both read the stage from the page, so they
follow the aspect ratio the deck is set to. `h` does the same thing live,
mid-talk.
