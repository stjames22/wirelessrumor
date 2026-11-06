import { feedSources, parseFeed, type SourceItem } from './feed-parser';

// Normalize product identifiers across related publishers without conflating unrelated news.
export function announcementKey(title: string): string {
  const match = title.toLowerCase().match(/\b(gemini\s+(?:omni\s+)?\d+(?:\.\d+)?\s*(?:pro|flash|ultra|lite)?)\b/);
  return match ? match[1].replace(/[^a-z0-9]/g, '') : title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ').replace(/\b(the|a|an|introducing|announcing|new|our|latest)\b/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

export async function readSourceFeed() {
  const results = await Promise.allSettled(feedSources.map(async (source) => {
    const response = await fetch(source.url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Source unavailable');
    const items = parseFeed(await response.text(), source);
    if (!items.length) throw new Error('Source has no dated items');
    return items;
  }));
  const items: SourceItem[] = [];
  const unavailable: string[] = [];
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') items.push(...result.value);
    else unavailable.push(feedSources[index].name);
  });
  const unique = [...new Map(items.map(item => [item.url, item])).values()];
  const sorted = unique.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const seenGoogle = new Set<string>();
  const deduped = sorted.filter(item => {
    // Google AI and DeepMind often syndicate the same Gemini announcement.
    if (item.source !== 'Google AI' && item.source !== 'Google DeepMind') return true;
    const key = announcementKey(item.title);
    if (seenGoogle.has(key)) return false;
    seenGoogle.add(key);
    return true;
  });
  return { items: deduped.slice(0, 8), unavailable };
}
