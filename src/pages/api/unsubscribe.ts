import type { APIRoute } from 'astro';
import { json, sql } from '../../lib/newsletter';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get('token');
  if (!token || token.length > 100) return json({ error: 'Invalid unsubscribe link.' }, 400);

  try {
    const [updated] = await sql`
      UPDATE newsletter_subscribers
      SET unsubscribed_at = now(), updated_at = now()
      WHERE unsubscribe_token = ${token} AND unsubscribed_at IS NULL
      RETURNING id
    `;

    return new Response(
      updated ? 'You have been unsubscribed.' : 'This link is invalid or already used.',
      { status: updated ? 200 : 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  } catch (error) {
    console.error('Newsletter unsubscribe failed:', error);
    return json({ error: 'Unable to unsubscribe right now.' }, 500);
  }
};