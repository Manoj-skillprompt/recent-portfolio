import type { APIRoute } from 'astro';
import {
  allowRequest,
  escapeHtml,
  getEmail,
  isNewsletterConfigured,
  json,
  newsletterFrom,
  resend,
  reserveEmailQuota,
  siteUrl,
  sql,
} from '../../lib/newsletter';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!isNewsletterConfigured()) return json({ error: 'Newsletter is not configured.' }, 503);

  const contentType = request.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await request.json() : await request.formData();
  const email = getEmail(body instanceof FormData ? body.get('email') : body.email);

  if (!email) return json({ error: 'Please provide a valid email address.' }, 400);

  try {
    const [existingSubscriber] = await sql`
      SELECT id
      FROM newsletter_subscribers
      WHERE email = ${email}
      LIMIT 1
    `;

    if (existingSubscriber) return json({ ok: true, alreadySubscribed: true });

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const [emailAllowed, ipAllowed] = await Promise.all([
      allowRequest(`email:${email}`, 3, 60 * 24),
      allowRequest(`ip:${ip}`, 10, 60),
    ]);

    if (!emailAllowed || !ipAllowed) return json({ error: 'Too many subscription attempts. Please try again later.' }, 429);
    if (!(await reserveEmailQuota(1))) return json({ error: 'Newsletter email limit reached. Please try again later.' }, 429);

    const [subscriber] = await sql`
      INSERT INTO newsletter_subscribers (email, unsubscribe_token)
      VALUES (${email}, gen_random_uuid()::text)
      ON CONFLICT (email) DO NOTHING
      RETURNING unsubscribe_token
    `;

    if (!subscriber) return json({ ok: true, alreadySubscribed: true });

    const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribe_token)}`;
    const result = await resend.emails.send({
      from: newsletterFrom,
      to: email,
      subject: 'Thanks for subscribing',
      text: `Hi there,\n\nThanks for subscribing to newsletter.\n\nI will send you practical notes, useful discoveries, and new articles when they are published. I will keep it focused and occasional.\n\nRead the latest articles: ${siteUrl}/blog/\n\nUnsubscribe: ${unsubscribeUrl}\n`,
      html: `
        <!doctype html>
        <html lang="en">
          <body style="margin:0;background:#f4f7f5;color:#17231d;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">
            <div style="padding:32px 16px;">
              <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dce8e0;border-radius:16px;overflow:hidden;">
                <div style="padding:34px 36px;background:#10251c;color:#ffffff;">
                  <p style="margin:0 0 14px;color:#8ae3c2;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Manoj Chaudhary</p>
                  <h1 style="margin:0;font-size:30px;line-height:1.2;">You are on the list.</h1>
                </div>
                <div style="padding:36px;">
                  <p style="margin:0 0 20px;font-size:18px;">Thanks for subscribing.</p>
                  <p style="margin:0 0 18px;color:#4b5d53;">I will send you practical notes, useful discoveries, and new articles when they are published. The emails will be focused and occasional.</p>
                  <p style="margin:28px 0;">
                    <a href="${siteUrl}/blog/" style="display:inline-block;padding:13px 20px;border-radius:8px;background:#2f8f68;color:#ffffff;font-weight:bold;text-decoration:none;">Read the blog</a>
                  </p>
                  <p style="margin:0;color:#718078;font-size:13px;">You received this email because you subscribed on my website.</p>
                </div>
                <div style="padding:20px 36px;background:#f4f7f5;color:#718078;font-size:12px;">
                  <p style="margin:0;">Prefer not to receive these emails? <a href="${unsubscribeUrl}" style="color:#246f51;">Unsubscribe</a>.</p>
                </div>
              </div>
              <p style="max-width:600px;margin:18px auto 0;text-align:center;color:#8a9890;font-size:11px;">Manoj Chaudhary · Software Developer · Butwal, Nepal</p>
            </div>
          </body>
        </html>
      `,
    });

    if (result.error) {
      console.error('Resend welcome email failed:', result.error);
      return json({ error: 'The confirmation email could not be sent.' }, 502);
    }
    return json({ ok: true });
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return json({ error: 'Unable to subscribe right now.' }, 500);
  }
};