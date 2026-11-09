import { useEffect } from 'react'
import { computeSceneLayout } from '../utils/sceneLayout'
import { onFontsReady } from '../utils/fonts'

const HEIGHT_JITTER = 150

export function useSceneLayout({ sceneRef, heroRef, titleRef, minDRef }) {
  useEffect(() => {
    const scene = sceneRef.current
    let lastWidth = window.innerWidth
    let lastHeight = window.innerHeight
    const layout = () => {
      const { boxHeight, viewBox, minD } = computeSceneLayout(heroRef.current, titleRef.current)
      scene.parentElement.style.height = `${boxHeight}px`
      scene.setAttribute('viewBox', viewBox)
      minDRef.current = minD
    }
    const handleResize = () => {
      if (window.innerWidth === lastWidth && Math.abs(window.innerHeight - lastHeight) < HEIGHT_JITTER) return
      lastWidth = window.innerWidth
      lastHeight = window.innerHeight
      layout()
    }
    layout()
    window.addEventListener('resize', handleResize)
    const stopFonts = onFontsReady(layout)
    return () => {
      window.removeEventListener('resize', handleResize)
      stopFonts()
    }
  }, [sceneRef, heroRef, titleRef, minDRef])
}
