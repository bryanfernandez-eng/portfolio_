import { CONTACT } from '../data'
import Section from '../components/Section'
import SocialLinks from '../components/SocialLinks'
import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <Section id="contact">
      <p>{CONTACT.intro}</p>
      <SocialLinks />
      <ContactForm />
    </Section>
  )
}

export default Contact
