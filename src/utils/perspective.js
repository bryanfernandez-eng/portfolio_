export const FOCAL = 1000
export const Y0 = 24
export const VX = 260
export const VY = 60
export const EYE = 8.6
export const HW = 11.4
export const RIM_X = HW - 0.9
export const RIM_D = 5.2
export const RIM_Z = 5.9

export const project = (x, d, z) => {
  const k = FOCAL / (Y0 + d)
  return [VX + x * k, VY + (EYE - z) * k]
}
