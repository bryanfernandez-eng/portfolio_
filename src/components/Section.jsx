import { SECTION_LABELS } from '../data'

function Section({ id, children }) {
  const titleId = `${id}-title`

  return (
    <section id={id} aria-labelledby={titleId}>
      <h2 id={titleId}>{SECTION_LABELS[id]}</h2>
      {children}
    </section>
  )
}

export default Section
