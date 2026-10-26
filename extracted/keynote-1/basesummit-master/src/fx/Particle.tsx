import { useReducedMotion } from 'motion/react'

export type Tone = 'blue' | 'cyan' | 'amber'

interface Props {
  /** id of the path to travel. */
  path: string
  dur?: number
  /** Negative values start mid-journey, so lanes look already busy; positive
   *  values hold the particle back — e.g. until the lane has been drawn. */
  begin?: number
  r?: number
  tone?: Tone
  /** Length of a meteor tail behind the head; 0 (default) is a plain dot. */
  tail?: number
}

/** A glowing dot travelling a path — native SMIL, no JS per frame. With a
 *  `tail` it becomes a meteor: a small head pulling a fading streak, turned to
 *  face along the path, fading in as it leaves and out as it arrives, hidden
 *  entirely until its `begin`. */
export function Particle({ path, dur = 3.6, begin = 0, r = 9, tone = 'blue', tail = 0 }: Props) {
  const reduce = useReducedMotion()
  if (reduce) return null
  const motion = (rotate?: string) => (
    <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" calcMode="linear" rotate={rotate}>
      <mpath href={`#${path}`} />
    </animateMotion>
  )
  if (tail <= 0) return <circle r={r} fill={`url(#dot-${tone})`}>{motion()}</circle>
  const hw = r * 0.6
  return (
    <g opacity={0}>
      <path d={`M 0 ${-hw} Q ${-tail * 0.3} ${-hw * 0.55} ${-tail} 0 Q ${-tail * 0.3} ${hw * 0.55} 0 ${hw} Z`} fill={`url(#tail-${tone})`} />
      <circle r={r} fill={`url(#dot-${tone})`} />
      {motion('auto')}
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.92;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </g>
  )
}
