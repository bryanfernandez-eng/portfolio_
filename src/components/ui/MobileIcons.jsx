import { SOCIAL_LINKS } from '../../constants/social'
import { SOCIAL_ICONS } from '../../constants/socialIcons'
import { EmailIcon } from './icons'
import { COLORS } from '../../constants/colors'

function handleIconEnter(e) { e.currentTarget.style.color = COLORS.white }
function handleIconLeave(e) { e.currentTarget.style.color = COLORS.primaryText }

function MobileIcons() {
  return (
    <div className="flex sm:hidden gap-3">
      <a href="mailto:dev.bryanfernandez@gmail.com" aria-label="Email"
        className="inline-flex items-center justify-center transition-colors duration-150"
        style={{ color: COLORS.primaryText }}
        onMouseEnter={handleIconEnter}
        onMouseLeave={handleIconLeave}
      >
        <EmailIcon size={16} />
      </a>
      {SOCIAL_LINKS.map(link => (
        <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
          className="inline-flex items-center justify-center transition-colors duration-150"
          style={{ color: COLORS.primaryText }}
          onMouseEnter={handleIconEnter}
          onMouseLeave={handleIconLeave}
        >
          {SOCIAL_ICONS[link.id](15)}
        </a>
      ))}
    </div>
  )
}

export default MobileIcons
