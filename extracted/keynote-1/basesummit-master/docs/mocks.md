# Product mocks

The decks prove their points with product windows — the Tasks home, a rule
page, the model settings — hand-built in React at the app's real density rather
than screenshotted. Everything about them lives in two places:

```
src/mocks/
├── catalog.tsx      every mock: id, name, note, frame, the slide that shows it
├── Window.tsx       Frame (the window) · Window (placed on a slide) · TopBar · Callout
├── parts.tsx        shared pieces: people, avatars, pills, the app rail, sidebar rows
├── mock.css         the light app surface, prefix `mk-`
└── *Mock.tsx        one file per mock (a file may hold two that share a slide)

src/gallery/
├── Gallery.tsx      #/resources — every catalog entry, thumbnails and a 1:1 viewer
└── gallery.css
```

## The catalog

`src/mocks/catalog.tsx` is the one list. An entry says what the mock is, which
keynote and slide show it, and how it is framed:

```ts
{
  id: 'tasks-home', name: 'Tasks home', keynote: 'intelligence', slide: 'tasks',
  note: 'Every service in one list — children inline under their parent.',
  frame: { url: '/app/task/home', zoom: 1.15 }, component: TasksHomeMock,
}
```

- `frame.url` gives the window browser chrome (traffic lights, an address bar)
  and the full 1540 width; leave it out for a compact panel and give `width`.
- `frame.zoom` is the CSS zoom the app is drawn at — a reflow, so type stays
  crisp on stage. 1.08–1.18 reads right on the 1920 stage.
- `slide` is the slide's id in `src/keynotes/<deck>/index.ts`, so the gallery's
  "slide 4" link keeps pointing at the right slide when one is inserted.

A slide places a mock by id; position and build step are the slide's business,
the frame is the catalog's:

```tsx
<MockWindow id="request-card" x={0} y={0} />
<MockWindow id="plan-pane" x={770} y={0} at={1} />
<Callout target="kids" label="nested work, one level inline" at={1} side="up-right" />
```

**Adding a mock** is three steps: draw it in its own file under `src/mocks/`,
add one entry to the catalog, place it on a slide. It appears in the gallery by
itself.

## The gallery

`#/resources` (the **Resources** button on the keynote list) shows every entry grouped
by keynote, in deck order, tagged `W01`, `A03` … Thumbnails are the real
windows scaled to fit; clicking one opens it at 1 : 1 — the pixel size it has
on the 1920-wide stage — with `←` `→` to walk the set and `esc` to close. Each
card links to the slide it appears on.

Because the gallery runs the same components, it is where a mock is checked
after an edit: the density, the copy, the brand.

## Brand

The decks are Base.vn only. The platform top bar draws the Base mark and
product name (`Base.vn`), the browser address bar names its host
(`base.vn`), and copy that names the product — the Amber desktop's window
titles, the assessment's "Base.vn AI" — reads it through `useBrand()` in
`src/ui/Brand.tsx`, so the name is spelled in one place.

## Conventions

- Prefix every mock class `mk-` (or the mock's own prefix, like `am-` for
  Amber) and keep the styles in `mock.css`; the deck's tokens (`--font-body`)
  are the only thing shared with the stage.
- Nothing in a mock uses `transform` — the window is scaled with `zoom`, and a
  `Callout` measures the DOM to ring its target.
- Mark an element a callout can ring with `data-callout="…"`.
- The cast is `PEOPLE` in `parts.tsx`; use `<Who p="E" />`, never an ad-hoc
  name, so the same people appear on every mock.
