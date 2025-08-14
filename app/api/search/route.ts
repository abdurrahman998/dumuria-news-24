import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("q") || "").trim()
    if (!q) return NextResponse.json({ news: [], categories: [] })

    const sb = supabaseServer()
    const ilike = `%${q}%`

    const [newsRes, catRes] = await Promise.all([
      sb.from("articles").select("id,title").eq("status", "published").ilike("title", ilike).limit(5),
      sb.from("categories").select("id,name,slug").ilike("name", ilike).limit(5),
    ])

    if (newsRes.error) throw newsRes.error
    if (catRes.error) throw catRes.error

    return NextResponse.json({
      news: newsRes.data || [],
      categories: catRes.data || [],
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Search failed" }, { status: 500 })
  }
}
