export type SentimentType = "Positive" | "Neutral" | "Negative"
export type ToxicityLevel = "Low" | "Medium" | "High"

export interface Post {
  id: string
  author: string
  content: string
  sentiment: SentimentType
  toxicity: ToxicityLevel
  timestamp: string
}

export interface Thread {
  id: string
  title: string
  posts?: Post[]
  postCount?: number
}

export interface ThreadResponse {
  id: string
  title: string
  posts: Post[]
}

export interface AnalysisResult {
  sentiment: SentimentType
  toxicity: ToxicityLevel
}

export interface SummaryResult {
  summary: string
}
