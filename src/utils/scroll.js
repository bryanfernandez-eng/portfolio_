function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function smoothScrollTo(el, target, duration = 1000) {
  const start = el.scrollLeft
  const delta = target - start
  const startTime = performance.now()
  const prevSnap = el.style.scrollSnapType
  el.style.scrollSnapType = 'none'

  function step(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    el.scrollLeft = start + delta * easeInOutCubic(progress)
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      el.style.scrollSnapType = prevSnap
    }
  }

  requestAnimationFrame(step)
}
