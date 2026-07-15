#!/usr/bin/env node
// TidyCal CLI — booking ground truth (zero-dependency).
// Token: ~/.secrets/ssp-tidycal-token.txt (tidycal.com → Account → API Access).
// This is the source of truth for ACTUAL bookings — GA4 only sees funnel
// events (view_booking_type/select_date/select_time) that TidyCal's GA
// integration fires from tidycal.com / call.sullivanstreetprojects.com.
//
// Usage:
//   node scripts/tidycal.mjs summary          counts: total/upcoming/cancelled
//   node scripts/tidycal.mjs bookings [n]     latest n bookings (default 10)
//   node scripts/tidycal.mjs types            booking types
import { readFileSync, existsSync } from 'node:fs';

const TOKEN_PATH = `${process.env.HOME}/.secrets/ssp-tidycal-token.txt`;
if (!existsSync(TOKEN_PATH)) {
  console.error(`No TidyCal token at ${TOKEN_PATH} (tidycal.com → Account → API Access).`);
  process.exit(1);
}
const TOKEN = readFileSync(TOKEN_PATH, 'utf-8').trim();

async function api(path) {
  const res = await fetch(`https://tidycal.com/api${path}`, {
    headers: { authorization: `Bearer ${TOKEN}`, accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function allBookings() {
  const out = [];
  for (let page = 1; page <= 10; page++) {
    const { data = [], next_page_url } = await api(`/bookings?page=${page}`);
    out.push(...data);
    if (!next_page_url) break;
  }
  return out;
}

const fmt = (b) => {
  const status = b.cancelled_at
    ? 'CANCELLED'
    : new Date(b.starts_at) > new Date()
      ? 'UPCOMING'
      : 'past';
  return `${b.starts_at.slice(0, 16).replace('T', ' ')}Z  ${status.padEnd(9)}  type:${b.booking_type_id}  tz:${b.timezone}`;
};

const [cmd = 'summary', ...args] = process.argv.slice(2);

if (cmd === 'types') {
  const { data = [] } = await api('/booking-types');
  data.forEach((t) =>
    console.log(
      `${t.title} (/${t.url_slug}) — ${t.duration_minutes}min${t.disabled_at ? ' [DISABLED]' : ''}`,
    ),
  );
} else if (cmd === 'bookings') {
  const n = Number(args[0] || 10);
  const bookings = await allBookings();
  bookings
    .sort((a, b) => new Date(b.starts_at) - new Date(a.starts_at))
    .slice(0, n)
    .forEach((b) => console.log(fmt(b)));
  if (!bookings.length) console.log('(no bookings on record)');
} else if (cmd === 'summary') {
  const bookings = await allBookings();
  const now = new Date();
  const cancelled = bookings.filter((b) => b.cancelled_at);
  const upcoming = bookings.filter((b) => !b.cancelled_at && new Date(b.starts_at) > now);
  const completed = bookings.filter((b) => !b.cancelled_at && new Date(b.starts_at) <= now);
  const last28 = bookings.filter(
    (b) => new Date(b.created_at) > new Date(Date.now() - 28 * 86400e3),
  );
  console.log(`total bookings ever: ${bookings.length}`);
  console.log(`  held (past, not cancelled): ${completed.length}`);
  console.log(`  upcoming: ${upcoming.length}`);
  console.log(`  cancelled: ${cancelled.length}`);
  console.log(`booked in last 28 days: ${last28.length}`);
} else {
  console.error('Commands: summary | bookings [n] | types');
  process.exit(1);
}
