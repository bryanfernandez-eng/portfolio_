function ProjectCard({ project, onSelect }) {
  return (
    <button
      onClick={() => onSelect(project)}
      className="group text-left overflow-hidden cursor-pointer flex flex-col w-full"
      style={{
        height: '420px',
        background: '#fff',
        border: '1px solid #000',
        borderRadius: '0',
      }}
    >
      {/* Image — full B&W */}
      <div className="w-full shrink-0 overflow-hidden relative bg-[#111]" style={{ height: '200px' }}>
        <img
          src={project.image}
          alt={`${project.name} preview`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          style={{ filter: 'grayscale(1) contrast(1.15)' }}
        />
        {/* Number — top right */}
        <span
          className="absolute top-0 right-0 font-mono text-xs text-white bg-black px-2 py-1"
          style={{ letterSpacing: '0.05em' }}
        >
          {project.number}
        </span>
      </div>

      {/* Hard divider */}
      <div style={{ height: '3px', background: '#000', flexShrink: 0 }} />

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3
          className="font-bold leading-tight text-[#000]"
          style={{ fontFamily: "'Fraunces', serif", fontSize: '1.15rem' }}
        >
          {project.name}
        </h3>

        <p className="font-mono text-[11px] leading-relaxed text-[#444] line-clamp-2">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5"
              style={{ border: '1px solid #000', background: 'transparent', color: '#000' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar — inverts on hover */}
      <div
        className="px-4 py-2 shrink-0 flex items-center justify-between transition-colors duration-150 group-hover:bg-black"
        style={{ borderTop: '1px solid #000' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#000] group-hover:text-white transition-colors duration-150">
          View project
        </span>
        <span className="font-mono text-xs text-[#000] group-hover:text-white transition-colors duration-150">→</span>
      </div>
    </button>
  )
}

export default ProjectCard
