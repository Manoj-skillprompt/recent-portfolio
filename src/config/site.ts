// src/config/site.ts - TypeScript version with type safety
import type { SiteConfig } from './interfaces/site';

export const SITE_URL = (import.meta.env.SITE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
export const SITE_TITLE = 'Manoj Chaudhary - portfolio';
export const SITE_DESCRIPTION = 'Welcome to my digital world, where I turn ideas into world-class products.';

export const SITE_CONFIG: SiteConfig = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default SITE_CONFIG;