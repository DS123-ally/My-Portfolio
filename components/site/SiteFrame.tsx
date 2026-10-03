'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Search } from 'lucide-react'
import { site } from '@/lib/site'
import { CommandPalette } from '@/components/site/CommandPalette'
import { GithubHeatmap } from '@/components/site/GithubHeatmap'
import { PullCord } from '@/components/site/PullCord'

const NAV = [
  { label: 'home', href: '#top' },
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'blog', href: '#blog' },
  { label: 'tech stack', href: '#skills' },
  { label: 'experience', href: '#experience' },
  { label: 'contact', href: '#contact' },
]

const SKILL_TABS = ['All', 'Languages', 'Frontend', 'Backend', 'AI & Data', 'Cloud']

export default function SiteFrame() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [skillTab, setSkillTab] = useState('All')
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    const next = stored === 'light' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('light', next === 'light')
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: site.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date())
    setClock(format())
    const id = window.setInterval(() => setClock(format()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let x = -40
    let y = -40
    let rx = -40
    let ry = -40
    let frame = 0
    const paint = () => {
      dot.style.transform = `translate(${x - 2.5}px, ${y - 2.5}px)`
      ring.style.transform = `translate(${rx - 13}px, ${ry - 13}px)`
    }
    const loop = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      paint()
      frame = requestAnimationFrame(loop)
    }
    const move = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      dot.style.opacity = '1'
      ring.style.opacity = '0.28'
      const target = event.target
      const hot = target instanceof Element && !!target.closest('a, button, input')
      ring.style.width = hot ? '36px' : '26px'
      ring.style.height = hot ? '36px' : '26px'
    }
    document.documentElement.classList.add('cursor-on')
    document.addEventListener('mousemove', move)
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('cursor-on')
    }
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('light', next === 'light')
    window.localStorage.setItem('theme', next)
  }

  const skills = useMemo(() => {
    if (skillTab === 'All') return site.skills
    return site.skillGroups[skillTab] ?? []
  }, [skillTab])

  const contacts = [
    { label: 'GitHub', href: site.socials.github },
    { label: 'LinkedIn', href: site.socials.linkedin },
    { label: 'Mail', href: site.socials.email },
    { label: 'Phone', href: site.phoneHref },
    { label: 'Resume', href: site.resume },
  ]

  return (
    <div className="atmosphere pb-16 font-sans text-[var(--fg)]">
      <div id="cursor-dot" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
      <PullCord onToggle={toggleTheme} />
      <header className="relative z-20">
        <div className="shell flex items-center justify-end gap-4 px-6 py-5 sm:px-8">
          <nav aria-label="Primary" className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-[13px] text-[var(--muted)]">
            {NAV.map((link) => (
              <a key={link.href} href={link.href} className="nav-link py-1 lowercase hover:text-[var(--fg)]">
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open search"
            className="grid size-7 place-items-center text-[var(--muted)] hover:text-[var(--fg)]"
          >
            <Search className="size-3.5" />
          </button>
        </div>
      </header>

      <main id="top" className="relative z-10">
        <section className="shell px-6 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="hero-title font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                Hi, <span className="hero-name italic">{site.firstName}</span> Here
              </h1>
              <p className="mt-3 font-mono text-sm tracking-[0.12em] text-[var(--muted)]">{site.location}</p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={() => setPaletteOpen(true)}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)]"
                >
                  <Search size={14} />
                  Explore the site
                  <span className="text-[var(--soft)]">Ctrl K</span>
                </button>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)]"
                >
                  Resume
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
            <div className="relative size-28 shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-[var(--card)] sm:size-36">
              <Image
                src={site.photo}
                alt={site.name}
                fill
                priority
                sizes="144px"
                className="object-cover object-[center_18%]"
              />
            </div>
          </div>
        </section>

        <section id="about">
          <SectionTitle href="#about">About</SectionTitle>
          <div className="shell min-h-24 px-6 py-7 sm:px-8">
            <ul className="max-w-2xl space-y-5">
              {site.about.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="text-[var(--soft)]">•</span>
                  <p className="project-copy text-base leading-7">{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projects">
          <SectionTitle href="#projects" aside="( selected systems )">Projects</SectionTitle>
          <div className="shell-narrow px-6 pb-8 pt-2 sm:px-8">
            <div className="divide-y divide-[var(--line)]">
              {site.projects.map((project) => (
                <article key={project.title} className="py-10 sm:py-14">
                  <div className="overflow-hidden rounded-[5px] border border-[var(--line)] bg-[var(--card)]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        width={1600}
                        height={748}
                        sizes="(min-width: 768px) 512px, 100vw"
                        className="h-auto w-full"
                      />
                    ) : (
                      <div className="flex aspect-[16/9] items-end p-6">
                        <span className="font-serif text-4xl text-[var(--soft)] sm:text-5xl">{project.title}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
                    <h4 className="font-serif text-2xl sm:text-3xl">{project.title}</h4>
                    <span className="font-mono text-xs text-[var(--soft)]">{project.year}</span>
                  </div>
                  <p className="project-copy mt-3 max-w-2xl text-base leading-7">{project.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[13px]">
                    {project.stack.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => setActiveTech(activeTech === tech ? null : tech)}
                        className={activeTech === tech ? 'text-[var(--fg)]' : 'project-copy hover:text-[var(--fg)]'}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                  {(project.links.live || project.links.source) && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)]"
                        >
                          Live
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                      {project.links.source && (
                        <a
                          href={project.links.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)]"
                        >
                          GitHub
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="blog">
          <SectionTitle href="#blog">Blog</SectionTitle>
          <div className="shell px-6 py-6 sm:px-8">
            {site.posts.length > 0 && (
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {site.posts.map((post) => (
                  <li key={post.title}>
                    <a
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid gap-2 py-6 hover:text-[var(--fg)] sm:grid-cols-[88px_1fr_auto] sm:items-baseline"
                    >
                      <p className="font-mono text-xs text-[var(--soft)]">{post.date}</p>
                      <div>
                        <h3 className="font-serif text-2xl">{post.title}</h3>
                        {post.blurb && <p className="project-copy mt-3 max-w-xl text-base leading-7">{post.blurb}</p>}
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)]">
                        Read
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section id="skills">
          <SectionTitle href="#skills" aside="( select tab to filter )">Tech Stack</SectionTitle>
          <div className="shell px-6 py-6 sm:px-8">
            <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
              {SKILL_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSkillTab(tab)}
                  className={`rounded-md px-3 py-1.5 text-[12px] ${
                    skillTab === tab ? 'bg-[var(--fg)] font-semibold text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <SectionTitle href="#experience">Experience</SectionTitle>
          <div className="shell px-6 py-6 sm:px-8">
            <ul className="divide-y divide-[var(--line)]">
              {site.experience.map((item) => (
                <li key={item.role + item.org} className="grid gap-2 py-6 sm:grid-cols-[160px_1fr]">
                  <p className="font-mono text-xs text-[var(--soft)]">{item.period}</p>
                  <div>
                    <h3 className="font-serif text-2xl">{item.role}</h3>
                    <p className="mt-1 font-mono text-xs text-[var(--muted)]">{item.org}</p>
                    <p className="project-copy mt-3 max-w-xl text-base leading-7">{item.blurb}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-10 font-mono text-sm uppercase tracking-[0.12em] text-[var(--soft)]">Recognition</h3>
            <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {site.recognition.map((item) => {
                const inner = (
                  <>
                    <span className="font-serif text-xl">{item.label}</span>
                    <span className="project-copy text-sm">{item.detail}</span>
                  </>
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 py-4 hover:text-[var(--fg)] sm:flex-row sm:items-baseline sm:justify-between">
                        {inner}
                      </a>
                    ) : (
                      <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <GithubHeatmap />

        <section id="contact">
          <SectionTitle href="#contact">Contact</SectionTitle>
          <div className="shell">
            <div className="grid grid-cols-2 border-b border-[var(--line)] sm:grid-cols-5 sm:border-b-0">
              {contacts.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') || item.href.endsWith('.pdf') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 border-[var(--line)] px-3 py-4 text-[13px] text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)] ${
                    index < contacts.length - 1 ? 'sm:border-r' : ''
                  } ${index % 2 === 0 ? 'border-r sm:border-r' : ''} border-b sm:border-b-0`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-14 border-t border-[var(--line)]">
        <div className="shell flex items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <p className="font-mono text-[11px] tracking-wide text-[var(--muted)]">© {new Date().getFullYear()} {site.name}</p>
          <button type="button" onClick={toggleTheme} className="font-mono text-[11px] text-[var(--soft)] hover:text-[var(--fg)]">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <time className="font-mono text-[11px] tabular-nums text-[var(--muted)]">{clock || 'IST'}</time>
        </div>
      </footer>

      <CommandPalette
        open={paletteOpen}
        theme={theme}
        onClose={() => setPaletteOpen(false)}
        onToggleTheme={toggleTheme}
      />
    </div>
  )
}

function SectionTitle({
  href,
  children,
  aside,
  className = 'shell',
}: {
  href: string
  children: string
  aside?: string
  className?: string
}) {
  return (
    <div className={`${className} bg-[var(--bg)] px-6 py-3 sm:px-8`}>
      <div className="flex items-center justify-between gap-4">
        <a href={href} className="section-link font-serif text-2xl tracking-wide">
          {children}
        </a>
        {aside && <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">{aside}</span>}
      </div>
    </div>
  )
}
