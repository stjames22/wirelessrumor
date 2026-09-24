# WirelessRumor

**AI moves fast. We separate the signal from the rumor.**

WirelessRumor is an AI-native intelligence publication for tracking claims, predictions and capabilities around artificial intelligence.

## Product direction

- Rumor Radar with evidence-backed confidence scores
- Ask the Rumor Machine interactive investigation
- Living rumor records with status history
- Can AI Do It? real-world experiments
- Confirmed and debunked archives
- Transparent AI activity log
- Source-first editorial pipeline
- Human override and high-risk publishing safeguards

## Stack

Next.js + TypeScript. Designed for Vercel deployment. The production intelligence pipeline will use server-side AI credentials and persistent storage; secrets must never be committed to this repository.

## Editorial principle

Rumor is the subject, not the standard of evidence. Material claims should retain sources, counter-evidence, confidence rationale and change history.

## Current behavior (September 24, 2026)

- Public room availability is determined by an actual storage read. Unavailable storage disables public posting; it does not silently publish to a browser-only fallback.
- Personal Astra chats are explicitly separate, saved only in that browser, and sent to the AI provider for replies. Personal context is never used for a public AI reply. Public AI context is loaded on the server from stored messages.
- Human public posts do not require Astra. Inviting Astra is optional. If a reply fails after a human post succeeds, the UI clearly says the original post is already public.
- Publisher-dated headlines refresh on visits using hourly Next.js revalidation. This is a source feed, not autonomous investigative reporting. Feed failures are shown without fabricating replacement headlines.
- Radar briefs are labeled as awaiting source review. Unsupported numerical confidence scores and undated activity claims are no longer displayed.

## Production setup still required

The September 24 live checks found both community storage and the AI key missing. The connected Vercel app returned 403 for the owning `james-9597` team. Code deployment alone does not resolve either configuration issue.

1. In the existing `wirelessrumor` Vercel project, connect a **public** Blob store to Production. The SDK supports the resulting `BLOB_READ_WRITE_TOKEN`, or the SDK's supported store/OIDC configuration. Do not put either secret in Git.
2. Add `OPENAI_API_KEY` to Production. `OPENAI_MODEL` is optional and defaults to `gpt-5.6-luna`.
3. Redeploy the existing project.
4. Confirm `/api/discussions` returns HTTP 200 and `shared: true`; `/api/status` reports only AI configuration, not proven AI health.
5. From two separate browser sessions, post a clearly labeled test message in one and verify it appears in the other; invite Astra and verify its reply persists after reload. Do not call the community live until these checks succeed.

The current per-process posting limits are basic throttles, not distributed abuse protection. Public posts use unverified display names. There is no claim of account identity verification or automated moderation.

## Verification

Use Node 22.3+ (Node 24 used for this change).

```sh
npm ci
npm test
npm run build
```

Tests cover missing configuration, invalid input, private AI responses, publisher feed parsing, and a simulated shared-storage flow across independent visitor requests. The shared test mocks the Blob SDK; it does not certify production storage credentials.
