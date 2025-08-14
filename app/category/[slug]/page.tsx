export const revalidate = 60

import { getCategoryBySlug } from "@/lib/categories"
import AdSlot from "@/components/ad-slot"
import TrendingSidebar from "@/components/trending-sidebar"
import NewsGrid from "@/components/news-grid"
import { fetchByCategory, fetchTrending } from "@/lib/data"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug)

  return {
    title: `${cat.name} - ডুমুরিয়া নিউজ ২৪`,
    description: `${cat.name} বিভাগের সর্বশেষ সংবাদ ও বিশ্লেষণ। ডুমুরিয়া নিউজ ২৪ এ পড়ুন ${cat.name} সংক্রান্ত সকল আপডেট।`,
    openGraph: {
      title: `${cat.name} - ডুমুরিয়া নিউজ ২৪`,
      description: `${cat.name} বিভাগের সর্বশেষ সংবাদ ও বিশ্লেষণ।`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} - ডুমুরিয়া নিউজ ২৪`,
      description: `${cat.name} বিভাগের সর্বশেষ সংবাদ।`,
    },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug)
  const [items, trending] = await Promise.all([fetchByCategory(params.slug, 48), fetchTrending(8)])
  const BannerIcon = cat.icon

  return (
    <main className="container mx-auto px-3 sm:px-4 py-6">
      <section className="mb-6 overflow-hidden rounded-md">
        <div className={`bg-gradient-to-r ${cat.banner} px-4 py-8`}>
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-white/10 p-2">
              <BannerIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{cat.name}</h1>
          </div>
          <p className="mt-2 max-w-2xl text-white/80 text-sm">
            {cat.name} {"বিভাগের সর্বশেষ সংবাদ ও বিশ্লেষণ।"}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9">
          <NewsGrid
            items={items}
            pageSize={cat.slug === "sports" || cat.slug === "technology" ? 12 : 9}
            adFrequency={6}
          />
        </div>
        <aside className="lg:col-span-3">
          <div className="space-y-4">
            <AdSlot slotName="Sidebar Top" />
            <TrendingSidebar items={trending} />
            <AdSlot slotName="Sidebar Bottom" />
          </div>
        </aside>
      </section>
    </main>
  )
}
