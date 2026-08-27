import { useMemo, useRef, useCallback } from 'react'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import { COLORS } from '../../constants/colors'

const COLS = 30
const ROWS = 20
const SEED = 42
const GLOW_RADIUS = 160

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function generateDots(density) {
  const rand = seededRandom(SEED)
  const dots = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (rand() > density) continue
      dots.push({
        id: row * COLS + col,
        cx: `${(col / (COLS - 1)) * 100}%`,
        cy: `${(row / (ROWS - 1)) * 100}%`,
        r: 1,
      })
    }
  }
  return dots
}

const GLOW_MASK = `radial-gradient(circle ${GLOW_RADIUS}px at var(--mx, -9999px) var(--my, -9999px), #000 0%, transparent 100%)`

function DotGrid() {
  const width = useWindowWidth()
  const isMobile = width < 768
  const containerRef = useRef(null)

  const dots = useMemo(() => generateDots(isMobile ? 0.15 : 0.3), [isMobile])

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    el.style.setProperty('--mx', '-9999px')
    el.style.setProperty('--my', '-9999px')
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {dots.map(({ id, cx, cy, r }) => (
          <circle key={id} cx={cx} cy={cy} r={r} fill={COLORS.mutedText} opacity="0.25" />
        ))}
      </svg>
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ maskImage: GLOW_MASK, WebkitMaskImage: GLOW_MASK }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map(({ id, cx, cy, r }) => (
          <circle key={id} cx={cx} cy={cy} r={r + 0.8} fill={COLORS.accentGreen} opacity="0.95" />
        ))}
      </svg>
    </div>
  )
}

export default DotGrid
