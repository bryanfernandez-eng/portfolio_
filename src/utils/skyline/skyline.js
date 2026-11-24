// Miami skyline across Biscayne Bay, drawn once at module load.
// Units: a 1600-wide drawing with the horizon at y = HORIZON; sky above, water below.

export const WIDTH = 1600
export const HORIZON = 240
export const HEIGHT = 440
export const HORIZON_RATIO = HORIZON / HEIGHT

const SCALE = 0.5
const f1 = n => n.toFixed(1)

const hash = (i, j, seed) => {
  let h = Math.imul(i, 374761393) ^ Math.imul(j, 668265263) ^ Math.imul(seed, 1442695041)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

// [x, width, height, type]; the recognizable towers sit on the right, in the gap next to the first name line
const CITY = [
  [0, 60, 150, 'block'], [64, 48, 210, 'condo'], [118, 70, 170, 'round'], [194, 54, 250, 'condo'], [254, 80, 190, 'block'],
  [340, 58, 270, 'condo'], [404, 66, 220, 'round'], [476, 52, 290, 'condo'], [534, 74, 230, 'block'], [614, 56, 300, 'round'],
  [676, 64, 250, 'condo'], [746, 50, 195, 'block'], [802, 70, 280, 'round'], [878, 58, 225, 'condo'], [942, 66, 175, 'block'],
  [1012, 54, 240, 'condo'], [1074, 120, 260, 'freedom'], [1202, 80, 330, 'sefc'], [1288, 70, 305, 'miami'],
  [1364, 64, 350, 'panorama'], [1434, 60, 320, 'four'], [1500, 56, 215, 'condo'], [1560, 60, 165, 'block'],
]

function tower([x, w, h, type]) {
  const B = HORIZON
  const s = SCALE
  h *= s
  const t = B - h
  const r = x + w
  const cx = x + w / 2
  let d = `M${x} ${B}V${f1(t)}H${r}V${B}Z`
  let detail = ''
  switch (type) {
    case 'condo':
      for (let y = t + 12 * s; y < B - 6; y += 14 * s) detail += `M${x + 4} ${f1(y)}H${r - 4}`
      break
    case 'round': {
      const rr = Math.min(w * 0.6, 40 * s)
      d = `M${x} ${B}V${f1(t)}H${r - rr}A${rr} ${rr} 0 0 1 ${r} ${f1(t + rr)}V${B}Z`
      break
    }
    case 'sefc': {
      const step = w / 4
      const rise = 18 * s
      d = `M${x} ${B}V${f1(t + 3 * rise)}H${x + step}V${f1(t + 2 * rise)}H${x + 2 * step}V${f1(t + rise)}H${x + 3 * step}V${f1(t)}H${r}V${B}Z`
      for (let k = 1; k < 5; k++) detail += `M${f1(x + (k * w) / 5)} ${f1(t + 3 * rise + 6)}V${B}`
      break
    }
    case 'miami': {
      const dome = 50 * s
      const y0 = t + dome
      d = `M${x} ${B}V${f1(y0)}A${w / 2} ${f1(dome)} 0 0 1 ${r} ${f1(y0)}V${B}Z`
      detail = `M${f1(x + w * 0.14)} ${f1(y0)}A${f1(w * 0.36)} ${f1(dome * 0.64)} 0 0 1 ${f1(r - w * 0.14)} ${f1(y0)}`
        + `M${f1(x + w * 0.28)} ${f1(y0)}A${f1(w * 0.22)} ${f1(dome * 0.32)} 0 0 1 ${f1(r - w * 0.28)} ${f1(y0)}M${x} ${f1(y0)}H${r}`
      break
    }
    case 'panorama':
      d = `M${x} ${B}V${f1(t + 26 * s)}L${r} ${f1(t)}V${B}Z`
      detail = `M${cx} ${f1(t + 20 * s)}V${B}`
      break
    case 'four': {
      const frame = 30 * s
      detail = `M${x + 8} ${f1(t + 6)}H${r - 8}V${f1(t + frame)}H${x + 8}Z`
      for (let k = 1; k < 4; k++) detail += `M${f1(x + (k * w) / 4)} ${f1(t + frame + 6)}V${B}`
      break
    }
    case 'freedom': {
      const baseTop = B - h * 0.42
      const towerTop = B - h * 0.86
      const towerW = w * 0.34
      const cupolaW = w * 0.2
      const cupolaTop = towerTop - 16 * s
      const domeH = cupolaW * 0.6
      d = `M${x} ${B}V${f1(baseTop)}H${f1(cx - towerW / 2)}V${f1(towerTop)}H${f1(cx - cupolaW / 2)}V${f1(cupolaTop)}`
        + `A${f1(cupolaW / 2)} ${f1(domeH)} 0 0 1 ${f1(cx + cupolaW / 2)} ${f1(cupolaTop)}V${f1(towerTop)}H${f1(cx + towerW / 2)}V${f1(baseTop)}H${r}V${B}Z`
      detail = `M${cx} ${f1(cupolaTop - domeH)}v${f1(-22 * s)}`
      break
    }
  }
  return { d, detail }
}

function backRow() {
  const pieces = []
  for (let x = -10, i = 0; x < WIDTH + 20; i++) {
    const w = 44 + hash(i, 1, 21) * 70
    const h = (110 + Math.pow(hash(i, 2, 21), 1.4) * 260) * SCALE
    const top = HORIZON - h
    pieces.push({ kind: 'back', d: `M${f1(x)} ${HORIZON}V${f1(top)}H${f1(x + w)}V${HORIZON}Z` })
    if (hash(i, 3, 21) > 0.65) {
      pieces.push({ kind: 'back', d: `M${f1(x + w * 0.25)} ${f1(top)}V${f1(top - 22 * SCALE)}H${f1(x + w * 0.75)}V${f1(top)}` })
    }
    x += w + 4
  }
  return pieces
}

function sun(cx, cy, r) {
  const pieces = [{ kind: 'sun', d: `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z` }]
  let cuts = ''
  for (let k = 0; k < 5; k++) {
    const y = cy + r * 0.12 + k * r * 0.17
    cuts += `M${cx - r - 4} ${f1(y)}h${2 * r + 8}v${f1(r * (0.03 + k * 0.018))}h${-(2 * r + 8)}Z`
  }
  pieces.push({ kind: 'cut', d: cuts })
  return pieces
}

// a causeway bridge arching over the water on the left
function bridge() {
  const H = HORIZON
  const q = (t, a, c, b) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b
  let d = `M-20 ${H - 4}Q300 ${H - 56} 640 ${H - 4}M-20 ${H - 10}Q300 ${H - 62} 640 ${H - 10}`
  for (let t = 0.04; t < 1; t += 0.06) d += `M${f1(q(t, -20, 300, 640))} ${f1(q(t, H - 4, H - 56, H - 4))}V${H}`
  return { kind: 'bridge', d }
}

// draw order matters: later towers cover the outlines of the ones behind them
export const SKYLINE = [
  ...sun(965, HORIZON - 14, 62),
  ...backRow(),
  ...CITY.flatMap(spec => {
    const { d, detail } = tower(spec)
    return detail ? [{ kind: 'front', d }, { kind: 'detail', d: detail }] : [{ kind: 'front', d }]
  }),
  bridge(),
].map((piece, i) => ({ ...piece, key: i }))

// broken horizontal dashes that let the reflection through, fading with depth
export const RIPPLES = (() => {
  const rows = []
  for (let y = HORIZON + 2, row = 0; y < HEIGHT; y += 6, row++) {
    let d = ''
    for (let x = -30, i = 0; x < WIDTH + 30; i++) {
      const len = 18 + hash(row, i, 4) * 120
      if (hash(row, i, 5) > 0.22) d += `M${f1(x)} ${y}h${f1(len)}v3h${f1(-len)}Z`
      x += len + 6 + hash(row, i, 6) * 28
    }
    rows.push({
      key: row,
      d,
      opacity: Math.max(0.15, 1 - (y - HORIZON) / 220).toFixed(2),
      delay: `${(-hash(row, 9, 3) * 5).toFixed(2)}s`,
    })
  }
  return rows
})()
