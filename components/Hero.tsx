'use client'

import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

const f = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-base" />
      <div className="hero-grid" />
      <div className="hero-vignette" />

      <div className="hero-content">
        <motion.div {...f(0)} className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          Portfolio · 2026
        </motion.div>

        <motion.h1 {...f(0.1)} className="hero-title">
          DINESH<br />SEERVI
        </motion.h1>

        <motion.div {...f(0.2)} className="hero-typewriter-wrap">
          <Typewriter />
        </motion.div>

        <motion.div {...f(0.28)} className="hero-pills">
          {['AI Developer', 'Data Science', 'Open Source Contributor', 'CS Student'].map((r) => (
            <span key={r} className="hero-pill">{r}</span>
          ))}
        </motion.div>

        <motion.div {...f(0.36)} className="hero-ctas">
          <a href="#projects" className="btn-primary-hero">View Projects</a>
          <a href="https://shy-violet-751.linkyhost.com" target="_blank" rel="noopener noreferrer" className="btn-outline-hero">View Resume</a>
        </motion.div>

        <motion.div {...f(0.46)} className="hero-scroll">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </div>

      <div className="hero-avatar-col">
        <motion.div {...f(0.22)} className="hero-portrait-card">
          <div className="hero-portrait-card__label">AI Developer</div>
          <div className="hero-portrait-card__image">
            <img src="/profile.jpg" alt="Dinesh Seervi" />
          </div>
          <div className="hero-portrait-card__meta">
            <span>Pune, India</span>
            <span>Open to opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
