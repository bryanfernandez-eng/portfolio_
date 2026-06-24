import { useState } from 'react'
import DotGrid from '../components/backgrounds/DotGrid'
import GeometricBackground from '../components/backgrounds/GeometricBackground'
import Clouds from '../components/backgrounds/Clouds'
import { BADGES } from '../constants/landing'
import AboutModal from '../components/ui/AboutModal'

function Landing() {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-8 overflow-hidden">
      <DotGrid />
      <GeometricBackground />
      <Clouds />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight">
          Bryan Fernandez<span className="animate-pulse">_</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {BADGES.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full border-[#30363d] text-[#8b949e]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #212121)', zIndex: 5 }}
      />

      <p className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 font-mono text-xs sm:text-sm text-[#8b949e] z-10">
        // building things that matter
      </p>

      <button
        onClick={() => setShowAbout(true)}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 font-mono text-xs sm:text-sm text-[#8b949e] hover:text-[#39d353] transition-colors duration-150 z-10"
      >
        about.md<span className="animate-pulse text-[#39d353]">_</span>
      </button>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </section>
  )
}

export default Landing
