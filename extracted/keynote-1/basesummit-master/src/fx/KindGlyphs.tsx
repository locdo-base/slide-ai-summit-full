/** Small scenes, one per kind of agent, each drawing the agent's boundary.
 *  Light = a person's scope, blue = a platform scope, cyan = the agent. */

const A = 'var(--blue-100)', B = 'var(--blue-300)', C = 'var(--cyan-300)', L = 'var(--line-strong)'

function Agent({ x, y, r = 13 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <rect x={x - r} y={y - r * 0.8} width={r * 2} height={r * 1.6} rx={r * 0.35} fill="var(--navy-900)" stroke={C} strokeWidth={2} />
      <circle cx={x - r * 0.38} cy={y} r={r * 0.17} fill={C} />
      <circle cx={x + r * 0.38} cy={y} r={r * 0.17} fill={C} />
      <path d={`M ${x} ${y - r * 0.8} v ${-r * 0.4}`} stroke={C} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

function Person({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y - 9} r={7} fill={A} />
      <path d={`M ${x - 14} ${y + 14} q 14 -20 28 0`} fill="none" stroke={A} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  )
}

export function Laptop({ x, y, w = 120, stroke = A }: { x: number; y: number; w?: number; stroke?: string }) {
  const h = w * 0.58
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="var(--navy-800)" stroke={stroke} strokeWidth={2} />
      <path d={`M ${x - w * 0.1} ${y + h + 14} h ${w * 1.2}`} stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
      <path d={`M ${x} ${y + h} l ${-w * 0.1} 14 M ${x + w} ${y + h} l ${w * 0.1} 14`} stroke={stroke} strokeWidth={2} />
    </g>
  )
}

/** A personal agent: inside the owner's own circle, beside the owner. */
export function AssistantGlyph() {
  return (
    <svg width={240} height={150} viewBox="0 0 240 150">
      <circle cx={120} cy={75} r={62} fill="none" stroke={A} strokeWidth={2} strokeDasharray="8 7" />
      <Person x={96} y={76} />
      <Agent x={146} y={76} />
      {['tasks', 'deals', 'services'].map((t, i) => (
        <text key={t} x={120} y={26 + i * 0} fontSize={0}>{t}</text>
      ))}
    </svg>
  )
}

/** A service agent: lives inside one app tile. */
export function CopilotGlyph() {
  return (
    <svg width={240} height={150} viewBox="0 0 240 150">
      <rect x={60} y={22} width={120} height={106} rx={12} fill="var(--navy-800)" stroke={B} strokeWidth={2} />
      <rect x={76} y={40} width={60} height={9} rx={4} fill={L} />
      <rect x={76} y={58} width={88} height={7} rx={3.5} fill="var(--line)" />
      <rect x={76} y={72} width={70} height={7} rx={3.5} fill="var(--line)" />
      <Agent x={150} y={104} />
    </svg>
  )
}

/** A workflow agent: input in, output out, nothing kept. */
export function WorkflowGlyph() {
  return (
    <svg width={240} height={150} viewBox="0 0 240 150">
      <rect x={22} y={55} width={40} height={40} rx={6} fill="var(--navy-800)" stroke={L} strokeWidth={1.6} />
      <path d="M 66 75 h 32" stroke={L} strokeWidth={2} />
      <rect x={100} y={48} width={54} height={54} rx={10} fill="var(--navy-900)" stroke={C} strokeWidth={2} />
      <Agent x={127} y={75} />
      <path d="M 158 75 h 32" stroke={L} strokeWidth={2} />
      <path d="M 186 69 l 8 6 l -8 6" fill="none" stroke={L} strokeWidth={2} strokeLinecap="round" />
      <rect x={196} y={55} width={40} height={40} rx={6} fill="var(--navy-800)" stroke={B} strokeWidth={1.8} />
    </svg>
  )
}

/** A desktop agent: on the owner's machine, reaching past the platform. */
export function DesktopGlyph() {
  return (
    <svg width={240} height={150} viewBox="0 0 240 150">
      <rect x={14} y={14} width={110} height={122} rx={12} fill="none" stroke={B} strokeWidth={1.6} strokeDasharray="6 6" />
      <text x={24} y={34} fontSize={13} fill={B} opacity={0.9}>platform</text>
      <Laptop x={70} y={44} w={100} />
      <Agent x={120} y={72} r={12} />
      <ellipse cx={130} cy={82} rx={104} ry={60} fill="none" stroke={A} strokeWidth={2} strokeDasharray="8 7" />
      <circle cx={214} cy={56} r={6} fill="none" stroke={A} strokeWidth={1.8} />
      <circle cx={222} cy={104} r={6} fill="none" stroke={A} strokeWidth={1.8} />
    </svg>
  )
}

/** An expert agent: one card, shared by many workspaces. */
export function ExpertGlyph() {
  return (
    <svg width={240} height={150} viewBox="0 0 240 150">
      {[[30, 100], [120, 118], [206, 100]].map(([x, y], i) => (
        <rect key={i} x={x - 22} y={y - 14} width={44} height={28} rx={6} fill="none" stroke={B} strokeWidth={1.6} />
      ))}
      <path d="M 120 78 L 30 86 M 120 78 L 120 104 M 120 78 L 206 86" stroke={L} strokeWidth={1.4} />
      <rect x={82} y={18} width={76} height={62} rx={10} fill="var(--navy-800)" stroke={C} strokeWidth={2} />
      <Agent x={120} y={44} r={12} />
      <rect x={100} y={62} width={40} height={10} rx={5} fill={C} opacity={0.85} />
    </svg>
  )
}

