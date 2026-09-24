import { feedSources, parseFeed, type SourceItem } from './feed-parser';

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
  return { items: unique.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 8), unavailable };
}
