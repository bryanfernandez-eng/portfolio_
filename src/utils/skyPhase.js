export function getSkyPhase(date = new Date()) {
  const hour = date.getHours()
  if (hour >= 8 && hour < 17) return 'day'
  if ((hour >= 5 && hour < 8) || (hour >= 17 && hour < 20)) return 'dusk'
  return 'night'
}