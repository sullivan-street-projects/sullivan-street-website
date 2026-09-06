// Which business is this script talking to? Shared by ga/gsc/bing/clarity/
// tidycal so the same zero-dependency CLIs serve SSP, the Brief, Cloud Club…
//
//   --account <name>   (or --account=<name>; env SSP_ACCOUNT; default "ssp")
//   --property <id>    GA4 property override (also GA_PROPERTY env in ga.mjs)
//   --site <url>       GSC/Bing site override (also GSC_SITE / BING_SITE env)
//
// Secrets: ~/.secrets/<account>-<tool>  e.g. ~/.secrets/ssp-gsc-sa.json
// Hints:   ~/.secrets/accounts.json (optional) — per-account lookup hints:
//   { "cloudclub": { "gsc": "cloudclub.ai", "ga": "Cloud Club",
//                    "bing_site": "https://www.cloudclub.ai/",
//                    "sitemap": "https://www.cloudclub.ai/sitemap.xml" } }
// "ssp" needs no entry: each script passes its baked-in default as the
// fallback. Any other account with no entry fails loudly.
import { existsSync, readFileSync } from 'node:fs';

const FLAGS = ['account', 'property', 'site'];

export function parseAccountArgs(argv, env = {}) {
  const found = {};
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.match(/^--([a-z]+)=(.*)$/);
    if (eq && FLAGS.includes(eq[1])) {
      found[eq[1]] = eq[2];
      continue;
    }
    const bare = a.match(/^--([a-z]+)$/);
    if (bare && FLAGS.includes(bare[1]) && i + 1 < argv.length) {
      found[bare[1]] = argv[++i];
      continue;
    }
    rest.push(a);
  }
  const { account, ...overrides } = found;
  return { account: account || env.SSP_ACCOUNT || 'ssp', overrides, rest };
}

export function secretPath(account, tool, home) {
  return `${home}/.secrets/${account}-${tool}`;
}

export function resolveAccount(argv = process.argv.slice(2), env = process.env, home = env.HOME) {
  const { account, overrides, rest } = parseAccountArgs(argv, env);
  const hintsFile = `${home}/.secrets/accounts.json`;
  const hints = existsSync(hintsFile) ? JSON.parse(readFileSync(hintsFile, 'utf-8')) : {};
  return {
    name: account,
    rest,
    overrides,
    secret: (tool) => secretPath(account, tool, home),
    hint(key, sspDefault) {
      const v = hints[account]?.[key];
      if (v !== undefined) return v;
      if (account === 'ssp') return sspDefault;
      throw new Error(
        `No hint "${key}" for account "${account}" — add it to ~/.secrets/accounts.json`,
      );
    },
  };
}
