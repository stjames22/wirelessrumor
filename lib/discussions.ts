import { list, put } from '@vercel/blob';

export type DiscussionMessage = {
  id: string;
  role: 'human' | 'astra';
  name: string;
  text: string;
  createdAt: string;
};

const PREFIX = 'wirelessrumor/discussions/open-floor/';

export async function appendDiscussionMessage(message: DiscussionMessage) {
  const safeId = message.id.replace(/[^a-zA-Z0-9-]/g, '');
  const pathname = `${PREFIX}${Date.now()}-${safeId}.json`;
  await put(pathname, JSON.stringify(message), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8',
    abortSignal: AbortSignal.timeout(10000),
  });
  return message;
}

export async function readDiscussionMessages(limit = 100) {
  const cappedLimit = Math.min(Math.max(limit, 1), 100);
  let cursor: string | undefined;
  let hasMore = true;
  let newestBlobs: Array<{ url: string }> = [];

  // Vercel Blob lists pathnames in lexicographical order. Discussion paths start
  // with their timestamp, so stopping after the first page would eventually pin
  // the room to its oldest messages. Walk the listing to the end while retaining
  // only the small tail that the UI actually needs to download.
  while (hasMore) {
    const result = await list({
      prefix: PREFIX,
      limit: 1000,
      cursor,
      abortSignal: AbortSignal.timeout(10000),
    });

    newestBlobs = [...newestBlobs, ...result.blobs].slice(-cappedLimit);
    hasMore = result.hasMore;
    cursor = result.cursor || undefined;

    if (hasMore && !cursor) throw new Error('Incomplete discussion listing');
  }

  const messages = await Promise.all(
    newestBlobs.map(async (blob) => {
      const response = await fetch(blob.url, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('Unable to read discussion message');
      const message = await response.json();
      if (!message || typeof message.id !== 'string' || typeof message.text !== 'string' || typeof message.name !== 'string' || !['human', 'astra'].includes(message.role) || !Number.isFinite(Date.parse(message.createdAt))) {
        throw new Error('Invalid discussion message');
      }
      return message as DiscussionMessage;
    }),
  );

  return messages
    .filter((message): message is DiscussionMessage => Boolean(message?.id && message?.text && message?.createdAt))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-cappedLimit);
}
