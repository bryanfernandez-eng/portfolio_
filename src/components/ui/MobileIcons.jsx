import { SOCIAL_LINKS } from '../../constants/social'
import { SOCIAL_ICONS } from '../../constants/socialIcons'
import { EmailIcon } from './icons'

function MobileIcons() {
  return (
    <div className="flex sm:hidden gap-3">
      <a href="mailto:dev.bryanfernandez@gmail.com" aria-label="Email"
        className="inline-flex items-center justify-center text-[#e6edf3] hover:text-white transition-colors duration-150"
      >
        <EmailIcon size={16} />
      </a>
      {SOCIAL_LINKS.map(link => (
        <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
          className="inline-flex items-center justify-center text-[#e6edf3] hover:text-white transition-colors duration-150"
        >
          {SOCIAL_ICONS[link.id](15)}
        </a>
      ))}
    </div>
  )
}

export default MobileIcons
