#!/usr/bin/env node
// Microsoft Clarity Data Export CLI — SSP project (zero-dependency).
// Token: ~/.secrets/ssp-clarity-token.txt (Clarity project → Settings →
// Data Export → API token). NOTE: the clarity MCP connector in Claude Code
// is configured for the Cloud Club project — this script is the SSP path.
//
// ⚠️ HARD LIMIT: 10 API requests per project per DAY. One command = one
// request. Ask for everything you need in one call.
//
// Usage:
//   node scripts/clarity.mjs insights [days 1-3] [dimension]
//     e.g. insights 3            overall traffic/engagement/frustration
//          insights 3 URL        broken down by page URL
//          insights 1 Device     by device; also: Browser, OS, Country,
//                                Source, Medium, Channel, PageTitle
//   node scripts/clarity.mjs raw [days] [dim1] [dim2] [dim3]   full JSON
import { readFileSync, existsSync } from 'node:fs';

const TOKEN_PATH = `${process.env.HOME}/.secrets/ssp-clarity-token.txt`;
if (!existsSync(TOKEN_PATH)) {
  console.error(`No Clarity token at ${TOKEN_PATH} (Clarity → Settings → Data Export).`);
  process.exit(1);
}
const TOKEN = readFileSync(TOKEN_PATH, 'utf-8').trim();

const [cmd = 'insights', ...args] = process.argv.slice(2);
const days = Math.min(3, Math.max(1, Number(args.find((a) => /^\d+$/.test(a)) || 1)));
const dims = args.filter((a) => !/^\d+$/.test(a));

const qs = new URLSearchParams({ numOfDays: String(days) });
dims.slice(0, 3).forEach((d, i) => qs.set(`dimension${i + 1}`, d));

const res = await fetch(`https://www.clarity.ms/export-data/api/v1/project-live-insights?${qs}`, {
  headers: { authorization: `Bearer ${TOKEN}` },
});
if (!res.ok) {
  console.error(`Clarity API → ${res.status}: ${await res.text()}`);
  if (res.status === 429) console.error('(daily 10-request limit hit — resets in <24h)');
  process.exit(1);
}
const metrics = await res.json();

if (cmd === 'raw') {
  console.log(JSON.stringify(metrics, null, 2));
} else {
  console.log(`SSP Clarity — last ${days} day(s)${dims.length ? ` by ${dims.join(', ')}` : ''}`);
  for (const m of metrics) {
    const rows = m.information || [];
    if (!rows.length) continue;
    if (m.metricName === 'Traffic' && !dims.length) {
      // distinctUserCount INCLUDES bots — report humans and bots separately.
      const t = rows[0];
      console.log(
        `Traffic: ${t.totalSessionCount} human sessions (${Number(t.pagesPerSessionPercentage).toFixed(2)} pages/session) + ${t.totalBotSessionCount} bot sessions`,
      );
    } else if (m.metricName === 'ScrollDepth' && !dims.length) {
      console.log(`ScrollDepth: ${Number(rows[0].averageScrollDepth).toFixed(1)}% avg`);
    } else if (m.metricName === 'EngagementTime' && !dims.length) {
      console.log(
        `Engagement: ${rows[0].totalTime}s total / ${rows[0].activeTime}s active per session`,
      );
    } else if (dims.length) {
      const label = (r) =>
        dims.map((d) => r[d] ?? r[d.charAt(0).toUpperCase() + d.slice(1)] ?? '?').join(' | ');
      const interesting = rows
        .map(
          (r) =>
            `  ${m.metricName}: sessions=${r.sessionsCount ?? r.totalSessionCount ?? '?'} ${label(r)}`,
        )
        .slice(0, 8);
      console.log(interesting.join('\n'));
    } else {
      const pct = rows[0].sessionsWithMetricPercentage;
      if (pct !== undefined && Number(pct) > 0) console.log(`${m.metricName}: ${pct}% of sessions`);
    }
  }
  console.log('(frustration metrics at 0% are omitted; use `raw` for everything)');
}
