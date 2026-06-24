import { COLORS } from '../../constants/colors'

function WindowChrome({ title, onClose, rightLabel }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b shrink-0" style={{ borderColor: COLORS.border, background: COLORS.surfaceAlt }}>
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      <span className="font-mono text-xs ml-3" style={{ color: COLORS.mutedText }}>{title}</span>
      {rightLabel && (
        <span className="font-mono text-xs ml-auto hidden sm:block" style={{ color: COLORS.dimText }}>{rightLabel}</span>
      )}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="ml-auto transition-colors duration-150"
          style={{ color: COLORS.mutedText }}
          onMouseEnter={e => { e.currentTarget.style.color = COLORS.primaryText }}
          onMouseLeave={e => { e.currentTarget.style.color = COLORS.mutedText }}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default WindowChrome
