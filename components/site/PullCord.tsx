'use client'

import { useRef, useState } from 'react'

const REST = 210
const TRIGGER = 64
const TICK_STEP = 14

function resumeContext(ctx: AudioContext) {
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function playClick(ctx: AudioContext, frequency: number, duration: number, volume: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * 0.45), ctx.currentTime + duration)
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

function playChainTick(ctx: AudioContext) {
  const size = Math.floor(ctx.sampleRate * 0.045)
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 180)
  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  source.buffer = buffer
  filter.type = 'bandpass'
  filter.frequency.value = 1600 + Math.random() * 700
  filter.Q.value = 2.4
  gain.gain.value = 0.16
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start()
}

export function PullCord({ onToggle }: { onToggle: () => void }) {
  const [length, setLength] = useState(REST)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ startY: number; startLen: number } | null>(null)
  const lengthRef = useRef(REST)
  const tickAt = useRef(REST)
  const audio = useRef<AudioContext | null>(null)

  function context() {
    audio.current ??= new AudioContext()
    return resumeContext(audio.current)
  }

  function begin(event: React.PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { startY: event.clientY, startLen: lengthRef.current }
    tickAt.current = lengthRef.current
    setDragging(true)
    playClick(context(), 420, 0.08, 0.08)
  }

  function move(event: React.PointerEvent<HTMLButtonElement>) {
    if (!drag.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    const next = Math.min(REST + 150, Math.max(REST, drag.current.startLen + (event.clientY - drag.current.startY)))
    lengthRef.current = next
    setLength(next)
    if (next - tickAt.current >= TICK_STEP) {
      tickAt.current = next
      playChainTick(context())
    }
  }

  function end() {
    if (!drag.current) return
    const pulled = lengthRef.current - REST
    drag.current = null
    lengthRef.current = REST
    tickAt.current = REST
    setDragging(false)
    setLength(REST)
    if (pulled > TRIGGER) {
      const ctx = context()
      playClick(ctx, 220, 0.12, 0.14)
      window.setTimeout(() => playClick(ctx, 140, 0.16, 0.1), 70)
      onToggle()
    } else {
      playClick(context(), 260, 0.07, 0.05)
    }
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
