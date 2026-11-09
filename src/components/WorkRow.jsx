import { classNames } from '../utils/classNames'

function WorkRow({ project, isActive, onShow, onHide }) {
  const { id, name, summary, shortStack, image, imageWidth, imageHeight, github } = project
  const handleShow = () => onShow(id)

  return (
    <li className={classNames('work-row', isActive && 'on')}>
      <a
        className="work-title wide"
        href={github || '#'}
        onMouseEnter={handleShow}
        onMouseLeave={onHide}
        onFocus={handleShow}
        onBlur={onHide}
      >
        {name}
      </a>
      <span className="work-stack">
        {shortStack.map(line => <span key={line}>{line}</span>)}
      </span>
      <p className="work-desc">{summary}</p>
      <img
        className="work-thumb"
        src={image}
        width={imageWidth}
        height={imageHeight}
        alt={`${name} screenshot`}
        loading="lazy"
        decoding="async"
      />
    </li>
  )
}

export default WorkRow
