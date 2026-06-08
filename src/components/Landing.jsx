import DotGrid from './DotGrid'
import GeometricBackground from './GeometricBackground'

const BADGES = ['FIU Computer Science', 'Director of Tech @ init', 'SWE Intern @ Assurant']

function Landing() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-8 overflow-hidden">
      <DotGrid />
      <GeometricBackground />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight">
          Bryan Fernandez<span className="animate-pulse">_</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {BADGES.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full border border-[#30363d] text-[#8b949e]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="absolute bottom-6 left-8 font-mono text-sm text-[#8b949e] z-10">
        // building things that matter
      </p>
    </section>
  )
}

export default Landing
