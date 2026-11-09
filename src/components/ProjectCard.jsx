import { PROJECT_LABELS } from '../data'

const LINK_ENTRIES = Object.entries(PROJECT_LABELS.links)

function ProjectCard({ project }) {
  const { number, name, description, stack, image, imageWidth, imageHeight } = project
  const links = LINK_ENTRIES.filter(([key]) => project[key])

  return (
    <article>
      <h3>{number}. {name}</h3>
      {image && (
        <img
          src={image}
          alt={`${name} screenshot`}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
        />
      )}
      <p>{description}</p>
      <p>{PROJECT_LABELS.stack}: {stack.join(', ')}</p>
      {links.length > 0 && (
        <ul>
          {links.map(([key, label]) => (
            <li key={key}>
              <a href={project[key]} target="_blank" rel="noopener noreferrer">{label}</a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default ProjectCard
