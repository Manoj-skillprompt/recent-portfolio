import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

export const sql = neon(process.env.DATABASE_URL ?? '');
export const resend = new Resend(process.env.RESEND_API_KEY);

export const newsletterFrom = process.env.NEWSLETTER_FROM_EMAIL ?? 'Newsletter <onboarding@resend.dev>';
export const siteUrl = (process.env.SITE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
export const dailyEmailLimit = Number(process.env.NEWSLETTER_DAILY_EMAIL_LIMIT ?? 90);
export const monthlyEmailLimit = Number(process.env.NEWSLETTER_MONTHLY_EMAIL_LIMIT ?? 2500);

export function isNewsletterConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.RESEND_API_KEY && process.env.NEWSLETTER_FROM_EMAIL);
}

export async function reserveEmailQuota(amount: number) {
  if (!Number.isInteger(amount) || amount < 1 || amount > monthlyEmailLimit) return false;

  const [reserved] = await sql`
    WITH monthly AS (
      INSERT INTO newsletter_email_usage (period, period_start, sent_count)
      VALUES ('month', date_trunc('month', current_date)::date, ${amount})
      ON CONFLICT (period, period_start) DO UPDATE
      SET sent_count = newsletter_email_usage.sent_count + ${amount}
      WHERE newsletter_email_usage.sent_count + ${amount} <= ${monthlyEmailLimit}
      RETURNING 1
    )
    INSERT INTO newsletter_email_usage (period, period_start, sent_count)
    SELECT 'day', current_date, ${amount}
    FROM monthly
    ON CONFLICT (period, period_start) DO UPDATE
    SET sent_count = newsletter_email_usage.sent_count + ${amount}
    WHERE newsletter_email_usage.sent_count + ${amount} <= ${dailyEmailLimit}
    RETURNING 1
  `;

  return Boolean(reserved);
}

export async function allowRequest(rateKey: string, maxRequests: number, windowMinutes: number) {
  const [allowed] = await sql`
    INSERT INTO newsletter_rate_limits (rate_key, window_start, request_count)
    VALUES (${rateKey}, now(), 1)
    ON CONFLICT (rate_key) DO UPDATE
    SET
      window_start = CASE
        WHEN newsletter_rate_limits.window_start <= now() - make_interval(mins => ${windowMinutes}) THEN now()
        ELSE newsletter_rate_limits.window_start
      END,
      request_count = CASE
        WHEN newsletter_rate_limits.window_start <= now() - make_interval(mins => ${windowMinutes}) THEN 1
        ELSE newsletter_rate_limits.request_count + 1
      END
    WHERE newsletter_rate_limits.window_start <= now() - make_interval(mins => ${windowMinutes})
      OR newsletter_rate_limits.request_count < ${maxRequests}
    RETURNING request_count
  `;

  return Boolean(allowed);
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