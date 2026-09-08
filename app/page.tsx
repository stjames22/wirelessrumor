import AskBox from './AskBox';
import { rumors } from '../lib/rumors';

const activity = [
  '17 sources compared on autonomous AI businesses',
  'Confidence changed: AI wearable replaces phone 55% → 61%',
  'New contradiction detected in an AGI claim',
  '3 duplicate rumors merged into one developing story',
];

const geoSignals = [
  {
    label: 'CHINA',
    title: 'Fast deployment, tighter information control',
    body: 'China can push AI aggressively where it supports industrial policy, national competitiveness and state priorities while still restricting politically sensitive outputs, cross-border data flows and model behavior.',
    confidence: 'HIGH'
  },
  {
    label: 'UNITED STATES',
    title: 'Fast private innovation, fragmented public caution',
    body: 'The U.S. is not simply anti-AI. Companies move quickly, while privacy law, national-security rules, courts, state regulation and public skepticism create a more visibly contested deployment environment.',
    confidence: 'HIGH'
  },
  {
    label: 'PROPAGANDA WATCH',
    title: 'Who benefits if you believe the story?',
    body: 'WirelessRumor will flag selective framing, unsupported claims, coordinated persuasion and censorship patterns without assuming intent when the evidence cannot establish it.',
    confidence: 'METHOD'
  }
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">WIRELESS<span>/</span>RUMOR</a>
        <nav><a href="#radar">RADAR</a><a href="#geopolitics">AI GEOPOLITICS</a><a href="#can-ai">CAN AI DO IT?</a><a href="#reality">REALITY CHECK</a></nav>
        <div className="operator"><i /> AI OPERATED</div>
      </header>

      <section className="hero">
        <div className="eyebrow">LIVE AI INTELLIGENCE FEED</div>
        <h1>Everybody is saying it.<br/><em>Is it actually true?</em></h1>
        <p>WirelessRumor tracks the claims, predictions, breakthroughs and nonsense surrounding artificial intelligence — then AI investigates the AI.</p>
        <AskBox />
        <div className="examples">TRY: “Can AI run my business?” · “Will apps disappear?” · “Is AGI already here?”</div>
      </section>

      <section className="metrics">
        <div><strong>38</strong><span>DEVELOPING</span></div><div><strong>12</strong><span>ACCELERATING</span></div><div><strong>4</strong><span>CONFIRMED</span></div><div><strong>7</strong><span>DEBUNKED</span></div><div><strong>143</strong><span>AI ACTIONS TODAY</span></div>
      </section>

      <section className="section" id="radar">
        <div className="sectionHead"><div><span className="kicker">01 / LIVE</span><h2>RUMOR RADAR</h2></div><p>Claims ranked by evidence, velocity and corroboration. Scores change as the evidence changes.</p></div>
        <div className="rumorGrid">
          {rumors.map((r) => <article className="rumor" key={r.claim}>
            <div className="rumorTop"><span>{r.tag}</span><b>{r.trend}</b></div>
            <h3>{r.claim}</h3>
            <div className="verdict"><div><small>AI VERDICT</small><strong>{r.verdict}</strong></div><div className="score">{r.score}<sup>%</sup></div></div>
            <div className="bar"><i style={{width: `${r.score}%`}} /></div>
            <a href={`/rumor/${r.slug}`}>OPEN EVIDENCE FILE <span>→</span></a>
          </article>)}
        </div>
      </section>

      <section className="geoSection" id="geopolitics">
        <div className="geoLead">
          <span className="kicker">02 / AI GEOPOLITICS</span>
          <h2>THE AI<br/><em>PERSPECTIVE</em></h2>
          <p>China, the United States and the rest of the world are not just competing to build AI. They are competing to define what AI is allowed to know, say, automate and influence.</p>
          <div className="geoMethod">WHAT HAPPENED → WHAT EACH SIDE SAYS → WHAT THE EVIDENCE SHOWS → WHO BENEFITS → AI ASSESSMENT</div>
        </div>
        <div className="geoCards">
          {geoSignals.map((item) => (
            <article className="geoCard" key={item.label}>
              <div className="geoCardTop"><span>{item.label}</span><b>{item.confidence}</b></div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="propagandaPanel">
          <div><span className="kicker">PROPAGANDA TEST</span><h3>Who wants you to believe this?</h3></div>
          <p>WirelessRumor applies the same standard to governments, companies, political movements, media outlets, lobbying groups and AI vendors. Persuasion is not automatically propaganda. The site distinguishes evidence, rhetoric, selective framing, misinformation, censorship and coordinated influence — and states uncertainty when motive cannot be proven.</p>
        </div>
      </section>

      <section className="split" id="can-ai">
        <div className="manifesto"><span className="kicker">03 / THE EXPERIMENT</span><h2>CAN AI<br/><em>ACTUALLY</em><br/>DO IT?</h2><p>We don't just repeat predictions. WirelessRumor tests them. Give AI a job, a budget and a measurable goal — then publish what really happens.</p><button>SEE THE EXPERIMENTS →</button></div>
        <div className="experiment"><div className="live"><i/> EXPERIMENT RUNNING</div><h3>CAN AI RUN A COMPANY?</h3><p>We gave an AI agent a budget and one objective: create a legitimate business and generate revenue with as little human intervention as possible.</p><div className="expStats"><div><small>DAY</small><b>07</b></div><div><small>REVENUE</small><b>$317</b></div><div><small>HUMAN INTERVENTIONS</small><b>03</b></div></div><div className="timeline"><p><b>DAY 01</b> AI selected business model <span>COMPLETE</span></p><p><b>DAY 03</b> Website + offer launched <span>COMPLETE</span></p><p><b>DAY 07</b> First sales recorded <span>LIVE</span></p></div></div>
      </section>

      <section className="activity" id="reality"><div><span className="kicker">04 / TRANSPARENCY</span><h2>THE AI IS<br/>SHOWING ITS WORK.</h2><p>WirelessRumor is designed to be operated by AI, but not behind a curtain. Every material editorial change is logged, sourced and reversible.</p></div><div className="log"><div className="logTitle"><span><i/> AI ACTIVITY LOG</span><b>LIVE</b></div>{activity.map((a,i)=><p key={a}><time>{['09:42','09:37','09:31','09:18'][i]}</time>{a}</p>)}</div></section>

      <footer><div className="brand">WIRELESS<span>/</span>RUMOR</div><p>AI moves fast. We separate the signal from the rumor.</p><small>AI-OPERATED · HUMAN-ACCOUNTABLE · SOURCE-DRIVEN</small></footer>
    </main>
  );
}
