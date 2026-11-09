const SCALE = 13

export const isoPoint = (x, y, z) => [
  +((x - y) * 0.866 * SCALE).toFixed(1),
  +((x + y) * 0.5 * SCALE - z * SCALE).toFixed(1),
]

export function drawIso(build) {
  let count = 0
  const pointList = list => list.map(point => point.join(',')).join(' ')
  const poly = (list, cls) => `<polygon class="${cls}" pathLength="1" style="--i:${count++}" points="${pointList(list)}"/>`
  const line = (a, b, cls = 'st') => `<path class="${cls}" pathLength="1" style="--i:${count++}" d="M${a.join(' ')}L${b.join(' ')}"/>`
  const flow = (a, b) => `<path class="flow" d="M${a.join(' ')}L${b.join(' ')}"/>`
  const box = (x, y, z, w, d, h) =>
    poly([isoPoint(x, y, z + h), isoPoint(x + w, y, z + h), isoPoint(x + w, y + d, z + h), isoPoint(x, y + d, z + h)], 'f t') +
    poly([isoPoint(x, y + d, z + h), isoPoint(x + w, y + d, z + h), isoPoint(x + w, y + d, z), isoPoint(x, y + d, z)], 'f l') +
    poly([isoPoint(x + w, y, z + h), isoPoint(x + w, y + d, z + h), isoPoint(x + w, y + d, z), isoPoint(x + w, y, z)], 'f r')
  return build({ P: isoPoint, poly, line, flow, box })
}
