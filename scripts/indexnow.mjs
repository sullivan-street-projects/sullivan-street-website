#!/usr/bin/env node
// IndexNow ping — tells IndexNow-participating engines (Bing/Copilot, Seznam,
// Naver, Yandex; Bing feeds ChatGPT browsing) that URLs changed. Run after
// every production deploy:
//   node scripts/indexnow.mjs            # pings the core pages
//   node scripts/indexnow.mjs <url ...>  # pings specific URLs
// The key is proven by the matching key file served at the site root
// (public/<key>.txt). Google does not participate — sitemap lastmod covers it.
const HOST = 'sullivanstreetprojects.com';
const KEY = '73074696d25c455da1f59ac514b6fa1b';

const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [`https://${HOST}/`, `https://${HOST}/privacy-policy`, `https://${HOST}/terms-and-conditions`];

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200/202 = accepted. 403 = key file not reachable (deploy it first).
console.log(`IndexNow → ${res.status} ${res.statusText} (${urls.length} URLs)`);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
