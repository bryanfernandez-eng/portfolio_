import { useScrollFrame } from './useScrollFrame'

const hasScrollTimeline = CSS.supports('animation-timeline', 'scroll()')

export function useSceneScrollFade(sceneRef, heroRef, isReduced) {
  const handleScroll = () => {
    const wrap = sceneRef.current.parentElement
    const progress = Math.min(1, Math.max(0, window.scrollY / (heroRef.current.offsetHeight * 0.7)))
    wrap.style.transform = `translateY(${(progress * 14).toFixed(1)}vh)`
    wrap.style.opacity = (1 - progress * 0.85).toFixed(2)
  }
  useScrollFrame(handleScroll, { isListening: !isReduced && !hasScrollTimeline })
}
