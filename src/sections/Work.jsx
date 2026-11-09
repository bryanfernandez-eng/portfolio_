import { useState } from 'react'
import ProjectPreview from '../components/ProjectPreview'
import WorkRow from '../components/WorkRow'
import { classNames } from '../utils/classNames'
import { PROJECTS, WORK_HEADING } from '../data'
import './Work.css'

function Work() {
  const [preview, setPreview] = useState({ id: null, isOn: false })
  const handleShow = id => setPreview({ id, isOn: true })
  const handleHide = () => setPreview(current => ({ ...current, isOn: false }))
  const previewed = PROJECTS.find(project => project.id === preview.id)

  return (
    <section id="work">
      <h2 className="section-label padded">{WORK_HEADING}</h2>
      <ul className={classNames('work', preview.isOn && 'peek')}>
        {PROJECTS.map(project => (
          <WorkRow
            key={project.id}
            project={project}
            isActive={preview.isOn && preview.id === project.id}
            onShow={handleShow}
            onHide={handleHide}
          />
        ))}
      </ul>
      <ProjectPreview project={previewed} isOn={preview.isOn} />
    </section>
  )
}

export default Work
