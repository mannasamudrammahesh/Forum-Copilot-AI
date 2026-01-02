"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { use } from "react"
import type { Post, Thread, AnalysisResult } from "@/lib/types"
import { SentimentBadge } from "@/components/sentiment-badge"
import { ToxicityBadge } from "@/components/toxicity-badge"
import { RealTimeChat } from "@/components/real-time-chat"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, MessageSquare, Zap } from "lucide-react"

export default function ThreadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [thread, setThread] = useState<Thread | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState<string>("")
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [summaryError, setSummaryError] = useState<string>("")
  const [analyzingPosts, setAnalyzingPosts] = useState<Set<string>>(new Set())
  const [postAnalyses, setPostAnalyses] = useState<Record<string, AnalysisResult>>({})

  // Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchThread() {
      try {
        setError("")
        const response = await fetch(`/api/threads/${id}`)
        if (response.ok) {
          const data = await response.json()
          setThread(data)
        } else {
          setError("Failed to load thread. Please try again.")
        }
      } catch (error) {
        console.error("[v0] Failed to fetch thread:", error)
        setError("An error occurred while loading the thread.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchThread()
  }, [id])

  const analyzePost = async (post: Post) => {
    if (analyzingPosts.has(post.id)) return

    setAnalyzingPosts(prev => new Set(prev).add(post.id))
    
    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.content }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setPostAnalyses(prev => ({ ...prev, [post.id]: analysis }))
      }
    } catch (error) {
      console.error("Failed to analyze post:", error)
    } finally {
      setAnalyzingPosts(prev => {
        const newSet = new Set(prev)
        newSet.delete(post.id)
        return newSet
      })
    }
  }

  const handleSummarize = async () => {
    if (!thread?.posts) return

    setIsLoadingSummary(true)
    setSummaryError("")
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: thread.posts }),
      })

      if (response.ok) {
        const data = await response.json()
        setSummary(data.summary)
        setShowSummary(true)
      } else {
        const data = await response.json()
        setSummaryError(data.error || "Failed to generate summary")
      }
    } catch (error) {
      console.error("[v0] Failed to summarize:", error)
      setSummaryError("An error occurred while generating the summary.")
    } finally {
      setIsLoadingSummary(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
        <header className="border-b border-border bg-card shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
              <BackButton href="/" label="Back to Threads" />
            </div>
            <div className="animate-pulse space-y-2">
              <div className="h-8 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          </div>
        </header>
      </main>
    )
  }

  if (!thread || error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
        <header className="border-b border-border bg-card shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
              <BackButton href="/" label="Back to Threads" />
            </div>
            <p className="text-foreground">{error || "Thread not found"}</p>
          </div>
        </header>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4">
            <BackButton href="/" label="Back to Threads" />
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{thread.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {thread.posts?.length || 0} posts • AI-powered insights available
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* AI Features Section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI-Powered Thread Intelligence</h3>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs animate-pulse">
                  🤖 Live AI Analysis
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ⚡ AI Models
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Button
                onClick={handleSummarize}
                disabled={isLoadingSummary}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isLoadingSummary ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    AI Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Smart TL;DR
                  </>
                )}
              </Button>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  <Zap className="mr-1 h-3 w-3" />
                  Real-time Chat
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  Sentiment Analysis
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Toxicity Detection
                </Badge>
              </div>
            </div>

            {summaryError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800">⚠️ {summaryError}</p>
              </div>
            )}

            {showSummary && summary && (
              <div className="rounded-lg border border-primary/30 bg-white p-6 shadow-sm">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  🤖 AI-Generated Thread Summary
                </h4>
                <div className="space-y-2 whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded">
                  {summary}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ⚡ Generated using free HuggingFace models with smart fallback
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Real-Time Chat Section */}
        <div className="mb-8">
          <RealTimeChat threadId={id} threadTitle={thread.title} />
        </div>

        {/* Posts */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Original Discussion Posts
          </h2>
          {thread.posts?.map((post: Post) => {
            const analysis = postAnalyses[post.id]
            const isAnalyzing = analyzingPosts.has(post.id)
            
            return (
              <Card
                key={post.id}
                className="transition-all hover:shadow-md hover:border-primary/30"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{post.author}</h4>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {analysis ? (
                        <>
                          <SentimentBadge sentiment={analysis.sentiment} />
                          <ToxicityBadge toxicity={analysis.toxicity} />
                        </>
                      ) : post.sentiment && post.toxicity ? (
                        <>
                          <SentimentBadge sentiment={post.sentiment} />
                          <ToxicityBadge toxicity={post.toxicity} />
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => analyzePost(post)}
                          disabled={isAnalyzing}
                          className="text-xs"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-1 h-3 w-3" />
                              Analyze
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{post.content}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
