import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/sora'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/outfit'
import '@fontsource-variable/manrope'
import '@fontsource-variable/source-sans-3'
import '@fontsource-variable/newsreader'
import '@fontsource-variable/afacad'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/dancing-script'
// Be Vietnam Pro ships static weights only — the three the deck uses.
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/600.css'
import './theme/tokens.css'
import './theme/themes.css'
import './theme/base.css'
import './theme/components.css'
import './theme/intelligence.css'
import './theme/service-belt.css'
import './theme/chrome.css'
import './mocks/mock.css'
import { App } from './App'
import { applySettings, readSettings } from './theme/settings'

// Theme and type before the first paint, so nothing flashes the default.
applySettings(readSettings())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
