// Copies the public wiki pages the site presents into src/content/docs as plain Markdown (never MDX), so the wikis stay
// the source of truth. Reads only public repositories over https. Records each source commit in the page front matter.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { base } from '../site.config.mjs';

const root = new URL('..', import.meta.url).pathname;
const docs = join(root, 'src/content/docs');

const wikis = {
  projectbuddy: 'https://github.com/VITechnologies/projectbuddy.wiki.git',
  lba: 'https://github.com/svelderrainruiz/labview-benchmark-actor.wiki.git',
  vihs: 'https://github.com/svelderrainruiz/vi-history-suite.wiki.git',
  lbabus: 'https://github.com/svelderrainruiz/lbabus.wiki.git',
  kit: 'https://github.com/svelderrainruiz/repo-standards-review-consumer-kit.wiki.git',
};

// page: [wiki, source file, destination under docs/, sidebar label]
const pages = [
  ['projectbuddy', 'North-Star-Business-Case.md', 'results/north-star-business-case.md', 'North-Star business case'],
  ['projectbuddy', 'RSR-Summary.md', 'members/rsr-summary.md', 'RSR (public summary)'],
  ['projectbuddy', 'mprr-Summary.md', 'members/mprr-summary.md', 'mprr (public summary)'],
  ['lba', 'Home.md', 'members/labview-benchmark-actor.md', 'labview-benchmark-actor wiki'],
  ['vihs', 'Home.md', 'members/vi-history-suite.md', 'vi-history-suite wiki'],
  ['lbabus', 'Home.md', 'members/lbabus.md', 'lbabus wiki'],
  ['kit', 'Home.md', 'members/repo-standards-review-consumer-kit.md', 'consumer kit wiki'],
];

// Wiki page names that exist on the site map to site paths, under the site base. Any other wiki link goes to the wiki itself.
const sitePages = Object.fromEntries(Object.entries({ 'RSR-Summary': '/members/rsr-summary/', 'mprr-Summary': '/members/mprr-summary/', 'North-Star-Business-Case': '/results/north-star-business-case/', Ecosystem: '/ecosystem/' })
  .map(([name, path]) => [name, `${base}${path}`]));
const wikiUrl = { projectbuddy: 'https://github.com/VITechnologies/projectbuddy/wiki', lba: 'https://github.com/svelderrainruiz/labview-benchmark-actor/wiki', vihs: 'https://github.com/svelderrainruiz/vi-history-suite/wiki', lbabus: 'https://github.com/svelderrainruiz/lbabus/wiki', kit: 'https://github.com/svelderrainruiz/repo-standards-review-consumer-kit/wiki' };

const tmp = mkdtempSync(join(tmpdir(), 'eco-sync-'));
const clones = {};
for (const [key, url] of Object.entries(wikis)) {
  const dir = join(tmp, key);
  execFileSync('git', ['-c', 'credential.helper=', 'clone', '--quiet', '--depth', '1', url, dir], {
    stdio: 'inherit',
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_ASKPASS: '/bin/false' },
  });
  clones[key] = { dir, commit: execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim() };
}

function convert(key, text) {
  let body = text.replace(/^<!--\s*page-kind:[^>]*-->\r?\n/m, '');
  const h1 = /^# (.+)$/m.exec(body);
  const title = h1 ? h1[1].trim() : 'Untitled';
  body = body.replace(/^# .+\r?\n+/, '');
  body = body.replace(/\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g, (_, page, label) => {
    const name = page.trim();
    return `[${(label ?? name).trim()}](${sitePages[name] ?? `${wikiUrl[key]}/${encodeURIComponent(name)}`})`;
  });
  body = body.replace(/\]\(([^):#/ ][^) ]*)\)/g, (m, target) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) return m;
    const name = target.replace(/\.md$/, '');
    return `](${sitePages[name] ?? `${wikiUrl[key]}/${name}`})`;
  });
  return { title, body: body.trimStart() };
}

for (const [key, file, dest, label] of pages) {
  const { title, body } = convert(key, readFileSync(join(clones[key].dir, file), 'utf8'));
  const front = ['---', `title: ${JSON.stringify(title)}`, `sidebar:\n  label: ${JSON.stringify(label)}`,
    `editUrl: false`, `---`, '',
    `*Source: the ${key} wiki, \`${file}\` at commit \`${clones[key].commit}\`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*`, ''].join('\n');
  mkdirSync(join(docs, dest, '..'), { recursive: true });
  writeFileSync(join(docs, dest), `${front}\n${body}`);
  console.log(`${dest} <- ${key}/${file}@${clones[key].commit}`);
}

// Test pages per member: a page under tests/ is a stub when it carries the page-kind: stub marker, file-level when its title
// says so, otherwise per-case canonical.
// A private member's counts are only what its public summary page states.
const memberOfWiki = { projectbuddy: 'projectbuddy', lba: 'labview-benchmark-actor', vihs: 'vi-history-suite', lbabus: 'lbabus', kit: 'repo-standards-review-consumer-kit' };
const testPages = {};
for (const [key, id] of Object.entries(memberOfWiki)) {
  const dir = join(clones[key].dir, 'tests');
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith('.md')); } catch { /* no tests/ directory */ }
  const texts = files.map((f) => readFileSync(join(dir, f), 'utf8'));
  const isStub = (t) => /^<!--\s*page-kind:\s*stub\s*-->/m.test(t);
  const stub = texts.filter(isStub).length;
  // A file-level page names its granularity in the title ("# TEST-001: evidence granularity: file"); the rest are per-case.
  const fileLevel = texts.filter((t) => !isStub(t) && /^# .*evidence granularity: file\s*$/m.test(t)).length;
  testPages[id] = { canonical: files.length - stub - fileLevel, fileLevel, stub };
}
const rsrTests = /\*\*Tests:\*\*[^\n]*?(\d+) canonical[^\n]*?(\d+) stubs?/.exec(readFileSync(join(clones.projectbuddy.dir, 'RSR-Summary.md'), 'utf8'));
if (!rsrTests) throw new Error('RSR-Summary.md no longer states "N canonical ... M stubs" on its Tests line');
testPages['repo-standards-review'] = { canonical: Number(rsrTests[1]), fileLevel: 0, stub: Number(rsrTests[2]) };
writeFileSync(join(root, 'src/data/test-pages.json'), `${JSON.stringify(testPages, null, 2)}\n`);

// The Ecosystem page is the authority for which private names may appear on the site; the leak check reads this copy.
mkdirSync(join(root, 'src/data'), { recursive: true });
writeFileSync(join(root, 'src/data/ecosystem-allowed.md'), readFileSync(join(clones.projectbuddy.dir, 'Ecosystem.md')));
rmSync(tmp, { recursive: true, force: true });
