import { NextRequest } from "next/server"
import type { Post } from "@/lib/types"
import { analyzeSentimentHF } from "@/lib/huggingface-ai"
import { mockSentimentAnalysis } from "@/lib/mock-ai"

// In-memory storage for demo (in production, use a database)
const threadPosts: Record<string, Post[]> = {}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { author, content } = await request.json()

    if (!author || !content) {
      return Response.json({ error: "Author and content are required" }, { status: 400 })
    }

    // Generate unique post ID
    const postId = `p${Date.now()}`
    
    // Analyze sentiment in real-time (fast)
    let sentiment: "Positive" | "Neutral" | "Negative" = "Neutral"
    let toxicity: "Low" | "Medium" | "High" = "Low"
    
    try {
      const analysis = await analyzeSentimentHF(content)
      sentiment = analysis.sentiment
      toxicity = analysis.toxicity
    } catch (error) {
      // Fallback to ultra-fast mock analysis
      const analysis = mockSentimentAnalysis(content)
      sentiment = analysis.sentiment
      toxicity = analysis.toxicity
    }

    const newPost: Post = {
      id: postId,
      author,
      content,
      sentiment,
      toxicity,
      timestamp: new Date().toLocaleString(),
    }

    // Add to thread
    if (!threadPosts[id]) {
      threadPosts[id] = []
    }
    threadPosts[id].push(newPost)

    console.log(`[Real-time] New post added to thread ${id}: ${author}`)

    return Response.json({ 
      success: true, 
      post: newPost,
      message: "Post added successfully with AI analysis"
    })
  } catch (error) {
    console.error("[API] Failed to add post:", error)
    return Response.json({ error: "Failed to add post" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const posts = threadPosts[id] || []
    
    return Response.json({ posts })
  } catch (error) {
    console.error("[API] Failed to get posts:", error)
    return Response.json({ error: "Failed to get posts" }, { status: 500 })
  }
}