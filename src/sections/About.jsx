import { Fragment } from 'react'
import ContourBackground from '../components/ContourBackground'
import { PROFILE, SECTION_LABELS, COORDINATES } from '../data'
import './About.css'

const NOTES = PROFILE.about.sentence.filter(({ note }) => note).map((segment, i) => ({ ...segment, number: i + 1 }))
const SEGMENTS = PROFILE.about.sentence.map(segment => NOTES.find(({ text }) => text === segment.text) ?? segment)

function About() {
  return (
    <section className="about topo-host" id="about">
      <ContourBackground seed={0} />
      <h2 className="section-label">{SECTION_LABELS.about}</h2>
      <p className="about-sentence">
        {SEGMENTS.map(({ text, number }) => (
          <Fragment key={text}>
            {text}
            {number && (
              <sup>
                <a href={`#about-note-${number}`} aria-label={`Note ${number}`}>{number}</a>
              </sup>
            )}
          </Fragment>
        ))}
      </p>
      <p className="about-aside">{PROFILE.about.aside}</p>
      <aside className="about-notes">
        <ol>
          {NOTES.map(({ note, number }) => (
            <li key={number} id={`about-note-${number}`}>
              <span className="num">{number}</span>
              <span>{note}</span>
            </li>
          ))}
        </ol>
        <p className="coords">{COORDINATES}</p>
      </aside>
    </section>
  )
}

export default About
