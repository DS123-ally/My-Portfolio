'use client'

import FadeUp from './FadeUp'

const LINKS = [
  { label: 'Email', value: 'dineshseervi1208@gmail.com', href: 'mailto:dineshseervi1208@gmail.com' },
  { label: 'LinkedIn', value: 'dinesh-seervi', href: 'https://www.linkedin.com/in/dinesh-seervi-00418532b/' },
  { label: 'GitHub', value: 'DS123-ally', href: 'https://github.com/DS123-ally' },
  { label: 'Phone', value: '+91 96996 23993', href: 'tel:+919699623993' },
]

export default function Contact() {
  return (
    <section id="contact">
      <FadeUp>
        <div className="contact-section">
          <div className="contact-section__header">
            <div>
              <div className="section-label">Contact</div>
              <h2>Open to internships, research, and AI collaborations.</h2>
            </div>
            <p>
              Reach out for AI/ML internships, research collaborations, open-source work, or project ideas that need
              thoughtful execution.
            </p>
          </div>

          <div className="contact-section__grid">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} className="contact-card">
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
