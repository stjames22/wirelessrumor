'use client';

import AnswerText from './AnswerText';
import { FormEvent, useState } from 'react';

const MAX_QUESTION_CHARS = 2000;

export default function AskBox() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [citations, setCitations] = useState<Array<{ start: number; end: number; url: string; title: string }>>([]);
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
      setCitations(data.citations || []);
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
          placeholder="Paste an AI claim, headline, question, or link…"
          aria-label="Check an AI claim with Astra"
          maxLength={MAX_QUESTION_CHARS}
        />
        <button type="submit" disabled={loading}>{loading ? 'CHECKING…' : 'CHECK CLAIM →'}</button>
      </form>
      {answer && <div className="aiAnswer"><small>ASTRA / CLAIM CHECK</small><p><AnswerText text={answer} citations={citations} /></p></div>}
      {error && <div className="aiAnswer error"><small>AI ENGINE</small><p>{error}</p></div>}
    </div>
  );
}
