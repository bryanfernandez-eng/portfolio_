import { drawFlat } from './flat'

const GEAR_TEETH = 8

function gearPoints(cx, cy, outer, inner) {
  const step = (Math.PI * 2) / (GEAR_TEETH * 4)
  return Array.from({ length: GEAR_TEETH * 4 }, (_, k) => {
    const r = k % 4 === 1 || k % 4 === 2 ? outer : inner
    return [+(cx + r * Math.cos(k * step)).toFixed(1), +(cy + r * Math.sin(k * step)).toFixed(1)]
  })
}

const speedLines = [[-118, -8, -84], [-104, 4, -70], [-122, 16, -92]]
  .map(([from, y, to]) => `<path class="flow" d="M${from} ${y}L${to} ${y}"/>`).join('')

export const coop = drawFlat(({ rect, disc, line, poly, shape }) => {
  const windows = [-34, -22, -10, 2, 14, 26].map(x => disc(x, 0, 2.3, 'f t')).join('')
  return speedLines +
    poly([[-62, -6], [-72, -32], [-58, -32], [-34, -8]], 'f t') +
    shape('M-62 -6L38 -8C56 -8 70 -1 72 4C70 10 56 12 38 12L-30 12C-48 12 -58 4 -62 -6Z', 'f l') +
    poly([[-4, 6], [-28, 22], [-16, 22], [26, 6]], 'f r') +
    rect(4, 12, 16, 7, 'f t') +
    poly([[50, -3], [60, -3], [65, 2], [50, 2]], 'f t') + windows +
    line([-59, -21], [-62, -18]) + line([-62, -18], [-59, -15]) + line([-55, -21], [-52, -18]) + line([-52, -18], [-55, -15]) +
    line([-12, 12], [-12, 22]) + disc(-12, 25, 3, 'f t') + line([50, 12], [50, 22]) + disc(50, 25, 3, 'f t')
})

export const intern = drawFlat(({ rect, disc, line, poly }) => {
  const rows = [-20, -4, 12]
  const checks = rows.slice(0, 2).map(y => line([-17, y], [-14.5, y + 2.5]) + line([-14.5, y + 2.5], [-10, y - 3.5])).join('')
  const boxes = rows.map(y => rect(-19, y - 5, 10, 10, 'f r')).join('')
  const text = rows.map((y, k) => line([-4, y], [k === 2 ? 8 : 18, y])).join('')
  return rect(-30, -44, 60, 88, 'f l') + rect(-24, -34, 48, 72, 'f t') + rect(-10, -50, 20, 12, 'f r') + disc(0, -45, 2, 'f l') +
    boxes + checks + text +
    poly(gearPoints(28, 34, 12, 9), 'f l') + disc(28, 34, 4, 'f t')
})
