// Draws the link graph of a public member wiki as a static SVG for the briefing: one dot per page, one line per
// [[wikilink]]. Requirements are green, test items blue, design decisions orange, other pages grey.
// Usage: node scripts/gen-wiki-graph.mjs <path to a clone of the public wiki> public/briefing/lba-wiki-graph.svg
// The layout is seeded, so the same wiki gives the same picture byte for byte.
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';

const [wikiDir, outFile] = process.argv.slice(2);
if (!wikiDir || !outFile) { console.error('usage: gen-wiki-graph.mjs <wiki dir> <out.svg>'); process.exit(2); }

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  if (n === '.git') return [];
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const pages = walk(wikiDir).filter((f) => f.endsWith('.md')).sort();
const kindOf = (f) => {
  const top = relative(wikiDir, f).split(sep)[0];
  return top === 'requirements' ? 'req' : top === 'tests' ? 'test' : top === 'architecture' ? 'adr' : 'doc';
};
const nodes = pages.map((f) => ({ id: basename(f, '.md'), kind: kindOf(f), x: 0, y: 0, dx: 0, dy: 0, deg: 0 }));
const index = new Map(nodes.map((n, i) => [n.id, i]));
const pairs = new Set();
pages.forEach((f, i) => {
  // Links inside code are examples of the syntax, not links.
  const body = readFileSync(f, 'utf8').replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  for (const [, target] of body.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) {
    const j = index.get(basename(target.trim()));
    if (j === undefined || j === i) continue;
    pairs.add(i < j ? `${i} ${j}` : `${j} ${i}`);
  }
});
const edges = [...pairs].sort().map((p) => p.split(' ').map(Number));
for (const [a, b] of edges) { nodes[a].deg++; nodes[b].deg++; }

// Seeded PRNG (mulberry32) for a reproducible start.
let seed = 26112026;
const rand = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const W = 1600, H = 900, n = nodes.length, k = Math.sqrt((W * H) / n) * 0.55;
for (const v of nodes) { const a = rand() * 2 * Math.PI, r = Math.sqrt(rand()) * 400; v.x = W / 2 + r * Math.cos(a); v.y = H / 2 + r * Math.sin(a); }

// Fruchterman-Reingold with a weak pull to the centre, cooled linearly.
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

// Fit to the 16:9 frame with a margin.
const xs = nodes.map((v) => v.x), ys = nodes.map((v) => v.y), m = 30;
const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
const s = Math.min((W - 2 * m) / (maxX - minX || 1), (H - 2 * m) / (maxY - minY || 1));
const ox = (W - (maxX - minX) * s) / 2, oy = (H - (maxY - minY) * s) / 2;
const px = (v) => ((v.x - minX) * s + ox).toFixed(1), py = (v) => ((v.y - minY) * s + oy).toFixed(1);

const colour = { req: '#2ea043', test: '#3878dc', adr: '#e8833a', doc: '#9ca3af' };
const counts = Object.fromEntries(Object.keys(colour).map((c) => [c, nodes.filter((v) => v.kind === c).length]));
const lines = edges.map(([i, j]) => `<line x1="${px(nodes[i])}" y1="${py(nodes[i])}" x2="${px(nodes[j])}" y2="${py(nodes[j])}"/>`).join('');
const dots = nodes.map((v) => `<circle cx="${px(v)}" cy="${py(v)}" r="${(2.2 + Math.min(7, Math.sqrt(v.deg) * 0.75)).toFixed(1)}" fill="${colour[v.kind]}"/>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t"><title id="t">Link graph of the LabVIEW Benchmark Actor wiki: ${n} pages (${counts.req} requirements, ${counts.test} test items, ${counts.adr} design decisions, ${counts.doc} other pages) and ${edges.length} links</title><g stroke="#94a3b8" stroke-opacity="0.22" stroke-width="0.7">${lines}</g><g>${dots}</g></svg>\n`;
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, svg);
console.log(JSON.stringify({ pages: n, links: edges.length, ...counts, bytes: svg.length }));
