import { useEffect, useId, useRef } from 'react'
import './Dialog.css'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'

/**
 * Accessible modal: labelled, Esc to close, focus moves in and is trapped,
 * backdrop click closes. Focus is restored by the OverlayProvider in App.
 */
export default function Dialog({ kicker, title, onClose, size = 'md', children }) {
  const panelRef = useRef(null)
  const closeRef = useRef(onClose)
  const titleId = useId()

  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    const root = document.documentElement
    root.dataset.dialog = 'open'
    const panel = panelRef.current
    panel?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length)
      if (!items.length) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      delete root.dataset.dialog
    }
  }, [])

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={panelRef}
        className={`dialog-panel dialog-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button type="button" className="dialog-close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        {kicker && <p className="dialog-kicker">{kicker}</p>}
        <h2 id={titleId} className="dialog-title">
          {title}
        </h2>
        {children}
      </section>
    </div>
  )
}
