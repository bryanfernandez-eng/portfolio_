const WIPE_MS = 1300
const WIPE_SIZE = 10

export function playThemeWipe(origin, onSwap, isReduced) {
  if (isReduced) {
    onSwap()
    return
  }
  const rect = origin.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  const wipe = document.createElement('div')
  wipe.className = 'theme-wipe'
  wipe.style.left = `${x}px`
  wipe.style.top = `${y}px`
  document.body.appendChild(wipe)
  const scale = (radius * 2) / WIPE_SIZE + 2
  const animation = wipe.animate([{ transform: 'scale(0)' }, { transform: `scale(${scale})` }], { duration: WIPE_MS, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' })
  animation.onfinish = () => {
    onSwap()
    wipe.remove()
  }
}
