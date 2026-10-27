Akshat Gour — Cinematic Portfolio
A cinematic, interactive portfolio built with React 19 and Vite. It introduces Akshat Gour as a frontend developer and includes a quick profile view, project details, skills, education, certificate, and resume.
Live Demo
- Live website: Add your deployed website URL here.
- GitHub: https://github.com/gourakshat5-blip
- LinkedIn: https://www.linkedin.com/in/akshatgour76/
Features
- Cinematic landing screen with video backgrounds
- Interactive house walkthrough with four themed rooms:
  - Iron Man
  - Ultron
  - Doctor Strange
  - Thanos
- Simple View for a quick profile summary
- Skills, education, and project information
- Resume preview and PDF link
- React JS certificate display
- Responsive layout for desktop and mobile
- Keyboard and touch-friendly navigation
Tech Stack
- React 19
- Vite
- JavaScript (ES modules)
- CSS
- Oxlint
Run Locally
Requirements
- Node.js (a current LTS version is recommended)
- npm
Install dependencies
npm install
Start the development server
npm run dev
Open the local URL printed in the terminal (usually http://localhost:5173).
Create a production build
npm run build
Vite generates the production-ready site in the dist/ directory.
Preview the production build
npm run preview
Run lint checks
npm run lint
Project Structure
.
├── public/
│   ├── documents/       # Resume and certificate files
│   ├── images/          # Posters and room images
│   └── videos/          # Hero, room, and transition videos
├── src/
│   ├── components/      # Portfolio views and room components
│   ├── context/         # Shared UI context
│   ├── data/
│   │   ├── portfolio.js # Profile, skills, projects, contact links
│   │   └── scenes.js    # Room and video scene configuration
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
Customize the Portfolio
Most of the profile content is maintained in src/data/portfolio.js. Update the profile, education, skills, projects, certificate, resume, and social links there.

Video and room scene configuration is maintained in src/data/scenes.js. The main UI and room layouts are in src/App.jsx and src/components/.

To show a GitHub link in the portfolio UI, set the github field in src/data/portfolio.js to your profile URL.
Deploy
This project can be deployed to a static hosting platform such as Vercel or Cloudflare Pages.

For a Vite deployment, use:
- Build command: npm run build
- Output directory: dist
Make sure the latest code is pushed to your GitHub repository before importing it into your hosting provider.
