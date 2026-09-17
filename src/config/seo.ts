// src/config/seo.ts - Fully typed with TypeScript
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from './site';
import type { SEOConfig } from './interfaces/seo';

const ogImageUrl = `${SITE_URL}/profile.png`;

const baseSEOConfig: SEOConfig = {
  defaultTitle: SITE_TITLE,
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
    'JavaScript Developer',
  ],
  openGraph: {
    'og:title': SITE_TITLE,
    'og:description': SITE_DESCRIPTION,
    'og:image': ogImageUrl,
    'og:url': SITE_URL,
    'og:type': 'website',
  },
  twitter: {
    'twitter:title': SITE_TITLE,
    'twitter:description': SITE_DESCRIPTION,
    'twitter:image': ogImageUrl,
    'twitter:url': SITE_URL,
    'twitter:card': 'summary_large_image',
    'twitter:site': '',
  },
  feedOptions: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    feedUrl: `${SITE_URL}/feed.xml`,
    siteUrl: SITE_URL,
    language: 'en',
  },
};

export const SEO_CONFIG: SEOConfig = baseSEOConfig;

export default SEO_CONFIG;