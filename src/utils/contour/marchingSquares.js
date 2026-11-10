export const CELL = 26

const segment = (m, n) => `M${m[0].toFixed(1)} ${m[1].toFixed(1)}L${n[0].toFixed(1)} ${n[1].toFixed(1)}`

function cellPath(idx, T, R, B, L) {
  switch (idx) {
    case 1: case 14: return segment(L, B)
    case 2: case 13: return segment(B, R)
    case 3: case 12: return segment(L, R)
    case 4: case 11: return segment(T, R)
    case 5: return segment(L, T) + segment(B, R)
    case 6: case 9: return segment(T, B)
    case 7: case 8: return segment(L, T)
    case 10: return segment(T, R) + segment(L, B)
    default: return ''
  }
}

export function traceLevel(grid, cols, rows, level) {
  const w = cols + 1
  let d = ''
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = grid[j * w + i]
      const b = grid[j * w + i + 1]
      const c = grid[(j + 1) * w + i + 1]
      const dd = grid[(j + 1) * w + i]
      const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (dd > level ? 1 : 0)
      if (idx === 0 || idx === 15) continue
      const x = i * CELL
      const y = j * CELL
      const T = [x + (CELL * (level - a)) / (b - a), y]
      const R = [x + CELL, y + (CELL * (level - b)) / (c - b)]
      const B = [x + (CELL * (level - dd)) / (c - dd), y + CELL]
      const L = [x, y + (CELL * (level - a)) / (dd - a)]
      d += cellPath(idx, T, R, B, L)
    }
  }
  return d
}
