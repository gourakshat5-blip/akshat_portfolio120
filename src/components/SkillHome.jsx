import { useCallback, useEffect, useRef, useState } from 'react'
import { RoomOne, RoomTwo, RoomThree, RoomFour } from './Rooms'
import { VIDEO, POSTER, ROOM_FRAME, ROOM_TITLES, BUSY, SETTLES_INTO } from '../data/scenes'
import { profile } from '../data/portfolio'

const FORWARD_PHASES = ['entering', 'to2', 'to3', 'to4']
const PREFETCH_NEXT = { house: VIDEO.enter, room1: VIDEO.forward, room2: VIDEO.forward3, room3: VIDEO.forward4 }

const BAR_LABEL = {
  house: 'ENTER THE HOUSE',
  entering: 'ENTERING',
  room1: 'ROOM 1 OF 4 · INSIDE',
  to2: 'MOVING FORWARD',
  room2: 'ROOM 2 OF 4 · INSIDE',
  to3: 'MOVING FORWARD',
  room3: 'ROOM 3 OF 4 · INSIDE',
  to4: 'MOVING FORWARD',
  room4: 'ROOM 4 OF 4 · INSIDE',
  back3: 'GOING BACK',
  back2: 'GOING BACK',
  back1: 'GOING BACK',
  dip: '',
}

function SkillHome({ onBack }) {
  const videoRef = useRef(null)
  const phaseRef = useRef('house')
  const loadId = useRef(0) // bumps whenever a new action replaces whatever was pending
  const timers = useRef(new Set())
  const loadingTimer = useRef(null)
  const undimOnPlay = useRef(false)
  const prefetched = useRef(new Set())
  const actions = useRef({})

  const [phase, setPhaseState] = useState('house')
  const [dim, setDim] = useState(false)
  const [loading, setLoading] = useState(false)

  const go = useCallback((next) => {
    phaseRef.current = next
    setPhaseState(next)
  }, [])

  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => {
      timers.current.delete(id)
      fn()
    }, ms)
    timers.current.add(id)
    return id
  }, [])

  const lift = useCallback(() => {
    undimOnPlay.current = false
    setDim(false)
  }, [])

  // A new action always replaces whatever was still pending (timers, metadata listeners).
  const cancelPending = useCallback(() => {
    loadId.current += 1
    timers.current.forEach((id) => clearTimeout(id))
    timers.current.clear()
    clearTimeout(loadingTimer.current)
    setLoading(false)
  }, [])

  const playClip = useCallback(
    (src, loop = false) => {
      const v = videoRef.current
      if (!v) return
      const id = ++loadId.current
      v.loop = loop
      v.src = src
      v.load()
      v.addEventListener(
        'loadedmetadata',
        () => {
          if (id === loadId.current) v.play().catch(() => {})
        },
        { once: true },
      )
      undimOnPlay.current = true
      later(() => {
        if (id === loadId.current && undimOnPlay.current) lift()
      }, 2500)
    },
    [later, lift],
  )

  // Show the frozen last frame of a clip (the canonical look of a room).
  const holdFrame = useCallback(
    (src, done) => {
      const v = videoRef.current
      if (!v) {
        done()
        return
      }
      const id = ++loadId.current
      v.loop = false
      v.src = src
      v.load()
      v.addEventListener(
        'loadedmetadata',
        () => {
          if (id !== loadId.current) return
          let finished = false
          const finish = () => {
            if (finished || id !== loadId.current) return
            finished = true
            v.pause()
            done()
          }
          // Reveal only once the seeked frame is really on screen (otherwise the poster flashes).
          v.addEventListener(
            'seeked',
            () => {
              if ('requestVideoFrameCallback' in v) v.requestVideoFrameCallback(() => finish())
              else finish()
            },
            { once: true },
          )
          v.currentTime = Math.max(0, (v.duration || 0) - 0.05)
          later(finish, 2000)
        },
        { once: true },
      )
    },
    [later],
  )

  const dipTo = useCallback(
    (fn) => {
      setDim(true)
      later(fn, 380)
    },
    [later],
  )

  const settleRoom = useCallback(
    (room, via = 'dip') => {
      cancelPending()
      go(via)
      setDim(true)
      later(() => {
        holdFrame(ROOM_FRAME[room], () => {
          go(`room${room}`)
          later(lift, 150)
        })
      }, 380)
    },
    [cancelPending, go, holdFrame, later, lift],
  )

  const forward = useCallback(
    (phaseName, src) => {
      cancelPending()
      go(phaseName)
      dipTo(() => playClip(src))
    },
    [cancelPending, go, dipTo, playClip],
  )

  const enterHouse = () => forward('entering', VIDEO.enter)
  const goRoom2 = () => forward('to2', VIDEO.forward)
  const goRoom3 = () => forward('to3', VIDEO.forward3)
  const goRoom4 = () => forward('to4', VIDEO.forward4)

  const backToHouse = () => {
    cancelPending()
    go('dip')
    dipTo(() => {
      go('house')
      playClip(VIDEO.house, true)
    })
  }

  const jumpToRoom = (room) => {
    const current = phaseRef.current
    if (BUSY.includes(current) || current === 'house' || current === `room${room}`) return
    settleRoom(room)
  }

  const handleBack = () => {
    const current = phaseRef.current
    if (BUSY.includes(current)) return
    if (current === 'room4') settleRoom(3, 'back3')
    else if (current === 'room3') settleRoom(2, 'back2')
    else if (current === 'room2') settleRoom(1, 'back1')
    else if (current === 'room1') backToHouse()
    else onBack()
  }

  const handleNext = () => {
    const current = phaseRef.current
    if (current === 'house') enterHouse()
    else if (current === 'room1') goRoom2()
    else if (current === 'room2') goRoom3()
    else if (current === 'room3') goRoom4()
  }

  const skip = () => {
    const room = SETTLES_INTO[phaseRef.current]
    if (room && FORWARD_PHASES.includes(phaseRef.current)) settleRoom(room)
  }

  // Latest handlers for the keyboard listener (assigned after every render).
  useEffect(() => {
    actions.current = { handleBack, handleNext }
  })

  const handleEnded = () => {
    const room = SETTLES_INTO[phaseRef.current]
    if (room) go(`room${room}`)
  }

  const handleError = () => {
    // Never strand a visitor on a clip that failed to load: move on to the room.
    setLoading(false)
    const room = SETTLES_INTO[phaseRef.current]
    if (room) go(`room${room}`)
    lift()
  }

  const handleWaiting = () => {
    clearTimeout(loadingTimer.current)
    loadingTimer.current = setTimeout(() => setLoading(true), 450)
  }

  const handleReady = () => {
    clearTimeout(loadingTimer.current)
    setLoading(false)
  }

  const handlePlaying = () => {
    videoRef.current?.removeAttribute('poster') // poster is only for the very first load
    handleReady()
    if (undimOnPlay.current) lift()
  }

  // Mount: lock page scroll, start the looping house backdrop (unless motion is reduced).
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    const v = videoRef.current
    if (v) {
      v.loop = true
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.pause()
      else v.play().catch(() => {})
    }
    const pending = timers.current
    return () => {
      document.documentElement.classList.remove('no-scroll')
      pending.forEach((id) => clearTimeout(id))
      pending.clear()
      clearTimeout(loadingTimer.current)
    }
  }, [])

  // Keyboard: → next room, ← / Esc back. Ignored while a dialog is open.
  useEffect(() => {
    const onKey = (event) => {
      if (document.documentElement.dataset.dialog || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowRight') actions.current.handleNext?.()
      else if (event.key === 'ArrowLeft' || event.key === 'Escape') actions.current.handleBack?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Warm the cache with the next clip once the current scene has settled.
  useEffect(() => {
    const next = PREFETCH_NEXT[phase]
    const conn = navigator.connection
    if (!next || prefetched.current.has(next) || conn?.saveData || /2g/.test(conn?.effectiveType || '')) return
    const id = setTimeout(() => {
      prefetched.current.add(next)
      fetch(next, { priority: 'low' })
        .then((res) => res.blob())
        .catch(() => prefetched.current.delete(next))
    }, 1500)
    return () => clearTimeout(id)
  }, [phase])

  const busy = BUSY.includes(phase)
  const roomNumber = phase.startsWith('room') ? Number(phase.slice(4)) : 0
  const backLabel = phase === 'room1' ? '← House' : phase === 'house' ? '← Home' : '← Back'
  const camClass = roomNumber ? `cam-in cam-r${roomNumber}` : ''
  const showTransitionBrand = ['to2', 'to3', 'to4', 'back3', 'back2', 'back1'].includes(phase)
  const announcement = roomNumber ? `Room ${roomNumber} of 4: ${ROOM_TITLES[roomNumber]}` : ''

  return (
    <div className={`skill-home is-${phase}`} id="main">
      <div className={`skill-home-cam ${camClass}`}>
        <video
          ref={videoRef}
          className="skill-home-video"
          src={VIDEO.house}
          poster={POSTER.house}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onEnded={handleEnded}
          onError={handleError}
          onWaiting={handleWaiting}
          onCanPlay={handleReady}
          onSeeked={handleReady}
          onPlaying={handlePlaying}
        />
      </div>
      <div className="skill-home-overlay" />

      {showTransitionBrand && (
        <div className="transition-brand" aria-hidden="true">AKSHAT GOUR · CINEMATIC HOUSE</div>
      )}

      {phase === 'room1' && <RoomOne key="room1" onNext={goRoom2} />}
      {phase === 'room2' && <RoomTwo key="room2" onNext={goRoom3} />}
      {phase === 'room3' && <RoomThree key="room3" onNext={goRoom4} />}
      {phase === 'room4' && <RoomFour key="room4" />}

      <header className="skill-home-topbar">
        <div className="skill-home-left">
          <div className="skill-home-brand">{profile.name.toUpperCase()}</div>
          <nav className="room-nav" aria-label="Room navigation">
            {[1, 2, 3, 4].map((room) => (
              <button
                key={room}
                type="button"
                className={`room-nav-btn ${roomNumber === room ? 'active' : ''}`}
                onClick={() => jumpToRoom(room)}
                disabled={busy || phase === 'house'}
                aria-label={`Go to room ${room}: ${ROOM_TITLES[room]}`}
                aria-current={roomNumber === room ? 'true' : undefined}
                title={phase === 'house' ? 'Enter the house first' : ROOM_TITLES[room]}
              >
                {String(room).padStart(2, '0')}
              </button>
            ))}
          </nav>
        </div>
        <div className="skill-home-title">HORROR DEVELOPER HOUSE</div>
        <button type="button" className="skill-home-back" onClick={handleBack} disabled={busy}>
          {backLabel}
        </button>
      </header>

      {phase === 'house' && (
        <section className="skill-home-info" aria-labelledby="house-title">
          <p className="skill-home-eyebrow">WELCOME TO MY</p>
          <h1 id="house-title">Developer Home</h1>
          <p>A cinematic space where my frontend skills, projects and creative work come together.</p>
          <div className="skill-home-tags" aria-label="Core skills">
            <span>React.js</span>
            <span>JavaScript</span>
            <span>HTML & CSS</span>
            <span>Tailwind CSS</span>
          </div>
          <button type="button" className="enter-house horror-button" onClick={enterHouse}>
            ENTER THE HORROR HOUSE
          </button>
        </section>
      )}

      {phase === 'entering' && (
        <div className="entry-message">
          <span className="entry-kicker">THE DOOR IS OPEN</span>
          <h1>Enter if you dare.</h1>
          <p>Entering Akshat's developer house...</p>
        </div>
      )}

      {loading && (
        <div className="scene-loader" role="status">
          <i aria-hidden="true" />
          <span>Loading scene…</span>
        </div>
      )}

      <div className={`skill-home-dip ${dim ? 'on' : ''}`} />

      <div className="skill-home-bottom">
        <span>{BAR_LABEL[phase]}</span>
        <span className="skill-home-line" />
      </div>
      {FORWARD_PHASES.includes(phase) && (
        <button type="button" className="skill-home-skip" onClick={skip}>
          Skip <span aria-hidden="true">›</span>
        </button>
      )}
      <p className="sr-only" aria-live="polite">{announcement}</p>
    </div>
  )
}

export default SkillHome
