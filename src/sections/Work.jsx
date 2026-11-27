import ProjectFrame from '../components/ProjectFrame'
import { PROJECTS, WORK_HEADING } from '../data'
import './Work.css'

function Work() {
  return (
    <section className="work" id="work">
      <div className="work-head">
        <h2 className="section-label">{WORK_HEADING}</h2>
        <p className="work-legend">
          <span className="frame-status live">live site</span>
          <span className="frame-status code">code</span>
          <span className="frame-status none">no public link</span>
        </p>
      </div>
      <ul className="sheet">
        {PROJECTS.map(project => <ProjectFrame key={project.id} project={project} />)}
      </ul>
    </section>
  )
}

export default Work
