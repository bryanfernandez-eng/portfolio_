import { useEffect } from 'react'
import { pointer } from '../utils/pointer'
import { shootBall } from '../utils/ballPhysics'
import { TAP_MS, meterFill, meterWindow, meterShot, flashMeter, resetMeter } from '../utils/shotMeter'

export function useShotInput({ sceneRef, engineRef, meterRef, isReduced }) {
  useEffect(() => {
    if (isReduced) return undefined
    const scene = sceneRef.current
    const meter = meterRef.current

    const handleDown = event => {
      const engine = engineRef.current
      if (!engine || (event.pointerType === 'mouse' && event.button !== 0)) return
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.movedAt = performance.now()
      resetMeter(meter)
      engine.hold.isDown = true
      engine.hold.startedAt = performance.now()
    }

    const handleUp = () => {
      const engine = engineRef.current
      if (!engine || !engine.hold.isDown) return
      engine.hold.isDown = false
      const heldMs = performance.now() - engine.hold.startedAt
      if (engine.ball.flying) return
      if (heldMs < TAP_MS) {
        shootBall(engine.ball)
        return
      }
      const shot = meterShot(meterFill(heldMs), meterWindow(engine.ball))
      shootBall(engine.ball, shot)
      flashMeter(meter, shot.isPerfect)
    }

    const handleCancel = () => {
      if (engineRef.current) engineRef.current.hold.isDown = false
      resetMeter(meter)
    }

    scene.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', handleCancel)
    return () => {
      scene.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', handleCancel)
    }
  }, [sceneRef, engineRef, meterRef, isReduced])
}