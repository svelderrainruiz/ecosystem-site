// Build-time check over dist/: fails on a broken internal link or anchor, and on private-content leaks.
// Run after `astro build` (npm run build does). Exit 1 on any finding.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
if (!existsSync(dist)) { console.error('check-site: no dist/ (run astro build first)'); process.exit(2); }

const findings = [];
const fail = (where, what) => findings.push(`${where}: ${what}`);

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));

const members = JSON.parse(readFileSync(join(root, 'src/data/members.json'), 'utf8'));
const status = JSON.parse(readFileSync(join(root, 'src/data/status.json'), 'utf8'));
const results = JSON.parse(readFileSync(join(root, 'src/data/results.json'), 'utf8'));
const allowedPrivate = readFileSync(join(root, 'src/data/ecosystem-allowed.md'), 'utf8');

// ---- 1. Internal links and anchors
const idsOf = new Map();
const ids = (file) => {
  if (!idsOf.has(file)) {
    idsOf.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsOf.get(file);
};
const target = (from, href) => {
  const [path, fragment] = href.split('#');
  const base = path === '' ? from : path.startsWith('/') ? join(dist, path) : resolve(dirname(from), path);
  const candidates = path === '' ? [from] : [base, `${base}.html`, join(base, 'index.html')];
  const file = candidates.find((c) => existsSync(c) && statSync(c).isFile());
  return { file, fragment };
};
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const where = relative(dist, file);
  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const href = raw.replace(/&amp;/g, '&');
    if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href) || href === '') continue;
    const { file: found, fragment } = target(file, href.split('?')[0]);
    if (!found) { fail(where, `broken ${attr} ${href}`); continue; }
    if (fragment && found.endsWith('.html') && !ids(found).has(decodeURIComponent(fragment))) {
      fail(where, `broken anchor ${href}`);
    }
  }
}

// ---- 2. Private-content leaks, over the visible text of every page and over the data the site ships
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x?[0-9a-f]+;/gi, ' ');
const sources = [
  ...htmlFiles.map((f) => [relative(dist, f), text(readFileSync(f, 'utf8'))]),
  ['src/data/status.json', JSON.stringify(status)],
  ...walk(join(root, 'src/content/docs')).map((f) => [relative(root, f), readFileSync(f, 'utf8')]),
];
const rules = [
  ['absolute dollar amount', /(?:US\$|USD\s?|\$)\s?\d/i],
  ['absolute AIU amount', /\d[\d,.]*\s*(?:AIU|AI Units)\b/i],
  ['secret-looking string', /(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|glpat-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*KEY|(?:password|passwd|secret|token)\s*[:=]\s*\S{6,})/i],
  ['local path or host', /(?:\/home\/\w+|127\.0\.0\.1|localhost:\d|\.config\/rsr|registry_local|wiki_local|rsr-registry-local)/i],
  ['internal tool or DB name', /(?:kpi_v1|rsr-source-tables|REPO_AUTOMATION|PGPASSWORD)/i],
];
for (const [where, body] of sources) {
  for (const [name, re] of rules) {
    const m = re.exec(body);
    if (m) fail(where, `${name}: "${m[0].slice(0, 40)}"`);
  }
  // A long hex string is a public commit id only when the text says so; otherwise it may be a digest or a key.
  for (const m of body.matchAll(/[0-9a-f]{40,}/gi)) {
    const before = body.slice(Math.max(0, m.index - 60), m.index);
    if (!/\b(at|commit|revision|sha)\b/i.test(before) && !/github\.com\S*$/.test(before)) {
      fail(where, `long hex string not stated as a commit: "${m[0].slice(0, 12)}..."`);
    }
  }
  // GitLab is where the private members live: only URLs that the Ecosystem page itself states may appear.
  for (const [url] of body.matchAll(/https?:\/\/gitlab\.com\/[^\s)"'<>]+/g)) {
    if (!allowedPrivate.includes(url.replace(/[.,;]+$/, ''))) fail(where, `private-host URL not on the Ecosystem page: ${url}`);
  }
}
// Private members publish counts, export dates and rule names only: no revision, no ref, no remote, no repo link.
for (const m of members.filter((x) => x.visibility === 'private')) {
  const s = status.members.find((x) => x.id === m.id);
  const extra = Object.keys(s ?? {}).filter((k) => !['id', 'exported', 'scopes', 'edges', 'lastExport'].includes(k));
  if (extra.length) fail('src/data/status.json', `private member ${m.id} carries ${extra.join(', ')}`);
  const extraMember = Object.keys(m).filter((k) => !['id', 'name', 'role', 'visibility', 'rules'].includes(k));
  if (extraMember.length) fail('src/data/members.json', `private member ${m.id} carries ${extraMember.join(', ')}`);
}

// ---- 3. The figures on the site are the figures on the business-case page
const page = readFileSync(join(root, 'src/content/docs/results/north-star-business-case.md'), 'utf8');
for (const needle of [
  `${results.a4.unsupported.control}%`, `${results.a4.unsupported.treatment}%`,
  `${results.a4.retention.control}%`, `${results.a4.retention.treatment}%`,
  `about ${results.costShare.ai}%`, `about ${results.costShare.operator}%`,
]) {
  if (!page.includes(needle)) fail('src/data/results.json', `"${needle}" is not on the North-Star business case page`);
}

if (findings.length) {
  console.error(`check-site: ${findings.length} finding(s)`);
  for (const f of findings) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`check-site: ${htmlFiles.length} pages, links and anchors resolve, no leaks found`);
