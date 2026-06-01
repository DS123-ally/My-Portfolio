import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

const dm = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Dinesh Seervi — AI Developer',
  description:
    'Personal portfolio of Dinesh Seervi — AI Developer, B.Tech student at AISSMS IOIT Pune. Hackathon winner, LangChain and Data Science enthusiast.',
  keywords: ['AI', 'ML', 'Machine Learning', 'Portfolio', 'Dinesh Seervi', 'Data Science', 'LangChain'],
  authors: [{ name: 'Dinesh Seervi' }],
  openGraph: {
    title: 'Dinesh Seervi — AI Developer',
    description: 'Building intelligent systems that see, think, and act.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinesh Seervi — AI Developer',
    description: 'Building intelligent systems that see, think, and act.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dm.variable}`}>
      <body>{children}</body>
    </html>
  )
}
