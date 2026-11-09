import { PROFILE, ABOUT_FACTS } from '../data'
import Section from '../components/Section'

function About() {
  return (
    <Section id="about">
      <p>{PROFILE.bio}</p>
      <dl>
        {ABOUT_FACTS.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export default About
