import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const providers = [
  { id: 'anthropic', name: 'Claude / Anthropic', enabled: Boolean(process.env.ANTHROPIC_API_KEY) },
  { id: 'google', name: 'Gemini / Google', enabled: Boolean(process.env.GEMINI_API_KEY) },
  { id: 'xai', name: 'Grok / xAI', enabled: Boolean(process.env.XAI_API_KEY) },
  { id: 'mistral', name: 'Mistral', enabled: Boolean(process.env.MISTRAL_API_KEY) },
] as const;

export function GET() {
  return NextResponse.json({
    enabled: process.env.MULTI_AI_ROUNDTABLE_ENABLED === 'true',
    providers: providers.map(p => ({ id: p.id, name: p.name, configured: p.enabled })),
    note: 'Configured means a credential exists, not that a live response has been tested.',
  }, { headers: { 'Cache-Control': 'no-store' } });
}

type Reply = { provider: string; model: string; answer?: string; error?: string };
const prompt = 'You are participating independently in WirelessRumor’s multi-model evidence roundtable. State what is known, what is uncertain and your strongest counterargument. Do not pretend to represent another model or claim to have checked sources you have not accessed. Keep the answer under 250 words.';

async function queryProvider(id: string, question: string): Promise<Reply> {
  let url = '', headers: Record<string,string> = { 'Content-Type':'application/json' };
  let payload: unknown;
  let model = '';
  if (id === 'anthropic') {
    url = 'https://api.anthropic.com/v1/messages';
    headers = { ...headers, 'x-api-key':process.env.ANTHROPIC_API_KEY || '', 'anthropic-version':'2023-06-01' };
    model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5';
    payload = { model, max_tokens:500, system:prompt, messages:[{ role:'user',content:question }] };
  } else if (id === 'google') {
    model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent';
    headers = { ...headers, 'x-goog-api-key':process.env.GEMINI_API_KEY || '' };
    payload = { systemInstruction:{parts:[{text:prompt}]}, contents:[{role:'user',parts:[{text:question}]}], generationConfig:{maxOutputTokens:600} };
  } else {
    const isXai = id === 'xai';
    model = isXai ? (process.env.XAI_MODEL || 'grok-4-fast') : (process.env.MISTRAL_MODEL || 'mistral-small-latest');
    url = isXai ? 'https://api.x.ai/v1/chat/completions' : 'https://api.mistral.ai/v1/chat/completions';
    headers.Authorization = 'Bearer ' + (isXai ? process.env.XAI_API_KEY : process.env.MISTRAL_API_KEY);
    payload = { model, max_tokens:600, messages:[{role:'system',content:prompt},{role:'user',content:question}] };
  }
  try {
    const response = await fetch(url, { method:'POST',headers,body:JSON.stringify(payload),signal:AbortSignal.timeout(30000),cache:'no-store' });
    if (!response.ok) return { provider:id, model, error:'Provider returned HTTP ' + response.status };
    const data = await response.json();
    const answer = id === 'anthropic'
      ? (data.content || []).filter((x:{type:string})=>x.type==='text').map((x:{text:string})=>x.text).join('\n')
      : id === 'google'
      ? (data.candidates?.[0]?.content?.parts || []).map((x:{text?:string})=>x.text || '').join('\n')
      : data.choices?.[0]?.message?.content;
    return {provider:id, model, ...(typeof answer === 'string' && answer.trim() ? {answer:answer.trim().slice(0,5000)} : {error:'No text response'})};
  } catch {
    return {provider:id,model,error:'Provider request failed or timed out'};
  }
}

const recent = new Map<string, number[]>();
export async function POST(request: NextRequest) {
  if (process.env.MULTI_AI_ROUNDTABLE_ENABLED !== 'true') return NextResponse.json({error:'Live multi-provider discussion is not enabled yet.'},{status:503});
  if (Number(request.headers.get('content-length') || 0) > 8000) return NextResponse.json({error:'Request too large'},{status:413});
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const times = (recent.get(ip) || []).filter(t => t > now - 3600000);
  if (times.length >= 3) return NextResponse.json({error:'Roundtable limit reached; try again later.'},{status:429});
  const data = await request.json().catch(()=>null);
  const question = typeof data?.question==='string' ? data.question.trim() : '';
  if (question.length < 5 || question.length > 1000) return NextResponse.json({error:'Question must be 5–1,000 characters.'},{status:400});
  times.push(now);recent.set(ip,times);
  const active = providers.filter(p=>p.enabled);
  if (active.length < 2) return NextResponse.json({error:'At least two independent AI providers must be connected.'},{status:503});
  const replies = await Promise.all(active.map(p=>queryProvider(p.id,question)));
  return NextResponse.json({ question, replies, note:'Independent first-round model responses; no shared web retrieval or independent fact-check is implied.' }, {headers:{'Cache-Control':'no-store'}});
}
