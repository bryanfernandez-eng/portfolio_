import { useCallback, useEffect, useRef, useState } from 'react'

const CLOSE_DELAY_MS = 260

export function useSlideDialog() {
  const dialogRef = useRef(null)
  const timerRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isShown, setIsShown] = useState(false)

  const open = useCallback(() => {
    clearTimeout(timerRef.current)
    dialogRef.current.showModal()
    setIsOpen(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setIsShown(true)))
  }, [])

  const close = useCallback(() => {
    setIsShown(false)
    timerRef.current = setTimeout(() => {
      dialogRef.current?.close()
      setIsOpen(false)
    }, CLOSE_DELAY_MS)
  }, [])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return { dialogRef, isOpen, isShown, open, close }
}