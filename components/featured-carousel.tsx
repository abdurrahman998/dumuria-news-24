"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type FeaturedItem = {
  id: string
  title: string
  image: string
  href?: string
  category?: string
}

export default function FeaturedCarousel({
  items = [],
  autoPlayMs = 5000,
}: {
  items?: FeaturedItem[]
  autoPlayMs?: number
}) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => setI((x) => (x + 1) % items.length), autoPlayMs)
    return () => clearInterval(id)
  }, [items.length, autoPlayMs])

  const prev = () => setI((x) => (x - 1 + items.length) % items.length)
  const next = () => setI((x) => (x + 1) % items.length)
  const current = items[i]

  if (!current) return null
  const link = current.id ? `/news/${current.id}` : current.href || "#"

  return (
    <div className="relative rounded-md overflow-hidden bg-black">
      <div className="aspect-[16/9] w-full relative">
        <Image
          src={current.image || "/placeholder.svg?height=450&width=800&query=featured"}
          alt={current.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          {current.category && (
            <span className="inline-block bg-red-700 text-white text-xs px-2 py-1 rounded-full mb-2">
              {current.category}
            </span>
          )}
          <Link href={link} className="block">
            <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug line-clamp-2">{current.title}</h2>
          </Link>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 p-2 flex items-center">
        <Button variant="ghost" size="icon" onClick={prev} className="bg-black/30 hover:bg-black/50 text-white">
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 p-2 flex items-center">
        <Button variant="ghost" size="icon" onClick={next} className="bg-black/30 hover:bg-black/50 text-white">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {items.map((_, idx) => (
          <span key={idx} className={`h-1.5 w-4 rounded-full ${idx === i ? "bg-white" : "bg-white/40"}`} />
        ))}
      </div>
    </div>
  )
}
