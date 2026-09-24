export function aiConfigured() {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
