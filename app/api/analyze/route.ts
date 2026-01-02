import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

    if (!content) {
      return Response.json({ error: "Invalid request" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Analyze the sentiment and toxicity of this forum post. 
      
Post: "${content}"

Respond in JSON format with these exact fields:
{
  "sentiment": "Positive" | "Neutral" | "Negative",
  "toxicity": "Low" | "Medium" | "High"
}

Only respond with valid JSON, no other text.`,
    })

    const analysis = JSON.parse(text)
    return Response.json(analysis)
  } catch (error) {
    console.error("Analysis error:", error)
    return Response.json({ error: "Failed to analyze content" }, { status: 500 })
  }
}
