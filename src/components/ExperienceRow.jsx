import HighlightedText from './HighlightedText'
import RoleIllustration from './RoleIllustration'

function ExperienceRow({ item }) {
  const { company, role, period, detail, illustration } = item
  return (
    <li className="xp-row">
      <i className="node" aria-hidden="true" />
      <h3 className="xp-name">{company}</h3>
      <span className="xp-role">{role}</span>
      <span className="xp-when">{period}</span>
      <p className="xp-detail">
        <HighlightedText segments={detail} />
      </p>
      <RoleIllustration id={illustration} />
    </li>
  )
}

export default ExperienceRow
