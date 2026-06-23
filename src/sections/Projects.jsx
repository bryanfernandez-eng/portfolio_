import { useState, useRef, useCallback, useEffect } from 'react'
import { PROJECTS } from '../constants/projects'
import ProjectCard from '../components/ui/ProjectCard'
import ProjectModal from '../components/ui/ProjectModal'
import { ChevronLeftIcon, ChevronRightIcon } from '../components/ui/icons'

function BlueprintAxis() {
  return (
    <>
      {/* Corner coordinate labels */}
      <span className="absolute font-mono pointer-events-none select-none" style={{ top: 12, left: 14, fontSize: 9, color: 'rgba(0,0,0,0.2)', zIndex: 2 }}>[0,0]</span>
      <span className="absolute font-mono pointer-events-none select-none" style={{ top: 12, right: 14, fontSize: 9, color: 'rgba(0,0,0,0.2)', zIndex: 2 }}>x →</span>
      <span className="absolute font-mono pointer-events-none select-none" style={{ bottom: 12, left: 14, fontSize: 9, color: 'rgba(0,0,0,0.2)', zIndex: 2 }}>y ↓</span>
    </>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const scrollRef = useRef(null)

  useEffect(() => {
    function update() {
      if (window.innerWidth >= 1024) setCardsPerPage(3)
      else if (window.innerWidth >= 640) setCardsPerPage(2)
      else setCardsPerPage(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const page = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveIndex(page)
  }, [])

  const totalPages = Math.ceil(PROJECTS.length / cardsPerPage)

  function smoothScrollTo(el, target, duration = 600) {
    const start = el.scrollLeft
    const delta = target - start
    const startTime = performance.now()

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      el.scrollLeft = start + delta * easeInOutCubic(progress)
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  function handleScrollLeft() {
    const el = scrollRef.current
    if (!el) return
    const newPage = Math.max(0, activeIndex - 1)
    setActiveIndex(newPage)
    smoothScrollTo(el, newPage * el.offsetWidth)
  }

  function handleScrollRight() {
    const el = scrollRef.current
    if (!el) return
    const newPage = Math.min(totalPages - 1, activeIndex + 1)
    setActiveIndex(newPage)
    smoothScrollTo(el, newPage * el.offsetWidth)
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden min-h-screen flex flex-col"
      style={{
        background: '#f5f5f5',
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    >
      <BlueprintAxis />

      {/* Diagonal transition from Landing (dark) into Projects (light) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '80px', zIndex: 3 }}>
        <svg viewBox="0 0 1440 80" width="100%" height="70" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 1440,0 1440,80 0,44" fill="#212121" />
        </svg>
      </div>

      {/* Grid fade mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, #f5f5f5 0%, transparent 18%, transparent 85%, #f5f5f5 100%)`,
          zIndex: 1,
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-8 pt-20 md:pt-28 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between gap-4 mb-10 md:mb-16 px-4 md:px-16 lg:px-24">
          <div>
            <p className="font-mono text-xs text-[#9098a3] mb-2">// work</p>
            <h2
              className="font-bold leading-none tracking-tight text-[#212121]"
              style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 10vw, 6rem)' }}
            >
              Projects
            </h2>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleScrollLeft}
              aria-label="Scroll left"
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white hover:text-[#212121] border transition-colors duration-150"
              style={{ background: '#212121', borderColor: '#212121', borderRadius: 0 }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Scroll right"
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white hover:text-[#212121] border transition-colors duration-150"
              style={{ background: '#212121', borderColor: '#212121', borderRadius: 0 }}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <div
              key={pageIdx}
              className="grid gap-4 md:gap-6 shrink-0 w-full px-4 md:px-16 lg:px-24"
              style={{ scrollSnapAlign: 'start', gridTemplateColumns: `repeat(${cardsPerPage}, 1fr)`, paddingBottom: '8px' }}
            >
              {PROJECTS.slice(pageIdx * cardsPerPage, pageIdx * cardsPerPage + cardsPerPage).map(project => (
                <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8 px-4 md:px-16 lg:px-24">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); smoothScrollTo(scrollRef.current, i * scrollRef.current.offsetWidth) }}
              aria-label={`Go to page ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: activeIndex === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '2px',
                background: activeIndex === i ? '#212121' : '#ccc',
              }}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

export default Projects
