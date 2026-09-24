import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed, feedSources } from '../lib/feed-parser';

const source = feedSources[0];
const item = (link = 'https://openai.com/index/test', date = 'Wed, 23 Sep 2026 18:00:00 GMT') => `<item><title>AI &amp; evidence</title><link>${link}</link><pubDate>${date}</pubDate></item>`;
const feed = (content: string) => `<rss><channel>${content}</channel></rss>`;
const now = Date.parse('2026-09-24T12:00:00Z');

test('parses a single dated publisher item and decodes entities', () => {
  assert.deepEqual(parseFeed(feed(item()), source, now), [{ title: 'AI & evidence', url: 'https://openai.com/index/test', publishedAt: '2026-09-23T18:00:00.000Z', source: 'OpenAI' }]);
});
test('rejects off-domain, non-https, invalid and future-dated links', () => {
  const xml = feed(item('javascript:alert(1)') + item('https://evil.example/news') + item(undefined, 'invalid') + item(undefined, 'Wed, 23 Sep 2027 18:00:00 GMT'));
  assert.deepEqual(parseFeed(xml, source, now), []);
});
test('rejects malformed XML and entity declarations', () => {
  assert.throws(() => parseFeed('<rss>', source, now));
  assert.throws(() => parseFeed('<!DOCTYPE rss><rss><channel/></rss>', source, now));
});
