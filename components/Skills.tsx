'use client'

import FadeUp from './FadeUp'

const logoMap: Record<string, string> = {
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'GitHub': 'https://img.icons8.com/ios-filled/50/ffffff/github.png',
  'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'Jupyter Notebook': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'GCP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'Machine Learning': 'https://img.icons8.com/fluency/48/000000/artificial-intelligence.png',
  'Deep Learning': 'https://img.icons8.com/fluency/48/000000/brain.png',
  'LangChain': 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
  'Streamlit': 'https://streamlit.io/images/brand/streamlit-mark-color.svg',
  'Google Colab': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg'
}

const SKILL_GROUPS = [
  {
    title: 'Programming Languages',
    chips: ['Python', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'React'],
  },
  {
    title: 'AI / ML',
    chips: [
      'Machine Learning', 'Deep Learning', 'LLMs', 'LangChain',
      'LangGraph', 'RAG', 'Vector Databases',
    ],
  },
  {
    title: 'Data Science',
    chips: ['Pandas', 'NumPy', 'Tableau', 'Data Visualization'],
  },
  {
    title: 'Tools & Platforms',
    chips: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Google Colab', 'Streamlit', 'AWS', 'GCP'],
  },
  {
    title: 'Spoken Languages',
    chips: ['English', 'Hindi', 'Marathi'],
  },
]

function Chip({ label }: { label: string }) {
  const iconUrl = logoMap[label];
  return (
    <span
      style={{
        padding: '7px 16px',
        borderRadius: '100px',
        fontSize: '13px',
        border: '1px solid var(--border)',
        color: 'var(--muted)',
        background: 'var(--card)',
        transition: 'all 0.2s',
        cursor: 'default',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--violet)'
        e.currentTarget.style.color = 'var(--violet)'
        e.currentTarget.style.background = 'rgba(168,85,247,0.08)'
        e.currentTarget.style.boxShadow = '0 0 16px rgba(168,85,247,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--muted)'
        e.currentTarget.style.background = 'var(--card)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {iconUrl && <img src={iconUrl} alt={label} style={{ width: '16px', height: '16px', objectFit: 'contain' }} />}
      {label}
    </span>
  )
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '80px 4%' }}>
      <div className="section-label">Capabilities</div>
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800,
          marginBottom: '24px',
          lineHeight: 1.1,
        }}
      >
        Tech <span className="grad-text">Stack</span>
      </h2>



      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {SKILL_GROUPS.map((group, gi) => (
            <FadeUp key={group.title} delay={gi * 0.08}>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                {group.title}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {group.chips.map((chip) => (
                  <Chip key={chip} label={chip} />
                ))}
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Code Editor Mockup */}
        <FadeUp delay={0.2}>
          <div style={{
            background: '#0d1117',
            borderRadius: '12px',
            border: '1px solid #30363d',
            overflow: 'hidden',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '14px',
            boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
            position: 'relative',
            width: '100%',
            maxWidth: '550px',
            margin: '0 auto'
          }}>
            {/* macOS window controls */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px', background: '#161b22', borderBottom: '1px solid #30363d', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <div style={{ flex: 1, textAlign: 'center', color: '#8b949e', fontSize: '13px', marginLeft: '-44px' }}>
                dinesh_ml.py — Python 3.11
              </div>
            </div>
            
            {/* Code lines */}
            <div style={{ padding: '24px', color: '#c9d1d9', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre' }}>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>1</span><span style={{ color: '#8b949e', fontStyle: 'italic' }}># Agentic AI & Cloud Portfolio</span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>2</span><span><span style={{ color: '#c678dd' }}>import</span> <span style={{ color: '#56b6c2' }}>numpy</span> <span style={{ color: '#c678dd' }}>as</span> <span style={{ color: '#56b6c2' }}>np</span></span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>3</span><span><span style={{ color: '#c678dd' }}>import</span> <span style={{ color: '#56b6c2' }}>pandas</span> <span style={{ color: '#c678dd' }}>as</span> <span style={{ color: '#56b6c2' }}>pd</span></span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>4</span><span><span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#56b6c2' }}>sklearn</span> <span style={{ color: '#c678dd' }}>import</span> <span style={{ color: '#56b6c2' }}>models</span></span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>5</span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>6</span><span><span style={{ color: '#c678dd' }}>class</span> <span style={{ color: '#56b6c2' }}>Developer</span>:</span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>7</span><span>    <span style={{ color: '#c678dd' }}>def</span> <span style={{ color: '#56b6c2' }}>__init__</span>(<span style={{ color: '#56b6c2' }}>self</span>):</span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>8</span><span>        <span style={{ color: '#56b6c2' }}>self</span>.name = <span style={{ color: '#98c379' }}>"Dinesh Seervi"</span></span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>9</span><span>        <span style={{ color: '#56b6c2' }}>self</span>.focus = <span style={{ color: '#98c379' }}>"Agentic AI & Cloud"</span></span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>10</span><span>        <span style={{ color: '#56b6c2' }}>self</span>.skills = [<span style={{ color: '#98c379' }}>"Python"</span>, <span style={{ color: '#98c379' }}>"C++"</span>, <span style={{ color: '#98c379' }}>"ML"</span>]</span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>11</span><span>        <span style={{ color: '#56b6c2' }}>self</span>.status = <span style={{ color: '#98c379' }}>"open_to_learn"</span></span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>12</span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>13</span><span>    <span style={{ color: '#c678dd' }}>def</span> <span style={{ color: '#56b6c2' }}>build</span>(<span style={{ color: '#56b6c2' }}>self</span>, <span style={{ color: '#56b6c2' }}>idea</span>):</span></div>
              <div style={{ display: 'flex' }}><span style={{ width: '30px', flexShrink: 0, textAlign: 'right', paddingRight: '16px', color: '#4b5263' }}>14</span><span>        <span style={{ color: '#c678dd' }}>return</span> <span style={{ color: '#98c379' }}>"shipped 🚀"</span></span></div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
