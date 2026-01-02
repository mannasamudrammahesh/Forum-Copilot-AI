export const FORUMS_API_URL = process.env.FORUMS_API_URL || "https://api.forums.example.com"
export const FORUMS_API_KEY = process.env.FORUMS_API_KEY || ""

export interface ForumsAPIResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export async function fetchFromForumsAPI<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const url = `${FORUMS_API_URL}${endpoint}`
    console.log(`[Forums API] Fetching: ${url}`)

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FORUMS_API_KEY}`,
      ...options?.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      console.warn(`[Forums API] HTTP ${response.status} - Endpoint may not exist, falling back to mock data`)
      return null
    }

    const contentType = response.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      console.warn(`[Forums API] Invalid response format, falling back to mock data`)
      return null
    }

    const result = (await response.json()) as ForumsAPIResponse<T>

    // Handle different response formats
    if (result.success && result.data) {
      return result.data
    } else if (!result.success && result.error) {
      console.warn(`[Forums API] API Error: ${result.error}`)
      return null
    }

    // If response is direct data (not wrapped in success/data)
    if (typeof result === "object" && result !== null) {
      return result as T
    }

    return null
  } catch (error) {
    console.warn("[Forums API] Request failed:", error instanceof Error ? error.message : String(error))
    return null
  }
}
