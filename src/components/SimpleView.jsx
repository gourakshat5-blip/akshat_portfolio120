import Dialog from './Dialog'
import { useOverlay } from '../context/overlay'
import { profile, education, stackLayers, projects, certificate, contact, socialLinks } from '../data/portfolio'

const skillLine = (layers) => layers.flatMap((l) => l.items)

export default function SimpleView({ onClose }) {
  const { open } = useOverlay()
  const skills = skillLine(stackLayers)
  const project = projects[0]

  return (
    <Dialog kicker="QUICK PROFILE" title={<>Akshat <em>Gour</em></>} onClose={onClose}>
      <p className="sv-role">{profile.role} · {profile.level}</p>
      <p className="sv-about">{profile.summary}</p>

      <div className="sv-grid">
        <div>
          <span>EDUCATION</span>
          <strong>{education.short}</strong>
          <small>{education.institute}</small>
        </div>
        <div>
          <span>FRONTEND SKILLS</span>
          <strong>{skills.slice(0, 4).join(' · ')}</strong>
          <small>{skills.slice(4).join(' · ')}</small>
        </div>
        <div>
          <span>PROJECT</span>
          <strong>{project.title}</strong>
          <small>{project.summary}</small>
        </div>
        <div>
          <span>CERTIFICATION</span>
          <strong>{certificate.title}</strong>
          <small>{certificate.issuer} · {certificate.year}</small>
        </div>
      </div>

      <div className="btn-row">
        <button type="button" className="pill pill-solid" onClick={() => open('resume')}>Preview resume</button>
        <button type="button" className="pill" onClick={() => open('certificate')}>View certificate</button>
        {socialLinks.map((link) => (
          <a key={link.label} className="pill" href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
        ))}
      </div>

      <p className="sv-contact">
        <a href={`tel:+91${contact.phone}`}>{contact.phone}</a>
        <span aria-hidden="true">•</span>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <span aria-hidden="true">•</span>
        {profile.location}
      </p>
    </Dialog>
  )
}
