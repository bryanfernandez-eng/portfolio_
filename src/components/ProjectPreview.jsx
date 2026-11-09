import { classNames } from '../utils/classNames'
import './ProjectPreview.css'

function ProjectPreview({ project, isOn }) {
  return (
    <div className={classNames('project-preview', isOn && 'on')} aria-hidden="true">
      <img src={project?.image} alt="" />
      <span>{project?.name}</span>
    </div>
  )
}

export default ProjectPreview
