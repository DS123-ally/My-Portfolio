'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── KNOWLEDGE BASE ────────────────────────────────────────────────────────────
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/^(hi|hello|hey|yo|sup|howdy|hola|good (morning|evening|afternoon))/i],
    answer: "Hey there! 👋 I'm **Thala** — Dinesh's personal AI assistant. I can tell you all about Dinesh's background, projects, skills, achievements, and how to get in touch. What would you like to know?",
  },
  {
    patterns: [/who are you|what are you|your name|about (you|yourself)/i],
    answer: "I'm **Thala** — built for Dinesh Seervi's portfolio. I can answer questions about Dinesh's background, skills, projects, experience, achievements, and contact info. Try asking me something! 😊",
  },
  {
    patterns: [/who is dinesh|about dinesh|tell me about (him|dinesh)/i],
    answer: "**Dinesh Seervi** is a Pre-Final Year B.Tech Computer Engineering student at **AISSMS IOIT, Pune**.\n\nHe builds AI-powered systems focusing on machine learning, LangChain, and real-world impact. He's a hackathon winner 🏆, and currently exploring deep learning, explainable AI, and agentic workflows.",
  },
  {
    patterns: [/education|college|university|degree|btech|b\.tech|academic|study|studying|student/i],
    answer: "🎓 **Education**\n\n**B.Tech in Computer Engineering**\nAISSMS IOIT, Pune\nPre-Final Year student\n\nHis academic focus spans AI, machine learning, data science, and web development.",
  },
  {
    patterns: [/skill|tech stack|languages|framework|tool|platform|database|programming|know|expertise|technologies/i],
    answer: "💻 **Tech Stack**\n\n**Languages:** Python, C, C++, JavaScript, HTML, CSS, React\n\n**AI / ML:** Machine Learning, Deep Learning, LLMs, LangChain, LangGraph, RAG, Vector Databases\n\n**Tools:** Git, GitHub, VS Code, Jupyter, Streamlit, AWS, GCP",
  },
  {
    patterns: [/project|built|work|portfolio|what.*made|what.*created/i],
    answer: "🚀 **Dinesh's Featured Projects**\n\n1. 🤖 **AI Research Agent** — AI-powered research automation\n2. 📝 **Agentic Blog Gen System** — Automated multi-agent blog generation\n3. 🎤 **AI-Powered Auto Interview** — Interactive AI interview system\n4. 📄 **Web Summarizer Application** — URL content summarization\n\nWant details on any specific project? Just ask!",
  },
  {
    patterns: [/research agent/i],
    answer: "🤖 **AI Research Agent**\n\nAn AI-powered research automation system with graph-based workflows and document generation capabilities. Integrates web search and multi-agent systems.\n\n**Tech:** Python, LangChain, LangGraph, Streamlit",
  },
  {
    patterns: [/blog gen|blog generation/i],
    answer: "📝 **Agentic Blog Gen System**\n\nAutomated blog creation tool using a multi-agent workflow. Generates SEO-optimized content with FastAPI backend and Next.js frontend.\n\n**Tech:** Python, FastAPI, Next.js, Groq LLM",
  },
  {
    patterns: [/interview/i],
    answer: "🎤 **AI-Powered Auto Interview**\n\nAn interactive AI interview system that simulates real technical interviews using speech-to-text and AI response evaluation.\n\n**Tech:** Python, LangChain, Groq LLM, SpeechRecognition",
  },
  {
    patterns: [/summarizer|web summarizer/i],
    answer: "📄 **Web Summarizer Application**\n\nA web application that extracts and summarizes content from given URLs using advanced language models and vector databases for context retrieval.\n\n**Tech:** Python, LangChain, Streamlit, Groq LLM",
  },
  {
    patterns: [/experience|internship|work/i],
    answer: "💼 **Experience**\n\n• **AI/ML Intern** @ Edunet Foundation (IBM SkillsBuild)\n• **Machine Learning Intern** @ Prodigy InfoTech\n• **Open Source Contributor** @ GirlScript Summer of Code",
  },
  {
    patterns: [/achiev|award|win|hackathon|prize|medal|recognition|honor/i],
    answer: "🏆 **Achievements & Awards**\n\n🏆 **Winner** — Pragyantra Hackathon (First Prize)\n🏆 **Participated** — Internal Smart India Hackathon\n🏆 **Participated** — Avishkar 2024",
  },
  {
    patterns: [/email|mail|gmail|reach.*mail|contact.*email/i],
    answer: "📧 **Email Dinesh:**\n[dineshseervi1208@gmail.com](mailto:dineshseervi1208@gmail.com)\n\nHe's open to research collaborations, internships, and building things that matter!",
  },
  {
    patterns: [/phone|call|number|mobile|whatsapp/i],
    answer: "📞 **Phone / WhatsApp:**\n+91 96996 23993\n\nFeel free to reach out for collaborations or opportunities!",
  },
  {
    patterns: [/contact|hire|reach|get in touch|connect|collaboration|collab|opportunity|opportunit/i],
    answer: "📬 **Get in Touch with Dinesh**\n\n📧 **Email:** dineshseervi1208@gmail.com\n📞 **Phone:** +91 96996 23993\n💼 **LinkedIn:** [dinesh-seervi](https://www.linkedin.com/in/dinesh-seervi-00418532b/)\n💻 **GitHub:** [DS123-ally](https://github.com/DS123-ally)\n\nHe's open to research, internships, and collaborations! 🚀",
  },
  {
    patterns: [/available|availab|hiring|internship|job|looking for|open to/i],
    answer: "✅ **Currently Available for Opportunities!**\n\nDinesh is open to:\n• 🔬 Research collaborations\n• 💼 Internships (AI/ML focus)\n• 🚀 Building impactful projects\n\nReach him at: dineshseervi1208@gmail.com",
  },
  {
    patterns: [/bye|goodbye|see you|later|take care|thanks|thank you|thx|ty/i],
    answer: "Thanks for chatting! 💙 Feel free to come back anytime — I'm always here to help. Good luck, and don't forget to connect with Dinesh! 👋",
  },
]

const SUGGESTIONS = [
  "Who is Dinesh?",
  "Show me his projects",
  "What are his skills?",
  "How to contact him?",
  "His achievements 🏆",
]

function getAnswer(input: string): string {
  const trimmed = input.trim()
  for (const entry of KB) {
    if (entry.patterns.some(p => p.test(trimmed))) {
      return entry.answer
    }
  }
  return "Hmm, I'm not sure about that! 🤔 I can help with questions about Dinesh's **background, skills, projects, experience, achievements, or contact info**. Try one of the suggested questions below!"
}

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
    const rendered = parts.map((part, pi) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={pi} style={{ color: '#bae6fd', fontWeight: 700 }}>{part.slice(2, -2)}</strong>
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        return (
          <a key={pi} href={linkMatch[2]} target="_blank" rel="noopener noreferrer"
            style={{ color: '#38bdf8', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            {linkMatch[1]}
          </a>
        )
      }
      return <span key={pi}>{part}</span>
    })
    return <span key={li}>{rendered}{li < lines.length - 1 && <br />}</span>
  })
}

type Msg = { role: 'user' | 'bot'; text: string; id: number }

function BotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      role: 'bot',
      text: "Hi! I'm **Thala**, Dinesh's personal AI assistant. 👋\n\nAsk me anything about Dinesh — his skills, projects, experience, or how to get in touch. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(1)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setUnread(0)
    }
  }, [open])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Msg = { id: idRef.current++, role: 'user', text: text.trim() }
    setMsgs(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const botMsg: Msg = { id: idRef.current++, role: 'bot', text: getAnswer(text) }
      setMsgs(prev => [...prev, botMsg])
      setTyping(false)
      if (!open) setUnread(n => n + 1)
    }, 650 + Math.random() * 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <motion.button
        id="chat-toggle"
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.span>
          ) : (
            <motion.span key="chat"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="1" fill="currentColor" />
                <circle cx="12" cy="10" r="1" fill="currentColor" />
                <circle cx="15" cy="10" r="1" fill="currentColor" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
        {unread > 0 && !open && <span className="chat-fab__badge">{unread}</span>}
        {!open && <span className="chat-fab__pulse" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-header">
              <div className="chat-header__avatar">
                <BotIcon />
                <span className="chat-header__status" />
              </div>
              <div className="chat-header__info">
                <div className="chat-header__name">Thala</div>
                <div className="chat-header__sub">Dinesh's Personal Assistant · Always online</div>
              </div>
              <button className="chat-header__close" onClick={() => setOpen(false)} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="chat-body">
              {msgs.map(msg => (
                <motion.div
                  key={msg.id}
                  className={`chat-msg chat-msg--${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {msg.role === 'bot' && <div className="chat-msg__avatar"><BotIcon /></div>}
                  <div className="chat-msg__bubble">
                    {renderMarkdown(msg.text)}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div className="chat-msg chat-msg--bot"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="chat-msg__avatar"><BotIcon /></div>
                  <div className="chat-msg__bubble chat-msg__bubble--typing">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="chat-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="chat-suggestion" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>

            <form className="chat-input-row" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me about Dinesh…"
                autoComplete="off"
              />
              <button
                className="chat-send"
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
