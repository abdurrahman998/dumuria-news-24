"use client"

import Link from "next/link"

type TrendItem = {
  id: string
  title: string
  href?: string
}

export default function TrendingSidebar({ items = [] }: { items?: TrendItem[] }) {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-black text-white px-3 py-2 font-semibold">{"ট্রেন্ডিং"}</div>
      <ol className="divide-y">
        {items.map((item, idx) => {
          const link = item.id ? `/news/${item.id}` : item.href || "#"
          return (
            <li key={item.id} className="p-3">
              <Link href={link} className="grid grid-cols-[auto_1fr] gap-2 items-start">
                <span className="text-red-700 font-bold">{idx + 1}.</span>
                <span className="hover:underline text-sm text-black dark:text-white">{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
