"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SentimentBadge } from "@/components/sentiment-badge"
import { ToxicityBadge } from "@/components/toxicity-badge"
import { BackButton } from "@/components/back-button"
import { Loader2, Sparkles, MessageSquare, Zap, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function LiveDemoPage() {
  const [testContent, setTestContent] = useState("This is amazing! I love how fast the AI analysis works!")
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisTime, setAnalysisTime] = useState<number>(0)
  const [demoStats, setDemoStats] = useState({
    totalAnalyses: 0,
    avgResponseTime: 0,
    activeUsers: Math.floor(Math.random() * 50) + 10
  })

  // Auto-analyze on content change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (testContent.trim()) {
        analyzeContent()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [testContent])

  // Update demo stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStats(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 50) + 10
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const analyzeContent = async () => {
    if (!testContent.trim()) return

    setIsAnalyzing(true)
    const startTime = Date.now()
    
    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: testContent })
      })
      
      const result = await response.json()
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      setAnalysisResult(result)
      setAnalysisTime(responseTime)
      
      // Update stats
      setDemoStats(prev => ({
        totalAnalyses: prev.totalAnalyses + 1,
        avgResponseTime: Math.round((prev.avgResponseTime + responseTime) / 2),
        activeUsers: prev.activeUsers
      }))
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const quickTests = [
    "This is absolutely amazing! The AI analysis is incredibly fast and accurate!",
    "I'm having some issues with this feature, it's not working as expected.",
    "You're all complete idiots, this is totally useless garbage and waste of time!",
    "Thanks for the help everyone, I really appreciate the community support here.",
    "This solution is okay, nothing special but it works fine for basic needs.",
    "Wow! This hackathon project is going to win first place for sure!",
    "The real-time analysis is broken and completely unreliable, fix it now!"
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4">
            <BackButton href="/" label="Back to Forum" />
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-2 animate-pulse">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">🚀 Live AI Demo - Hackathon Edition</h1>
              <p className="text-sm text-muted-foreground">Real-time sentiment analysis • Free HuggingFace models • Sub-second responses</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Live Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-800">{demoStats.activeUsers}</p>
                  <p className="text-sm text-green-600">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-800">{demoStats.totalAnalyses}</p>
                  <p className="text-sm text-blue-600">AI Analyses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-800">{analysisTime}ms</p>
                  <p className="text-sm text-purple-600">Last Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Real-time Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Real-Time AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Type anything to see instant AI analysis:
                </label>
                <Input
                  value={testContent}
                  onChange={(e) => setTestContent(e.target.value)}
                  placeholder="Type your message here..."
                  className="text-base"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Analysis happens automatically as you type (with 1s delay)
                </p>
              </div>

              {/* Quick Test Buttons */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Quick Tests:</p>
                <div className="flex flex-wrap gap-2">
                  {quickTests.map((test, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setTestContent(test)}
                      className="text-xs"
                    >
                      Test {index + 1}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Analysis Results */}
              <div className="rounded-lg border bg-muted/50 p-4 min-h-[100px]">
                {isAnalyzing ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2 text-sm">Analyzing with AI...</span>
                  </div>
                ) : analysisResult ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">AI Analysis Result:</h4>
                      <Badge variant="outline" className="text-xs">
                        {analysisTime}ms response
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <SentimentBadge sentiment={analysisResult.sentiment} />
                      <ToxicityBadge toxicity={analysisResult.toxicity} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analysis powered by free HuggingFace models with instant fallback
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p className="text-sm">Start typing to see real-time AI analysis</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features Showcase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Live Features Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h4 className="font-medium text-green-800">Real-Time Chat</h4>
                    <p className="text-sm text-green-700">Users can post messages and get instant AI analysis</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h4 className="font-medium text-blue-800">Free AI Models</h4>
                    <p className="text-sm text-blue-700">HuggingFace models with no quota limits</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h4 className="font-medium text-purple-800">Ultra-Fast Analysis</h4>
                    <p className="text-sm text-purple-700">Sub-second response times with smart fallbacks</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h4 className="font-medium text-orange-800">Live Moderation</h4>
                    <p className="text-sm text-orange-700">Automatic toxicity detection for content moderation</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Link href="/thread/1">
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Try Real-Time Chat in Thread
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Details */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">AI Models Used:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• cardiffnlp/twitter-roberta-base-sentiment-latest</li>
                  <li>• unitary/toxic-bert-base-uncased</li>
                  <li>• facebook/bart-large-cnn (summarization)</li>
                  <li>• Ultra-fast regex fallback for instant responses</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Performance Features:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Real-time analysis as users type</li>
                  <li>• Smart caching and fallback systems</li>
                  <li>• No API quotas or rate limits</li>
                  <li>• Sub-second response times</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}