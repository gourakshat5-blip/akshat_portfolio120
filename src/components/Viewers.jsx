import Dialog from './Dialog'
import { certificate, resume, profile } from '../data/portfolio'

export function ResumeViewer({ onClose }) {
  return (
    <Dialog kicker="RESUME" title={`${profile.name}`} onClose={onClose} size="lg">
      <p className="doc-meta">Preview of the current resume. The PDF has the same content.</p>
      <div className="doc-frame">
        <img
          src={resume.preview}
          width={resume.previewWidth}
          height={resume.previewHeight}
          alt={`Resume of ${profile.name}: profile, technical skills, Calculator App project, BSc education and React JS certification`}
        />
      </div>
      <div className="btn-row">
        <a className="pill pill-solid" href={resume.pdf} download={resume.fileName}>Download PDF</a>
        <a className="pill" href={resume.pdf} target="_blank" rel="noreferrer">Open in new tab ↗</a>
      </div>
    </Dialog>
  )
}

export function CertificateViewer({ onClose }) {
  return (
    <Dialog kicker="CERTIFICATION" title={certificate.title} onClose={onClose}>
      <p className="doc-meta">
        <strong>{certificate.issuer}</strong>
        <br />
        Training {certificate.training} · Certificate dated {certificate.dated} · {certificate.grade}
      </p>
      <div className="doc-frame doc-frame-cert">
        <img
          src={certificate.image}
          width={certificate.width}
          height={certificate.height}
          alt={certificate.alt}
        />
      </div>
      <div className="btn-row">
        <a className="pill pill-solid" href={certificate.image} target="_blank" rel="noreferrer">Open full size ↗</a>
        <a className="pill" href={certificate.image} download="Akshat_Gour_React_JS_Certificate.jpg">Download</a>
      </div>
    </Dialog>
  )
}
