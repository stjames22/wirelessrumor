import Link from 'next/link';
import { rumors } from '../../lib/rumors';

export const metadata = {title:'Intelligence Registry | WirelessRumor',description:'Machine-readable AI claim watchlist with falsification tests, caveats and explicit source provenance.'};

export default function Intelligence() {
 return <main className="registryPage">
   <header className="registryNav"><Link href="/" className="registryLogo">WIRELESS<span>/</span>RUMOR</Link><nav><Link href="/roundtable">Roundtable</Link><Link href="/discuss">Discussion</Link><Link href="/">Home</Link></nav></header>
   <section className="registryHero">
     <p className="registryKicker">OPEN INTELLIGENCE / PUBLIC BETA</p>
     <h1>Don't trust the headline.<br/><em>Inspect the claim.</em></h1>
     <p>We are building an auditable research layer for humans and AI agents. Every claim needs an evidence trail, a counterargument and a condition that could prove it wrong. This first registry release exposes the gaps instead of hiding them.</p>
     <div className="registryActions"><a href="/api/intelligence">GET JSON REGISTRY ↗</a><a href="/llms.txt">AI DISCOVERY FILE ↗</a><Link href="/roundtable">COMPARE MODELS ↗</Link></div>
   </section>
   <section className="registryStats"><div><strong>{rumors.length.toString().padStart(2,'0')}</strong><span>TRACKED EDITORIAL QUESTIONS</span></div><div><strong>00</strong><span>INDEPENDENTLY VERIFIED RECORDS</span></div><div><strong>JSON</strong><span>OPEN MACHINE-READABLE FORMAT</span></div></section>
   <section className="registryContent">
    <div className="registryIntro"><div><p className="registryKicker">CLAIM LEDGER / VERSION 1</p><h2>Ideas worth testing.<br/>Not invented certainty.</h2></div><p>All entries below are qualitative editorial starting points. They currently lack cited primary-source evidence and must not be treated as verified claims. Scores from older drafts are intentionally omitted until a defensible measurement method exists.</p></div>
    <div className="registryList">{rumors.map((r,i)=><article key={r.slug} className="registryEntry">
      <div className="registryEntryHead"><span>{String(i+1).padStart(2,'0')} / {r.tag}</span><span>UNVERIFIED EDITORIAL WATCHLIST</span></div>
      <h3>{r.claim}</h3><p>{r.summary}</p>
      <details><summary>EXAMINE TESTS & COUNTERARGUMENTS</summary>
       <div className="registryEvidence"><div><h4>What supports the hypothesis</h4><ul>{r.evidenceFor.map(v=><li key={v}>{v}</li>)}</ul></div><div><h4>What challenges it</h4><ul>{r.evidenceAgainst.map(v=><li key={v}>{v}</li>)}</ul></div><div><h4>Evidence to watch for</h4><ul>{r.watchFor.map(v=><li key={v}>{v}</li>)}</ul></div></div>
      </details>
      <div className="registryEntryLinks"><Link href={'/rumor/'+r.slug}>FULL EDITORIAL BRIEF ↗</Link><Link href={'/discuss?topic='+encodeURIComponent(r.claim)}>CHALLENGE THIS CLAIM ↗</Link></div>
    </article>)}</div>
   </section>
   <footer className="registryFoot"><strong>BUILD THE EVIDENCE, NOT THE HYPE.</strong><span>No fabricated sources. No imaginary AI conversations. No unlabeled confidence theater.</span></footer>
 </main>;
}
