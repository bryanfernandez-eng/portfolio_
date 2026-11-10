import { project as P } from './perspective'
import { pts } from './sceneKit'

const WD = 10.98
const FRAME = [[-10.4, 6.6], [-7.2, 6.6], [-7.2, 3.4], [-10.4, 3.4]]
const SKY = { night: '#ffffff', dusk: '#8e8e8e', day: '#6e6e6e' }
const SKYLINE = [
  [-10.4, 3.4], [-10.4, 3.9], [-10.0, 3.9], [-10.0, 4.3], [-9.7, 4.3], [-9.7, 3.8], [-9.3, 3.8], [-9.3, 4.6], [-9.0, 4.6],
  [-9.0, 4.0], [-8.6, 4.0], [-8.6, 4.4], [-8.2, 4.4], [-8.2, 3.7], [-7.8, 3.7], [-7.8, 4.2], [-7.4, 4.2], [-7.4, 3.9],
  [-7.2, 3.9], [-7.2, 3.4],
]
const LIGHTS = [[-10.2, 3.55], [-9.6, 3.55], [-9.2, 3.7], [-8.5, 3.55], [-8.05, 3.5], [-7.65, 3.55]]
const PLANE = 'M0 0H13L10 -2.4H2ZM6 -1.2L2.5 -6H5L9.5 -1.2Z'

const onWall = list => list.map(([x, z]) => P(x, WD, z))

function disc(xc, zc, r) {
  const out = []
  for (let a = 0; a < 360; a += 30) {
    const t = (a * Math.PI) / 180
    out.push(P(xc + r * Math.cos(t), WD, zc + r * Math.sin(t)))
  }
  return out
}

function crescent(xc, zc) {
  const arc = (cx, r, from, to, step) => {
    const out = []
    for (let a = from; step > 0 ? a <= to : a >= to; a += step) {
      const t = (a * Math.PI) / 180
      out.push(P(cx + r * Math.cos(t), WD, zc + r * Math.sin(t)))
    }
    return out
  }
  return [...arc(xc, 0.7, 60, 300, 20), ...arc(xc + 0.38, 0.58, 300, 60, -20)]
}

function buildSkyBody({ poly, cross, group }, phase, parent) {
  if (phase === 'night') {
    poly(crescent(-9.6, 5.1), '#000000', {}, parent)
    const stars = group()
    ;[[-8.1, 6.0], [-10.0, 3.9], [-8.0, 4.4]].forEach(([x, z]) => cross((dx, dz) => P(x + dx, WD, z + dz), stars))
    parent.appendChild(stars)
    return
  }
  if (phase === 'dusk') {
    poly(disc(-8.5, 4.5, 0.62), '#000000', {}, parent)
    return
  }
  poly(disc(-9.4, 5.9, 0.5), '#000000', {}, parent)
  poly(disc(-8.2, 5.5, 0.32), '#2a2a2a', {}, parent)
  poly(disc(-7.9, 5.5, 0.26), '#2a2a2a', {}, parent)
}

export function buildWindow(kit, phase) {
  const { scene, mk, poly, group } = kit
  const frame = onWall(FRAME)
  const clip = mk('clipPath', { id: 'win-clip' }, mk('defs', {}, scene))
  mk('polygon', { points: pts(frame) }, clip)
  const sky = mk('g', { class: 'sky', 'clip-path': 'url(#win-clip)' }, group())
  mk('polygon', { points: pts(frame), fill: SKY[phase] }, sky)
  buildSkyBody(kit, phase, sky)
  poly(onWall(SKYLINE), phase === 'day' ? '#d8d8d8' : '#cfcfcf', {}, sky)
  if (phase !== 'day') LIGHTS.forEach(([x, z]) => poly(onWall([[x, z], [x + 0.1, z], [x + 0.1, z + 0.12], [x, z + 0.12]]), '#000', {}, sky))
  const start = P(-10.45, WD, 5.9)
  const flight = mk('g', { transform: `translate(${start[0].toFixed(1)} ${start[1].toFixed(1)})` }, sky)
  mk('path', { d: PLANE, class: 'flyby', fill: '#000', stroke: 'none' }, flight)
  poly(frame, 'none', { 'stroke-width': 1.8 })
}