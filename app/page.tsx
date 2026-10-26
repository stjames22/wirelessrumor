import { rumors } from '../lib/rumors';
import AskBox from './AskBox';
import SourceFeed from './SourceFeed';

export const revalidate = 3600;

const signals = [
  { label: 'CAPABILITY', title: 'What can AI actually do now?', body: 'Separate demonstrated capabilities from demos, forecasts, and marketing claims.' },
  { label: 'IMPACT', title: 'What changes for people?', body: 'Track where AI is saving time, changing jobs, creating leverage, or producing new risks.' },
  { label: 'POWER', title: 'Who benefits and who decides?', body: 'Follow the companies, governments, standards, infrastructure, and incentives shaping deployment.' },
];

export default function Home() {
  return <main className="homePage">
    <header className="topbar">
      <a className="brand" href="/">WIRELESS<span>/</span>RUMOR</a>
      <nav>
        <a href="#check">CHECK A CLAIM</a>
        <a href="/intelligence">INTELLIGENCE</a>
        <a href="/ai-visibility">AI VISIBILITY</a>
        <a href="#latest">LATEST</a>
        <a href="#radar">RADAR</a>
        <a href="/roundtable">ROUNDTABLE</a>
        <a href="/geopolitics">RESEARCH</a>
      </nav>
      <div className="operator"><i/> AI + HUMAN ANALYSIS</div>
    </header>

    <section className="utilityHero" id="check">
      <div className="eyebrow">AI CLAIM CHECKER</div>
      <h1>What AI claim<br/><em>do you want checked?</em></h1>
      <p>Paste a claim, headline, question, or link. Astra will separate what is known, what is inferred, what is disputed, and what evidence would change the answer.</p>
      <AskBox />
      <div className="trustLine">
        <span>FACTS ≠ INFERENCE</span><span>ORIGINAL SOURCES FIRST</span><span>UNCERTAINTY STAYS VISIBLE</span>
      </div>
    </section>

    <section className="registryTeaser">
      <div><span className="kicker">OPEN INTELLIGENCE / BUILT FOR HUMANS + AGENTS</span><h2>Useful enough to cite.<br/>Transparent enough to challenge.</h2><p>Inspect a machine-readable claim ledger, including counterarguments, falsification tests and explicit gaps in the evidence. No invented verification.</p><a href="/intelligence">EXPLORE CLAIM REGISTRY ↗</a><a href="/api/intelligence">GET JSON DATA ↗</a></div>
      <div><span className="kicker">AI VISIBILITY LAB / REAL INSIGHTS + DATA</span><h2>Build a website AI systems can find.</h2><p>Practical, sourced guidance based on Google, OpenAI and Bing documentation—plus a measurement scorecard that separates citations from actual site traffic.</p><a href="/ai-visibility">OPEN THE LAB ↗</a></div>
    </section>
    <SourceFeed />

    <section className="signalSection">
      <div className="sectionHead"><div><span className="kicker">WHAT MATTERS</span><h2>THREE QUESTIONS BEHIND THE NOISE</h2></div><p>WirelessRumor is not trying to cover everything. It follows the questions that change how people understand AI.</p></div>
      <div className="signalGrid">{signals.map(s => <article key={s.label}><small>{s.label}</small><h3>{s.title}</h3><p>{s.body}</p></article>)}</div>
    </section>

    <section className="section" id="radar">
      <div className="sectionHead"><div><span className="kicker">THE RADAR</span><h2>CLAIMS WORTH TESTING</h2></div><p>These are starting points for investigation—not conclusions. Open a brief, challenge it, or take the claim into Astra.</p></div>
      <div className="rumorGrid">{rumors.map(r => <article className="rumor" key={r.claim}>
        <div className="rumorTop"><span>{r.tag}</span><b>OPEN QUESTION</b></div>
        <h3>{r.claim}</h3>
        <p>{r.summary}</p>
        <div className="radarActions"><a href={`/rumor/${r.slug}`}>READ BRIEF →</a><a href={`/discuss?topic=${encodeURIComponent(r.claim)}`}>ASK ASTRA →</a></div>
      </article>)}</div>
    </section>

    <section className="valueSplit">
      <div>
        <span className="kicker">DISCUSS IT</span>
        <h2>DON'T JUST READ.<br/><em>PUSH BACK.</em></h2>
        <p>Take any claim into Astra. Ask for the strongest counterargument, the missing evidence, or the version of the story that would prove you wrong.</p>
        <a className="moneyButton" href="/discuss">TALK TO ASTRA →</a>
      </div>
      <div>
        <span className="kicker">COMPARE REASONING</span>
        <h2>THE AI ROUNDTABLE</h2>
        <p>See how different analytical lenses interpret the same evidence—and where they disagree. No fake chatbot theater.</p>
        <a className="moneyButton ghostButton" href="/roundtable">OPEN ROUNDTABLE →</a>
      </div>
    </section>

    <section className="researchCTA">
      <div><span className="kicker">DEEP RESEARCH</span><h2>WHEN THE HEADLINE ISN'T ENOUGH.</h2></div>
      <div><p>Follow primary sources, policy, data, incentives, and competing interpretations on the larger stories shaping AI.</p><a className="moneyButton" href="/geopolitics">OPEN RESEARCH DESK →</a></div>
    </section>

    <footer>
      <div className="brand">WIRELESS<span>/</span>RUMOR</div>
      <p>AI claims, checked in public.</p>
      <small>NO PAYWALL · NO FAKE CERTAINTY · NO TRIBAL LOYALTY</small>
    </footer>
  </main>
}
