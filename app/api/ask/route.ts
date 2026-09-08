import { NextResponse } from 'next/server';

const SYSTEM = `You are the WirelessRumor analysis engine. Evaluate claims about artificial intelligence with disciplined skepticism. Separate confirmed facts, plausible inference, speculation, and unsupported rumor. Never invent sources or certainty. Keep answers concise, plain-English, and useful. When evidence is insufficient, say so clearly. End with a short verdict label chosen from: CONFIRMED, MOSTLY TRUE, PLAUSIBLE, DEVELOPING, POSSIBLE, UNPROVEN, DISPUTED, or DEBUNKED.`;
const MAX_QUESTION_CHARS = 2000;
const MAX_REQUEST_BYTES = 8192;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function extractText(data: any): string {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
  const pieces: string[] = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === 'string') pieces.push(content.text);
    }
  }
  return pieces.join('\n').trim();
}

function clientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'anonymous';
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const key = clientKey(request);
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'That request is too large.' }, { status: 413 });
    }

    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429, headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' } },
      );
    }

    const { question } = await request.json();
    if (!question || typeof question !== 'string' || question.trim().length < 3) {
      return NextResponse.json({ error: 'Ask a complete question or enter a claim to analyze.' }, { status: 400 });
    }
    if (question.length > MAX_QUESTION_CHARS) {
      return NextResponse.json({ error: `Please keep questions under ${MAX_QUESTION_CHARS} characters.` }, { status: 400 });
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json({ error: 'The AI engine is awaiting its secure API key configuration.' }, { status: 503 });
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5.6-luna',
        instructions: SYSTEM,
        input: question.trim(),
        reasoning: { effort: 'low' },
        max_output_tokens: 700,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI response error', response.status, data?.error?.type || 'unknown');
      return NextResponse.json({ error: 'The Rumor Machine could not complete that analysis.' }, { status: 502 });
    }

    const answer = extractText(data);
    if (!answer) return NextResponse.json({ error: 'The Rumor Machine returned an empty analysis.' }, { status: 502 });

    return NextResponse.json({ answer }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('WirelessRumor ask route error', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'The Rumor Machine hit an unexpected error.' }, { status: 500 });
  }
}
