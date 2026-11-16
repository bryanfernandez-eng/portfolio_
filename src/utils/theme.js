const STORAGE_KEY = 'theme'
const listeners = new Set()

export const getTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

export function setTheme(theme) {
  const root = document.documentElement
  root.classList.add('theme-swap')
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-swap')))
  root.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    return
  } finally {
    listeners.forEach(listener => listener())
  }
}

export function subscribeTheme(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
