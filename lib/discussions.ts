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
  throw new Error('Persistent discussion storage is not configured');
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
  throw new Error('Persistent discussion storage is not configured');
}
