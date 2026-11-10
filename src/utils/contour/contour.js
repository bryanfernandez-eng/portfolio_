import { pointer } from '../pointer'
import { valueNoise } from './valueNoise'
import { CELL, traceLevel } from './marchingSquares'

export const CONTOUR_LEVELS = Array.from({ length: 13 }, (_, i) => 0.16 + i * 0.05)

function heightAt(x, y, offset, time, px, py) {
  const sx = x / 340
  const sy = (y + offset) / 340
  const h = 0.6 * valueNoise(sx + time * 0.04, sy) + 0.28 * valueNoise(sx * 2.1 - time * 0.03, sy * 2.1 + 7) + 0.12 * valueNoise(sx * 4.4, sy * 4.4 - time * 0.02)
  const dx = x - px
  const dy = y - py
  return h + 0.3 * Math.exp(-(dx * dx + dy * dy) / (2 * 140 * 140))
}

export function createContour(svg, seed) {
  const host = svg.parentElement
  const paths = [...svg.querySelectorAll('path')]
  const state = { cols: 0, rows: 0, grid: new Float32Array(0), px: -999, py: -999 }

  const resize = () => {
    const rect = host.getBoundingClientRect()
    state.cols = Math.ceil(rect.width / CELL) + 1
    state.rows = Math.ceil(rect.height / CELL) + 1
    state.grid = new Float32Array((state.cols + 1) * (state.rows + 1))
    svg.setAttribute('viewBox', `0 0 ${rect.width.toFixed(0)} ${rect.height.toFixed(0)}`)
  }

  const sample = time => {
    const rect = host.getBoundingClientRect()
    state.px += (pointer.x - rect.left - state.px) * 0.12
    state.py += (pointer.y - rect.top - state.py) * 0.12
    const offset = window.scrollY * 0.22 + seed
    for (let j = 0; j <= state.rows; j++) {
      for (let i = 0; i <= state.cols; i++) {
        state.grid[j * (state.cols + 1) + i] = heightAt(i * CELL, j * CELL, offset, time, state.px, state.py)
      }
    }
  }

  const draw = time => {
    sample(time)
    CONTOUR_LEVELS.forEach((level, i) => paths[i].setAttribute('d', traceLevel(state.grid, state.cols, state.rows, level)))
  }

  return { resize, draw }
}
