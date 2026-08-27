import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dinesh Seervi — AI Engineer',
  description:
    'AI engineer building agentic workflows, RAG systems, and practical machine-learning products.',
  keywords: ['AI', 'ML', 'Machine Learning', 'Portfolio', 'Dinesh Seervi', 'Data Science', 'LangChain'],
  authors: [{ name: 'Dinesh Seervi' }],
  openGraph: {
    title: 'Dinesh Seervi — AI Engineer',
    description: 'Building AI systems that turn complex work into useful products.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinesh Seervi — AI Engineer',
    description: 'Building AI systems that turn complex work into useful products.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
