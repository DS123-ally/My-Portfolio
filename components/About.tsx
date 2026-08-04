'use client'

import FadeUp from './FadeUp'

const FOCUS = [
  {
    label: 'Education',
    value: 'B.Tech CSE at AISSMS IOIT, Pune',
  },
  {
    label: 'Focus',
    value: 'LLMs, RAG systems, LangChain, and agentic AI workflows',
  },
  {
    label: 'Direction',
    value: 'Building practical AI tools that automate research and decision workflows',
  },
]

export default function About() {
  return (
    <section id="about">
      <FadeUp>
        <div className="about-section">
          <div className="about-section__intro">
            <div className="section-label">About</div>
            <h2>Computer science student building practical AI systems.</h2>
          </div>

          <div className="about-section__content">
            <p>
              I&apos;m <strong>Dinesh Seervi</strong>, a B.Tech Computer Science Engineering student at{' '}
              <strong>AISSMS Institute of Information Technology, Pune</strong> (Aug 2024 - May 2028).
              I work at the intersection of machine learning, data science, and agentic workflows.
            </p>
            <p>
              From contributing to open-source projects to building intelligent applications, I&apos;m drawn to work
              where code has real consequence. Currently, I&apos;m exploring LLMs, RAG systems, and LangChain to build
              tools that automate and enhance human capabilities.
            </p>

            <div className="about-section__facts">
              {FOCUS.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
