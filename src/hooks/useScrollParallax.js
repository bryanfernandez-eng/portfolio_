import { useEffect } from 'react'

const EASE = 0.12
const SETTLE_EPS = 0.15

export function useScrollParallax(ref, factor) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let current = window.scrollY * factor
    let target = current
    let raf = 0
    const tick = () => {
      current += (target - current) * EASE
      if (Math.abs(target - current) < SETTLE_EPS) {
        current = target
        raf = 0
      } else {
        raf = requestAnimationFrame(tick)
      }
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
    }
    const handleScroll = () => {
      target = window.scrollY * factor
      if (!raf) raf = requestAnimationFrame(tick)
    }
    el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, factor])
}
