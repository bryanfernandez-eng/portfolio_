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
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className={`relative z-10 bg-[#e8eaed] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>

        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 text-[#9098a3] hover:text-[#1a1a1a] transition-colors duration-200 bg-[#e2e5e9] rounded-full p-1.5"
        >
          <CloseIcon />
        </button>

        <div className="w-full h-56 md:h-72 shrink-0 overflow-hidden bg-[#1a1a2e]">
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 flex flex-col gap-6 overflow-y-auto">
          <div>
            <p className="font-mono text-xs text-[#9098a3] mb-1">{project.number}</p>
            <h2 className="text-3xl md:text-4xl font-normal text-[#1a1a1a] tracking-tight">
              {project.name}
            </h2>
          </div>

          <p className="text-[#4a5260] leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="font-mono text-xs px-2 py-1 rounded bg-[#e2e5e9] text-[#4a5260]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            {project.github && (
              <a
                href={project.github}
                aria-label="GitHub repository"
                className="flex items-center gap-2 text-sm font-mono text-[#1a1a1a] border border-[#d0d4d9] px-4 py-2 rounded-lg hover:bg-[#e2e5e9] transition-colors duration-200"
              >
                <GitHubIcon /> GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                aria-label="Live site"
                className="flex items-center gap-2 text-sm font-mono text-[#e8eaed] bg-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-[#39d353] hover:text-[#1a1a1a] transition-colors duration-200"
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
