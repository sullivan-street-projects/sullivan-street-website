#!/usr/bin/env node
// Regenerates public/llms.txt from the content SSOT (src/constants/index.js).
// Runs automatically as part of `npm run build` — structured sections
// (value props, services, outcomes) can no longer drift from the site copy.
// Prose sections (overview, founder, contact) live in the template below;
// edit them here, never in public/llms.txt directly.
import { writeFileSync } from 'node:fs';
import { VALUE_PROPS, TIERS, PARTNER_OUTCOMES } from '../src/constants/index.js';

const valueProps = VALUE_PROPS.map((p) => `- **${p.title}:** ${p.description}`).join('\n');

const services = TIERS.map(
  (t, i) => `${i + 1}.  **${t.title} (${t.subtitle}):** ${t.description}`,
).join('\n');

const outcomes = PARTNER_OUTCOMES.map((o) => `- **${o.client}:** ${o.metric} ${o.detail}`).join(
  '\n',
);

const llms = `<!-- generated from src/constants/index.js by scripts/generate-llms.mjs — edit the generator, not this file -->
# Sullivan Street Projects

> Fractional growth consultancy for tomorrow's billion-dollar brands. AI-powered strategy, media, and execution. Based in New York. [sullivanstreetprojects.com](https://sullivanstreetprojects.com)

## Company Overview
Sullivan Street Projects is a fractional growth consultancy based in New York. We bridge the gap between high-level strategy and tactical execution for brands scaling to $1B+. We operate not as a traditional agency, but as a "General Contractor" for marketing—embedding executive leadership, managing specialists, and owning P&L outcomes.

## Core Value Proposition
- **Marketing for Tomorrow's Billion-Dollar Brands:** We provide AI-powered strategy, media, and execution. Faster growth. Sharper focus. Higher profit.
${valueProps}

## Services (Your marketing investment, managed)
${services}

## Founder
**Brett Wohl** (Founder, Managing Partner)
Executive growth strategist with 10+ years of experience. Previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and Google.

## Key Outcomes
${outcomes}

## Contact
- **Email:** hello@sullivanstreetprojects.co
- **Location:** 1178 Broadway, New York, NY 10001
- **Website:** https://sullivanstreetprojects.com
`;

const out = new URL('../public/llms.txt', import.meta.url);
writeFileSync(out, llms);
console.log(`generated public/llms.txt (${llms.length} bytes) from constants`);
