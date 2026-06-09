import { useState, useCallback } from 'react'

function useLocalMouse() {
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const [isInside, setIsInside] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleMouseEnter = useCallback(() => setIsInside(true), [])
  const handleMouseLeave = useCallback(() => setIsInside(false), [])

  return { pos, isInside, handleMouseMove, handleMouseEnter, handleMouseLeave }
}

export default useLocalMouse
