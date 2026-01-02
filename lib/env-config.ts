export function validateEnvironment() {
  const errors: string[] = []

  // Optional: Forum API configuration (uses mock data if not provided)
  // No required environment variables - app works with free HuggingFace models

  return {
    isValid: true, // Always valid since no required env vars
    errors,
    config: {
      forumsApiUrl: process.env.FORUMS_API_URL || "Using mock data",
      forumsApiKey: !!process.env.FORUMS_API_KEY,
      useMockAI: process.env.USE_MOCK_AI === 'true',
      useHuggingFace: process.env.USE_HUGGINGFACE !== 'false',
    },
  }
}

export const envConfig = {
  FORUMS_API_URL: process.env.FORUMS_API_URL || "",
  FORUMS_API_KEY: process.env.FORUMS_API_KEY || "",
  USE_MOCK_AI: process.env.USE_MOCK_AI === 'true',
  USE_HUGGINGFACE: process.env.USE_HUGGINGFACE !== 'false',
}
