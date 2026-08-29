const CLOUD_ELLIPSES = [
  { id: 'a', cx: 260, cy: 150, rx: 230, ry: 68, opacity: 0.018 },
  { id: 'b', cx: 160, cy: 120, rx: 130, ry: 80, opacity: 0.017 },
  { id: 'c', cx: 340, cy: 115, rx: 120, ry: 75, opacity: 0.017 },
  { id: 'd', cx: 260, cy: 95, rx: 100, ry: 70, opacity: 0.014 },
  { id: 'e', cx: 180, cy: 80, rx: 80, ry: 58, opacity: 0.012 },
  { id: 'f', cx: 350, cy: 85, rx: 75, ry: 55, opacity: 0.012 },
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
            <feGaussianBlur stdDeviation="3" />
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

export default CloudShape
