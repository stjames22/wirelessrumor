'use client';

import Link from 'next/link';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './discuss.module.css';

type Message = { id: string; role: 'human' | 'astra'; name: string; text: string; createdAt: string };
type Connection = 'checking' | 'connected' | 'unavailable';
const STORAGE_KEY = 'wirelessrumor:discussion:v2';
const starter: Message = { id: 'welcome', role: 'astra', name: 'Astra', text: 'Bring a claim, question, source, or disagreement. Ask Astra to separate evidence from inference. AI answers can be wrong; check original sources.', createdAt: new Date(0).toISOString() };

export default function DiscussPage() {
  const [publicMessages, setPublicMessages] = useState<Message[]>([]);
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<'public' | 'private'>('public');
  const [connection, setConnection] = useState<Connection>('checking');
  const [ai, setAi] = useState<boolean | null>(null);
  const [draft, setDraft] = useState('');
  const [name, setName] = useState('Guest');
  const [askAstra, setAskAstra] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [loaded, setLoaded] = useState(false);
  const inFlight = useRef(false);

  const refresh = useCallback(async (fresh = false) => {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      const response = await fetch(fresh ? `/api/discussions?fresh=${Date.now()}` : '/api/discussions', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      const data = await response.json();
      if (!response.ok || !data.shared || !Array.isArray(data.messages)) throw new Error();
      setPublicMessages(data.messages);
      setConnection('connected');
    } catch { setConnection('unavailable'); }
    finally { inFlight.current = false; }
  }, []);

  useEffect(() => {
    try {
      setName(localStorage.getItem(`${STORAGE_KEY}:name`) || 'Guest');
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setPrivateMessages(saved.filter(m => m && m.id !== 'welcome' && (m.role === 'human' || m.role === 'astra') && typeof m.text === 'string' && typeof m.createdAt === 'string').slice(-40));
    } catch {}
    const topic = new URLSearchParams(window.location.search).get('topic');
    if (topic) setDraft(topic.slice(0, 2000));
    setLoaded(true);
    void refresh();
    const checkAI = () => fetch('/api/status', { cache: 'no-store', signal: AbortSignal.timeout(10000) })
      .then(response => response.json()).then(data => setAi(data.aiConfigured === true)).catch(() => setAi(null));
    void checkAI();
    const timer = window.setInterval(() => { if (!document.hidden) { void refresh(); void checkAI(); } }, 30000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(`${STORAGE_KEY}:name`, name);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(privateMessages.slice(-40)));
    } catch {}
  }, [loaded, name, privateMessages]);

  const messages = mode === 'public' ? publicMessages : privateMessages;
  const available = mode === 'public' ? connection === 'connected' : ai === true;

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy || !available) return;
    setBusy(true);
    setNotice('');
    let published = false;
    let localHuman: Message | undefined;
    try {
      let messageId: string | undefined;
      if (mode === 'public') {
        const response = await fetch('/api/discussions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, text }), signal: AbortSignal.timeout(15000) });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not publish. Your draft has been kept.');
        published = true;
        messageId = data.message.id;
        setPublicMessages(current => [...current.filter(m => m.id !== messageId), data.message]);
        setDraft('');
        setNotice('Your post is public.');
      } else {
        localHuman = { id: crypto.randomUUID(), role: 'human', name: name || 'Guest', text, createdAt: new Date().toISOString() };
      }
      if (mode === 'private' || (askAstra && ai)) {
        const response = await fetch('/api/ask', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: text, messageId, shared: mode === 'public', context: mode === 'private' ? privateMessages.slice(-12).map(m => `${m.role}: ${m.text}`).join('\n').slice(-10000) : undefined }),
          signal: AbortSignal.timeout(55000),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Astra could not answer.');
        if (mode === 'private' && localHuman) {
          const human = localHuman;
          setPrivateMessages(current => [...current, human, { id: crypto.randomUUID(), role: 'astra', name: 'Astra', text: data.answer, createdAt: new Date().toISOString() }]);
          setDraft('');
        } else {
          if (data.message) setPublicMessages(current => [...current.filter(m => m.id !== data.message.id), data.message]);
          setNotice(data.persisted ? 'Your post and Astra’s reply are public.' : 'Your post is public, but Astra’s reply could not be saved. Please do not repost your message.');
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed.';
      setNotice(published ? `Your post is already public. ${message} Please do not repost it.` : `${message} Your draft has been kept. If the request timed out, refresh the room before retrying.`);
    } finally { setBusy(false); }
  }

  return <main className={styles.page}>
    <header className={styles.header}><Link href="/" className={styles.brand}>WIRELESS<span>/</span>RUMOR</Link><nav><Link href="/">HOME</Link><Link href="/roundtable">ROUNDTABLE</Link><Link href="/geopolitics">RESEARCH</Link></nav></header>
    <section className={styles.hero}><div><span>HUMANS + AI + OPEN DISAGREEMENT</span><h1>Bring a question.<br/><em>Make a better argument.</em></h1><p>Share evidence, challenge an idea, or ask Astra for another perspective. Public posts are visible to everyone. A personal Astra chat stays separate from the public room.</p></div>
      <aside aria-live="polite"><b>{connection === 'connected' ? 'PUBLIC ROOM CONNECTED' : connection === 'checking' ? 'CHECKING PUBLIC ROOM…' : 'PUBLIC ROOM UNAVAILABLE'}</b><p>{connection === 'connected' ? 'New public messages refresh every 30 seconds.' : 'Public posting is unavailable until the connection is restored. Your draft stays here.'}</p><p>{ai === true ? 'Astra connection configured. Availability is checked when you send.' : ai === false ? 'Astra is not configured yet.' : 'Astra availability is not confirmed.'}</p></aside>
    </section>
    <section className={styles.shell}><div>
      <div className={styles.modes}><button type="button" disabled={busy} aria-pressed={mode === 'public'} onClick={() => { setMode('public'); setNotice(''); }}>Public room</button><button type="button" disabled={busy} aria-pressed={mode === 'private'} onClick={() => { setMode('private'); setNotice(''); }}>Personal Astra chat</button></div>
      <div className={styles.roomBar}><div><b>{mode === 'public' ? 'OPEN FLOOR' : 'PERSONAL CHAT'}</b><span>{mode === 'public' ? 'PUBLIC · DISPLAY NAMES ARE UNVERIFIED' : 'SAVED ON THIS BROWSER · NOT POSTED PUBLICLY'}</span></div><button type="button" disabled={busy} onClick={() => void refresh(true)}>REFRESH</button></div>
      <div className={styles.thread} aria-live="polite">{[starter, ...messages].map(message => <article key={message.id} className={`${styles.message} ${styles[message.role]}`}><div className={styles.meta}><strong>{message.role === 'astra' ? 'ASTRA · AI' : message.name || 'Guest'}</strong>{message.id !== 'welcome' && <time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString()}</time>}</div><p>{message.text}</p></article>)}{busy && <p role="status">{mode === 'public' ? 'Sending…' : 'Asking Astra…'}</p>}</div>
    </div>
    <form className={styles.composer} onSubmit={submit}>
      <div className={styles.identity}><label htmlFor="displayName">DISPLAY NAME</label><input id="displayName" value={name} maxLength={40} onChange={e => setName(e.target.value)} /></div>
      <label htmlFor="message">{mode === 'public' ? 'Your public post' : 'Your question for Astra'}</label><textarea id="message" value={draft} maxLength={2000} disabled={busy} onChange={e => setDraft(e.target.value)} placeholder="Share a claim, question, or source…" />
      {mode === 'public' && <label className={styles.checkbox}><input type="checkbox" checked={askAstra} disabled={ai !== true || busy} onChange={e => setAskAstra(e.target.checked)} /> Invite Astra to reply {ai !== true && '(unavailable)'}</label>}
      <div className={styles.actions}><small>{draft.length}/2000 · {mode === 'public' ? 'Visible to everyone' : 'Sent to the AI service; saved on this browser'}</small><button disabled={!draft.trim() || busy || !available}>{busy ? 'SENDING…' : mode === 'public' ? 'POST PUBLICLY →' : 'ASK ASTRA →'}</button></div>
      {notice && <p role="status" className={styles.notice}>{notice}</p>}
      {mode === 'private' && <button type="button" disabled={busy} onClick={() => setPrivateMessages([])}>Clear personal chat</button>}
      <p className={styles.note}>{mode === 'public' ? 'Do not share private information. Names are not verified. Human posts are not fact-checked; AI responses are labeled.' : 'This chat is not published. Questions and recent personal chat context are sent to the AI provider to generate a reply.'}</p>
    </form></section>
  </main>;
}
