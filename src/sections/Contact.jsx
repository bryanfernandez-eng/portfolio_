import ContourBackground from '../components/ContourBackground'
import { PROFILE, SOCIAL_LINKS, LOCATION } from '../data'
import './Contact.css'

const [EMAIL_USER, EMAIL_DOMAIN] = PROFILE.email.split('@')

function Contact() {
  return (
    <div className="end topo-host">
      <ContourBackground seed={900} />
      <section className="contact" id="contact">
        <a className="mail wide" href={`mailto:${PROFILE.email}`}>
          {EMAIL_USER}
          <wbr />@{EMAIL_DOMAIN}
        </a>
        <div className="links">
          {SOCIAL_LINKS.map(({ id, label, href }) => <a key={id} href={href}>{label}</a>)}
        </div>
      </section>
      <footer className="site-footer">
        <span>{PROFILE.name}</span>
        <span>{LOCATION}</span>
      </footer>
    </div>
  )
}

export default Contact
