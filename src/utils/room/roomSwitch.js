import { project as P } from './perspective'
import { TONES as T } from './roomTones'

export function buildSwitch({ mk, open, close, box, poly }) {
  open('switch')
  box(5.6, 6, 10.94, 11, 4.6, 5.6, T.bezel)
  const lever = mk('g', { class: 'lever' })
  box(5.7, 5.9, 10.88, 10.94, 4.95, 5.25, T.wood, lever)
  poly([P(5.45, 10.8, 4.45), P(6.15, 10.8, 4.45), P(6.15, 10.8, 5.75), P(5.45, 10.8, 5.75)], 'transparent', { class: 'hit' })
  close()
}
