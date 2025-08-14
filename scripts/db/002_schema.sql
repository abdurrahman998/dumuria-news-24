-- Categories
create table if not exists public.categories (
  id           bigserial primary key,
  name         text not null unique,
  slug         text not null unique,
  position     int not null default 0,
  created_at   timestamptz not null default now()
);

-- Articles
create table if not exists public.articles (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text unique,
  excerpt         text,
  body            text,                      -- store HTML/Markdown
  image_url       text,
  category        text,                      -- human-readable category name (BN)
  category_slug   text,                      -- foreign key to categories.slug
  is_featured     boolean not null default false,
  is_breaking     boolean not null default false,
  is_trending     boolean not null default false,
  status          text not null default 'draft',  -- draft | scheduled | published | archived
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint articles_status_chk check (status in ('draft','scheduled','published','archived')),
  constraint articles_category_slug_fk foreign key (category_slug) references public.categories(slug) on update cascade on delete set null
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at before update on public.articles
for each row execute function public.set_updated_at();

-- Videos
create table if not exists public.videos (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  src_url       text not null,
  poster_url    text,
  status        text not null default 'draft', -- draft | published
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  constraint videos_status_chk check (status in ('draft','published'))
);
