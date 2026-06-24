import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './icons'

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
        style={{
          background: '#0d0d0d',
          border: '1px solid #2d2d2d',
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2d2d2d] bg-[#1a1a1a]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="font-mono text-xs text-[#8b949e] ml-3">~/about.md</span>
          <button onClick={handleClose} aria-label="Close" className="ml-auto text-[#8b949e] hover:text-[#e6edf3] transition-colors duration-150">
            <CloseIcon />
          </button>
        </div>

        <div className="p-3 md:p-8 flex flex-col gap-5">
          <div>
            <span className="font-mono text-xs text-[#39d353] mb-2 block">// hello, world</span>
            <h2
              className="font-bold leading-none text-[#e6edf3]"
              style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.5rem, 8vw, 2.8rem)' }}
            >
              Bryan Fernandez
            </h2>
          </div>

          <p className="font-mono text-xs md:text-sm text-[#8b949e] leading-relaxed">
            Born and raised in Miami, FL to Cuban parents. I genuinely love building software — especially anything touching AI and ML. When I'm not coding I'm watching movies, catching sport games, or learning about something new.
          </p>

          <div className="flex flex-col gap-2 border border-[#2d2d2d] rounded-lg p-2 md:p-4 bg-white/[0.02]">
            {FACTS.map(({ label, value }) => (
              <div key={label} className="flex gap-2 items-start">
                <span className="font-mono text-[10px] text-[#8b5cf6] shrink-0 mt-0.5 w-20 md:w-28">{label}</span>
                <span className="font-mono text-[10px] md:text-xs text-[#e6edf3]">{value}</span>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] text-[#30363d]">
            open to internships, new grad roles, and cool projects_
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AboutModal
