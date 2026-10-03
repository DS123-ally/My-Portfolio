'use client'

import FadeUp from './FadeUp'

const PROJECTS = [
  {
    name: 'AI Research Agent',
    subtitle: 'AI-powered research automation',
    desc: 'Developed an AI-powered research automation system with graph-based workflows and document generation capabilities. Integrated LangChain and LangGraph for intelligent information retrieval and summarization workflows.',
    features: ['Graph-based workflows', 'Document generation', 'Intelligent information retrieval', 'Streamlit interactive UI'],
    tech: ['Python', 'LangGraph', 'LangChain', 'Streamlit'],
    tags: ['AI Agents', 'NLP', 'Automation'],
    github: 'https://github.com/DS123-ally/AI-Research-Agent',
  },
  {
    name: 'PDForge',
    subtitle: 'Private, in-browser PDF tools',
    desc: 'A PDF workspace that organizes, converts, and edits files locally in the browser, with no upload and no account.',
    features: ['Organize, convert, and edit PDFs', 'Files stay on the device', 'No account required'],
    tech: ['Next.js', 'TypeScript', 'pdf-lib', 'PDF.js'],
    tags: ['Privacy', 'Documents'],
    github: 'https://github.com/DS123-ally/PDFForge',
  },
  {
    name: 'Rahasya',
    subtitle: 'Voice-first language adventure',
    desc: 'A 3D street you walk through ten Indian languages, talking to NPCs with voice.',
    features: ['Ten Indian languages', 'Third-person street exploration', 'Sarvam voice pipeline'],
    tech: ['Next.js', 'Three.js', 'Sarvam AI', 'Supabase'],
    tags: ['Language', 'Learning'],
    github: 'https://github.com/DS123-ally/RAHASYA-Voice-Mystery-Adventure',
  },
  {
    name: 'AI-Powered Auto Interview',
    subtitle: 'Intelligent interview simulation platform',
    desc: 'Created an intelligent interview simulation platform for technical and behavioral assessments. Implemented speech transcription, response evaluation, and communication analysis using LLMs.',
    features: ['Speech transcription', 'Response evaluation', 'Communication analysis'],
    tech: ['Python', 'LangChain', 'RAG', 'Streamlit'],
    tags: ['RAG', 'Speech AI', 'EdTech'],
    github: 'https://github.com/DS123-ally/AI-powered-interview-model',
  },
  {
    name: 'Web Summarizer Application',
    subtitle: 'Document and webpage summarization',
    desc: 'Developed a web-based summarization tool using LangChain and Groq LLMs. Implemented Retrieval-Augmented Generation pipelines with embeddings and vector databases.',
    features: ['RAG pipelines', 'Embeddings & Vector DBs', 'Interactive Streamlit UI'],
    tech: ['Python', 'LangChain', 'RAG', 'Streamlit'],
    tags: ['RAG', 'Summarization', 'LLM'],
    github: 'https://github.com/DS123-ally/Web_Summarizer-using-Langchain-Groq',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-label">Selected work</div>
      <h2>Featured Projects</h2>
      <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px', maxWidth: '620px' }}>
        A focused selection of AI and data projects, covering research automation, content generation, interview simulation, and summarization workflows.
      </p>

      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <FadeUp key={project.name} delay={index * 0.05}>
            <article className="project-card">
              <div className="project-card__index">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <p className="project-card__subtitle">{project.subtitle}</p>
                <h3>{project.name}</h3>
              </div>
              <p className="project-card__desc">{project.desc}</p>

              <div className="project-card__block">
                <span>Key features</span>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-card__tags">
                {[...project.tech, ...project.tags].map((tag, tagIndex) => (
                  <span key={`${project.name}-${tag}-${tagIndex}`}>{tag}</span>
                ))}
              </div>

              {'github' in project && project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                  View repository
                </a>
              ) : null}
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
