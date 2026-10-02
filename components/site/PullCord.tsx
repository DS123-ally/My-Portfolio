'use client'

import { useRef, useState } from 'react'

const REST = 210
const TRIGGER = 64

export function PullCord({ onToggle }: { onToggle: () => void }) {
  const [length, setLength] = useState(REST)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ startY: number; startLen: number } | null>(null)
  const lengthRef = useRef(REST)

  function begin(event: React.PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { startY: event.clientY, startLen: lengthRef.current }
    setDragging(true)
  }

  function move(event: React.PointerEvent<HTMLButtonElement>) {
    if (!drag.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    const next = Math.min(REST + 150, Math.max(REST, drag.current.startLen + (event.clientY - drag.current.startY)))
    lengthRef.current = next
    setLength(next)
  }

  function end() {
    if (!drag.current) return
    const pulled = lengthRef.current - REST
    drag.current = null
    lengthRef.current = REST
    setDragging(false)
    setLength(REST)
    if (pulled > TRIGGER) onToggle()
  }

  return (
    <div className={`pull-cord${dragging ? ' is-dragging' : ''}`}>
      <p className="pull-cord-hint">
        pull the
        <br />
        cord!
      </p>
      <div className="pull-cord-swing">
        <span className="pull-cord-line" style={{ height: length }} />
        <button
          type="button"
          aria-label="Pull the cord to switch the lights"
          className="pull-cord-handle"
          style={{ top: length }}
          onPointerDown={begin}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
      </div>
    </div>
  )
}
