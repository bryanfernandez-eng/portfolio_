export function drawFlat(build) {
  let count = 0
  const stagger = () => `pathLength="1" style="--i:${count++}"`
  const poly = (points, cls) => `<polygon class="${cls}" ${stagger()} points="${points.map(point => point.join(',')).join(' ')}"/>`
  const rect = (x, y, width, height, cls) => poly([[x, y], [x + width, y], [x + width, y + height], [x, y + height]], cls)
  const disc = (cx, cy, r, cls) => `<circle class="${cls}" ${stagger()} cx="${cx}" cy="${cy}" r="${r}"/>`
  const line = (a, b) => `<path class="st" ${stagger()} d="M${a.join(' ')}L${b.join(' ')}"/>`
  const shape = (d, cls) => `<path class="${cls}" ${stagger()} d="${d}"/>`
  const label = (text, x, y, size) => `<text class="lbl" x="${x}" y="${y}" style="font-size:${size}px">${text}</text>`
  return build({ rect, disc, line, poly, shape, label })
}
