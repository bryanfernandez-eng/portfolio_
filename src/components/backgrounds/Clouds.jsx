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

function CloudShape({ style, className }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 520 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="260" cy="150" rx="230" ry="68" fill="white" opacity="0.008" />
      <ellipse cx="160" cy="120" rx="130" ry="80" fill="white" opacity="0.007" />
      <ellipse cx="340" cy="115" rx="120" ry="75" fill="white" opacity="0.007" />
      <ellipse cx="260" cy="95" rx="100" ry="70" fill="white" opacity="0.006" />
      <ellipse cx="180" cy="80" rx="80" ry="58" fill="white" opacity="0.005" />
      <ellipse cx="350" cy="85" rx="75" ry="55" fill="white" opacity="0.005" />
    </svg>
  )
}

function Clouds() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {CLOUDS.map(({ id, style, className }) => (
        <CloudShape key={id} style={style} className={className} />
      ))}
    </div>
  )
}

export default Clouds
