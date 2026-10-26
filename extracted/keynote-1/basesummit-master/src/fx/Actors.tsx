/** The two actors of the work model, as small inline marks. */
export function HumanMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <circle cx={14} cy={9} r={5} fill="var(--amber-300)" />
      <path d="M 4 25 q 10 -14 20 0" fill="none" stroke="var(--amber-300)" strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  )
}

export function AgentMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <rect x={4} y={6} width={20} height={17} rx={4} fill="none" stroke="var(--cyan-300)" strokeWidth={2.2} />
      <circle cx={10.5} cy={14} r={2.4} fill="var(--cyan-300)" />
      <circle cx={17.5} cy={14} r={2.4} fill="var(--cyan-300)" />
      <path d="M 14 6 v -4" stroke="var(--cyan-300)" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  )
}
