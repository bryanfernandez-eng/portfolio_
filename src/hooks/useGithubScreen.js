import { useEffect } from 'react'
import { GITHUB_USER } from '../data'
import { fetchRecentLevels } from '../services/github'

export function useGithubScreen(sceneRef, isReduced) {
  useEffect(() => {
    let isCancelled = false
    fetchRecentLevels(GITHUB_USER).then(levels => {
      if (isCancelled || !levels) return
      const cells = sceneRef.current.querySelectorAll('.gh-cell')
      const offset = cells.length - levels.length
      levels.forEach((level, i) => cells[i + offset]?.setAttribute('class', `gh-cell l${level}`))
    })
    return () => {
      isCancelled = true
    }
  }, [sceneRef, isReduced])
}
