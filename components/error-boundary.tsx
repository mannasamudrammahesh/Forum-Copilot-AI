"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = () => setHasError(true)
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    return (
      fallback || (
        <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 font-semibold text-red-900">Something went wrong</h2>
          <p className="text-sm text-red-800">Please try refreshing the page or contact support.</p>
        </div>
      )
    )
  }

  return <>{children}</>
}
