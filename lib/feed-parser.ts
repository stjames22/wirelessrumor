import { XMLParser, XMLValidator } from 'fast-xml-parser';

export type SourceItem = { title: string; url: string; publishedAt: string; source: string };
export type FeedSource = { name: string; url: string; host: string };
export const feedSources: FeedSource[] = [
  { name: 'OpenAI', url: 'https://openai.com/news/rss.xml', host: 'openai.com' },
  { name: 'Google AI', url: 'https://blog.google/technology/ai/rss/', host: 'blog.google' },
];

export function parseFeed(xml: string, source: FeedSource, now = Date.now()): SourceItem[] {
  if (xml.length > 2_000_000 || /<!DOCTYPE|<!ENTITY/i.test(xml) || XMLValidator.validate(xml) !== true) {
    throw new Error('Invalid source feed');
  }
  const parsed = new XMLParser({ ignoreAttributes: true, processEntities: true }).parse(xml);
  if (!parsed?.rss?.channel) throw new Error('Missing feed channel');
  const raw = parsed.rss.channel.item || [];
  const items = Array.isArray(raw) ? raw : [raw];
  return items.flatMap((item): SourceItem[] => {
    if (typeof item.title !== 'string' || typeof item.link !== 'string' || typeof item.pubDate !== 'string') return [];
    try {
      const url = new URL(item.link);
      const date = new Date(item.pubDate);
      if (url.protocol !== 'https:' || url.hostname !== source.host || url.username || url.password || !Number.isFinite(date.getTime()) || date.getTime() > now) return [];
      return [{ title: item.title.replace(/<[^>]*>/g, '').slice(0, 250), url: url.href, publishedAt: date.toISOString(), source: source.name }];
    } catch { return []; }
  });
}
