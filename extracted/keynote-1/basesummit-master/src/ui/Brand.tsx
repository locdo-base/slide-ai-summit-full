import type { ComponentType } from 'react'

/** The Base mark, ported from the platform's PlatformBrand.jsx
 *  (C:/ai/apps/platform/frontend/master/PlatformBrand.jsx) — the same 24-grid
 *  path the app header draws: a hexagon with three bars cut out of it. One
 *  path; the bars are negative space in the fill, so the ground shows through
 *  on any surface. Fills with `currentColor`, so the slide's colour owns it;
 *  sizing is CSS (`--brand-mark`), never the attributes. */
function BaseMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.99976 1.00024C10.9997 0.500061 12.9997 0.500239 13.9998 1.00024L22.0427 5.91626C22.6371 6.27959 22.9998 6.92662 22.9998 7.62329V16.3782C22.9998 17.0749 22.6372 17.7219 22.0427 18.0852L13.9998 23.0002C12.9997 23.5001 10.9997 23.5002 9.99976 23.0002L1.95679 18.0852C1.36239 17.7219 0.999756 17.0748 0.999756 16.3782V7.62329C0.999756 6.92666 1.36243 6.2796 1.95679 5.91626L9.99976 1.00024ZM12.9998 6.00024C12.9998 5.58823 12.5296 5.35265 12.2 5.59985L10.9998 6.50024V18.0002C10.9999 18.4121 11.471 18.6468 11.8005 18.3997L12.9998 17.5002V6.00024ZM14.9998 9.00024V15.5002C14.9999 15.9121 15.471 16.1468 15.8005 15.8997L16.9998 15.0002V9.00024H14.9998ZM8.99976 8.50024C8.99976 8.08823 8.52957 7.85265 8.19995 8.09985L6.99976 9.00024V15.0002H8.99976V8.50024Z"
      />
    </svg>
  )
}

export interface BrandInfo {
  id: string
  /** What the mark is followed by, top-left of every slide. */
  wordmark: string
  /** The wordmark as the product's own header spells it. */
  product: string
  /** The host the product runs on — the mock browser's address bar. */
  domain: string
  Mark: ComponentType
}

/** The one brand these decks carry. The mocks read the product name and host
 *  from here, so a product window matches the mark on the slide and the name
 *  is spelled in one place. */
export const BRAND: BrandInfo = { id: 'base', wordmark: 'Base.vn', product: 'Base.vn', domain: 'base.vn', Mark: BaseMark }

/** The brand with its mark and product strings. */
export function useBrand(): BrandInfo {
  return BRAND
}

/** Just the mark, in the current colour — for product chrome. */
export function BrandMark() {
  return <BaseMark />
}

interface Props {
  /** Pin to the top-left corner of a full-bleed slide (the title slides), at
   *  the same spot the frame puts it on every other slide. */
  corner?: boolean
}

/** The Base mark and wordmark — top-left of every slide. */
export function Brand({ corner }: Props) {
  return (
    <span className={corner ? 'brand brand-corner' : 'brand'}>
      <BaseMark />
      <b>{BRAND.wordmark}</b>
    </span>
  )
}
