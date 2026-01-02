import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Forum Copilot AI - AI-Powered Forum Intelligence",
  description: "AI-powered intelligence layer for forums with thread summaries, sentiment analysis, and toxicity detection. Built for hackathon demonstration.",
  keywords: ["AI", "forum", "sentiment analysis", "toxicity detection", "OpenAI", "Next.js", "hackathon"],
  authors: [{ name: "Forum Copilot AI Team" }],
  generator: "Next.js",
  openGraph: {
    title: "Forum Copilot AI",
    description: "AI-powered intelligence layer for forums with real-time analysis",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <body className={`font-sans antialiased`}>
        <div className="min-h-screen bg-background text-foreground">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
