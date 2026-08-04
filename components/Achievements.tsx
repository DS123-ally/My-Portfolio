'use client'

import FadeUp from './FadeUp'

const ACHIEVEMENTS = [
  {
    category: 'Hackathon',
    title: 'Hackathon Winner',
    event: 'Hackathon Competition',
    year: '',
    desc: 'Winner of 1 Hackathon competition by developing innovative AI-based solutions in a collaborative team environment.',
    link: '#',
  },
  {
    category: 'Competition',
    title: 'Participated in 8+ Hackathons',
    event: 'Various Competitions',
    year: '',
    desc: 'Participated in 8+ hackathons focused on AI, Machine Learning, Web Development, and Open Source technologies.',
    link: '#',
  },
  {
    category: 'Certification',
    title: 'OCI 2025 AI Foundations Associate',
    event: 'Oracle',
    year: '2025',
    desc: 'Oracle Cloud Infrastructure (OCI) AI Foundations certification covering fundamental concepts of AI and machine learning.',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=60126C04B7C8518BACB6BB8948D459B3864CC1C93BE4327AA507E61912123E7D',
  },
  {
    category: 'Certification',
    title: 'HackerRank Skill Certificate',
    event: 'HackerRank',
    year: '',
    desc: 'Verified programming skills and problem-solving abilities on the HackerRank platform.',
    link: 'https://www.hackerrank.com/certificates/ba9a1180bc43',
  },
]

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="section-label">Recognition</div>
      <h2>Achievements & Awards</h2>
      <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px', maxWidth: '620px' }}>
        A short record of competitions, certifications, and practical recognition.
      </p>

      <div className="achievement-list">
        {ACHIEVEMENTS.map((item, index) => (
          <FadeUp key={item.title + item.event} delay={index * 0.05}>
            <a href={item.link} className="achievement-item">
              <span>{item.category}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{[item.event, item.year].filter(Boolean).join(' / ')}</p>
              </div>
              <p>{item.desc}</p>
            </a>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
