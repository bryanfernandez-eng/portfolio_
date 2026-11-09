import { FOCAL, Y0, RIM_X, RIM_D, project } from './perspective'
import { BR } from './ballPhysics'

export const TAP_MS = 220
const FILL_MS = 1000
const CENTER = 0.78
const NEAR_WIDTH = 0.36
const FAR_WIDTH = 0.1
const NEAR_DIST = 3
const FAR_DIST = 17
const FLASH_MS = 600
const METER_HEIGHT = 78

const clamp = value => Math.min(1, Math.max(0, value))

export const meterFill = heldMs => clamp(heldMs / FILL_MS)

export function meterWindow(ball) {
  const far = clamp((Math.hypot(RIM_X - ball.x, RIM_D - ball.d) - NEAR_DIST) / (FAR_DIST - NEAR_DIST))
  return { center: CENTER, width: NEAR_WIDTH + (FAR_WIDTH - NEAR_WIDTH) * far }
}

export function meterShot(fill, { center, width }) {
  const error = fill - center
  const excess = Math.max(0, Math.abs(error) - width / 2)
  if (excess === 0) return { spread: 0, reach: 1, isPerfect: true }
  return { spread: 0.15, reach: 1 + Math.sign(error) * Math.min(0.45, excess * 2.2), isPerfect: false }
}

function placeMeter(meter, scene, ball) {
  const matrix = scene.getScreenCTM()
  if (!matrix) return
  const [sx, sy] = project(ball.x, ball.d, ball.z)
  const point = scene.createSVGPoint()
  point.x = sx
  point.y = sy
  const screen = point.matrixTransform(matrix)
  const rect = meter.offsetParent.getBoundingClientRect()
  const radius = BR * (FOCAL / (Y0 + ball.d)) * matrix.a
  const x = screen.x - rect.left + radius * 1.5
  const y = screen.y - rect.top - METER_HEIGHT
  meter.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
}

export function updateMeter({ ball, hold }, scene, meter) {
  if (!hold.isDown || ball.flying || performance.now() - hold.startedAt < TAP_MS) return
  const win = meterWindow(ball)
  meter.classList.add('is-on')
  meter.style.setProperty('--f', meterFill(performance.now() - hold.startedAt).toFixed(3))
  meter.style.setProperty('--c', win.center)
  meter.style.setProperty('--w', win.width.toFixed(3))
  placeMeter(meter, scene, ball)
}

export const resetMeter = meter => meter.classList.remove('is-on', 'is-perfect', 'is-miss')

export function flashMeter(meter, isPerfect) {
  meter.classList.add(isPerfect ? 'is-perfect' : 'is-miss')
  setTimeout(() => resetMeter(meter), FLASH_MS)
}