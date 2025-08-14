import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Sans_Bengali } from "next/font/google"
import SiteHeader from "@/components/site-header"
import CategoriesNav from "@/components/categories-nav"
import { getNavItems } from "@/lib/categories"
import { ToastProvider } from "@/components/toast-provider"
import "./globals.css"

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ডুমুরিয়া নিউজ ২৪ - আপনার নির্ভরযোগ্য বাংলা সংবাদ মাধ্যম",
  description:
    "বাংলাদেশের সর্বশেষ সংবাদ, রাজনীতি, খেলাধুলা, বিনোদন, অর্থনীতি ও আন্তর্জাতিক খবর। ২৪ ঘন্টা আপডেট থাকুন ডুমুরিয়া নিউজ ২৪ এর সাথে।",
  keywords: ["বাংলা সংবাদ", "বাংলাদেশ", "খবর", "রাজনীতি", "খেলাধুলা", "বিনোদন", "অর্থনীতি"],
  authors: [{ name: "ডুমুরিয়া নিউজ ২৪" }],
  creator: "ডুমুরিয়া নিউজ ২৪",
  publisher: "ডুমুরিয়া নিউজ ২৪",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://dumurianews24.com",
    siteName: "ডুমুরিয়া নিউজ ২৪",
    title: "ডুমুরিয়া নিউজ ২৪ - আপনার নির্ভরযোগ্য বাংলা সংবাদ মাধ্যম",
    description: "বাংলাদেশের সর্বশেষ সংবাদ, রাজনীতি, খেলাধুলা, বিনোদন, অর্থনীতি ও আন্তর্জাতিক খবর।",
  },
  twitter: {
    card: "summary_large_image",
    title: "ডুমুরিয়া নিউজ ২৪",
    description: "বাংলাদেশের সর্বশেষ সংবাদ ও আপডেট",
    creator: "@dumurianews24",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" className={notoBengali.className}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ToastProvider>
          <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-background">
            <div className="container mx-auto px-3 sm:px-4">
              <div className="flex items-center justify-between py-3 gap-3">
                <SiteHeader placeholder="খুঁজুন..." showDateTime />
              </div>
            </div>
            <div className="border-t" />
            <div className="container mx-auto px-0 sm:px-4">
              <CategoriesNav items={getNavItems().map(({ name, slug, icon }) => ({ name, slug, icon }))} />
            </div>
          </header>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
