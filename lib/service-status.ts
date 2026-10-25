import { getApiKey } from './ai-key';
export function aiConfigured() {
  try { return Boolean(getApiKey()); } catch { return false; }
}
