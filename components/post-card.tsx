import { SentimentBadge } from "@/components/sentiment-badge"
import { ToxicityBadge } from "@/components/toxicity-badge"
import type { Post } from "@/lib/types"

type SentimentType = "Positive" | "Neutral" | "Negative"
type ToxicityLevel = "Low" | "Medium" | "High"

interface PostCardProps extends Post {}

export function PostCard({ author, content, sentiment, toxicity, timestamp }: PostCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{author}</h4>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
        <div className="flex gap-2">
          <SentimentBadge sentiment={sentiment} />
          <ToxicityBadge toxicity={toxicity} />
        </div>
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">{content}</p>
    </div>
  )
}
