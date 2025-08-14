"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import ShareButtons from "@/components/share-buttons"

type News = {
  id: string
  title: string
  description: string
  image: string
  href?: string
  category?: string
  publishedAt?: string
}

export default function NewsCard({ item }: { item: News }) {
  const { id, title, image, href, description, category, publishedAt } = item
  const link = id ? `/news/${id}` : href || "#"

  return (
    <Card className="overflow-hidden h-full">
      <Link href={link} className="relative block aspect-[16/9]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {category && (
          <span className="absolute top-2 left-2 bg-red-700 text-white text-[11px] px-2 py-0.5 rounded-full">
            {category}
          </span>
        )}
      </Link>
      <CardContent className="p-3 grid gap-2">
        <Link href={link} className="hover:underline">
          <h3 className="font-semibold text-base leading-snug line-clamp-2">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-muted-foreground">{publishedAt}</div>
          <ShareButtons title={title} url={typeof window !== "undefined" ? window.location.href : ""} />
        </div>
      </CardContent>
    </Card>
  )
}
