const WIPE_MS = 1300
const WIPE_SIZE = 10
const EASING = 'cubic-bezier(.7,0,.2,1)'

function originOf(origin) {
  const rect = origin.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  return { x, y, radius }
}

function revealWipe({ x, y, radius }, onSwap) {
  const wipe = document.createElement('div')
  wipe.className = 'theme-wipe'
  wipe.style.left = `${x}px`
  wipe.style.top = `${y}px`
  document.body.appendChild(wipe)
  const scale = (radius * 2) / WIPE_SIZE + 2
  const animation = wipe.animate([{ transform: 'scale(0)' }, { transform: `scale(${scale})` }], { duration: WIPE_MS, easing: EASING, fill: 'forwards' })
  return new Promise(resolve => {
    animation.onfinish = () => {
      onSwap()
      wipe.remove()
      resolve()
    }
  })
}

async function revealTransition({ x, y, radius }, onSwap) {
  const transition = document.startViewTransition(async () => {
    onSwap()
    await new Promise(resolve => setTimeout(resolve))
  })
  await transition.ready
  document.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
    { duration: WIPE_MS, easing: EASING, pseudoElement: '::view-transition-new(root)' },
  )
  await transition.finished
}

export async function playThemeWipe(origin, onSwap, isReduced) {
  if (isReduced) {
    onSwap()
    return
  }
  const spot = originOf(origin)
  if (document.startViewTransition) await revealTransition(spot, onSwap)
  else await revealWipe(spot, onSwap)
}
