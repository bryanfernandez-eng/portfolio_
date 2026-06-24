import { SOCIAL_LINKS } from '../constants/social'
import { SOCIAL_ICONS } from '../constants/socialIcons'
import { EmailIcon } from './ui/icons'
import useLocalMouse from '../hooks/useLocalMouse'

const CURSOR_SIZE = 120

function Footer() {
  const { pos, isInside, handleMouseMove, handleMouseEnter, handleMouseLeave } = useLocalMouse()

  return (
    <footer
      className="relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Invert circle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: pos.x - CURSOR_SIZE / 2,
          top: pos.y - CURSOR_SIZE / 2,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: '50%',
          background: '#fff',
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
            WebkitTextStroke: '1.5px #e8eaed',
          }}
        >
          Bryan Fernandez
        </h2>

        <div className="flex md:flex-col flex-row items-center gap-4 mt-4 md:mt-0 md:pr-2">
          <a
            href="mailto:dev.bryanfernandez@gmail.com"
            aria-label="Email"
            className="text-[#8b949e] hover:text-[#39d353] transition-colors duration-200"
          >
            <EmailIcon size={20} />
          </a>
          {SOCIAL_LINKS.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[#8b949e] hover:text-[#39d353] transition-colors duration-200"
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
