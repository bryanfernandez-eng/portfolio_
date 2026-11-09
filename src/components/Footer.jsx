import { PROFILE } from '../data'
import SocialLinks from './SocialLinks'

function Footer() {
  return (
    <footer>
      <p>{PROFILE.name}</p>
      <SocialLinks />
    </footer>
  )
}

export default Footer
