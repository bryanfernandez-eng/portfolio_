import { project } from './perspective'

const CAT_X = -9.9
const CAT_DEPTH = 4.8
const CAT_NECK = project(-9.875, 4.0, 1.85)
const CAT_BASE = project(CAT_X, CAT_DEPTH, 1.45)
const clamp = (value, low, high) => Math.min(high, Math.max(low, value))

export const createGaze = scene => ({
  cat: scene.querySelector('.cat-head'),
  catEyes: scene.querySelector('.cat-eyes'),
  catLean: scene.querySelector('.cat-lean'),
  developer: scene.querySelector('.dev-head'),
})

function aimCat({ cat, catEyes, catLean }, ball) {
  const dx = ball.x - CAT_X
  const dd = ball.d - CAT_DEPTH
  const right = clamp(dx / 10, -1, 1)
  const back = clamp(dd / 5, -1, 1)
  const lift = clamp((ball.z - 1) / 5, 0, 1)
  const [nx, ny] = CAT_NECK
  const [bx, by] = CAT_BASE
  const headAngle = clamp(right * 24 + Math.max(0, back) * 10, -30, 30)
  const scale = 1 - back * 0.05
  cat.setAttribute('transform', `translate(0 ${(-lift * 2 - back * 1.5).toFixed(1)}) rotate(${headAngle.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)})`)
  catEyes.setAttribute('transform', `translate(${(right * 3.6).toFixed(1)} ${(-lift * 2.4 - Math.max(0, back) * 2).toFixed(1)})`)
  catLean.setAttribute(
    'transform',
    `translate(${(right * 7).toFixed(1)} ${(-back * 6).toFixed(1)}) translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${(right * 9).toFixed(1)}) scale(${scale.toFixed(3)}) translate(${(-bx).toFixed(1)} ${(-by).toFixed(1)})`,
  )
}

export function updateGaze(gaze, ball) {
  if (gaze.developer) gaze.developer.setAttribute('transform', `translate(${(clamp(ball.x / 9, -1, 1) * 5).toFixed(1)} 0)`)
  if (gaze.cat && gaze.catEyes && gaze.catLean) aimCat(gaze, ball)
}