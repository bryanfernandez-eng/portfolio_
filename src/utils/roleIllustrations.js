import { drawIso } from './iso'
import { ASSURANT_RIBBONS } from './assurantLogo'

const ROLL_ANIMATION = '<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0;0;120;120;240;240;360" keyTimes="0;0.12;0.33;0.45;0.66;0.78;1" keySplines="0 0 1 1;.6 0 .25 1;0 0 1 1;.6 0 .25 1;0 0 1 1;.6 0 .25 1" dur="15s" repeatCount="indefinite"/>'

const ribbons = ASSURANT_RIBBONS.map((d, k) => `<path class="rib k${k}" style="--k:${k}" d="${d}"/>`).join('')
const assurant = isRolling => `<g transform="translate(0 -5) scale(.5)"><g>${isRolling ? ROLL_ANIMATION : ''}${ribbons}</g></g>`

const coop = drawIso(({ P, line, flow, box }) =>
  flow(P(-6, -1.2, 1.4), P(-3.6, -1.2, 1.4)) + flow(P(-6.4, 0, 1.1), P(-3.8, 0, 1.1)) + flow(P(-6, 1.2, 1.4), P(-3.6, 1.2, 1.4)) +
  box(-3.2, -1.2, 1.5, 0.8, 2.4, 0.12) + box(-3.2, -0.1, 1.6, 0.8, 0.2, 1.1) +
  box(-0.8, -3.4, 0.9, 1.8, 6.8, 0.16) +
  box(-3, -0.45, 0.8, 6.4, 0.9, 0.9) + box(3.4, -0.3, 0.9, 1, 0.6, 0.65) +
  line(P(-1, 0.46, 1.4), P(2.4, 0.46, 1.4)))

const intern = drawIso(({ P, line, box }) =>
  box(-2.2, -0.15, 0, 4.4, 0.3, 4.6) + box(-0.7, -0.3, 4.3, 1.4, 0.6, 0.55) +
  line(P(-1.6, 0.16, 3.5), P(1.6, 0.16, 3.5)) + line(P(-1.6, 0.16, 2.5), P(1.6, 0.16, 2.5)) + line(P(-1.6, 0.16, 1.5), P(0.8, 0.16, 1.5)) +
  line(P(-1.7, 0.16, 3.0), P(-1.5, 0.16, 2.8)) + line(P(-1.5, 0.16, 2.8), P(-1.25, 0.16, 3.25)) +
  line(P(-1.7, 0.16, 2.0), P(-1.5, 0.16, 1.8)) + line(P(-1.5, 0.16, 1.8), P(-1.25, 0.16, 2.25)))

const BOB_DELAYS = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8]

const init = drawIso(({ box }) => {
  const crowd = [1.6, 2.7].flatMap((y, row) =>
    BOB_DELAYS.map((delay, i) => `<g class="bob" style="--d:${((delay + row * 0.45) % 2).toFixed(2)}s">${box(-3.6 + i * 1.05, y, 0, 0.55, 0.55, 0.7)}</g>`)
  ).join('')
  return box(-4, -2.2, 0, 8, 3.6, 0.6) + box(-3, -2.2, 0.6, 6, 0.2, 2.8) + box(-0.35, -1, 0.6, 0.7, 0.7, 1.1) + crowd
})

const fiu = drawIso(({ P, line, box, poly }) => {
  const c = P(2.3, 2.3, 2.3)
  return box(-2.4, -1.6, 0, 4.8, 3.2, 0.6) + box(-2.0, -1.3, 0.6, 4.0, 2.6, 0.5) + box(-2.2, -1.4, 1.1, 4.4, 2.8, 0.5) +
    box(-0.9, -0.9, 1.6, 1.8, 1.8, 0.45) +
    poly([P(-2.3, -2.3, 2.3), P(2.3, -2.3, 2.3), P(2.3, 2.3, 2.3), P(-2.3, 2.3, 2.3)], 'f t') +
    poly([P(-2.3, 2.3, 2.3), P(2.3, 2.3, 2.3), P(2.3, 2.3, 2.15), P(-2.3, 2.3, 2.15)], 'f l') +
    poly([P(2.3, -2.3, 2.3), P(2.3, 2.3, 2.3), P(2.3, 2.3, 2.15), P(2.3, -2.3, 2.15)], 'f r') +
    `<g class="sway">${line(c, P(2.3, 2.3, 1.0))}${box(2.15, 2.15, 0.7, 0.3, 0.3, 0.35)}</g>`
})

const gt = drawIso(({ P, line, box }) =>
  box(-3, -2, -0.3, 6, 4, 0.3) + box(-2, -1.4, 0, 4, 2.8, 1.2) + box(-0.9, -0.9, 1.2, 1.8, 1.8, 3.2) +
  box(-1.1, -1.1, 4.4, 2.2, 2.2, 0.35) + box(-0.7, -0.7, 4.75, 1.4, 1.4, 0.5) +
  line(P(0, 0, 5.25), P(0, 0, 6.5)) + line(P(0, 0, 6.5), P(0.8, 0.2, 6.2)) + line(P(0.8, 0.2, 6.2), P(0, 0, 5.9)))

const mdc = drawIso(({ box }) => {
  const columns = [0, 1, 2, 3, 4].map(i => box(-3.1 + i * 1.5, 1.1, 0, 0.5, 0.5, 2.6)).join('')
  return box(-4, -2, -0.3, 8, 4, 0.3) + box(-3.4, -1.5, 0, 6.8, 2.6, 2.6) + columns +
    box(-3.8, -1.7, 2.6, 7.6, 3.6, 0.45) + box(-1.2, -0.5, 3.05, 2.4, 1.2, 0.6)
})

const STATIC_ILLUSTRATIONS = { gt, coop, intern, init, fiu, mdc }

export function getIllustration(id, isReduced) {
  if (id === 'assurant') return assurant(!isReduced)
  return STATIC_ILLUSTRATIONS[id]
}
