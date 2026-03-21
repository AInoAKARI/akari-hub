"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type CommandItem = {
  id: string
  label: string
  group: "GitHub" | "Notion" | "Slack" | "Vercel" | "Vault"
  keywords?: string[]
  buildUrl?: (query: string) => string
  url?: string
}

const COMMANDS: CommandItem[] = [
  { id: "gh-open", label: "Open GitHub", group: "GitHub", url: "https://github.com" },
  {
    id: "gh-search",
    label: "Search GitHub for…",
    group: "GitHub",
    keywords: ["repo", "code", "issues"],
    buildUrl: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`
  },
  { id: "notion-open", label: "Open Notion", group: "Notion", url: "https://www.notion.so" },
  {
    id: "notion-search",
    label: "Search Notion for…",
    group: "Notion",
    keywords: ["docs", "pages"],
    buildUrl: (q) => `https://www.notion.so/search?q=${encodeURIComponent(q)}`
  },
  { id: "slack-open", label: "Open Slack", group: "Slack", url: "https://slack.com/app" },
  {
    id: "slack-search",
    label: "Search Slack for…",
    group: "Slack",
    keywords: ["messages", "channels"],
    buildUrl: (q) => `https://app.slack.com/search/${encodeURIComponent(q)}`
  },
  { id: "vercel-open", label: "Open Vercel", group: "Vercel", url: "https://vercel.com/dashboard" },
  {
    id: "vercel-search",
    label: "Search Vercel projects…",
    group: "Vercel",
    keywords: ["deploy", "preview"],
    buildUrl: (q) => `https://vercel.com/dashboard?query=${encodeURIComponent(q)}`
  },
  // "Vault" can be any password/secret manager; default to 1Password on web
  { id: "vault-open", label: "Open Vault", group: "Vault", url: "https://my.1password.com/" }
]

function useHotkey(toggle: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k"
      const isMeta = e.metaKey || e.ctrlKey
      if (isK && isMeta) {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [toggle])
}

function fuzzyIncludes(haystack: string, needle: string) {
  if (!needle) return true
  let i = 0
  const n = needle.toLowerCase()
  const h = haystack.toLowerCase()
  for (let j = 0; j < h.length && i < n.length; j++) {
    if (h[j] === n[i]) i++
  }
  return i === n.length
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => setOpen((v) => !v), [])
  useHotkey(toggle)

  // Focus the input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setQuery("")
      setActive(0)
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim()
    const list = COMMANDS.filter((c) =>
      fuzzyIncludes(c.label + " " + (c.keywords?.join(" ") ?? ""), q)
    )
    // Group order
    const order = ["GitHub", "Notion", "Slack", "Vercel", "Vault"] as const
    return list.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group))
  }, [query])

  const grouped = useMemo(() => {
    const map = new Map<CommandItem["group"], CommandItem[]>()
    filtered.forEach((c) => {
      map.set(c.group, [...(map.get(c.group) ?? []), c])
    })
    return Array.from(map.entries())
  }, [filtered])

  const total = filtered.length

  const run = (item: CommandItem) => {
    const url = item.buildUrl ? item.buildUrl(query) : item.url
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
      setOpen(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!total) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (i + 1) % total)
      scrollActiveIntoView((active + 1) % total)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (i - 1 + total) % total)
      scrollActiveIntoView((active - 1 + total) % total)
    } else if (e.key === "Enter") {
      e.preventDefault()
      run(filtered[active])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const scrollActiveIntoView = (index: number) => {
    const container = listRef.current
    if (!container) return
    const el = container.querySelector<HTMLElement>(`[data-idx="${index}"]`)
    el?.scrollIntoView({ block: "nearest" })
  }

  return (
    <>
      {/* Small hint in the corner for discoverability */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 text-xs text-akari-text-muted hover:text-akari-text/90 border border-[var(--akari-border)]/70 rounded-md px-2 py-1 bg-[var(--akari-surface)]/60 backdrop-blur-sm"
        aria-label="Open command palette (Cmd/Ctrl+K)"
      >
        ⌘K / Ctrl+K
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-24"
          onKeyDown={onKeyDown}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-xl card glow overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--akari-border)]/80 px-3 sm:px-4 py-2.5 bg-[var(--akari-surface)]/90">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-70">
                <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent outline-none placeholder:text-akari-text-muted text-[15px]"
                aria-label="Search commands"
              />
              <kbd className="hidden sm:flex items-center gap-1 text-[11px] text-akari-text-muted border border-[var(--akari-border)] rounded px-1.5 py-0.5">
                <span className="font-mono">Esc</span>
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[60vh] overflow-auto p-2 sm:p-3">
              {total === 0 ? (
                <div className="px-3 py-8 text-center text-akari-text-muted">No results</div>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} className="pb-2">
                    <div className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-wider text-akari-text-muted">{group}</div>
                    <div className="flex flex-col">
                      {items.map((item) => {
                        const idx = filtered.indexOf(item)
                        const isActive = idx === active
                        return (
                          <button
                            key={item.id}
                            data-idx={idx}
                            onMouseEnter={() => setActive(idx)}
                            onClick={() => run(item)}
                            className={`text-left px-3 sm:px-4 py-2 transition-colors ${
                              isActive ? "bg-[var(--akari-accent)]/15" : "hover:bg-white/5"
                            }`}
                          >
                            <div className="text-[14px]">{item.label}</div>
                            <div className="text-[12px] text-akari-text-muted">{item.url ? new URL(item.url).hostname : "Opens search with current query"}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-t border-[var(--akari-border)]/80 text-[12px] text-akari-text-muted bg-[var(--akari-surface)]/80">
              <div>Use ↑ ↓ Enter • Esc to close</div>
              <div className="hidden sm:block">{total} result{total === 1 ? "" : "s"}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

