'use client'

import { useEffect, useState } from 'react'

const WORDS = ['AI Developer', 'Data Science Enthusiast', 'Hackathon Winner', 'CS Student']

export default function Typewriter() {
  const [mounted, setMounted] = useState(false)
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const word = WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting) {
      if (charIndex < word.length) {
        timeout = setTimeout(() => setCharIndex(c => c + 1), 90)
      } else {
        timeout = setTimeout(() => setDeleting(true), 1400)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex(c => c - 1), 55)
      } else {
        setDeleting(false)
        setWordIndex(w => (w + 1) % WORDS.length)
      }
    }
    setText(WORDS[wordIndex].slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, mounted])

  if (!mounted) return (
    <div style={{ fontSize: 'clamp(16px,2.5vw,24px)', color: 'var(--pink)', fontFamily: 'var(--font-syne)', fontWeight: 700, minHeight: '36px', letterSpacing: '0.04em' }}>
      AI Developer
    </div>
  )

  return (
    <div style={{ fontSize: 'clamp(16px,2.5vw,24px)', color: 'var(--pink)', fontFamily: 'var(--font-syne)', fontWeight: 700, minHeight: '36px', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '3px' }}>
      {text}
      <span style={{ display: 'inline-block', width: '2px', height: '1.1em', background: 'var(--pink)', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  )
}
