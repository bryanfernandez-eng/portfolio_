import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { useScrollFrame } from './useScrollFrame'
import { buildBridgePath, bridgeProgress } from '../utils/bridgePath'

const ROLL_RATIO = 3.2

function createBridge(host, isMirrored, isReduced) {
  const track = host.querySelector('.track')
  const done = host.querySelector('.done')
  const ball = host.querySelector('.rolling')
  let length = 0
  let progress = isReduced ? 1 : 0

  const place = () => {
    done.style.strokeDashoffset = length * (1 - progress)
    const point = done.getPointAtLength(length * progress)
    ball.setAttribute('transform', `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) rotate(${(progress * length * ROLL_RATIO).toFixed(1)})`)
  }
  const layout = () => {
    const path = buildBridgePath(host.clientWidth, host.clientHeight, isMirrored)
    track.setAttribute('d', path)
    done.setAttribute('d', path)
    length = done.getTotalLength()
    done.style.strokeDasharray = length
    place()
  }
  const update = () => {
    progress = bridgeProgress(host)
    place()
  }
  return { layout, update }
}

export function useBridgeBall(hostRef, isMirrored) {
  const isReduced = useReducedMotion()
  const bridgeRef = useRef(null)

  useEffect(() => {
    const bridge = createBridge(hostRef.current, isMirrored, isReduced)
    bridgeRef.current = bridge
    const handleResize = () => {
      bridge.layout()
      if (!isReduced) bridge.update()
    }
    bridge.layout()
    window.addEventListener('resize', handleResize)
    return () => {
      bridgeRef.current = null
      window.removeEventListener('resize', handleResize)
    }
  }, [hostRef, isMirrored, isReduced])

  useScrollFrame(() => bridgeRef.current?.update(), { isListening: !isReduced, shouldRunOnMount: !isReduced })
}
