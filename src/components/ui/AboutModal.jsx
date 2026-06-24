import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { COLORS } from '../../constants/colors'
import WindowChrome from './WindowChrome'

const CLOSE_DURATION = 200

const FACTS = [
  { label: '// location',  value: 'Miami, FL' },
  { label: '// origin',    value: 'Cuban-American' },
  { label: '// edu',       value: 'FIU — Computer Science, Math' },
  { label: '// currently', value: 'SWE Intern @ Assurant' },
  { label: '// interests', value: 'AI / ML, full-stack, open source' },
]

function AboutModal({ onClose }) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(onClose, CLOSE_DURATION)
  }, [onClose])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="About Bryan"
    >
      <div className="absolute inset-0 bg-black/80" onClick={handleClose} />

      <div
        className={`relative z-10 w-full max-w-lg ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}
        style={{ background: '#0d0d0d', border: `1px solid ${COLORS.border}` }}
      >
        <WindowChrome title="~/about.md" onClose={handleClose} />

        <div className="p-3 md:p-8 flex flex-col gap-5">
          <div>
            <span className="font-mono text-xs mb-2 block" style={{ color: COLORS.accentGreen }}>// hello, world</span>
            <h2
              className="font-bold leading-none"
              style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.5rem, 8vw, 2.8rem)', color: COLORS.primaryText }}
            >
              Bryan Fernandez
            </h2>
          </div>

          <p className="font-mono text-xs md:text-sm leading-relaxed" style={{ color: COLORS.mutedText }}>
            Born and raised in Miami, FL to Cuban parents. I genuinely love building software — especially anything touching AI and ML. When I'm not coding I'm watching movies, catching sport games, or learning about something new.
          </p>

          <div className="flex flex-col gap-2 rounded-lg p-2 md:p-4 bg-white/[0.02]" style={{ border: `1px solid ${COLORS.border}` }}>
            {FACTS.map(({ label, value }) => (
              <div key={label} className="flex gap-2 items-start">
                <span className="font-mono text-[10px] shrink-0 mt-0.5 w-20 md:w-28" style={{ color: COLORS.accentPurple }}>{label}</span>
                <span className="font-mono text-[10px] md:text-xs" style={{ color: COLORS.primaryText }}>{value}</span>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px]" style={{ color: COLORS.dimText }}>
            open to internships, new grad roles, and cool projects_
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AboutModal
