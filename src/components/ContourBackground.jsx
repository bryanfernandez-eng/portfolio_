import { useRef } from 'react'
import { useContour } from '../hooks/useContour'
import { CONTOUR_LEVELS } from '../utils/contour/contour'
import './ContourBackground.css'

function ContourBackground({ seed }) {
  const svgRef = useRef(null)
  useContour(svgRef, seed)

  return (
    <svg className="topo" ref={svgRef} aria-hidden="true">
      {CONTOUR_LEVELS.map((level, i) => (
        <path className={i % 4 === 0 ? 'major' : 'minor'} key={level} />
      ))}
    </svg>
  )
}

export default ContourBackground
