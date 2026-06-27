import FileDot from './FileDot'
import { opaquifyColor } from '../../utils/colors'
import { COLORS } from '../../constants/colors'

function FilePane({ file, openTabs, activeId, onTabSelect, onTabClose }) {
  if (!file) return (
    <div className="flex items-center justify-center h-full">
      <span className="font-mono text-xs" style={{ color: COLORS.dimText }}>// no file open</span>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="tab-bar hidden md:flex items-center border-b shrink-0 overflow-x-auto" style={{ borderColor: COLORS.border, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {openTabs.map(tab => {
          const isActive = tab.id === activeId
          const tabDotColor = opaquifyColor(tab.color)
          return (
            <button
              key={tab.id}
              className="flex items-center gap-2 px-3 py-2.5 border-r shrink-0 group/tab"
              style={{
                borderColor: COLORS.border,
                borderTop: isActive ? `2px solid ${tabDotColor}` : '2px solid transparent',
                background: isActive ? COLORS.surfaceAlt : 'transparent',
              }}
              onClick={() => onTabSelect(tab.id)}
            >
              <FileDot color={tabDotColor} />
              <span className="font-mono text-xs" style={{ color: isActive ? COLORS.primaryText : COLORS.mutedText }}>
                {tab.filename}
              </span>
              <button
                onClick={e => { e.stopPropagation(); onTabClose(tab.id) }}
                aria-label={`Close ${tab.filename}`}
                className="font-mono text-xs ml-1 leading-none transition-colors duration-150"
                style={{ color: COLORS.dimText }}
                onMouseEnter={e => { e.currentTarget.style.color = COLORS.primaryText }}
                onMouseLeave={e => { e.currentTarget.style.color = COLORS.dimText }}
              >
                ×
              </button>
            </button>
          )
        })}
      </div>

      <div key={file.id} className="pane-fade-in flex-1 overflow-y-auto px-4 md:px-8 py-5 md:py-8">
        <div className="font-mono text-[10px] md:text-xs mb-4 border rounded-lg p-2 md:p-4 bg-white/[0.02]" style={{ color: COLORS.mutedText, borderColor: COLORS.border }}>
          <p className="mb-2" style={{ color: COLORS.dimText }}>---</p>
          <p><span style={{ color: COLORS.accentPurple }}>role</span><span style={{ color: COLORS.mutedText }}>: </span><span style={{ color: COLORS.primaryText }}>{file.role}</span></p>
          <p><span style={{ color: COLORS.accentPurple }}>company</span><span style={{ color: COLORS.mutedText }}>: </span><span style={{ color: COLORS.primaryText }}>{file.company}</span></p>
          <p><span style={{ color: COLORS.accentPurple }}>period</span><span style={{ color: COLORS.mutedText }}>: </span><span style={{ color: COLORS.accentGreen }}>{file.period}</span></p>
          <p className="mt-2" style={{ color: COLORS.dimText }}>---</p>
        </div>

        <h2
          className="font-bold leading-none mb-5"
          style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.25rem, 6vw, 4rem)', color: COLORS.primaryText }}
        >
          {file.company}
        </h2>

        <ul className="flex flex-col gap-3">
          {file.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 md:gap-3 items-start">
              <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: COLORS.mutedText }}>-</span>
              <span className="text-xs md:text-sm leading-relaxed" style={{ color: COLORS.secondaryText }}>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilePane
