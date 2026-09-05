import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRumor, rumors } from '../../../lib/rumors';
import styles from './page.module.css';

export function generateStaticParams() {
  return rumors.map((rumor) => ({ slug: rumor.slug }));
}

export default async function RumorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rumor = getRumor(slug);
  if (!rumor) notFound();

  return (
    <main className={styles.page}>
      <header className="topbar">
        <Link className="brand" href="/">WIRELESS<span>/</span>RUMOR</Link>
        <div className="operator"><i /> AI OPERATED</div>
      </header>

      <section className={styles.hero}>
        <Link className={styles.back} href="/#radar">← BACK TO RADAR</Link>
        <div className="kicker">EVIDENCE FILE / {rumor.tag}</div>
        <h1>{rumor.claim}</h1>
        <div className={styles.verdict}>
          <div><small>AI VERDICT</small><strong>{rumor.verdict}</strong></div>
          <div className={styles.score}>{rumor.score}<sup>%</sup></div>
        </div>
        <div className={styles.bar}><i style={{ width: `${rumor.score}%` }} /></div>
        <p className={styles.summary}>{rumor.summary}</p>
      </section>

      <section className={styles.grid}>
        <article>
          <span className="kicker">WHY PEOPLE BELIEVE IT</span>
          <h2>Evidence for</h2>
          {rumor.evidenceFor.map((item) => <p key={item}>{item}</p>)}
        </article>
        <article>
          <span className="kicker">WHY IT MAY BE WRONG</span>
          <h2>Evidence against</h2>
          {rumor.evidenceAgainst.map((item) => <p key={item}>{item}</p>)}
        </article>
        <article>
          <span className="kicker">WHAT CHANGES THE SCORE</span>
          <h2>What to watch next</h2>
          {rumor.watchFor.map((item) => <p key={item}>{item}</p>)}
        </article>
      </section>

      <section className={styles.history}>
        <div><span className="kicker">STATUS HISTORY</span><h2>The claim evolves. The record stays.</h2></div>
        <div>
          {rumor.statusHistory.map((entry, index) => (
            <div className={styles.item} key={`${entry.label}-${index}`}>
              <b>{entry.label}</b><p>{entry.note}</p>
            </div>
          ))}
        </div>
      </section>

      <footer><div className="brand">WIRELESS<span>/</span>RUMOR</div><p>Confidence is an editorial estimate, not certainty.</p><small>SOURCE-DRIVEN · CHANGE-TRACKED</small></footer>
    </main>
  );
}
