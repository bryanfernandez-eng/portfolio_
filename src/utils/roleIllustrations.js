import { drawIso } from './iso'
import { ASSURANT_RIBBONS } from './assurantLogo'
import { panther } from './pantherIllustration'
import { shark } from './sharkIllustration'
import { tabling } from './tablingIllustration'
import { yellowJacket } from './yellowJacketIllustration'

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

const STATIC_ILLUSTRATIONS = { gt: yellowJacket, coop, intern, init: tabling, fiu: panther, mdc: shark }

export function getIllustration(id, isReduced) {
  if (id === 'assurant') return assurant(!isReduced)
  return STATIC_ILLUSTRATIONS[id]
}
