import { NextRequest, NextResponse } from 'next/server';
import { appendDiscussionMessage, readDiscussionMessages } from '../../../lib/discussions';

const recent = new Map<string, number[]>();

function allowRequest(ip: string) {
  const now = Date.now();
  const windowStart = now - 60_000;
  const hits = (recent.get(ip) || []).filter((time) => time > windowStart);
  if (hits.length >= 6) return false;
  hits.push(now);
  recent.set(ip, hits);
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const messages = await readDiscussionMessages(100);
    return NextResponse.json(
      { shared: true, messages },
      {
        headers: {
          // The public room is identical for every visitor. Keep browsers from
          // storing it, but let Vercel briefly share one response at the edge so
          // every 10-second client poll does not trigger another full Blob scan.
          'Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': request.nextUrl.searchParams.has('fresh') ? 'no-store' : 'max-age=8, stale-while-revalidate=12',
        },
      },
    );
  } catch (error) {
    console.error('Shared discussion read failed', error);
    return NextResponse.json(
      { shared: false, messages: [], error: 'The public room is temporarily unavailable. Please try again later.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: 'Message payload is too large.' }, { status: 413 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!allowRequest(ip)) {
    return NextResponse.json({ error: 'Too many posts. Please try again shortly.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  const rawName = typeof body?.name === 'string' ? body.name.trim() : '';
  const name = (rawName || 'Guest').slice(0, 40);

  if (!text || text.length > 2000) {
    return NextResponse.json({ error: 'Please keep posts between 1 and 2,000 characters.' }, { status: 400 });
  }

  const message = {
    id: crypto.randomUUID(),
    role: 'human' as const,
    name,
    text,
    createdAt: new Date().toISOString(),
  };

  try {
    await appendDiscussionMessage(message);
    return NextResponse.json({ shared: true, message }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Shared discussion write failed', error);
    return NextResponse.json(
      { shared: false, error: 'The public room is temporarily unavailable. Please try again later.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
