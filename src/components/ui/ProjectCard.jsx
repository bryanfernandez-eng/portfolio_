import { COLORS } from '../../constants/colors'

function ProjectCard({ project, onSelect }) {
  return (
    <button
      onClick={() => onSelect(project)}
      className="text-left overflow-hidden cursor-pointer flex flex-col w-full"
      style={{
        minHeight: '380px',
        background: '#fff',
        border: `1px solid ${COLORS.dark}`,
        borderRadius: '0',
      }}
    >
      <div className="w-full shrink-0 overflow-hidden relative" style={{ height: '200px' }}>
        <img
          src={project.image.startsWith('data:') ? project.image : `${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
          alt={`${project.name} preview`}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <span
          className="absolute top-0 right-0 font-mono text-xs text-white px-2 py-1"
          style={{ letterSpacing: '0.05em', background: COLORS.dark }}
        >
          {project.number}
        </span>
      </div>

      <div style={{ height: '1px', background: COLORS.dark, flexShrink: 0 }} />

      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3
          className="font-bold leading-tight"
          style={{ fontFamily: "'Fraunces', serif", fontSize: '1.15rem', color: COLORS.dark }}
        >
          {project.name}
        </h3>

        <p className="font-mono text-[11px] leading-relaxed line-clamp-2" style={{ color: COLORS.midText }}>
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5"
              style={{ border: `1px solid ${COLORS.dark}`, background: 'transparent', color: COLORS.dark }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        className="px-4 py-2 shrink-0 flex items-center justify-between transition-colors duration-150 group/bar"
        style={{ borderTop: `1px solid ${COLORS.dark}` }}
        onMouseEnter={e => { e.currentTarget.style.background = COLORS.dark }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest transition-colors duration-150 group-hover/bar:text-white" style={{ color: COLORS.dark }}>
          View project
        </span>
        <span className="font-mono text-xs transition-colors duration-150 group-hover/bar:text-white" style={{ color: COLORS.dark }}>→</span>
      </div>
    </button>
  )
}

export default ProjectCard
