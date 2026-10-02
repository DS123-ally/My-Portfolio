import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

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
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
