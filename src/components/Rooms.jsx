import { useRef, useState } from 'react'
import './Rooms.css'
import { useOverlay } from '../context/overlay'
import {
  profile,
  education,
  stackLayers,
  concepts,
  projects,
  certificate,
  resume,
  contact,
  socialLinks,
} from '../data/portfolio'

const rnd = (n) => {
  const x = Math.sin(n * 9301.7 + 49297) * 233280
  return x - Math.floor(x)
}

const SPARKS = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: rnd(i + 1) * 100,
  size: 2 + rnd(i + 50) * 3,
  dur: 5 + rnd(i + 100) * 7,
  delay: -rnd(i + 150) * 10,
  drift: (rnd(i + 200) - 0.5) * 90,
}))

function Sparks() {
  return (
    <div className="sparks" aria-hidden="true">
      {SPARKS.map((s) => (
        <span
          key={s.id}
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            '--drift': `${s.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

function RoomFx() {
  return (
    <div className="room-fx" aria-hidden="true">
      <i className="fx-glow" />
      <i className="fx-fog fx-fog-a" />
      <i className="fx-fog fx-fog-b" />
      <i className="fx-vignette" />
    </div>
  )
}

function WallPicture({ poster, videoSrc, alt, caption, children, info, watermarkCover = false }) {
  return (
    <figure className="wall-picture">
      <div className="wp-frame">
        <div className="wp-canvas">
          <video
            className="wp-img wp-video"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            role="img"
            aria-label={alt}
          />
          {info && (
            <div className="video-info-cover" aria-hidden="true">
              <span>{info.kicker}</span>
              <strong>{info.title}</strong>
              <small>{info.sub}</small>
            </div>
          )}
          {watermarkCover && (
            <>
              <div className="video-watermark-cover video-watermark-top" aria-hidden="true">AKSHAT GOUR · CREATIVE INTERFACES</div>
              <div className="video-watermark-cover video-watermark-bottom" aria-hidden="true">REACT · UI · INTERACTION</div>
            </>
          )}
          {children}
          <Sparks />
          <i className="wp-shine" />
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function Scene({ className, onNext, nextLabel, children }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--px', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
    el.style.setProperty('--py', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
  }

  return (
    <div className={`room-scene ${className}`} ref={ref} onMouseMove={onMove}>
      <RoomFx />
      {children}
      {onNext && (
        <button type="button" className="next-room" onClick={onNext}>
          {nextLabel} <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  )
}

/* ---------- Room 1: About me ---------- */
export function RoomOne({ onNext }) {
  const { open } = useOverlay()
  const [first, last] = profile.name.split(' ')
  return (
    <Scene className="scene-1" onNext={onNext} nextLabel="ENTER ROOM 02">
      <section className="room-plaque" aria-labelledby="room1-title">
        <p className="eyebrow">1 ROOM · ABOUT ME</p>
        <h1 id="room1-title">
          {first} <em>{last}</em>
        </h1>
        <p className="role">{profile.role}</p>
        <p className="lead">{profile.about}</p>
        <div className="stat-row">
          {profile.stats.map((s) => (
            <div key={s.label} className="stat">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          ))}
        </div>
        <p className="edu-line">
          <span>Education</span>
          {education.short} · {education.institute.split(',').slice(0, 2).join(',')}
        </p>
        <p className="status"><i aria-hidden="true" /> {profile.status}</p>
        <div className="room-document-links">
          <button type="button" onClick={() => open('resume')}>Resume</button>
          <button type="button" onClick={() => open('certificate')}>Certificate</button>
        </div>
      </section>

      <WallPicture
        videoSrc="/videos/iron-man-room.mp4"
        poster="/images/iron-man.jpg"
        alt="Iron Man cinematic room video"
        caption="1 ROOM — IRON MAN"
        info={{ kicker: 'AKSHAT GOUR', title: 'FRONTEND DEVELOPER', sub: 'REACT · JAVASCRIPT · UI' }}
      >
        <i className="glow ir-reactor" />
        <i className="glow ir-eyes" />
        <i className="glow ir-gauntlet" />
        <i className="scanline" />
      </WallPicture>
    </Scene>
  )
}

/* ---------- Room 2: Skills ---------- */
function StackMap() {
  // Drawn top-down as a stack: each layer sits on the one below it.
  const layers = [...stackLayers].reverse()
  return (
    <ol className="stack-map" aria-label="Frontend stack, from foundation to UI library">
      {layers.map((l, i) => (
        <li key={l.layer} className="stack-layer" style={{ '--i': i }}>
          <span className="stack-name">{l.layer}</span>
          <span className="chips">
            {l.items.map((t) => <b key={t}>{t}</b>)}
          </span>
        </li>
      ))}
    </ol>
  )
}

export function RoomTwo({ onNext }) {
  return (
    <Scene className="scene-2" onNext={onNext} nextLabel="ENTER ROOM 03">
      <section className="room-plaque" aria-labelledby="room2-title">
        <p className="eyebrow">2 ROOM · SKILLS</p>
        <h1 id="room2-title">The <em>Toolkit</em></h1>
        <p className="role">HTML · CSS · JavaScript · React</p>
        <p className="lead small">Layered from the foundation up — each skill builds on the one beneath it.</p>
        <StackMap />
        <div className="skill-group concept-group">
          <span>Practised concepts</span>
          <div className="chips">
            {concepts.map((c) => <b key={c}>{c}</b>)}
          </div>
        </div>
        <p className="lead small">
          <strong>Education.</strong> {education.degree}, {education.stage.toLowerCase()} — {education.institute}.
        </p>
      </section>

      <WallPicture
        videoSrc="/videos/ultron-room.mp4"
        poster="/images/ultron.jpg"
        alt="Ultron cinematic room video"
        caption="2 ROOM — ULTRON"
        info={{ kicker: 'AKSHAT GOUR', title: 'FRONTEND STACK', sub: 'HTML · CSS · JS · REACT' }}
      >
        <i className="glow ul-eyes" />
        <i className="glow ul-core" />
        <i className="scanline red" />
      </WallPicture>
    </Scene>
  )
}

/* ---------- Room 3: Projects & credentials ---------- */
function ProjectCard({ project }) {
  const [openCard, setOpenCard] = useState(false)
  const panelId = `proj-${project.id}`
  return (
    <article className={`project-card ${openCard ? 'is-open' : ''}`}>
      <button
        type="button"
        className="project-card-head"
        aria-expanded={openCard}
        aria-controls={panelId}
        onClick={() => setOpenCard((v) => !v)}
      >
        <span className="project-card-title">{project.title}</span>
        <span className="project-card-plus" aria-hidden="true" />
      </button>
      <p className="project-card-summary">{project.summary}</p>
      <div className="chips project-card-stack">
        {project.stack.map((item) => <b key={item}>{item}</b>)}
      </div>
      <div id={panelId} className="project-card-more" hidden={!openCard}>
        <p>{project.details}</p>
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer">{project.hrefLabel} ↗</a>
        )}
      </div>
    </article>
  )
}

function CredentialCards() {
  const { open } = useOverlay()
  return (
    <div className="credential-grid">
      <button type="button" className="credential-card" onClick={() => open('certificate')}>
        <img
          className="credential-thumb"
          src={certificate.image}
          width={certificate.width}
          height={certificate.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="credential-text">
          <strong>{certificate.title}</strong>
          <small>{certificate.issuer} · {certificate.year}</small>
          <em>View certificate</em>
        </span>
      </button>
      <button type="button" className="credential-card" onClick={() => open('resume')}>
        <img
          className="credential-thumb credential-thumb-resume"
          src={resume.preview}
          width={resume.previewWidth}
          height={resume.previewHeight}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="credential-text">
          <strong>Resume</strong>
          <small>Current PDF · preview or download</small>
          <em>Preview resume</em>
        </span>
      </button>
    </div>
  )
}

export function RoomThree({ onNext }) {
  return (
    <Scene className="scene-3" onNext={onNext} nextLabel="ENTER ROOM 04">
      <section className="room-plaque" aria-labelledby="room3-title">
        <p className="eyebrow">3 ROOM · PROJECTS & CREDENTIALS</p>
        <h1 id="room3-title">Work & <em>Proof</em></h1>
        <p className="role">Projects · Certification · Resume</p>
        <div className="skill-groups">
          <div className="skill-group">
            <span>Projects</span>
            <div className="project-list">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>
          <div className="skill-group">
            <span>Credentials</span>
            <CredentialCards />
          </div>
        </div>
      </section>

      <WallPicture
        videoSrc="/videos/doctor-strange-room.mp4"
        poster="/images/doctor-strange.jpg"
        alt="Doctor Strange cinematic room video"
        caption="3 ROOM — PROJECTS"
        watermarkCover
      >
        <i className="glow ds-magic" />
        <i className="scanline violet" />
      </WallPicture>
    </Scene>
  )
}

/* ---------- Room 4: Connect ---------- */
export function RoomFour() {
  const { open } = useOverlay()
  return (
    <Scene className="scene-4">
      <section className="room-plaque final-plaque" aria-labelledby="room4-title">
        <p className="eyebrow">4 ROOM · FINAL CHAMBER</p>
        <h1 id="room4-title">Build. <em>Break. Create.</em></h1>
        <p className="role">{profile.name} · {profile.role}</p>
        <p className="lead">{profile.tagline} {profile.status}.</p>
        <div className="skill-groups">
          <div className="skill-group">
            <span>Tech Stack</span>
            <div className="chips">
              <b>HTML</b><b>CSS</b><b>JavaScript</b><b>React.js</b><b>Tailwind CSS</b><b>Bootstrap</b>
            </div>
          </div>
        </div>

        <div className="social-block">
          <span className="social-title">CONNECT WITH ME</span>
          <div className="social-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
            ))}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:+91${contact.phone}`}>{contact.phone}</a>
          </div>
          <div className="social-links social-docs">
            <button type="button" onClick={() => open('resume')}>Resume</button>
            <button type="button" onClick={() => open('certificate')}>Certificate</button>
          </div>
        </div>

        <a className="stone-connect" href={contact.linkedin} target="_blank" rel="noreferrer">
          <span className="stone-dot" aria-hidden="true" /> LET'S CONNECT ON LINKEDIN
        </a>
      </section>

      <WallPicture
        videoSrc="/videos/thanos-room.mp4"
        poster="/images/thanos.jpg"
        alt="Thanos cinematic room video"
        caption="4 ROOM — FINAL CHAMBER"
        info={{ kicker: 'AKSHAT GOUR', title: 'FINAL CHAMBER', sub: 'REACT · UI · FRONTEND' }}
      >
        <i className="glow thanos-stone" />
        <i className="scanline gold" />
      </WallPicture>
    </Scene>
  )
}
