import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

export const sql = neon(process.env.DATABASE_URL ?? '');
export const resend = new Resend(process.env.RESEND_API_KEY);

export const newsletterFrom = process.env.NEWSLETTER_FROM_EMAIL ?? 'Newsletter <onboarding@resend.dev>';
export const siteUrl = (process.env.SITE_URL ?? 'http://localhost:4321').replace(/\/$/, '');

export function isNewsletterConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.RESEND_API_KEY && process.env.NEWSLETTER_FROM_EMAIL);
}

export function getEmail(value: FormDataEntryValue | string | null) {
  if (typeof value !== 'string') return null;

  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character,
  );
}