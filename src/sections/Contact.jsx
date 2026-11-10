import ContactPanel from '../components/ContactPanel'
import ContourBackground from '../components/ContourBackground'
import { CONTACT, PROFILE, SOCIAL_LINKS, LOCATION } from '../data'
import { useSlideDialog } from '../hooks/useSlideDialog'
import './Contact.css'

const [EMAIL_USER, EMAIL_DOMAIN] = PROFILE.email.split('@')

function Contact() {
  const { dialogRef, isOpen, isShown, open, close } = useSlideDialog()

  return (
    <div className="end topo-host">
      <ContourBackground seed={900} />
      <section className="contact" id="contact">
        <a className="mail wide" href={`mailto:${PROFILE.email}`}>
          {EMAIL_USER}
          <wbr />@{EMAIL_DOMAIN}
        </a>
        <div className="links">
          {SOCIAL_LINKS.map(({ id, label, href }) => <a key={id} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
          <button className="note-button" type="button" onClick={open}>{CONTACT.openLabel}</button>
        </div>
      </section>
      <footer className="site-footer">
        <span>{PROFILE.name}</span>
        <span>{LOCATION}</span>
      </footer>
      <ContactPanel dialogRef={dialogRef} isOpen={isOpen} isShown={isShown} onClose={close} />
    </div>
  )
}

export default Contact