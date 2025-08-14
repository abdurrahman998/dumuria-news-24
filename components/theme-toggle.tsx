"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const mode = resolvedTheme || theme
  const isDark = mode === "dark"
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="থিম টগল"
      className="border-red-700/30"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
