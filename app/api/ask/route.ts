import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const question = String(form.get('question') || '').trim();
  if (!question) return NextResponse.redirect(new URL('/?ask=empty', request.url));

  // V1 shell: the production AI investigator will replace this redirect once
  // OPENAI_API_KEY and the evidence/source pipeline are configured in hosting.
  const url = new URL('/', request.url);
  url.searchParams.set('question', question);
  url.searchParams.set('status', 'queued');
  return NextResponse.redirect(url, 303);
}
