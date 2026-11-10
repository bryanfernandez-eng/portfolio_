import { project as P } from './perspective'

const WD = 10.98
const CENTER = [-5.6, 7.45]
const RADIUS = 0.65

export const CLOCK_ORIGIN = P(CENTER[0], WD, CENTER[1])

const onFace = (r, angle) => {
  const t = (angle * Math.PI) / 180
  return P(CENTER[0] + r * Math.sin(t), WD, CENTER[1] + r * Math.cos(t))
}

export function buildClock({ mk, poly, seg, group }) {
  const clock = mk('g', { class: 'clock' }, group())
  const face = Array.from({ length: 12 }, (_, i) => onFace(RADIUS, i * 30))
  poly(face, '#d8d8d8', { 'stroke-width': 1.8 }, clock)
  for (let i = 0; i < 12; i++) seg(onFace(RADIUS * 0.78, i * 30), onFace(RADIUS * 0.92, i * 30), { class: 'ln', 'stroke-width': 1.4 }, clock)
  ;[['clock-hour', 0.32, 2.6], ['clock-min', 0.5, 1.8]].forEach(([name, length, width]) => {
    const hand = seg(P(CENTER[0], WD, CENTER[1]), P(CENTER[0], WD, CENTER[1] + length), { class: `ln ${name}`, 'stroke-width': width }, clock)
    hand.setAttribute('data-hand', name)
  })
}
