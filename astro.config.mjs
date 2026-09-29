// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.manojkumarchaudhary23.com.np',
  integrations: [
    react(),
    mdx(),
    sitemap({
      customPages: ['https://www.manojkumarchaudhary23.com.np/', 'https://www.manojkumarchaudhary23.com.np/blog/'],
    }),
  ],
  output: 'server',
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});