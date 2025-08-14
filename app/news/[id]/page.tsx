export const revalidate = 120

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ShareButtons from "@/components/share-buttons"
import TrendingSidebar from "@/components/trending-sidebar"
import AdSlot from "@/components/ad-slot"
import { getCategoryByName } from "@/lib/categories"
import { fetchArticleById, fetchByCategory, fetchTrending } from "@/lib/data"
import type { Metadata } from "next"

function readingTime(text: string) {
  const words = text.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 180))
  return `${minutes} মিনিট`
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await fetchArticleById(params.id)
  if (!article) {
    return {
      title: "সংবাদ পাওয়া যায়নি - ডুমুরিয়া নিউজ ২৪",
      description: "আপনি যে সংবাদটি খুঁজছেন তা পাওয়া যায়নি।",
    }
  }

  return {
    title: `${article.title} - ডুমুরিয়া নিউজ ২৪`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      images: article.image_url ? [{ url: article.image_url }] : [],
      type: "article",
      publishedTime: article.published_at || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.title,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const article = await fetchArticleById(params.id)
  if (!article) return notFound()

  const categoryCfg = getCategoryByName(article.category || "")
  const [related, trending] = await Promise.all([
    fetchByCategory(article.category_slug || categoryCfg.slug || "", 12).then((arr) =>
      arr.filter((a) => a.id !== String(article.id)).slice(0, 6),
    ),
    fetchTrending(8),
  ])

  const body =
    article.body ||
    article.excerpt ||
    "" ||
    "বিস্তারিত তথ্য শীঘ্রই আপডেট করা হবে। ঘটনাটির পটভূমি, বিশ্লেষণ ও প্রাসঙ্গিক তথ্য এখানে যুক্ত হবে।"

  const contentForReadTime = [article.excerpt, article.body].filter(Boolean).join(" ")

  return (
    <main className="container mx-auto px-3 sm:px-4 py-6">
      <nav className="text-sm text-muted-foreground mb-3">
        <Link href="/" className="hover:underline">
          {"হোম"}
        </Link>
        <span>{" / "}</span>
        {categoryCfg.slug ? (
          <Link href={`/category/${categoryCfg.slug}`} className="hover:underline">
            {article.category || categoryCfg.name}
          </Link>
        ) : (
          <span>{article.category || "অজানা"}</span>
        )}
      </nav>

      <header className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${categoryCfg.badge}`}>{article.category || "সংবাদ"}</span>
          {article.published_at && <span className="text-xs text-muted-foreground">{article.published_at}</span>}
          <span className="text-xs text-muted-foreground">
            {"• "}
            {readingTime(contentForReadTime || "")} {"পাঠ"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{article.title}</h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <article className="lg:col-span-8">
          <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-4">
            <Image
              src={article.image_url || "/placeholder.svg?height=450&width=800&query=news%20hero"}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:font-bold dark:prose-invert">
            {article.excerpt && <p>{article.excerpt}</p>}
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {"বিভাগ: "}
              {categoryCfg.slug ? (
                <Link href={`/category/${categoryCfg.slug}`} className="hover:underline">
                  {article.category || categoryCfg.name}
                </Link>
              ) : (
                <span>{article.category || categoryCfg.name}</span>
              )}
            </div>
            <ShareButtons title={article.title} />
          </div>

          {related.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3">{"আরো পড়ুন"}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.id} href={`/news/${r.id}`} className="group">
                    <div className="relative aspect-[16/9] rounded-md overflow-hidden">
                      <Image
                        src={r.image || "/placeholder.svg"}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover group-hover:opacity-90 transition"
                      />
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-snug group-hover:underline line-clamp-2">
                      {r.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="lg:col-span-4">
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
