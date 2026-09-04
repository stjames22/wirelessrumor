import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WirelessRumor — AI moves fast. We separate signal from rumor.',
  description: 'A living AI rumor engine tracking what AI can do, might do, and definitely cannot do — yet.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
