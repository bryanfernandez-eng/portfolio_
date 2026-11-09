function ExperienceItem({ item }) {
  const { company, role, period, bullets } = item

  return (
    <article>
      <h3>{role} - {company}</h3>
      <p>{period}</p>
      <ul>
        {bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
      </ul>
    </article>
  )
}

export default ExperienceItem
