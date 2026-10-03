export type Project = {
  title: string
  blurb: string
  stack: string[]
  year: string
  image?: string
  links: { live?: string; source?: string }
}

export const site = {
  name: 'Dinesh Seervi',
  firstName: 'Dinesh',
  initials: 'DS',
  location: 'Pune, India',
  timezone: 'Asia/Kolkata',
  email: 'dineshseervi1208@gmail.com',
  phone: '+91 96996 23993',
  phoneHref: 'tel:+919699623993',
  photo: '/profile.jpg',
  resume: '/resume.pdf',
  githubUser: 'DS123-ally',
  socials: {
    github: 'https://github.com/DS123-ally',
    linkedin: 'https://www.linkedin.com/in/dinesh-seervi-00418532b/',
    email: 'mailto:dineshseervi1208@gmail.com',
  },
  about: [
    'I’m a computer science student at AISSMS IOIT, Pune, building at the intersection of machine learning, retrieval, and agentic workflows.',
    'What I care about is practical intelligence: systems that find the right context, make a useful decision, and turn a vague task into something a person can actually ship.',
    'I’m open to internships, research collaborations, and engineering work where models have to hold up outside a demo.',
  ],
  projects: [
    {
      title: 'AI Research Agent',
      blurb: 'A graph-based research system that retrieves sources, synthesizes findings, and writes a cited report from a vague question.',
      stack: ['Python', 'LangGraph', 'LangChain', 'Streamlit'],
      year: '2026',
      image: '/projects/ai-research-agent.png',
      links: { source: 'https://github.com/DS123-ally/AI-Research-Agent' },
    },
    {
      title: 'PDForge',
      blurb: 'A private PDF workspace that organizes, converts, and edits files in the browser, with no upload and no account.',
      stack: [],
      year: '2026',
      image: '/projects/pdforge.png',
      links: {},
    },
    {
      title: 'Rahasya',
      blurb: 'A gamified language platform: a third-person street you walk through ten Indian languages.',
      stack: [],
      year: '2026',
      image: '/projects/rahasya.png',
      links: {},
    },
    {
      title: 'AI Auto Interview',
      blurb: 'An interview simulator that asks questions, transcribes spoken answers, and scores both technical content and delivery.',
      stack: ['Python', 'RAG', 'Speech AI', 'Streamlit'],
      year: '2025',
      image: '/projects/ai-auto-interview.jpg',
      links: { source: 'https://github.com/DS123-ally/AI-powered-interview-model' },
    },
    {
      title: 'Web Summarizer',
      blurb: 'A retrieval tool that embeds pages and PDFs, then answers questions from the source instead of asking you to read it first.',
      stack: ['LangChain', 'Groq', 'Vector DB', 'RAG'],
      year: '2025',
      image: '/projects/web-summarizer.png',
      links: { source: 'https://github.com/DS123-ally/Web_Summarizer-using-Langchain-Groq' },
    },
  ] as Project[],
  skills: [
    'Python',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'React',
    'FastAPI',
    'Streamlit',
    'Firebase',
    'LangChain',
    'LangGraph',
    'RAG',
    'Groq',
    'Pandas',
    'NumPy',
    'Scikit-learn',
    'TensorFlow',
    'AWS',
    'GCP',
  ],
  skillGroups: {
    Languages: ['Python', 'JavaScript', 'TypeScript'],
    Frontend: ['Next.js', 'React', 'Streamlit'],
    Backend: ['FastAPI', 'Firebase'],
    'AI & Data': ['LangChain', 'LangGraph', 'RAG', 'Groq', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'],
    Cloud: ['AWS', 'GCP'],
  } as Record<string, string[]>,
  experience: [
    {
      period: 'Mar 2026 — Present',
      role: 'Open Source Contributor',
      org: 'GirlScript Summer of Code',
      blurb: 'Resolving issues and tightening documentation so collaborative repositories stay easier to maintain.',
    },
    {
      period: 'Jul 2025 — Aug 2025',
      role: 'Data Science Intern',
      org: 'Prodigy InfoTech',
      blurb: 'Explored datasets visually and compared models on accuracy, precision, recall, and F1-score.',
    },
    {
      period: 'Jun 2025 — Jul 2025',
      role: 'AI / ML Intern',
      org: 'Edunet Foundation',
      blurb: 'Built TensorFlow and Scikit-learn workflows, then surfaced predictions in Streamlit dashboards.',
    },
  ],
  recognition: [
    { label: 'Hackathon winner', detail: 'Shipped an AI solution under a time box with a team.' },
    { label: '8+ hackathons', detail: 'Across AI, machine learning, web, and open source.' },
    {
      label: 'OCI AI Foundations',
      detail: 'Oracle Cloud Infrastructure · 2025',
      href: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=60126C04B7C8518BACB6BB8948D459B3864CC1C93BE4327AA507E61912123E7D',
    },
    {
      label: 'HackerRank',
      detail: 'Verified programming and problem solving.',
      href: 'https://www.hackerrank.com/certificates/ba9a1180bc43',
    },
  ],
}
