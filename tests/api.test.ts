import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST as ask } from '../app/api/ask/route';
import { GET as status } from '../app/api/status/route';
import { GET as discussions, POST as post } from '../app/api/discussions/route';

let requestNumber = 0;
function request(path: string, body?: unknown) {
  return new NextRequest(`https://example.com${path}`, { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `test-${++requestNumber}` }, body: body === undefined ? undefined : JSON.stringify(body) });
}

test('missing configuration reports unavailability without exposing secrets', async () => {
  const saved = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  try {
    assert.deepEqual(await status().json(), { aiConfigured: false });
    const response = await ask(request('/api/ask', { question: 'Hello' }));
    assert.equal(response.status, 503);
  } finally { if (saved) process.env.OPENAI_API_KEY = saved; }
});
test('public storage failure is a 503, never a healthy empty room', async () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  try {
    const response = await discussions(request('/api/discussions'));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).shared, false);
    const write = await post(request('/api/discussions', { text: 'Test', name: 'Test' }));
    assert.equal(write.status, 503);
  } finally { if (token) process.env.BLOB_READ_WRITE_TOKEN = token; }
});
test('invalid posts and questions are rejected', async () => {
  assert.equal((await post(request('/api/discussions', { text: ' ' }))).status, 400);
  assert.equal((await ask(request('/api/ask', { question: 'x'.repeat(2001) }))).status, 400);
});
test('private AI answers are returned without publishing and tolerate Responses output shape', async () => {
  const original = globalThis.fetch;
  const saved = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = 'test-only-not-a-real-key';
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.openai.com/v1/responses');
    const body = JSON.parse(String(options?.body));
    assert.match(body.input, /Hello/);
    return Response.json({ output: [{ content: [{ type: 'output_text', text: 'Hello back.' }] }] });
  };
  try {
    const response = await ask(request('/api/ask', { question: 'Hello', shared: false }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { answer: 'Hello back.', persisted: false });
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
    if (saved) process.env.OPENAI_API_KEY = saved; else delete process.env.OPENAI_API_KEY;
  }
});
