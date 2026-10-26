import Link from 'next/link';

export const metadata = {title:'AI Visibility Lab | WirelessRumor',description:'Evidence-backed website discovery and AI citation guidance with official sources and measurable KPIs.'};

const practices = [
 {n:'01',title:'Make important pages indexable',body:'Google states AI Overviews and AI Mode supporting links must be indexed and eligible for a search snippet. Do not block important pages in robots.txt or with noindex.',source:'Google Search Central',url:'https://developers.google.com/search/docs/appearance/ai-features'},
 {n:'02',title:'Publish firsthand evidence, not generic rewrites',body:'Explain how a result was obtained: methods, dated observations, original tables, known limitations and links to underlying evidence. Clear structure and citations make information easier to evaluate.',source:'Bing Webmaster AI Performance guidance',url:'https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c'},
 {n:'03',title:'Allow ChatGPT search discovery',body:'OpenAI says sites should not block OAI-SearchBot if they want content eligible to appear in ChatGPT search summaries and snippets. This is eligibility, not guaranteed placement.',source:'OpenAI publisher FAQ',url:'https://help.openai.com/en/articles/12627856'},
 {n:'04',title:'Measure citations—not just rankings',body:'Bing Webmaster Tools has an AI Performance report covering citations, cited URLs and grounding-query groups across supported Microsoft AI experiences. Citation counts are not visits or rankings.',source:'Bing AI Performance documentation',url:'https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c'},
 {n:'05',title:'Avoid invented AI-specific markup requirements',body:'Google says there is no additional special schema or AI text file necessary to appear in AI Overviews or AI Mode; standard SEO fundamentals and visible, accurate structured data remain relevant.',source:'Google Search Central',url:'https://developers.google.com/search/docs/appearance/ai-features'},
];

export default function VisibilityLab(){return <main className="registryPage">
<header className="registryNav"><Link className="registryLogo" href="/">WIRELESS<span>/</span>RUMOR</Link><nav><Link href="/intelligence">Intelligence registry</Link><Link href="/">Home</Link></nav></header>
<section className="registryHero"><p className="registryKicker">AI VISIBILITY / REAL INSIGHTS + DATA</p><h1>Build a site worth <em>citing.</em></h1><p>How to make an online resource discoverable, trustworthy and useful to AI search engines. No paid-placement promises, synthetic benchmarks or magic metadata tricks.</p><div className="registryActions"><a href="#evidence">READ THE EVIDENCE ↓</a><a href="#scorecard">MEASURE THE RESULTS ↓</a></div></section>
<section className="registryStats"><div><strong>03</strong><span>OFFICIAL SEARCH SYSTEM REFERENCES</span></div><div><strong>05</strong><span>ACTIONABLE, SOURCED PRACTICES</span></div><div><strong>00</strong><span>GUARANTEED CITATION SHORTCUTS</span></div></section>
<section className="registryContent" id="evidence"><div className="registryIntro"><div><p className="registryKicker">FIELD GUIDE / ORIGINAL DOCUMENTATION</p><h2>Evidence beats “AI SEO” hype.</h2></div><p>Each recommendation below points to the search provider's own documentation. The principles are general guidance, not an experiment proving a ranking lift. We distinguish eligibility, citations, visits, and conversions.</p></div>
<div className="registryList">{practices.map(p=><article className="registryEntry" key={p.n}><div className="registryEntryHead"><span>{p.n} / VERIFIED PROVIDER GUIDANCE</span><span>PRIMARY DOCUMENTATION</span></div><h3>{p.title}</h3><p>{p.body}</p><div className="registryEntryLinks"><a target="_blank" rel="noopener noreferrer" href={p.url}>READ SOURCE: {p.source} ↗</a></div></article>)}</div>
</section>
<section className="registryContent" id="scorecard"><div className="registryIntro"><div><p className="registryKicker">MEASUREMENT / NOT MARKETING</p><h2>A real visibility scorecard.</h2></div><p>Start with a baseline, change one content category at a time, record release dates, and compare consistent periods. Correlation is not proof of causation.</p></div>
<div className="registryList">{[
['Indexed pages','Google Search Console indexing reports','How much eligible content search can find'],
['Organic impressions and clicks','Google Search Console performance','Search exposure and visits; not necessarily AI citations'],
['AI citations and cited URLs','Bing Webmaster Tools → AI Performance','Visible citations in supported Microsoft AI experiences'],
['Grounding query themes','Bing Webmaster Tools → AI Performance','The topical phrases associated with citations'],
['AI referral sessions and conversions','Your web analytics, with referral/UTM filters','Real visitors and business outcomes; may miss untracked referrals'],
].map(([metric,source,meaning])=><article className="registryEntry" key={metric}><div className="registryEntryHead"><span>{source}</span></div><h3>{metric}</h3><p>{meaning}</p></article>)}</div>
<p style={{color:'#b9c4d7',lineHeight:1.7,marginTop:30}}>No traffic or citation totals for WirelessRumor are shown here because no first-party Search Console, Bing Webmaster, or analytics report was accessed. This is a measurement framework, not fabricated performance data.</p>
</section>
<footer className="registryFoot"><strong>BE WORTH RETRIEVING.</strong><span>Publish original evidence. Make it accessible. Let independent citations earn themselves.</span></footer>
</main>}
