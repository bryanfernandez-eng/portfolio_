import { useState, useRef, useCallback, useEffect } from 'react'
import { PROJECTS } from '../constants/projects'
import ProjectCard from '../components/ui/ProjectCard'
import ProjectModal from '../components/ui/ProjectModal'
import { ChevronLeftIcon, ChevronRightIcon } from '../components/ui/icons'

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
      className="relative bg-[#e8eaed] overflow-hidden min-h-screen flex flex-col"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.065) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.065) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    >
      {/* Purple wiggly lines */}
      <svg
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: '32%', zIndex: 2 }}
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0,40 C150,15 280,62 420,38 C560,14 680,58 820,36 C960,14 1080,52 1200,34" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.45" />
        <path d="M0,55 C130,32 260,70 400,50 C540,30 660,68 800,48 C940,28 1080,62 1200,48" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.25" />
      </svg>

      {/* Pink wiggly lines */}
      <svg
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: '55%', zIndex: 2 }}
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0,30 C100,10 200,50 300,30 C400,10 500,50 600,28 C700,6 800,46 900,28 C1000,10 1100,44 1200,30" stroke="#ff2d78" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M0,50 C120,28 220,66 340,46 C460,26 560,62 680,44 C800,26 900,60 1020,42 C1100,30 1160,52 1200,46" stroke="#ff6eb4" strokeWidth="1.5" fill="none" opacity="0.3" />
      </svg>

      {/* Grid fade mask */}
      <div
        className="absolute inset-0 pointer-events-none rounded-t-3xl"
        style={{
          background: `linear-gradient(to bottom, #e8eaed 0%, transparent 20%, transparent 85%, #e8eaed 100%)`,
          zIndex: 1,
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-8 pt-16 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-mono text-xs text-[#9098a3] mb-2">// work</p>
            <h2
              className="font-bold leading-none tracking-tight text-[#212121]"
              style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              Projects
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleScrollLeft}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full bg-[#212121] text-[#e8eaed] flex items-center justify-center hover:bg-[#39d353] hover:text-[#212121] transition-colors duration-200"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full bg-[#212121] text-[#e8eaed] flex items-center justify-center hover:bg-[#39d353] hover:text-[#212121] transition-colors duration-200"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <div
              key={pageIdx}
              className="grid gap-4 shrink-0 w-full"
              style={{ scrollSnapAlign: 'start', gridTemplateColumns: `repeat(${cardsPerPage}, 1fr)` }}
            >
              {PROJECTS.slice(pageIdx * cardsPerPage, pageIdx * cardsPerPage + cardsPerPage).map(project => (
                <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); smoothScrollTo(scrollRef.current, i * scrollRef.current.offsetWidth) }}
              aria-label={`Go to page ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: activeIndex === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                background: activeIndex === i ? '#212121' : '#9098a3',
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
