import { conditionFromCode } from '../utils/weather'

const API = 'https://api.open-meteo.com/v1/forecast'
const CACHE_KEY = 'sky-condition'
const CACHE_MS = 30 * 60 * 1000

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.condition
  } catch {
    return null
  }
  return null
}

function writeCache(condition) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ condition, at: Date.now() }))
  } catch {
    return
  }
}

export async function fetchSkyCondition({ latitude, longitude }) {
  const cached = readCache()
  if (cached) return cached
  try {
    const response = await fetch(`${API}?latitude=${latitude}&longitude=${longitude}&current=weather_code`)
    if (!response.ok) return null
    const { current } = await response.json()
    const condition = conditionFromCode(current.weather_code)
    writeCache(condition)
    return condition
  } catch {
    return null
  }
}
