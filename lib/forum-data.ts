import type { Post, Thread } from "@/lib/types"

// Comprehensive mock forum data
export const mockForumData: Record<string, { title: string; posts: Post[] }> = {
  "1": {
    title: "How to optimize React performance",
    posts: [
      {
        id: "p1",
        author: "Sarah Chen",
        content:
          "I've been working on optimizing my React app and found that using React.memo on expensive components really helps. Has anyone else noticed significant improvements?",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "2 hours ago",
      },
      {
        id: "p2",
        author: "John Developer",
        content:
          "React.memo is useful, but profiling is the real key. Use React DevTools Profiler to identify bottlenecks before optimizing.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "1 hour ago",
      },
      {
        id: "p3",
        author: "Mike Code",
        content:
          "Virtual scrolling is a game changer for long lists! It completely transformed our app's performance. Everyone should be using this.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "45 minutes ago",
      },
      {
        id: "p4",
        author: "Alex React",
        content:
          "Some people keep making the same optimization mistakes over and over. Just follow the best practices already documented.",
        sentiment: "Negative",
        toxicity: "Medium",
        timestamp: "30 minutes ago",
      },
      {
        id: "p5",
        author: "Elena Web",
        content:
          "Great discussion! I found useMemo combined with useCallback really helped reduce unnecessary re-renders in my project.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "20 minutes ago",
      },
      {
        id: "p6",
        author: "David Build",
        content:
          "Don't forget about code splitting and lazy loading. Those have been more impactful for our large application than component optimization.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "15 minutes ago",
      },
    ],
  },
  "2": {
    title: "Next.js 14 best practices discussion",
    posts: [
      {
        id: "p1",
        author: "Emma Web",
        content: "Next.js 14 App Router is amazing! The improvements in performance are noticeable.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "3 hours ago",
      },
      {
        id: "p2",
        author: "Dev Forever",
        content: "Migration from Pages Router was smooth for our team. The new features make development faster.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "2 hours ago",
      },
      {
        id: "p3",
        author: "Framework Fan",
        content: "The built-in Image optimization and font loading improvements have been huge for our SEO metrics.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "1 hour ago",
      },
      {
        id: "p4",
        author: "Code Reviewer",
        content:
          "Has anyone dealt with the dynamic route complexity in App Router? Documentation could be better on this.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "45 minutes ago",
      },
      {
        id: "p5",
        author: "Rapid Developer",
        content:
          "Server components are a game changer. We've eliminated so much client-side code and improved performance significantly.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "30 minutes ago",
      },
    ],
  },
  "3": {
    title: "TypeScript vs JavaScript debate",
    posts: [
      {
        id: "p1",
        author: "Types Matter",
        content:
          "TypeScript catches so many bugs before runtime. Our team has been much more productive since switching.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "4 hours ago",
      },
      {
        id: "p2",
        author: "Dynamic Coder",
        content: "TypeScript adds complexity and build overhead. For small projects, plain JavaScript is often better.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "3 hours ago",
      },
      {
        id: "p3",
        author: "Type Enthusiast",
        content:
          "The type checking and IDE support alone makes TypeScript worth it. Once you go TypeScript, you don't go back.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "2 hours ago",
      },
      {
        id: "p4",
        author: "Backend Engineer",
        content:
          "TypeScript is essential for large codebases. We've seen huge improvements in maintainability and refactoring safety.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "1 hour ago",
      },
      {
        id: "p5",
        author: "JavaScript Purist",
        content: "All this hype about TypeScript is overblown. Proper testing and documentation work just as well.",
        sentiment: "Negative",
        toxicity: "Low",
        timestamp: "30 minutes ago",
      },
      {
        id: "p6",
        author: "Full Stack Dev",
        content:
          "It really depends on the project size and team. For teams, TypeScript is invaluable. For scripts, probably overkill.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "15 minutes ago",
      },
    ],
  },
  "4": {
    title: "Tailwind CSS tips and tricks",
    posts: [
      {
        id: "p1",
        author: "CSS Expert",
        content:
          "Using arbitrary values in Tailwind has saved me so much time. Why write custom CSS when Tailwind has it all?",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "5 hours ago",
      },
      {
        id: "p2",
        author: "Design Dev",
        content:
          "Tailwind's utility-first approach is great for rapid development. Our designs are more consistent now.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "4 hours ago",
      },
      {
        id: "p3",
        author: "Bundle Watcher",
        content: "Be careful with arbitrary values - they can bloat your CSS bundle if not used carefully.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "3 hours ago",
      },
      {
        id: "p4",
        author: "Styler",
        content: "The dark mode support is incredible. Makes switching themes trivial.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "2 hours ago",
      },
    ],
  },
  "5": {
    title: "Database indexing strategies",
    posts: [
      {
        id: "p1",
        author: "DBA Pro",
        content: "Proper indexing can mean the difference between millisecond and second-long queries.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "6 hours ago",
      },
      {
        id: "p2",
        author: "Data Architect",
        content: "Always analyze your queries with EXPLAIN before indexing. Don't guess where the bottleneck is.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "5 hours ago",
      },
      {
        id: "p3",
        author: "Performance Tuner",
        content: "Composite indexes are underrated. They can solve N+1 query problems elegantly.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "4 hours ago",
      },
      {
        id: "p4",
        author: "Query Master",
        content: "Just because you can add an index doesn't mean you should. Too many indexes can slow down writes.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "3 hours ago",
      },
    ],
  },
  "6": {
    title: "API design patterns for scale",
    posts: [
      {
        id: "p1",
        author: "API Architect",
        content: "REST is great for simple cases, but consider GraphQL for complex querying needs.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "7 hours ago",
      },
      {
        id: "p2",
        author: "Systems Designer",
        content: "Versioning your API endpoints is crucial. Don't break existing clients without a migration path.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "6 hours ago",
      },
      {
        id: "p3",
        author: "Backend Lead",
        content: "Rate limiting and proper error handling are often forgotten but absolutely essential.",
        sentiment: "Neutral",
        toxicity: "Low",
        timestamp: "5 hours ago",
      },
      {
        id: "p4",
        author: "Scale Expert",
        content: "Caching strategies can be as important as the API design itself. Redis becomes your best friend.",
        sentiment: "Positive",
        toxicity: "Low",
        timestamp: "4 hours ago",
      },
    ],
  },
}

export function getAllThreads(): Thread[] {
  return Object.entries(mockForumData).map(([id, data]) => ({
    id,
    title: data.title,
    postCount: data.posts.length,
  }))
}

export function getThreadById(id: string) {
  const data = mockForumData[id]
  if (!data) return null
  return {
    id,
    title: data.title,
    posts: data.posts,
  }
}
