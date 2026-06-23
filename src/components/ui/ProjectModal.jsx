import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { GitHubIcon, ExternalLinkIcon, CloseIcon } from './icons'

const CLOSE_DURATION = 200

function ProjectModal({ project, onClose }) {
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
      aria-label={project.name}
    >
      <div className="absolute inset-0 bg-black/80" onClick={handleClose} />

      <div
        className={`relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}
        style={{
          background: '#f5f5f5',
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          border: '1px solid #000',
          borderRadius: 0,
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-0 right-0 z-20 bg-black text-white hover:bg-[#333] transition-colors duration-150 p-2"
        >
          <CloseIcon />
        </button>

        {/* Image — B&W, inset with grid showing around it */}
        <div className="p-4 pb-0 shrink-0">
          <div className="overflow-hidden bg-black" style={{ height: '260px', border: '1px solid #000' }}>
            <img
              src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(1) contrast(1.15)' }}
            />
          </div>
        </div>

        <div className="p-8 flex flex-col gap-6 overflow-y-auto" style={{ background: '#fff', margin: '16px', border: '1px solid #000' }}>
          <div>
            <p className="font-mono text-xs text-[#999] mb-1">{project.number}</p>
            <h2
              className="font-bold leading-none tracking-tight text-black"
              style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              {project.name}
            </h2>
          </div>

          <p className="font-mono text-sm text-[#444] leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="font-mono text-xs px-2 py-1 text-black"
                style={{ border: '1px solid #000', borderRadius: 0 }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                aria-label="GitHub repository"
                className="flex items-center gap-2 text-xs font-mono text-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-150"
                style={{ border: '1px solid #000', borderRadius: 0 }}
              >
                <GitHubIcon /> GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                aria-label="Live site"
                className="flex items-center gap-2 text-xs font-mono text-white bg-black px-4 py-2 hover:bg-[#333] transition-colors duration-150"
                style={{ border: '1px solid #000', borderRadius: 0 }}
              >
                <ExternalLinkIcon /> Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ProjectModal
