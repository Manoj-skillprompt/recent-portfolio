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
      subscribers.map((subscriber) => {
        const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribe_token)}`;
        const articleUrl = /^https?:\/\//.test(url) ? url : `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`;

        return resend.emails.send({
          from: newsletterFrom,
          to: subscriber.email,
          subject: `New article: ${title}`,
          text: `New from Manoj\n\n${title}\n\nA new article is live on the blog, with practical ideas and lessons you can use in your own work.\n\nRead the article: ${articleUrl}\n\nThanks for being here. I'll send occasional notes when something new is worth sharing.\n\nYou received this because you subscribed on my website. Unsubscribe: ${unsubscribeUrl}\n\nManoj Chaudhary · Software Developer · Butwal, Nepal`,
          html: `
            <!doctype html>
            <html lang="en">
              <body style="margin:0;background:#f4f7f5;color:#17231d;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">
                <div style="padding:32px 16px;">
                  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dce8e0;border-radius:16px;overflow:hidden;">
                    <div style="padding:36px 36px 18px 36px; background:#fff; color:#17231d;">
                      <p style="margin:0 0 18px;color:#2f8f68;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">NEW FROM MANOJ</p>
                      <h1 style="margin:0;font-size:52px;line-height:0.98;font-weight:800;letter-spacing:-1.2px;color:#17231d;max-width:520px;">${escapeHtml(title)}</h1>
                    </div>
                    <div style="padding:0 36px 36px 36px;">
                      <p style="margin:0 0 28px;font-size:18px;line-height:1.5;color:#3d4d46;max-width:540px;">A new article is live on the blog, with practical ideas and lessons you can use in your own work.</p>

                      <p style="margin:0 0 36px;">
                        <a href="${escapeHtml(articleUrl)}" style="display:inline-block;padding:18px 26px;border-radius:12px;background:#2f8f68;color:#ffffff;font-weight:700;text-decoration:none;font-size:22px;line-height:1;">Read the article →</a>
                      </p>

                      <p style="margin:0 0 0;color:#3d4d46;font-size:18px;line-height:1.5;max-width:560px;">Thanks for being here. I'll send occasional notes when something new is worth sharing.</p>
                    </div>

                    <div style="padding:20px 36px 22px 36px;">
                      <p style="margin:0;color:#4b5d53;font-size:18px;line-height:1.5;">You received this because you subscribed on my website. <a href="${unsubscribeUrl}" style="color:#2f8f68;text-decoration:underline;">Unsubscribe</a>.</p>
                    </div>

                    <div style="padding:30px 36px 30px 36px;border-top:1px solid #e4ece6;">
                      <p style="margin:0;color:#5b6a62;font-size:18px;line-height:1.5;">Manoj Chaudhary · Software Developer · Butwal, Nepal</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });
      }),
    );

    const failed = results.filter((result) => result.error).length;
    if (failed > 0) console.error('Resend blog notification failures:', results.filter((result) => result.error));
    return json({ ok: failed === 0, sent: results.length - failed, failed });
  } catch (error) {
    console.error('New post notification failed:', error);
    return json({ error: 'Unable to send the notification.' }, 500);
  }
};