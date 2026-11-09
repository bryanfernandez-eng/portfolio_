import { useEffect, useState } from 'react'

export function useInView(ref, { threshold = 0, isOnce = false, isInitiallyInView = false } = {}) {
  const [isInView, setIsInView] = useState(isInitiallyInView)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
      if (isOnce && entry.isIntersecting) observer.disconnect()
    }, { threshold })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold, isOnce])
  return isInView
}
