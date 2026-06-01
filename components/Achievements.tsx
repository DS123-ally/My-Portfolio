'use client'

import FadeUp from './FadeUp'

/* ─────────────────────────────────────────────────────
   Category config — icon, label, accent colour
───────────────────────────────────────────────────── */
const CATEGORY_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  hackathon: { label: '🏆 Hackathon Win', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)' },
  research: { label: '📄 Research', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
  ieee: { label: '🔬 IEEE Publication', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)' },
  leadership: { label: '👑 Leadership', color: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.25)' },
  internship: { label: '💼 Internship', color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.25)' },
  patent: { label: '⚙️ Patent', color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)' },
  competition: { label: '🎯 Competition', color: '#e879f9', bg: 'rgba(232,121,249,0.08)', border: 'rgba(232,121,249,0.25)' },
  certification: { label: '📜 Certification', color: '#2dd4bf', bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.25)' },
  organizer: { label: '🎙️ Organizer', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.25)' },
}

/* ─────────────────────────────────────────────────────
   Achievement data
───────────────────────────────────────────────────── */
const ACHIEVEMENTS = [
  {
    category: 'hackathon',
    icon: '🏆',
    title: 'Hackathon Winner',
    event: 'Hackathon Competition',
    year: '',
    desc: 'Winner of 1 Hackathon competition by developing innovative AI-based solutions in a collaborative team environment.',
    link: '#',
  },
  {
    category: 'competition',
    icon: '🎯',
    title: 'Participated in 8+ Hackathons',
    event: 'Various Competitions',
    year: '',
    desc: 'Participated in 8+ hackathons focused on AI, Machine Learning, Web Development, and Open Source technologies.',
    link: '#',
  },
  {
    category: 'certification',
    icon: '☁️',
    title: 'OCI 2025 AI Foundations Associate',
    event: 'Oracle',
    year: '2025',
    desc: 'Oracle Cloud Infrastructure (OCI) AI Foundations certification covering fundamental concepts of AI and machine learning.',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=60126C04B7C8518BACB6BB8948D459B3864CC1C93BE4327AA507E61912123E7D',
  },
  {
    category: 'certification',
    icon: '💻',
    title: 'HackerRank Skill Certificate',
    event: 'HackerRank',
    year: '',
    desc: 'Verified programming skills and problem-solving abilities on the HackerRank platform.',
    link: 'https://www.hackerrank.com/certificates/ba9a1180bc43',
  },
]

/* ─────────────────────────────────────────────────────
   External link icon
───────────────────────────────────────────────────── */
function LinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: '80px 4%', background: 'var(--bg2)' }}>
      <div className="section-label">Recognition</div>
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800,
          marginBottom: '12px',
          lineHeight: 1.1,
        }}
      >
        Achievements <span className="grad-text">&</span> Awards
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '48px', maxWidth: '540px' }}>
        Hackathon wins, IEEE publications, patents, leadership roles &amp; more — click any card to view proof.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {ACHIEVEMENTS.map((a, i) => {
          const cat = CATEGORY_META[a.category] ?? CATEGORY_META.competition
          return (
            <FadeUp key={a.title + a.event} delay={i * 0.07}>
              <a
                href={a.link}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <div
                  style={{
                    padding: '22px 24px',
                    borderRadius: '18px',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cat.border
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = `0 0 32px ${cat.bg.replace('0.08', '0.22')}, inset 0 0 0 1px ${cat.border}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Subtle top-left corner glow */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '18px', pointerEvents: 'none',
                    background: `radial-gradient(ellipse at 0% 0%, ${cat.bg}, transparent 60%)`,
                  }} />

                  {/* Top row: icon + category badge + link indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                    <span style={{
                      fontSize: '22px', lineHeight: 1,
                      width: '44px', height: '44px',
                      borderRadius: '12px',
                      background: cat.bg,
                      border: `1px solid ${cat.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {a.icon}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      color: cat.color,
                      background: cat.bg,
                      border: `1px solid ${cat.border}`,
                      padding: '3px 10px',
                      borderRadius: '100px',
                    }}>
                      {cat.label}
                    </span>
                    {/* Link indicator — top right */}
                    <span style={{ marginLeft: 'auto', color: 'rgba(168,85,247,0.4)', flexShrink: 0 }}>
                      <LinkIcon />
                    </span>
                  </div>

                  {/* Title */}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: 'var(--white)',
                      lineHeight: 1.3,
                      marginBottom: '4px',
                    }}>
                      {a.title}
                    </div>
                    {/* Event + Year */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', color: cat.color, fontWeight: 500 }}>
                        {a.event}
                      </span>
                      <span style={{
                        fontSize: '10px', color: 'var(--muted)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '1px 7px', borderRadius: '100px',
                      }}>
                        {a.year}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: 'var(--muted)',
                    fontSize: '13px',
                    lineHeight: 1.75,
                    position: 'relative',
                    margin: 0,
                    flex: 1,
                  }}>
                    {a.desc}
                  </p>

                  {/* Footer CTA */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11.5px',
                    color: cat.color,
                    fontWeight: 600,
                    position: 'relative',
                    paddingTop: '10px',
                    borderTop: `1px solid ${cat.border.replace('0.25', '0.12')}`,
                    opacity: 0.85,
                  }}>
                    <LinkIcon />
                    View Certificate / Proof
                  </div>
                </div>
              </a>
            </FadeUp>
          )
        })}
      </div>
    </section>
  )
}
