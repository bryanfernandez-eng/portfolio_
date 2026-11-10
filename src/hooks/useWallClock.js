import { useEffect } from 'react'
import { CLOCK_ORIGIN } from '../utils/room/roomClock'

const TICK_MS = 15000

function setHands(scene) {
  const now = new Date()
  const minutes = now.getMinutes() + now.getSeconds() / 60
  const [cx, cy] = CLOCK_ORIGIN
  const angles = { 'clock-min': minutes * 6, 'clock-hour': ((now.getHours() % 12) + minutes / 60) * 30 }
  Object.entries(angles).forEach(([name, angle]) => {
    scene.querySelector(`[data-hand="${name}"]`)?.setAttribute('transform', `rotate(${angle.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})`)
  })
}

export function useWallClock(sceneRef) {
  useEffect(() => {
    const scene = sceneRef.current
    setHands(scene)
    const timer = setInterval(() => setHands(scene), TICK_MS)
    return () => clearInterval(timer)
  }, [sceneRef])
}
