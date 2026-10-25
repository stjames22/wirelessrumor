import { list, put } from '@vercel/blob';
import { mkdir, readFile, readdir, rename, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

export type DiscussionMessage = {
  id: string;
  role: 'human' | 'astra';
  name: string;
  text: string;
  createdAt: string;
  citations?: Array<{ start: number; end: number; url: string; title: string }>;
};

const PREFIX = 'wirelessrumor/discussions/open-floor/';

export async function appendDiscussionMessage(message: DiscussionMessage) {
  if (process.env.DISCUSSION_DATA_DIR) {
    const directory = process.env.DISCUSSION_DATA_DIR;
    await mkdir(directory, { recursive: true });
    const filename = `${Date.now()}-${crypto.randomUUID()}.json`;
    const temporary = path.join(directory, `.${filename}.tmp`);
    await writeFile(temporary, JSON.stringify(message), { flag: 'wx', mode: 0o600 });
    await rename(temporary, path.join(directory, filename));
    return message;
  }
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
  if (process.env.DISCUSSION_DATA_DIR) {
    const directory = process.env.DISCUSSION_DATA_DIR;
    await mkdir(directory, { recursive: true });
    await access(directory, constants.R_OK | constants.W_OK);
    const files = (await readdir(directory)).filter(name => /^\d+-[a-f0-9-]+\.json$/.test(name)).sort().slice(-cappedLimit);
    const messages = await Promise.all(files.map(async name => JSON.parse(await readFile(path.join(directory, name), 'utf8')) as DiscussionMessage));
    return messages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
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
