#!/usr/bin/env node
// GA4 CLI — zero-dependency service-account client (mirrors gsc.mjs; same key).
// One-time setup: GA4 Admin → Property access management → add
// gsc-agent@claude-workspace-mcp-483716.iam.gserviceaccount.com as Viewer.
//
// Usage:
//   node scripts/ga.mjs [--account <name>] [--property <id>] <command>
//   node scripts/ga.mjs properties                    list accessible GA4 properties
//   node scripts/ga.mjs report [days]                 daily users/sessions/engagement
//   node scripts/ga.mjs pages [days]                  top pages by views
//   node scripts/ga.mjs sources [days]                top session sources
//   node scripts/ga.mjs events [days] | clicks [days] events by name / outbound clicks
//   node scripts/ga.mjs admin                         key events, custom dimensions, retention
//   node scripts/ga.mjs realtime                      active users right now
//
// Account: --account <name> (default ssp, env SSP_ACCOUNT) selects
// ~/.secrets/<name>-gsc-sa.json and the property-name hint "ga" in
// ~/.secrets/accounts.json. Env: GSC_SA_KEY (key path), GA_PROPERTY.
// Note: GSC_SA_KEY, when set, overrides --account's key path — unset it when switching accounts.
import { readFileSync, existsSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { resolveAccountOrExit } from './lib/account.mjs';

const acct = resolveAccountOrExit();
const KEY_PATH = process.env.GSC_SA_KEY || acct.secret('gsc-sa.json');
const [cmd = 'help', ...args] = acct.rest;

if (!existsSync(KEY_PATH)) {
  console.error(`No service-account key at ${KEY_PATH} — see scripts/gsc.mjs setup.`);
  process.exit(1);
}
const key = JSON.parse(readFileSync(KEY_PATH, 'utf-8'));

const b64url = (s) => Buffer.from(s).toString('base64url');

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) +
    '.' +
    b64url(
      JSON.stringify({
        iss: key.client_email,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
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
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function resolveProperty() {
  const explicit = acct.overrides.property || process.env.GA_PROPERTY;
  if (explicit) {
    const p = String(explicit);
    return p.startsWith('properties/') ? p : `properties/${p}`;
  }
  const { accountSummaries = [] } = await api(
    'https://analyticsadmin.googleapis.com/v1beta/accountSummaries',
  );
  const props = accountSummaries.flatMap((a) => a.propertySummaries || []);
  const hint = acct.hint('ga', 'sullivan');
  const match =
    props.find((p) => p.displayName.toLowerCase().includes(hint.toLowerCase())) ||
    (props.length === 1 && props[0]);
  if (!match) {
    console.error(`No property matching "${hint}" visible to the service account. Visible:`);
    props.forEach((p) => console.error(`  ${p.property}  ${p.displayName}`));
    console.error('→ Add the SA as Viewer in GA4 Admin → Property access management.');
    process.exit(1);
  }
  return match.property;
}

function runReport(property, body) {
  return api(`https://analyticsdata.googleapis.com/v1beta/${property}:runReport`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

const days = Number(args.find((a) => /^\d+$/.test(a)) || 28);
const range = { startDate: `${days}daysAgo`, endDate: 'today' };
const printRows = (data, headers) => {
  console.log(headers.join('\t'));
  (data.rows || []).forEach((r) =>
    console.log(
      [...r.dimensionValues.map((d) => d.value), ...r.metricValues.map((m) => m.value)].join('\t'),
    ),
  );
  if (!data.rows?.length) console.log('(no rows)');
};

if (cmd === 'properties') {
  const { accountSummaries = [] } = await api(
    'https://analyticsadmin.googleapis.com/v1beta/accountSummaries',
  );
  const props = accountSummaries.flatMap((a) =>
    (a.propertySummaries || []).map((p) => `${p.property}\t${p.displayName}\t(${a.displayName})`),
  );
  console.log(
    props.length ? props.join('\n') : 'No properties visible to the service account yet.',
  );
} else if (cmd === 'report') {
  const property = await resolveProperty();
  const data = await runReport(property, {
    dateRanges: [range],
    dimensions: [{ name: 'date' }],
    metrics: [
      { name: 'totalUsers' },
      { name: 'sessions' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  });
  console.log(`${property} — last ${days}d`);
  printRows(data, ['date', 'users', 'sessions', 'engagementRate', 'avgSessionSec']);
} else if (cmd === 'pages') {
  const property = await resolveProperty();
  const data = await runReport(property, {
    dateRanges: [range],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 15,
  });
  printRows(data, ['path', 'views', 'users']);
} else if (cmd === 'sources') {
  const property = await resolveProperty();
  const data = await runReport(property, {
    dateRanges: [range],
    dimensions: [{ name: 'sessionSource' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  });
  printRows(data, ['source', 'sessions', 'users']);
} else if (cmd === 'events') {
  const property = await resolveProperty();
  const data = await runReport(property, {
    dateRanges: [range],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 20,
  });
  printRows(data, ['event', 'count', 'users']);
} else if (cmd === 'clicks') {
  // Outbound link clicks (GA4 enhanced measurement `click` event) by target URL.
  const property = await resolveProperty();
  const data = await runReport(property, {
    dateRanges: [range],
    dimensions: [{ name: 'linkUrl' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { value: 'click' } },
    },
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 15,
  });
  printRows(data, ['linkUrl', 'clicks']);
} else if (cmd === 'admin') {
  // Property configuration the audit found wrong (2026-09-06): 2-month
  // retention, no custom dimensions, a dead "purchase" key event. Read-only.
  const property = await resolveProperty();
  const base = `https://analyticsadmin.googleapis.com/v1beta/${property}`;
  const [{ keyEvents = [] }, { customDimensions = [] }, retention] = await Promise.all([
    api(`${base}/keyEvents`),
    api(`${base}/customDimensions`),
    api(`${base}/dataRetentionSettings`),
  ]);
  console.log(`${property}`);
  console.log(
    `retention: events=${retention.eventDataRetention} users=${retention.userDataRetention}`,
  );
  console.log(`key events: ${keyEvents.map((k) => k.eventName).join(', ') || '(none)'}`);
  console.log(
    `custom dimensions: ${customDimensions.map((d) => `${d.parameterName} (${d.scope})`).join(', ') || '(none)'}`,
  );
} else if (cmd === 'realtime') {
  const property = await resolveProperty();
  const data = await api(
    `https://analyticsdata.googleapis.com/v1beta/${property}:runRealtimeReport`,
    {
      method: 'POST',
      body: JSON.stringify({ metrics: [{ name: 'activeUsers' }] }),
    },
  );
  console.log(`active users now: ${data.rows?.[0]?.metricValues?.[0]?.value ?? 0}`);
} else {
  console.error(
    'Commands: properties | report [days] | pages [days] | sources [days] | events [days] | clicks [days] | admin | realtime',
  );
  process.exit(cmd === 'help' ? 0 : 1);
}
