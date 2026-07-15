#!/usr/bin/env node
// Bing Webmaster Tools CLI — zero-dependency API-key client (mirrors gsc.mjs).
// Key: ~/.secrets/ssp-bing-key.txt (or BING_WM_KEY env). Get/rotate the key in
// Bing Webmaster Tools → gear icon → API access.
//
// Usage:
//   node scripts/bing.mjs sites               list verified sites
//   node scripts/bing.mjs perf                daily clicks/impressions (6 wk)
//   node scripts/bing.mjs queries             top search queries
//   node scripts/bing.mjs sitemaps            submitted feeds + status
//   node scripts/bing.mjs sitemap-submit [u]  submit sitemap (default index)
//   node scripts/bing.mjs quota               URL-submission quota
//
// Note: for *telling* Bing about new/changed URLs, prefer scripts/indexnow.mjs
// (runs on every deploy). This client is for reading Bing's data back.
import { readFileSync, existsSync } from 'node:fs';

const KEY_PATH = `${process.env.HOME}/.secrets/ssp-bing-key.txt`;
const KEY =
  process.env.BING_WM_KEY || (existsSync(KEY_PATH) && readFileSync(KEY_PATH, 'utf-8').trim());
const SITE = process.env.BING_SITE || 'https://sullivanstreetprojects.com/';
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';
const DEFAULT_SITEMAP = 'https://sullivanstreetprojects.com/sitemap-index.xml';

const [cmd = 'help', ...args] = process.argv.slice(2);

if (!KEY) {
  console.error(`No Bing API key at ${KEY_PATH} (and BING_WM_KEY unset).`);
  console.error('Bing Webmaster Tools → gear icon → API access → copy key.');
  process.exit(1);
}

async function get(method, params = {}) {
  const qs = new URLSearchParams({ apikey: KEY, ...params });
  const res = await fetch(`${BASE}/${method}?${qs}`);
  if (!res.ok) throw new Error(`GET ${method} → ${res.status}: ${await res.text()}`);
  return (await res.json()).d;
}

async function post(method, body) {
  const res = await fetch(`${BASE}/${method}?apikey=${KEY}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${method} → ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text).d : null;
}

// Bing serializes dates as "/Date(1718323200000)/" — unwrap to YYYY-MM-DD.
const day = (d) => new Date(Number(String(d).match(/\d+/)?.[0] ?? 0)).toISOString().slice(0, 10);

if (cmd === 'sites') {
  (await get('GetUserSites')).forEach((s) => console.log(`${s.Url}\tverified: ${s.IsVerified}`));
} else if (cmd === 'perf') {
  const rows = await get('GetRankAndTrafficStats', { siteUrl: SITE });
  console.log('date\tclicks\timpressions');
  rows.forEach((r) => console.log(`${day(r.Date)}\t${r.Clicks}\t${r.Impressions}`));
} else if (cmd === 'queries') {
  const rows = await get('GetQueryStats', { siteUrl: SITE });
  if (!rows?.length) console.log('(no query data yet)');
  else {
    console.log('clicks\timpr\tpos\tquery');
    rows
      .slice(0, 25)
      .forEach((r) =>
        console.log(`${r.Clicks}\t${r.Impressions}\t${r.AvgImpressionPosition}\t${r.Query}`),
      );
  }
} else if (cmd === 'sitemaps') {
  const feeds = await get('GetFeeds', { siteUrl: SITE });
  if (!feeds?.length) console.log('No sitemaps submitted.');
  else
    feeds.forEach((f) =>
      console.log(
        `${f.Url}\n  status: ${f.Status}  urls: ${f.UrlCount}  last crawled: ${day(f.LastCrawled)}`,
      ),
    );
} else if (cmd === 'sitemap-submit') {
  const feedUrl = args[0] || DEFAULT_SITEMAP;
  await post('SubmitFeed', { siteUrl: SITE, feedUrl });
  console.log(`Submitted: ${feedUrl} → ${SITE}`);
} else if (cmd === 'quota') {
  const q = await get('GetUrlSubmissionQuota', { siteUrl: SITE });
  console.log(`daily: ${q.DailyQuota}  monthly: ${q.MonthlyQuota}`);
} else {
  console.error('Commands: sites | perf | queries | sitemaps | sitemap-submit [url] | quota');
  process.exit(cmd === 'help' ? 0 : 1);
}
