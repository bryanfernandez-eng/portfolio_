import { useState, useEffect } from 'react'

function AlignmentGuides({ sectionRef, editorRef }) {
  const [lines, setLines] = useState(null)

  useEffect(() => {
    function measure() {
      const s = sectionRef.current
      const e = editorRef.current
      if (!s || !e) return
      const sr = s.getBoundingClientRect()
      const er = e.getBoundingClientRect()
      setLines({
        w:      sr.width,
        h:      sr.height,
        left:   er.left   - sr.left,
        right:  er.right  - sr.left,
        top:    er.top    - sr.top,
        bottom: er.bottom - sr.top,
      })
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [sectionRef, editorRef])

  if (!lines) return null

  const { w, h, left, right, top, bottom } = lines
  const color = 'rgba(57,211,83,0.2)'
  const crossColor = 'rgba(57,211,83,0.45)'
  const dash = '5,6'

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5, width: w, height: h }}
      viewBox={`0 0 ${w} ${h}`}
    >
      <line x1={0}     y1={top}    x2={left}  y2={top}    stroke={color} strokeWidth="1" strokeDasharray={dash} />
      <line x1={0}     y1={bottom} x2={left}  y2={bottom} stroke={color} strokeWidth="1" strokeDasharray={dash} />
      <line x1={right} y1={top}    x2={w}     y2={top}    stroke={color} strokeWidth="1" strokeDasharray={dash} />
      <line x1={right} y1={bottom} x2={w}     y2={bottom} stroke={color} strokeWidth="1" strokeDasharray={dash} />
      <line x1={left}  y1={0}      x2={left}  y2={top}    stroke={color} strokeWidth="1" strokeDasharray={dash} />
      <line x1={right} y1={0}      x2={right} y2={top}    stroke={color} strokeWidth="1" strokeDasharray={dash} />
      <line x1={left}  y1={bottom} x2={left}  y2={h}      stroke={color} strokeWidth="1" strokeDasharray={dash} />
      <line x1={right} y1={bottom} x2={right} y2={h}      stroke={color} strokeWidth="1" strokeDasharray={dash} />

      {[[left, top], [right, top], [left, bottom], [right, bottom]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx - 6} y1={cy}     x2={cx + 6} y2={cy}     stroke={crossColor} strokeWidth="1" />
          <line x1={cx}     y1={cy - 6} x2={cx}     y2={cy + 6} stroke={crossColor} strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}

export default AlignmentGuides
