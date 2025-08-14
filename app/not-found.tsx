import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "পাতাটি পাওয়া যায়নি - ডুমুরিয়া নিউজ ২৪",
  description: "আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি। ডুমুরিয়া নিউজ ২৪ এর হোম পেজে ফিরে যান।",
}

export default function NotFound() {
  return (
    <main className="container mx-auto px-3 sm:px-4 py-12 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">পাতাটি পাওয়া যায়নি</h1>
        <p className="text-muted-foreground mb-6">আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    </main>
  )
}
