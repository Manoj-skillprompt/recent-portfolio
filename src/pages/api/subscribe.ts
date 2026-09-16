import type { APIRoute } from 'astro';
import { escapeHtml, getEmail, isNewsletterConfigured, json, newsletterFrom, resend, siteUrl, sql } from '../../lib/newsletter';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!isNewsletterConfigured()) return json({ error: 'Newsletter is not configured.' }, 503);

  const contentType = request.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await request.json() : await request.formData();
  const email = getEmail(body instanceof FormData ? body.get('email') : body.email);

  if (!email) return json({ error: 'Please provide a valid email address.' }, 400);

  try {
    const [subscriber] = await sql`
      INSERT INTO newsletter_subscribers (email, unsubscribe_token)
      VALUES (${email}, gen_random_uuid()::text)
      ON CONFLICT (email) DO UPDATE SET
        unsubscribe_token = gen_random_uuid()::text,
        unsubscribed_at = NULL,
        updated_at = now()
      RETURNING unsubscribe_token
    `;

    const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribe_token)}`;
    const result = await resend.emails.send({
      from: newsletterFrom,
      to: email,
      subject: 'Thanks for subscribing',
      html: `<p>Thanks for subscribing to Manoj's newsletter.</p><p>I'll email you when a new article is published.</p><p><a href="${unsubscribeUrl}">Unsubscribe</a></p>`,
    });

    if (result.error) return json({ error: 'The confirmation email could not be sent.' }, 502);
    return json({ ok: true });
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return json({ error: 'Unable to subscribe right now.' }, 500);
  }
};