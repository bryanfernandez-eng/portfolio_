import { GitHubIcon, LinkedInIcon, ResumeIcon } from '../components/ui/icons'

export const SOCIAL_ICONS = {
  linkedin: (size) => <LinkedInIcon size={size} />,
  github:   (size) => <GitHubIcon size={size} />,
  resume:   (size) => <ResumeIcon size={size} />,
}
