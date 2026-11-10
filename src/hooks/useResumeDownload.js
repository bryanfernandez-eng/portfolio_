import { useEffect, useState } from 'react'
import { RESUME } from '../data'

const SVG_NS = 'http://www.w3.org/2000/svg'

function downloadResume() {
  const link = document.createElement('a')
  link.href = RESUME.href
  link.download = RESUME.fileName
  link.click()
}

export function useResumeDownload(sceneRef) {
  const [peek, setPeek] = useState({ isOn: false, hasShown: false })

  useEffect(() => {
    const scene = sceneRef.current
    const paper = scene.querySelector('[data-k="resume"]')
    const tip = document.createElementNS(SVG_NS, 'title')
    tip.textContent = RESUME.label
    paper.prepend(tip)
    paper.setAttribute('tabindex', '0')
    paper.setAttribute('role', 'link')
    paper.setAttribute('aria-label', RESUME.label)
    const handleShow = () => setPeek({ isOn: true, hasShown: true })
    const handleHide = () => setPeek(current => ({ ...current, isOn: false }))
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
    paper.addEventListener('pointerenter', handleShow)
    paper.addEventListener('pointerleave', handleHide)
    paper.addEventListener('focus', handleShow)
    paper.addEventListener('blur', handleHide)
    return () => {
      scene.removeEventListener('pointerdown', handlePointerDown, true)
      paper.removeEventListener('keydown', handleKeyDown)
      paper.removeEventListener('pointerenter', handleShow)
      paper.removeEventListener('pointerleave', handleHide)
      paper.removeEventListener('focus', handleShow)
      paper.removeEventListener('blur', handleHide)
    }
  }, [sceneRef])

  return peek
}
