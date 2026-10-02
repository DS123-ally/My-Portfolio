'use client'

import { useEffect, useMemo, useState } from 'react'
import { site } from '@/lib/site'

type HeatDay = { date: string; count: number; level: number }

const DARK = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
const LIGHT = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']

function emptyYear() {
  const days: ({ date: string; count: number; level: number } | null)[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() - 370)
  for (let i = 0; i < start.getDay(); i++) days.push(null)
  const cursor = new Date(start)
  while (cursor <= today) {
    const month = String(cursor.getMonth() + 1).padStart(2, '0')
    const day = String(cursor.getDate()).padStart(2, '0')
    days.push({ date: `${cursor.getFullYear()}-${month}-${day}`, count: 0, level: 0 })
    cursor.setDate(cursor.getDate() + 1)
  }
  while (days.length % 7 !== 0) days.push(null)
  return days
}

export function GithubHeatmap() {
  const [days, setDays] = useState<(HeatDay | null)[]>(() => emptyYear())
  const [total, setTotal] = useState(0)
  const [live, setLive] = useState(false)
  const [light, setLight] = useState(false)
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null)

  useEffect(() => {
    const sync = () => setLight(document.documentElement.classList.contains('light'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch(`https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('unavailable'))))
      .then((data: { contributions?: { date: string; count: number; level: number }[]; total?: { lastYear?: number } }) => {
        const contributions = data.contributions ?? []
        if (cancelled || contributions.length === 0) return
        const first = new Date(contributions[0].date).getDay()
        const next: (HeatDay | null)[] = Array.from({ length: first }, () => null)
        for (const day of contributions) {
          const level = Math.max(0, Math.min(4, Math.round(day.level || 0)))
          next.push({ date: String(day.date).slice(0, 10), count: day.count || 0, level })
        }
        while (next.length % 7 !== 0) next.push(null)
        setDays(next)
        setTotal(data.total?.lastYear ?? contributions.reduce((sum, day) => sum + (day.count || 0), 0))
        setLive(true)
      })
      .catch(() => {
        if (!cancelled) setLive(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const months = useMemo(() => {
    const columns = Math.ceil(days.length / 7)
    const labels: { col: number; name: string }[] = []
    for (let column = 0; column < columns; column++) {
      const day = days[column * 7]
      if (!day) continue
      const date = new Date(`${day.date}T00:00:00`)
      if (date.getDate() <= 7) {
        labels.push({ col: column, name: date.toLocaleDateString('en-US', { month: 'short' }) })
      }
    }
    return { labels, columns }
  }, [days])

  const colors = light ? LIGHT : DARK

  return (
    <section id="github">
      <div className="shell flex items-center justify-between bg-[var(--bg)] px-6 py-3 sm:px-8">
        <a href="#github" className="section-link font-serif text-2xl tracking-wide">
          GitHub Activity
        </a>
        <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--fg)]">
          @{site.githubUser}
        </a>
      </div>
      <div className="shell overflow-x-auto px-6 py-6 sm:px-8">
        <div className="min-w-[640px]">
          <div className="relative mb-1.5 h-3.5 font-mono text-[10px] text-[var(--soft)]">
            {months.labels.map((month) => (
              <span key={`${month.name}-${month.col}`} className="absolute" style={{ left: `${(month.col / months.columns) * 100}%` }}>
                {month.name}
              </span>
            ))}
          </div>
          <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: 'repeat(7, 10px)' }}>
            {days.map((day, index) =>
              day ? (
                <span
                  key={day.date}
                  className="size-[10px] rounded-[2px]"
                  style={{ background: colors[day.level] }}
                  onMouseEnter={(event) => {
                    const box = event.currentTarget.getBoundingClientRect()
                    const label = day.count === 0 ? 'No contributions' : `${day.count} contribution${day.count === 1 ? '' : 's'}`
                    setTip({ text: `${label} on ${day.date}`, x: box.left + box.width / 2, y: box.top - 8 })
                  }}
                  onMouseLeave={() => setTip(null)}
                />
              ) : (
                <span key={`pad-${index}`} className="size-[10px]" />
              ),
            )}
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
            <span>{live ? `${total} contributions in the last year` : 'Live GitHub data unavailable right now'}</span>
            <span className="flex items-center gap-1">
              Less
              {colors.map((color) => (
                <i key={color} className="size-[10px] rounded-[2px]" style={{ background: color }} />
              ))}
              More
            </span>
          </div>
        </div>
      </div>
      {tip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-[#1f2328] px-3 py-1.5 font-mono text-[12px] text-white"
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.text}
        </div>
      )}
    </section>
  )
}
