import type { APIRoute } from 'astro';
import { escapeHtml, isNewsletterConfigured, json, newsletterFrom, resend, reserveEmailQuota, siteUrl, sql } from '../../lib/newsletter';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!isNewsletterConfigured() || !process.env.NEWSLETTER_NOTIFY_SECRET) return json({ error: 'Newsletter is not configured.' }, 503);

  const authorization = request.headers.get('authorization');
  if (authorization !== `Bearer ${process.env.NEWSLETTER_NOTIFY_SECRET}`) return json({ error: 'Unauthorized.' }, 401);

  try {
    const { slug, title, url } = await request.json();
    if (typeof slug !== 'string' || typeof title !== 'string' || typeof url !== 'string') {
      return json({ error: 'slug, title, and url are required.' }, 400);
    }

    const [notification] = await sql`
      INSERT INTO newsletter_notifications (slug, title, url)
      VALUES (${slug}, ${title}, ${url})
      ON CONFLICT (slug) DO NOTHING
      RETURNING id
    `;

    if (!notification) return json({ ok: true, sent: 0, duplicate: true });

    const subscribers = await sql`
      SELECT email, unsubscribe_token
      FROM newsletter_subscribers
      WHERE unsubscribed_at IS NULL
    `;

    if (!(await reserveEmailQuota(subscribers.length))) {
      return json({ error: 'Newsletter email limit reached. Notification was not sent.' }, 429);
    }

    const results = await Promise.all(
      subscribers.map((subscriber) =>
        resend.emails.send({
          from: newsletterFrom,
          to: subscriber.email,
          subject: `New article: ${title}`,
          html: `<p>A new article has been published on Manoj's blog:</p><h2>${escapeHtml(title)}</h2><p><a href="${escapeHtml(url)}">Read the new article</a></p><p><a href="${siteUrl}/api/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribe_token)}">Unsubscribe</a></p>`,
        }),
      ),
    );

    const failed = results.filter((result) => result.error).length;
    if (failed > 0) console.error('Resend blog notification failures:', results.filter((result) => result.error));
    return json({ ok: failed === 0, sent: results.length - failed, failed });
  } catch (error) {
    console.error('New post notification failed:', error);
    return json({ error: 'Unable to send the notification.' }, 500);
  }
};