import { useRef } from 'react'
import { useScrollParallax } from '../../hooks/useScrollParallax'
import CloudShape from './CloudShape'

const PARALLAX_FACTOR = 0.2

const CLOUDS = [
  {
    id: 'cloud-1',
    className: 'cloud-1',
    style: { position: 'absolute', top: '8%', left: '-6%', width: '52vw', height: '22vw' },
  },
  {
    id: 'cloud-2',
    className: 'cloud-2',
    style: { position: 'absolute', top: '18%', right: '-10%', width: '44vw', height: '18vw' },
  },
  {
    id: 'cloud-3',
    className: 'cloud-3',
    style: { position: 'absolute', bottom: '14%', left: '10%', width: '38vw', height: '16vw' },
  },
]

function Clouds() {
  const containerRef = useRef(null)
  useScrollParallax(containerRef, PARALLAX_FACTOR)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      {CLOUDS.map(({ id, style, className }) => (
        <CloudShape key={id} id={id} style={style} className={className} />
      ))}
    </div>
  )
}

export default Clouds
