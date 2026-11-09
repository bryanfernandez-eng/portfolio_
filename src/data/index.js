import profile from './profile.json'
import sections from './sections.json'
import projects from './projects.json'
import experience from './experience.json'
import social from './social.json'
import contact from './contact.json'

export const PROFILE = profile
export const SECTIONS = sections
export const SOCIAL_LINKS = social
export const CONTACT = contact
export const PROJECTS = projects.items
export const EXPERIENCE = experience.experience
export const EDUCATION = experience.education
export const PROJECT_LABELS = { stack: projects.stackLabel, links: projects.links }

export const SECTION_LABELS = Object.fromEntries(sections.map(({ id, label }) => [id, label]))
export const LANDING_HIGHLIGHTS = [...profile.highlights, profile.currentRole]
export const ABOUT_FACTS = [...profile.facts, { label: 'currently', value: profile.currentRole }]
