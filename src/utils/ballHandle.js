import { FOCAL, Y0, project as P } from './perspective'
import { BR } from './ballPhysics'

const MIN_GRAB_PX = 26
const GRAB_FACTOR = 1.3
const LOSE_SPEED = 2200
const LOSE_GAP_PX = 520
const SMOOTHING = 0.35
const LOOSE_HOP = 5
export const GRIP = 3

export const createMotion = point => ({ x: point.x, y: point.y, scrollY: window.scrollY, at: performance.now(), speed: 0 })

function ballOnScreen(scene, ball) {
  const matrix = scene.getScreenCTM()
  if (!matrix) return null
  const [sx, sy] = P(ball.x, ball.d, BR)
  const radius = BR * (FOCAL / (Y0 + ball.d)) * matrix.a
  return { x: matrix.a * sx + matrix.e, y: matrix.d * sy + matrix.f, radius }
}

function trackSpeed(engine, point) {
  const last = engine.motion
  const now = performance.now()
  const seconds = (now - last.at) / 1000
  const moved = Math.hypot(point.x - last.x, point.y - last.y) + Math.abs(window.scrollY - last.scrollY)
  const instant = seconds > 0 ? moved / seconds : 0
  engine.motion = { x: point.x, y: point.y, scrollY: window.scrollY, at: now, speed: last.speed + (instant - last.speed) * SMOOTHING }
}

export function aimPoint(scene, ball, point) {
  const spot = ballOnScreen(scene, ball)
  return spot ? { x: point.x, y: point.y + spot.radius } : point
}

export function updateHandle(engine, scene, point) {
  const { ball } = engine
  trackSpeed(engine, point)
  const spot = ballOnScreen(scene, ball)
  if (ball.flying || !engine.isOver || !spot) {
    engine.isHandling = false
    return
  }
  const grab = Math.max(spot.radius * GRAB_FACTOR, MIN_GRAB_PX)
  const gap = Math.hypot(point.x - spot.x, point.y - spot.y)
  if (!engine.isHandling) {
    engine.isHandling = gap < grab && engine.motion.speed < LOSE_SPEED
    return
  }
  if (engine.motion.speed > LOSE_SPEED || gap > LOSE_GAP_PX) {
    engine.isHandling = false
    ball.vz = Math.max(ball.vz, LOOSE_HOP)
  }
}
