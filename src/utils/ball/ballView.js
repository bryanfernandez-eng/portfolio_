import { FOCAL, Y0, project as P } from '../room/perspective'
import { BR } from './ballPhysics'

const SEAMS = ['M0 -1V1', 'M-1 0H1', 'M-0.72 -0.7Q-0.25 0 -0.72 0.7', 'M0.72 -0.7Q0.25 0 0.72 0.7']

export function createBallView({ scene, mk }, isHidden) {
  const group = mk('g', { class: 'ball' }, scene)
  if (isHidden) group.setAttribute('display', 'none')
  const shadow = mk('ellipse', { fill: '#fff', opacity: 0.3 }, group)
  const body = mk('g', {}, group)
  mk('circle', { r: 1, fill: '#3a3a3a', stroke: '#000', 'stroke-width': 1.6, 'vector-effect': 'non-scaling-stroke' }, body)
  SEAMS.forEach(d => mk('path', { d, fill: 'none', stroke: '#fff', 'stroke-width': 1.5, 'vector-effect': 'non-scaling-stroke' }, body))
  return { shadow, body }
}

export function drawBall({ shadow, body }, ball) {
  const k = FOCAL / (Y0 + ball.d)
  const [sx, sy] = P(ball.x, ball.d, ball.z)
  const [gx, gy] = P(ball.x, ball.d, 0)
  const squash = 1.1 - Math.min(0.5, (ball.z - BR) * 0.12)
  shadow.setAttribute('cx', gx.toFixed(1))
  shadow.setAttribute('cy', gy.toFixed(1))
  shadow.setAttribute('rx', (BR * k * squash).toFixed(1))
  shadow.setAttribute('ry', (BR * k * squash * 0.32).toFixed(1))
  body.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${ball.a.toFixed(1)}) scale(${(BR * k).toFixed(2)})`)
}
