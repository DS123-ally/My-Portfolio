'use client'

import { motion } from 'framer-motion'
import Typewriter from './Typewriter'
import Spline from '@splinetool/react-spline'

const f = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as any },
})

export default function Hero() {
  return (
    <section id="hero" className="hero-section">

      {/* ── BACKGROUND LAYERS ── */}
      <div className="hero-bg-base" />
      <div className="hero-grid" />
      <div className="hero-vignette" />

      {/* ── LEFT COLUMN ── */}
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
          {['AI Developer', 'Data Science', 'Open Source Contributor', 'CS Student'].map(r => (
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

      {/* ── RIGHT COLUMN: SPLINE ROBOT ── */}
      <div className="hero-avatar-col" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        
        <div className="avatar-orb" style={{ opacity: 0.5 }} />

        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto' }}>
          <Spline scene="https://prod.spline.design/aeYcauEbbaWFUuIB/scene.splinecode" />
        </div>

        <div className="avatar-fade avatar-fade--left"   />
        <div className="avatar-fade avatar-fade--top"    />
        <div className="avatar-fade avatar-fade--bottom" />

      </div>
    </section>
  )
}