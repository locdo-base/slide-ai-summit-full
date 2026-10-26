import { Fragment, type ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

export interface ConceptItem {
  label: string
  /** The parenthetical under the label — the term's other name. */
  sub?: string
}

export interface ConceptRow {
  word: string
  gloss: string
  items: ConceptItem[]
  /** A line under the items — what the row amounts to. */
  note?: ReactNode
}

interface Props {
  rows: ConceptRow[]
  /** `old` reads as dashed chips — what feature-driven software leaves you
   *  with; `new` as summed cards, each a part of the architecture. */
  tone: 'old' | 'new'
  /** The build step the first row lands on; each row takes the next. */
  at?: number
}

/** Model and Context as two rows — the word, its gloss, and its properties.
 *  The same shape for the old software and the new architecture, so the two
 *  slides rhyme. */
export function ConceptRows({ rows, tone, at = 1 }: Props) {
  return (
    <div className={`concept-rows ${tone}`}>
      {rows.map((r, i) => (
        <Reveal key={r.word} at={at + i}>
          <div className="concept-row">
            <div className="concept-word"><b>{r.word}</b><i>{r.gloss}</i></div>
            <ul className="concept-items">
              {r.items.map((it, j) => (
                <Fragment key={it.label}>
                  {tone === 'new' && j > 0 && <li className="plus" aria-hidden>+</li>}
                  <li>{it.label}{it.sub && <small>{it.sub}</small>}</li>
                </Fragment>
              ))}
            </ul>
            {r.note && <div className="concept-note">{r.note}</div>}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
