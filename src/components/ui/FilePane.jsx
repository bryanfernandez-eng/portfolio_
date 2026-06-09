import FileDot from './FileDot'

function FilePane({ file }) {
  const dotColor = file.color.replace('0.35', '1')

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar — desktop only */}
      <div className="hidden md:flex items-center gap-0 border-b border-[#2d2d2d] shrink-0">
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-r border-[#2d2d2d] border-t-2"
          style={{ borderTopColor: dotColor, background: '#1a1a1a' }}
        >
          <FileDot color={dotColor} />
          <span className="font-mono text-xs text-[#e6edf3]">{file.filename}</span>
          <span className="font-mono text-xs text-[#8b949e] ml-1">×</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 md:py-8">
        <div className="font-mono text-xs text-[#8b949e] mb-6 border border-[#2d2d2d] rounded-lg p-4 bg-white/[0.02]">
          <p className="text-[#30363d] mb-2">---</p>
          <p><span className="text-[#8b5cf6]">role</span><span className="text-[#8b949e]">: </span><span className="text-[#e6edf3]">{file.role}</span></p>
          <p><span className="text-[#8b5cf6]">company</span><span className="text-[#8b949e]">: </span><span className="text-[#e6edf3]">{file.company}</span></p>
          <p><span className="text-[#8b5cf6]">period</span><span className="text-[#8b949e]">: </span><span className="text-[#39d353]">{file.period}</span></p>
          <p className="text-[#30363d] mt-2">---</p>
        </div>

        <h2
          className="font-bold text-[#e6edf3] leading-none mb-6"
          style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {file.company}
        </h2>

        <ul className="flex flex-col gap-3">
          {file.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="font-mono text-xs text-[#8b949e] shrink-0 mt-0.5">-</span>
              <span className="text-sm text-[#c9d1d9] leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilePane
