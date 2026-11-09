import { useEffect, useRef } from 'react'
import { useAnimationFrame } from './useAnimationFrame'
import { useInView } from './useInView'
import { useReducedMotion } from './useReducedMotion'
import { useScrollFrame } from './useScrollFrame'
import { createContour } from '../utils/contour'

const FRAME_INTERVAL_MS = 55

export function useContour(svgRef, seed) {
  const isReduced = useReducedMotion()
  const isInView = useInView(svgRef)
  const contourRef = useRef(null)
  const lastDrawRef = useRef(0)

  useEffect(() => {
    const svg = svgRef.current
    const contour = createContour(svg, seed)
    contourRef.current = contour
    const observer = new ResizeObserver(() => {
      contour.resize()
      contour.draw(0)
    })
    observer.observe(svg.parentElement)
    return () => {
      contourRef.current = null
      observer.disconnect()
    }
  }, [svgRef, seed])

  const handleFrame = time => {
    if (time - lastDrawRef.current <= FRAME_INTERVAL_MS) return
    lastDrawRef.current = time
    contourRef.current?.draw(time / 1000)
  }

  useAnimationFrame(handleFrame, isInView && !isReduced)
  useScrollFrame(() => contourRef.current?.draw(0), { isListening: isReduced })
}
