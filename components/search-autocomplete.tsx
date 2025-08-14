"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { categoryConfigs } from "@/lib/categories"

type Suggestion =
  | { type: "action"; label: string; q: string }
  | { type: "category"; label: string; slug: string; icon: React.ElementType }
  | { type: "news"; label: string; id: string }

export default function SearchAutocomplete({
  placeholder = "খুঁজুন...",
  className,
  autoFocus = false,
}: {
  placeholder?: string
  className?: string
  autoFocus?: boolean
}) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [remote, setRemote] = useState<{
    news: { id: string; title: string }[]
    categories: { name: string; slug: string }[]
  }>({
    news: [],
    categories: [],
  })
  const listRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debounceRef = useRef<any>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    window.clearTimeout(debounceRef.current)
    if (!q.trim()) {
      setRemote({ news: [], categories: [] })
      return
    }
    setLoading(true)
    debounceRef.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`)
        const json = await res.json()
        setRemote({ news: json.news || [], categories: json.categories || [] })
      } catch {
        setRemote({ news: [], categories: [] })
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => window.clearTimeout(debounceRef.current)
  }, [q])

  const suggestions = useMemo<Suggestion[]>(() => {
    const trimmed = q.trim()
    const arr: Suggestion[] = []
    if (trimmed.length > 0) {
      arr.push({ type: "action", label: `সার্চ করুন "${trimmed}"`, q: trimmed })
    }
    arr.push(...(remote.news || []).map((n) => ({ type: "news", label: n.title, id: String(n.id) })))
    arr.push(
      ...(remote.categories || []).map((c) => {
        const icon = categoryConfigs.find((cfg) => cfg.slug === c.slug)?.icon || categoryConfigs[0].icon
        return { type: "category", label: c.name, slug: c.slug, icon }
      }),
    )
    return arr
  }, [q, remote])

  const onSelect = (s: Suggestion) => {
    setOpen(false)
    setActiveIdx(0)
    if (s.type === "action") {
      router.push(`/search?q=${encodeURIComponent(s.q)}`)
      return
    }
    if (s.type === "news") {
      router.push(`/news/${s.id}`)
      return
    }
    if (s.type === "category") {
      router.push(s.slug ? `/category/${s.slug}` : "/")
      return
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true)
      return
    }
    if (!suggestions.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIdx((i) => (i + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIdx((i) => (i - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      onSelect(suggestions[activeIdx])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="pl-8"
        aria-label="সার্চ"
      />
      {open && (loading || (suggestions.length > 0 && q.trim())) && (
        <Card className="absolute left-0 right-0 top-[110%] z-50 overflow-hidden">
          <div ref={listRef} role="listbox" aria-label="সার্চ সাজেশন" className="max-h-[60vh] overflow-auto divide-y">
            {loading && <div className="px-3 py-2 text-sm text-muted-foreground">{"লোড হচ্ছে..."}</div>}
            {!loading &&
              suggestions.map((s, idx) => {
                const isActive = idx === activeIdx
                if (s.type === "action") {
                  return (
                    <button
                      key={`act-${s.q}`}
                      role="option"
                      aria-selected={isActive}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => onSelect(s)}
                      className={cn("w-full text-left px-3 py-2 hover:bg-muted", isActive && "bg-muted")}
                    >
                      <span className="text-sm">{s.label}</span>
                    </button>
                  )
                }
                if (s.type === "category") {
                  const Icon = s.icon
                  return (
                    <Link
                      key={`cat-${s.slug}`}
                      role="option"
                      aria-selected={isActive}
                      href={s.slug ? `/category/${s.slug}` : "/"}
                      className={cn("flex items-center gap-2 px-3 py-2 hover:bg-muted", isActive && "bg-muted")}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{s.label}</span>
                    </Link>
                  )
                }
                return (
                  <Link
                    key={`news-${s.id}`}
                    role="option"
                    aria-selected={isActive}
                    href={`/news/${s.id}`}
                    className={cn("block px-3 py-2 hover:bg-muted", isActive && "bg-muted")}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span className="text-sm">{s.label}</span>
                  </Link>
                )
              })}
          </div>
        </Card>
      )}
    </div>
  )
}
