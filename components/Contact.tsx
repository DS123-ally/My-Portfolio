'use client'

import FadeUp from './FadeUp'

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '80px 4%' }}>
      <FadeUp>
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '60px 32px',
            borderRadius: '28px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.1), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              marginBottom: '16px',
              position: 'relative', zIndex: 1,
            }}
          >
            Let&apos;s Build <span className="grad-text">Something</span>
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: '16px',
              marginBottom: '36px',
              position: 'relative', zIndex: 1,
            }}
          >
            Open to research collaborations, internships, and building things that matter.
          </p>

          <a
            href="mailto:dineshseervi1208@gmail.com"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: '100px',
              fontSize: '15px',
              background: 'linear-gradient(135deg, var(--violet), var(--pink))',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 500,
              position: 'relative', zIndex: 1,
              boxShadow: '0 0 40px rgba(168,85,247,0.3)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 60px rgba(168,85,247,0.5)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(168,85,247,0.3)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            dineshseervi1208@gmail.com
          </a>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px', position: 'relative', zIndex: 1 }}>
            {[
              { label: 'LinkedIn', icon: 'in', href: 'https://www.linkedin.com/in/dinesh-seervi-00418532b/' },
              { label: 'GitHub', icon: '</>', href: 'https://github.com/DS123-ally' },
              { label: 'Phone', icon: '☎', href: 'tel:+919699623993' },
              { label:  'Twitter', icon: 'X', href: 'https://x.com/DineshSeer40336' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                title={link.label}
                style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted)', textDecoration: 'none', fontSize: '14px',
                  background: 'var(--card)', transition: 'all 0.25s', fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--violet)'
                  e.currentTarget.style.color = 'var(--violet)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
