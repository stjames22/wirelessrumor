'use client';
import { useEffect, useState } from 'react';
export default function CommunityStatus() {
  const [status, setStatus] = useState('Checking discussion availability…');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/discussions', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]), cache: 'no-store' })
      .then(async response => {
        const data = await response.json();
        setStatus(response.ok && data.shared ? 'Public room connected · Posts are shared with other visitors.' : 'Public room unavailable · Check Astra availability on the discussion page.');
      }).catch(() => { if (!controller.signal.aborted) setStatus('Discussion status unavailable. Check again on the discussion page.'); });
    return () => controller.abort();
  }, []);
  return <p className="communityStatus" role="status">{status}</p>;
}
