import Section from '../components/Section'
import ExperienceItem from '../components/ExperienceItem'

function Timeline({ id, items }) {
  return (
    <Section id={id}>
      {items.map(item => <ExperienceItem key={item.id} item={item} />)}
    </Section>
  )
}

export default Timeline
