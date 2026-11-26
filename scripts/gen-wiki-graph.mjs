// Draws the link graph of a public member wiki as a static SVG for the briefing: one dot per page, one line per
// [[wikilink]]. Requirements are green, test items blue, design decisions orange, other pages grey.
// Usage: node scripts/gen-wiki-graph.mjs <path to a clone of the public wiki> public/briefing/lba-wiki-graph.svg
// Ecosystem mode draws every member wiki in one graph, one colour per member, with an "Ecosystem" hub joined to each
// member's Home page and a line for each Markdown link from one member wiki to a page of another:
// node scripts/gen-wiki-graph.mjs --ecosystem public/briefing/ecosystem-graph.svg lba=<clone> vihs=<clone> ...
// The layout is seeded, so the same wiki gives the same picture byte for byte.
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  if (n === '.git') return [];
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
// Links inside code are examples of the syntax, not links.
const withoutCode = (text) => text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
const wikilinks = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
// Seeded PRNG (mulberry32) for a reproducible start.
const mulberry32 = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

// Fruchterman-Reingold with a weak pull to the centre, cooled linearly.
function layout(nodes, edges, W, H, rand) {
  const n = nodes.length, k = Math.sqrt((W * H) / n) * 0.55;
  for (const v of nodes) { const a = rand() * 2 * Math.PI, r = Math.sqrt(rand()) * 400; v.x = W / 2 + r * Math.cos(a); v.y = H / 2 + r * Math.sin(a); }
  const iterations = 320;
  for (let it = 0; it < iterations; it++) {
    const temp = 60 * (1 - it / iterations) + 0.5;
    for (const v of nodes) { v.dx = 0; v.dy = 0; }
    for (let i = 0; i < n; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < n; j++) {
        const b = nodes[j];
        let ddx = a.x - b.x, ddy = a.y - b.y; let d2 = ddx * ddx + ddy * ddy;
        if (d2 < 0.01) { ddx = rand() - 0.5; ddy = rand() - 0.5; d2 = 0.01; }
        const f = (k * k) / d2;
        a.dx += ddx * f; a.dy += ddy * f; b.dx -= ddx * f; b.dy -= ddy * f;
      }
    }
    for (const [i, j] of edges) {
      const a = nodes[i], b = nodes[j];
      const ddx = a.x - b.x, ddy = a.y - b.y, d = Math.sqrt(ddx * ddx + ddy * ddy) || 0.1;
      const f = d / k;
      a.dx -= ddx * f; a.dy -= ddy * f; b.dx += ddx * f; b.dy += ddy * f;
    }
    for (const v of nodes) {
      v.dx += (W / 2 - v.x) * 0.02 * k / 10; v.dy += (H / 2 - v.y) * 0.02 * k / 10;
      const d = Math.sqrt(v.dx * v.dx + v.dy * v.dy) || 1;
      v.x += (v.dx / d) * Math.min(d, temp); v.y += (v.dy / d) * Math.min(d, temp);
    }
  }
}

// Fit to the 16:9 frame with a margin.
function fit(nodes, W, H, m) {
  const xs = nodes.map((v) => v.x), ys = nodes.map((v) => v.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const s = Math.min((W - 2 * m) / (maxX - minX || 1), (H - 2 * m) / (maxY - minY || 1));
  const ox = (W - (maxX - minX) * s) / 2, oy = (H - (maxY - minY) * s) / 2;
  return [(v) => ((v.x - minX) * s + ox).toFixed(1), (v) => ((v.y - minY) * s + oy).toFixed(1)];
}

function wikiGraph(wikiDir, outFile) {
  const pages = walk(wikiDir).filter((f) => f.endsWith('.md')).sort();
  const kindOf = (f) => {
    const top = relative(wikiDir, f).split(sep)[0];
    return top === 'requirements' ? 'req' : top === 'tests' ? 'test' : top === 'architecture' ? 'adr' : 'doc';
  };
  const nodes = pages.map((f) => ({ id: basename(f, '.md'), kind: kindOf(f), x: 0, y: 0, dx: 0, dy: 0, deg: 0 }));
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const pairs = new Set();
  pages.forEach((f, i) => {
    for (const [, target] of withoutCode(readFileSync(f, 'utf8')).matchAll(wikilinks)) {
      const j = index.get(basename(target.trim()));
      if (j === undefined || j === i) continue;
      pairs.add(i < j ? `${i} ${j}` : `${j} ${i}`);
    }
  });
  const edges = [...pairs].sort().map((p) => p.split(' ').map(Number));
  for (const [a, b] of edges) { nodes[a].deg++; nodes[b].deg++; }

  const W = 1600, H = 900, n = nodes.length;
  layout(nodes, edges, W, H, mulberry32(26112026));
  const [px, py] = fit(nodes, W, H, 30);

  const colour = { req: '#2ea043', test: '#3878dc', adr: '#e8833a', doc: '#9ca3af' };
  const counts = Object.fromEntries(Object.keys(colour).map((c) => [c, nodes.filter((v) => v.kind === c).length]));
  const lines = edges.map(([i, j]) => `<line x1="${px(nodes[i])}" y1="${py(nodes[i])}" x2="${px(nodes[j])}" y2="${py(nodes[j])}"/>`).join('');
  const dots = nodes.map((v) => `<circle cx="${px(v)}" cy="${py(v)}" r="${(2.2 + Math.min(7, Math.sqrt(v.deg) * 0.75)).toFixed(1)}" fill="${colour[v.kind]}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t"><title id="t">Link graph of the LabVIEW Benchmark Actor wiki: ${n} pages (${counts.req} requirements, ${counts.test} test items, ${counts.adr} design decisions, ${counts.doc} other pages) and ${edges.length} links</title><g stroke="#94a3b8" stroke-opacity="0.22" stroke-width="0.7">${lines}</g><g>${dots}</g></svg>\n`;
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, svg);
  console.log(JSON.stringify({ pages: n, links: edges.length, ...counts, bytes: svg.length }));
}

const memberColour = { lba: '#2ea043', vihs: '#3878dc', lbabus: '#e8833a', ecosystem: '#d946ef', kit: '#eab308', projectbuddy: '#06b6d4' };
// The public wiki of each member as scripts/sync-content.mjs syncs it, to resolve links from one member wiki to another.
const memberWiki = { projectbuddy: 'vitechnologies/projectbuddy', lba: 'svelderrainruiz/labview-benchmark-actor', vihs: 'svelderrainruiz/vi-history-suite', lbabus: 'svelderrainruiz/lbabus', kit: 'svelderrainruiz/repo-standards-review-consumer-kit', ecosystem: 'svelderrainruiz/ecosystem' };
const wikiUrlLinks = /\]\(\s*<?https?:\/\/github\.com\/([^/\s)>]+)\/([^/\s)>]+)\/wiki(?:\/([^)\s#?>]*))?/gi;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function ecosystemGraph(outFile, specs) {
  const members = specs.map((s) => ({ id: s.slice(0, s.indexOf('=')), dir: s.slice(s.indexOf('=') + 1) }));
  if (!outFile || !members.length || members.some((m) => !m.id || !m.dir)) {
    console.error('usage: gen-wiki-graph.mjs --ecosystem <out.svg> <id>=<wiki dir> [<id>=<wiki dir> ...]'); process.exit(2);
  }
  const nodes = [], files = [], index = new Map();
  for (const m of members) {
    const pages = new Map();
    index.set(m.id, pages);
    for (const f of walk(m.dir).filter((f) => f.endsWith('.md')).sort()) {
      pages.set(basename(f, '.md'), nodes.length);
      nodes.push({ member: m.id, x: 0, y: 0, dx: 0, dy: 0, deg: 0 });
      files.push(f);
    }
  }
  const hub = nodes.length;
  nodes.push({ member: null, x: 0, y: 0, deg: 0 });

  const byWiki = new Map(Object.entries(memberWiki).filter(([id]) => index.has(id)).map(([id, wiki]) => [wiki, id]));
  const pairs = new Map();
  const link = (i, j, kind) => { if (i !== j && !pairs.has(i < j ? `${i} ${j}` : `${j} ${i}`)) pairs.set(i < j ? `${i} ${j}` : `${j} ${i}`, kind); };
  files.forEach((f, i) => {
    const own = nodes[i].member, body = withoutCode(readFileSync(f, 'utf8'));
    for (const [, target] of body.matchAll(wikilinks)) {
      const j = index.get(own).get(basename(target.trim()));
      if (j !== undefined) link(i, j, 'wiki');
    }
    for (const [, owner, repo, page] of body.matchAll(wikiUrlLinks)) {
      const other = byWiki.get(`${owner}/${repo}`.toLowerCase());
      if (!other || other === own) continue;
      let name = page || 'Home';
      try { name = decodeURIComponent(name); } catch { /* keep the raw name */ }
      const j = index.get(other).get(name.replace(/ /g, '-'));
      if (j !== undefined) link(i, j, 'cross');
    }
  });
  const homes = new Map(members.map((m) => [m.id, index.get(m.id).get('Home') ?? [...index.get(m.id).values()][0]]));
  for (const j of homes.values()) if (j !== undefined) link(hub, j, 'hub');
  const edges = [...pairs.keys()].sort().map((p) => [...p.split(' ').map(Number), pairs.get(p)]);
  for (const [a, b] of edges) { nodes[a].deg++; nodes[b].deg++; }

  // Each member is laid out on its own, scaled to a disc in proportion to its size, turned so its Home page faces the
  // hub, and set on a ring around the hub with a gap between neighbours, so every cluster keeps its own room.
  const rand = mulberry32(26112026);
  const ids = [...new Set(members.map((m) => m.id))];
  const groups = ids.map((id) => {
    const idx = [...new Set(index.get(id).values())];
    const local = new Map(idx.map((g, l) => [g, l]));
    const sub = idx.map((g) => nodes[g]);
    layout(sub, edges.filter(([a, b, kind]) => kind === 'wiki' && local.has(a) && local.has(b)).map(([a, b]) => [local.get(a), local.get(b)]), 1000, 1000, rand);
    const cx = sub.reduce((s, v) => s + v.x, 0) / sub.length, cy = sub.reduce((s, v) => s + v.y, 0) / sub.length;
    const far = Math.max(...sub.map((v) => Math.hypot(v.x - cx, v.y - cy)));
    return { id, sub, cx, cy, far, r: Math.sqrt(sub.length), home: nodes[homes.get(id)] };
  }).filter((g) => g.sub.length);
  const pad = 4, total = groups.reduce((s, g) => s + g.r + pad, 0), R = Math.max((total / Math.PI) * 1.15, ...groups.map((g) => g.r + 2 * pad));
  let angle = -Math.PI / 2;
  for (const g of groups) {
    const share = (2 * Math.PI * (g.r + pad)) / total, at = angle + share / 2;
    angle += share;
    const gx = R * Math.cos(at) * 1.6, gy = R * Math.sin(at), s = g.far ? g.r / g.far : 0;
    const turn = Math.atan2(-gy, -gx) - (g.home && g.far ? Math.atan2(g.home.y - g.cy, g.home.x - g.cx) : 0);
    const cos = Math.cos(turn), sin = Math.sin(turn);
    for (const v of g.sub) {
      const x = (v.x - g.cx) * s, y = (v.y - g.cy) * s;
      v.x = gx + x * cos - y * sin; v.y = gy + x * sin + y * cos;
    }
  }

  const W = 1600, H = 900, [px, py] = fit(nodes, W, H, 30);
  const line = ([i, j]) => `<line x1="${px(nodes[i])}" y1="${py(nodes[i])}" x2="${px(nodes[j])}" y2="${py(nodes[j])}"/>`;
  const inner = edges.filter((e) => e[2] === 'wiki').map(line).join('');
  const outer = edges.filter((e) => e[2] !== 'wiki').map(line).join('');
  const dots = nodes.filter((v, i) => i !== hub).map((v) => `<circle cx="${px(v)}" cy="${py(v)}" r="${(1.8 + Math.min(6, Math.sqrt(v.deg) * 0.6)).toFixed(1)}" fill="${memberColour[v.member] ?? '#9ca3af'}"/>`).join('');
  const h = nodes[hub], hx = px(h), hy = py(h);
  const stats = Object.fromEntries(groups.map((g) => [g.id, { pages: g.sub.length, links: edges.filter(([a, , kind]) => kind === 'wiki' && nodes[a].member === g.id).length }]));
  const cross = edges.filter((e) => e[2] === 'cross').length, hubLinks = edges.filter((e) => e[2] === 'hub').length;
  const totalPages = nodes.length - 1;
  const title = `Link graph of the ecosystem member wikis: ${totalPages} pages (${groups.map((g) => `${g.id} ${g.sub.length}`).join(', ')}) and ${edges.length} links (${edges.length - cross - hubLinks} wikilinks within a member wiki, ${cross} link${cross === 1 ? '' : 's'} from one member wiki to another, ${hubLinks} from the Ecosystem hub to each member's Home page)`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t"><title id="t">${esc(title)}</title><g stroke="#94a3b8" stroke-opacity="0.2" stroke-width="0.7">${inner}</g><g stroke="#94a3b8" stroke-opacity="0.45" stroke-width="0.9">${outer}</g><g>${dots}</g><circle cx="${hx}" cy="${hy}" r="10" fill="#ffffff" stroke="#64748b" stroke-width="1"/><text x="${hx}" y="${(Number(hy) + 26).toFixed(1)}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#ffffff" stroke="#1f2937" stroke-width="3" paint-order="stroke">Ecosystem</text></svg>\n`;
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, svg);
  console.log(JSON.stringify({ members: stats, crossMemberLinks: cross, hubLinks, totalPages, totalLinks: edges.length, bytes: Buffer.byteLength(svg) }));
}

if (process.argv[2] === '--ecosystem') {
  ecosystemGraph(process.argv[3], process.argv.slice(4));
} else {
  const [wikiDir, outFile] = process.argv.slice(2);
  if (!wikiDir || !outFile) { console.error('usage: gen-wiki-graph.mjs <wiki dir> <out.svg>'); process.exit(2); }
  wikiGraph(wikiDir, outFile);
}