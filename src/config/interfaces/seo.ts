// src/config/interfaces/seo.ts
import { SiteConfig } from './site';

export interface OpenGraphConfig {
    'og:title': string;
    'og:description': string;
    'og:image': string;
    'og:url': string;
    'og:type': string;
}

export interface TwitterConfig {
    'twitter:title': string;
    'twitter:description': string;
    'twitter:image': string;
    'twitter:url': string;
    'twitter:card': string;
    'twitter:site': string;
}

export interface FeedOptions {
    title: string;
    description: string;
    feedUrl: string;
    siteUrl: string;
    language: string;
}

export interface SEOConfig {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    openGraph: OpenGraphConfig;
    twitter: TwitterConfig;
    feedOptions: FeedOptions;
}