import { classNames } from '../utils/classNames'
import './ProjectPreview.css'

function ProjectPreview({ project, isOn, isPortrait = false }) {
  return (
    <div className={classNames('project-preview', isOn && 'on', isPortrait && 'portrait')} aria-hidden="true">
      <img src={project?.image} alt="" />
      <span>{project?.name}</span>
    </div>
  )
}

export default ProjectPreview
