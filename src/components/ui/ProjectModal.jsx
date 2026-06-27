import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './icons'
import { COLORS } from '../../constants/colors'
import ModalContent from './ModalContent'

const CLOSE_DURATION = 200
const GRID_LINE = 'rgba(0,0,0,0.07)'

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
          background: COLORS.light,
          backgroundImage: `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          border: `1px solid ${COLORS.black}`,
          borderRadius: 0,
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-0 right-0 z-20 text-white transition-colors duration-150 p-2"
          style={{ background: COLORS.black }}
          onMouseEnter={e => { e.currentTarget.style.background = COLORS.midText }}
          onMouseLeave={e => { e.currentTarget.style.background = COLORS.black }}
        >
          <CloseIcon />
        </button>

        <div className="p-4 pb-0 shrink-0">
          <div className="overflow-hidden" style={{ height: '260px', background: COLORS.black, border: `1px solid ${COLORS.black}` }}>
            <img
              src={project.image.startsWith('data:') ? project.image : `${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <ModalContent project={project} />
      </div>
    </div>,
    document.body
  )
}

export default ProjectModal
