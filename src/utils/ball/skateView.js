import { project as P } from '../room/perspective'

export function drawSkate(element, skate) {
  if (!element) return
  const [x0, y0] = P(skate.ox, skate.od, 0)
  const [x1, y1] = P(skate.x, skate.d, 0)
  element.setAttribute('transform', `translate(${(x1 - x0).toFixed(1)} ${(y1 - y0).toFixed(1)})`)
}