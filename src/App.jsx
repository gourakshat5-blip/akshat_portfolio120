import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import SkillHome from './components/SkillHome'
import SimpleView from './components/SimpleView'
import { ResumeViewer, CertificateViewer } from './components/Viewers'
import { OverlayContext } from './context/overlay'
import { profile, socialLinks } from './data/portfolio'
import { VIDEO, POSTER } from './data/scenes'

function Hero({ onEnter, onSimple }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      video.pause()
      return
    }
    video.play().catch(() => {})
  }, [])

  return (
    <main className="hero" id="main">
      <video
        ref={videoRef}
        className={`hero-video ${ready ? 'is-ready' : ''}`}
        src={VIDEO.hero}
        poster={POSTER.hero}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={() => setReady(true)}
        onError={() => setReady(true)}
      />
      <div className="hero-scrim" />
      <div className="hero-content">
        <p className="hero-kicker">PORTFOLIO · 2026</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">
          {profile.role} <span aria-hidden="true">·</span> {profile.level}
        </p>
        <div className="hero-actions">
          <button type="button" className="hero-cta" onClick={onEnter}>Enter My World</button>
          <button type="button" className="hero-cta hero-cta-secondary" onClick={onSimple}>Simple View</button>
        </div>
        <ul className="hero-links" aria-label="Profiles">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

function App() {
  const [inHouse, setInHouse] = useState(false)
  const [overlay, setOverlay] = useState(null) // null | 'simple' | 'resume' | 'certificate'
  const openerRef = useRef(null)

  const open = useCallback((name) => {
    setOverlay((current) => {
      if (!current) openerRef.current = document.activeElement
      return name
    })
  }, [])

  const close = useCallback(() => {
    setOverlay(null)
    const opener = openerRef.current
    openerRef.current = null
    // wait for the page to become interactive again before restoring focus
    requestAnimationFrame(() => {
      if (opener && document.contains(opener)) opener.focus()
    })
  }, [])

  const api = useMemo(() => ({ open, close }), [open, close])

  return (
    <OverlayContext.Provider value={api}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="app-shell" inert={overlay ? true : undefined}>
        {inHouse ? (
          <SkillHome onBack={() => setInHouse(false)} />
        ) : (
          <Hero onEnter={() => setInHouse(true)} onSimple={() => open('simple')} />
        )}
      </div>
      {overlay === 'simple' && <SimpleView onClose={close} />}
      {overlay === 'resume' && <ResumeViewer onClose={close} />}
      {overlay === 'certificate' && <CertificateViewer onClose={close} />}
    </OverlayContext.Provider>
  )
}

export default App
