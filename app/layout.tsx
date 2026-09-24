import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dinesh Seervi — CS Student',
    template: '%s · Dinesh Seervi',
  },
  description:
    'Portfolio of Dinesh Seervi, a computer science student building agentic workflows, RAG systems, and practical machine-learning products.',
  keywords: ['AI', 'ML', 'Machine Learning', 'Portfolio', 'Dinesh Seervi', 'Data Science', 'LangChain', 'RAG'],
  authors: [{ name: 'Dinesh Seervi' }],
  creator: 'Dinesh Seervi',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dinesh Seervi — CS Student',
    description: 'Building AI systems that turn complex work into useful products.',
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Dinesh Seervi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinesh Seervi — CS Student',
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
