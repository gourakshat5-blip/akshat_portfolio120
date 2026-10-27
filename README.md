# Akshat Gour — Cinematic Portfolio

React 19 + Vite. A hero screen, a "Simple View" quick profile, and a cinematic horror-house walkthrough with four rooms (Iron Man → Ultron → Doctor Strange → Thanos).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint
```

## Where to edit things

| What | File |
| --- | --- |
| Name, about, education, skills, projects, certificate, resume, contact, social links | `src/data/portfolio.js` |
| Which video plays where (clip names, room frames) | `src/data/scenes.js` |
| Room layouts and widgets | `src/components/Rooms.jsx`, `Rooms.css` |
| House/video state machine (transitions, skip, keyboard) | `src/components/SkillHome.jsx` |
| Hero + global theme tokens | `src/App.jsx`, `src/App.css` |

**To add GitHub:** set `contact.github` in `src/data/portfolio.js`. While it is empty, GitHub links are hidden (no dead links).

## Controls

Mouse/touch buttons, plus keyboard: `→` next room, `←` or `Esc` back, `Tab`/`Enter` everywhere. Dialogs close with `Esc`. "Skip ›" appears during travel clips.

## Media

Videos are H.264 1080p with `faststart`. The four 4K/oversized clips were re-encoded (about 145 MB → 15 MB) at the same duration and look. `source-assets/` holds an unused original clip; it is not deployed.
Documents live in `public/documents/` — `react-certificate.jpg` is untouched; `resume-preview.jpg` is rendered from the PDF.

## Before you deploy

- Set absolute URLs for `og:image` / `twitter:image` in `index.html` once you know your domain.
- Google Fonts load from the web; the site falls back to Georgia/system fonts offline.
