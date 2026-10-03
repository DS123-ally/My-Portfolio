'use client'

import { useEffect, useMemo, useState } from 'react'
import { site } from '@/lib/site'

type Item = { label: string; hint: string; run: () => void }

export function CommandPalette({
  open,
  theme,
  onClose,
  onToggleTheme,
}: {
  open: boolean
  theme: 'dark' | 'light'
  onClose: () => void
  onToggleTheme: () => void
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const items = useMemo<Item[]>(() => {
    const jumps: Item[] = [
      ['About', '#about'],
      ['Projects', '#projects'],
      ['Blog', '#blog'],
      ['Tech stack', '#skills'],
      ['Experience', '#experience'],
      ['GitHub', '#github'],
      ['Contact', '#contact'],
    ].map(([label, href]) => ({
      label,
      hint: 'Jump',
      run: () => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    }))

    return [
      ...jumps,
      { label: 'GitHub profile', hint: 'Open', run: () => { window.open(site.socials.github, '_blank', 'noopener'); onClose() } },
      { label: 'LinkedIn', hint: 'Open', run: () => { window.open(site.socials.linkedin, '_blank', 'noopener'); onClose() } },
      { label: 'Email', hint: 'Open', run: () => { window.location.href = site.socials.email; onClose() } },
      { label: 'Resume', hint: 'Open', run: () => { window.open(site.resume, '_blank', 'noopener'); onClose() } },
      {
        label: theme === 'dark' ? 'Switch to light' : 'Switch to dark',
        hint: 'Theme',
        run: () => {
          onToggleTheme()
          onClose()
        },
      },
    ]
  }, [onClose, onToggleTheme, theme])

  const visible = items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-start bg-black/50 px-4 pt-[18vh]" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onClose()
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setActive((index) => Math.min(index + 1, visible.length - 1))
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActive((index) => Math.max(index - 1, 0))
            }
            if (event.key === 'Enter') visible[active]?.run()
          }}
          placeholder="Jump, open, or switch theme"
          className="w-full border-b border-[var(--line)] bg-transparent px-4 py-4 font-mono text-sm outline-none placeholder:text-[var(--soft)]"
        />
        <ul className="max-h-72 overflow-auto py-2">
          {visible.length === 0 && <li className="px-4 py-3 font-mono text-xs text-[var(--soft)]">Nothing matches.</li>}
          {visible.map((item, index) => (
            <li key={item.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onClick={item.run}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                  index === active ? 'bg-[var(--hover)] text-[var(--fg)]' : 'text-[var(--muted)]'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]">{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
