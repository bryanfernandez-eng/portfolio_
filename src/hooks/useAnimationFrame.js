import { useEffect } from 'react'
import { useLatest } from './useLatest'

export function useAnimationFrame(callback, isActive = true) {
  const latest = useLatest(callback)
  useEffect(() => {
    if (!isActive) return
    let frame = 0
    const tick = time => {
      latest.current(time)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isActive, latest])
}
