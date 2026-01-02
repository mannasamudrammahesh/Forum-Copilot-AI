export function validateEnvironment() {
  const errors: string[] = []

  if (!process.env.OPENAI_API_KEY) {
    errors.push("OPENAI_API_KEY is required for AI features")
  }

  if (!process.env.FORUMS_API_URL) {
    errors.push("FORUMS_API_URL is required to connect to the forum API")
  }

  if (!process.env.FORUMS_API_KEY) {
    errors.push("FORUMS_API_KEY is required for forum API authentication")
  }

  return {
    isValid: errors.length === 0,
    errors,
    config: {
      openaiApiKey: !!process.env.OPENAI_API_KEY,
      forumsApiUrl: process.env.FORUMS_API_URL || "Not set",
      forumsApiKey: !!process.env.FORUMS_API_KEY,
    },
  }
}

export const envConfig = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  FORUMS_API_URL: process.env.FORUMS_API_URL || "",
  FORUMS_API_KEY: process.env.FORUMS_API_KEY || "",
}
