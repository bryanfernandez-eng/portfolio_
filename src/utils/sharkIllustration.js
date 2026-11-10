let count = 0
const shape = (d, cls) => `<path class="${cls}" pathLength="1" style="--i:${count++}" d="${d}"/>`
const fill = (d, tone) => shape(d, `f ${tone}`)
const stroke = d => shape(d, 'st')

const mouthY = x => 10 + 9 * (1 - (x / 62) ** 2)
const upperTeeth = [-48, -32, -16, 0, 16, 32, 48].map(x => {
  const y = mouthY(x).toFixed(1)
  return fill(`M${x - 8} ${y}L${x} ${(mouthY(x) + 13).toFixed(1)}L${x + 8} ${y}Z`, 't')
})
const lowerTeeth = [-26, -9, 9, 26].map(x => {
  const y = (52 + 5 * (x / 26) ** 2 * -1).toFixed(1)
  return fill(`M${x - 7} ${y}L${x} ${(y - 11).toFixed(1)}L${x + 7} ${y}Z`, 't')
})

export const shark = '<g class="bob">' + [
  fill('M-80 -8C-84 -50 -46 -66 0 -66C46 -66 84 -50 80 -8C84 40 52 72 0 72C-52 72 -84 40 -80 -8Z', 't'),
  fill('M-76 -16C-82 -54 -44 -72 0 -72C44 -72 74 -56 76 -30C50 -44 -40 -46 -76 -16Z', 'r'),
  shape('M-16 -69C-10 -80 4 -86 20 -86C14 -78 18 -72 28 -67Z', 'f l fin'),
  fill('M60 -46C76 -30 82 -4 74 28L66 24C72 2 68 -24 54 -42Z', 'r'),
  stroke('M-60 -22C-64 -14 -64 -6 -60 2'),
  stroke('M-54 -22C-58 -14 -58 -6 -54 2'),
  stroke('M-47 -14Q-34 -28 -20 -14'),
  stroke('M20 -14Q34 -28 47 -14'),
  stroke('M-30 -30Q-22 -34 -14 -31'),
  stroke('M14 -31Q22 -34 30 -30'),
  fill('M-62 10Q0 28 62 10C58 42 30 58 0 58C-30 58 -58 42 -62 10Z', 'r'),
  ...upperTeeth,
  ...lowerTeeth,
  stroke('M-64 6Q-67 10 -63 14'),
  stroke('M64 6Q67 10 63 14'),
].join('') + '</g>'
