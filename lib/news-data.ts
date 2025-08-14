export type NewsItem = {
  id: string
  title: string
  description: string
  image: string
  href?: string
  category: string
  featured?: boolean
  breaking?: boolean
  trending?: boolean
  publishedAt: string
}

export const categories = ["জাতীয়", "আন্তর্জাতিক", "রাজনীতি", "খেলাধুলা", "বিনোদন", "অর্থনীতি", "প্রযুক্তি", "মতামত"]

const img = (w: number, h: number, q: string) =>
  `/placeholder.svg?height=${h}&width=${w}&query=${encodeURIComponent(q)}`

export const allNews: NewsItem[] = [
  {
    id: "1",
    title: "জাতীয় বাজেটে কৃষিখাতে বরাদ্দ বৃদ্ধি",
    description: "চাষিদের ভর্তুকি ও আধুনিক প্রযুক্তি ব্যবহারে উৎসাহ দিতে কৃষিখাতে বরাদ্দ বাড়ানোর ঘোষণা।",
    image: img(800, 450, "Bangladesh Parliament budget session"),
    href: "#",
    category: "অর্থনীতি",
    featured: true,
    trending: true,
    publishedAt: "আজ ১০:১৫ PM",
  },
  {
    id: "2",
    title: "বিশ্বকাপে দুর্দান্ত জয়ে সেমিফাইনালে বাংলাদেশ",
    description: "রোমাঞ্চকর ম্যাচে শেষ ওভারে জিতে সেমিফাইনালে জায়গা করে নিল টাইগাররা।",
    image: img(800, 450, "Bangladesh cricket team celebration"),
    href: "#",
    category: "খেলাধুলা",
    featured: true,
    breaking: true,
    trending: true,
    publishedAt: "আজ ৮:৩০ PM",
  },
  {
    id: "3",
    title: "স্মার্ট সিটি উদ্যোগে নতুন রোডম্যাপ প্রকাশ",
    description: "প্রযুক্তিনির্ভর নগর ব্যবস্থাপনায় ট্রাফিক, বর্জ্য ও নিরাপত্তা উন্নয়নে পরিকল্পনা।",
    image: img(800, 450, "Dhaka smart city at night"),
    href: "#",
    category: "প্রযুক্তি",
    featured: true,
    publishedAt: "আজ ৭:৪৫ PM",
  },
  {
    id: "4",
    title: "বন্যার্তদের পাশে দাঁড়াতে সরকার ও বেসরকারি সহায়তা",
    description: "প্রভাবিত এলাকায় ত্রাণ বিতরণ ও পুনর্বাসনে তৎপর প্রশাসন ও স্বেচ্ছাসেবীরা।",
    image: img(800, 450, "Flood relief Bangladesh"),
    href: "#",
    category: "জাতীয়",
    breaking: true,
    publishedAt: "আজ ৬:২০ PM",
  },
  {
    id: "5",
    title: "বিনোদন জগতে নতুন ছবি: মুক্তি পেতে যাচ্ছে আলোচিত সিনেমা",
    description: "খ্যাতনামা অভিনেতা-অভিনেত্রীদের অভিনয়ে নির্মিত সিনেমাটি আলোচনায়।",
    image: img(800, 450, "Bangla cinema poster"),
    href: "#",
    category: "বিনোদন",
    trending: true,
    publishedAt: "আজ ৫:০০ PM",
  },
  {
    id: "6",
    title: "আন্তর্জাতিক সম্মেলনে বাংলাদেশের সাফল্য",
    description: "প্রযুক্তি ও উদ্ভাবনে স্বীকৃতি পেল দেশের তরুণ গবেষকরা।",
    image: img(800, 450, "International tech conference"),
    href: "#",
    category: "আন্তর্জাতিক",
    publishedAt: "আজ ৪:১৫ PM",
  },
  {
    id: "7",
    title: "শেয়ারবাজারে সূচকের বড় উত্থান",
    description: "বিনিয়োগকারীদের আস্থা ফিরে আসায় লেনদেনে গতি, সূচক বেড়েছে উল্লেখযোগ্য হারে।",
    image: img(800, 450, "Stock market rising chart"),
    href: "#",
    category: "অর্থনীতি",
    breaking: true,
    publishedAt: "আজ ৩:৪৫ PM",
  },
  {
    id: "8",
    title: "প্রযুক্তিতে নারী: স্টার্টআপে নতুন দিগন্ত",
    description: "নারী উদ্যোক্তাদের স্টার্টআপে বিনিয়োগ ও নেটওয়ার্কিংয়ে জোর।",
    image: img(800, 450, "Women in tech startup"),
    href: "#",
    category: "প্রযুক্তি",
    publishedAt: "আজ ২:৩০ PM",
  },
  {
    id: "9",
    title: "রাজনৈতিক সংলাপ: সমঝোতার পথে অগ্রগতি",
    description: "বিভিন্ন ইস্যুতে দলগুলো সমঝোতার কাছাকাছি বলে জানিয়েছেন আলোচকরা।",
    image: img(800, 450, "Political dialogue meeting"),
    href: "#",
    category: "রাজনীতি",
    trending: true,
    publishedAt: "আজ ১:১০ PM",
  },
  {
    id: "10",
    title: "মতামত: শিক্ষায় রূপবদলের চ্যালেঞ্জ",
    description: "শিক্ষা ব্যবস্থার আধুনিকায়নে কী ধরনের পদক্ষেপ প্রয়োজন—বিশ্লেষণ।",
    image: img(800, 450, "Education reform concept"),
    href: "#",
    category: "মতামত",
    publishedAt: "আজ ১২:০০ PM",
  },
  {
    id: "11",
    title: "জাতীয় দলে নতুন কোচ, কী বদলাবে খেলার কৌশল?",
    description: "কোচিং স্টাফে পরিবর্তনে দলীয় পরিকল্পনায় আসছে নতুনত্ব।",
    image: img(800, 450, "Football coach strategy board"),
    href: "#",
    category: "খেলাধুলা",
    publishedAt: "গতকাল ১০:০০ PM",
  },
  {
    id: "12",
    title: "সংস্কৃতির ঐতিহ্য: পুরাকীর্তি সংরক্ষণে উদ্যোগ",
    description: "ঐতিহ্যগত স্থাপনা সংরক্ষণে বিশেষ প্রকল্পের ঘোষণা।",
    image: img(800, 450, "Heritage site Bangladesh"),
    href: "#",
    category: "জাতীয়",
    publishedAt: "গতকাল ৮:৩০ PM",
  },
]

export const sampleVideos = [
  {
    id: "v1",
    title: "বিশ্বকাপ জয়: ম্যাচ বিশ্লেষণ",
    description: "খেলার গুরুত্বপূর্ণ মুহূর্তগুলো নিয়ে বিশেষ প্রতিবেদন।",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: img(800, 450, "Cricket analysis studio"),
  },
  {
    id: "v2",
    title: "স্টার্টআপ গল্প: সফলতার পথচলা",
    description: "তরুণ উদ্যোক্তাদের অনুপ্রেরণামূলক গল্প।",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: img(800, 450, "Startup founders discussion"),
  },
  {
    id: "v3",
    title: "বন্যা পরিস্থিতি: মাঠের প্রতিবেদন",
    description: "ক্ষতিগ্রস্ত এলাকার সাম্প্রতিক চিত্র।",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    poster: img(800, 450, "Flood field report"),
  },
]
