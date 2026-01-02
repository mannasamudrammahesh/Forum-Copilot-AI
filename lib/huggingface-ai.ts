import type { AnalysisResult, SummaryResult, Post } from "./types"

// Hugging Face Inference API - completely free, no quota limits
const HF_API_URL = "https://api-inference.huggingface.co/models"

// Free models for different tasks - optimized for speed
const MODELS = {
  sentiment: "cardiffnlp/twitter-roberta-base-sentiment-latest", // Fast sentiment analysis
  toxicity: "unitary/toxic-bert-base-uncased", // Toxicity detection
  summarization: "facebook/bart-large-cnn", // Text summarization
}

// Cache for model responses to improve performance
const responseCache = new Map<string, any>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function queryHuggingFace(model: string, inputs: any, retries = 2): Promise<any> {
  // Check cache first
  const cacheKey = `${model}:${JSON.stringify(inputs)}`
  const cached = responseCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3s timeout

    const response = await fetch(`${HF_API_URL}/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // No API key needed for public models!
      },
      body: JSON.stringify({ 
        inputs,
        options: { wait_for_model: false } // Don't wait if model is loading
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (retries > 0 && (response.status === 503 || response.status === 429)) {
        // Model is loading or rate limited, wait and retry
        await new Promise(resolve => setTimeout(resolve, 500))
        return queryHuggingFace(model, inputs, retries - 1)
      }
      throw new Error(`HuggingFace API error: ${response.status}`)
    }

    const result = await response.json()
    
    // Cache successful responses
    responseCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    })

    return result
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

export async function analyzeSentimentHF(content: string): Promise<AnalysisResult> {
  try {
    // Run both analyses in parallel for speed
    const [sentimentResult, toxicityResult] = await Promise.allSettled([
      queryHuggingFace(MODELS.sentiment, content),
      queryHuggingFace(MODELS.toxicity, content)
    ])
    
    // Process sentiment results
    let sentiment: "Positive" | "Neutral" | "Negative" = "Neutral"
    if (sentimentResult.status === 'fulfilled' && Array.isArray(sentimentResult.value) && sentimentResult.value[0]) {
      const topSentiment = sentimentResult.value[0][0]
      if (topSentiment.label === "LABEL_2" || topSentiment.label === "POSITIVE") sentiment = "Positive"
      else if (topSentiment.label === "LABEL_0" || topSentiment.label === "NEGATIVE") sentiment = "Negative"
      else sentiment = "Neutral"
    }
    
    // Process toxicity results
    let toxicity: "Low" | "Medium" | "High" = "Low"
    if (toxicityResult.status === 'fulfilled' && Array.isArray(toxicityResult.value) && toxicityResult.value[0]) {
      const toxicScore = toxicityResult.value[0][0]?.score || 0
      // More sensitive toxicity thresholds
      if (toxicScore > 0.5) toxicity = "High"
      else if (toxicScore > 0.25) toxicity = "Medium"
      else toxicity = "Low"
    }
    
    // If toxicity analysis failed, use enhanced fallback
    if (toxicityResult.status === 'rejected') {
      const fallback = fastMockAnalysis(content)
      toxicity = fallback.toxicity
    }
    
    // If both failed, use fast fallback
    if (sentimentResult.status === 'rejected' && toxicityResult.status === 'rejected') {
      return fastMockAnalysis(content)
    }
    
    return { sentiment, toxicity }
  } catch (error) {
    console.warn("HuggingFace AI failed, using fast mock analysis:", error)
    return fastMockAnalysis(content)
  }
}

export async function summarizeThreadHF(posts: Post[]): Promise<SummaryResult> {
  try {
    const text = posts.map(p => `${p.author}: ${p.content}`).join(" ")
    const truncatedText = text.slice(0, 800) // Optimize for speed
    
    const result = await queryHuggingFace(MODELS.summarization, truncatedText)
    
    let summary = "Unable to generate summary"
    if (Array.isArray(result) && result[0]?.summary_text) {
      summary = result[0].summary_text
    }
    
    return { summary }
  } catch (error) {
    console.warn("HuggingFace summarization failed, using fast mock:", error)
    return fastMockSummary(posts)
  }
}

// Ultra-fast fallback analysis (< 10ms) - Enhanced patterns
function fastMockAnalysis(content: string): AnalysisResult {
  const positive = /\b(good|great|amazing|awesome|excellent|love|perfect|wonderful|fantastic|brilliant|thank|helpful|nice|best|works|solved|fixed|appreciate|glad|happy|pleased|satisfied|cool|nice|awesome)\b/i
  const negative = /\b(bad|terrible|awful|hate|horrible|worst|stupid|useless|garbage|sucks|annoying|frustrated|broken|failed|error|problem|issue|wrong|disappointed|sad|angry|upset)\b/i
  
  // Enhanced toxicity patterns - much more comprehensive
  const highToxic = /\b(fuck|shit|bitch|asshole|damn|hell|crap|idiot|moron|dumb|pathetic|loser|trash|worthless|shut up|go away|stupid|fool|jerk|ass|bastard|piss|cock|dick)\b|fuck\s+you|go\s+fuck|fucking\s+\w+/i
  const mediumToxic = /\b(annoying|frustrated|irritating|ridiculous|nonsense|waste|pointless|useless|terrible|awful|horrible|disgusting)\b/i
  
  const sentiment = positive.test(content) ? "Positive" : 
                   negative.test(content) ? "Negative" : "Neutral"
  
  let toxicity: "Low" | "Medium" | "High" = "Low"
  if (highToxic.test(content)) {
    toxicity = "High"
  } else if (mediumToxic.test(content) || (negative.test(content) && content.length < 50)) {
    toxicity = "Medium"
  }
  
  return { sentiment, toxicity }
}

function fastMockSummary(posts: Post[]): SummaryResult {
  const authors = [...new Set(posts.map(p => p.author))]
  const totalWords = posts.reduce((acc, p) => acc + p.content.split(' ').length, 0)
  
  // Generate more intelligent summary based on content
  const hasQuestions = posts.some(p => p.content.includes('?'))
  const hasSolutions = posts.some(p => /\b(solution|fix|solved|works|try|use)\b/i.test(p.content))
  
  let summary = `Discussion with ${authors.length} participants across ${posts.length} posts (${totalWords} words). `
  
  if (hasQuestions && hasSolutions) {
    summary += "Community members asked questions and provided helpful solutions."
  } else if (hasQuestions) {
    summary += "Multiple questions were raised seeking community assistance."
  } else if (hasSolutions) {
    summary += "Various solutions and recommendations were shared."
  } else {
    summary += "General discussion covering technical topics and community feedback."
  }
  
  return { summary }
}

export function shouldUseHuggingFace(): boolean {
  return process.env.USE_HUGGINGFACE !== 'false' // Default to true
}