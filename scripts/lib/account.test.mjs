import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseAccountArgs, secretPath, resolveAccount, resolveAccountOrExit } from './account.mjs';
const tmpHomes = [];
const tmpHome = () => {
  const h = mkdtempSync(join(tmpdir(), 'acct-'));
  tmpHomes.push(h);
  return h;
};
after(() => tmpHomes.forEach((h) => rmSync(h, { recursive: true, force: true })));

test('defaults to ssp and leaves the command args intact', () => {
  const r = parseAccountArgs(['report', '30']);
  assert.equal(r.account, 'ssp');
  assert.deepEqual(r.rest, ['report', '30']);
  assert.deepEqual(r.overrides, {});
});

test('--account and --account= are both removed from rest', () => {
  assert.deepEqual(parseAccountArgs(['--account', 'cloudclub', 'perf']), {
    account: 'cloudclub',
    overrides: {},
    rest: ['perf'],
  });
  assert.deepEqual(parseAccountArgs(['perf', '--account=cloudclub']), {
    account: 'cloudclub',
    overrides: {},
    rest: ['perf'],
  });
});

test('SSP_ACCOUNT env is the fallback, the flag wins', () => {
  assert.equal(parseAccountArgs(['x'], { SSP_ACCOUNT: 'brief' }).account, 'brief');
  assert.equal(parseAccountArgs(['--account', 'ssp'], { SSP_ACCOUNT: 'brief' }).account, 'ssp');
});

test('--property and --site land in overrides', () => {
  const r = parseAccountArgs(['--property', '123', '--site=https://x.test/', 'sites']);
  assert.deepEqual(r.overrides, { property: '123', site: 'https://x.test/' });
  assert.deepEqual(r.rest, ['sites']);
});

test('secretPath follows ~/.secrets/<account>-<tool>', () => {
  assert.equal(secretPath('ssp', 'gsc-sa.json', '/home/u'), '/home/u/.secrets/ssp-gsc-sa.json');
  assert.equal(secretPath('cloudclub', 'bing-key.txt', '/h'), '/h/.secrets/cloudclub-bing-key.txt');
});

test('hint: ssp uses the baked default, other accounts read accounts.json, missing throws', () => {
  const home = tmpHome();
  mkdirSync(join(home, '.secrets'));
  writeFileSync(
    join(home, '.secrets', 'accounts.json'),
    JSON.stringify({ cloudclub: { gsc: 'cloudclub.ai' } }),
  );
  const ssp = resolveAccount(['sites'], {}, home);
  assert.equal(ssp.hint('gsc', 'sullivanstreetprojects'), 'sullivanstreetprojects');
  assert.equal(ssp.secret('gsc-sa.json'), join(home, '.secrets', 'ssp-gsc-sa.json'));
  const cc = resolveAccount(['--account', 'cloudclub', 'sites'], {}, home);
  assert.equal(cc.hint('gsc', 'sullivanstreetprojects'), 'cloudclub.ai');
  assert.throws(() => cc.hint('bing_site', 'x'), /No hint "bing_site" for account "cloudclub"/);
});

test('hint: ssp entries in accounts.json override the baked default', () => {
  const home = tmpHome();
  mkdirSync(join(home, '.secrets'));
  writeFileSync(
    join(home, '.secrets', 'accounts.json'),
    JSON.stringify({ ssp: { gsc: 'ssp.test' } }),
  );
  assert.equal(resolveAccount([], {}, home).hint('gsc', 'default'), 'ssp.test');
});

test('malformed accounts.json throws a clear error instead of a raw SyntaxError', () => {
  const home = tmpHome();
  mkdirSync(join(home, '.secrets'));
  writeFileSync(join(home, '.secrets', 'accounts.json'), '{ not json');
  assert.throws(() => resolveAccount([], {}, home), /Malformed .*accounts\.json/);
});

test('resolveAccountOrExit: malformed accounts.json prints one line and exits 1', () => {
  const home = tmpHome();
  mkdirSync(join(home, '.secrets'));
  writeFileSync(join(home, '.secrets', 'accounts.json'), '{ bad');
  const calls = { error: [], exit: [] };
  const io = { error: (m) => calls.error.push(m), exit: (c) => calls.exit.push(c) };
  resolveAccountOrExit([], {}, home, io);
  assert.match(calls.error[0], /^Malformed .*accounts\.json/);
  assert.deepEqual(calls.exit, [1]);
});

test('resolveAccountOrExit: missing hint for a non-ssp account prints one line and exits 1', () => {
  const home = tmpHome();
  const calls = { error: [], exit: [] };
  const io = { error: (m) => calls.error.push(m), exit: (c) => calls.exit.push(c) };
  const acct = resolveAccountOrExit(['--account', 'cloudclub'], {}, home, io);
  acct.hint('gsc', 'default');
  assert.match(calls.error[0], /^No hint "gsc" for account "cloudclub"/);
  assert.deepEqual(calls.exit, [1]);
});

test('a recognized flag with no value fails loudly instead of leaking into the command args', () => {
  assert.throws(() => parseAccountArgs(['report', '--property']), /--property needs a value/);
  assert.throws(() => parseAccountArgs(['--account']), /--account needs a value/);
});
