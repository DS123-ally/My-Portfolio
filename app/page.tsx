import Image from 'next/image'
import { ArrowUpRight, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ChatBot from '@/components/ChatBot'

const PROJECTS = [
  {
    index: '01',
    name: 'AI Research Agent',
    eyebrow: 'Agentic research automation',
    summary: 'A graph-based research system that retrieves information, synthesizes findings, and generates structured documents.',
    outcome: 'Turns open-ended research prompts into traceable, organized outputs.',
    tags: ['Python', 'LangGraph', 'LangChain', 'Streamlit'],
    github: 'https://github.com/DS123-ally/AI-Research-Agent',
    tone: 'blue',
    featured: true,
  },
  {
    index: '02',
    name: 'Agentic Blog Gen',
    eyebrow: 'Full-stack content workflow',
    summary: 'An AI writing workflow for generating structured, SEO-ready articles with authentication and a responsive interface.',
    outcome: 'Coordinates research, drafting, and formatting through a multi-step agent flow.',
    tags: ['Next.js', 'FastAPI', 'Firebase', 'LangGraph'],
    github: 'https://github.com/DS123-ally/Agentic_BlogGeneration',
    tone: 'ink',
    featured: false,
  },
  {
    index: '03',
    name: 'AI Auto Interview',
    eyebrow: 'Speech + evaluation system',
    summary: 'An intelligent interview simulator that transcribes responses and evaluates technical and communication performance.',
    outcome: 'Creates a repeatable practice loop with feedback grounded in each answer.',
    tags: ['Python', 'RAG', 'Speech AI', 'Streamlit'],
    github: 'https://github.com/DS123-ally/AI-powered-interview-model',
    tone: 'paper',
    featured: false,
  },
  {
    index: '04',
    name: 'Web Summarizer',
    eyebrow: 'RAG-powered knowledge tool',
    summary: 'A web and document summarizer built with embeddings, vector search, and retrieval-augmented generation.',
    outcome: 'Makes long-form sources easier to query, understand, and reuse.',
    tags: ['LangChain', 'Groq', 'Vector DB', 'RAG'],
    github: 'https://github.com/DS123-ally/Web_Summarizer-using-Langchain-Groq',
    tone: 'green',
    featured: false,
  },
]

const CAPABILITIES = [
  {
    number: 'A',
    title: 'AI Engineering',
    copy: 'I design retrieval pipelines, agent graphs, evaluation loops, and LLM-powered product workflows.',
    skills: ['Python', 'LangChain', 'LangGraph', 'RAG', 'Vector databases', 'Groq'],
  },
  {
    number: 'B',
    title: 'Product Development',
    copy: 'I turn model capabilities into usable interfaces, APIs, and end-to-end web applications.',
    skills: ['Next.js', 'React', 'JavaScript', 'FastAPI', 'Streamlit', 'Firebase'],
  },
  {
    number: 'C',
    title: 'Data & Cloud',
    copy: 'I explore data, build ML experiments, and work with the infrastructure needed to ship them.',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'AWS', 'GCP'],
  },
]

const EXPERIENCE = [
  {
    date: 'MAR 2026 — PRESENT',
    role: 'Open Source Contributor',
    org: 'GirlScript Summer of Code',
    points: ['Resolve issues and improve project features in collaborative repositories.', 'Strengthen documentation, debugging, and maintainability across contributions.'],
  },
  {
    date: 'JUL 2025 — AUG 2025',
    role: 'Data Science Intern',
    org: 'Prodigy InfoTech',
    points: ['Analyzed and visualized datasets to uncover meaningful patterns.', 'Compared ML models using accuracy, precision, recall, and F1-score.'],
  },
  {
    date: 'JUN 2025 — JUL 2025',
    role: 'AI / ML Intern',
    org: 'Edunet Foundation',
    points: ['Built ML workflows with TensorFlow, Keras, and Scikit-learn.', 'Created Streamlit dashboards for prediction and sentiment-analysis results.'],
  },
]

function SectionHeader({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy: string }) {
  return (
    <header className="section-heading">
      <div className="section-code"><span>{index}</span>{eyebrow}</div>
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </header>
  )
}

function ProjectVisual({ tone, index }: { tone: string; index: string }) {
  return (
    <div className={`project-visual project-visual--${tone}`} aria-hidden="true">
      <div className="visual-toolbar"><i /><i /><i /><span>system_{index}.ai</span></div>
      <div className="visual-canvas">
        <div className="visual-sidebar"><i /><i /><i /><i /></div>
        <div className="visual-flow">
          <span>INPUT</span><b>→</b><span>RETRIEVE</span><b>→</b><span>REASON</span><b>→</b><span>OUTPUT</span>
        </div>
        <div className="visual-output">
          <span>STATUS / COMPLETE</span>
          <i /><i /><i />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <section className="neo-hero" aria-labelledby="hero-title">
          <div className="neo-card hero-intro motion-in">
            <div className="card-kicker"><span>01</span> Portfolio / 2026</div>
            <h1 id="hero-title">I build AI systems that turn complex work into useful products.</h1>
            <p>
              I&apos;m <strong>Dinesh Seervi</strong>, an AI developer and computer science student focused on
              agentic workflows, RAG, and practical machine learning.
            </p>
            <div className="hero-actions">
              <a className="neo-button neo-button--primary" href="#projects">Explore selected work <span>↘</span></a>
              <a className="neo-button" href="https://shy-violet-751.linkyhost.com" target="_blank" rel="noreferrer">View résumé <span>↗</span></a>
            </div>
          </div>

          <div className="neo-card hero-photo motion-in motion-in--delay">
            <div className="photo-label"><span>AI / ML Engineer</span><span>Pune, IN</span></div>
            <div className="photo-frame"><Image src="/profile.jpg" alt="Dinesh Seervi" fill priority sizes="(max-width: 760px) 100vw, 38vw" /></div>
          </div>

          <div className="neo-card hero-status motion-in">
            <span className="status-dot" aria-hidden="true" />
            <div><span className="micro-label">CURRENT STATUS</span><strong>Open to internships & AI collaborations</strong></div>
          </div>

          <div className="neo-card hero-focus motion-in">
            <span className="micro-label">CURRENTLY EXPLORING</span>
            <strong>Agentic AI × Cloud</strong>
            <div className="signal-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </div>
        </section>

        <section id="projects" className="page-section">
          <SectionHeader index="02" eyebrow="Selected systems" title="Work built to solve, not just demonstrate." copy="A focused set of AI products showing how I think across retrieval, orchestration, interface design, and delivery." />
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <article key={project.name} className={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
                <ProjectVisual tone={project.tone} index={project.index} />
                <div className="project-content">
                  <div className="project-topline"><span>{project.index}</span><span>{project.eyebrow}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="project-outcome"><span>WHY IT MATTERS</span><strong>{project.outcome}</strong></div>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a className="text-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.name} repository`}>View repository <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="page-section">
          <SectionHeader index="03" eyebrow="Capabilities" title="An engineering toolkit, organized by outcomes." copy="The technologies matter; what I can assemble with them matters more." />
          <div className="capability-grid">
            {CAPABILITIES.map((capability) => (
              <article className="capability-card" key={capability.title}>
                <span className="capability-number">{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
                <div className="tag-row">{capability.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="page-section">
          <SectionHeader index="04" eyebrow="Experience" title="Learning in public. Shipping in teams." copy="A timeline of applied work across open source, data science, and machine learning." />
          <div className="experience-list">
            {EXPERIENCE.map((item, index) => (
              <article className="experience-row" key={item.role + item.org}>
                <div className="experience-index">0{index + 1}</div>
                <time>{item.date}</time>
                <div className="experience-role"><h3>{item.role}</h3><p>{item.org}</p></div>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="page-section">
          <SectionHeader index="05" eyebrow="Recognition" title="Signals of momentum." copy="Competitions, credentials, and proof that the work extends beyond coursework." />
          <div className="metric-grid">
            <article className="metric-card metric-card--blue"><span>01</span><strong>1×</strong><h3>Hackathon winner</h3><p>Built an AI solution in a collaborative, time-boxed environment.</p></article>
            <article className="metric-card"><span>02</span><strong>8+</strong><h3>Hackathons</h3><p>Across AI, machine learning, web development, and open source.</p></article>
            <a className="metric-card" href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=60126C04B7C8518BACB6BB8948D459B3864CC1C93BE4327AA507E61912123E7D" target="_blank" rel="noreferrer"><span>03 ↗</span><strong>OCI</strong><h3>AI Foundations</h3><p>Oracle Cloud Infrastructure certification · 2025.</p></a>
            <a className="metric-card metric-card--ink" href="https://www.hackerrank.com/certificates/ba9a1180bc43" target="_blank" rel="noreferrer"><span>04 ↗</span><strong>HR</strong><h3>Verified skills</h3><p>HackerRank programming and problem-solving certificate.</p></a>
          </div>
        </section>

        <section id="about" className="page-section">
          <SectionHeader index="06" eyebrow="About" title="The person behind the systems." copy="My background, what drives the work, and the direction I am building toward." />
          <div className="about-grid">
            <div className="about-statement">
              <span className="micro-label">THE THROUGH-LINE</span>
              <h3>I&apos;m interested in the point where models become useful products.</h3>
              <div className="about-mark" aria-hidden="true">DS.</div>
            </div>
            <div className="about-copy">
              <p>I&apos;m pursuing a B.Tech in Computer Science Engineering at AISSMS IOIT, Pune. I build at the intersection of machine learning, data, and agentic workflows.</p>
              <p>What interests me most is practical intelligence: systems that retrieve the right context, make useful decisions, and help people move through complex work faster.</p>
              <dl>
                <div><dt>EDUCATION</dt><dd>B.Tech CSE · 2024–2028</dd></div>
                <div><dt>FOCUS</dt><dd>LLMs, RAG, LangGraph, AI products</dd></div>
                <div><dt>BASE</dt><dd>Pune, India · Open to remote</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-block">
          <div className="contact-copy">
            <div className="section-code"><span>07</span>Contact / available</div>
            <h2>Have an AI problem worth solving?</h2>
            <p>I&apos;m open to internships, research collaborations, open-source work, and ambitious engineering projects.</p>
          </div>
          <div className="contact-actions">
            <a className="contact-primary" href="mailto:dineshseervi1208@gmail.com">
              <span className="contact-icon"><Mail size={20} strokeWidth={2.2} aria-hidden="true" /> Email</span>
              <strong>dineshseervi1208@gmail.com <ArrowUpRight size={20} aria-hidden="true" /></strong>
            </a>
            <a href="https://github.com/DS123-ally" target="_blank" rel="noreferrer">
              <span className="contact-icon"><i className="brand-glyph" aria-hidden="true">GH</i> GitHub</span>
              <strong>DS123-ally <ArrowUpRight size={20} aria-hidden="true" /></strong>
            </a>
            <a href="https://www.linkedin.com/in/dinesh-seervi-00418532b/" target="_blank" rel="noreferrer">
              <span className="contact-icon"><i className="brand-glyph brand-glyph--linkedin" aria-hidden="true">in</i> LinkedIn</span>
              <strong>dinesh-seervi <ArrowUpRight size={20} aria-hidden="true" /></strong>
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer"><span>© 2026 Dinesh Seervi</span><span>Build By Dinesh Seervi</span><a href="#top">Back to top ↑</a></footer>
      <ChatBot />
    </>
  )
}
