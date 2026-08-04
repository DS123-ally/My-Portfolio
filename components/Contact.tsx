'use client'

import FadeUp from './FadeUp'

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dinesh-seervi-00418532b/' },
  { label: 'GitHub', href: 'https://github.com/DS123-ally' },
  { label: 'Phone', href: 'tel:+919699623993' },
  { label: 'Twitter', href: 'https://x.com/DineshSeer40336' },
]

export default function Contact() {
  return (
    <section id="contact">
      <FadeUp>
        <div className="contact-panel">
          <div>
            <div className="section-label">Contact</div>
            <h2>Let&apos;s Build Something</h2>
            <p>
              Open to research collaborations, internships, and building things that matter.
            </p>
          </div>

          <div className="contact-panel__actions">
            <a href="mailto:dineshseervi1208@gmail.com" className="contact-panel__email">
              dineshseervi1208@gmail.com
            </a>
            <div className="contact-panel__links">
              {LINKS.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
