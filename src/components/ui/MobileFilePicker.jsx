import FileDot from './FileDot'
import { opaquifyColor } from '../../utils/colors'

function MobileFilePicker({ files, activeId, onSelect }) {
  const active = files.find(f => f.id === activeId)
  const dotColor = active ? opaquifyColor(active.color) : '#8b949e'

  return (
    <div className="px-3 py-2 border-b border-[#2d2d2d] flex items-center gap-2">
      <FileDot color={dotColor} />
      <div className="relative flex-1">
        <select
          value={activeId ?? ''}
          onChange={e => onSelect(e.target.value)}
          className="w-full appearance-none bg-transparent font-mono text-xs text-[#e6edf3] outline-none cursor-pointer pr-5"
        >
          {files.map(file => (
            <option key={file.id} value={file.id} style={{ background: '#1a1a1a', color: '#e6edf3' }}>
              {file.filename}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[#8b949e] text-xs">▾</span>
      </div>
    </div>
  )
}

export default MobileFilePicker
