// Single source of truth for everything shown on the site.
// Every fact here comes from Akshat's resume, certificate or LinkedIn project.
// Edit this file to update the portfolio — no component changes needed.

export const profile = {
  name: 'Akshat Gour',
  role: 'Frontend Developer',
  level: 'Fresher',
  location: 'Indore, Madhya Pradesh',
  tagline: 'Building clean, responsive and interactive web interfaces.',
  about:
    'Motivated frontend developer fresher building a foundation in responsive web development and interactive user interfaces. Learning by building, with an interest in clean, user-friendly design.',
  summary:
    'BSc student and aspiring frontend developer, learning by building responsive, interactive web interfaces.',
  status: 'Open to entry-level frontend opportunities',
  stats: [
    { label: 'Role', value: 'Frontend Dev' },
    { label: 'Level', value: 'Fresher' },
    { label: 'Focus', value: 'React UI' },
  ],
}

export const education = {
  degree: 'Bachelor of Science (BSc)',
  stage: '3rd Year — currently pursuing',
  institute: 'LBS College, Harda, Madhya Pradesh',
  short: 'BSc · 3rd Year',
}

// Ordered from the foundation up, so the skill map reads as "how the stack builds".
export const stackLayers = [
  { layer: 'Structure', items: ['HTML5'] },
  { layer: 'Style', items: ['CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { layer: 'Logic', items: ['JavaScript (ES6+)'] },
  { layer: 'UI library', items: ['React.js'] },
]

export const concepts = [
  'Responsive design',
  'React components',
  'Props & state',
  'Basic routing',
  'UI interactions',
]

export const projects = [
  {
    id: 'calculator',
    title: 'Calculator App',
    summary: 'Frontend calculator with a clear interface and interactive calculations.',
    details:
      'A frontend calculator project demonstrating interface layout and interactive calculation functionality. The project is shared on LinkedIn.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    href: 'https://www.linkedin.com/in/akshatgour76/',
    hrefLabel: 'View on LinkedIn',
  },
  {
    id: 'portfolio',
    title: 'Cinematic 3D Portfolio',
    summary: 'The site you are exploring right now.',
    details:
      'An immersive portfolio with cinematic video transitions and room-by-room navigation, built with React and Vite.',
    stack: ['React', 'Vite', 'CSS'],
    href: null,
    hrefLabel: null,
  },
]

export const certificate = {
  title: 'React JS Certification',
  issuer: 'Infoviaan Technologies, Indore',
  year: '2025',
  training: '14 May 2025 – 19 September 2025',
  dated: '20 September 2025',
  grade: 'First (A) grade',
  image: '/documents/react-certificate.jpg',
  width: 1072,
  height: 1467,
  alt: 'React JS certificate from Infoviaan Technologies, Indore, awarded to Akshat Gour and dated 20 September 2025',
}

export const resume = {
  pdf: '/documents/Akshat_Gour_Resume.pdf',
  preview: '/documents/resume-preview.jpg',
  previewWidth: 1158,
  previewHeight: 983,
  fileName: 'Akshat_Gour_Resume.pdf',
}

export const contact = {
  phone: '8435065661',
  email: 'gourakshat5@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akshatgour76/',
  // Add your GitHub profile URL here (e.g. 'https://github.com/yourname').
  // While this is empty, GitHub links are hidden instead of pointing nowhere.
  github: '',
}

export const socialLinks = [
  { label: 'LinkedIn', href: contact.linkedin },
  ...(contact.github ? [{ label: 'GitHub', href: contact.github }] : []),
]
