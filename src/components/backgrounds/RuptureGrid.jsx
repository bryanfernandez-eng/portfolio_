import { useRef } from 'react'
import { useRuptureGrid } from '../../hooks/useRuptureGrid'

function RuptureGrid() {
  const canvasRef = useRef(null)
  useRuptureGrid(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}

export default RuptureGrid
