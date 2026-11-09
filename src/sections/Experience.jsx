import { useRef } from 'react'
import ExperienceRow from '../components/ExperienceRow'
import { useExperienceRail } from '../hooks/useExperienceRail'
import { EXPERIENCE, SECTION_LABELS } from '../data'
import './Experience.css'

function Experience() {
  const listRef = useRef(null)
  useExperienceRail(listRef)

  return (
    <section className="xp" id="experience">
      <h2 className="section-label padded">{SECTION_LABELS.experience}</h2>
      <ul className="xp-list" ref={listRef}>
        {EXPERIENCE.map(item => <ExperienceRow key={item.id} item={item} />)}
      </ul>
    </section>
  )
}

export default Experience
