import { ASSURANT_RIBBONS } from './assurantLogo'
import { coop, intern } from './feamIllustrations'
import { panther } from './pantherIllustration'
import { shark } from './sharkIllustration'
import { tabling } from './tablingIllustration'
import { yellowJacket } from './yellowJacketIllustration'

const ROLL_ANIMATION = '<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0;0;120;120;240;240;360" keyTimes="0;0.12;0.33;0.45;0.66;0.78;1" keySplines="0 0 1 1;.6 0 .25 1;0 0 1 1;.6 0 .25 1;0 0 1 1;.6 0 .25 1" dur="15s" repeatCount="indefinite"/>'

const ribbons = ASSURANT_RIBBONS.map((d, k) => `<path class="rib k${k}" style="--k:${k}" d="${d}"/>`).join('')
const assurant = isRolling => `<g transform="translate(0 -5) scale(.5)"><g>${isRolling ? ROLL_ANIMATION : ''}${ribbons}</g></g>`

const STATIC_ILLUSTRATIONS = { gt: yellowJacket, coop, intern, init: tabling, fiu: panther, mdc: shark }

export function getIllustration(id, isReduced) {
  if (id === 'assurant') return assurant(!isReduced)
  return STATIC_ILLUSTRATIONS[id]
}
