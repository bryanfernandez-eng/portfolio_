import { SOCIAL_LINKS } from '../constants/social'
import { SOCIAL_ICONS } from '../constants/socialIcons'
import { EmailIcon } from './ui/icons'
import useLocalMouse from '../hooks/useLocalMouse'
import { COLORS } from '../constants/colors'

const CURSOR_SIZE = 120

function handleLinkEnter(e) { e.currentTarget.style.color = COLORS.accentGreen }
function handleLinkLeave(e) { e.currentTarget.style.color = COLORS.mutedText }

function Footer() {
  const { pos, isInside, handleMouseMove, handleMouseEnter, handleMouseLeave } = useLocalMouse()

  return (
    <footer
      className="relative overflow-hidden cursor-none"
      style={{ background: COLORS.surfaceDark }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: pos.x - CURSOR_SIZE / 2,
          top: pos.y - CURSOR_SIZE / 2,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: '50%',
          background: COLORS.white,
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          opacity: isInside ? 1 : 0,
          transition: 'opacity 0.2s ease',
          zIndex: 10,
        }}
      />

      <div className="relative flex flex-col items-center md:flex-row md:items-center md:justify-between pt-4 pb-6 px-6 md:px-8">
        <h2
          className="font-bold leading-none tracking-tight select-none"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(0.8rem, 9.4vw, 25rem)',
            color: 'transparent',
            WebkitTextStroke: `1.5px ${COLORS.lightGray}`,
          }}
        >
          Bryan Fernandez
        </h2>

        <div className="flex md:flex-col flex-row items-center gap-4 mt-4 md:mt-0 md:pr-2">
          <a
            href="mailto:dev.bryanfernandez@gmail.com"
            aria-label="Email"
            className="transition-colors duration-200"
            style={{ color: COLORS.mutedText }}
            onMouseEnter={handleLinkEnter}
            onMouseLeave={handleLinkLeave}
          >
            <EmailIcon size={20} />
          </a>
          {SOCIAL_LINKS.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: COLORS.mutedText }}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              {SOCIAL_ICONS[id](20)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
