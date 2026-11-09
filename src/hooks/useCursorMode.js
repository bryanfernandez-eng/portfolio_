import { useEffect, useState } from 'react'

export function useCursorMode() {
  const [isLive, setIsLive] = useState(false)
  const [isAway, setIsAway] = useState(false)
  const [isBig, setIsBig] = useState(false)

  useEffect(() => {
    const handleMove = event => {
      setIsAway(Boolean(event.target.closest('#scene, dialog')))
      setIsLive(true)
    }
    const handleOver = event => setIsBig(Boolean(event.target.closest('a, .note-button')))
    window.addEventListener('pointermove', handleMove)
    document.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('mouseover', handleOver)
    }
  }, [])

  return { isLive, isAway, isBig }
}
