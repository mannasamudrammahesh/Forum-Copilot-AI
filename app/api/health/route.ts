import { validateEnvironment } from "@/lib/env-config"

export async function GET() {
  const envValidation = validateEnvironment()

  if (!envValidation.isValid) {
    return Response.json(
      {
        status: "error",
        message: "Missing required environment variables",
        errors: envValidation.errors,
      },
      { status: 503 },
    )
  }

  return Response.json(
    {
      status: "ok",
      message: "Forum Copilot AI is running",
      timestamp: new Date().toISOString(),
      environment: envValidation.config,
    },
    { status: 200 },
  )
}
