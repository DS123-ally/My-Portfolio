'use client'

import FadeUp from './FadeUp'


export default function About() {
  return (
    <section
      id="about"
      style={{ padding: '80px 4%', background: 'var(--bg2)' }}
    >
      <div className="section-label">Who I am</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        {/* Photo */}
        <FadeUp delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: 'min(100%, 360px)',
              aspectRatio: '1/1',
              borderRadius: '24px',
              padding: '8px',
              background: 'linear-gradient(135deg, var(--violet), var(--pink))',
              boxShadow: '0 0 40px rgba(168,85,247,0.2)',
            }}>
              <img 
                src="/profile.jpg" 
                alt="Dinesh Seervi" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  border: '4px solid var(--bg2)',
                }}
              />
            </div>
          </div>
        </FadeUp>

        {/* Bio */}
        <FadeUp>
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              marginBottom: '24px',
              lineHeight: 1.1,
            }}
          >
            About <span className="grad-text">Me</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.9 }}>
            I&apos;m{' '}
            <strong style={{ color: 'var(--white)' }}>Dinesh Seervi</strong>, a B.Tech Computer Science Engineering student at{' '}
            <strong style={{ color: 'var(--white)' }}>AISSMS Institute of Information Technology, Pune</strong> (Aug 2024 - May 2028).
            I build AI-powered systems at the intersection of machine learning, data science, and agentic workflows.
            <br />
            <br />
            From contributing to open-source projects to building intelligent applications, I thrive where{' '}
            <strong style={{ color: 'var(--white)' }}>code meets consequence</strong>. Currently
            exploring Large Language Models (LLMs), RAG systems, and LangChain to build tools that automate and enhance human capabilities.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
