/** Shared SVG defs, mounted once per deck. The stops read palette tokens, so
 *  every particle and halo follows the theme. Any inline SVG in the document can
 *  reference these ids. Particles are radial-gradient discs rather than
 *  filtered circles: a hundred glowing dots with `filter` would cost frames. */
export function FxDefs() {
  return (
    <defs>
      <radialGradient id="dot-blue">
        <stop offset="0" stopColor="var(--white)" />
        <stop offset="0.3" stopColor="var(--blue-200)" />
        <stop offset="1" stopColor="var(--blue-500)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="dot-cyan">
        <stop offset="0" stopColor="var(--white)" />
        <stop offset="0.3" stopColor="var(--cyan-300)" />
        <stop offset="1" stopColor="var(--cyan-300)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="dot-amber">
        <stop offset="0" stopColor="var(--white)" />
        <stop offset="0.3" stopColor="var(--amber-300)" />
        <stop offset="1" stopColor="var(--amber-300)" stopOpacity="0" />
      </radialGradient>
      {/* Meteor tails: brightest at the head (the right edge of the tail's box), gone at the tip. */}
      <linearGradient id="tail-blue" x1="1" x2="0" y1="0" y2="0">
        <stop offset="0" stopColor="var(--blue-200)" stopOpacity="0.9" />
        <stop offset="0.35" stopColor="var(--blue-300)" stopOpacity="0.4" />
        <stop offset="1" stopColor="var(--blue-500)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="tail-cyan" x1="1" x2="0" y1="0" y2="0">
        <stop offset="0" stopColor="var(--cyan-300)" stopOpacity="0.9" />
        <stop offset="0.35" stopColor="var(--cyan-300)" stopOpacity="0.4" />
        <stop offset="1" stopColor="var(--cyan-300)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="tail-amber" x1="1" x2="0" y1="0" y2="0">
        <stop offset="0" stopColor="var(--amber-300)" stopOpacity="0.9" />
        <stop offset="0.35" stopColor="var(--amber-300)" stopOpacity="0.4" />
        <stop offset="1" stopColor="var(--amber-300)" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="halo-blue">
        <stop offset="0" stopColor="var(--blue-500)" stopOpacity="0.35" />
        <stop offset="1" stopColor="var(--blue-500)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="halo-cyan">
        <stop offset="0" stopColor="var(--cyan-300)" stopOpacity="0.3" />
        <stop offset="1" stopColor="var(--cyan-300)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="line-fade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="var(--blue-300)" stopOpacity="0" />
        <stop offset="0.5" stopColor="var(--blue-300)" stopOpacity="0.6" />
        <stop offset="1" stopColor="var(--blue-300)" stopOpacity="0" />
      </linearGradient>
      <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  )
}
