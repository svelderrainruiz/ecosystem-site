// Generates src/data/status.json from the RSR requirement registry. Read-only: SELECTs only, through psql.
// Public members get revisions; private members (RSR, mprr) get counts and export dates only.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const passwordFile = process.env.REGISTRY_PASSWORD_FILE ?? join(homedir(), '.config/rsr-registry-local/postgres-password');
const members = JSON.parse(readFileSync(new URL('../src/data/members.json', import.meta.url), 'utf8'));

const sql = `
WITH latest AS (
  SELECT DISTINCT ON (sn.source_uuid, sn.scope)
         regexp_replace(regexp_replace(s.canonical_remote, '(\\.wiki)?(\\.git)?$', ''), '.*/', '') AS member,
         sn.scope, sn.source_ref, sn.source_revision, sn.accepted_at, sn.snapshot_uuid
  FROM registry_v1.snapshots sn JOIN registry_v1.sources s USING (source_uuid)
  WHERE s.canonical_remote NOT LIKE 'local://%'
  ORDER BY sn.source_uuid, sn.scope, sn.accepted_at DESC)
SELECT member, scope, source_ref, left(source_revision, 7), to_char(accepted_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS'),
       (SELECT count(*) FROM registry_v1.requirement_nodes n WHERE n.snapshot_uuid = latest.snapshot_uuid),
       (SELECT count(*) FROM registry_v1.edges e WHERE e.snapshot_uuid = latest.snapshot_uuid)
FROM latest ORDER BY 1, 2`;

const out = execFileSync('psql', ['-h', '127.0.0.1', '-p', '55432', '-U', 'postgres', '-d', 'registry_local',
  '-X', '-A', '-t', '-F', '\t', '-v', 'ON_ERROR_STOP=1', '-c', `SET default_transaction_read_only = on; ${sql}`], {
  env: { ...process.env, PGPASSWORD: readFileSync(passwordFile, 'utf8').trim() },
  encoding: 'utf8',
});

const rows = out.split('\n').filter((l) => l && !l.startsWith('SET')).map((l) => {
  const [member, scope, ref, revision, ts, nodes, edges] = l.split('\t');
  return { member, scope, ref, revision, ts, date: ts.slice(0, 10), nodes: Number(nodes), edges: Number(edges) };
});

// A public member's pin is read from its own repository over anonymous https, so the card shows what the repository says.
async function readPin(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`pin file ${url}: HTTP ${res.status}`);
  const pin = await res.json();
  if (pin.schema !== 'rsr/consumer-pin@1' || !/^v\d+\.\d+\.\d+$/.test(pin.rsr_tag)) throw new Error(`pin file ${url}: unexpected content`);
  return { tag: pin.rsr_tag, commit: String(pin.rsr_commit).slice(0, 7) };
}

const status = [];
for (const m of members) {
  const mine = rows.filter((r) => r.member === m.id);
  const scopes = Object.fromEntries(mine.map((r) => [r.scope, r.nodes]));
  const entry = {
    id: m.id,
    exported: mine.length > 0,
    scopes,
    edges: mine.reduce((sum, r) => sum + r.edges, 0),
    lastExport: mine.map((r) => r.date).sort().at(-1) ?? null,
  };
  if (m.visibility === 'public' && mine.length > 0) {
    // An unchanged scope reuses its earlier snapshot, so the newest snapshot (by full timestamp) names the revision.
    const newest = [...mine].sort((a, b) => b.ts.localeCompare(a.ts))[0];
    entry.revision = newest.revision;
    entry.ref = newest.ref;
  }
  if (m.visibility === 'public' && m.pinFile) entry.pin = await readPin(m.pinFile);
  status.push(entry);
}

writeFileSync(new URL('../src/data/status.json', import.meta.url), `${JSON.stringify({
  generated: new Date().toISOString().slice(0, 10),
  source: 'RSR requirement registry, read-only',
  members: status,
}, null, 2)}\n`);
console.log(`status.json: ${status.length} members, ${status.filter((s) => s.exported).length} exported`);
