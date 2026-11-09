import { useEffect, useRef } from 'react'
import { useAnimationFrame } from './useAnimationFrame'
import { pointer } from '../utils/pointer'
import { createBall, shootBall, stepBall } from '../utils/ballPhysics'
import { drawBall } from '../utils/ballView'
import { createBumper } from '../utils/bump'
import { floorTarget } from '../utils/floorTarget'

const MAX_DT = 0.033
const DEFAULT_DT = 0.016

export function useBallPhysics({ sceneRef, ballViewRef, minDRef, isActive, isReduced }) {
  const engineRef = useRef(null)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const scene = sceneRef.current
    const ball = createBall()
    engineRef.current = { ball, bump: createBumper(scene) }
    const handlePointerDown = event => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }
    const handleClick = () => {
      if (!isReduced) shootBall(ball)
    }
    const handleAnimationEnd = event => event.target.classList.remove('bump', 'hop')
    scene.addEventListener('pointerdown', handlePointerDown)
    scene.addEventListener('click', handleClick)
    scene.addEventListener('animationend', handleAnimationEnd)
    return () => {
      engineRef.current = null
      scene.removeEventListener('pointerdown', handlePointerDown)
      scene.removeEventListener('click', handleClick)
      scene.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [sceneRef, isReduced])

  useEffect(() => {
    lastTimeRef.current = 0
  }, [isActive])

  const handleFrame = time => {
    const engine = engineRef.current
    const view = ballViewRef.current
    if (!engine || !view) return
    const dt = Math.min(MAX_DT, (time - lastTimeRef.current) / 1000 || DEFAULT_DT)
    lastTimeRef.current = time
    const target = floorTarget(sceneRef.current, pointer, minDRef.current)
    stepBall(engine.ball, dt, target, minDRef.current, engine.bump)
    drawBall(view, engine.ball)
  }

  useAnimationFrame(handleFrame, isActive && !isReduced)
}
