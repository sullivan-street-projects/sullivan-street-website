#!/usr/bin/env node
// Google Search Console CLI — zero-dependency service-account client.
//
// One-time setup (human, ~10 min):
//   1. console.cloud.google.com → New project (any name, e.g. "ssp-search")
//   2. APIs & Services → Library → "Google Search Console API" → Enable
//   3. IAM & Admin → Service Accounts → Create (name e.g. "gsc-agent",
//      no IAM roles needed — permissions are granted inside GSC, step 5)
//   4. The new service account → Keys → Add key → Create new key → JSON
//      → move the downloaded file to ~/.secrets/ssp-gsc-sa.json
//   5. search.google.com/search-console → Settings → Users and permissions
//      → Add user → the service account email (…@….iam.gserviceaccount.com)
//      → Permission: Full
//
// Usage:
//   node scripts/gsc.mjs sites                      list accessible properties
//   node scripts/gsc.mjs perf [days] [--by query|page|date]   search analytics
//   node scripts/gsc.mjs inspect <url>              index status of one URL
//   node scripts/gsc.mjs sitemaps                   sitemap status
//   node scripts/gsc.mjs sitemap-submit [url]       (re)submit the sitemap
//
// Env overrides: GSC_SA_KEY (key path), GSC_SITE (property, e.g.
// "sc-domain:sullivanstreetprojects.com" or "https://sullivanstreetprojects.com/").
import { readFileSync, existsSync } from 'node:fs';
import { createSign } from 'node:crypto';

const KEY_PATH = process.env.GSC_SA_KEY || `${process.env.HOME}/.secrets/ssp-gsc-sa.json`;
const SITE_HINT = 'sullivanstreetprojects';
const DEFAULT_SITEMAP = 'https://sullivanstreetprojects.com/sitemap-index.xml';

const [cmd = 'help', ...args] = process.argv.slice(2);

if (cmd === 'help' || cmd === '--help') {
  console.log(
    readFileSync(new URL(import.meta.url), 'utf-8')
      .split('\n')
      .slice(1, 27)
      .map((l) => l.replace(/^\/\/ ?/, ''))
      .join('\n'),
  );
  process.exit(0);
}

if (!existsSync(KEY_PATH)) {
  console.error(`No service-account key at ${KEY_PATH}.`);
  console.error('Run `node scripts/gsc.mjs help` for the one-time setup steps,');
  console.error('or point GSC_SA_KEY at the JSON key file.');
  process.exit(1);
}

const key = JSON.parse(readFileSync(KEY_PATH, 'utf-8'));

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) +
    '.' +
    b64url(
      JSON.stringify({
        iss: key.client_email,
        scope: 'https://www.googleapis.com/auth/webmasters',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      }),
    );
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed (${res.status}): ${await res.text()}`);
  return (await res.json()).access_token;
}

const token = await accessToken();

async function api(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok)
    throw new Error(`${options.method || 'GET'} ${url} → ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

async function resolveSite() {
  if (process.env.GSC_SITE) return process.env.GSC_SITE;
  const { siteEntry = [] } = await api('https://www.googleapis.com/webmasters/v3/sites');
  const match = siteEntry.find((s) => s.siteUrl.includes(SITE_HINT));
  if (!match) {
    console.error('Service account sees no matching property. Properties visible:');
    siteEntry.forEach((s) => console.error(`  ${s.siteUrl} (${s.permissionLevel})`));
    console.error('→ Add the service account as a user on the property in GSC Settings.');
    process.exit(1);
  }
  return match.siteUrl;
}

if (cmd === 'sites') {
  const { siteEntry = [] } = await api('https://www.googleapis.com/webmasters/v3/sites');
  if (!siteEntry.length) console.log('No properties visible to this service account yet.');
  siteEntry.forEach((s) => console.log(`${s.siteUrl}\t${s.permissionLevel}`));
} else if (cmd === 'perf') {
  const site = await resolveSite();
  const days = Number(args.find((a) => /^\d+$/.test(a)) || 28);
  const by = args.includes('--by') ? args[args.indexOf('--by') + 1] : 'query';
  const end = new Date(Date.now() - 2 * 86400e3).toISOString().slice(0, 10); // GSC data lags ~2 days
  const start = new Date(Date.now() - (days + 2) * 86400e3).toISOString().slice(0, 10);
  const data = await api(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    {
      method: 'POST',
      body: JSON.stringify({ startDate: start, endDate: end, dimensions: [by], rowLimit: 20 }),
    },
  );
  console.log(`${site} — last ${days}d by ${by} (${start} → ${end})`);
  if (!data.rows?.length) {
    console.log('(no rows)');
  } else {
    console.log('clicks\timpr\tctr\tpos\tkey');
    data.rows.forEach((r) =>
      console.log(
        `${r.clicks}\t${r.impressions}\t${(r.ctr * 100).toFixed(1)}%\t${r.position.toFixed(1)}\t${r.keys[0]}`,
      ),
    );
  }
} else if (cmd === 'inspect') {
  const site = await resolveSite();
  const url = args[0];
  if (!url) throw new Error('Usage: gsc.mjs inspect <full-url>');
  const { inspectionResult: r } = await api(
    'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
    {
      method: 'POST',
      body: JSON.stringify({ inspectionUrl: url, siteUrl: site }),
    },
  );
  const idx = r.indexStatusResult || {};
  console.log(`verdict:      ${idx.verdict}`);
  console.log(`coverage:     ${idx.coverageState}`);
  console.log(`last crawl:   ${idx.lastCrawlTime || 'never'}`);
  console.log(`google canon: ${idx.googleCanonical || '—'}`);
  console.log(`user canon:   ${idx.userCanonical || '—'}`);
  console.log(`sitemaps:     ${(idx.sitemap || []).join(', ') || '—'}`);
  console.log(`report:       ${r.inspectionResultLink}`);
} else if (cmd === 'sitemaps') {
  const site = await resolveSite();
  const { sitemap = [] } = await api(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps`,
  );
  if (!sitemap.length) console.log('No sitemaps submitted for this property.');
  sitemap.forEach((m) => {
    const c = (m.contents || [])
      .map((x) => `${x.type}: ${x.submitted} submitted / ${x.indexed ?? '?'} indexed`)
      .join('; ');
    console.log(
      `${m.path}\n  lastSubmitted: ${m.lastSubmitted}  lastDownloaded: ${m.lastDownloaded || '—'}  errors: ${m.errors} warnings: ${m.warnings}\n  ${c}`,
    );
  });
} else if (cmd === 'sitemap-submit') {
  const site = await resolveSite();
  const feed = args[0] || DEFAULT_SITEMAP;
  await api(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(feed)}`,
    { method: 'PUT' },
  );
  console.log(`Submitted: ${feed} → ${site}`);
} else {
  console.error(`Unknown command: ${cmd}. Run \`node scripts/gsc.mjs help\`.`);
  process.exit(1);
}
