import FileDot from './FileDot'
import { opaquifyColor } from '../../utils/colors'
import { COLORS } from '../../constants/colors'

function FilePane({ file, openTabs, activeId, onTabSelect, onTabClose }) {
  if (!file) return (
    <div className="flex items-center justify-center h-full">
      <span className="font-mono text-xs text-[#30363d]">// no file open</span>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="tab-bar hidden md:flex items-center border-b border-[#2d2d2d] shrink-0 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {openTabs.map(tab => {
          const isActive = tab.id === activeId
          const tabDotColor = opaquifyColor(tab.color)
          return (
            <div
              key={tab.id}
              className="flex items-center gap-2 px-3 py-2.5 border-r border-[#2d2d2d] shrink-0 cursor-pointer group/tab"
              style={{
                borderTop: isActive ? `2px solid ${tabDotColor}` : '2px solid transparent',
                background: isActive ? '#1a1a1a' : 'transparent',
              }}
              onClick={() => onTabSelect(tab.id)}
            >
              <FileDot color={tabDotColor} />
              <span
                className="font-mono text-xs"
                style={{ color: isActive ? '#e6edf3' : '#8b949e' }}
              >
                {tab.filename}
              </span>
              <button
                onClick={e => { e.stopPropagation(); onTabClose(tab.id) }}
                aria-label={`Close ${tab.filename}`}
                className="font-mono text-xs text-[#30363d] hover:text-[#e6edf3] transition-colors duration-150 ml-1 leading-none"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div key={file.id} className="pane-fade-in flex-1 overflow-y-auto px-4 md:px-8 py-5 md:py-8">
        <div className="font-mono text-[10px] md:text-xs text-[#8b949e] mb-4 border border-[#2d2d2d] rounded-lg p-2 md:p-4 bg-white/[0.02]">
          <p className="text-[#30363d] mb-2">---</p>
          <p><span style={{ color: COLORS.accentPurple }}>role</span><span className="text-[#8b949e]">: </span><span className="text-[#e6edf3]">{file.role}</span></p>
          <p><span style={{ color: COLORS.accentPurple }}>company</span><span className="text-[#8b949e]">: </span><span className="text-[#e6edf3]">{file.company}</span></p>
          <p><span style={{ color: COLORS.accentPurple }}>period</span><span className="text-[#8b949e]">: </span><span className="text-[#39d353]">{file.period}</span></p>
          <p className="text-[#30363d] mt-2">---</p>
        </div>

        <h2
          className="font-bold text-[#e6edf3] leading-none mb-5"
          style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.25rem, 6vw, 4rem)' }}
        >
          {file.company}
        </h2>

        <ul className="flex flex-col gap-3">
          {file.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 md:gap-3 items-start">
              <span className="font-mono text-xs text-[#8b949e] shrink-0 mt-0.5">-</span>
              <span className="text-xs md:text-sm text-[#c9d1d9] leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilePane
