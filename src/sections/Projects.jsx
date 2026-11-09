import { PROJECTS } from '../data'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  return (
    <Section id="projects">
      {PROJECTS.map(project => <ProjectCard key={project.id} project={project} />)}
    </Section>
  )
}

export default Projects
