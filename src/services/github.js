import { GRID_DAYS } from '../utils/contribGrid'

const API = 'https://github-contributions-api.jogruber.de/v4'
const CACHE_KEY = 'github-contributions'
const CACHE_MS = 6 * 60 * 60 * 1000

function readCache(user) {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    if (cached?.user === user && Date.now() - cached.at < CACHE_MS) return cached.levels
  } catch {
    return null
  }
  return null
}

function writeCache(user, levels) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ user, levels, at: Date.now() }))
  } catch {
    return
  }
}

export async function fetchRecentLevels(user) {
  const cached = readCache(user)
  if (cached) return cached
  try {
    const response = await fetch(`${API}/${user}?y=last`)
    if (!response.ok) return null
    const { contributions } = await response.json()
    const levels = contributions.slice(-GRID_DAYS).map(day => day.level)
    writeCache(user, levels)
    return levels
  } catch {
    return null
  }
}
