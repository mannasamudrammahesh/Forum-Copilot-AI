import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Sparkles, Zap, Users } from "lucide-react"

interface ThreadCardProps {
  id: string
  title: string
  postCount: number
}

export function ThreadCard({ id, title, postCount }: ThreadCardProps) {
  return (
    <Link
      href={`/thread/${id}`}
      className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:scale-[1.02] relative overflow-hidden"
    >
      {/* Gradient overlay for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="mb-3 flex gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary animate-pulse">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Enhanced
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Zap className="mr-1 h-2 w-2" />
            Live Chat
          </Badge>
        </div>
        
        <h3 className="line-clamp-2 font-semibold text-foreground group-hover:text-primary mb-4 text-lg">
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{postCount} posts</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Live chat</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary font-medium">
            <span className="text-sm">Join & Analyze</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground">
          🤖 Real-time AI analysis • ⚡ Advanced models • 🚀 Sub-second responses
        </div>
      </div>
    </Link>
  )
}
