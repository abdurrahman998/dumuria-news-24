-- Enable RLS
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.videos enable row level security;

-- Public read access to categories
drop policy if exists "public_select_categories" on public.categories;
create policy "public_select_categories"
on public.categories
for select
to anon, authenticated
using (true);

-- Public read access to published articles only
drop policy if exists "public_select_published_articles" on public.articles;
create policy "public_select_published_articles"
on public.articles
for select
to anon, authenticated
using (
  status = 'published'
  and (published_at is null or published_at <= now())
);

-- Public read access to published videos only
drop policy if exists "public_select_published_videos" on public.videos;
create policy "public_select_published_videos"
on public.videos
for select
to anon, authenticated
using (
  status = 'published'
  and (published_at is null or published_at <= now())
);

-- Note: Do NOT add insert/update/delete policies for anon.
-- Use the Service Role key on the server (admin panel) for mutations.
