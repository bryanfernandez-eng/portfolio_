const FLOOR_Y = 64

function drawFlat(build) {
  let count = 0
  const stagger = () => `pathLength="1" style="--i:${count++}"`
  const poly = (points, cls) => `<polygon class="${cls}" ${stagger()} points="${points.map(point => point.join(',')).join(' ')}"/>`
  const rect = (x, y, width, height, cls) => poly([[x, y], [x + width, y], [x + width, y + height], [x, y + height]], cls)
  const disc = (cx, cy, r, cls) => `<circle class="${cls}" ${stagger()} cx="${cx}" cy="${cy}" r="${r}"/>`
  const line = (a, b) => `<path class="st" ${stagger()} d="M${a.join(' ')}L${b.join(' ')}"/>`
  const label = (text, x, y, size) => `<text class="lbl" x="${x}" y="${y}" style="font-size:${size}px">${text}</text>`
  return build({ rect, disc, line, poly, label })
}

function poster({ rect, line, label }) {
  const legs = line([60, 52], [53, FLOOR_Y]) + line([100, 52], [107, FLOOR_Y]) + line([80, 52], [80, FLOOR_Y - 6])
  const code = line([70, 34], [64, 40]) + line([64, 40], [70, 46]) + line([90, 34], [96, 40]) + line([96, 40], [90, 46]) + line([83, 33], [77, 47])
  return legs + rect(52, -34, 56, 86, 'f l') + rect(56, -30, 48, 78, 'st') +
    label('WEB DEV', 80, -15, 9.5) + label('EVENT', 80, -3, 9.5) + line([62, 4], [98, 4]) + label('2-3 PM', 80, 21, 9) + code
}

function table({ rect, label }) {
  return rect(-72, 20, 112, 6, 'f t') + rect(-68, 26, 104, 36, 'f l') + label('INIT FIU', -16, 49, 11)
}

const LAPTOP_X = -38
const QR_GRID = ['1110111', '1010101', '1110111', '0101001', '1110100', '1011011', '1110110']
const QR_MODULE = 2.6

function laptop({ rect, disc, poly }) {
  const x = LAPTOP_X
  return rect(x - 2, 19, 38, 3, 'f t') + rect(x, -4, 34, 23, 'f r') +
    disc(x + 5, 4, 3.6, 'f t') + rect(x + 10, 0.5, 7, 7, 'f l') + disc(x + 25, 4, 3, 'f l') +
    poly([[x + 2, 17], [x + 8, 17], [x + 5, 11]], 'f t') + rect(x + 12, 12, 10, 4.5, 'f t') + disc(x + 29, 14, 2.4, 'f t')
}

function qrCode({ rect, line }) {
  const left = -68
  const top = -8
  const size = 24
  const origin = (size - QR_GRID.length * QR_MODULE) / 2
  const modules = QR_GRID.flatMap((row, r) => [...row].map((bit, c) => (
    bit === '1' ? rect(left + origin + c * QR_MODULE, top + origin + r * QR_MODULE, QR_MODULE, QR_MODULE, 'f r qr') : ''
  ))).join('')
  return line([left + 5, top + size], [left + 5, 20]) + line([left + size - 5, top + size], [left + size - 5, 20]) +
    rect(left, top, size, size, 'f t qrcard') + modules
}

export const tabling = drawFlat(tools => {
  const { rect, line } = tools
  return line([-78, FLOOR_Y], [114, FLOOR_Y]) + poster(tools) + table(tools) + qrCode(tools) + laptop(tools) +
    rect(16, 13, 18, 7, 'f t') + rect(18, 9, 18, 4, 'f l')
})
