function ProjectCard({ project, onSelect }) {
  return (
    <button
      onClick={() => onSelect(project)}
      className="group text-left bg-[#e2e5e9] border-2 border-[#212121] rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{ height: '420px' }}
    >
      <div className="w-full h-44 shrink-0 overflow-hidden bg-[#1a1a2e]">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-normal text-[#1a1a1a] tracking-tight group-hover:text-[#39d353] transition-colors duration-200">
            {project.name}
          </h3>
          <span className="font-mono text-xs text-[#9098a3] shrink-0 pt-0.5">{project.number}</span>
        </div>

        <p className="text-[#4a5260] text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="font-mono text-xs px-2 py-0.5 rounded bg-[#d0d4d9] text-[#4a5260]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

export default ProjectCard
