import { FOCAL, Y0, project as P } from './perspective'
import { BR } from './ballPhysics'

const MIN_GRAB_PX = 26
const GRAB_FACTOR = 1.3
const LOSE_FACTOR = 3.5
const LOOSE_HOP = 5

function ballOnScreen(scene, ball) {
  const matrix = scene.getScreenCTM()
  if (!matrix) return null
  const [sx, sy] = P(ball.x, ball.d, BR)
  const radius = BR * (FOCAL / (Y0 + ball.d)) * matrix.a
  return { x: matrix.a * sx + matrix.e, y: matrix.d * sy + matrix.f, radius }
}

export function aimPoint(scene, ball, point) {
  const spot = ballOnScreen(scene, ball)
  return spot ? { x: point.x, y: point.y + spot.radius } : point
}

export function updateHandle(engine, scene, point) {
  const { ball } = engine
  const spot = ballOnScreen(scene, ball)
  if (ball.flying || !engine.isOver || !spot) {
    engine.isHandling = false
    return
  }
  const grab = Math.max(spot.radius * GRAB_FACTOR, MIN_GRAB_PX)
  const gap = Math.hypot(point.x - spot.x, point.y - spot.y)
  if (!engine.isHandling) {
    engine.isHandling = gap < grab
    return
  }
  if (gap > Math.max(spot.radius * LOSE_FACTOR, grab * 2.5)) {
    engine.isHandling = false
    ball.vz = Math.max(ball.vz, LOOSE_HOP)
  }
}
