import { GITHUB_USER } from '../data'

const OWN_REPO_PREFIX = `https://github.com/${GITHUB_USER}/`

function linkStatus({ live, github }) {
  if (live) return { kind: 'live', label: 'live site ↗' }
  if (github) return { kind: 'code', label: github.startsWith(OWN_REPO_PREFIX) ? 'code ↗' : 'team repo ↗' }
  return { kind: 'none', label: 'no public link' }
}

function ProjectFrame({ project }) {
  const { name, summary, shortStack, image, imageWidth, imageHeight, live, github } = project
  const href = live || github
  const status = linkStatus(project)

  return (
    <li className="frame">
      <div className="frame-shot">
        <img src={image} width={imageWidth} height={imageHeight} alt={`${name} screenshot`} loading="lazy" decoding="async" />
      </div>
      <div className="frame-head">
        <h3 className="frame-name">
          {href ? <a href={href} target="_blank" rel="noreferrer">{name}</a> : name}
        </h3>
        <span className={`frame-status ${status.kind}`}>{status.label}</span>
      </div>
      <p className="frame-desc">{summary}</p>
      <p className="frame-stack">{shortStack.join(' / ')}</p>
    </li>
  )
}

export default ProjectFrame
