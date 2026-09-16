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
  });
  return message;
}

export async function readDiscussionMessages(limit = 100) {
  const result = await list({ prefix: PREFIX, limit: Math.min(Math.max(limit, 1), 100) });
  const messages = await Promise.all(
    result.blobs.map(async (blob) => {
      try {
        const response = await fetch(blob.url, { cache: 'no-store' });
        if (!response.ok) return null;
        return (await response.json()) as DiscussionMessage;
      } catch {
        return null;
      }
    }),
  );

  return messages
    .filter((message): message is DiscussionMessage => Boolean(message?.id && message?.text && message?.createdAt))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-limit);
}
