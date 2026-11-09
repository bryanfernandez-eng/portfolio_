import { SECTIONS } from '../data'

function Navbar() {
  return (
    <nav aria-label="Main">
      <ul>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}><a href={`#${id}`}>{label}</a></li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
