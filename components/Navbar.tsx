'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 4%',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(7,7,15,0.85)'
          : 'rgba(7,7,15,0.5)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: '22px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--violet), var(--pink))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        DS
      </span>

      {/* Nav Links */}
      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none' }}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                color: 'var(--muted)',
                textDecoration: 'none',
                fontSize: '13px',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Badge */}
      <div
        style={{
          fontSize: '11px',
          padding: '5px 14px',
          borderRadius: '100px',
          border: '1px solid rgba(168,85,247,0.4)',
          color: 'var(--violet)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          letterSpacing: '0.05em',
          background: 'rgba(168,85,247,0.06)',
        }}
      >
        <span
          style={{
            width: '6px', height: '6px',
            background: '#4ade80',
            borderRadius: '50%',
            boxShadow: '0 0 8px #4ade80',
            animation: 'pulse-green 2s infinite',
          }}
        />
        Available for opportunities
      </div>

      <style>{`
        @keyframes pulse-green {
          0%,100%{opacity:1} 50%{opacity:0.4}
        }
        @media(max-width:768px){
          nav ul { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
