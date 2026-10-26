/** Which of the two presenting windows this document is.
 *  - `solo`      one window, the deck with its presenter chrome (the default).
 *  - `presenter` the laptop: notes, timer, next slide, controls.
 *  - `audience`  the projector: the stage and nothing else.
 *  Carried in the URL (`?view=presenter`) so a reload keeps the role. */
export type Role = 'solo' | 'presenter' | 'audience'

export function roleFromUrl(): Role {
  const v = new URLSearchParams(location.search).get('view')
  return v === 'presenter' || v === 'audience' ? v : 'solo'
}

export function writeRoleToUrl(role: Role) {
  const u = new URL(location.href)
  if (role === 'solo') u.searchParams.delete('view')
  else u.searchParams.set('view', role)
  history.replaceState(null, '', u)
}

/** The URL for the projector window, on the slide the deck is on now. */
export const audienceUrl = (hash: string = location.hash) =>
  `${location.origin}${location.pathname}?view=audience${hash}`

const WINDOW_NAME = 'aisummit-audience'

/** Opens the projector window. Opened synchronously inside the click so the
 *  popup blocker lets it through; the move onto the second screen is a
 *  best-effort afterthought, because placing a window there needs the
 *  window-management permission and that can only be asked for, not assumed. */
export function openAudienceWindow(hash: string = location.hash): Window | null {
  const w = window.open(audienceUrl(hash), WINDOW_NAME, 'popup=yes,width=1280,height=720')
  if (w) void placeOnSecondScreen(w)
  return w
}

interface ScreenInfo { availLeft: number; availTop: number; availWidth: number; availHeight: number; isPrimary: boolean }

/** Chrome's Window Management API: find a screen that is not the one this
 *  window is on, and put the projector window there, full size. */
export async function placeOnSecondScreen(w: Window): Promise<boolean> {
  try {
    const get = (window as unknown as { getScreenDetails?: () => Promise<{ screens: ScreenInfo[] }> }).getScreenDetails
    if (!get) return false
    const { screens } = await get.call(window)
    const other = screens.find(s => !s.isPrimary) ?? screens.find(s => s.availLeft !== window.screenLeft)
    if (!other || w.closed) return false
    w.moveTo(other.availLeft, other.availTop)
    w.resizeTo(other.availWidth, other.availHeight)
    return true
  } catch {
    return false   // permission refused, or a browser without the API
  }
}
