import type { SentimentType } from "@/lib/types"

interface SentimentBadgeProps {
  sentiment: SentimentType
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const colors = {
    Positive: "bg-green-100 text-green-800 border-green-200",
    Neutral: "bg-gray-100 text-gray-800 border-gray-200",
    Negative: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${colors[sentiment]}`}>
      {sentiment}
    </span>
  )
}
