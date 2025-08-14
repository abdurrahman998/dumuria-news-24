"use client"

import { useEffect, useState } from "react"
import { Flame } from "lucide-react"
import Link from "next/link"

type TickerItem = {
  id: string
  title: string
  href?: string
}

export default function BreakingTicker({
  items = [],
  intervalMs = 3000,
}: {
  items?: TickerItem[]
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % (items.length || 1))
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, items.length])

  const current = items[index] ?? null
  const link = current ? (current.id ? `/news/${current.id}` : current.href || "#") : "#"

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex items-center gap-2 bg-red-700 text-white px-3 py-2">
        <Flame className="h-4 w-4" />
        <span className="font-semibold">{"ব্রেকিং নিউজ"}</span>
      </div>
      <div className="p-3 min-h-[64px] flex items-center">
        {current ? (
          <Link href={link} className="line-clamp-2 hover:underline text-black dark:text-white">
            {current.title}
          </Link>
        ) : (
          <span>{"কোনো ব্রেকিং নিউজ নেই"}</span>
        )}
      </div>
    </div>
  )
}
