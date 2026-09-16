import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const before = process.env.GITHUB_BEFORE;
const after = process.env.GITHUB_AFTER;
const siteUrl = process.env.SITE_URL?.replace(/\/$/, '');
const secret = process.env.NEWSLETTER_NOTIFY_SECRET;

if (!before || !after || !siteUrl || !secret) {
  throw new Error('GITHUB_BEFORE, GITHUB_AFTER, SITE_URL, and NEWSLETTER_NOTIFY_SECRET are required.');
}

const files = execFileSync('git', ['diff', '--diff-filter=A', '--name-only', before, after], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter((file) => file.startsWith('src/content/blog/') && /\.mdx?$/.test(file));

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const title = source.match(/^title:\s*(.+?)\s*$/m)?.[1]?.trim().replace(/^("|')|("|')$/g, '');
  if (!title) throw new Error(`No title found in ${file}.`);

  const slug = file.split('/').pop().replace(/\.mdx?$/, '');
  const response = await fetch(`${siteUrl}/api/notify-new-post`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug, title, url: `${siteUrl}/blog/${slug}/` }),
  });

  if (!response.ok) throw new Error(`Newsletter notification failed for ${slug}: ${await response.text()}`);
  console.log(`Newsletter notification processed for ${slug}.`);
}

if (files.length === 0) console.log('No new blog posts found.');