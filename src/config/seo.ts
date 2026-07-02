// src/config/seo.ts - Fully typed with TypeScript
import { SITE_TITLE, SITE_DESCRIPTION } from './site';
import type { SEOConfig } from './interfaces/seo';

// Base SEO configuration without client-side environment variables
const baseSEOConfig: SEOConfig = {
  defaultTitle: `${SITE_TITLE}`, // SITE_TITLE comes from site.ts (which reads from PUBLIC_SITE_TITLE)
  defaultDescription: SITE_DESCRIPTION,
  keywords: [
    'Javascript Developer',
    'Web Developer',
    'Frontend Engineer',
    'React Developer',
    'Frontend Developer',
    'Personal Portfolio',
    'Astro Dev',
    'CSS Developer',
    'JavaScript Developer'
  ],
  openGraph: {
    'og:title': `${SITE_TITLE}`,
    'og:description': SITE_DESCRIPTION,
    'og:image': '/images/OpenClaw-og-image.jpg', // Should be updated by the user
    'og:url': 'https://yourwebsite.com', // This will be configured via .env (PUBLIC_SITE_URL)
    'og:type': 'website'
  },
  twitter: {
    'twitter:title': `${SITE_TITLE}`,
    'twitter:description': SITE_DESCRIPTION,
    'twitter:image': '/images/OpenClaw-og-image.jpg',
    'twitter:url': 'https://yourwebsite.com',
    'twitter:card': 'summary_large_image',
    'twitter:site': '@yourTwitterHandle' // Update with the actual handle
  },
  feedOptions: {
    title: `${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    feedUrl: 'https://yourwebsite.com/feed.xml',
    siteUrl: 'https://yourwebsite.com',
    language: 'en'
  }
};

// Export the Typed Configuration
export const SEO_CONFIG: SEOConfig = baseSEOConfig;

export default SEO_CONFIG;