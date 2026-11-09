import { useEffect } from 'react'
import { useLatest } from './useLatest'

export function useScrollFrame(handler, { isListening = true, shouldRunOnMount = false, shouldRunOnResize = false } = {}) {
  const latest = useLatest(handler)
  useEffect(() => {
    if (shouldRunOnMount) latest.current()
    if (!isListening) return
    let isTicking = false
    let frame = 0
    const handleScroll = () => {
      if (isTicking) return
      isTicking = true
      frame = requestAnimationFrame(() => {
        latest.current()
        isTicking = false
      })
    }
    const handleResize = () => latest.current()
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (shouldRunOnResize) window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isListening, shouldRunOnMount, shouldRunOnResize, latest])
}
