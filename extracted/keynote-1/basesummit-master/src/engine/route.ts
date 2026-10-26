import { useEffect, useState } from 'react'

/** "#/work/4/1" means keynote "work", slide 4 (1-based in the URL), build step 1. */
export interface Route {
  keynote: string | null
  slide: number   // 0-based
  step: number
}

export function parseHash(h: string = location.hash): Route {
  const parts = h.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (!parts.length) return { keynote: null, slide: 0, step: 0 }
  const slide = Math.max(0, (parseInt(parts[1] ?? '1', 10) || 1) - 1)
  const step = Math.max(0, parseInt(parts[2] ?? '0', 10) || 0)
  return { keynote: parts[0], slide, step }
}

export function toHash(r: Route): string {
  if (!r.keynote) return '#/'
  return `#/${r.keynote}/${r.slide + 1}${r.step ? `/${r.step}` : ''}`
}

export function navigate(r: Route) {
  const h = toHash(r)
  if (location.hash !== h) location.hash = h
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash())
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
