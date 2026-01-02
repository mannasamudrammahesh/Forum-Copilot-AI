import type { Post, SummaryResult } from "@/lib/types"
import { mockSummarization } from "@/lib/mock-ai"
import { summarizeThreadHF, shouldUseHuggingFace } from "@/lib/huggingface-ai"

export async function POST(request: Request): Promise<Response> {
  try {
    const { posts } = await request.json()

    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return Response.json({ error: "Invalid request: posts array is required" }, { status: 400 })
    }

    // Try Hugging Face first (free and fast)
    if (shouldUseHuggingFace()) {
      try {
        const result = await summarizeThreadHF(posts)
        return Response.json(result)
      } catch (hfError) {
        console.warn("[API] HuggingFace summarization failed, using enhanced fallback:", hfError)
      }
    }

    // Use enhanced mock AI as fallback (always available)
    const result = mockSummarization(posts)
    return Response.json(result)
  } catch (error) {
    console.error("[API] Summarization error:", error)
    return Response.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
