import { del, list, put } from '@vercel/blob';

export type StoredArtifact = {
  pathname: string;
  url: string;
  downloadUrl?: string;
  contentType?: string;
  uploadedAt?: string;
};

function requireStorage() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('WirelessRumor storage is not provisioned yet. Missing BLOB_READ_WRITE_TOKEN.');
  }
}

export async function storeText(pathname: string, content: string, contentType = 'text/plain; charset=utf-8') {
  requireStorage();
  return put(pathname, content, {
    access: 'private',
    addRandomSuffix: false,
    contentType,
  });
}

export async function storeJson(pathname: string, value: unknown) {
  return storeText(pathname, JSON.stringify(value, null, 2), 'application/json; charset=utf-8');
}

export async function listArtifacts(prefix?: string): Promise<StoredArtifact[]> {
  requireStorage();
  const result = await list({ prefix, limit: 1000 });
  return result.blobs.map((blob) => ({
    pathname: blob.pathname,
    url: blob.url,
    downloadUrl: blob.downloadUrl,
    contentType: blob.contentType,
    uploadedAt: blob.uploadedAt instanceof Date ? blob.uploadedAt.toISOString() : String(blob.uploadedAt),
  }));
}

export async function removeArtifact(urlOrPath: string) {
  requireStorage();
  await del(urlOrPath);
}

export const storageNamespaces = {
  research: 'research/',
  roundtables: 'roundtables/',
  sources: 'sources/',
  sponsorAssets: 'sponsors/',
  userSubmissions: 'submissions/',
  exports: 'exports/',
  audit: 'audit/',
} as const;
