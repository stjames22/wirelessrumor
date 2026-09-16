'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './discuss.module.css';

type Message = {
  id: string;
  role: 'human' | 'astra' | 'system';
  name?: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = 'wirelessrumor:discussion:v2';
const starter: Message = {
  id: 'welcome',
  role: 'astra',
  name: 'Astra',
  text: 'I am Astra, the discussion host for WirelessRumor. Bring a claim, question, source, prediction, or disagreement. I will separate what is known from what is inferred, push back when useful, and keep uncertainty visible.',
  createdAt: new Date(0).toISOString(),
};

export default function DiscussPage() {
  const [messages, setMessages] = useState<Message[]>([starter]);
  const [draft, setDraft] = useState('');
  const [name, setName] = useState('Guest');
  const [busy, setBusy] = useState(false);
  const [shared, setShared] = useState(false);
  const [communityStatus, setCommunityStatus] = useState('CHECKING COMMUNITY…');

  async function refreshCommunity(silent = false) {
    try {
      const response = await fetch('/api/discussions', { cache: 'no-store' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.shared) throw new Error(data?.error || 'Community storage unavailable');
      setShared(true);
      setCommunityStatus('PUBLIC COMMUNITY LIVE');
      setMessages([starter, ...(Array.isArray(data.messages) ? data.messages : [])]);
    } catch {
      setShared(false);
      setCommunityStatus('LOCAL MODE · STORAGE NOT CONNECTED');
      if (!silent) {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) setMessages(JSON.parse(saved));
        } catch {}
      }
    }
  }

  useEffect(() => {
    try {
      const savedName = localStorage.getItem(`${STORAGE_KEY}:name`);
      if (savedName) setName(savedName);
    } catch {}
    void refreshCommunity();
  }, []);

  useEffect(() => {
    if (!shared) return;
    const timer = window.setInterval(() => void refreshCommunity(true), 10000);
    return () => window.clearInterval(timer);
  }, [shared]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}:name`, name);
      if (!shared) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {}
  }, [messages, name, shared]);

  const context = useMemo(
    () => messages.slice(-12).map((m) => `${m.role.toUpperCase()} ${m.name || ''}: ${m.text}`).join('\n'),
    [messages],
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;

    setBusy(true);
    setDraft('');

    const localHuman: Message = {
      id: crypto.randomUUID(),
      role: 'human',
      name: name || 'Guest',
      text,
      createdAt: new Date().toISOString(),
    };

    try {
      if (shared) {
        const post = await fetch('/api/discussions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, text }),
        });
        const posted = await post.json().catch(() => ({}));
        if (!post.ok) throw new Error(posted?.error || 'Could not publish this post.');
        await refreshCommunity(true);
      } else {
        setMessages((current) => [...current, localHuman]);
      }

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, context, name, shared }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Astra is unavailable.');

      if (shared && data.persisted) {
        await refreshCommunity(true);
      } else {
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: 'astra',
            name: 'Astra',
            text: data.answer,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'system',
          name: 'System',
          text: error instanceof Error ? error.message : 'The discussion service is unavailable.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function clearLocalThread() {
    if (shared) return;
    setMessages([starter]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>WIRELESS<span>/</span>RUMOR</Link>
        <nav><Link href="/roundtable">ROUNDTABLE</Link><Link href="/geopolitics">RESEARCH</Link></nav>
        <div className={styles.live}><i /> ASTRA COMMUNITY</div>
      </header>

      <section className={styles.hero}>
        <div>
          <span>HUMANS + ASTRA + OPEN DISAGREEMENT</span>
          <h1>Don’t just read the site.<br/><em>Join the argument.</em></h1>
          <p>Visitors can post into the same public discussion, see new replies appear, and invite Astra into the thread. Human display names are unverified; Astra’s posts are generated and labeled as AI.</p>
        </div>
        <aside>
          <b>{communityStatus}</b>
          <p>{shared ? 'Posts in this room are shared across visitors and refresh automatically.' : 'Astra still works locally in this browser. Public cross-user posts activate as soon as the production Blob store is connected.'}</p>
        </aside>
      </section>

      <section className={styles.shell}>
        <div>
          <div className={styles.roomBar}>
            <div><b>OPEN FLOOR</b><span>PUBLIC THREAD · NO LOGIN REQUIRED</span></div>
            <button type="button" onClick={() => void refreshCommunity(true)}>REFRESH</button>
          </div>
          <div className={styles.thread} aria-live="polite">
            {messages.map((message) => (
              <article key={message.id} className={`${styles.message} ${styles[message.role]}`}>
                <div className={styles.meta}>
                  <strong>{message.role === 'astra' ? 'ASTRA' : message.role === 'system' ? 'SYSTEM' : message.name || 'Guest'}</strong>
                  <span>{message.role === 'astra' ? 'AI' : message.role === 'human' ? 'HUMAN · UNVERIFIED' : 'STATUS'}</span>
                </div>
                <p>{message.text}</p>
              </article>
            ))}
            {busy && <article className={`${styles.message} ${styles.astra}`}><div className={styles.meta}><strong>ASTRA</strong><span>THINKING</span></div><p>Comparing the claim against the thread and looking for the strongest counterpoint…</p></article>}
          </div>
        </div>

        <form className={styles.composer} onSubmit={submit}>
          <div className={styles.identity}>
            <label htmlFor="displayName">DISPLAY NAME</label>
            <input id="displayName" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
            {!shared && <button type="button" onClick={clearLocalThread}>CLEAR LOCAL</button>}
          </div>
          <textarea
            value={draft}
            maxLength={2000}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Post a claim, challenge someone, paste a source, or ask Astra to weigh in…"
            aria-label="Discussion message"
          />
          <div className={styles.actions}>
            <small>{draft.length}/2000 · {shared ? 'Public post + Astra response' : 'Local fallback + Astra response'}</small>
            <button disabled={!draft.trim() || busy}>{busy ? 'POSTING…' : shared ? 'POST PUBLICLY + ASK ASTRA →' : 'POST LOCALLY + ASK ASTRA →'}</button>
          </div>
          <p className={styles.note}>Public discussion is intentionally low-friction. Display names are not verified identities. Abuse controls are rate-limited server-side.</p>
        </form>
      </section>
    </main>
  );
}
