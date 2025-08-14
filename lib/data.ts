import { supabaseServer } from "./supabase-server"
import type { Article, VideoItem, NewsCardItem } from "./types"
import { getCategoryBySlug } from "./categories"

function mapArticleToCard(a: Article): NewsCardItem {
  return {
    id: String(a.id),
    title: a.title,
    description: a.excerpt || "",
    image: a.image_url || "/breaking-news-desk.png",
    href: `/news/${a.id}`,
    category: a.category || undefined,
    publishedAt: a.published_at || undefined,
  }
}

export async function fetchFeatured(limit = 5) {
  const sb = supabaseServer()
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
  if (error) throw new Error(error.message)
  return (data || []).slice(0, limit).map(mapArticleToCard)
}

export async function fetchBreaking(limit = 10) {
  const sb = supabaseServer()
  const { data, error } = await sb
    .from("articles")
    .select("id,title")
    .eq("status", "published")
    .eq("is_breaking", true)
    .order("published_at", { ascending: false })
  if (error) throw new Error(error.message)
  return (data || []).slice(0, limit).map((a) => ({ id: String(a.id), title: a.title, href: `/news/${a.id}` }))
}

export async function fetchTrending(limit = 8) {
  const sb = supabaseServer()
  const { data, error } = await sb
    .from("articles")
    .select("id,title")
    .eq("status", "published")
    .eq("is_trending", true)
    .order("published_at", { ascending: false })
  if (error) throw new Error(error.message)
  return (data || []).slice(0, limit).map((a) => ({ id: String(a.id), title: a.title, href: `/news/${a.id}` }))
}

export async function fetchLatest(limit = 30) {
  const sb = supabaseServer()
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return (data || []).map(mapArticleToCard)
}

export async function fetchByCategory(slug: string, limit = 30) {
  const sb = supabaseServer()
  // Try by category_slug, fallback to category name
  const cat = getCategoryBySlug(slug)
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("status", "published")
    .or(`category_slug.eq.${slug},category.eq.${cat.name}`)
    .order("published_at", { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return (data || []).map(mapArticleToCard)
}

export async function fetchSearch(q: string, limit = 30) {
  const sb = supabaseServer()
  const ilike = `%${q}%`
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("status", "published")
    .or(`title.ilike.${ilike},excerpt.ilike.${ilike},body.ilike.${ilike},category.ilike.${ilike}`)
    .order("published_at", { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return (data || []).map(mapArticleToCard)
}

export async function fetchArticleById(id: string) {
  const sb = supabaseServer()
  const { data, error } = await sb.from("articles").select("*").eq("id", id).eq("status", "published").single()
  if (error) return null
  return data as Article
}

export async function fetchVideos(limit = 10) {
  const sb = supabaseServer()
  const { data, error } = await sb
    .from("videos")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return (data || []) as VideoItem[]
}
