import type { ToxicityLevel } from "@/lib/types"

type ToxicityLevelLocal = "Low" | "Medium" | "High"

interface ToxicityBadgeProps {
  toxicity: ToxicityLevel | ToxicityLevelLocal
}

export function ToxicityBadge({ toxicity }: ToxicityBadgeProps) {
  const colors = {
    Low: "bg-blue-100 text-blue-800 border-blue-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    High: "bg-orange-100 text-orange-800 border-orange-200",
  }

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${colors[toxicity as ToxicityLevelLocal]}`}
    >
      {toxicity}
    </span>
  )
}
