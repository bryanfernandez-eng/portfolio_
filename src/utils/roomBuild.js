import { project as P, HW, RIM_X, RIM_D, RIM_Z } from './perspective'
import { pts } from './sceneKit'
import { TONES as T } from './roomTones'
import { buildWindow } from './roomWindow'
import { buildClock } from './roomClock'

function buildShell({ box, poly }) {
  box(-HW, HW, -18, 11, -0.4, 0, T.floor)
  poly([P(-4.2, -3, 0), P(4.2, -3, 0), P(4.2, 6, 0), P(-4.2, 6, 0)], '#4a4a4a')
  box(-HW, HW, 11, 11.4, 0, 14, T.wall)
  box(-HW - 0.4, -HW, -18, 11.4, 0, 14, T.wall)
  box(HW, HW + 0.4, -18, 11.4, 0, 14, T.wall)
}

const BOOK_TONES = [T.paper, T.dark, T.cloth, T.paper, T.dark]
const BOOK_WIDTHS = [0.35, 0.3, 0.4, 0.3, 0.45, 0.3, 0.35, 0.4, 0.3, 0.35]
const BOOK_HEIGHTS = [1.5, 1.2, 1.7, 1.3, 1.6, 1.4, 1.7, 1.2, 1.5, 1.4]

function buildShelf({ open, close, box }) {
  open('shelf')
  box(7.3, 10.9, 10, 11, 0, 6.5, T.wood)
  ;[0, 1, 2].forEach(row => {
    const zb = 0.2 + row * 2.1
    box(7.3, 10.9, 9.9, 10.9, zb - 0.12, zb, T.wood)
    let x = 7.55
    for (let i = 0; i < (row === 2 ? 6 : 10); i++) {
      box(x, x + BOOK_WIDTHS[i], 10.0, 10.7, zb, zb + BOOK_HEIGHTS[i], BOOK_TONES[(i + row) % BOOK_TONES.length])
      x += BOOK_WIDTHS[i] + 0.05
    }
  })
  box(7.3, 10.9, 9.9, 10.9, 6.38, 6.5, T.wood)
  close()
}

function buildPlantsAndLamp({ open, close, box, poly }) {
  const plant = (key, cx, d, tips) => {
    open(key)
    box(cx - 0.55, cx + 0.55, d - 0.6, d + 0.6, 0, 1.2, T.dark)
    const base = P(cx, d, 1.2)
    tips.forEach(([dx, dd, z, c]) => poly([base, P(cx + dx, d + dd, z), P(cx + dx * 0.4, d + dd * 0.4, z - 1)], c))
    close()
  }
  plant('plantr', 6.1, 8.6, [[-0.9, -0.3, 3.4, '#4a4a4a'], [0.9, -0.2, 3.1, '#808080'], [-0.1, 0.4, 3.8, '#666'], [0.5, 0.5, 3.0, '#999']])
  plant('plantl', -9.2, 8.8, [[-0.9, -0.3, 3.2, '#4a4a4a'], [0.9, -0.2, 3.0, '#808080'], [-0.1, 0.4, 3.6, '#666'], [0.5, 0.5, 2.9, '#999']])
  open('lamp')
  box(-6.1, -5.9, 9.4, 9.6, 0, 5.2, T.dark)
  box(-6.6, -5.4, 9.0, 10, 5.2, 5.9, T.dark)
  box(-6.4, -5.6, 9.2, 9.8, 0, 0.12, T.dark)
  close()
}

function buildCat({ mk, group, box, poly }) {
  const lean = mk('g', { class: 'cat-lean' }, group())
  const body = mk('g', { class: 'breathe' }, lean)
  box(-10.25, -9.5, 4.1, 5.5, 1.45, 2.15, T.skin, body)
  const head = mk('g', { class: 'cat-head' }, body)
  box(-10.15, -9.6, 3.75, 4.4, 1.75, 2.4, T.skin, head)
  box(-10.15, -10.0, 3.85, 4.0, 2.4, 2.65, T.skin, head)
  box(-9.75, -9.6, 3.85, 4.0, 2.4, 2.65, T.skin, head)
  const eyes = mk('g', { class: 'cat-eyes' }, head)
  poly([P(-10.0, 3.74, 2.18), P(-9.92, 3.74, 2.18), P(-9.92, 3.74, 2.08), P(-10.0, 3.74, 2.08)], '#000', {}, eyes)
  poly([P(-9.83, 3.74, 2.18), P(-9.75, 3.74, 2.18), P(-9.75, 3.74, 2.08), P(-9.83, 3.74, 2.08)], '#000', {}, eyes)
  const tail = mk('g', { class: 'tail' }, lean)
  box(-9.95, -9.8, 5.3, 5.5, 1.5, 2.7, T.skin, tail)
}

function buildCouch(kit) {
  const { open, close, box } = kit
  open('couch')
  box(-11.3, -9.0, 1.2, 6.4, 0, 1.1, T.cloth)
  box(-11.35, -10.4, 1.2, 6.4, 1.1, 3.0, T.cloth)
  box(-11.35, -9.0, 1.2, 1.8, 1.1, 1.9, T.cloth)
  box(-11.35, -9.0, 5.8, 6.4, 1.1, 1.9, T.cloth)
  box(-10.4, -9.1, 1.9, 3.9, 1.1, 1.45, T.dark)
  box(-10.4, -9.1, 4.0, 5.7, 1.1, 1.45, T.dark)
  buildCat(kit)
  close()
}

function buildHoop({ mk, open, close, poly, seg, group }) {
  open('hoop')
  const HX = HW - 0.02
  poly([P(HX, 3.9, 7.7), P(HX, 6.5, 7.7), P(HX, 6.5, 5.3), P(HX, 3.9, 5.3)], '#2a2a2a', { 'stroke-width': 1.6 })
  poly([P(HX, 4.6, 6.9), P(HX, 5.8, 6.9), P(HX, 5.8, 5.9), P(HX, 4.6, 5.9)], 'none', { 'stroke-width': 1.4 })
  const ring = (r, z) => {
    const out = []
    for (let a = 0; a < 360; a += 30) {
      const t = (a * Math.PI) / 180
      out.push(P(RIM_X + r * Math.cos(t), RIM_D + r * Math.sin(t), z))
    }
    return out
  }
  seg(P(HX, RIM_D, RIM_Z), P(RIM_X + 0.7, RIM_D, RIM_Z), { stroke: '#000', 'stroke-width': 3 }, group())
  const rimTop = ring(0.7, RIM_Z)
  const rimLow = ring(0.4, RIM_Z - 0.9)
  const net = group()
  const strands = mk('g', { class: 'net', 'data-k': 'swish' }, net)
  rimTop.forEach((p, i) => seg(p, rimLow[(i + 1) % rimLow.length], { stroke: '#000', 'stroke-width': 1, opacity: 0.55 }, strands))
  mk('polygon', { points: pts(rimTop), fill: 'none', stroke: '#000', 'stroke-width': 3, 'stroke-linejoin': 'round' }, net)
  close()
}

function buildFloorItems({ open, close, box }) {
  open('bag')
  box(-7.4, -6.2, 1.0, 2.0, 0, 1.3, T.paper)
  box(-7.4, -6.2, 1.0, 2.0, 1.3, 1.45, T.dark)
  close()
  open('skate')
  box(4.6, 6.6, 1.6, 2.4, 0.28, 0.42, T.dark)
  ;[[4.8, 1.7], [4.8, 2.2], [6.1, 1.7], [6.1, 2.2]].forEach(([x, d]) => box(x, x + 0.3, d, d + 0.15, 0.05, 0.3, T.paper))
  close()
}

export function buildRoom(kit, skyPhase) {
  buildShell(kit)
  buildWindow(kit, skyPhase)
  buildClock(kit)
  buildShelf(kit)
  buildPlantsAndLamp(kit)
  buildCouch(kit)
  buildHoop(kit)
  buildFloorItems(kit)
}
