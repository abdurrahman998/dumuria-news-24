export type Article = {
  id: string
  title: string
  excerpt?: string | null
  body?: string | null
  image_url?: string | null
  category?: string | null
  category_slug?: string | null
  is_featured?: boolean | null
  is_breaking?: boolean | null
  is_trending?: boolean | null
  status?: string | null
  published_at?: string | null
}

export type VideoItem = {
  id: string
  title: string
  description?: string | null
  src_url: string
  poster_url?: string | null
  status?: string | null
  published_at?: string | null
}

export type NewsCardItem = {
  id: string
  title: string
  description: string
  image: string
  href?: string
  category?: string
  publishedAt?: string
}
