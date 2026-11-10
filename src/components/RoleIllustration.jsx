import { useLayoutEffect, useRef, useState } from 'react'
import { useIdle } from '../hooks/useIdle'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getIllustration } from '../utils/illustrations/roleIllustrations'
import { classNames } from '../utils/classNames'
import './RoleIllustration.css'

const DEFAULT_VIEWBOX = '-130 -95 260 180'
const PADDING = 4

function RoleIllustration({ id }) {
  const svgRef = useRef(null)
  const [viewBox, setViewBox] = useState(DEFAULT_VIEWBOX)
  const isReduced = useReducedMotion()
  const isInView = useInView(svgRef, { threshold: 0.35, isOnce: true })
  const isOnScreen = useInView(svgRef)
  const isIdle = useIdle()
  const markup = getIllustration(id, isReduced)

  useLayoutEffect(() => {
    const { x, y, width, height } = svgRef.current.getBBox()
    setViewBox([x - PADDING, y - PADDING, width + PADDING * 2, height + PADDING * 2].map(value => value.toFixed(1)).join(' '))
  }, [markup])

  return (
    <svg
      className={classNames('il', (isInView || isReduced) && 'drawn', (!isOnScreen || isIdle) && 'paused')}
      ref={svgRef}
      viewBox={viewBox}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export default RoleIllustration
