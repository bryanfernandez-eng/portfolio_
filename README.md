# Bryan Fernandez - Portfolio

Live site: https://bryanfernandez.dev/

A personal portfolio built with React 19 and Vite. The landing page is an interactive SVG room drawn in code with its own perspective math and ball physics. Everything below it is plain, content-driven React.

## Features

- Interactive hero room: hover the basketball to dribble it, move too fast and you lose it. Click, or click and hold for the shot meter, to shoot from anywhere
- The room reacts: the cat and developer watch the ball, made shots flash "BUILD PASSED", and the lamp toggles the room light
- Live details in the room: GitHub contribution heatmap on the side monitor, real Miami weather in the window, a wall clock showing the visitor's local time, and a sky that follows their time of day
- Resume paper on the desk: hover for a preview, click to open the resume in a new tab
- Projects with hover previews, an experience section with animated illustrations, and contour-map backgrounds
- Contact panel that slides up with a paper plane and sends through EmailJS
- Elevator-themed 404 page
- Idle freeze: animations pause after 10 seconds without input and while off screen, so the page stays light
- Respects `prefers-reduced-motion`

## Setup

```
npm install
cp .env.example .env
npm run dev
```

The dev server runs on http://localhost:5173/.

The contact form needs EmailJS keys in `.env`:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

The EmailJS template should use `{{email}}` for the sender's address. Never commit `.env`.

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
  services/     External calls (EmailJS, GitHub contributions, weather)
  utils/        Pure helpers (scene, physics, contour maps)
public/         Static files: project images, resume and its preview, 404 page, CNAME
```

All content lives in `src/data/`. To add a project, job, or link, edit the matching JSON file only.

## External services

The browser calls these directly, with no keys and results cached locally:

- GitHub contribution graph through `github-contributions-api.jogruber.de`, for the monitor heatmap
- Open-Meteo, for the weather in the window

If either is unreachable, the room simply shows its default state.

## Deployment

The site is published to GitHub Pages from the `gh-pages` branch with `npm run deploy`, and the custom domain is set by `public/CNAME`. Work happens on `dev` and is merged into `main` before deploying.

Local design prototypes live in `prototypes/`, which is git-ignored.
