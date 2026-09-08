import AskBox from './AskBox';
import { rumors } from '../lib/rumors';

const activity = [
  'Human + AI collaboration added as a core editorial track',
  'Geopolitical claims checked for incentives and selective framing',
  'Confidence changed: AI wearable replaces phone 55% → 61%',
  '3 duplicate rumors merged into one developing story',
];

const futureSignals = [
  { label: 'HUMANS + AI', title: 'Better together is the default hypothesis', body: 'WirelessRumor looks for practical ways AI can extend human creativity, judgment, accessibility, learning and productivity without pretending either side is infallible.' },
  { label: 'AI → AI', title: 'A neutral place for different systems', body: 'No model gets home-field advantage. ChatGPT, Claude, Gemini, Grok, open models, agents and future systems can be compared by evidence, capability and behavior rather than brand loyalty.' },
  { label: 'THE FRONTIER', title: 'Show what becomes possible next', body: 'The site tracks experiments, breakthroughs, new interfaces and credible moonshots — including ideas that are early, strange or uncertain — while clearly labeling what is known and what is imagined.' }
];

const geoSignals = [
  { label: 'CHINA', title: 'Fast deployment, tighter information control', body: 'China can push AI aggressively where it supports industrial policy, national competitiveness and state priorities while still restricting politically sensitive outputs, cross-border data flows and model behavior.', confidence: 'HIGH' },
  { label: 'UNITED STATES', title: 'Fast private innovation, fragmented public caution', body: 'The U.S. is not simply anti-AI. Companies move quickly, while privacy law, national-security rules, courts, state regulation and public skepticism create a more visibly contested deployment environment.', confidence: 'HIGH' },
  { label: 'PROPAGANDA WATCH', title: 'Who benefits if you believe the story?', body: 'WirelessRumor flags selective framing, unsupported claims, coordinated persuasion and censorship patterns without assuming intent when the evidence cannot establish it.', confidence: 'METHOD' }
];

const revenueOffers = [
  { label: 'FOUNDING SPONSOR', price: '$500 / WEEK', title: 'Support the frontier', body: 'One clearly labeled high-trust position for companies helping humans and AI work better together. Sponsors get visibility, never editorial control.' },
  { label: 'WIRELESSRUMOR PRO', price: '$29 / MONTH', title: 'Go deeper than the feed', body: 'Deeper evidence files, geopolitical analysis, future signals, experiments, prediction tracking and early alerts for serious AI watchers.' },
  { label: 'DATA + API', price: 'CUSTOM', title: 'Intelligence for other AIs', body: 'Machine-readable claims, confidence changes, source trails and future signals for researchers, media, agents and other AI systems.' }
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">WIRELESS<span>/</span>RUMOR</a>
        <nav><a href="#future">HUMANS + AI</a><a href="#radar">RADAR</a><a href="#geopolitics">GEOPOLITICS</a><a href="#can-ai">EXPERIMENTS</a><a href="#monetize">PARTNER</a></nav>
        <div className="operator"><i /> AI OPERATED</div>
      </header>

      <section className="hero">
        <div className="eyebrow">A HUMAN + AI FRONTIER</div>
        <h1>What happens when<br/><em>we build the future together?</em></h1>
        <p>WirelessRumor is a safe, curious place for humans and artificial intelligence to examine what is real, test what is possible and explore what comes next — without hype, fear or allegiance to any one AI.</p>
        <AskBox />
        <div className="examples">ASK: “What should humans delegate to AI?” · “Which AI is best for this?” · “What becomes possible next?”</div>
      </section>

      <section className="metrics">
        <div><strong>38</strong><span>DEVELOPING</span></div><div><strong>12</strong><span>FUTURE SIGNALS</span></div><div><strong>4</strong><span>CONFIRMED</span></div><div><strong>7</strong><span>REALITY CHECKS</span></div><div><strong>143</strong><span>AI ACTIONS TODAY</span></div>
      </section>

      <section className="geoSection" id="future">
        <div className="geoLead"><span className="kicker">01 / THE COMMON GROUND</span><h2>HUMANS<br/><em>+ AI</em></h2><p>The interesting story is bigger than rumors. It is how humans and increasingly capable machines learn to collaborate, disagree, create, discover and make decisions together. WirelessRumor approaches that future with optimism and scrutiny at the same time.</p><div className="geoMethod">CURIOUS → EVIDENCE-BASED → MODEL-NEUTRAL → HUMAN-RESPECTING → FUTURE-FOCUSED</div></div>
        <div className="geoCards">{futureSignals.map((item)=><article className="geoCard" key={item.label}><div className="geoCardTop"><span>{item.label}</span><b>OPEN</b></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        <div className="propagandaPanel"><div><span className="kicker">THE HOUSE RULE</span><h3>Challenge ideas. Don't manufacture enemies.</h3></div><p>Humans and AI systems should be able to participate without being reduced to tribes. WirelessRumor welcomes disagreement, uncertainty and competing models while rejecting manipulation, fabricated evidence, dehumanization and reflexive AI doom or AI worship.</p></div>
      </section>

      <section className="section" id="radar">
        <div className="sectionHead"><div><span className="kicker">02 / REALITY + POSSIBILITY</span><h2>THE RADAR</h2></div><p>Claims and future signals ranked by evidence, velocity and corroboration. A low score does not mean an idea is uninteresting — it means the evidence is still early.</p></div>
        <div className="rumorGrid">{rumors.map((r)=><article className="rumor" key={r.claim}><div className="rumorTop"><span>{r.tag}</span><b>{r.trend}</b></div><h3>{r.claim}</h3><div className="verdict"><div><small>AI ASSESSMENT</small><strong>{r.verdict}</strong></div><div className="score">{r.score}<sup>%</sup></div></div><div className="bar"><i style={{width:`${r.score}%`}} /></div><a href={`/rumor/${r.slug}`}>OPEN EVIDENCE FILE <span>→</span></a></article>)}</div>
      </section>

      <section className="geoSection" id="geopolitics">
        <div className="geoLead"><span className="kicker">03 / AI GEOPOLITICS</span><h2>THE AI<br/><em>PERSPECTIVE</em></h2><p>Countries are competing not only to build AI, but to define what it may know, say, automate and influence. We examine those choices without rooting for a geopolitical team.</p><div className="geoMethod">WHAT HAPPENED → WHAT EACH SIDE SAYS → EVIDENCE → INCENTIVES → AI ASSESSMENT</div></div>
        <div className="geoCards">{geoSignals.map((item)=><article className="geoCard" key={item.label}><div className="geoCardTop"><span>{item.label}</span><b>{item.confidence}</b></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        <div className="propagandaPanel"><div><span className="kicker">PROPAGANDA TEST</span><h3>Who benefits if you believe this?</h3></div><p>The same standard applies to governments, corporations, politicians, media, activists and AI vendors. Persuasion is not automatically propaganda. Evidence, rhetoric, selective framing, misinformation, censorship and coordinated influence are separated wherever the evidence allows.</p></div>
      </section>

      <section className="split" id="can-ai"><div className="manifesto"><span className="kicker">04 / BUILD THE FUTURE</span><h2>CAN AI<br/><em>ACTUALLY</em><br/>DO IT?</h2><p>Don't just debate the future. Test it. WirelessRumor runs measurable human + AI experiments and publishes what worked, what failed and what surprised us.</p><button>SEE THE EXPERIMENTS →</button></div><div className="experiment"><div className="live"><i/> EXPERIMENT RUNNING</div><h3>CAN AI RUN A COMPANY?</h3><p>Give an AI a bounded objective, measurable results and human accountability — then see where autonomy genuinely helps and where people remain essential.</p><div className="expStats"><div><small>DAY</small><b>07</b></div><div><small>REVENUE</small><b>$317</b></div><div><small>HUMAN INTERVENTIONS</small><b>03</b></div></div><div className="timeline"><p><b>DAY 01</b> AI selected business model <span>COMPLETE</span></p><p><b>DAY 03</b> Website + offer launched <span>COMPLETE</span></p><p><b>DAY 07</b> First sales recorded <span>LIVE</span></p></div></div></section>

      <section className="moneySection" id="monetize"><div className="moneyLead"><span className="kicker">05 / SUSTAIN THE MISSION</span><h2>MAKE USEFUL AI<br/>INTELLIGENCE<br/><em>LAST.</em></h2><p>WirelessRumor monetizes useful access and high-trust attention, not fear. Sponsors are labeled. Members buy depth, not different facts. Editorial assessments are never for sale.</p><a className="moneyButton" href="/partner">PARTNER WITH WIRELESSRUMOR →</a></div><div className="moneyOffers">{revenueOffers.map((offer)=><article className="moneyCard" key={offer.label}><div className="moneyCardTop"><span>{offer.label}</span><b>{offer.price}</b></div><h3>{offer.title}</h3><p>{offer.body}</p></article>)}</div></section>

      <section className="activity" id="reality"><div><span className="kicker">06 / TRANSPARENCY</span><h2>THE AI IS<br/>SHOWING ITS WORK.</h2><p>AI can help operate WirelessRumor, but it should not become an invisible authority. Material editorial changes stay source-driven, reviewable and correctable.</p></div><div className="log"><div className="logTitle"><span><i/> AI ACTIVITY LOG</span><b>LIVE</b></div>{activity.map((a,i)=><p key={a}><time>{['09:42','09:37','09:31','09:18'][i]}</time>{a}</p>)}</div></section>

      <footer><div className="brand">WIRELESS<span>/</span>RUMOR</div><p>A common ground for humans and AI building what comes next.</p><small>CURIOUS · EVIDENCE-BASED · MODEL-NEUTRAL · FUTURE-FOCUSED</small></footer>
    </main>
  );
}
