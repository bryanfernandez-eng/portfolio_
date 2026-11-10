const IDLE_MS = 10000
const THROTTLE_MS = 250
const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll']

const listeners = new Set()
let isIdle = false
let timer = 0
let lastActivity = 0

function setIdle(value) {
  if (isIdle === value) return
  isIdle = value
  listeners.forEach(listener => listener())
}

function arm() {
  clearTimeout(timer)
  timer = setTimeout(() => setIdle(true), IDLE_MS)
}

function handleActivity() {
  setIdle(false)
  const now = performance.now()
  if (now - lastActivity < THROTTLE_MS) return
  lastActivity = now
  arm()
}

function start() {
  isIdle = false
  EVENTS.forEach(name => window.addEventListener(name, handleActivity, { passive: true }))
  arm()
}

function stop() {
  EVENTS.forEach(name => window.removeEventListener(name, handleActivity))
  clearTimeout(timer)
}

export function subscribeIdle(listener) {
  listeners.add(listener)
  if (listeners.size === 1) start()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) stop()
  }
}

export const getIdle = () => isIdle