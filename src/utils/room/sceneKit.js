import { project as P, EYE } from './perspective'

const NS = 'http://www.w3.org/2000/svg'
const fixed = point => `${point[0].toFixed(1)},${point[1].toFixed(1)}`
export const pts = list => list.map(fixed).join(' ')

export function createSceneKit(scene) {
  let root = scene
  let seq = 0

  const mk = (tag, attrs, parent) => {
    const el = document.createElementNS(NS, tag)
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
    ;(parent || root).appendChild(el)
    return el
  }
  const open = key => {
    root = mk('g', { class: 'thing', 'data-k': key }, scene)
  }
  const close = () => {
    root = scene
  }
  const group = () => mk('g', { class: 'pop', style: `--d:${(0.1 + (seq += 0.024)).toFixed(2)}s` })

  const box = (x0, x1, d0, d1, z0, z1, tone, parent) => {
    const g = parent || group()
    if (x0 > 0) mk('polygon', { points: pts([P(x0, d0, z1), P(x0, d1, z1), P(x0, d1, z0), P(x0, d0, z0)]), fill: tone[2] }, g)
    if (x1 < 0) mk('polygon', { points: pts([P(x1, d0, z1), P(x1, d1, z1), P(x1, d1, z0), P(x1, d0, z0)]), fill: tone[2] }, g)
    mk('polygon', { points: pts([P(x0, d0, z1), P(x1, d0, z1), P(x1, d0, z0), P(x0, d0, z0)]), fill: tone[1] }, g)
    if (z1 < EYE) mk('polygon', { points: pts([P(x0, d0, z1), P(x1, d0, z1), P(x1, d1, z1), P(x0, d1, z1)]), fill: tone[0] }, g)
    return g
  }
  const poly = (points, fill, extra, parent) => mk('polygon', { points: pts(points), fill, ...extra }, parent || group())
  const seg = (a, b, attrs, parent) => mk('path', { d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`, ...attrs }, parent)
  const cross = (at, parent) => {
    const style = { fill: 'none', stroke: '#000', 'stroke-width': 1.6, 'stroke-linecap': 'round' }
    seg(at(0, 0.22), at(0, -0.22), style, parent)
    seg(at(-0.22, 0), at(0.22, 0), style, parent)
  }

  return { scene, mk, open, close, group, box, poly, seg, cross }
}
