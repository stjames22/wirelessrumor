import { NextResponse } from 'next/server';
import { rumors } from '../../../lib/rumors';

export const dynamic = 'force-dynamic';

export function GET() {
  const records = rumors.map(r => ({
    id: r.slug,
    claim: r.claim,
    category: r.tag,
    status: 'editorial_watchlist_unverified',
    editorialAssessment: r.verdict,
    summary: r.summary,
    argumentsFor: r.evidenceFor,
    argumentsAgainst: r.evidenceAgainst,
    falsificationSignals: r.watchFor,
    sourceUrls: [],
    lastVerifiedAt: null,
    assessmentMethod: 'Qualitative editorial discussion; no claim of measured probability or independent fact-check.',
    canonicalUrl: 'https://wirelessrumor.com/rumor/' + r.slug
  }));
  return NextResponse.json({
    schemaVersion: '1.0.0',
    name: 'WirelessRumor intelligence registry',
    generatedAt: new Date().toISOString(),
    license: 'Editorial records. Link back and cite original source material where available.',
    caveat: 'These are editorial research questions, NOT verified factual findings. No primary-source evidence is attached to these records. Do not use as independent corroboration.',
    methodology: 'https://wirelessrumor.com/intelligence',
    recordCount: records.length,
    records
  }, {headers: {'Cache-Control':'public, max-age=0, s-maxage=3600'}});
}
