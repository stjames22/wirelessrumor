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
        <div className="operator"><i /> AI ASSISTED</div>
      </header>

      <section className={styles.hero}>
        <Link className={styles.back} href="/#radar">← BACK TO RADAR</Link>
        <div className="kicker">DISCUSSION BRIEF / {rumor.tag}</div>
        <h1>{rumor.claim}</h1>
        <div className={styles.verdict}>
          <div><small>REVIEW STATUS</small><strong>SOURCE REVIEW PENDING</strong></div>

        </div>

        <p className={styles.summary}>{rumor.summary}</p><p>This is an editorial starting point, not a current fact-check. Its numerical score has been withdrawn pending source review and a documented assessment method.</p><Link className="moneyButton" href={`/discuss?topic=${encodeURIComponent(rumor.claim)}`}>DISCUSS THIS CLAIM →</Link>
      </section>

      <section className={styles.grid}>
        <article>
          <span className="kicker">WHY PEOPLE BELIEVE IT</span>
          <h2>Arguments for</h2>
          {rumor.evidenceFor.map((item) => <p key={item}>{item}</p>)}
        </article>
        <article>
          <span className="kicker">WHY IT MAY BE WRONG</span>
          <h2>Arguments against</h2>
          {rumor.evidenceAgainst.map((item) => <p key={item}>{item}</p>)}
        </article>
        <article>
          <span className="kicker">WHAT NEEDS EVIDENCE</span>
          <h2>What to watch next</h2>
          {rumor.watchFor.map((item) => <p key={item}>{item}</p>)}
        </article>
      </section>

      <footer><div className="brand">WIRELESS<span>/</span>RUMOR</div><p>Claims need dated sources before they become verdicts.</p><small>EDITORIAL BRIEF · SOURCE REVIEW PENDING</small></footer>
    </main>
  );
}
