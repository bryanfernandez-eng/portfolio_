# Bryan Fernandez - Portfolio

Live site: https://bryanfernandez.dev/

## Setup

```
npm install
cp .env.example .env
npm run dev
```

Fill in `.env` with the EmailJS keys used by the contact form. The dev server runs on http://localhost:5173/.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and publish to GitHub Pages |

## Structure

```
src/
  data/         Content as JSON, exported through index.js
  sections/     Page sections composed in App.jsx
  components/   Reusable components
  hooks/        Custom hooks
  services/     External integrations (email)
```

All content lives in `src/data/`. To add a project, job, or link, edit the matching JSON file only.
