import { keynotes } from './keynotes'
import { Deck } from './engine/Deck'
import { Launcher } from './engine/Launcher'
import { Gallery } from './gallery/Gallery'
import { useRoute } from './engine/route'

export function App() {
  const route = useRoute()
  if (route.keynote === 'resources') return <Gallery />
  const keynote = keynotes.find(k => k.id === route.keynote)
  if (!keynote) return <Launcher keynotes={keynotes} />
  // The programme runs on: past a keynote's last slide, Next opens the one
  // listed after it (skipping any still in preparation), and Back mirrors.
  const live = keynotes.filter(k => !k.soon && k.slides.length)
  const at = live.indexOf(keynote)
  return <Deck keynote={keynote} route={route} before={live[at - 1]} after={live[at + 1]} />
}
