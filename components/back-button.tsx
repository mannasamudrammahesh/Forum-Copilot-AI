"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BackButtonProps {
  href?: string
  label?: string
  variant?: "outline" | "ghost" | "default"
  size?: "sm" | "default" | "lg"
}

export function BackButton({ 
  href, 
  label = "Back", 
  variant = "outline", 
  size = "sm" 
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  if (href) {
    return (
      <Link href={href}>
        <Button variant={variant} size={size}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </Link>
    )
  }

  return (
    <Button variant={variant} size={size} onClick={handleBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}