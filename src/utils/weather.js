const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99])
const CLOUDY_CODES = new Set([2, 3, 45, 48])

export function conditionFromCode(code) {
  if (RAIN_CODES.has(code)) return 'rain'
  if (CLOUDY_CODES.has(code)) return 'cloudy'
  return 'clear'
}
