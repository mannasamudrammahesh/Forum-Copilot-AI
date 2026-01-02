"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SentimentBadge } from "@/components/sentiment-badge"
import { ToxicityBadge } from "@/components/toxicity-badge"
import { Send, MessageCircle, Sparkles, Users, Zap, Clock } from "lucide-react"
import type { Post } from "@/lib/types"

interface RealTimeChatProps {
  threadId: string
  threadTitle: string
}

export function RealTimeChat({ threadId, threadTitle }: RealTimeChatProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [author, setAuthor] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [liveStats, setLiveStats] = useState({
    activeUsers: Math.floor(Math.random() * 25) + 5,
    totalMessages: 0,
    avgResponseTime: 0
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive (only within chat container)
  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chat-messages-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }

  useEffect(() => {
    // Only scroll if there are posts
    if (posts.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100)
    }
  }, [posts])

  // Simulate real-time updates and live stats
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/threads/${threadId}/posts`)
        if (response.ok) {
          const data = await response.json()
          setPosts(data.posts)
          setLiveStats(prev => ({
            ...prev,
            totalMessages: data.posts.length,
            activeUsers: Math.floor(Math.random() * 25) + 5
          }))
          setIsConnected(true)
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error)
        setIsConnected(false)
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(interval)
  }, [threadId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !author.trim()) return

    setIsPosting(true)
    const startTime = Date.now()
    
    try {
      const response = await fetch(`/api/threads/${threadId}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          content: newMessage.trim(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const responseTime = Date.now() - startTime
        
        // Add the new post immediately for instant feedback
        setPosts(prev => [...prev, data.post])
        setNewMessage("")
        setIsConnected(true)
        
        // Update response time stats
        setLiveStats(prev => ({
          ...prev,
          avgResponseTime: Math.round((prev.avgResponseTime + responseTime) / 2)
        }))
      } else {
        console.error("Failed to post message")
      }
    } catch (error) {
      console.error("Error posting message:", error)
      setIsConnected(false)
    } finally {
      setIsPosting(false)
    }
  }

  const quickMessages = [
    "Thanks for the help! This solution works perfectly.",
    "I'm having the same issue. Has anyone found a fix?",
    "Great explanation! This really helped me understand.",
    "Could you provide more details about this approach?",
    "This is exactly what I was looking for!"
  ]

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Live Discussion Hub
            <Badge variant={isConnected ? "default" : "destructive"} className="animate-pulse">
              {isConnected ? "🟢 Live" : "🔴 Offline"}
            </Badge>
          </CardTitle>
          
          {/* Live Stats */}
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {liveStats.activeUsers} online
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              {liveStats.avgResponseTime}ms AI
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💬 <strong>{threadTitle}</strong> • Real-time AI analysis • Free HuggingFace models
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Messages Area */}
        <div 
          className="h-80 overflow-y-auto space-y-3 p-4 bg-white rounded-lg border shadow-inner scroll-smooth"
          id="chat-messages-container"
        >
          {posts.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="relative">
                    <Users className="h-12 w-12 opacity-30" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Start the conversation!</p>
                  <p className="text-sm">Messages get instant AI analysis for sentiment & toxicity</p>
                </div>
              </div>
            </div>
          ) : (
            posts.map((post, index) => (
              <div key={post.id} className="flex flex-col space-y-2 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-l-4 border-primary/30 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-primary">{post.author}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.timestamp}
                        {index === posts.length - 1 && (
                          <Badge variant="outline" className="text-xs animate-pulse">
                            <Sparkles className="h-2 w-2 mr-1" />
                            Latest
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <SentimentBadge sentiment={post.sentiment} />
                    <ToxicityBadge toxicity={post.toxicity} />
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed pl-11">{post.content}</p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Message Buttons */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Quick responses:</p>
          <div className="flex flex-wrap gap-2">
            {quickMessages.map((msg, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setNewMessage(msg)}
                className="text-xs hover:bg-primary/10"
                disabled={isPosting}
              >
                {msg.slice(0, 20)}...
              </Button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Your name (e.g., Alex, Sarah)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="flex-1"
              maxLength={30}
            />
            <div className="flex gap-1">
              <Badge variant="secondary" className="px-3 py-2 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Analysis
              </Badge>
              <Badge variant="secondary" className="px-3 py-2 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                AI Models
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Share your thoughts, ask questions, or provide solutions..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 text-sm"
              maxLength={500}
              disabled={isPosting}
            />
            <Button 
              type="submit" 
              disabled={isPosting || !newMessage.trim() || !author.trim()}
              className="px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isPosting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">AI Analyzing...</span>
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="text-xs text-muted-foreground text-center bg-white/50 rounded p-2">
          🤖 Every message gets <strong>instant AI analysis</strong> for sentiment & toxicity • 
          ⚡ Powered by <strong>free HuggingFace models</strong> • 
          🚀 Sub-second response times with smart fallbacks
        </div>
      </CardContent>
    </Card>
  )
}