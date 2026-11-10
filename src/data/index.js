import profile from './profile.json'
import sections from './sections.json'
import projects from './projects.json'
import experience from './experience.json'
import social from './social.json'
import contact from './contact.json'
import stats from './stats.json'

const factValue = label => profile.facts.find(fact => fact.label === label).value
const pad = count => String(count).padStart(2, '0')

export const PROFILE = profile
export const SOCIAL_LINKS = social
export const CONTACT = contact
export const GITHUB_USER = stats.githubUser
export const HOME_COORDS = stats.home
export const RESUME = { ...stats.resume, href: social.find(link => link.id === 'resume').href }
export const RESUME_PREVIEW = { image: stats.resume.preview, name: stats.resume.previewLabel }
export const PROJECTS = projects.items
export const EXPERIENCE = experience

export const SECTION_LABELS = Object.fromEntries(sections.map(({ id, label }) => [id, label]))
export const ABOUT_FACTS = profile.facts
export const LOCATION = factValue('location')
export const HERO_LINES = [profile.title, LOCATION, profile.graduation, factValue('now')]
export const WORK_HEADING = `${SECTION_LABELS.work} / ${pad(projects.items.length)}`
