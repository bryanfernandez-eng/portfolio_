import { useEffect } from 'react'
import { HOME_COORDS } from '../data'
import { fetchSkyCondition } from '../services/weather'

export function useWeatherSky(sceneRef) {
  useEffect(() => {
    const scene = sceneRef.current
    let isCancelled = false
    fetchSkyCondition(HOME_COORDS).then(condition => {
      if (!isCancelled && condition) scene.dataset.wx = condition
    })
    return () => {
      isCancelled = true
    }
  }, [sceneRef])
}
