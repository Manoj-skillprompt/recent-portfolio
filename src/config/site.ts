// src/config/site.ts - TypeScript version with type safety
import type { SiteConfig } from './interfaces/site';

export const SITE_TITLE: string = import.meta.env.PUBLIC_SITE_TITLE || 'Your Awesome Portfolio';
export const SITE_DESCRIPTION: string = import.meta.env.PUBLIC_SITE_DESCRIPTION || 'A professional portfolio for developers';

export const SITE_CONFIG: SiteConfig = {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
};

export default SITE_CONFIG;