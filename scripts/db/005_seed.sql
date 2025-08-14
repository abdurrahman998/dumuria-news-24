-- Seed categories (position controls navbar order)
insert into public.categories (name, slug, position) values
  ('জাতীয়', 'national', 1),
  ('আন্তর্জাতিক', 'international', 2),
  ('রাজনীতি', 'politics', 3),
  ('খেলাধুলা', 'sports', 4),
  ('বিনোদন', 'entertainment', 5),
  ('অর্থনীতি', 'economy', 6),
  ('প্রযুক্তি', 'technology', 7),
  ('মতামত', 'opinion', 8)
on conflict (slug) do update set name = excluded.name, position = excluded.position;

-- Seed articles (sample data)
insert into public.articles
(title, slug, excerpt, body, image_url, category, category_slug, is_featured, is_breaking, is_trending, status, published_at)
values
('জাতীয় বাজেটে কৃষিখাতে বরাদ্দ বৃদ্ধি',
 'budget-agri-increase',
 'চাষিদের ভর্তুকি ও আধুনিক প্রযুক্তি ব্যবহারে উৎসাহ দিতে কৃষিখাতে বরাদ্দ বাড়ানোর ঘোষণা।',
 '<p>চাষিদের ভর্তুকি ও আধুনিক প্রযুক্তি ব্যবহারে উৎসাহ দিতে কৃষিখাতে বরাদ্দ বাড়ানো হয়েছে। বিশেষজ্ঞরা বলছেন, উৎপাদনশীলতা বাড়াতে এটি ইতিবাচক পদক্ষেপ।</p>',
 '/placeholder.svg?height=450&width=800',
 'অর্থনীতি','economy', true, false, true, 'published', now() - interval '1 hour'),

('বিশ্বকাপে দুর্দান্ত জয়ে সেমিফাইনালে বাংলাদেশ',
 'wc-bangladesh-semi',
 'রোমাঞ্চকর ম্যাচে শেষ ওভারে জিতে সেমিফাইনালে জায়গা করে নিল টাইগাররা।',
 '<p>শেষ ওভারের নাটকীয়তায় জয়। অধিনায়ক ও কোচের কৌশল নিয়ে বিশ্লেষণ।</p>',
 '/placeholder.svg?height=450&width=800',
 'খেলাধুলা','sports', true, true, true, 'published', now() - interval '3 hours'),

('স্মার্ট সিটি উদ্যোগে নতুন রোডম্যাপ প্রকাশ',
 'smart-city-roadmap',
 'প্রযুক্তিনির্ভর নগর ব্যবস্থাপনায় ট্রাফিক, বর্জ্য ও নিরাপত্তা উন্নয়নে পরিকল্পনা।',
 '<p>স্মার্ট সিটি বাস্তবায়নে নতুন কর্মপরিকল্পনা; নাগরিক সেবায় প্রযুক্তির ব্যবহার।</p>',
 '/placeholder.svg?height=450&width=800',
 'প্রযুক্তি','technology', true, false, false, 'published', now() - interval '5 hours'),

('বন্যার্তদের পাশে দাঁড়াতে সরকার ও বেসরকারি সহায়তা',
 'flood-relief-support',
 'প্রভাবিত এলাকায় ত্রাণ বিতরণ ও পুনর্বাসনে তৎপর প্রশাসন ও স্বেচ্ছাসেবীরা।',
 '<p>বন্যার্তদের জন্য ত্রাণ কার্যক্রম জোরদার করা হয়েছে। বিভিন্ন সংগঠন মাঠে কাজ করছে।</p>',
 '/placeholder.svg?height=450&width=800',
 'জাতীয়','national', false, true, false, 'published', now() - interval '7 hours'),

('বিনোদন জগতে নতুন ছবি: মুক্তি পেতে যাচ্ছে আলোচিত সিনেমা',
 'new-film-release',
 'খ্যাতনামা অভিনেতা-অভিনেত্রীদের অভিনয়ে নির্মিত সিনেমাটি আলোচনায়।',
 '<p>ট্রেলার প্রকাশের পরই দর্শকদের আগ্রহ বেড়েছে।</p>',
 '/placeholder.svg?height=450&width=800',
 'বিনোদন','entertainment', false, false, true, 'published', now() - interval '9 hours'),

('আন্তর্জাতিক সম্মেলনে বাংলাদেশের সাফল্য',
 'intl-conference-success',
 'প্রযুক্তি ও উদ্ভাবনে স্বীকৃতি পেল দেশের তরুণ গবেষকরা।',
 '<p>বাংলাদেশি গবেষকদের অর্জন আন্তর্জাতিকভাবে প্রশংসিত।</p>',
 '/placeholder.svg?height=450&width=800',
 'আন্তর্জাতিক','international', false, false, false, 'published', now() - interval '11 hours'),

('শেয়ারবাজারে সূচকের বড় উত্থান',
 'stock-market-rally',
 'বিনিয়োগকারীদের আস্থা ফিরে আসায় লেনদেনে গতি, সূচক বেড়েছে উল্লেখযোগ্য হারে।',
 '<p>বিশ্লেষকদের মতে, নীতিগত সিদ্ধান্তের ইতিবাচক প্রভাব দেখা যাচ্ছে।</p>',
 '/placeholder.svg?height=450&width=800',
 'অর্থনীতি','economy', false, true, false, 'published', now() - interval '12 hours'),

('প্রযুক্তিতে নারী: স্টার্টআপে নতুন দিগন্ত',
 'women-in-tech',
 'নারী উদ্যোক্তাদের স্টার্টআপে বিনিয়োগ ও নেটওয়ার্কিংয়ে জোর।',
 '<p>নারীদের অংশগ্রহণে প্রযুক্তি খাতে সম্ভাবনা উজ্জ্বল।</p>',
 '/placeholder.svg?height=450&width=800',
 'প্রযুক্তি','technology', false, false, false, 'published', now() - interval '14 hours'),

('রাজনৈতিক সংলাপ: সমঝোতার পথে অগ্রগতি',
 'political-dialogue-progress',
 'বিভিন্ন ইস্যুতে দলগুলো সমঝোতার কাছাকাছি বলে জানিয়েছেন আলোচকরা।',
 '<p>আলোচনায় অগ্রগতি; শিগগিরই যৌথ বিবৃতি আসতে পারে।</p>',
 '/placeholder.svg?height=450&width=800',
 'রাজনীতি','politics', false, false, true, 'published', now() - interval '16 hours'),

('মতামত: শিক্ষায় রূপবদলের চ্যালেঞ্জ',
 'opinion-education-reform',
 'শিক্ষা ব্যবস্থার আধুনিকায়নে কী ধরনের পদক্ষেপ প্রয়োজন—বিশ্লেষণ।',
 '<p>শিক্ষাবিদদের দৃষ্টিতে সংস্কারের করণীয়।</p>',
 '/placeholder.svg?height=450&width=800',
 'মতামত','opinion', false, false, false, 'published', now() - interval '20 hours')
on conflict (slug) do nothing;

-- Seed videos
insert into public.videos (title, description, src_url, poster_url, status, published_at) values
('বিশ্বকাপ জয়: ম্যাচ বিশ্লেষণ',
 'খেলার গুরুত্বপূর্ণ মুহূর্তগুলো নিয়ে বিশেষ প্রতিবেদন।',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
 '/placeholder.svg?height=450&width=800',
 'published', now() - interval '2 hours'),

('স্টার্টআপ গল্প: সফলতার পথচলা',
 'তরুণ উদ্যোক্তাদের অনুপ্রেরণামূলক গল্প।',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
 '/placeholder.svg?height=450&width=800',
 'published', now() - interval '6 hours'),

('বন্যা পরিস্থিতি: মাঠের প্রতিবেদন',
 'ক্ষতিগ্রস্ত এলাকার সাম্প্রতিক চিত্র।',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
 '/placeholder.svg?height=450&width=800',
 'published', now() - interval '10 hours')
on conflict do nothing;
