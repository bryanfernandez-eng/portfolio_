import { SOCIAL_LINKS } from '../constants/social'
import { GitHubIcon, LinkedInIcon, ResumeIcon } from './ui/icons'

const NAV_ICONS = {
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
  resume: <ResumeIcon />,
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-8 py-4 font-mono">
      <ul className="flex items-center gap-5">
        {SOCIAL_LINKS.map(({ id, label, href }) => (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-white hover:text-[#39d353] transition-colors"
            >
              {NAV_ICONS[id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
