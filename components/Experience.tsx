'use client'

import FadeUp from './FadeUp'

const EXPERIENCES = [
  {
    date: 'Mar 2026',
    role: 'Open Source Contributor',
    org: 'GirlScript Summer of Code',
    desc: 'Contributed to open-source projects by fixing issues, improving features, and collaborating with developers. Worked on debugging, documentation enhancement, and code optimization in collaborative environments.',
  },
  {
    date: 'Jul 2025 - Aug 2025',
    role: 'Data Science Intern',
    org: 'Prodigy InfoTech',
    desc: 'Conducted exploratory data analysis, preprocessing, and visualization. Identified trends and correlations through statistical techniques. Evaluated machine learning models using accuracy, precision, recall, and F1-score metrics.',
  },
  {
    date: 'Jun 2025 - Jul 2025',
    role: 'AI/ML Intern',
    org: 'Edunet Foundation',
    desc: 'Implemented ML algorithms using Python, TensorFlow, Keras, and Scikit-learn. Performed data preprocessing, feature engineering, and model evaluation. Built Streamlit dashboards for prediction visualization and sentiment analysis.',
  },
]

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '80px 4%' }}>
      <div className="section-label">My Journey</div>
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800,
          marginBottom: '48px',
          lineHeight: 1.1,
        }}
      >
        Experience <span className="grad-text">&</span> Leadership
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center' }}>
        <div
          style={{
            position: 'relative',
            paddingLeft: '32px',
          }}
        >
          <div
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px',
              background: 'linear-gradient(to bottom, var(--violet), var(--pink))',
            }}
          />

          {EXPERIENCES.map((exp, i) => (
            <FadeUp key={exp.role} delay={i * 0.15}>
              <div style={{ position: 'relative', marginBottom: '48px' }}>
                <div
                  style={{
                    position: 'absolute', left: '-38px', top: '4px',
                    width: '14px', height: '14px',
                    borderRadius: '50%', background: 'var(--violet)',
                    boxShadow: '0 0 12px var(--violet), 0 0 24px rgba(37,99,235,0.22)',
                    border: '2px solid var(--bg)',
                  }}
                />
                <div style={{ fontSize: '12px', color: 'var(--violet)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  {exp.date}
                </div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
                  {exp.role}
                </div>
                <div style={{ color: 'var(--pink)', fontSize: '14px', marginBottom: '12px' }}>
                  {exp.org}
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8, maxWidth: '640px' }}>
                  {exp.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
