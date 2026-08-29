import FileDot from './FileDot'
import { opaquifyColor } from '../../utils/colors'
import { COLORS } from '../../constants/colors'

function handleSelectFocus(e) { e.currentTarget.style.boxShadow = `0 1px 0 0 ${COLORS.primaryText}` }
function handleSelectBlur(e) { e.currentTarget.style.boxShadow = 'none' }

function MobileFilePicker({ files, activeId, onSelect }) {
  const active = files.find(f => f.id === activeId)
  const dotColor = active ? opaquifyColor(active.color) : COLORS.mutedText

  return (
    <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: COLORS.border }}>
      <FileDot color={dotColor} />
      <div className="relative flex-1">
        <select
          value={activeId ?? ''}
          onChange={e => onSelect(e.target.value)}
          onFocus={handleSelectFocus}
          onBlur={handleSelectBlur}
          className="w-full appearance-none bg-transparent font-mono text-xs outline-none cursor-pointer pr-5"
          style={{ color: COLORS.primaryText }}
        >
          {files.map(file => (
            <option key={file.id} value={file.id} style={{ background: COLORS.surfaceAlt, color: COLORS.primaryText }}>
              {file.filename}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs" style={{ color: COLORS.mutedText }}>▾</span>
      </div>
    </div>
  )
}

export default MobileFilePicker
