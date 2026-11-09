import { FOCAL, Y0, VY, VX, EYE } from './perspective'

export function computeSceneLayout(hero, title) {
  const width = window.innerWidth
  const heroRect = hero.getBoundingClientRect()
  const titleRect = title.getBoundingClientRect()
  const boxHeight = Math.max(240, Math.floor(titleRect.top - heroRect.top - 8))
  const focusWidth = Math.round(820 + 126 * Math.min(1, Math.max(0, (width - 480) / 620)))
  const scale = Math.min(width / focusWidth, boxHeight / 430)
  const viewWidth = width / scale
  const viewHeight = boxHeight / scale
  return {
    boxHeight,
    viewBox: `${(VX - viewWidth / 2).toFixed(1)} 67 ${viewWidth.toFixed(1)} ${viewHeight.toFixed(1)}`,
    minD: Math.max(-12, (FOCAL * EYE) / (67 + viewHeight * 0.9 - VY) - Y0),
  }
}
