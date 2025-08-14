import { Globe, Landmark, Trophy, Clapperboard, LineChart, Cpu, Quote, Rows3, type LucideIcon } from "lucide-react"

export type CategoryConfig = {
  name: string
  slug: string
  icon: LucideIcon
  // Tailwind utility classes for “personality” styles
  accent: string // text color
  badge: string // badge bg
  banner: string // banner bg
}

export const categoryConfigs: CategoryConfig[] = [
  {
    name: "সকল",
    slug: "",
    icon: Rows3,
    accent: "text-red-700",
    badge: "bg-red-700 text-white",
    banner: "from-red-700 to-black",
  },
  {
    name: "জাতীয়",
    slug: "national",
    icon: Landmark,
    accent: "text-neutral-900 dark:text-neutral-100",
    badge: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black",
    banner: "from-neutral-800 to-neutral-950",
  },
  {
    name: "আন্তর্জাতিক",
    slug: "international",
    icon: Globe,
    accent: "text-sky-700",
    badge: "bg-sky-700 text-white",
    banner: "from-sky-700 to-slate-900",
  },
  {
    name: "রাজনীতি",
    slug: "politics",
    icon: Landmark,
    accent: "text-red-700",
    badge: "bg-red-700 text-white",
    banner: "from-red-700 to-black",
  },
  {
    name: "খেলাধুলা",
    slug: "sports",
    icon: Trophy,
    accent: "text-emerald-700",
    badge: "bg-emerald-700 text-white",
    banner: "from-emerald-700 to-zinc-900",
  },
  {
    name: "বিনোদন",
    slug: "entertainment",
    icon: Clapperboard,
    accent: "text-fuchsia-700",
    badge: "bg-fuchsia-700 text-white",
    banner: "from-fuchsia-700 to-zinc-900",
  },
  {
    name: "অর্থনীতি",
    slug: "economy",
    icon: LineChart,
    accent: "text-amber-700",
    badge: "bg-amber-700 text-white",
    banner: "from-amber-700 to-zinc-900",
  },
  {
    name: "প্রযুক্তি",
    slug: "technology",
    icon: Cpu,
    accent: "text-indigo-700",
    badge: "bg-indigo-700 text-white",
    banner: "from-indigo-700 to-zinc-900",
  },
  {
    name: "মতামত",
    slug: "opinion",
    icon: Quote,
    accent: "text-orange-700",
    badge: "bg-orange-700 text-white",
    banner: "from-orange-700 to-zinc-900",
  },
]

export function getCategoryBySlug(slug?: string | null) {
  if (!slug) return categoryConfigs[0]
  return categoryConfigs.find((c) => c.slug === slug) || categoryConfigs[0]
}

export function getCategoryByName(name?: string | null) {
  if (!name) return categoryConfigs[0]
  return categoryConfigs.find((c) => c.name === name) || categoryConfigs[0]
}

export function getNavItems() {
  return categoryConfigs
}
