import { useEffect, useRef } from 'react'

const DOT_SIZE = 28
const GLOW_RADIUS = 110
const CYCLE_MS = 3000

// Border strips only, so the glow always lands somewhere visible instead of under the content columns.
const ZONES = [
  { xMin: 2,  xMax: 96, yMin: 2,  yMax: 10 },
  { xMin: 2,  xMax: 96, yMin: 90, yMax: 98 },
  { xMin: 2,  xMax: 8,  yMin: 2,  yMax: 98 },
  { xMin: 92, xMax: 98, yMin: 2,  yMax: 98 },
]

const BASE_DOTS = 'radial-gradient(circle, rgba(0,0,0,0.18) 2px, transparent 2px)'
const GLOW_DOTS = 'radial-gradient(circle, rgba(0,0,0,0.85) 2.6px, transparent 2.6px)'
const DOT_BG_STYLE = { backgroundImage: BASE_DOTS, backgroundSize: `${DOT_SIZE}px ${DOT_SIZE}px` }
const GLOW_MASK = `radial-gradient(circle ${GLOW_RADIUS}px at var(--gx, 50%) var(--gy, 50%), #000 0%, transparent 100%)`

function randomInZone() {
  const zone = ZONES[Math.floor(Math.random() * ZONES.length)]
  const x = zone.xMin + Math.random() * (zone.xMax - zone.xMin)
  const y = zone.yMin + Math.random() * (zone.yMax - zone.yMin)
  return { x, y }
}

function GlowDots() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const moveGlow = () => {
      const { x, y } = randomInZone()
      el.style.setProperty('--gx', `${x}%`)
      el.style.setProperty('--gy', `${y}%`)
    }
    moveGlow()
    const id = setInterval(moveGlow, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0" style={DOT_BG_STYLE} />
      <div
        ref={glowRef}
        className="absolute inset-0 dot-glow-pulse"
        style={{
          ...DOT_BG_STYLE,
          backgroundImage: GLOW_DOTS,
          maskImage: GLOW_MASK,
          WebkitMaskImage: GLOW_MASK,
          animationDuration: `${CYCLE_MS}ms`,
        }}
      />
    </div>
  )
}

export default GlowDots
