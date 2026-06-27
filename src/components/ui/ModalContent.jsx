import { GitHubIcon, ExternalLinkIcon } from './icons'
import { COLORS } from '../../constants/colors'

function ModalContent({ project }) {
  return (
    <div
      className="p-8 flex flex-col gap-6 overflow-y-auto"
      style={{ background: COLORS.white, margin: '16px', border: `1px solid ${COLORS.black}` }}
    >
      <div>
        <p className="font-mono text-xs mb-1" style={{ color: COLORS.subduedText }}>{project.number}</p>
        <h2
          className="font-bold leading-none tracking-tight"
          style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: COLORS.black }}
        >
          {project.name}
        </h2>
      </div>

      <p className="font-mono text-sm leading-relaxed max-w-2xl" style={{ color: COLORS.midText }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-1"
            style={{ color: COLORS.black, border: `1px solid ${COLORS.black}`, borderRadius: 0 }}
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
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 hover:bg-black hover:text-white transition-colors duration-150"
            style={{ color: COLORS.black, border: `1px solid ${COLORS.black}`, borderRadius: 0 }}
          >
            <GitHubIcon /> GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            aria-label="Live site"
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 transition-colors duration-150"
            style={{ color: COLORS.white, background: COLORS.black, border: `1px solid ${COLORS.black}`, borderRadius: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = COLORS.midText }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.black }}
          >
            <ExternalLinkIcon /> Live Site
          </a>
        )}
      </div>
    </div>
  )
}

export default ModalContent
