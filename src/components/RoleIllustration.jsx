import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getIllustration } from '../utils/roleIllustrations'
import { classNames } from '../utils/classNames'
import './RoleIllustration.css'

function RoleIllustration({ id }) {
  const svgRef = useRef(null)
  const isReduced = useReducedMotion()
  const isInView = useInView(svgRef, { threshold: 0.35, isOnce: true })

  return (
    <svg
      className={classNames('il', (isInView || isReduced) && 'drawn')}
      ref={svgRef}
      viewBox="-130 -95 260 180"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: getIllustration(id, isReduced) }}
    />
  )
}

export default RoleIllustration
