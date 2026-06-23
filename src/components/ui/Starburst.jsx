function Starburst() {
  const points = 16
  const cx = 120, cy = 120
  const r1 = 110, r2 = 80
  const pts = Array.from({ length: points * 2 }, (_, i) => {
    const angle = (Math.PI / points) * i - Math.PI / 2
    const r = i % 2 === 0 ? r1 : r2
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')

  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{ width: 280, height: 280, top: -50, left: -50, zIndex: 0, animation: 'spin 200s linear infinite', transformOrigin: 'center' }}
    >
      <polygon points={pts} fill="#a8f0b8" />
    </svg>
  )
}

export default Starburst
