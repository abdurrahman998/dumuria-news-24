"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import NewsCard from "./news-card"
import AdSlot from "./ad-slot"

type Item = {
  id: string
  title: string
  description: string
  image: string
  href?: string
  category?: string
  publishedAt?: string
}

export default function NewsGrid({
  items = [],
  pageSize = 9,
  adFrequency = 6,
  onCategorySelect,
}: {
  items?: Item[]
  pageSize?: number
  adFrequency?: number
  onCategorySelect?: (cat: string) => void
}) {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const visible = useMemo(() => items.slice(0, page * pageSize), [items, page, pageSize])

  useEffect(() => {
    setPage(1)
    setHasMore(items.length > pageSize)
  }, [items, pageSize])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => {
            const next = p + 1
            if (next * pageSize >= items.length) setHasMore(false)
            return next
          })
        }
      },
      { rootMargin: "800px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [hasMore, items.length, pageSize])

  // Interleave ads
  const withAds: (Item | { __ad: true; id: string })[] = []
  visible.forEach((it, idx) => {
    withAds.push(it)
    if ((idx + 1) % adFrequency === 0) {
      withAds.push({ __ad: true, id: `ad-${idx}` } as any)
    }
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {withAds.map((it: any) =>
        it.__ad ? (
          <div key={it.id} className="col-span-1">
            <AdSlot slotName="In-Feed Ad" />
          </div>
        ) : (
          <NewsCard key={it.id} item={it} />
        ),
      )}
      <div ref={sentinelRef} className="h-10 col-span-full" aria-hidden />
      {!hasMore && items.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground">{"কোনো সংবাদ পাওয়া যায়নি"}</div>
      )}
    </div>
  )
}
