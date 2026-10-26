'use client';

import { useEffect, useState } from 'react';

type Provider = {id:string;name:string;configured:boolean};
type Reply = {provider:string;model:string;answer?:string;error?:string};

export default function LiveRoundtable() {
  const [providers,setProviders]=useState<Provider[]>([]);
  const [enabled,setEnabled]=useState(false);
  const [question,setQuestion]=useState('');
  const [results,setResults]=useState<Reply[]>([]);
  const [pending,setPending]=useState(false);
  const [error,setError]=useState('');
  useEffect(()=>{
    fetch('/api/roundtable',{cache:'no-store'}).then(r=>r.json()).then(d=>{
      setProviders(d.providers || []);setEnabled(Boolean(d.enabled));
    }).catch(()=>setError('Roundtable status could not be loaded.'));
  },[]);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();if(pending)return;
    setPending(true);setResults([]);setError('');
    try {
      const res=await fetch('/api/roundtable',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})});
      const data=await res.json();
      if(!res.ok)throw new Error(data.error || 'Roundtable unavailable');
      setResults(data.replies || []);
    }catch(err){setError(err instanceof Error?err.message:'Request failed');}
    finally{setPending(false);}
  }
  const active=providers.filter(p=>p.configured).length;
  return <section className="deepConclusion" id="live-roundtable">
    <span className="kicker">LIVE MULTI-MODEL ROUNDTABLE / BETA</span>
    <h2>Independent models. Same question.</h2>
    <p>Claude, Gemini, Grok and Mistral are independently queried only when their provider connections and publishing controls are enabled. Results identify the provider and model; they are not presented as verified facts. Astra remains separate.</p>
    <p>{providers.map(p=>p.name+' — '+(p.configured?'connected':'not connected')).join(' · ') || 'Checking connections…'}</p>
    {!enabled && <p role="status">Live cross-provider requests are not yet activated. The editorial Roundtable below remains available.</p>}
    {enabled && active < 2 && <p role="status">At least two independent providers must be connected before the live Roundtable can run.</p>}
    <form onSubmit={submit} style={{display:'flex',flexWrap:'wrap',gap:12,marginTop:20}}>
      <input aria-label="Roundtable question" value={question} onChange={e=>setQuestion(e.target.value)} maxLength={1000} placeholder="Ask every model the same question…" style={{flex:'1 1 280px',padding:14}}/>
      <button type="submit" disabled={!enabled || active<2 || pending || question.trim().length<5}>{pending?'COMPARE IN PROGRESS…':'COMPARE AI RESPONSES'}</button>
    </form>
    {error && <p role="alert">{error}</p>}
    <div className="comparisonGrid" style={{marginTop:24}}>{results.map(r=><article key={r.provider}><small>{r.provider.toUpperCase()} / {r.model}</small><p style={{whiteSpace:'pre-wrap'}}>{r.answer || r.error}</p></article>)}</div>
    {results.length>0 && <p>These are independent first-round responses, not a consensus or fact check. Verify important claims against primary sources.</p>}
  </section>;
}
