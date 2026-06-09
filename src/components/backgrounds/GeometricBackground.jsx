// All sizes/offsets in vw so they scale with viewport width
const BLOBS = [
  {
    id: 'blob-green',
    color: '#39d353',
    style: { position: 'absolute', top: '-16vw', left: '-16vw', width: '44vw', height: '44vw' },
    viewBox: '0 0 520 520',
    path: 'M 255 22 C 355 8, 475 95, 478 248 C 481 398, 368 490, 242 485 C 112 480, 20 375, 25 242 C 30 108, 148 36, 255 22 Z',
    // scale 0.62 around center (260,260) to get inner shape with ~40px gap
    innerTransform: 'translate(98, 98) scale(0.62)',
  },
  {
    id: 'blob-blue',
    color: '#58a6ff',
    style: { position: 'absolute', bottom: '-22vw', right: '-22vw', width: '46vw', height: '46vw' },
    viewBox: '0 0 480 480',
    path: 'M 240 20 C 395 8, 475 115, 465 255 C 454 400, 340 470, 195 462 C 50 454, -10 330, 8 185 C 25 45, 95 32, 240 20 Z',
    innerTransform: 'translate(48, 48) scale(0.8)',
  },
]

const LINES = [
  {
    id: 'line-green',
    color: '#39d353',
    style: { position: 'absolute', bottom: '-16vw', right: '-16vw', width: '46vw', height: '46vw' },
    viewBox: '0 0 480 480',
    path: 'M 420 430 C 390 360, 330 400, 285 320 C 240 240, 290 190, 240 120 C 200 65, 150 50, 90 20',
  },
]

function GeometricBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {BLOBS.map(({ id, color, style, path, viewBox, innerTransform }) => (
        <svg key={id} style={{ ...style, filter: `drop-shadow(0 0 4px ${color}55) drop-shadow(0 0 10px ${color}25)` }} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={path} stroke={color} strokeWidth="3" opacity="0.45" />
          <g transform={innerTransform}>
            <path d={path} stroke={color} strokeWidth="4.5" opacity="0.2" />
          </g>
        </svg>
      ))}
      {LINES.map(({ id, color, style, path, viewBox }) => (
        <svg key={id} style={{ ...style, filter: `drop-shadow(0 0 3px ${color}55) drop-shadow(0 0 8px ${color}25)` }} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={path} stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  )
}

export default GeometricBackground
