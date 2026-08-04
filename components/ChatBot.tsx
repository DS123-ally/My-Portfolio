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
  text: string
  sources?: string[]
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    text: 'Hi, I am Lyra, the portfolio RAG assistant. Ask about Dinesh, his projects, skills, experience, or contact details.',
    sources: ['Profile'],
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
  const matches = retrieve(query)
  const useful = matches.some((item) => item.score > 0) ? matches : [KNOWLEDGE[0], KNOWLEDGE[1]]
  return {
    text: `Based on the portfolio knowledge base: ${useful.map((item) => item.body).join(' ')}`,
    sources: useful.map((item) => item.title),
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const send = (value: string) => {
    const question = value.trim()
    if (!question) return

    const response = answerQuestion(question)
    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      { role: 'assistant', text: response.text, sources: response.sources },
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

            <div className="rag-chat__messages">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`rag-chat__message rag-chat__message--${message.role}`}>
                  <p>{message.text}</p>
                  {message.sources && (
                    <div className="rag-chat__sources">
                      {message.sources.map((source) => (
                        <span key={source}>{source}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
