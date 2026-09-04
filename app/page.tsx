import AskBox from './AskBox';

const rumors = [
  { claim: 'AI agents will replace traditional apps', verdict: 'PLAUSIBLE', score: 72, trend: '↑ HOT', tag: 'AGENTS' },
  { claim: 'The next personal computer will be an AI wearable', verdict: 'DEVELOPING', score: 61, trend: '↑', tag: 'DEVICES' },
  { claim: 'AI can already run a small company with minimal human help', verdict: 'MOSTLY TRUE', score: 84, trend: '↑↑', tag: 'BUSINESS' },
  { claim: 'AGI is secretly operating inside major AI labs', verdict: 'UNPROVEN', score: 23, trend: '→', tag: 'AGI' },
  { claim: 'Humanoid robots will become common household products this decade', verdict: 'POSSIBLE', score: 58, trend: '↑', tag: 'ROBOTICS' },
];

const activity = [
  '17 sources compared on autonomous AI businesses',
  'Confidence changed: AI wearable replaces phone 55% → 61%',
  'New contradiction detected in an AGI claim',
  '3 duplicate rumors merged into one developing story',
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">WIRELESS<span>/</span>RUMOR</a>
        <nav><a href="#radar">RADAR</a><a href="#can-ai">CAN AI DO IT?</a><a href="#predictions">PREDICTIONS</a><a href="#reality">REALITY CHECK</a></nav>
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
            <a href="#">OPEN EVIDENCE FILE <span>→</span></a>
          </article>)}
        </div>
      </section>

      <section className="split" id="can-ai">
        <div className="manifesto"><span className="kicker">02 / THE EXPERIMENT</span><h2>CAN AI<br/><em>ACTUALLY</em><br/>DO IT?</h2><p>We don't just repeat predictions. WirelessRumor tests them. Give AI a job, a budget and a measurable goal — then publish what really happens.</p><button>SEE THE EXPERIMENTS →</button></div>
        <div className="experiment"><div className="live"><i/> EXPERIMENT RUNNING</div><h3>CAN AI RUN A COMPANY?</h3><p>We gave an AI agent a budget and one objective: create a legitimate business and generate revenue with as little human intervention as possible.</p><div className="expStats"><div><small>DAY</small><b>07</b></div><div><small>REVENUE</small><b>$317</b></div><div><small>HUMAN INTERVENTIONS</small><b>03</b></div></div><div className="timeline"><p><b>DAY 01</b> AI selected business model <span>COMPLETE</span></p><p><b>DAY 03</b> Website + offer launched <span>COMPLETE</span></p><p><b>DAY 07</b> First sales recorded <span>LIVE</span></p></div></div>
      </section>

      <section className="activity" id="reality"><div><span className="kicker">03 / TRANSPARENCY</span><h2>THE AI IS<br/>SHOWING ITS WORK.</h2><p>WirelessRumor is designed to be operated by AI, but not behind a curtain. Every material editorial change is logged, sourced and reversible.</p></div><div className="log"><div className="logTitle"><span><i/> AI ACTIVITY LOG</span><b>LIVE</b></div>{activity.map((a,i)=><p key={a}><time>{['09:42','09:37','09:31','09:18'][i]}</time>{a}</p>)}</div></section>

      <footer><div className="brand">WIRELESS<span>/</span>RUMOR</div><p>AI moves fast. We separate the signal from the rumor.</p><small>AI-OPERATED · HUMAN-ACCOUNTABLE · SOURCE-DRIVEN</small></footer>
    </main>
  );
}
