import { Fragment } from 'react';

type Citation = { start: number; end: number; url: string; title: string };
export default function AnswerText({ text, citations = [] }: { text: string; citations?: Citation[] }) {
  const spans = [];
  let offset = 0;
  for (const citation of [...citations].sort((a, b) => a.start - b.start)) {
    if (!/^https?:\/\//.test(citation.url) || citation.start < offset || citation.end <= citation.start || citation.end > text.length) continue;
    spans.push(<Fragment key={`${citation.start}-${citation.end}`}>{text.slice(offset, citation.start)}<a href={citation.url} target="_blank" rel="noreferrer" title={citation.title}>{text.slice(citation.start, citation.end)}</a></Fragment>);
    offset = citation.end;
  }
  return <>{spans}{text.slice(offset)}</>;
}
