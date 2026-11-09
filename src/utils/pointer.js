export const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, movedAt: performance.now() }

export function trackPointer() {
  const handleMove = event => {
    pointer.x = event.clientX
    pointer.y = event.clientY
    pointer.movedAt = performance.now()
  }
  window.addEventListener('pointermove', handleMove)
  return () => window.removeEventListener('pointermove', handleMove)
}
