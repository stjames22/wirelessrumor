'use client';

import { FormEvent, useState } from 'react';

export default function AskBox() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!question.trim() || loading) return;
    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="askWrap">
      <form className="ask" onSubmit={submit}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask the Rumor Machine anything about AI…"
          aria-label="Ask the Rumor Machine"
        />
        <button type="submit" disabled={loading}>{loading ? 'ANALYZING…' : 'ANALYZE →'}</button>
      </form>
      {answer && <div className="aiAnswer"><small>WIRELESSRUMOR AI</small><p>{answer}</p></div>}
      {error && <div className="aiAnswer error"><small>AI ENGINE</small><p>{error}</p></div>}
    </div>
  );
}
