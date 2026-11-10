import { useEffect, useRef } from 'react'
import { useAnimationFrame } from './useAnimationFrame'
import { pointer } from '../utils/pointer'
import { BOUNCE, createBall, createSolids, stepBall } from '../utils/ballPhysics'
import { GRIP, aimPoint, createMotion, updateHandle } from '../utils/ballHandle'
import { drawBall } from '../utils/ballView'
import { createBumper } from '../utils/bump'
import { floorTarget } from '../utils/floorTarget'
import { createGaze, updateGaze } from '../utils/gaze'
import { drawSkate } from '../utils/skateView'
import { updateMeter } from '../utils/shotMeter'

const MAX_DT = 0.033
const DEFAULT_DT = 0.016

export function useBallPhysics({ sceneRef, engineRef, ballViewRef, meterRef, minDRef, isActive, isReduced }) {
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const scene = sceneRef.current
    const solids = createSolids()
    const engine = {
      ball: createBall(),
      bump: createBumper(scene),
      hold: { isDown: false, startedAt: 0 },
      isOver: false,
      isHandling: false,
      motion: createMotion(pointer),
      solids,
      skate: solids.find(solid => solid.k === 'skate'),
      skateElement: scene.querySelector('[data-k="skate"]'),
      gaze: createGaze(scene),
    }
    engineRef.current = engine
    const handleEnter = () => { engine.isOver = true }
    const handleLeave = () => { engine.isOver = false }
    const handleAnimationEnd = event => event.target.classList.remove('bump', 'hop', 'cheer')
    scene.addEventListener('pointerenter', handleEnter)
    scene.addEventListener('pointerleave', handleLeave)
    scene.addEventListener('animationend', handleAnimationEnd)
    return () => {
      engineRef.current = null
      scene.removeEventListener('pointerenter', handleEnter)
      scene.removeEventListener('pointerleave', handleLeave)
      scene.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [sceneRef, engineRef])

  useEffect(() => {
    lastTimeRef.current = 0
  }, [isActive])

  const handleFrame = time => {
    const engine = engineRef.current
    const view = ballViewRef.current
    if (!engine || !view) return
    const dt = Math.min(MAX_DT, (time - lastTimeRef.current) / 1000 || DEFAULT_DT)
    lastTimeRef.current = time
    updateHandle(engine, sceneRef.current, pointer)
    const mode = engine.isHandling ? 'chase' : 'rest'
    engine.ball.grip = engine.isHandling ? GRIP : 1
    const target = engine.isHandling ? floorTarget(sceneRef.current, aimPoint(sceneRef.current, engine.ball, pointer), minDRef.current) : [engine.ball.x, engine.ball.d]
    stepBall(engine.ball, dt, target, minDRef.current, engine.bump, BOUNCE[mode], engine.solids)
    drawBall(view, engine.ball)
    drawSkate(engine.skateElement, engine.skate)
    updateGaze(engine.gaze, engine.ball)
    updateMeter(engine, sceneRef.current, meterRef.current)
  }

  useAnimationFrame(handleFrame, isActive && !isReduced)
}