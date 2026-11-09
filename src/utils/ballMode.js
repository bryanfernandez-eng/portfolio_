export const REST_MS = 4000

export function ballMode({ isOver }, idleMs) {
  if (idleMs > REST_MS) return 'rest'
  return isOver ? 'chase' : 'idle'
}