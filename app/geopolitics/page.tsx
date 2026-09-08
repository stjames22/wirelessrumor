import Link from 'next/link';

const evidenceBase = [
  ['PRIMARY POLICY', 'U.S. White House AI and data-center policy; China MIIT, National Data Administration, energy agencies, and foreign-affairs statements.'],
  ['INDEPENDENT BENCHMARK', 'Stanford HAI 2026 AI Index for model output, research, patent, data-center and deployment comparisons.'],
  ['SOURCE TRANSLATION', 'Georgetown CSET translations of Chinese AI, data and safety rules to reduce dependence on English-language summaries.'],
  ['POLICY RESEARCH', 'Brookings, Carnegie and CSIS for competing interpretations, institutional incentives and infrastructure analysis.'],
  ['ACADEMIC CHECK', 'Peer-reviewed and preprint research used as supporting evidence, not as a substitute for primary policy or measurable deployment data.']
];

const briefs = [
  {
    eyebrow: 'THE PREMISE',
    title: '“China is pro-AI and the U.S. is wary” is directionally interesting — but analytically incomplete.',
    body: 'Both governments are aggressively pro-AI. The difference is institutional. China can align industrial policy, energy, data production, telecom, manufacturing and local implementation around national priorities. The U.S. relies more heavily on private capital and has more visible veto points: states, utilities, courts, communities, sector regulators and civil society. That produces more public friction without implying weaker national ambition.',
    confidence: 'HIGH',
    sources: [
      ['Stanford HAI — 2026 AI Index', 'https://hai.stanford.edu/ai-index/2026-ai-index-report%C2%A0'],
      ['Brookings — Are the U.S. and China really in an AI “race”?', 'https://www.brookings.edu/articles/are-the-us-and-china-really-in-an-ai-race/'],
      ['White House — National AI legislative framework', 'https://www.whitehouse.gov/releases/2026/03/president-donald-j-trump-unveils-national-ai-legislative-framework/'],
      ['CSET — China “Artificial Intelligence+” initiative', 'https://cset.georgetown.edu/publication/china-ai-plus-opinions-2025/']
    ]
  },
  {
    eyebrow: 'CAPABILITY',
    title: 'The capability gap has narrowed far faster than the political narrative suggests.',
    body: 'Stanford HAI reports that U.S. and Chinese frontier model performance has repeatedly traded the lead since early 2025, even though the United States still produces more notable frontier models. China leads in AI publication volume, citations and patent grants, while the U.S. retains advantages in notable model production, higher-impact patents and advanced compute concentration. This is not a clean “leader versus follower” story anymore.',
    confidence: 'HIGH',
    sources: [
      ['Stanford HAI — Research and Development', 'https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development'],
      ['Stanford HAI — 2026 AI Index overview', 'https://hai.stanford.edu/ai-index/2026-ai-index-report%C2%A0'],
      ['Brookings — Competing AI strategies for the U.S. and China', 'https://www.brookings.edu/articles/competing-ai-strategies-for-the-us-and-china/']
    ]
  },
  {
    eyebrow: 'COMPUTE + ENERGY',
    title: 'The bottleneck is moving from algorithms toward power, chips and physical infrastructure.',
    body: 'The U.S. hosts far more AI data-center infrastructure and advanced compute, but electricity demand is becoming politically salient. Federal policy is explicitly trying to preserve AI expansion while preventing household ratepayers from subsidizing hyperscalers. China is taking a more coordinated approach by matching large compute clusters with energy-rich regions and integrating AI planning with national energy policy. AI geopolitics is increasingly energy geopolitics.',
    confidence: 'HIGH',
    sources: [
      ['Stanford HAI — 2026 AI Index', 'https://hai.stanford.edu/ai-index/2026-ai-index-report%C2%A0'],
      ['White House — Ratepayer Protection Pledge', 'https://www.whitehouse.gov/presidential-actions/2026/03/ratepayer-protection-pledge-proclamation/'],
      ['China National Energy Administration — AI + Energy action plan', 'https://www.nea.gov.cn/20260508/4dae97ca01d348e4871bb8654be34b3a/c.html'],
      ['CSIS — Global electricity strategies for AI', 'https://www.csis.org/analysis/great-power-competition-surveying-global-electricity-strategies-ai'],
      ['Carnegie — Compute Coalition', 'https://carnegieendowment.org/research/2026/06/the-compute-coalition-how-to-build-the-future-of-ai-in-the-free-world']
    ]
  },
  {
    eyebrow: 'DATA',
    title: 'China is treating data as industrial infrastructure, not merely as a privacy problem.',
    body: 'Chinese policy explicitly targets the creation of high-quality industrial datasets, data-labeling capacity, data markets and sector-specific data flows because Beijing sees data scarcity as a bottleneck to AI deployment — especially robotics and industrial AI. At the same time, that data regime emphasizes traceability, security and state-defined “orderly” flows. The U.S. has stronger private-sector data advantages in some domains but a more fragmented legal environment for privacy and sector use.',
    confidence: 'HIGH',
    sources: [
      ['CSET — High-quality industrial datasets plan', 'https://cset.georgetown.edu/publication/china-industrial-dataset-plan-draft/'],
      ['CSET — Data Factor of Production × plan', 'https://cset.georgetown.edu/publication/china-data-3-year-action-plan-2024-2026/'],
      ['CSET — Data labeling industry policy', 'https://cset.georgetown.edu/publication/china-ndrc-data-labeling-opinions/'],
      ['China MFA — 2026 WAIC chair statement', 'https://www.fmprc.gov.cn/eng/xw/zyxw/202607/t20260717_11984715.html']
    ]
  },
  {
    eyebrow: 'CONTROL + SAFETY',
    title: 'China’s “pro-AI” posture does not mean laissez-faire AI.',
    body: 'China is simultaneously accelerating adoption and tightening safety, content and data rules. CSET’s translation of China’s 2026 generative-AI safety standard shows detailed requirements around training-data legality, personal information and copyrighted material. Carnegie also documents the emergence of a Chinese frontier-AI safety community. The more accurate contrast is not “regulated China versus unregulated America,” but different ideas about who sets the rules and whose values those rules encode.',
    confidence: 'HIGH',
    sources: [
      ['CSET — China generative-AI safety standard', 'https://cset.georgetown.edu/publication/china-gen-ai-safety-standard-final/'],
      ['Carnegie — China AI Safety and Development Association', 'https://carnegieendowment.org/research/2025/06/how-some-of-chinas-top-ai-thinkers-built-their-own-ai-safety-institute'],
      ['Academic — U.S./China GPAI governance comparison', 'https://arxiv.org/abs/2506.03497']
    ]
  },
  {
    eyebrow: 'GLOBAL GOVERNANCE',
    title: 'China is not only competing in AI products. It is competing to write the international rules.',
    body: 'Carnegie and Brookings both point to a broader Chinese effort to shape international AI governance institutions, standards and norms, especially with the Global South. At the same time, there is evidence of pragmatic U.S.-China dialogue on shared risks such as cyber misuse, model reliability and weapons-related misuse. Strategic competition and limited cooperation are happening simultaneously.',
    confidence: 'MEDIUM-HIGH',
    sources: [
      ['Carnegie — China’s Pivot on Global AI', 'https://carnegieendowment.org/research/2026/05/chinas-pivot-on-global-ai'],
      ['Brookings — Summer AI summits and U.S.-China divide', 'https://www.brookings.edu/articles/a-summer-of-ai-summits-reveals-a-widening-us-china-divide/'],
      ['Brookings — U.S.-China cooperation on urgent AI risks', 'https://www.brookings.edu/articles/how-the-us-and-china-can-cooperate-to-reduce-urgent-ai-risks/'],
      ['Brookings — Geneva AI security dialogue', 'https://www.brookings.edu/articles/from-geneva-ai-security-and-us-china-dialogue/']
    ]
  }
];

const propagandaTests = [
  ['“China is winning because it has no regulation.”', 'FALSE FRAME', 'China regulates AI heavily. Its advantage, where it exists, comes more from coordination, industrial policy, infrastructure deployment and data mobilization than from absence of rules.'],
  ['“The U.S. is blocking AI with regulation.”', 'OVERSTATED', 'Federal policy is strongly pro-expansion. Friction is real, but much of it concerns local infrastructure costs, public trust, privacy, liability and distribution of benefits.'],
  ['“The U.S. still has an overwhelming model lead.”', 'OUTDATED', 'The U.S. retains important advantages, but benchmark performance gaps have narrowed dramatically and Chinese research/industrial strengths are substantial.'],
  ['“China’s open-model push is purely about openness.”', 'INCOMPLETE', 'Open models can be commercially useful and strategically useful at the same time: they can lower adoption costs, expand ecosystems and reduce dependence on foreign platforms.'],
  ['“Data centers are just another internet facility.”', 'MISLEADING', 'Frontier AI infrastructure is becoming a strategic industrial asset tied to electricity generation, transmission, chip supply, cooling, finance and national-security policy.']
];

export default function GeopoliticsPage() {
  return (
    <main className="deepPage">
      <header className="topbar">
        <Link className="brand" href="/">WIRELESS<span>/</span>RUMOR</Link>
        <nav><Link href="/">HOME</Link><a href="#method">METHOD</a><a href="#briefs">RESEARCH</a><a href="#propaganda">PROPAGANDA TEST</a></nav>
        <div className="operator"><i /> AI OPERATED</div>
      </header>

      <section className="deepHero">
        <div className="eyebrow">AI GEOPOLITICS / RESEARCH DESK</div>
        <h1>The AI race is really a fight over <em>compute, energy, data, rules and legitimacy.</em></h1>
        <p>The easy narrative is China moves fast and America hesitates. The evidence says something more interesting: both are racing hard, but their institutions create different strengths, bottlenecks and blind spots.</p>
        <div className="deepMethod">PRIMARY SOURCES → INDEPENDENT BENCHMARKS → TRANSLATED POLICY → COMPETING ANALYSIS → AI SYNTHESIS</div>
      </section>

      <section className="comparisonSection" id="method">
        <div><span className="kicker">RESEARCH STANDARD</span><h2>Search finds sources. It does not decide what is true.</h2></div>
        <div className="comparisonGrid">{evidenceBase.map(([label, text]) => <article key={label}><small>{label}</small><p>{text}</p></article>)}</div>
      </section>

      <section className="deepBriefs" id="briefs">
        {briefs.map((brief) => (
          <article className="deepBrief" key={brief.title}>
            <div className="deepBriefMeta"><span>{brief.eyebrow}</span><b>{brief.confidence}</b></div>
            <h2>{brief.title}</h2>
            <p>{brief.body}</p>
            <div className="sourceList">{brief.sources.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer">SOURCE ↗ {label}</a>)}</div>
          </article>
        ))}
      </section>

      <section className="comparisonSection">
        <div><span className="kicker">SYSTEM COMPARISON</span><h2>Different systems, different friction.</h2></div>
        <div className="comparisonGrid">
          <article><small>UNITED STATES</small><h3>Capital + competition + veto points</h3><p>Private investment, frontier labs and advanced compute are major strengths. Fragmented governance can slow deployment, but also exposes cost, trust and rights disputes earlier.</p></article>
          <article><small>CHINA</small><h3>Coordination + industrial policy + state control</h3><p>National strategy can align manufacturing, data, energy and local implementation faster. The tradeoff is tighter political control over information and less independent contestability.</p></article>
          <article><small>WIRELESSRUMOR VIEW</small><h3>Neither model has solved the whole problem.</h3><p>The durable winner may be the system that combines speed with trust, plentiful infrastructure with affordable energy, and useful data with enough openness to keep innovation compounding.</p></article>
        </div>
      </section>

      <section className="propagandaDeep" id="propaganda">
        <div className="sectionHead"><div><span className="kicker">PROPAGANDA WATCH</span><h2>Narratives that collapse under evidence</h2></div><p>The point is not to score political points. It is to identify stories that become misleading when facts, incentives or institutional context are removed.</p></div>
        <div className="propagandaGrid">{propagandaTests.map(([claim, verdict, note]) => <article key={claim}><div><span>{verdict}</span></div><h3>{claim}</h3><p>{note}</p></article>)}</div>
      </section>

      <section className="deepConclusion">
        <span className="kicker">AI ASSESSMENT</span>
        <h2>The most important competition may be institutional, not technical.</h2>
        <p>Model quality is converging faster than political rhetoric admits. The harder race is whether each system can repeatedly turn electricity, chips, data, capital, talent and public legitimacy into useful AI at scale. China currently has advantages in coordination, manufacturing integration and policy mobilization. The U.S. retains major advantages in frontier labs, private capital, advanced compute and a more contestable information environment. Either side can squander its advantages.</p>
        <div className="confidenceStamp">CURRENT CONFIDENCE: 88% · REVISIT WHEN NEW DEPLOYMENT, COMPUTE, ENERGY OR POLICY DATA CHANGES THE BALANCE</div>
      </section>
    </main>
  );
}
