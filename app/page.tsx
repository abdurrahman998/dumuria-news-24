import type { Metadata } from "next"
export const revalidate = 60

import BreakingTicker from "@/components/breaking-ticker"
import FeaturedCarousel from "@/components/featured-carousel"
import AdSlot from "@/components/ad-slot"
import TrendingSidebar from "@/components/trending-sidebar"
import NewsGrid from "@/components/news-grid"
import VideoSection from "@/components/video-section"
import SiteFooter from "@/components/site-footer"
import { fetchBreaking, fetchFeatured, fetchLatest, fetchTrending, fetchVideos } from "@/lib/data"

export const metadata: Metadata = {
  title: "ডুমুরিয়া নিউজ ২৪ - হোম",
  description: "ডুমুরিয়া নিউজ ২৪ এর হোম পেজ। সর্বশেষ সংবাদ, ব্রেকিং নিউজ, ট্রেন্ডিং খবর এবং ভিডিও সংবাদ দেখুন।",
  openGraph: {
    title: "ডুমুরিয়া নিউজ ২৪ - হোম",
    description: "সর্বশেষ সংবাদ, ব্রেকিং নিউজ, ট্রেন্ডিং খবর এবং ভিডিও সংবাদ।",
  },
}

export default async function Page() {
  const [featured, breaking, trending, latest, videos] = await Promise.all([
    fetchFeatured(5),
    fetchBreaking(10),
    fetchTrending(8),
    fetchLatest(36),
    fetchVideos(6),
  ])

  return (
    <div className="min-h-screen bg-white text-black dark:bg-background dark:text-foreground">
      <main>
        <section className="container mx-auto px-3 sm:px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-3">
              <BreakingTicker items={breaking} />
              <div className="mt-4 lg:hidden">
                <AdSlot slotName="Mobile Top" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <FeaturedCarousel items={featured.length ? featured : latest.slice(0, 5)} />
            </div>

            <aside className="lg:col-span-3">
              <div className="space-y-4">
                <AdSlot slotName="Sidebar Top" />
                <TrendingSidebar items={trending} />
                <AdSlot slotName="Sidebar Bottom" />
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-zinc-50 dark:bg-zinc-900/40 py-6">
          <div className="container mx-auto px-3 sm:px-4">
            <VideoSection
              videos={videos.map((v) => ({
                id: String(v.id),
                title: v.title,
                description: v.description || undefined,
                src: v.src_url,
                poster: v.poster_url || undefined,
              }))}
            />
          </div>
        </section>

        <section className="container mx-auto px-3 sm:px-4 py-6">
          <NewsGrid items={latest} adFrequency={6} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
