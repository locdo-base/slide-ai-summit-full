import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { Brand } from '../ui/Brand'

/* The landing site's architecture hero, ported for the stage
   (C:/ai/landing/rework/src/components/architecture/VennDiagram.jsx).

   A Canvas2D scene: services are the SUN, a luminous anchor at the centre;
   the three groups around it are STAR CLUSTERS, each a small galaxy of points
   orbiting a core star and tethered to the sun. Each cluster has its own
   personality (count, distance, orbit periods) so the constellation never
   looks stamped.

   The deck is always dark, so only the source's dark-mode branches survive:
   the main canvas screens onto the ground, a second canvas carries the comet,
   flare and sparks unblended so they read as additive light, and the labels
   and the sun anchor are DOM overlays so they stay crisp. The box is a fixed
   stage-pixel square (the deck scales the whole stage with a transform, so
   measuring it on screen would read the scaled size); geometry was tuned at a
   600px box and scales from there. Under reduced motion — the rail's
   thumbnails — it draws one frame and stops. */

interface Osc { amp: number; period: number; phase: number }
interface Orbit { rx: number; ry: number; period: number; phase: number }
interface Galaxy {
  id: string
  core: string
  glow: string
  /** Per-satellite palette — variation within the cluster's colour family. */
  satPalette: string[]
  /** Polar position around the sun. */
  baseAngle: number
  baseRadius: number
  /** Slow arc swing around baseAngle — the cluster orbits the sun. */
  arcOsc: Osc
  /** Slow in/out pulse — the cluster drifts toward and away from the sun. */
  radialPulse: Osc
  /** Small Lissajous noise on top of the above. */
  drift: { ax: number; ay: number; px: number; py: number; phx: number; phy: number }
  /** The core star orbits its orbit-centre on a small ellipse. */
  coreOrbit: Orbit
  /** Visible zone radius — the atmospheric boundary. */
  zoneRadius: number
  /** Mouse parallax strength. */
  parallax: number
  /** Anchored "key" satellites, then the supporting set. */
  primary: Orbit[]
  secondary: Orbit[]
}

// Upper-left, upper-right, bottom — the labels come from props in this order.
const GALAXIES: Galaxy[] = [
  {
    id: 'software',
    // Sage / teal family — settled, established
    core: '#3FAE8B',
    glow: '#A8E0CC',
    satPalette: ['#3FAE8B', '#62C6A4', '#2E8E70', '#79CFA9', '#4A9F83'],
    baseAngle: -2.45,
    baseRadius: 138,
    arcOsc: { amp: 0.36, period: 38000, phase: 0.0 },
    radialPulse: { amp: 12, period: 28000, phase: 1.2 },
    drift: { ax: 6, ay: 5, px: 14000, py: 16000, phx: 0.0, phy: 1.3 },
    coreOrbit: { rx: 14, ry: 10, period: 10200, phase: 0.4 },
    zoneRadius: 165,
    parallax: 0.55,
    primary: [
      { rx: 30, ry: 24, period: 8400, phase: 0.0 },
      { rx: 48, ry: 36, period: 12200, phase: 2.0 },
    ],
    secondary: [
      { rx: 22, ry: 30, period: 6400, phase: 1.0 },
      { rx: 58, ry: 42, period: 14800, phase: 3.4 },
      { rx: 28, ry: 50, period: 9700, phase: 4.2 },
      { rx: 52, ry: 30, period: 11500, phase: 5.5 },
      { rx: 36, ry: 22, period: 8800, phase: 0.8 },
      { rx: 64, ry: 52, period: 16400, phase: 2.6 },
      { rx: 40, ry: 26, period: 10400, phase: 4.7 },
      { rx: 26, ry: 38, period: 7300, phase: 1.9 },
    ],
  },
  {
    id: 'ai',
    // Sky / indigo family — intelligent, vast; a faster, larger swing
    core: '#4670D8',
    glow: '#A8C0F5',
    satPalette: ['#4670D8', '#5E8AE5', '#3559BE', '#7099E8', '#506BCB'],
    baseAngle: -0.70,
    baseRadius: 156,
    arcOsc: { amp: 0.42, period: 32000, phase: 2.1 },
    radialPulse: { amp: 15, period: 24000, phase: 0.5 },
    drift: { ax: 5, ay: 6, px: 12000, py: 14000, phx: 1.6, phy: 0.4 },
    coreOrbit: { rx: 12, ry: 16, period: 9200, phase: 1.6 },
    zoneRadius: 145,
    parallax: 0.85,
    // Fewer satellites — sparse, but each one matters
    primary: [
      { rx: 32, ry: 26, period: 6800, phase: 0.3 },
      { rx: 28, ry: 38, period: 5200, phase: 3.0 },
    ],
    secondary: [
      { rx: 52, ry: 36, period: 9400, phase: 1.5 },
      { rx: 24, ry: 28, period: 5800, phase: 2.6 },
      { rx: 60, ry: 26, period: 10800, phase: 0.7 },
      { rx: 42, ry: 46, period: 8200, phase: 4.1 },
      { rx: 34, ry: 22, period: 6900, phase: 5.3 },
      { rx: 56, ry: 40, period: 11700, phase: 3.5 },
    ],
  },
  {
    id: 'operations',
    // Lilac / violet family — human, organic; the calmest territory
    core: '#7765C8',
    glow: '#BFB1ED',
    satPalette: ['#7765C8', '#9181DA', '#5F4DB8', '#A89AE0', '#6F60C0'],
    baseAngle: 1.57,
    baseRadius: 128,
    arcOsc: { amp: 0.28, period: 44000, phase: 1.3 },
    radialPulse: { amp: 10, period: 32000, phase: 2.7 },
    drift: { ax: 6, ay: 5, px: 15000, py: 13000, phx: 1.3, phy: 2.7 },
    coreOrbit: { rx: 16, ry: 9, period: 11400, phase: 2.8 },
    zoneRadius: 180,
    parallax: 0.65,
    primary: [
      { rx: 30, ry: 24, period: 7400, phase: 0.2 },
      { rx: 46, ry: 36, period: 11200, phase: 1.7 },
      { rx: 24, ry: 40, period: 8800, phase: 3.3 },
    ],
    secondary: [
      { rx: 54, ry: 28, period: 10800, phase: 0.7 },
      { rx: 30, ry: 50, period: 9400, phase: 4.0 },
      { rx: 42, ry: 22, period: 7600, phase: 5.0 },
      { rx: 62, ry: 36, period: 13400, phase: 2.4 },
      { rx: 22, ry: 32, period: 6600, phase: 5.6 },
      { rx: 48, ry: 54, period: 12200, phase: 3.6 },
      { rx: 36, ry: 26, period: 8400, phase: 1.3 },
      { rx: 58, ry: 44, period: 14600, phase: 4.6 },
    ],
  },
]

const STARDUST = 36
const CIRCLE_PALETTE = ['#3FAE8B', '#4670D8', '#7765C8']

interface Sat { x: number; y: number; tier: 'primary' | 'secondary'; alpha: number; color: string }
interface GalaxyState { g: Galaxy; ox: number; oy: number; cx: number; cy: number; sats: Sat[]; scale: number }
interface Packet { t: number; period: number }
interface Spark { spawnT: number; angle: number; speed: number; lifetime: number }
interface Dust { x: number; y: number; r: number; vx: number; vy: number; phase: number; period: number }
interface Circle { ccX: number; ccY: number; ccR: number }

interface Props {
  /** Box size in stage px — the scene is square. */
  size?: number
  /** Cluster labels: upper-left, upper-right, bottom. */
  labels?: [string, string, string]
  /** The word under the sun. */
  center?: string
}

export function ServiceGalaxy({ size = 760, labels = ['Software', 'Agents', 'Operations'], center = 'Services' }: Props) {
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparkRef = useRef<HTMLCanvasElement>(null)   // no blend — the comet can shine
  const anchorRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current, canvas = canvasRef.current, spark = sparkRef.current
    if (!stage || !canvas || !spark) return
    const ctx = canvas.getContext('2d', { alpha: true })
    const sparkCtx = spark.getContext('2d', { alpha: true })
    if (!ctx || !sparkCtx) return

    // --- Stage / DPI setup — a fixed stage-pixel square -------------------
    const W = size, H = size
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    for (const [c, cc] of [[canvas, ctx], [spark, sparkCtx]] as const) {
      c.width = Math.round(W * dpr)
      c.height = Math.round(H * dpr)
      cc.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // --- Stardust (small, slow, twinkling) — reproducible from the index ----
    const dust: Dust[] = Array.from({ length: STARDUST }, (_, i) => ({
      x: Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1),
      y: Math.abs((Math.cos(i * 78.233) * 43758.5453) % 1),
      r: 0.7 + ((i * 17) % 13) / 18,
      vx: ((i % 7) - 3) * 0.0008,
      vy: ((i % 5) - 2) * 0.0006,
      phase: i * 0.91,
      period: 2400 + (i * 137) % 3000,
    }))

    // --- One travelling packet per tether, staggered ------------------------
    const packets: Packet[] = GALAXIES.map((_, i) => ({ t: i * 1700, period: 5200 + i * 600 }))

    // --- Solar sparks — bright bursts that fly out of the sun and respawn on
    // random trajectories, so the emission never repeats.
    const sparks: Spark[] = Array.from({ length: 14 }, (_, i) => ({
      spawnT: -i * 240 - Math.floor(Math.random() * 1100),
      angle: Math.random() * Math.PI * 2,
      speed: 0.40 + Math.random() * 0.40,
      lifetime: 1100 + Math.floor(Math.random() * 900),
    }))

    // --- Mouse parallax (smoothed) ------------------------------------------
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      mouse.tx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
      mouse.ty = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))
    }
    const onLeave = () => { mouse.tx = 0.5; mouse.ty = 0.5 }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)

    // --- Frame loop ----------------------------------------------------------
    const start = performance.now()
    let raf = 0
    let running = true

    const frame = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      const t = now - start

      // Geometry was tuned at a 600px box; renormalise for the size in use.
      const scale = Math.min(W, H) / 600
      const mxBase = (mouse.x - 0.5) * 18 * scale
      const myBase = (mouse.y - 0.5) * 18 * scale
      const sx = W / 2, sy = H / 2

      // Cluster positions for this frame — each orbits the sun on its own.
      const galaxyState: GalaxyState[] = GALAXIES.map(g => {
        const angle = g.baseAngle + Math.sin((t / g.arcOsc.period) * Math.PI * 2 + g.arcOsc.phase) * g.arcOsc.amp
        const radius = (g.baseRadius + Math.sin((t / g.radialPulse.period) * Math.PI * 2 + g.radialPulse.phase) * g.radialPulse.amp) * scale
        const nx = Math.sin((t / g.drift.px) * Math.PI * 2 + g.drift.phx) * g.drift.ax * scale
        const ny = Math.cos((t / g.drift.py) * Math.PI * 2 + g.drift.phy) * g.drift.ay * scale
        const ox = sx + Math.cos(angle) * radius + nx + mxBase * g.parallax
        const oy = sy + Math.sin(angle) * radius + ny + myBase * g.parallax
        const ca = (t / g.coreOrbit.period) * Math.PI * 2 + g.coreOrbit.phase
        const cx = ox + Math.cos(ca) * g.coreOrbit.rx * scale
        const cy = oy + Math.sin(ca) * g.coreOrbit.ry * scale

        // Satellites breathe inside the zone rather than clumping (SPREAD),
        // and orbit slower than their periods imply (SPEED).
        const SAT_SPREAD = 2.2, SAT_SPEED = 0.56
        const tSat = t * SAT_SPEED
        const sats: Sat[] = []
        for (const o of g.primary) {
          const a = (tSat / o.period) * Math.PI * 2 + o.phase
          sats.push({ x: cx + Math.cos(a) * o.rx * scale * SAT_SPREAD, y: cy + Math.sin(a) * o.ry * scale * SAT_SPREAD, tier: 'primary', alpha: 0.88 + Math.sin(t / 1500 + o.phase * 2) * 0.10, color: g.core })
        }
        for (const o of g.secondary) {
          const a = (tSat / o.period) * Math.PI * 2 + o.phase
          sats.push({ x: cx + Math.cos(a) * o.rx * scale * SAT_SPREAD, y: cy + Math.sin(a) * o.ry * scale * SAT_SPREAD, tier: 'secondary', alpha: 0.68 + Math.sin(t / 1200 + o.phase * 3) * 0.18, color: g.core })
        }
        return { g, ox, oy, cx, cy, sats, scale }
      })

      ctx.clearRect(0, 0, W, H)
      sparkCtx.clearRect(0, 0, W, H)

      // The circle through the three cores — the structural ring and the
      // comet's track. It reshapes as the cores move.
      const circle = computeCoreCircle(galaxyState, scale)

      // The sun's luminous centre travels a tight orbit around the anchor
      // (16s, plus a wobble) so the corona and the tethers never sit still.
      const orbitAngle = (t / 16000) * Math.PI * 2
      const orbitR = 4 * scale
      const sunGlowX = sx + Math.cos(orbitAngle) * orbitR + Math.sin(t / 3100 + 0.5) * 3 * scale
      const sunGlowY = sy + Math.sin(orbitAngle) * orbitR + Math.cos(t / 3700 + 1.4) * 2.5 * scale

      drawStardust(ctx, dust, t, W, H, scale)
      if (circle) drawCoreCircle(ctx, circle, t)
      for (const s of galaxyState) drawGalaxyZone(ctx, s)
      galaxyState.forEach((s, i) => drawConnection(ctx, sunGlowX, sunGlowY, s, packets[i], t))
      drawSatelliteNetwork(ctx, galaxyState, scale)
      for (const s of galaxyState) drawSatellites(ctx, s)
      for (const s of galaxyState) drawCoreHub(ctx, s, t)
      drawSun(ctx, sunGlowX, sunGlowY, t, scale)
      // Additive light on the unblended canvas
      if (circle) drawComet(sparkCtx, circle, t, scale)
      drawSunFlare(sparkCtx, sunGlowX, sunGlowY, t, scale)
      drawSunSparks(sparkCtx, sunGlowX, sunGlowY, t, scale, sparks)

      // Labels hug each core on its outward side, a tag on the cluster itself.
      galaxyState.forEach((s, i) => {
        const el = labelRefs.current[i]
        if (!el) return
        const vx = s.ox - sx, vy = s.oy - sy
        const len = Math.max(1, Math.hypot(vx, vy))
        const off = 56 * s.scale
        el.style.transform = `translate3d(${(s.ox + (vx / len) * off).toFixed(1)}px, ${(s.oy + (vy / len) * off).toFixed(1)}px, 0) translate(-50%, -50%)`
      })

      // The anchor breathes and counters the parallax a touch.
      if (anchorRef.current) {
        const breath = 1 + Math.sin(t / 3600) * 0.025
        anchorRef.current.style.transform = `translate3d(${(-mxBase * 0.06).toFixed(2)}px, ${(-myBase * 0.06).toFixed(2)}px, 0) scale(${breath.toFixed(4)})`
      }

      if (running) raf = requestAnimationFrame(frame)
    }

    if (reduce) {
      running = false
      frame(start)
    } else {
      raf = requestAnimationFrame(frame)
    }

    // Pause while offscreen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running && !reduce) {
        running = true
        raf = requestAnimationFrame(frame)
      } else if (!entry.isIntersecting) {
        running = false
        cancelAnimationFrame(raf)
      }
    }, { threshold: 0 })
    io.observe(stage)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [size, reduce])

  return (
    <div className="galaxy" ref={stageRef} style={{ width: size, height: size }}>
      <canvas ref={canvasRef} className="galaxy-main" style={{ width: size, height: size }} aria-hidden />
      <canvas ref={sparkRef} className="galaxy-spark" style={{ width: size, height: size }} aria-hidden />
      {labels.map((label, i) => (
        <div key={i} className="galaxy-label" ref={el => { labelRefs.current[i] = el }}>{label}</div>
      ))}
      {/* The sun anchor: the platform mark, with the word beneath. The canvas
          draws the glow and corona around it, so the disc itself stays bare. */}
      <div className="galaxy-sun">
        <div className="galaxy-sun-core" ref={anchorRef}>
          <Brand />
          <div className="galaxy-sun-word">{center}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Render helpers ──────────────────────────────────────────────────────

type Ctx = CanvasRenderingContext2D

/** `#RRGGBB` at an alpha, for canvas fills. */
function hexA(hex: string, a: number) {
  const h = hex.replace('#', '')
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a.toFixed(3)})`
}

// Cool-white twinkles against the night sky.
function drawStardust(ctx: Ctx, dust: Dust[], t: number, W: number, H: number, scale: number) {
  ctx.save()
  for (const p of dust) {
    const x = ((p.x + (p.vx * t) / 1000) % 1 + 1) % 1 * W
    const y = ((p.y + (p.vy * t) / 1000) % 1 + 1) % 1 * H
    const tw = 0.45 + Math.sin((t / p.period) * Math.PI * 2 + p.phase) * 0.35
    ctx.globalAlpha = Math.min(1, Math.max(0.05, tw) * 1.15)
    ctx.fillStyle = '#A8BBE0'
    ctx.beginPath()
    ctx.arc(x, y, p.r * scale, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

// The circumscribed circle through the three cores, or null when they are
// nearly colinear or the circle is unreasonable.
function computeCoreCircle(gs: GalaxyState[], scale: number): Circle | null {
  if (gs.length < 3) return null
  const [a, b, c] = gs
  const D = 2 * (a.cx * (b.cy - c.cy) + b.cx * (c.cy - a.cy) + c.cx * (a.cy - b.cy))
  if (Math.abs(D) < 0.5) return null
  const sq1 = a.cx * a.cx + a.cy * a.cy, sq2 = b.cx * b.cx + b.cy * b.cy, sq3 = c.cx * c.cx + c.cy * c.cy
  const ccX = (sq1 * (b.cy - c.cy) + sq2 * (c.cy - a.cy) + sq3 * (a.cy - b.cy)) / D
  const ccY = (sq1 * (c.cx - b.cx) + sq2 * (a.cx - c.cx) + sq3 * (b.cx - a.cx)) / D
  const ccR = Math.hypot(ccX - a.cx, ccY - a.cy)
  if (!Number.isFinite(ccR) || ccR < 30 * scale || ccR > 800 * scale) return null
  return { ccX, ccY, ccR }
}

// A 1px ring through the cores; the three cluster hues flow around its edge
// and the gradient itself turns slowly. A structural hint, kept whisper-soft.
function drawCoreCircle(ctx: Ctx, c: Circle, t: number) {
  ctx.save()
  ctx.lineWidth = 1
  if (typeof ctx.createConicGradient === 'function') {
    const grad = ctx.createConicGradient((t / 14000) * Math.PI * 2, c.ccX, c.ccY)
    grad.addColorStop(0.00, hexA(CIRCLE_PALETTE[0], 0.18))
    grad.addColorStop(0.33, hexA(CIRCLE_PALETTE[1], 0.18))
    grad.addColorStop(0.66, hexA(CIRCLE_PALETTE[2], 0.18))
    grad.addColorStop(1.00, hexA(CIRCLE_PALETTE[0], 0.18))
    ctx.strokeStyle = grad
  } else {
    ctx.strokeStyle = 'rgba(160, 180, 240, 0.15)'
  }
  ctx.beginPath()
  ctx.arc(c.ccX, c.ccY, c.ccR, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

// Lens flare — a 4-arm cross plus a dimmer 45° cross, additive, turning very
// slowly and breathing on two rhythms. Short arms and a blue hue on dark so it
// reads as atmospheric refraction, not glare.
function drawSunFlare(ctx: Ctx, sx: number, sy: number, t: number, scale: number) {
  const pulseSlow = 0.55 + (Math.sin(t / 3200) * 0.5 + 0.5) * 0.45
  const pulseFast = 0.85 + Math.sin(t / 1100) * 0.15
  const c1 = '160, 195, 240', c2 = '120, 165, 230'
  const intensityScale = 0.20

  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.translate(sx, sy)
  ctx.rotate((t / 28000) * Math.PI * 2)

  const armStart = 16 * scale
  const armEnd = 30 * scale
  for (let i = 0; i < 4; i++) {
    ctx.save()
    ctx.rotate((i / 4) * Math.PI * 2)
    const intensity = pulseSlow * pulseFast * intensityScale
    const grad = ctx.createLinearGradient(armStart, 0, armEnd, 0)
    grad.addColorStop(0, `rgba(${c1}, ${(0.55 * intensity).toFixed(3)})`)
    grad.addColorStop(0.35, `rgba(${c2}, ${(0.18 * intensity / 0.25).toFixed(3)})`)
    grad.addColorStop(1, `rgba(${c2}, 0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(armStart, -2.2 * scale)
    ctx.lineTo(armEnd, 0)
    ctx.lineTo(armStart, 2.2 * scale)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  ctx.rotate(Math.PI / 4)
  const armEnd2 = 19 * scale
  for (let i = 0; i < 4; i++) {
    ctx.save()
    ctx.rotate((i / 4) * Math.PI * 2)
    const intensity = (pulseSlow * 0.6 + 0.2) * intensityScale
    const grad = ctx.createLinearGradient(armStart, 0, armEnd2, 0)
    grad.addColorStop(0, `rgba(${c1}, ${(0.32 * intensity).toFixed(3)})`)
    grad.addColorStop(1, `rgba(${c1}, 0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(armStart, -1.2 * scale)
    ctx.lineTo(armEnd2, 0)
    ctx.lineTo(armStart, 1.2 * scale)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  ctx.restore()
}

// Small blue particles that emerge at the sun's edge, drift outward, fade,
// and respawn with new random parameters — mutates `sparks` in place.
function drawSunSparks(ctx: Ctx, sx: number, sy: number, t: number, scale: number, sparks: Spark[]) {
  const glowColor = '140, 175, 230', nucleusColor = '180, 210, 250'
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (const s of sparks) {
    let elapsed = t - s.spawnT
    if (elapsed < 0) continue
    if (elapsed > s.lifetime) {
      s.spawnT = t
      s.angle = Math.random() * Math.PI * 2
      s.speed = 0.40 + Math.random() * 0.40
      s.lifetime = 1100 + Math.floor(Math.random() * 900)
      elapsed = 0
    }
    const progress = elapsed / s.lifetime
    const dist = (22 + s.speed * elapsed * 0.040) * scale
    const x = sx + Math.cos(s.angle) * dist
    const y = sy + Math.sin(s.angle) * dist
    const alpha = Math.min(progress / 0.12, 1) * Math.min((1 - progress) / 0.28, 1)
    if (alpha < 0.03) continue

    const glow = ctx.createRadialGradient(x, y, 0, x, y, 4.5 * scale)
    glow.addColorStop(0, `rgba(${glowColor}, ${(0.05 * alpha).toFixed(3)})`)
    glow.addColorStop(1, `rgba(${glowColor}, 0)`)
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(x, y, 4.5 * scale, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = `rgba(${nucleusColor}, ${(0.10 * alpha).toFixed(3)})`
    ctx.beginPath()
    ctx.arc(x, y, 0.5 * scale, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

// A comet's head and tail: a stroke fading up to the head, then an additive
// halo and nucleus. Shared by the ring comet and the tether packets.
const COMET = {
  tailA: '230, 240, 255', tailB: '210, 230, 255', tailC: '200, 225, 255',
  haloOuter: '180, 210, 255', haloInner: '210, 230, 255', nucleus: '255, 255, 255',
}
function drawCometHead(ctx: Ctx, headX: number, headY: number, scale: number, fade: number) {
  ctx.globalCompositeOperation = 'lighter'
  const outerR = 7 * scale
  const outer = ctx.createRadialGradient(headX, headY, 0, headX, headY, outerR)
  outer.addColorStop(0, `rgba(${COMET.haloOuter}, ${(0.35 * fade).toFixed(3)})`)
  outer.addColorStop(0.4, `rgba(${COMET.haloOuter}, ${(0.18 * fade).toFixed(3)})`)
  outer.addColorStop(1, `rgba(${COMET.haloOuter}, 0)`)
  ctx.fillStyle = outer
  ctx.beginPath()
  ctx.arc(headX, headY, outerR, 0, Math.PI * 2)
  ctx.fill()

  const innerR = 1.6 * scale
  const inner = ctx.createRadialGradient(headX, headY, 0, headX, headY, innerR)
  inner.addColorStop(0, `rgba(${COMET.haloInner}, ${(0.55 * fade).toFixed(3)})`)
  inner.addColorStop(1, `rgba(${COMET.haloInner}, 0)`)
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.arc(headX, headY, innerR, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = `rgba(${COMET.nucleus}, ${(0.78 * fade).toFixed(3)})`
  ctx.beginPath()
  ctx.arc(headX, headY, 0.6 * scale, 0, Math.PI * 2)
  ctx.fill()
}
function cometTail(ctx: Ctx, tailX: number, tailY: number, headX: number, headY: number, fade: number) {
  const grad = ctx.createLinearGradient(tailX, tailY, headX, headY)
  grad.addColorStop(0, `rgba(${COMET.tailA}, 0)`)
  grad.addColorStop(0.55, `rgba(${COMET.tailA}, ${(0.07 * fade).toFixed(3)})`)
  grad.addColorStop(0.90, `rgba(${COMET.tailB}, ${(0.35 * fade).toFixed(3)})`)
  grad.addColorStop(1, `rgba(${COMET.tailC}, ${(0.55 * fade).toFixed(3)})`)
  return grad
}

// The comet riding the core ring — a cool blue-white streak so it never
// competes with the sun for the brightest highlight.
function drawComet(ctx: Ctx, c: Circle, t: number, scale: number) {
  const headAngle = ((t / 13000) % 1) * Math.PI * 2
  const tailStart = headAngle - Math.PI * 0.275
  const headX = c.ccX + Math.cos(headAngle) * c.ccR, headY = c.ccY + Math.sin(headAngle) * c.ccR
  const tailX = c.ccX + Math.cos(tailStart) * c.ccR, tailY = c.ccY + Math.sin(tailStart) * c.ccR

  ctx.save()
  ctx.strokeStyle = cometTail(ctx, tailX, tailY, headX, headY, 1)
  ctx.lineWidth = 1.1 * scale
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(c.ccX, c.ccY, c.ccR, tailStart, headAngle)
  ctx.stroke()
  drawCometHead(ctx, headX, headY, scale, 1)
  ctx.restore()
}

// Soft atmospheric halo around each cluster — the zone.
function drawGalaxyZone(ctx: Ctx, s: GalaxyState) {
  const r = s.g.zoneRadius * s.scale
  const halo = ctx.createRadialGradient(s.cx, s.cy, 0, s.cx, s.cy, r)
  halo.addColorStop(0, hexA(s.g.core, 0.30))
  halo.addColorStop(0.40, hexA(s.g.core, 0.16))
  halo.addColorStop(0.80, hexA(s.g.core, 0.05))
  halo.addColorStop(1, hexA(s.g.core, 0))
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(s.cx, s.cy, r, 0, Math.PI * 2)
  ctx.fill()
}

// Proximity network: every satellite pair within reach gets a thin gradient
// line whose opacity decays with distance — cross-cluster pairs included, so
// the web reshuffles as the cores fly.
function drawSatelliteNetwork(ctx: Ctx, gs: GalaxyState[], scale: number) {
  const all: Sat[] = gs.flatMap(s => s.sats)
  const MAX = 145 * scale, MAX_SQ = MAX * MAX
  ctx.save()
  ctx.lineWidth = 0.6 * scale
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      const a = all[i], b = all[j]
      const dx = a.x - b.x, dy = a.y - b.y
      const dSq = dx * dx + dy * dy
      if (dSq > MAX_SQ) continue
      const closeness = 1 - Math.sqrt(dSq) / MAX
      const alpha = Math.pow(closeness, 0.7) * 0.28 * Math.min(a.alpha, b.alpha)
      if (alpha < 0.015) continue
      const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
      grad.addColorStop(0, hexA(a.color, alpha))
      grad.addColorStop(1, hexA(b.color, alpha))
      ctx.strokeStyle = grad
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
  }
  ctx.restore()
}

// The tether from the sun to a core: strong at the sun, dissolving into the
// cluster's halo before the core — plus a packet that rides core → sun.
function drawConnection(ctx: Ctx, sx: number, sy: number, s: GalaxyState, packet: Packet, t: number) {
  const { cx, cy } = s
  const grad = ctx.createLinearGradient(sx, sy, cx, cy)
  grad.addColorStop(0, 'rgba(220,235,255,0.65)')
  grad.addColorStop(0.40, 'rgba(140,170,255,0.40)')
  grad.addColorStop(0.78, hexA(s.g.core, 0.32))
  grad.addColorStop(1, hexA(s.g.core, 0))
  ctx.save()
  ctx.lineWidth = 1
  ctx.strokeStyle = grad
  ctx.beginPath()
  ctx.moveTo(sx, sy)
  ctx.lineTo(cx, cy)
  ctx.stroke()
  ctx.restore()

  const phase = ((t - packet.t) % packet.period) / packet.period
  if (phase < 0 || phase > 1) return
  const eased = 1 - Math.pow(1 - phase, 2)
  const headX = cx + (sx - cx) * eased, headY = cy + (sy - cy) * eased
  const fade = Math.min(1, phase * 4) * Math.min(1, (1 - phase) * 4)
  if (fade < 0.03) return
  const dx = sx - cx, dy = sy - cy
  const len = Math.hypot(dx, dy)
  if (len < 1) return
  const tailLen = Math.min(len * 0.35, 60 * s.scale)
  const tailX = headX - (dx / len) * tailLen, tailY = headY - (dy / len) * tailLen

  ctx.save()
  ctx.strokeStyle = cometTail(ctx, tailX, tailY, headX, headY, fade)
  ctx.lineWidth = 1.1 * s.scale
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(tailX, tailY)
  ctx.lineTo(headX, headY)
  ctx.stroke()
  drawCometHead(ctx, headX, headY, s.scale, fade)
  ctx.restore()
}

// Coloured dots with a tight glow — a small family of related hues.
function drawSatellites(ctx: Ctx, s: GalaxyState) {
  for (const sat of s.sats) {
    const r = (sat.tier === 'primary' ? 1.8 : 1.2) * s.scale
    const glow = ctx.createRadialGradient(sat.x, sat.y, 0, sat.x, sat.y, r * 3.5)
    glow.addColorStop(0, hexA(sat.color, 0.28 * sat.alpha))
    glow.addColorStop(0.5, hexA(sat.color, 0.08 * sat.alpha))
    glow.addColorStop(1, hexA(sat.color, 0))
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(sat.x, sat.y, r * 3.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = hexA(sat.color, 0.88 * sat.alpha)
    ctx.beginPath()
    ctx.arc(sat.x, sat.y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

// The core hub: a broadcasting pulse ring, a soft halo, a dark pocket and a
// stroked ring whose conic gradient runs through the cluster's palette.
function drawCoreHub(ctx: Ctx, s: GalaxyState, t: number) {
  const { cx, cy, scale } = s
  const r = 6 * scale - 2

  const pulsePhase = ((t + s.g.zoneRadius * 80) % 6000) / 6000
  if (pulsePhase < 0.78) {
    ctx.save()
    ctx.strokeStyle = hexA(s.g.core, (1 - pulsePhase / 0.78) * 0.32)
    ctx.lineWidth = 1 * scale
    ctx.beginPath()
    ctx.arc(cx, cy, r + pulsePhase * 55 * scale, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  const halo = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, 28 * scale)
  halo.addColorStop(0, hexA(s.g.glow, 0.28))
  halo.addColorStop(0.5, hexA(s.g.glow, 0.10))
  halo.addColorStop(1, hexA(s.g.glow, 0))
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(cx, cy, 28 * scale, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = 'rgba(20, 23, 30, 0.65)'
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()

  if (typeof ctx.createConicGradient === 'function') {
    const grad = ctx.createConicGradient(s.g.zoneRadius * 0.012, cx, cy)
    const n = s.g.satPalette.length
    s.g.satPalette.forEach((c, i) => grad.addColorStop(i / n, c))
    grad.addColorStop(1, s.g.satPalette[0])
    ctx.strokeStyle = grad
  } else {
    ctx.strokeStyle = s.g.core
  }
  ctx.lineWidth = 1.8 * scale - 1
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.stroke()
}

// The sun: a breathing outer glow, two counter-rotating coronas of rays, and
// an inner near-white core — all cool-toned so it reads as a stellar source.
function drawSun(ctx: Ctx, sx: number, sy: number, t: number, scale: number) {
  const breath = 1 + Math.sin(t / 4600) * 0.09 + Math.sin(t / 2400 + 0.7) * 0.04
  const breathAlpha = 0.85 + Math.sin(t / 4600) * 0.15 + Math.sin(t / 2100 + 1.3) * 0.05

  const outerR = 195 * scale * breath
  const outer = ctx.createRadialGradient(sx, sy, 0, sx, sy, outerR)
  outer.addColorStop(0, `rgba(190, 215, 245, ${(0.308 * breathAlpha).toFixed(3)})`)
  outer.addColorStop(0.14, `rgba(150, 185, 240, ${(0.165 * breathAlpha).toFixed(3)})`)
  outer.addColorStop(0.32, `rgba(110, 145, 220, ${(0.099 * breathAlpha).toFixed(3)})`)
  outer.addColorStop(0.55, `rgba(85, 115, 200, ${(0.0495 * breathAlpha).toFixed(3)})`)
  outer.addColorStop(0.72, `rgba(80, 110, 200, ${(0.0242 * breathAlpha).toFixed(3)})`)
  outer.addColorStop(0.88, `rgba(80, 110, 200, ${(0.0088 * breathAlpha).toFixed(3)})`)
  outer.addColorStop(1, 'rgba(80, 110, 200, 0)')
  ctx.fillStyle = outer
  ctx.beginPath()
  ctx.arc(sx, sy, outerR, 0, Math.PI * 2)
  ctx.fill()

  const c1 = '180, 200, 240', c2 = '130, 170, 225'
  const lenScale = 0.82, alphaScale = 0.60

  // Short corona — 12 rays, counter-rotating, each on its own shimmer
  ctx.save()
  ctx.translate(sx, sy)
  ctx.rotate(-(t / 42000) * Math.PI * 2)
  for (let i = 0; i < 12; i++) {
    ctx.save()
    ctx.rotate((i / 12) * Math.PI * 2)
    const shimmer = 0.40 + Math.sin(t / 1800 + i * 0.43) * 0.22
    const len = 75 * scale * (0.70 + Math.sin(t / 2400 + i * 1.07) * 0.30) * lenScale
    const grad = ctx.createLinearGradient(0, 0, len, 0)
    grad.addColorStop(0, `rgba(${c1}, ${(0.42 * shimmer * alphaScale).toFixed(3)})`)
    grad.addColorStop(0.6, `rgba(${c2}, ${(0.12 * shimmer * alphaScale).toFixed(3)})`)
    grad.addColorStop(1, `rgba(${c2}, 0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(6 * scale, -2.5 * scale)
    ctx.lineTo(len, 0)
    ctx.lineTo(6 * scale, 2.5 * scale)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  ctx.restore()

  // Long corona — 8 rays the other way
  ctx.save()
  ctx.translate(sx, sy)
  ctx.rotate((t / 64000) * Math.PI * 2)
  for (let i = 0; i < 8; i++) {
    ctx.save()
    ctx.rotate((i / 8) * Math.PI * 2)
    const shimmer = 0.50 + Math.sin(t / 2600 + i * 0.79) * 0.24
    const len = 130 * scale * (0.72 + Math.sin(t / 3400 + i * 1.27) * 0.28) * lenScale
    const grad = ctx.createLinearGradient(0, 0, len, 0)
    grad.addColorStop(0, `rgba(${c1}, ${(0.55 * shimmer * alphaScale).toFixed(3)})`)
    grad.addColorStop(0.5, `rgba(${c2}, ${(0.18 * shimmer * alphaScale).toFixed(3)})`)
    grad.addColorStop(1, `rgba(${c2}, 0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(8 * scale, -6 * scale)
    ctx.lineTo(len, 0)
    ctx.lineTo(8 * scale, 6 * scale)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  ctx.restore()

  // Inner core — breathes on its own offset rhythm
  const innerR = 78 * scale * (1 + Math.sin(t / 4600 + 0.4) * 0.08 + Math.sin(t / 3100 + 1.9) * 0.03)
  const inner = ctx.createRadialGradient(sx, sy, 0, sx, sy, innerR)
  inner.addColorStop(0, `rgba(225, 238, 255, ${(0.715 * breathAlpha).toFixed(3)})`)
  inner.addColorStop(0.06, `rgba(200, 220, 250, ${(0.55 * breathAlpha).toFixed(3)})`)
  inner.addColorStop(0.14, `rgba(180, 205, 245, ${(0.396 * breathAlpha).toFixed(3)})`)
  inner.addColorStop(0.34, `rgba(150, 185, 240, ${(0.22 * breathAlpha).toFixed(3)})`)
  inner.addColorStop(0.58, `rgba(135, 175, 235, ${(0.088 * breathAlpha).toFixed(3)})`)
  inner.addColorStop(0.80, `rgba(135, 175, 235, ${(0.0275 * breathAlpha).toFixed(3)})`)
  inner.addColorStop(1, 'rgba(135, 175, 235, 0)')
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.arc(sx, sy, innerR, 0, Math.PI * 2)
  ctx.fill()
}
