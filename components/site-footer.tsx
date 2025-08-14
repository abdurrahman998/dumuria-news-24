import Link from "next/link"
import { Facebook, Twitter, Youtube } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t bg-white dark:bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="grid gap-2">
          <div className="text-xl font-bold">
            <span className="text-red-700">{"ডুমুরিয়া"}</span> <span>{"নিউজ ২৪"}</span>
          </div>
          <p className="text-sm text-muted-foreground">{"আপনার নির্ভরযোগ্য বাংলা সংবাদ মাধ্যম।"}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{"দ্রুত লিংক"}</h4>
          <ul className="grid gap-1 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                {"প্রাইভেসি পলিসি"}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                {"টার্মস অ্যান্ড কন্ডিশনস"}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                {"যোগাযোগ"}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{"সামাজিক যোগাযোগ"}</h4>
          <div className="flex items-center gap-2">
            <Link href="#" className="p-2 rounded-full border hover:bg-muted" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" className="p-2 rounded-full border hover:bg-muted" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="p-2 rounded-full border hover:bg-muted" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t py-3 text-center text-xs text-muted-foreground">
        {"© "} {new Date().getFullYear()} {" ডুমুরিয়া নিউজ ২৪ — সর্বস্বত্ব সংরক্ষিত।"}
      </div>
    </footer>
  )
}
