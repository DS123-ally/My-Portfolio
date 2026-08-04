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
    name: 'Agentic Blog Gen System',
    subtitle: 'AI-driven structured blog post generator',
    desc: 'Built an AI-driven application to generate structured and SEO-friendly blog posts automatically. Designed a responsive frontend using Next.js and Tailwind CSS with Firebase authentication.',
    features: ['SEO-friendly generation', 'Next.js + Tailwind frontend', 'Firebase Auth', 'FastAPI backend', 'LangGraph workflows'],
    tech: ['Next.js', 'FastAPI', 'LangGraph', 'Firebase', 'Groq LLM'],
    tags: ['Generative AI', 'Full Stack', 'Content Automation'],
    github: 'https://github.com/DS123-ally/Agentic_BlogGeneration',
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

              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                View repository
              </a>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
