import type { AnalysisResult } from "@/lib/types"
import { mockSentimentAnalysis, shouldUseMockAI } from "@/lib/mock-ai"
import { analyzeSentimentHF, shouldUseHuggingFace } from "@/lib/huggingface-ai"

export async function POST(request: Request): Promise<Response> {
  try {
    const { content } = await request.json()

    if (!content || typeof content !== "string") {
      return Response.json({ error: "Invalid request: content is required" }, { status: 400 })
    }

    // Try Hugging Face first (free and fast)
    if (shouldUseHuggingFace()) {
      try {
        const analysis = await analyzeSentimentHF(content)
        return Response.json(analysis)
      } catch (hfError) {
        console.warn("[API] HuggingFace failed, using enhanced fallback:", hfError)
      }
    }

    // Use enhanced mock AI as fallback (always available)
    const analysis = mockSentimentAnalysis(content)
    return Response.json(analysis)
  } catch (error) {
    console.error("[API] Sentiment analysis error:", error)
    return Response.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}
