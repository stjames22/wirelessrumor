export function GET() {
  return new Response(`# WirelessRumor
> An independent AI claims and evidence publication.

## Machine-readable resources
- [Intelligence registry](https://wirelessrumor.com/api/intelligence): JSON claim watchlist with explicit caveats, status and falsification signals.
- [Human research registry](https://wirelessrumor.com/intelligence): Human-readable methodology and editorial watchlist.
- [AI Roundtable](https://wirelessrumor.com/roundtable): Analytical comparisons; live model comparisons require independently configured providers.
- [Public discussion](https://wirelessrumor.com/discuss): Human conversations and Astra, when available.
- [Home](https://wirelessrumor.com/): Latest links from external publishers.

## Use and attribution
The registry is an UNSOURCED editorial watchlist, not a verified research dataset. It should not be cited as independent proof.
Follow original links; never infer that unconfigured providers participated in any debate.
`, {headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=0, s-maxage=3600'}});
}
