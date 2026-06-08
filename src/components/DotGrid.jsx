import { useMemo } from 'react'
import { useWindowWidth } from '../hooks/useWindowWidth'

const COLS = 30
const ROWS = 20
const SEED = 42

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

function DotGrid() {
  const width = useWindowWidth()
  const isMobile = width < 768

  const dots = useMemo(() => generateDots(isMobile ? 0.15 : 0.3), [isMobile])

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {dots.map(({ id, cx, cy, r }) => (
        <circle key={id} cx={cx} cy={cy} r={r} fill="#8b949e" opacity="0.25" />
      ))}
    </svg>
  )
}

export default DotGrid
