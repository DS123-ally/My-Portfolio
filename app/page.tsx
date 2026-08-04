import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <footer
        style={{
          textAlign: 'center',
          padding: '24px',
          color: 'var(--muted)',
          fontSize: '13px',
          borderTop: '1px solid var(--border)',
          letterSpacing: '0.04em',
        }}
      >
        © 2025 Dinesh Seervi &nbsp;·&nbsp; Pune, India &nbsp;·&nbsp; AI Developer
      </footer>
      <ChatBot />
    </>
  )
}
