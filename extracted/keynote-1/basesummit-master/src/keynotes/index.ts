import type { Keynote } from '../engine/types'
import { agent } from './agent'
import { launch } from './launch'
import { intelligence } from './intelligence'

export const keynotes: Keynote[] = [
  intelligence,
  agent,
  launch,
]
