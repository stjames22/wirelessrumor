export type StoredArtifact = {
  pathname: string;
  url: string;
  downloadUrl?: string;
  contentType?: string;
  uploadedAt?: string;
};

export const storageNamespaces = {
  research: 'research/',
  roundtables: 'roundtables/',
  sources: 'sources/',
  sponsorAssets: 'sponsors/',
  userSubmissions: 'submissions/',
  exports: 'exports/',
  audit: 'audit/',
} as const;

export const storageStatus = {
  provider: 'Railway persistent volume',
  provisioned: Boolean(process.env.DISCUSSION_DATA_DIR),
  note: 'Public discussions use the mounted Railway volume. Editorial content is versioned in Git.',
};
