import { ThreadCard } from "@/components/thread-card"
import { getAllThreads } from "@/lib/forum-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquare, Shield, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const threads = getAllThreads()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2 animate-pulse">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Forum Copilot AI</h1>
              <p className="mt-1 text-base text-muted-foreground">
                AI-powered forum intelligence with real-time chat analysis
              </p>
            </div>
          </div>
          
          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <MessageSquare className="mr-1 h-3 w-3" />
              TL;DR Summaries
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp className="mr-1 h-3 w-3" />
              Sentiment Analysis
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <Shield className="mr-1 h-3 w-3" />
              Toxicity Detection
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Zap className="mr-1 h-3 w-3" />
              Real-Time Chat
            </Badge>
            <Link href="/live-demo">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Zap className="mr-1 h-3 w-3" />
                Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* AI Features Overview */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <MessageSquare className="h-5 w-5" />
                Smart Summaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700">
                Get AI-generated TL;DR summaries of long forum discussions in seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                Sentiment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700">
                Real-time sentiment detection to understand community mood and engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Shield className="h-5 w-5" />
                Toxicity Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700">
                Automated moderation with AI-powered toxicity detection and content filtering.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Zap className="h-5 w-5" />
                Live Chat Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700">
                Real-time messaging with instant AI analysis using advanced HuggingFace models.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Forum Threads */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Forum Threads</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Explore forum discussions enhanced with AI-powered insights and analysis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {threads.map((thread) => (
            <ThreadCard 
              key={thread.id} 
              id={thread.id} 
              title={thread.title} 
              postCount={thread.postCount || 0} 
            />
          ))}
        </div>
      </div>
    </main>
  )
}
