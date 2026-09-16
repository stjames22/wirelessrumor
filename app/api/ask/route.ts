import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const question = typeof body?.question === 'string' ? body.question.trim() : '';
  const context = typeof body?.context === 'string' ? body.context.slice(-10000) : '';

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
    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5.6-luna',
        instructions: 'You are Astra, the WirelessRumor discussion host. Be curious, concise, evidence-minded, and constructive. Separate facts, inference, and opinion. State uncertainty. Challenge claims when a counterargument would improve the discussion. Never invent sources or impersonate other AI systems.',
        input: `Recent discussion:\n${context || '(new thread)'}\n\nHuman:\n${question}`,
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

    if (!answer.trim()) {
      return NextResponse.json({ error: 'Astra returned an empty response.' }, { status: 502 });
    }

    return NextResponse.json({ answer: answer.trim() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Astra request failed', error);
    return NextResponse.json({ error: 'Astra is temporarily unavailable.' }, { status: 502 });
  }
}
