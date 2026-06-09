import FileDot from './FileDot'

function MobileFilePicker({ files, activeId, onSelect }) {
  return (
    <div className="flex overflow-x-auto gap-1 px-3 py-2 border-b border-[#2d2d2d]" style={{ scrollbarWidth: 'none' }}>
      {files.map(file => {
        const dotColor = file.color.replace('0.35', '1')
        const isActive = activeId === file.id
        return (
          <button
            key={file.id}
            onClick={() => onSelect(file.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 transition-colors duration-150 border"
            style={{
              background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
              borderColor: isActive ? dotColor + '60' : 'transparent',
            }}
          >
            <FileDot color={dotColor} />
            <span className="font-mono text-xs" style={{ color: isActive ? '#e6edf3' : '#8b949e' }}>
              {file.filename}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default MobileFilePicker
