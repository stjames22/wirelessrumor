import type { MetadataRoute } from 'next';
import { rumors } from '../lib/rumors';

const origin = 'https://wirelessrumor.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: origin, changeFrequency: 'daily', priority: 1 },
    { url: `${origin}/discuss`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${origin}/roundtable`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${origin}/geopolitics`, changeFrequency: 'weekly', priority: 0.8 },
    ...rumors.map((rumor) => ({
      url: `${origin}/rumor/${rumor.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
