import { useEffect, useState } from 'react'

export function useLampToggle(sceneRef) {
  const [isLampOff, setIsLampOff] = useState(false)
  const [hasToggledLamp, setHasToggledLamp] = useState(false)

  useEffect(() => {
    const scene = sceneRef.current
    const lamp = scene.querySelector('[data-k="lamp"]')
    const toggle = () => {
      setIsLampOff(previous => !previous)
      setHasToggledLamp(true)
    }
    const handlePointerDown = event => {
      if (!event.target.closest('[data-k="lamp"]')) return
      event.stopPropagation()
      toggle()
    }
    const handleKeyDown = event => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      toggle()
    }
    lamp.setAttribute('tabindex', '0')
    lamp.setAttribute('role', 'button')
    lamp.setAttribute('aria-label', 'Toggle the lamp')
    scene.addEventListener('pointerdown', handlePointerDown, true)
    lamp.addEventListener('keydown', handleKeyDown)
    return () => {
      scene.removeEventListener('pointerdown', handlePointerDown, true)
      lamp.removeEventListener('keydown', handleKeyDown)
    }
  }, [sceneRef])

  return { isLampOff, hasToggledLamp }
}