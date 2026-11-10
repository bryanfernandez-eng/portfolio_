const clamp = (value, low, high) => Math.min(high, Math.max(low, value))

export const createGaze = scene => ({
  cat: scene.querySelector('.cat-head'),
  developer: scene.querySelector('.dev-head'),
})

export function updateGaze({ cat, developer }, ball) {
  if (developer) developer.setAttribute('transform', `translate(${(clamp(ball.x / 9, -1, 1) * 5).toFixed(1)} 0)`)
  if (!cat) return
  const lookX = clamp((ball.x + 10) / 9, -1, 1) * 3
  const lookY = -clamp((ball.z - 1) / 5, 0, 1) * 3
  cat.setAttribute('transform', `translate(${lookX.toFixed(1)} ${lookY.toFixed(1)})`)
}