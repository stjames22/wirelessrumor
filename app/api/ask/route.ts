import { NextRequest, NextResponse } from 'next/server';
import { appendDiscussionMessage, readDiscussionMessages } from '../../../lib/discussions';

export const maxDuration = 60;

const recent = new Map<string, number[]>();

function allowRequest(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((time) => time > now - 60_000);
  if (hits.length >= 8) return false;
  hits.push(now);
  recent.set(ip, hits);
  return true;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 16_000) {
    return NextResponse.json({ error: 'Message payload is too large.' }, { status: 413 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!allowRequest(ip)) {
    return NextResponse.json({ error: 'Astra is receiving too many requests. Please try again shortly.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  let question = typeof body?.question === 'string' ? body.question.trim() : '';
  let context = typeof body?.context === 'string' ? body.context.slice(-10000) : '';
  const shared = body?.shared === true;

  if (!question || question.length > 2000) {
    return NextResponse.json({ error: 'Please keep messages under 2,000 characters.' }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Astra is installed, but the production AI connection is not configured yet.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    if (shared) {
      const messages = await readDiscussionMessages(100);
      const parent = messages.find(message => message.id === body?.messageId && message.role === 'human');
      if (!parent) return NextResponse.json({ error: 'The public post could not be found. Refresh before asking Astra.' }, { status: 400 });
      question = parent.text;
      context = messages.filter(message => message.id !== parent.id).slice(-12).map(message => `${message.role}: ${message.text}`).join('\n').slice(-10000);
    }
    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      signal: AbortSignal.timeout(45000),
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        instructions: 'You are Astra, the WirelessRumor discussion host. Be curious, concise, evidence-minded, and constructive. Separate facts, inference, and opinion. State uncertainty. Challenge claims when a counterargument would improve the discussion. Never invent sources or impersonate other AI systems.',
        input: `Recent discussion:\n${context || '(new thread)'}\n\nHuman:\n${question}`,
        reasoning: { effort: 'none' },
        store: false,
        max_output_tokens: 700,
      }),
    });

    if (!upstream.ok) {
      console.error('Astra upstream status', upstream.status);
      return NextResponse.json({ error: 'Astra could not answer this message.' }, { status: 502 });
    }

    const data = await upstream.json();
    let answer = typeof data?.output_text === 'string' ? data.output_text : '';
    if (!answer) {
      for (const item of data?.output || []) {
        for (const part of item?.content || []) {
          if (part?.type === 'output_text' && typeof part?.text === 'string') answer += part.text;
        }
      }
    }

    answer = answer.trim();
    if (!answer) {
      return NextResponse.json({ error: 'Astra returned an empty response.' }, { status: 502 });
    }

    let persisted = false;
    let message;
    if (shared) {
      try {
        message = await appendDiscussionMessage({
          id: crypto.randomUUID(),
          role: 'astra',
          name: 'Astra',
          text: answer,
          createdAt: new Date().toISOString(),
        });
        persisted = true;
      } catch (error) {
        console.error('Astra shared persistence failed', error);
      }
    }

    return NextResponse.json({ answer, persisted, message }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Astra request failed', error);
    return NextResponse.json({ error: 'Astra is temporarily unavailable.' }, { status: 502 });
  }
}
