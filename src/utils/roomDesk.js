import { project as P } from './perspective'
import { TONES as T } from './roomTones'
import { GRID_COLS, GRID_ROWS } from './contribGrid'

function buildPassedBadge({ mk, group }) {
  const [cx, cy] = P(0, 9.5, 6.55)
  const badge = mk('g', { class: 'passed', 'data-k': 'swish' }, group())
  mk('rect', { x: (cx - 52).toFixed(1), y: (cy - 9).toFixed(1), width: 104, height: 18, fill: '#000' }, badge)
  mk('text', { x: cx.toFixed(1), y: (cy + 4).toFixed(1), 'text-anchor': 'middle' }, badge).textContent = 'BUILD PASSED'
}

function buildContribGrid({ poly }) {
  const cw = 1.44 / GRID_COLS
  const ch = 1.54 / GRID_ROWS
  for (let col = 0; col < GRID_COLS; col++) {
    for (let row = 0; row < GRID_ROWS; row++) {
      const x = -4.52 + col * cw
      const z = 5.92 - row * ch
      const pad = 0.025
      poly([P(x + pad, 9.64, z - pad), P(x + cw - pad, 9.64, z - pad), P(x + cw - pad, 9.64, z - ch + pad), P(x + pad, 9.64, z - ch + pad)], 'none', { class: 'gh-cell l0', style: `--c:${col * GRID_ROWS + row}` })
    }
  }
}

function buildMonitors(kit) {
  const { box, poly, seg } = kit
  box(-0.2, 0.2, 9.65, 9.9, 3.3, 4.6, T.dark)
  box(-2.5, 2.5, 9.6, 9.9, 4.5, 7.1, T.bezel)
  const main = poly([P(-2.35, 9.55, 6.95), P(2.35, 9.55, 6.95), P(2.35, 9.55, 4.65), P(-2.35, 9.55, 4.65)], '#ffffff')
  main.setAttribute('id', 'screen')
  box(-4.0, -3.7, 9.75, 10, 3.3, 4.2, T.dark)
  box(-4.7, -2.9, 9.7, 10, 4.2, 6.1, T.bezel)
  poly([P(-4.58, 9.65, 5.98), P(-3.02, 9.65, 5.98), P(-3.02, 9.65, 4.32), P(-4.58, 9.65, 4.32)], '#ffffff')
  const code = (xa, xb, z, delay, d) => seg(P(xa, d, z), P(xb, d, z), { class: 'ty', pathLength: 1, style: `--d:${delay}s` })
  ;[[-2.0, -0.1, 6.65], [-1.7, 1.4, 6.3], [-1.7, 0.2, 5.95], [-1.4, 1.7, 5.6], [-1.4, -0.2, 5.25]].forEach((c, i) => code(c[0], c[1], c[2], 2.0 + i * 0.35, 9.54))
  buildContribGrid(kit)
  poly([P(1.3, 9.54, 5.5), P(1.55, 9.54, 5.5), P(1.55, 9.54, 5.2), P(1.3, 9.54, 5.2)], '#000', { class: 'solid blink' })
  buildPassedBadge(kit)
}

function buildDeskItems({ mk, box, seg }) {
  box(3.5, 4.3, 8.7, 9.5, 3.3, 3.4, T.dark)
  box(3.8, 4.0, 9, 9.2, 3.4, 5.3, T.dark)
  box(3.2, 4.4, 8.6, 9.6, 5.3, 5.8, T.dark)
  box(3.2, 3.9, 7.5, 8.1, 3.3, 3.9, T.paper)
  ;[0.18, 0.45].forEach((dx, i) => {
    const a = P(3.2 + dx, 7.8, 3.95)
    const b = P(3.2 + dx, 7.8, 4.8)
    const curve = `M${a[0].toFixed(1)} ${a[1].toFixed(1)}C${(a[0] - 6).toFixed(1)} ${(a[1] - 7).toFixed(1)} ${(a[0] + 6).toFixed(1)} ${(a[1] - 14).toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`
    mk('path', { d: curve, class: 'steam', style: `animation-delay:${i * 1.1}s` })
  })
  const keyboard = box(-2.0, 2.0, 7.3, 8.3, 3.3, 3.42, T.dark)
  ;[7.6, 7.95].forEach(d => seg(P(-1.9, d, 3.42), P(1.9, d, 3.42), { stroke: '#000', 'stroke-width': 1.2, 'stroke-dasharray': '3 2.5', opacity: 0.6 }, keyboard))
  box(2.3, 2.7, 7.4, 7.9, 3.3, 3.4, T.dark)
}

function buildDesk(kit) {
  const { open, close, box, seg } = kit
  open('desk')
  box(-4.3, -3.2, 8, 10, 0, 2.4, T.dark)
  const drawers = box(2.2, 4.4, 7.2, 10, 0, 2.95, T.cloth)
  ;[1.0, 1.9].forEach(z => seg(P(2.2, 7.2, z), P(4.4, 7.2, z), { class: 'ln' }, drawers))
  ;[[-4.7, -4.4, 6.6, 6.9], [4.4, 4.7, 6.6, 6.9], [-4.7, -4.4, 10, 10.3], [4.4, 4.7, 10, 10.3]].forEach(l => box(l[0], l[1], l[2], l[3], 0, 3, T.wood))
  box(-4.7, 4.7, 6.5, 10.4, 3, 3.3, T.wood)
  buildMonitors(kit)
  buildDeskItems(kit)
  close()
}

function buildHands({ mk, group, box }) {
  ;[['l', -1.45, -0.55, 0], ['r', 0.55, 1.45, 1]].forEach(([side, xa, xb, o]) => {
    const hand = mk('g', { class: `hand ${side}` }, group())
    box(xa, xb, 7.6, 8.1, 3.38, 3.62, T.skin, hand)
    for (let i = 0; i < 4; i++) {
      const fx = xa + 0.03 + i * ((xb - xa - 0.1) / 4)
      const finger = mk('g', { class: 'fing', style: `--f:${((i * 0.13 + o * 0.07) % 0.42).toFixed(2)}s` }, hand)
      box(fx, fx + (xb - xa) / 4 - 0.05, 8.05, 8.45, 3.4, 3.55, T.skin, finger)
    }
  })
}

function buildDeveloper(kit) {
  const { mk, group, open, close, box } = kit
  open('chair')
  box(-0.15, 0.15, 3.9, 6.3, 0.1, 0.3, T.dark)
  box(-1.4, 1.4, 4.9, 5.2, 0.1, 0.3, T.dark)
  box(-0.15, 0.15, 4.9, 5.2, 0.3, 1.7, T.dark)
  box(-1.6, 1.6, 4.2, 6.0, 1.7, 2.0, T.dark)
  close()
  box(-1.2, 1.2, 4.6, 5.6, 2.0, 4.5, T.paper)
  box(-1.75, 1.75, 4.7, 5.55, 3.9, 4.75, T.paper)
  box(-2.2, -1.5, 4.9, 7.2, 3.4, 4.2, T.paper)
  box(1.5, 2.2, 4.9, 7.2, 3.4, 4.2, T.paper)
  box(-1.7, -0.6, 7.0, 7.7, 3.3, 3.8, T.paper)
  box(0.6, 1.7, 7.0, 7.7, 3.3, 3.8, T.paper)
  buildHands(kit)
  open('chair')
  box(-1.4, 1.4, 4.2, 4.5, 2.0, 3.4, T.dark)
  close()
  const head = mk('g', { class: 'dev-head' }, mk('g', { class: 'dev-cheer' }, group()))
  box(-0.3, 0.3, 4.9, 5.3, 4.75, 5.15, T.skin, head)
  box(-0.75, 0.75, 4.75, 5.55, 5.1, 6.3, T.skin, head)
  box(-0.82, 0.82, 4.65, 5.5, 5.2, 6.4, T.hair, head)
  box(-1.05, -0.8, 4.8, 5.4, 5.4, 5.95, T.dark, head)
  box(0.8, 1.05, 4.8, 5.4, 5.4, 5.95, T.dark, head)
  box(-0.82, 0.82, 4.9, 5.2, 6.37, 6.5, T.dark, head)
}

export function buildWorkstation(kit) {
  buildDesk(kit)
  buildDeveloper(kit)
}
