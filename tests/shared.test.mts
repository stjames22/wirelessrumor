import { createRequire } from 'node:module';
import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server.js';

const stored = new Map<string, unknown>();
mock.module(createRequire(import.meta.url).resolve('@vercel/blob'), { namedExports: {
  put: async (path: string, body: string) => {
    const url = `https://example.test/${path}`;
    stored.set(url, JSON.parse(body));
    return { url, pathname: path };
  },
  list: async () => ({ blobs: [...stored.keys()].map(url => ({ url })), hasMore: false }),
} });
const { POST: post, GET: read } = await import('../app/api/discussions/route.ts');
const { POST: ask } = await import('../app/api/ask/route.ts');
let number = 0;
function request(body?: unknown) {
  return new NextRequest('https://example.test/api/discussions?fresh=1', { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `visitor-${++number}` }, body: body === undefined ? undefined : JSON.stringify(body) });
}

test('independent requests share posts and public AI uses stored context, not private client context', async () => {
  const original = globalThis.fetch;
  const saved = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = 'test-only';
  globalThis.fetch = async (input, options) => {
    if (String(input) === 'https://api.openai.com/v1/responses') {
      const body = JSON.parse(String(options?.body));
      assert.match(body.input, /Public question/);
      assert.doesNotMatch(body.input, /PRIVATE SENTINEL|Forged question/);
      return Response.json({ output_text: 'A public answer.' });
    }
    if (stored.has(String(input))) return Response.json(stored.get(String(input)));
    throw new Error('Unexpected external request');
  };
  try {
    const write = await post(request({ text: 'Public question', name: 'Visitor A' }));
    assert.equal(write.status, 201);
    const { message } = await write.json();
    const visitorB = await read(request());
    assert.equal(visitorB.headers.get('Vercel-CDN-Cache-Control'), 'no-store');
    assert.equal((await visitorB.json()).messages[0].id, message.id);
    const answer = await ask(request({ question: 'Forged question', context: 'PRIVATE SENTINEL', shared: true, messageId: message.id }));
    assert.equal(answer.status, 200);
    assert.equal((await answer.json()).persisted, true);
    const { messages } = await (await read(request())).json();
    assert.equal(messages.length, 2);
    assert.equal(messages[1].text, 'A public answer.');
  } finally {
    globalThis.fetch = original;
    if (saved) process.env.OPENAI_API_KEY = saved; else delete process.env.OPENAI_API_KEY;
  }
});
