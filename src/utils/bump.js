const COOLDOWN_MS = 700

function restart(el, cls) {
  el.classList.remove(cls)
  void el.getBoundingClientRect()
  el.classList.add(cls)
}

export function createBumper(scene) {
  const last = {}
  return key => {
    const now = performance.now()
    if (now - (last[key] || 0) < COOLDOWN_MS) return
    last[key] = now
    scene.querySelectorAll(`[data-k="${key}"]`).forEach(el => restart(el, 'bump'))
    if (key === 'desk') scene.querySelectorAll('[data-k="resume"]').forEach(el => restart(el, 'bump'))
    if (key === 'couch') scene.querySelectorAll('.breathe').forEach(el => restart(el, 'hop'))
    if (key === 'swish') scene.querySelectorAll('.dev-cheer').forEach(el => restart(el, 'cheer'))
  }
}
