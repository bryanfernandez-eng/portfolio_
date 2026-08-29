import { useState, useEffect } from 'react'
import { COLORS } from '../../constants/colors'

const GUIDE_COLOR = `${COLORS.accentGreen}40`
const GUIDE_CROSS = COLORS.accentGreen
const DASH = '5,6'

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

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10, width: w, height: h }}
      viewBox={`0 0 ${w} ${h}`}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <line x1={0}     y1={top}    x2={left}  y2={top}    stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />
      <line x1={0}     y1={bottom} x2={left}  y2={bottom} stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />
      <line x1={right} y1={top}    x2={w}     y2={top}    stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />
      <line x1={right} y1={bottom} x2={w}     y2={bottom} stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />
      <line x1={left}  y1={0}      x2={left}  y2={top}    stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />
      <line x1={right} y1={0}      x2={right} y2={top}    stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />
      <line x1={left}  y1={bottom} x2={left}  y2={h}      stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />
      <line x1={right} y1={bottom} x2={right} y2={h}      stroke={GUIDE_COLOR} strokeWidth="1" strokeDasharray={DASH} />

      {[[left, top], [right, top], [left, bottom], [right, bottom]].map(([cx, cy], i) => (
        <g key={i} filter="url(#glow)">
          <line x1={cx - 8} y1={cy}     x2={cx + 8} y2={cy}     stroke={GUIDE_CROSS} strokeWidth="1.5" />
          <line x1={cx}     y1={cy - 8} x2={cx}     y2={cy + 8} stroke={GUIDE_CROSS} strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  )
}

export default AlignmentGuides
