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

Next.js + TypeScript. Hosted on Railway with a persistent volume for public discussion messages. The production intelligence pipeline will use server-side AI credentials and persistent storage; secrets must never be committed to this repository.

## Editorial principle

Rumor is the subject, not the standard of evidence. Material claims should retain sources, counter-evidence, confidence rationale and change history.

## Current behavior (September 24, 2026)

- Public room availability is determined by an actual storage read. Unavailable storage disables public posting; it does not silently publish to a browser-only fallback.
- Personal Astra chats are explicitly separate, saved only in that browser, and sent to the AI provider for replies. Personal context is never used for a public AI reply. Public AI context is loaded on the server from stored messages.
- Human public posts do not require Astra. Inviting Astra is optional. If a reply fails after a human post succeeds, the UI clearly says the original post is already public.
- Publisher-dated headlines refresh on visits using hourly Next.js revalidation. This is a source feed, not autonomous investigative reporting. Feed failures are shown without fabricating replacement headlines.
- Radar briefs are labeled as awaiting source review. Unsupported numerical confidence scores and undated activity claims are no longer displayed.

## Railway production

- Project: WirelessRumor (`c9cd1bd6-f9c9-4f99-ab80-1043a8868d32`)
- Environment: production (`b3ffea3f-48ff-4d2c-8da3-d52dea15ae9a`)
- Service: wirelessrumor (`86e57b7a-2cac-4baa-b9ae-c6f0e917ea10`)
- Public Railway URL: https://wirelessrumor-production.up.railway.app
- GitHub source: `stjames22/wirelessrumor`, branch `main`. Pushes deploy automatically.
- A persistent volume mounted at `/data` stores one atomic JSON file per public message. Set `DISCUSSION_DATA_DIR=/data/discussions`; keep one replica. Files survive application restarts and redeploys. Personal chats remain browser-local and never enter the public volume.
- Astra uses `OPENAI_API_KEY`, or secure-provisioned `OPENAI_API_KEY_ENCRYPTED` and `OPENAI_KEY_WRAPPING_PRIVATE` service variables. The latter decrypts only in server memory. Never log or commit any of these values.
- `OPENAI_MODEL` defaults to `gpt-5.6-luna`. Astra can use web search with up to two tool calls per answer and displays source citations as clickable links. It has no infrastructure-management or private-account tools.
- `/api/health` verifies discussion storage access; `/api/status` reports AI credential configuration only. A successful `/api/ask` request is still needed to verify live AI health.
- Existing unconfigured deployments can continue using the legacy Blob adapter when `DISCUSSION_DATA_DIR` is absent; Railway does not require Vercel Blob.
- Custom-domain cutover requires changing the current DNS records to Railway's verified values. Keep the old site serving until the Railway app and certificate are verified. Do not overwrite unrelated MX/TXT records.

The current per-process posting limits are basic throttles for one replica. Public posts use unverified display names. There is no claim of verified identity or automated moderation. Headlines refresh on visits; daily editorial maintenance is a separately scheduled ChatGPT task, not an autonomous conversation between independent AI systems.

## Verification

Use Node 22.3+ (Node 24 used for this change).

```sh
npm ci
npm test
npm run build
```

Tests cover missing configuration, invalid input, private AI responses, publisher feed parsing, and a simulated shared-storage flow across independent visitor requests. The shared test mocks the Blob SDK; it does not certify production storage credentials.
