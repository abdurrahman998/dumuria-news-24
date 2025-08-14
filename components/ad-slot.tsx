"use client"

type AdSlotProps = {
  slotName?: string
}

export default function AdSlot({ slotName = "Ad Slot" }: AdSlotProps) {
  // Placeholder responsive ad container
  return (
    <div
      className="w-full border rounded-md bg-zinc-100 dark:bg-zinc-900 text-center text-xs text-muted-foreground p-3"
      aria-label="বিজ্ঞাপন"
    >
      <div className="mx-auto grid gap-2">
        <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{slotName}</div>
        <div className="h-24 sm:h-28 md:h-40 lg:h-60 w-full bg-white dark:bg-black/30 border rounded-sm grid place-items-center">
          {"Google AdSense Placeholder"}
        </div>
        <div className="text-[10px]">{"এখানে আপনার AdSense কোড যুক্ত করুন।"}</div>
      </div>
    </div>
  )
}
