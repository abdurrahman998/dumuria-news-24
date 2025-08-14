export const revalidate = 30

import NewsGrid from "@/components/news-grid"
import { fetchSearch } from "@/lib/data"
import type { Metadata } from "next"

export async function generateMetadata({ searchParams }: { searchParams?: { q?: string } }): Promise<Metadata> {
  const q = (searchParams?.q || "").toString().trim()

  if (!q) {
    return {
      title: "সার্চ - ডুমুরিয়া নিউজ ২৪",
      description: "ডুমুরিয়া নিউজ ২৪ এ সংবাদ খুঁজুন। যেকোনো বিষয়ে সর্বশেষ খবর ও তথ্য পেতে সার্চ করুন।",
    }
  }

  return {
    title: `"${q}" এর সার্চ ফলাফল - ডুমুরিয়া নিউজ ২৪`,
    description: `"${q}" সম্পর্কিত সংবাদ ও তথ্য। ডুমুরিয়া নিউজ ২৪ এ খুঁজে পেয়েছেন সর্বশেষ আপডেট।`,
    openGraph: {
      title: `"${q}" এর সার্চ ফলাফল - ডুমুরিয়া নিউজ ২৪`,
      description: `"${q}" সম্পর্কিত সংবাদ ও তথ্য।`,
    },
  }
}

export default async function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q || "").toString().trim()
  const items = q ? await fetchSearch(q, 48) : []

  return (
    <main className="container mx-auto px-3 sm:px-4 py-6">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          {"সার্চ ফলাফল"} {q ? `: "${q}"` : ""}
        </h1>
        {!q && <p className="text-sm text-muted-foreground mt-1">{"সার্চ কিওয়ার্ড লিখে চেষ্টা করুন।"}</p>}
      </div>
      {q ? (
        <NewsGrid items={items} pageSize={12} adFrequency={6} />
      ) : (
        <div className="text-muted-foreground">{"কিছু খুঁজতে উপরে সার্চ ব্যবহার করুন।"}</div>
      )}
    </main>
  )
}
