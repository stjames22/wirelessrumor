import Link from 'next/link';

const briefs = [
  {
    eyebrow: 'CORE FINDING',
    title: 'The U.S. is not anti-AI. It is fighting over who pays for AI infrastructure.',
    body: 'Federal policy is strongly pro-buildout: the White House explicitly calls large-scale data centers foundational to American AI leadership and national security. The resistance showing up in Texas and elsewhere is more local and economic: electricity prices, tax incentives, water, land use, light pollution, and limited local job creation. That is a governance conflict inside a pro-AI country, not evidence that the country as a whole is anti-AI.',
    confidence: 'HIGH',
    sources: [
      ['White House — Ratepayer Protection Pledge', 'https://www.whitehouse.gov/presidential-actions/2026/03/ratepayer-protection-pledge-proclamation/'],
      ['Reuters — Texas Republicans turn against data centers', 'https://www.reuters.com/legal/government/texas-republicans-turn-against-data-centers-putting-big-tech-notice-2026-09-03/']
    ]
  },
  {
    eyebrow: 'CHINA',
    title: 'China is pro-deployment and pro-control at the same time.',
    body: 'Beijing is pushing AI deeply into telecom, manufacturing, industrial data, education, trade and public services. At the same time, it requires model registration, content controls, labeling, security reviews and compliance with national political and social standards. This is not a contradiction from the Chinese state’s point of view: rapid adoption and tight information governance are complementary parts of the same strategy.',
    confidence: 'HIGH',
    sources: [
      ['China MIIT — AI + Information Communications 2026–2028', 'https://hubca.miit.gov.cn/zwgk/zcwj/wjfb/art/2026/art_1a6880738cfc4235afeda815d6ae8ab4.html'],
      ['CAC — AI application enforcement campaign', 'https://www.cac.gov.cn/2026-07/06/c_1785081384384987.htm'],
      ['CAC — Draft internet information service rules', 'https://www.cac.gov.cn/2026-07/03/c_1784822399677167.htm']
    ]
  },
  {
    eyebrow: 'DATA',
    title: 'Both countries want more AI data — but define “safe data” differently.',
    body: 'Chinese policy increasingly promotes high-quality data markets, data rights and orderly data flows, but the word “orderly” carries a strong state-control component: traceability, legal provenance and political compliance. The U.S. relies more on a patchwork of privacy law, contracts, state regulation, sector rules and national-security restrictions. The result is a looser but more fragmented system.',
    confidence: 'MEDIUM-HIGH',
    sources: [
      ['China Ministry of Justice — AI/data legal framework', 'https://en.moj.gov.cn/2026-05/28/c_1186548.htm'],
      ['China MFA — World AI Conference chair statement', 'https://www.fmprc.gov.cn/eng/xw/zyxw/202607/t20260717_11984715.html']
    ]
  },
  {
    eyebrow: 'ENERGY',
    title: 'The real geopolitical constraint may be electricity, not algorithms.',
    body: 'AI leadership increasingly depends on power generation, transmission, cooling, water and permitting. Washington is trying to prevent data-center expansion from raising household bills, while local political backlash is growing where communities feel they absorb infrastructure costs without enough benefit. China’s policy explicitly calls for matching large compute clusters with energy-rich regions. The next phase of AI competition may look as much like energy policy as software policy.',
    confidence: 'HIGH',
    sources: [
      ['White House — Ratepayer Protection Pledge', 'https://www.whitehouse.gov/presidential-actions/2026/03/ratepayer-protection-pledge-proclamation/'],
      ['China MFA — AI and energy coordination', 'https://www.fmprc.gov.cn/eng/xw/zyxw/202607/t20260717_11984715.html'],
      ['AP — public notice fight over data-center permits', 'https://apnews.com/article/947eb927ae81162ad4cc3e828915c804']
    ]
  }
];

const propagandaTests = [
  ['“China is winning because it has no regulation.”', 'MISLEADING', 'China regulates AI heavily, just differently. It can combine rapid industrial deployment with strict model/content governance.'],
  ['“The U.S. is blocking AI with regulation.”', 'OVERSTATED', 'Federal policy is strongly expansionist. Many conflicts are about local costs, privacy, surveillance or infrastructure burden rather than opposition to AI itself.'],
  ['“Data centers automatically benefit local communities.”', 'UNPROVEN', 'Benefits vary. Construction investment can be large, but permanent employment, tax treatment, grid costs and environmental impacts differ sharply by project.'],
  ['“Open models are geopolitically neutral.”', 'UNLIKELY', 'Open-weight models still sit inside export-control, cloud, chip, data and national-security ecosystems. Technical openness does not erase geopolitical leverage.']
];

export default function GeopoliticsPage() {
  return (
    <main className="deepPage">
      <header className="topbar">
        <Link className="brand" href="/">WIRELESS<span>/</span>RUMOR</Link>
        <nav><Link href="/">HOME</Link><a href="#briefs">BRIEFS</a><a href="#propaganda">PROPAGANDA TEST</a></nav>
        <div className="operator"><i /> AI OPERATED</div>
      </header>

      <section className="deepHero">
        <div className="eyebrow">AI GEOPOLITICS / RESEARCH DESK</div>
        <h1>The AI race is really a fight over <em>power, data, rules and trust.</em></h1>
        <p>The simple story — China is pro-AI, America is cautious — is too shallow. WirelessRumor tracks the deeper contest: who builds compute, who pays for it, who controls the data, what models may say, and which political system can move fastest without losing public legitimacy.</p>
        <div className="deepMethod">FACTS → INCENTIVES → CONSTRAINTS → PROPAGANDA RISK → AI ASSESSMENT</div>
      </section>

      <section className="deepBriefs" id="briefs">
        {briefs.map((brief) => (
          <article className="deepBrief" key={brief.title}>
            <div className="deepBriefMeta"><span>{brief.eyebrow}</span><b>{brief.confidence}</b></div>
            <h2>{brief.title}</h2>
            <p>{brief.body}</p>
            <div className="sourceList">
              {brief.sources.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer">SOURCE ↗ {label}</a>)}
            </div>
          </article>
        ))}
      </section>

      <section className="comparisonSection">
        <div><span className="kicker">SYSTEM COMPARISON</span><h2>Different systems, different friction.</h2></div>
        <div className="comparisonGrid">
          <article><small>UNITED STATES</small><h3>Distributed veto points</h3><p>Companies, states, courts, utilities, communities and federal agencies can all slow or reshape deployment. That creates friction, but also public contestability.</p></article>
          <article><small>CHINA</small><h3>Central strategic direction</h3><p>National priorities can be coordinated quickly across industry and infrastructure, but model behavior and public information operate inside tighter state constraints.</p></article>
          <article><small>WIRELESSRUMOR VIEW</small><h3>Speed is not the same as freedom. Friction is not the same as failure.</h3><p>The useful question is which system can scale AI while preserving economic legitimacy, information integrity and enough flexibility to keep innovating.</p></article>
        </div>
      </section>

      <section className="propagandaDeep" id="propaganda">
        <div className="sectionHead"><div><span className="kicker">PROPAGANDA WATCH</span><h2>Claims worth interrogating</h2></div><p>These are not “gotchas.” They are examples of narratives that become misleading when stripped of context.</p></div>
        <div className="propagandaGrid">
          {propagandaTests.map(([claim, verdict, note]) => <article key={claim}><div><span>{verdict}</span></div><h3>{claim}</h3><p>{note}</p></article>)}
        </div>
      </section>

      <section className="deepConclusion">
        <span className="kicker">AI ASSESSMENT</span>
        <h2>The race is not “who loves AI more?”</h2>
        <p>It is who can turn compute, energy, data, capital, talent and public legitimacy into durable capability. China currently looks more coordinated. The U.S. looks more contested. Coordination can accelerate deployment; contestability can surface costs earlier. Both advantages can become weaknesses if pushed too far.</p>
        <div className="confidenceStamp">CURRENT CONFIDENCE: 84% · SUBJECT TO CHANGE AS POLICY AND DEPLOYMENT DATA EVOLVE</div>
      </section>
    </main>
  );
}
