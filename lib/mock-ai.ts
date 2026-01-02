import type { AnalysisResult, SummaryResult, Post } from "./types"

// Mock AI responses for demo purposes when OpenAI API is unavailable
export function mockSentimentAnalysis(content: string): AnalysisResult {
  // Enhanced keyword-based mock analysis
  const positiveWords = ['amazing', 'great', 'excellent', 'wonderful', 'fantastic', 'love', 'perfect', 'awesome', 'brilliant', 'thank', 'happy', 'glad', 'pleased', 'satisfied', 'cool', 'nice', 'works', 'solved', 'fixed', 'appreciate']
  const negativeWords = ['terrible', 'awful', 'hate', 'horrible', 'disgusting', 'worst', 'stupid', 'useless', 'garbage', 'sucks', 'bad', 'broken', 'failed', 'error', 'problem', 'wrong', 'disappointed', 'sad', 'angry', 'upset']
  
  // Enhanced toxicity detection - much more comprehensive
  const highToxicWords = ['fuck', 'shit', 'bitch', 'asshole', 'damn', 'hell', 'crap', 'idiot', 'moron', 'dumb', 'pathetic', 'loser', 'trash', 'worthless', 'stupid', 'fool', 'jerk', 'ass', 'bastard', 'piss', 'cock', 'dick']
  const mediumToxicWords = ['annoying', 'frustrated', 'irritating', 'ridiculous', 'nonsense', 'waste', 'pointless', 'useless', 'terrible', 'awful', 'horrible', 'disgusting']
  
  const lowerContent = content.toLowerCase()
  
  let positiveScore = 0
  let negativeScore = 0
  let highToxicScore = 0
  let mediumToxicScore = 0
  
  positiveWords.forEach(word => {
    if (lowerContent.includes(word)) positiveScore++
  })
  
  negativeWords.forEach(word => {
    if (lowerContent.includes(word)) negativeScore++
  })
  
  highToxicWords.forEach(word => {
    if (lowerContent.includes(word)) highToxicScore += 3
  })
  
  mediumToxicWords.forEach(word => {
    if (lowerContent.includes(word)) mediumToxicScore += 1
  })
  
  // Check for toxic phrases
  if (/fuck\s+you|go\s+fuck|fucking\s+\w+/i.test(content)) {
    highToxicScore += 5
  }
  
  // Determine sentiment
  let sentiment: "Positive" | "Neutral" | "Negative"
  if (positiveScore > negativeScore) {
    sentiment = "Positive"
  } else if (negativeScore > positiveScore) {
    sentiment = "Negative"
  } else {
    sentiment = "Neutral"
  }
  
  // Determine toxicity with enhanced logic
  let toxicity: "Low" | "Medium" | "High"
  if (highToxicScore >= 3) {
    toxicity = "High"
  } else if (highToxicScore >= 1 || mediumToxicScore >= 2) {
    toxicity = "Medium"
  } else {
    toxicity = "Low"
  }
  
  return { sentiment, toxicity }
}

export function mockSummarization(posts: Post[]): SummaryResult {
  const authors = [...new Set(posts.map(p => p.author))]
  const totalPosts = posts.length
  
  // Generate a mock summary based on post content
  const summary = `• Discussion involves ${authors.length} participants (${authors.join(', ')}) across ${totalPosts} posts
• Main topics discussed include technical issues, solutions, and community feedback
• Participants shared various perspectives and experiences related to the forum topic
• The conversation shows active engagement with multiple viewpoints presented
• Overall discussion demonstrates collaborative problem-solving and knowledge sharing`
  
  return { summary }
}

export function shouldUseMockAI(): boolean {
  // Use mock AI as fallback when HuggingFace models are unavailable
  return process.env.USE_MOCK_AI === 'true'
}