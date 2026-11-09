import { useRef } from 'react'
import { useBridgeBall } from '../hooks/useBridgeBall'
import './SectionBridge.css'

function SectionBridge({ isMirrored = false }) {
  const hostRef = useRef(null)
  useBridgeBall(hostRef, isMirrored)

  return (
    <div className="bridge" ref={hostRef} aria-hidden="true">
      <svg>
        <path className="track" />
        <path className="done" />
        <g className="rolling">
          <circle className="ball" r="9" />
          <path className="seam" d="M0 -9V9M-9 0H9M-6.3 -6.3Q-2 0 -6.3 6.3M6.3 -6.3Q2 0 6.3 6.3" />
        </g>
      </svg>
    </div>
  )
}

export default SectionBridge
