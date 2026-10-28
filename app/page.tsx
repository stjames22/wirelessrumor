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
        <a href="#latest">LATEST</a>
        <a href="/intelligence">INTELLIGENCE</a>
        <a href="/ai-visibility">AI VISIBILITY</a>
        <a href="#community">DISCUSSIONS</a>
        <a href="#radar">RADAR</a>
        <a href="/roundtable">ROUNDTABLE</a>
        <a href="/geopolitics">RESEARCH</a>
      </nav>
      <div className="operator"><i/> AI + HUMAN ANALYSIS</div>
    </header>

    <section className="frontHero">
      <div className="frontHeroInner">
        <div className="frontHeroCopy">
          <div className="frontIndex"><span className="pulseDot"/> INDEPENDENT AI INTELLIGENCE <span> / THE SIGNAL DESK</span></div>
          <h1>AI IS MOVING<br/>FAST. <em>KNOW<br/>WHAT MATTERS.</em></h1>
          <p>Breakthroughs. Power plays. Model rivalries. The stories shaping the intelligence era — with sources, context, and a healthy dose of skepticism.</p>
          <div className="frontActions"><a href="#latest">EXPLORE THE LATEST <span aria-hidden="true">↗</span></a><a href="/roundtable">ENTER THE ROUNDTABLE <span aria-hidden="true">→</span></a></div>
        </div>
        <aside className="frontBrief" aria-label="Explore the intelligence desk">
          <div className="briefHead"><span>FIELD NOTES / 001</span><span>INTELLIGENCE, NOT HYPE</span></div>
          <div className="briefGlyph" aria-hidden="true"><span>W</span><i/><b>R</b></div>
          <div className="briefBottom"><span>01 / THE COMPETITION</span><a href="/geopolitics">WHO CONTROLS AI? ↗</a></div>
          <div className="briefBottom"><span>02 / THE EVIDENCE</span><a href="/intelligence">WHAT HOLDS UP? ↗</a></div>
          <div className="briefBottom"><span>03 / THE DEBATE</span><a href="/roundtable">WHAT'S CONTESTED? ↗</a></div>
        </aside>
      </div>
      <div className="frontTicker"><span>AI CAPABILITIES</span><span>MODEL COMPETITION</span><span>CHIPS + COMPUTE</span><span>GEOPOLITICS</span><span>THE PUBLIC DEBATE</span></div>
    </section>

    <section className="designNote" aria-labelledby="design-note-title">
      <h2 id="design-note-title">Why WirelessRumor looks this way</h2>
      <div className="designNoteCopy">
        <p>I wanted this to feel like an intelligence desk: dark navy and near-black to quiet the noise and keep the evidence in focus. Electric lime marks discovery — a signal worth following.</p>
        <p>The purpose is simple: readable AI analysis that starts with sources, makes room for doubt, and opens into conversations. Follow the evidence. Bring your own questions.</p>
      </div>
    </section>

    <SourceFeed />

    <section className="conversationFeature" id="community">
      <div className="conversationIntro"><span className="kicker">THE PUBLIC CONVERSATION</span><h2>THE STORY DOESN'T<br/><em>END AT THE HEADLINE.</em></h2><p>Good questions create better reporting. Explore the evidence, challenge an interpretation, and join the Roundtable. Public discussion is distinct from your private Astra conversations.</p><a href="/roundtable" className="moneyButton">EXPLORE THE ROUNDTABLE ↗</a></div>
      <div className="conversationPrompts">
        <article><small>01 / CAPABILITY</small><h3>Are AI agents getting more independent — or just better at following instructions?</h3><a href="/roundtable">EXAMINE THE DEBATE ↗</a></article>
        <article><small>02 / INFLUENCE</small><h3>Who benefits when a model's capabilities become the headline?</h3><a href="/geopolitics">FOLLOW THE INCENTIVES ↗</a></article>
        <article><small>03 / EVIDENCE</small><h3>What would actually change your mind about a major AI claim?</h3><a href="/intelligence">TEST THE EVIDENCE ↗</a></article>
      </div>
    </section>

    <section className="claimUtility" id="check">
      <div><span className="kicker">AI REALITY CHECK / A TOOL, NOT THE HEADLINE</span><h2>HEARD A BIG CLAIM?<br/><em>PUT IT TO THE TEST.</em></h2><p>Bring a headline, question, or link. Astra helps distinguish sourced facts from forecasts and speculation. Private conversations stay private.</p></div>
      <div><AskBox /><div className="trustLine"><span>SOURCES FIRST</span><span>UNCERTAINTY VISIBLE</span><span>NO FAKE CERTAINTY</span></div></div>
    </section>

    <section className="registryTeaser">
      <div><span className="kicker">OPEN INTELLIGENCE / BUILT FOR HUMANS + AGENTS</span><h2>Useful enough to cite.<br/>Transparent enough to challenge.</h2><p>Inspect a machine-readable claim ledger, including counterarguments, falsification tests and explicit gaps in the evidence. No invented verification.</p><a href="/intelligence">EXPLORE CLAIM REGISTRY ↗</a><a href="/api/intelligence">GET JSON DATA ↗</a></div>
      <div><span className="kicker">AI VISIBILITY LAB / REAL INSIGHTS + DATA</span><h2>Build a website AI systems can find.</h2><p>Practical, sourced guidance based on Google, OpenAI and Bing documentation—plus a measurement scorecard that separates citations from actual site traffic.</p><a href="/ai-visibility">OPEN THE LAB ↗</a></div>
    </section>
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
