import { project } from './perspective'

const CAT_NECK = project(-9.875, 4.0, 1.85)
const CAT_BASE = project(-9.9, 4.8, 1.45)
const CAT_DEPTH = 4.8
const clamp = (value, low, high) => Math.min(high, Math.max(low, value))

export const createGaze = scene => ({
  cat: scene.querySelector('.cat-head'),
  catEyes: scene.querySelector('.cat-eyes'),
  catLean: scene.querySelector('.cat-lean'),
  developer: scene.querySelector('.dev-head'),
})

function lookAtBall({ cat, catEyes, catLean }, ball) {
  const turn = clamp((ball.x + 10) / 9, -1, 1)
  const side = clamp((ball.x + 10) / 12, -1, 1)
  const lift = clamp((ball.z - 1) / 5, 0, 1)
  const behind = clamp((ball.d - CAT_DEPTH) / 5, 0, 1)
  const [nx, ny] = CAT_NECK
  const [bx, by] = CAT_BASE
  const headAngle = turn * 22 + behind * 9
  cat.setAttribute('transform', `translate(0 ${(-lift * 2).toFixed(1)}) rotate(${headAngle.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)})`)
  catEyes.setAttribute('transform', `translate(${(turn * 3.4).toFixed(1)} ${(-lift * 2.4 - behind * 2).toFixed(1)})`)
  catLean.setAttribute('transform', `translate(${(side * 6).toFixed(1)} ${(-behind * 4).toFixed(1)}) rotate(${(side * 6 + behind * 3).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)})`)
}

export function updateGaze(gaze, ball) {
  if (gaze.developer) gaze.developer.setAttribute('transform', `translate(${(clamp(ball.x / 9, -1, 1) * 5).toFixed(1)} 0)`)
  if (gaze.cat && gaze.catEyes && gaze.catLean) lookAtBall(gaze, ball)
}