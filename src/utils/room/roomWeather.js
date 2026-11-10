import { project as P } from './perspective'

const WD = 10.98
const CLOUDS = [[-10.1, 6.0, 0.9, 0.28], [-8.4, 5.2, 0.8, 0.24]]
const DROPS = 14

function ellipse(xc, zc, rx, rz) {
  const out = []
  for (let a = 0; a < 360; a += 30) {
    const t = (a * Math.PI) / 180
    out.push(P(xc + rx * Math.cos(t), WD, zc + rz * Math.sin(t)))
  }
  return out
}

export function buildWeather({ mk, poly, seg }, parent) {
  const clouds = mk('g', { class: 'wx wx-cloud' }, parent)
  CLOUDS.forEach(([x, z, rx, rz], i) => poly(ellipse(x, z, rx, rz), '#b4b4b4', { class: 'cloud', style: `--i:${i}` }, clouds))
  const rain = mk('g', { class: 'wx wx-rain' }, parent)
  for (let i = 0; i < DROPS; i++) {
    const x = -10.3 + i * 0.22
    const z = 6.5 - (i % 5) * 0.3
    seg(P(x, WD, z), P(x - 0.08, WD, z - 0.3), { class: 'drop', style: `--i:${i}` }, rain)
  }
}
