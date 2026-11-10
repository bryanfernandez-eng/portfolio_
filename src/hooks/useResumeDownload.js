import { useEffect } from 'react'
import { RESUME } from '../data'

const SVG_NS = 'http://www.w3.org/2000/svg'

function downloadResume() {
  const link = document.createElement('a')
  link.href = RESUME.href
  link.download = RESUME.fileName
  link.click()
}

export function useResumeDownload(sceneRef) {
  useEffect(() => {
    const scene = sceneRef.current
    const paper = scene.querySelector('[data-k="resume"]')
    const tip = document.createElementNS(SVG_NS, 'title')
    tip.textContent = RESUME.label
    paper.prepend(tip)
    paper.setAttribute('tabindex', '0')
    paper.setAttribute('role', 'link')
    paper.setAttribute('aria-label', RESUME.label)
    const handlePointerDown = event => {
      if (!event.target.closest('[data-k="resume"]')) return
      event.stopPropagation()
      downloadResume()
    }
    const handleKeyDown = event => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      downloadResume()
    }
    scene.addEventListener('pointerdown', handlePointerDown, true)
    paper.addEventListener('keydown', handleKeyDown)
    return () => {
      scene.removeEventListener('pointerdown', handlePointerDown, true)
      paper.removeEventListener('keydown', handleKeyDown)
    }
  }, [sceneRef])
}
