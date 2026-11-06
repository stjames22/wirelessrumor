import './globals.css';
import './deep.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://wirelessrumor.com'),
  title: 'WirelessRumor — AI moves fast. We separate signal from rumor.',
  description: 'Independent AI intelligence, sourced analysis, public debate and AI claim checks.',
  openGraph: {type:'website',siteName:'WirelessRumor',title:'WirelessRumor — Know What Matters in AI',description:'Sourced AI intelligence, claims and debate.',url:'https://wirelessrumor.com',images:[{url:'/opengraph-image',width:1200,height:630,alt:'WirelessRumor AI intelligence'}]},
  twitter: {card:'summary_large_image',title:'WirelessRumor — Know What Matters in AI',images:['/opengraph-image']}
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
