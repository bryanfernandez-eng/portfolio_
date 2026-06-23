import { useState } from 'react'
import { PROJECTS } from '../constants/projects'
import { useCarousel } from '../hooks/useCarousel'
import ProjectCard from '../components/ui/ProjectCard'
import ProjectModal from '../components/ui/ProjectModal'
import BlueprintAxis from '../components/ui/BlueprintAxis'
import PaginationDots from '../components/ui/PaginationDots'
import { ChevronLeftIcon, ChevronRightIcon } from '../components/ui/icons'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const { scrollRef, activeIndex, cardsPerPage, totalPages, handleScroll, handlePrev, handleNext, scrollToPage } = useCarousel(PROJECTS.length)

  return (
    <section
      id="projects"
      className="relative overflow-hidden min-h-screen flex flex-col"
      style={{
        background: '#f5f5f5',
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }}
    >
      <BlueprintAxis />

      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '80px', zIndex: 3 }}>
        <svg viewBox="0 0 1440 80" width="100%" height="70" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 1440,0 1440,80 0,44" fill="#212121" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, #f5f5f5 0%, transparent 18%, transparent 85%, #f5f5f5 100%)`, zIndex: 1 }} />

      <div className="relative z-10 flex flex-col flex-1 min-h-0 pb-8 pt-20 md:pt-28 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between gap-4 mb-10 md:mb-16 px-4 md:px-16 lg:px-24">
          <div>
            <p className="font-mono text-xs text-[#9098a3] mb-2">// work</p>
            <h2 className="font-bold leading-none tracking-tight text-[#212121]" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 10vw, 6rem)' }}>
              Projects
            </h2>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={handlePrev} aria-label="Scroll left" className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white hover:text-[#212121] border transition-colors duration-150" style={{ background: '#212121', borderColor: '#212121', borderRadius: 0 }}>
              <ChevronLeftIcon />
            </button>
            <button onClick={handleNext} aria-label="Scroll right" className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white hover:text-[#212121] border transition-colors duration-150" style={{ background: '#212121', borderColor: '#212121', borderRadius: 0 }}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <div key={pageIdx} className="grid gap-4 md:gap-6 shrink-0 w-full px-4 md:px-16 lg:px-24" style={{ scrollSnapAlign: 'start', gridTemplateColumns: `repeat(${cardsPerPage}, 1fr)`, paddingBottom: '8px' }}>
              {PROJECTS.slice(pageIdx * cardsPerPage, pageIdx * cardsPerPage + cardsPerPage).map(project => (
                <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
              ))}
            </div>
          ))}
        </div>

        <PaginationDots total={totalPages} activeIndex={activeIndex} onSelect={scrollToPage} />
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}

export default Projects
