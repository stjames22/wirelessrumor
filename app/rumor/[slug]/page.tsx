import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRumor, rumors } from '../../../lib/rumors';
import styles from './page.module.css';


const referenceLibrary: Record<string, {label:string;date:string;url:string;context:string}[]> = {
 'ai-agents-replace-traditional-apps': [
  {label:'OpenAI — Introducing Operator',date:'January 23, 2025',url:'https://openai.com/index/introducing-operator/',context:'Demonstrated browser action-taking with explicit safety and reliability limitations.'},
  {label:'METR — Measuring AI Ability to Complete Long Software Tasks',date:'March 19, 2025',url:'https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/',context:'Evidence on agents’ reliability and the length of tasks they can complete.'}
 ],
 'ai-wearable-next-personal-computer': [
  {label:'Meta — Ray-Ban Display announcement',date:'September 17, 2025',url:'https://about.fb.com/news/2025/09/meta-ray-ban-display-ai-glasses-emg-wristband/',context:'Primary-source product features, battery-life claims, and hardware tradeoffs.'},
  {label:'Meta — Display product update',date:'September 2026',url:'https://about.fb.com/news/2026/09/new-features-for-meta-ray-ban-display-navigation-hologram/',context:'Evidence of continued development; not proof of smartphone replacement.'}
 ],
 'ai-run-small-company': [
  {label:'Stanford HAI — 2026 AI Index: Economy',date:'2026',url:'https://hai.stanford.edu/ai-index/2026-ai-index-report/economy',context:'Measured organizational adoption and relatively limited agent deployment.'},
  {label:'OpenAI — Introducing Operator',date:'January 23, 2025',url:'https://openai.com/index/introducing-operator/',context:'Demonstrated workflow automation with human oversight for sensitive actions.'}
 ],
 'agi-secretly-operating': [
  {label:'Stanford HAI — 2026 AI Index: Technical Performance',date:'2026',url:'https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance',context:'Public measurements of capabilities and persistent reliability limits; not evidence of secret AGI.'},
  {label:'METR — Measuring AI Ability to Complete Long Software Tasks',date:'March 19, 2025',url:'https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/',context:'Independent evaluation of autonomy limitations; cannot establish what unpublished systems exist.'}
 ],
 'humanoid-robots-common-this-decade': [
  {label:'Stanford HAI — 2026 AI Index: Technical Performance',date:'2026',url:'https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance',context:'Robotics performance in controlled settings compared with real-world household tasks.'},
  {label:'Stanford HAI — 2026 AI Index: Economy',date:'2026',url:'https://hai.stanford.edu/ai-index/2026-ai-index-report/economy',context:'Industrial robot adoption data; not equivalent to household adoption.'}
 ]
};

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

      <section className={styles.grid} aria-label="Dated source references"><article style={{gridColumn:'1 / -1'}}><span className="kicker">SOURCE DESK / REFERENCES</span><h2>Read the evidence</h2><p>These dated sources inform the arguments above. They do not independently verify the speculative headline. Each claim still requires a documented, claim-specific review before a verdict.</p>{(referenceLibrary[rumor.slug] || []).map(ref=><div key={ref.url} style={{borderTop:'1px solid #344453',padding:'18px 0'}}><a href={ref.url} target="_blank" rel="noopener noreferrer" style={{color:'#cfff85',fontWeight:800,textDecoration:'underline'}}>{ref.label} ↗</a><p><time>{ref.date}</time> — {ref.context}</p></div>)}</article></section>
      <footer><div className="brand">WIRELESS<span>/</span>RUMOR</div><p>Claims need dated sources before they become verdicts.</p><small>EDITORIAL BRIEF · SOURCE REVIEW PENDING</small></footer>
    </main>
  );
}
