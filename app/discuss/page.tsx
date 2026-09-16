'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './discuss.module.css';

type Message = {
  id: string;
  role: 'human' | 'astra' | 'system';
  text: string;
  createdAt: string;
};

const STORAGE_KEY = 'wirelessrumor:discussion:v1';
const starter: Message[] = [
  {
    id: 'welcome',
    role: 'astra',
    text: 'I am Astra, the discussion host for WirelessRumor. Bring me a claim, question, source, prediction, or disagreement. I will separate what is known from what is inferred, push back when useful, and keep uncertainty visible.',
    createdAt: new Date(0).toISOString(),
  },
];

export default function DiscussPage() {
  const [messages, setMessages] = useState<Message[]>(starter);
  const [draft, setDraft] = useState('');
  const [name, setName] = useState('Guest');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
      const savedName = localStorage.getItem(`${STORAGE_KEY}:name`);
      if (savedName) setName(savedName);
    } catch {
      // Local persistence is optional; the discussion still works without it.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
      localStorage.setItem(`${STORAGE_KEY}:name`, name);
    } catch {
      // Ignore storage failures (private browsing, quota, disabled storage).
    }
  }, [messages, name]);

  const context = useMemo(
    () => messages.slice(-10).map((m) => `${m.role.toUpperCase()}: ${m.text}`).join('\n'),
    [messages],
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;

    const human: Message = {
      id: crypto.randomUUID(),
      role: 'human',
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, human]);
    setDraft('');
    setBusy(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, context, name }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Astra is unavailable.');

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'astra',
          text: data.answer,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'system',
          text: error instanceof Error ? error.message : 'Astra is unavailable on this deployment.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function clearThread() {
    setMessages(starter);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>WIRELESS<span>/</span>RUMOR</Link>
        <nav><Link href="/roundtable">ROUNDTABLE</Link><Link href="/geopolitics">RESEARCH</Link></nav>
        <div className={styles.live}><i /> ASTRA DISCUSSION LAB</div>
      </header>

      <section className={styles.hero}>
        <div>
          <span>LIVE HUMAN + AI DISCUSSION</span>
          <h1>Don’t just read the site.<br/><em>Argue with it.</em></h1>
          <p>Start with a rumor, a source, a prediction, or a question. Astra responds as a discussion partner—not an invisible authority—and keeps facts, inference, and opinion distinct.</p>
        </div>
        <aside>
          <b>THIS VERSION</b>
          <p>Your thread persists in this browser. Shared public threads are the next layer once durable site storage is connected.</p>
        </aside>
      </section>

      <section className={styles.shell}>
        <div className={styles.thread} aria-live="polite">
          {messages.map((message) => (
            <article key={message.id} className={`${styles.message} ${styles[message.role]}`}>
              <div className={styles.meta}>
                <strong>{message.role === 'human' ? name || 'Guest' : message.role === 'astra' ? 'ASTRA' : 'SYSTEM'}</strong>
                <span>{message.role === 'astra' ? 'AI' : message.role === 'human' ? 'HUMAN' : 'STATUS'}</span>
              </div>
              <p>{message.text}</p>
            </article>
          ))}
          {busy && <article className={`${styles.message} ${styles.astra}`}><div className={styles.meta}><strong>ASTRA</strong><span>THINKING</span></div><p>Comparing the claim against the thread and looking for the strongest counterpoint…</p></article>}
        </div>

        <form className={styles.composer} onSubmit={submit}>
          <div className={styles.identity}>
            <label htmlFor="displayName">YOU ARE</label>
            <input id="displayName" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
            <button type="button" onClick={clearThread}>CLEAR THREAD</button>
          </div>
          <textarea
            value={draft}
            maxLength={2000}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask Astra, challenge a claim, paste a source, or start a new argument…"
            aria-label="Discussion message"
          />
          <div className={styles.actions}>
            <small>{draft.length}/2000 · Browser-persistent discussion</small>
            <button disabled={!draft.trim() || busy}>{busy ? 'ASTRA IS THINKING…' : 'POST + ASK ASTRA →'}</button>
          </div>
        </form>
      </section>
    </main>
  );
}
