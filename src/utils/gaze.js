import { project } from './perspective'

const CAT_NECK = project(-9.875, 4.0, 1.85)
const clamp = (value, low, high) => Math.min(high, Math.max(low, value))

export const createGaze = scene => ({
  cat: scene.querySelector('.cat-head'),
  catEyes: scene.querySelector('.cat-eyes'),
  developer: scene.querySelector('.dev-head'),
})

function lookAtBall({ cat, catEyes }, ball) {
  const turn = clamp((ball.x + 10) / 9, -1, 1)
  const lift = clamp((ball.z - 1) / 5, 0, 1)
  const [px, py] = CAT_NECK
  cat.setAttribute('transform', `translate(0 ${(-lift * 2).toFixed(1)}) rotate(${(turn * 22).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})`)
  catEyes.setAttribute('transform', `translate(${(turn * 3.4).toFixed(1)} ${(-lift * 2.4).toFixed(1)})`)
}

export function updateGaze(gaze, ball) {
  if (gaze.developer) gaze.developer.setAttribute('transform', `translate(${(clamp(ball.x / 9, -1, 1) * 5).toFixed(1)} 0)`)
  if (gaze.cat && gaze.catEyes) lookAtBall(gaze, ball)
}