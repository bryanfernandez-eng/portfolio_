import ContourBackground from '../components/ContourBackground'
import { PROFILE, ABOUT_FACTS, SECTION_LABELS } from '../data'
import './About.css'

function About() {
  return (
    <section className="about topo-host" id="about">
      <ContourBackground seed={0} />
      <h2 className="section-label">{SECTION_LABELS.about}</h2>
      <div>
        <p>{PROFILE.bio}</p>
        <dl>
          {ABOUT_FACTS.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
