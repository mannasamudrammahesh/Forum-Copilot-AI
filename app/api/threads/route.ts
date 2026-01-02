import { fetchFromForumsAPI } from "@/lib/forum-api"
import { getAllThreads } from "@/lib/forum-data"
import type { Thread } from "@/lib/types"

export async function GET() {
  console.log("[Threads API] Fetching threads list")

  try {
    // Try to fetch from real Forums API
    const threads = await fetchFromForumsAPI<Thread[]>("/threads")

    if (threads) {
      console.log(`[Threads API] Successfully fetched ${threads.length} threads from Forums API`)
      return Response.json({ threads })
    }
  } catch (error) {
    console.warn("[Threads API] Forums API request failed:", error instanceof Error ? error.message : String(error))
  }

  console.log("[Threads API] Forums API unavailable, using mock data")
  const threads = getAllThreads()
  return Response.json({ threads })
}
