import { useEffect, useRef } from 'react'
import { useCursorMode } from '../hooks/useCursorMode'
import { pointer } from '../utils/pointer'
import { classNames } from '../utils/classNames'
import './CustomCursor.css'

const EASE = 0.22
const SETTLE_PX = 0.2

function CustomCursor() {
  const cursorRef = useRef(null)
  const position = useRef({ x: pointer.x, y: pointer.y })
  const { isLive, isAway, isBig } = useCursorMode()

  useEffect(() => {
    document.documentElement.classList.toggle('in-scene', isAway)
    return () => document.documentElement.classList.remove('in-scene')
  }, [isAway])

  useEffect(() => {
    const current = position.current
    let frame = 0
    const tick = () => {
      current.x += (pointer.x - current.x) * EASE
      current.y += (pointer.y - current.y) * EASE
      cursorRef.current.style.transform = `translate(${current.x}px, ${current.y}px)`
      const isSettled = Math.abs(pointer.x - current.x) < SETTLE_PX && Math.abs(pointer.y - current.y) < SETTLE_PX
      frame = isSettled ? 0 : requestAnimationFrame(tick)
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    wake()
    window.addEventListener('pointermove', wake)
    window.addEventListener('pointerdown', wake)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('pointerdown', wake)
    }
  }, [])

  const className = classNames('cursor', isLive && 'live', isBig && 'big', isAway && 'away')
  return <div className={className} ref={cursorRef} aria-hidden="true" />
}

export default CustomCursor
