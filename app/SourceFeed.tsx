import { readSourceFeed } from '../lib/source-feed';

export default async function SourceFeed() {
  const { items, unavailable } = await readSourceFeed();
  return <section className="section" id="latest">
    <div className="sectionHead"><div><span className="kicker">FROM THE SOURCE</span><h2>LATEST DISPATCHES</h2></div>
      <p>Headlines from OpenAI and Google AI, with publisher dates. Company announcements reflect the publisher’s claims; they are not independent verification. Feeds refresh on visits, at most once an hour.</p></div>
    {unavailable.length > 0 && <p role="status">Temporarily unable to load: {unavailable.join(', ')}. Available source links remain below.</p>}
    {!items.length && <p>No source headlines are available right now. Please try again later.</p>}
    <div className="dispatchGrid">{items.map(item => <article className="dispatch" key={item.url}>
      <div><span>{item.source}</span><time dateTime={item.publishedAt}>{new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time></div>
      <h3><a href={item.url} target="_blank" rel="noreferrer">{item.title} ↗</a></h3>
      <a className="discussLink" href={`/discuss?topic=${encodeURIComponent(`${item.title}\n${item.url}`)}`}>Discuss this source →</a>
    </article>)}</div>
  </section>;
}
