import { fetchFromForumsAPI } from "@/lib/forum-api"
import { getThreadById } from "@/lib/forum-data"
import type { ThreadResponse } from "@/lib/types"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  console.log(`[Thread API] Fetching thread: ${id}`)
  console.log(`[Thread API] Request URL: ${request.url}`)

  // Validate ID parameter
  if (!id || id === 'undefined') {
    console.error(`[Thread API] Invalid thread ID: ${id}`)
    return Response.json({ error: "Invalid thread ID" }, { status: 400 })
  }

  try {
    // Try to fetch from real Forums API first
    const thread = await fetchFromForumsAPI<ThreadResponse>(`/threads/${id}`)

    if (thread) {
      console.log(`[Thread API] Successfully fetched from Forums API`)
      return Response.json(thread)
    }
  } catch (error) {
    console.warn("[API] Forums API request failed:", error instanceof Error ? error.message : String(error))
  }

  console.log(`[Thread API] Forums API unavailable, using mock data for thread: ${id}`)
  const thread = getThreadById(id)

  if (!thread) {
    console.error(`[Thread API] Thread not found in mock data: ${id}`)
    return Response.json({ error: "Thread not found" }, { status: 404 })
  }

  console.log(`[Thread API] Successfully found mock thread: ${thread.title}`)
  return Response.json(thread)
}
