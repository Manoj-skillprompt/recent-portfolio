import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const before = process.env.GITHUB_BEFORE;
const after = process.env.GITHUB_AFTER ?? 'HEAD';
const siteUrl = process.env.SITE_URL?.replace(/\/$/, '');
const secret = process.env.NEWSLETTER_NOTIFY_SECRET;

if (!siteUrl || !secret) {
  throw new Error('SITE_URL and NEWSLETTER_NOTIFY_SECRET are required.');
}

async function waitForDeployment(url) {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    const response = await fetch(url, { redirect: 'follow' });
    if (response.ok) return;

    console.log(`Waiting for Vercel deployment (${attempt}/30): ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }

  throw new Error(`Vercel deployment did not make ${url} available in time.`);
}

const baseRevision = before && !/^0+$/.test(before) ? before : 'HEAD^';
const files = execFileSync('git', ['diff', '--diff-filter=A', '--name-only', baseRevision, after], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter((file) => file.startsWith('src/content/blog/') && /\.mdx?$/.test(file));

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const title = source.match(/^title:\s*(.+?)\s*$/m)?.[1]?.trim().replace(/^("|')|("|')$/g, '');
  if (!title) throw new Error(`No title found in ${file}.`);

  const slug = file.split('/').pop().replace(/\.mdx?$/, '');
  await waitForDeployment(`${siteUrl}/blog/${slug}/`);
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