'use client'

import Typewriter from './Typewriter'

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-eyebrow">Portfolio / 2026</div>

        <h1 className="hero-title">
          DINESH<br />SEERVI
        </h1>

        <div className="hero-typewriter-wrap">
          <Typewriter />
        </div>

        <div className="hero-pills">
          {['AI Developer', 'Data Science', 'Open Source Contributor', 'CS Student'].map((role) => (
            <span key={role} className="hero-pill">{role}</span>
          ))}
        </div>

        <div className="hero-ctas">
          <a href="#projects" className="btn-primary-hero">View projects</a>
          <a href="https://shy-violet-751.linkyhost.com" target="_blank" rel="noopener noreferrer" className="btn-outline-hero">View resume</a>
        </div>
      </div>

      <div className="hero-avatar-col">
        <div className="hero-portrait-card">
          <div className="hero-portrait-card__label">AI Developer</div>
          <div className="hero-portrait-card__image">
            <img src="/profile.jpg" alt="Dinesh Seervi" />
          </div>
          <div className="hero-portrait-card__meta">
            <span>Pune, India</span>
            <span>Open to opportunities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
