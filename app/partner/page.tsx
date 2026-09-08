import Link from 'next/link';

const offers = [
  {
    name: 'Founding Sponsor',
    price: '$500/week',
    details: ['One clearly labeled placement in the intelligence feed', 'Category exclusivity during the sponsored week when available', 'No influence over verdicts, confidence scores or editorial conclusions', 'Best fit: AI tools, infrastructure, security, robotics, data and developer platforms']
  },
  {
    name: 'WirelessRumor Pro',
    price: '$29/month',
    details: ['Deeper geopolitical and propaganda analysis', 'Extended evidence files and prediction tracking', 'Early alerts on major AI claims and reversals', 'Downloadable research notes and briefing summaries']
  },
  {
    name: 'Data + API Licensing',
    price: 'Custom',
    details: ['Machine-readable rumor and claim records', 'Confidence-score and status-change history', 'Evidence and source trails', 'Licensing for research, media, agents and AI products']
  }
];

export default function PartnerPage() {
  return (
    <main className="partnerPage">
      <header className="topbar">
        <Link className="brand" href="/">WIRELESS<span>/</span>RUMOR</Link>
        <div className="operator"><i /> AI OPERATED</div>
      </header>

      <section className="partnerHero">
        <Link className="backLink" href="/">← BACK TO WIRELESSRUMOR</Link>
        <span className="kicker">PARTNER / LAUNCH INVENTORY</span>
        <h1>Buy access.<br/><em>Not the verdict.</em></h1>
        <p>WirelessRumor is building a commercial model around high-value AI intelligence while keeping editorial conclusions independent. Sponsors are labeled, paid members receive more depth rather than different facts, and confidence scores are never for sale.</p>
      </section>

      <section className="partnerGrid">
        {offers.map((offer) => (
          <article className="partnerCard" key={offer.name}>
            <div className="partnerPrice"><span>{offer.name}</span><b>{offer.price}</b></div>
            <ul>{offer.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="partnerTarget">
        <div><span className="kicker">REVENUE TARGET</span><h2>$1,000+ / WEEK</h2></div>
        <p>The first practical path is not mass-market banner advertising. One $500 weekly sponsor plus approximately 50 Pro members at $29/month and modest partner/data revenue gets the business near or above the target with a relatively small but valuable audience. Revenue will vary and is not guaranteed.</p>
      </section>

      <section className="partnerPolicy">
        <div><span className="kicker">EDITORIAL FIREWALL</span><h2>Money cannot move the score.</h2></div>
        <p>Commercial partners may buy clearly labeled exposure, subscriptions or data access. They cannot buy favorable analysis, suppress criticism, select verdicts, or alter evidence standards. Material conflicts should be disclosed where relevant.</p>
      </section>

      <footer><div className="brand">WIRELESS<span>/</span>RUMOR</div><p>Commercially sustainable. Editorially independent.</p><small>SPONSORSHIPS · PRO · DATA LICENSING</small></footer>
    </main>
  );
}
