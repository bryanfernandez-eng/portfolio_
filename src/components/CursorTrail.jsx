import { useRef } from 'react'
import { useAnimationFrame } from '../hooks/useAnimationFrame'
import { useCursorMode } from '../hooks/useCursorMode'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { pointer } from '../utils/pointer'
import { classNames } from '../utils/classNames'
import './CursorTrail.css'

const BLOBS = Array.from({ length: 8 }, (_, i) => ({ index: i, size: 44 - i * 4 }))

function CursorTrail({ isActive }) {
  const trailRef = useRef(null)
  const positions = useRef(BLOBS.map(() => ({ x: pointer.x, y: pointer.y })))
  const isReduced = useReducedMotion()
  const { isLive, isAway } = useCursorMode()

  const handleFrame = () => {
    const trail = trailRef.current
    const rect = trail.getBoundingClientRect()
    let tx = pointer.x - rect.left
    let ty = pointer.y - rect.top
    BLOBS.forEach(({ index, size }) => {
      const blob = positions.current[index]
      const k = 0.34 - index * 0.03
      blob.x += (tx - blob.x) * k
      blob.y += (ty - blob.y) * k
      tx = blob.x
      ty = blob.y
      trail.children[index].style.transform = `translate(${blob.x - size / 2}px, ${blob.y - size / 2}px)`
    })
  }

  useAnimationFrame(handleFrame, !isReduced && isActive)

  return (
    <>
      <svg className="goo-defs" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
      </svg>
      <div className={classNames('blobs', isLive && 'live', isAway && 'away')} ref={trailRef} aria-hidden="true">
        {BLOBS.map(({ index, size }) => (
          <i className="blob" key={index} style={{ width: size, height: size }} />
        ))}
      </div>
    </>
  )
}

export default CursorTrail
