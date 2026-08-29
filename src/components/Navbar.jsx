import { SOCIAL_LINKS } from '../constants/social'
import { SOCIAL_ICONS } from '../constants/socialIcons'
import { HomeIcon, EmailIcon } from './ui/icons'
import { useActiveSection } from '../hooks/useActiveSection'
import { COLORS } from '../constants/colors'

const LIGHT_SECTIONS = ['projects', 'contact']
const SECTION_IDS = ['projects', 'experience', 'contact']

function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  const isDark = LIGHT_SECTIONS.includes(active)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[clamp(1.5rem,5vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] font-mono transition-colors duration-300"
      style={{ background: isDark ? COLORS.surfaceDark : 'transparent' }}
    >
      <a href="#" aria-label="Home" className="text-white hover:text-[#39d353] transition-colors">
        <HomeIcon />
      </a>

      <ul className="flex items-center gap-5">
        {SOCIAL_LINKS.map(({ id, label, href }) => (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#39d353] transition-colors"
            >
              {SOCIAL_ICONS[id]()}
            </a>
          </li>
        ))}
        <li>
          <a
            href="mailto:dev.bryanfernandez@gmail.com"
            aria-label="Email"
            className="text-white hover:text-[#39d353] transition-colors"
          >
            <EmailIcon size={18} />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
