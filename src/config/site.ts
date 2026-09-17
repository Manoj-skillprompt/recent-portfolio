// src/config/site.ts - TypeScript version with type safety
import type { SiteConfig } from './interfaces/site';

export const SITE_URL = (import.meta.env.SITE_URL ?? import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
export const SITE_TITLE = 'Manoj Chaudhary | Software Developer';
export const SITE_DESCRIPTION = "Hey there, I'm Manoj Chaudhary — a software developer and tech enthusiast based in Butwal, Nepal.";

export const SITE_CONFIG: SiteConfig = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default SITE_CONFIG;