"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ShareButtons from "./share-buttons"
import Image from "next/image"

type Video = {
  id: string
  title: string
  description?: string
  src: string
  poster?: string
}

export default function VideoSection({ videos = [] as Video[] }) {
  const [current, setCurrent] = useState<Video | null>(videos[0] || null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8">
        {current && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{current.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <video className="w-full rounded-md bg-black" poster={current.poster} controls preload="metadata">
                <source src={current.src} type="video/mp4" />
                {"আপনার ব্রাউজার ভিডিও প্লেব্যাক সমর্থন করে না।"}
              </video>
              {current.description && <p className="text-sm text-muted-foreground">{current.description}</p>}
              <div className="flex items-center justify-end">
                <ShareButtons title={current.title} url={typeof window !== "undefined" ? window.location.href : ""} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="lg:col-span-4">
        <div className="border rounded-md">
          <div className="px-3 py-2 bg-black text-white font-semibold">{"ভিডিও সংবাদ"}</div>
          <div className="divide-y">
            {videos.map((v) => (
              <button
                key={v.id}
                onClick={() => setCurrent(v)}
                className={`w-full text-left p-3 hover:bg-muted ${current?.id === v.id ? "bg-muted" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`relative h-16 w-28 shrink-0 overflow-hidden rounded ${current?.id === v.id ? "ring-2 ring-red-700" : ""}`}
                  >
                    <Image
                      src={v.poster || "/placeholder.svg?height=90&width=160&query=video%20thumbnail"}
                      alt={v.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium line-clamp-2">{v.title}</div>
                    {v.description && (
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{v.description}</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
