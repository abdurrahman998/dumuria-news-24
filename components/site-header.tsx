"use client"

import { useEffect, useState } from "react"
import SearchAutocomplete from "@/components/search-autocomplete"
import { ThemeToggle } from "@/components/theme-toggle"

type SiteHeaderProps = {
  siteName?: string
  placeholder?: string
  showDateTime?: boolean
}
export default function SiteHeader({
  siteName = "ডুমুরিয়া নিউজ ২৪",
  placeholder = "খুঁজুন...",
  showDateTime = true,
}: SiteHeaderProps) {
  const [now, setNow] = useState<string>("")

  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat("bn-BD", {
          dateStyle: "full",
          timeStyle: "short",
          hour12: true,
        })
        setNow(fmt.format(new Date()))
      } catch {
        setNow(new Date().toLocaleString())
      }
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full items-center gap-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-sm bg-red-700 flex items-center justify-center text-white font-bold">
            {"২৪"}
          </div>
          <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className="text-red-700">{"ডুমুরিয়া"}</span> <span className="text-black dark:text-white">{"নিউজ"}</span>{" "}
            <span className="text-black dark:text-white">{"২৪"}</span>
          </div>
        </div>

        {/* Right area */}
        <div className="ml-auto flex items-center gap-3">
          {showDateTime && <div className="text-sm text-muted-foreground hidden lg:block">{now}</div>}
          <div className="w-96">
            <SearchAutocomplete placeholder={placeholder} />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full space-y-3">
        {/* Top row: Logo + Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-sm bg-red-700 flex items-center justify-center text-white font-bold">
              {"২৪"}
            </div>
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-red-700">{"ডুমুরিয়া"}</span>{" "}
              <span className="text-black dark:text-white">{"নিউজ"}</span>{" "}
              <span className="text-black dark:text-white">{"২৪"}</span>
            </div>
          </div>
          {showDateTime && <div className="text-xs text-muted-foreground">{now}</div>}
        </div>

        {/* Bottom row: Search + Theme Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchAutocomplete placeholder={placeholder} />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
