'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KNOWLEDGE = [
  {
    title: 'Profile',
    body: 'Dinesh Seervi is a B.Tech Computer Science Engineering student at AISSMS IOIT Pune. He focuses on AI, machine learning, data science, RAG systems, LangChain, and agentic workflows.',
  },
  {
    title: 'Projects',
    body: 'Featured projects include AI Research Agent, Agentic Blog Gen System, AI-Powered Auto Interview, and Web Summarizer Application.',
  },
  {
    title: 'Skills',
    body: 'Skills include Python, C, C++, JavaScript, React, machine learning, deep learning, LLMs, LangChain, LangGraph, RAG, vector databases, Pandas, NumPy, Streamlit, Git, AWS, and GCP.',
  },
  {
    title: 'Experience',
    body: 'Experience includes Open Source Contributor at GirlScript Summer of Code, Data Science Intern at Prodigy InfoTech, and AI/ML Intern at Edunet Foundation.',
  },
  {
    title: 'Contact',
    body: 'Dinesh is open to research collaborations, internships, and AI/ML opportunities. Email: dineshseervi1208@gmail.com. Phone: +91 96996 23993.',
  },
]

const SUGGESTIONS = ['Who is Dinesh?', 'Explain his RAG projects', 'What skills does he have?', 'How can I contact him?']

type Message = {
  role: 'user' | 'assistant'
  heading?: string
  text: string
  points?: string[]
  sources?: string[]
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    heading: "Hi, I'm Lyra.",
    text: "I can help you quickly explore Dinesh's portfolio.",
    points: ['Projects and technical decisions', 'Skills and experience', 'Contact and availability'],
  },
]

function retrieve(query: string) {
  const tokens = query.toLowerCase().split(/\W+/).filter(Boolean)
  return KNOWLEDGE
    .map((item) => ({
      ...item,
      score: tokens.reduce(
        (score, token) => score + (item.body.toLowerCase().includes(token) || item.title.toLowerCase().includes(token) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
}

function answerQuestion(query: string) {
  const normalized = query.toLowerCase()

  if (/who|about|profile|dinesh/.test(normalized)) {
    return {
      heading: 'About Dinesh',
      text: 'Dinesh Seervi is a B.Tech Computer Science Engineering student at AISSMS IOIT, Pune.',
      points: ['Builds practical AI and machine-learning products', 'Focuses on RAG, LangChain, and agentic workflows', 'Open to internships and AI collaborations'],
      sources: ['Profile'],
    }
  }

  if (/project|rag|research|summar|interview|blog/.test(normalized)) {
    return {
      heading: 'Featured projects',
      text: 'His work focuses on turning AI capabilities into useful, end-to-end products.',
      points: ['AI Research Agent — graph-based research and synthesis', 'Agentic Blog Gen — multi-step, SEO-ready content workflow', 'AI Auto Interview — speech transcription and answer evaluation', 'Web Summarizer — retrieval-based document and web querying'],
      sources: ['Projects'],
    }
  }

  if (/skill|stack|technology|technologies|tool/.test(normalized)) {
    return {
      heading: 'Core skills',
      text: 'Dinesh combines AI engineering with product development and cloud fundamentals.',
      points: ['AI: Python, LangChain, LangGraph, RAG, vector databases', 'Product: Next.js, React, FastAPI, Streamlit, Firebase', 'Data & cloud: Pandas, NumPy, Scikit-learn, TensorFlow, AWS, GCP'],
      sources: ['Skills'],
    }
  }

  if (/experience|intern|work|career|open source/.test(normalized)) {
    return {
      heading: 'Experience',
      text: 'His applied experience spans open source, data science, and AI/ML engineering.',
      points: ['Open Source Contributor — GirlScript Summer of Code', 'Data Science Intern — Prodigy InfoTech', 'AI/ML Intern — Edunet Foundation'],
      sources: ['Experience'],
    }
  }

  if (/contact|email|phone|reach|hire|available/.test(normalized)) {
    return {
      heading: 'Contact Dinesh',
      text: 'He is available for internships, research collaborations, and AI/ML opportunities.',
      points: ['Email: dineshseervi1208@gmail.com', 'Phone: +91 96996 23993', 'LinkedIn and GitHub are linked in the contact section'],
      sources: ['Contact'],
    }
  }

  const matches = retrieve(query)
  const useful = matches.some((item) => item.score > 0) ? matches : [KNOWLEDGE[0]]
  return {
    heading: 'Portfolio answer',
    text: useful[0].body,
    points: useful.slice(1).map((item) => item.body),
    sources: useful.map((item) => item.title),
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resetChat = () => {
      setOpen(false)
      setInput('')
      setMessages(INITIAL_MESSAGES)
    }

    resetChat()
    window.addEventListener('pageshow', resetChat)
    return () => window.removeEventListener('pageshow', resetChat)
  }, [])

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, open])

  const send = (value: string) => {
    const question = value.trim()
    if (!question) return

    const response = answerQuestion(question)
    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      { role: 'assistant', ...response },
    ])
    setInput('')
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <>
      <button className="rag-chat-button" onClick={() => setOpen((value) => !value)} aria-label="Open Lyra assistant">
        {open ? 'Close' : 'Ask Lyra'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            className="rag-chat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18 }}
          >
            <div className="rag-chat__header">
              <div>
                <strong>Lyra</strong>
                <span>Answers grounded in page content</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close Lyra assistant">×</button>
            </div>

            <div className="rag-chat__messages" aria-live="polite">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`rag-chat__message rag-chat__message--${message.role}`}>
                  {message.heading && <h3>{message.heading}</h3>}
                  <p>{message.text}</p>
                  {message.points && message.points.length > 0 && (
                    <ul>
                      {message.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  )}
                  {message.sources && (
                    <div className="rag-chat__sources">
                      <small>Source</small>
                      {message.sources.map((source) => (
                        <span key={source}>{source}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="rag-chat__suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <button key={suggestion} onClick={() => send(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              className="rag-chat__form"
              onSubmit={(event) => {
                event.preventDefault()
                send(input)
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, skills, contact..."
              />
              <button type="submit">Send</button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
