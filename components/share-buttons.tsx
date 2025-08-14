"use client"

import { Facebook, Twitter, Share2, MessageCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToastContext } from "@/components/toast-provider"

export default function ShareButtons({
  title = "",
  url = "",
}: {
  title?: string
  url?: string
}) {
  const { addToast } = useToastContext()
  const currentUrl = typeof window !== "undefined" ? window.location.href : url

  const share = (platform: "facebook" | "twitter" | "whatsapp") => {
    const u = encodeURIComponent(currentUrl || "")
    const t = encodeURIComponent(title)
    let shareUrl = ""
    if (platform === "facebook") shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${u}`
    if (platform === "twitter") shareUrl = `https://twitter.com/intent/tweet?url=${u}&text=${t}`
    if (platform === "whatsapp") shareUrl = `https://api.whatsapp.com/send?text=${t}%20${u}`
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600")
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl || "")
      addToast("লিংক কপি হয়েছে!", "success")
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = currentUrl || ""
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      addToast("লিংক কপি হয়েছে!", "success")
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button size="icon" variant="ghost" onClick={() => share("facebook")} aria-label="শেয়ার ফেসবুকে">
        <Facebook className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={() => share("twitter")} aria-label="শেয়ার টুইটারে">
        <Twitter className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={() => share("whatsapp")} aria-label="শেয়ার হোয়াটসঅ্যাপে">
        <MessageCircle className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={copyLink} aria-label="লিংক কপি করুন">
        <Copy className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" aria-label="আরো অপশন">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
