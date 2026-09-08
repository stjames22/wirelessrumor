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
  provider: 'Vercel Blob',
  provisioned: false,
  note: 'Runtime adapter intentionally disabled until a Blob store/token is attached to the WirelessRumor Vercel project. Keeping the namespace contract here avoids coupling editorial code to a personal drive while preserving a deployable site.',
} as const;
