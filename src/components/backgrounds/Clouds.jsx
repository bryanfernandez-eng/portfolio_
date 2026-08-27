import { useEffect, useRef } from 'react'

const PARALLAX_FACTOR = 0.2
const EASE = 0.12

const CLOUD_ELLIPSES = [
  { id: 'a', cx: 260, cy: 150, rx: 230, ry: 68, opacity: 0.024 },
  { id: 'b', cx: 160, cy: 120, rx: 130, ry: 80, opacity: 0.022 },
  { id: 'c', cx: 340, cy: 115, rx: 120, ry: 75, opacity: 0.022 },
  { id: 'd', cx: 260, cy: 95, rx: 100, ry: 70, opacity: 0.018 },
  { id: 'e', cx: 180, cy: 80, rx: 80, ry: 58, opacity: 0.016 },
  { id: 'f', cx: 350, cy: 85, rx: 75, ry: 55, opacity: 0.016 },
]

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

const CLOUD_BODY_MASK = 'radial-gradient(ellipse 46% 52% at 50% 54%, #000 24%, rgba(0,0,0,0.55) 52%, transparent 78%)'

function CloudShape({ id, style, className }) {
  const blurId = `${id}-blur`
  return (
    <div className={className} style={style} aria-hidden="true">
      <div
        style={{
          position: 'absolute',
          inset: '-15%',
          backdropFilter: 'blur(4px) brightness(0.96)',
          WebkitBackdropFilter: 'blur(4px) brightness(0.96)',
          maskImage: CLOUD_BODY_MASK,
          WebkitMaskImage: CLOUD_BODY_MASK,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
        viewBox="0 0 520 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <g filter={`url(#${blurId})`}>
          {CLOUD_ELLIPSES.map(e => (
            <ellipse key={e.id} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="white" opacity={e.opacity} />
          ))}
        </g>
      </svg>
    </div>
  )
}

function Clouds() {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let current = window.scrollY * PARALLAX_FACTOR
    let target = current
    let raf = 0
    const tick = () => {
      current += (target - current) * EASE
      if (Math.abs(target - current) < 0.15) {
        current = target
        raf = 0
      } else {
        raf = requestAnimationFrame(tick)
      }
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
    }
    const handleScroll = () => {
      target = window.scrollY * PARALLAX_FACTOR
      if (!raf) raf = requestAnimationFrame(tick)
    }
    el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

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
