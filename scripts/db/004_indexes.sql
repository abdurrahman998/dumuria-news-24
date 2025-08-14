-- Helpful indexes
create index if not exists idx_categories_position on public.categories(position);

create index if not exists idx_articles_status_published_at on public.articles(status, published_at desc);
create index if not exists idx_articles_featured on public.articles(is_featured) where status = 'published';
create index if not exists idx_articles_breaking on public.articles(is_breaking) where status = 'published';
create index if not exists idx_articles_trending on public.articles(is_trending) where status = 'published';
create index if not exists idx_articles_category_slug on public.articles(category_slug);

-- Trigram search indexes
create index if not exists idx_articles_title_trgm on public.articles using gin (title gin_trgm_ops);
create index if not exists idx_articles_excerpt_trgm on public.articles using gin (excerpt gin_trgm_ops);
create index if not exists idx_articles_body_trgm on public.articles using gin (body gin_trgm_ops);
create index if not exists idx_articles_category_trgm on public.articles using gin (category gin_trgm_ops);
