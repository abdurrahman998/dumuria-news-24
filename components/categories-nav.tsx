"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavItem = {
  name: string
  slug: string
  icon: React.ElementType
}

export default function CategoriesNav({
  items = [],
}: {
  items?: NavItem[]
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current
    if (!el) return
    const delta = dir === "left" ? -240 : 240
    el.scrollBy({ left: delta, behavior: "smooth" })
  }

  const isActive = (slug: string) => {
    const target = slug ? `/category/${slug}` : "/"
    return pathname === target
  }

  return (
    <div className="relative">
      {/* Mobile: Hamburger list */}
      <div className="flex items-center gap-2 px-3 py-2 sm:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Menu className="h-4 w-4" />
              {"সব বিভাগ"}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 sm:w-96">
            <SheetHeader>
              <SheetTitle>{"বিভাগ নির্বাচন করুন"}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 grid gap-2">
              {items.map((it) => {
                const Icon = it.icon
                const href = it.slug ? `/category/${it.slug}` : "/"
                return (
                  <Link
                    key={it.slug || "home"}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 ${
                      isActive(it.slug) ? "bg-red-700 text-white" : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{it.name}</span>
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop / wide: horizontal scroller with arrows */}
      <div className="hidden sm:flex items-center gap-2 px-2 py-2">
        <Button variant="ghost" size="icon" onClick={() => scroll("left")} aria-label="বামদিকে স্ক্রল">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div ref={scrollerRef} className="flex-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="বিভাগ তালিকা">
          <div className="flex items-center gap-2 px-1 min-w-max">
            {items.map((it) => {
              const href = it.slug ? `/category/${it.slug}` : "/"
              const active = isActive(it.slug)
              const Icon = it.icon
              return (
                <Link key={it.slug || "home"} href={href} className="group">
                  <Button
                    variant={active ? "default" : "secondary"}
                    className={`rounded-full gap-2 ${
                      active ? "bg-red-700 hover:bg-red-700 text-white" : "text-black dark:text-white"
                    }`}
                    role="tab"
                    aria-selected={active}
                  >
                    <Icon className="h-4 w-4 opacity-90" />
                    <span>{it.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => scroll("right")} aria-label="ডানদিকে স্ক্রল">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
