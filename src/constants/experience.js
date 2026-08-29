import { COLORS } from './colors'

export const EXPERIENCE = [
  {
    id: 'exp-0',
    hash: 'f2a1b34',
    color: COLORS.colorGreen,
    company: 'Assurant',
    role: 'Software Engineer Intern',
    period: 'June 2026 – Present',
    bullets: [
      'Onboarded Kyriba into an enterprise multi-vendor .NET payment gateway across 6 environments with a typed C# settings model resolved from Azure Key Vault via managed identity.',
      'Reduced OAuth2 token round-trips by 95%+ with a client-credentials auth layer using distributed caching and refresh-before-expiry, backed by 9 unit tests.',
      'Enabled automated ACH/wire disbursements by architecting idempotent bank-account tokenization with deterministic reference codes and 409-conflict recovery, backed by 20 unit tests.',
    ],
  },
  {
    id: 'exp-1',
    hash: 'a3f9c12',
    color: COLORS.colorGreen,
    company: 'FEAM Aero',
    role: 'Software Engineer (Co-op)',
    period: 'August 2025 – Present',
    bullets: [
      'Improved workflow efficiency by 30% for 1,500+ employees building billing modules in React/JavaScript.',
      'Cut search latency from 20+ seconds to 3 seconds replacing a legacy .NET/C# platform with React + Flask.',
      'Increased deployment frequency from bi-weekly to every 3 days with CI/CD pipelines in Azure DevOps.',
      'Eliminated recurring SQL incidents by shipping a CRUD customer management tool in C#/.NET + React.',
    ],
  },
  {
    id: 'exp-2',
    hash: 'b7e2d45',
    color: COLORS.colorGreen,
    company: 'FEAM Aero',
    role: 'Software Engineer Intern',
    period: 'May 2025 – August 2025',
    bullets: [
      'Reduced mechanic work order processing from 2+ hours to under 5 minutes with a React + Flask + SQL system.',
      'Cut load time from 5 seconds to under 1 second with real-time search and validation in React.',
      'Automated PDF billing generation, cutting document processing from minutes to 20 seconds.',
    ],
  },
  {
    id: 'exp-3',
    hash: 'c9d1e78',
    color: COLORS.colorPurple,
    company: 'INIT FIU',
    role: 'Director of Technology',
    period: 'January 2026 – Present',
    bullets: [
      'Shipped a Notion-embedded content system for ShellHacks 2026 serving 1,400+ annual participants.',
      'Built a per-user rate limiter in Go/Chi to cap S3 uploads and prevent spam-driven cost spikes.',
      'Converted 20+ attendees into club members across 10+ recruiting events.',
    ],
  },
]

export const EDUCATION = [
  {
    id: 'edu-1',
    hash: 'c4a8f91',
    color: COLORS.colorPink,
    company: 'FIU',
    role: 'B.S. Computer Science, Minor in Math',
    period: 'August 2024 – Expected December 2026',
    bullets: [
      'GPA: 4.0 - Florida International University, Miami, FL.',
      'Coursework: Data Structures, Algorithms, Database Systems, AI, Machine Learning.',
      'Organizations: INIT, BreakThrough Tech, CodePath E3, Color Stack, SHPE.',
    ],
  },
  {
    id: 'edu-2',
    hash: 'd5b3e02',
    color: COLORS.colorBlue,
    company: 'MDC',
    role: "A.S. Computer Science",
    period: 'June 2022 – June 2024',
    bullets: [
      'Miami Dade College, Miami, FL.',
      'Completed foundational coursework before transferring to FIU.',
    ],
  },
]
