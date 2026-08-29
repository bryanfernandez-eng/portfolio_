import { COLORS } from '../../constants/colors'
import { ArrowRightIcon } from './icons'

const BUTTON_LABELS = { sending: 'Sending...', sent: 'Sent ✓' }

function handleMouseEnter(e) {
  e.currentTarget.style.boxShadow = `2px 2px 0 ${COLORS.accentGreen}`
  e.currentTarget.style.transform = 'translate(2px,2px)'
}

function handleMouseLeave(e) {
  e.currentTarget.style.boxShadow = `4px 4px 0 ${COLORS.accentGreen}`
  e.currentTarget.style.transform = 'translate(0,0)'
}

function SendButton({ isReady, status }) {
  return (
    <button
      type="submit"
      disabled={!isReady}
      className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 font-mono text-xs md:text-sm font-bold transition-all duration-100"
      style={{
        background:   isReady ? COLORS.accentYellow : 'transparent',
        color:        isReady ? COLORS.dark : COLORS.mutedText,
        border:       '2px solid',
        borderColor:  isReady ? COLORS.dark : COLORS.dimText,
        borderRadius: '4px',
        boxShadow:    isReady ? `4px 4px 0 ${COLORS.accentGreen}` : 'none',
        cursor:       isReady ? 'pointer' : 'not-allowed',
      }}
      onMouseEnter={isReady ? handleMouseEnter : undefined}
      onMouseLeave={isReady ? handleMouseLeave : undefined}
    >
      {BUTTON_LABELS[status] ?? 'Send message'}
      <ArrowRightIcon />
    </button>
  )
}

export default SendButton
