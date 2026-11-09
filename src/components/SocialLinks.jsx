import { PROFILE, SOCIAL_LINKS } from '../data'

function SocialLinks() {
  return (
    <ul>
      <li><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
      {SOCIAL_LINKS.map(({ id, label, href }) => (
        <li key={id}>
          <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
