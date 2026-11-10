import ContourBackground from '../components/ContourBackground'
import { PROFILE, ABOUT_FACTS, SECTION_LABELS, COORDINATES } from '../data'
import './About.css'

function About() {
  return (
    <section className="about topo-host" id="about">
      <ContourBackground seed={0} />
      <div className="sheet">
        <h2 className="section-label">{SECTION_LABELS.about}</h2>
        <p className="coords">{COORDINATES}</p>
      </div>
      <div>
        <p className="bio">
          {PROFILE.bio.map(({ text, isHighlight }) => (isHighlight ? <mark key={text}>{text}</mark> : text))}
        </p>
        <dl className="route">
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
