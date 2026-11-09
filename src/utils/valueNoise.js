const PERM_SEED = 7

const perm = (() => {
  const table = new Uint8Array(512)
  const order = Array.from({ length: 256 }, (_, i) => i)
  let seed = PERM_SEED
  for (let i = 255; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const j = seed % (i + 1)
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  for (let i = 0; i < 512; i++) table[i] = order[i & 255]
  return table
})()

const hash = (x, y) => perm[(perm[x & 255] + y) & 511] / 255
const smooth = t => t * t * (3 - 2 * t)

export function valueNoise(x, y) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const a = hash(ix, iy)
  const b = hash(ix + 1, iy)
  const c = hash(ix, iy + 1)
  const d = hash(ix + 1, iy + 1)
  const u = smooth(x - ix)
  const v = smooth(y - iy)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
