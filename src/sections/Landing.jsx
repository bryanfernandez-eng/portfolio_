import { useState } from 'react'
import DotGrid from '../components/backgrounds/DotGrid'
import GeometricBackground from '../components/backgrounds/GeometricBackground'
import Clouds from '../components/backgrounds/Clouds'
import { BADGES } from '../constants/landing'
import AboutModal from '../components/ui/AboutModal'
import { COLORS } from '../constants/colors'

function Landing() {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-[clamp(1.5rem,5vw,2rem)] overflow-hidden">
      <DotGrid />
      <GeometricBackground />
      <Clouds />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="font-normal tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
          Bryan Fernandez<span className="animate-pulse">_</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {BADGES.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full"
              style={{ border: `1px solid ${COLORS.dimText}`, color: COLORS.mutedText }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[clamp(4rem,10vw,6rem)] pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.dark})`, zIndex: 5 }}
      />

      <p className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 font-mono text-xs sm:text-sm z-10" style={{ color: COLORS.mutedText }}>
        // building things that matter
      </p>

      <button
        onClick={() => setShowAbout(true)}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 font-mono text-xs sm:text-sm transition-colors duration-150 z-10"
        style={{ color: COLORS.mutedText }}
        onMouseEnter={e => { e.currentTarget.style.color = COLORS.accentGreen }}
        onMouseLeave={e => { e.currentTarget.style.color = COLORS.mutedText }}
      >
        about.md<span className="animate-pulse" style={{ color: COLORS.accentGreen }}>_</span>
      </button>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </section>
  )
}

export default Landing
