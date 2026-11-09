import { useEffect, useRef } from 'react'
import { useAnimationFrame } from '../hooks/useAnimationFrame'
import { useCursorMode } from '../hooks/useCursorMode'
import { pointer } from '../utils/pointer'
import { classNames } from '../utils/classNames'
import './CustomCursor.css'

const EASE = 0.22

function CustomCursor() {
  const cursorRef = useRef(null)
  const position = useRef({ x: pointer.x, y: pointer.y })
  const { isLive, isAway, isBig } = useCursorMode()

  useEffect(() => {
    document.documentElement.classList.toggle('in-scene', isAway)
    return () => document.documentElement.classList.remove('in-scene')
  }, [isAway])

  useAnimationFrame(() => {
    const current = position.current
    current.x += (pointer.x - current.x) * EASE
    current.y += (pointer.y - current.y) * EASE
    cursorRef.current.style.transform = `translate(${current.x}px, ${current.y}px)`
  })

  const className = classNames('cursor', isLive && 'live', isBig && 'big', isAway && 'away')
  return <div className={className} ref={cursorRef} aria-hidden="true" />
}

export default CustomCursor
