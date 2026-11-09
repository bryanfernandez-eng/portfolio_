import { PROFILE, LANDING_HIGHLIGHTS } from '../data'

function Landing() {
  return (
    <section aria-label="Introduction">
      <h1>{PROFILE.name}</h1>
      <ul>
        {LANDING_HIGHLIGHTS.map(highlight => <li key={highlight}>{highlight}</li>)}
      </ul>
    </section>
  )
}

export default Landing
