import { FOCAL, Y0, VX, VY, EYE } from './perspective'

export function floorTarget(scene, point, minD) {
  const matrix = scene.getScreenCTM()
  if (!matrix) return [0, 3]
  const svgPoint = scene.createSVGPoint()
  svgPoint.x = point.x
  svgPoint.y = point.y
  const p = svgPoint.matrixTransform(matrix.inverse())
  const k = Math.max((p.y - VY) / EYE, FOCAL / (Y0 + 10.4))
  const d = Math.min(10.4, Math.max(minD, FOCAL / k - Y0))
  return [Math.max(-11, Math.min(11, (p.x - VX) / (FOCAL / (Y0 + d)))), d]
}
