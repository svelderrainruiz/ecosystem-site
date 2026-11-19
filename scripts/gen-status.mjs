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
SELECT member, scope, source_ref, left(source_revision, 7), to_char(accepted_at AT TIME ZONE 'UTC', 'YYYY-MM-DD'),
       (SELECT count(*) FROM registry_v1.requirement_nodes n WHERE n.snapshot_uuid = latest.snapshot_uuid),
       (SELECT count(*) FROM registry_v1.edges e WHERE e.snapshot_uuid = latest.snapshot_uuid)
FROM latest ORDER BY 1, 2`;

const out = execFileSync('psql', ['-h', '127.0.0.1', '-p', '55432', '-U', 'postgres', '-d', 'registry_local',
  '-X', '-A', '-t', '-F', '\t', '-v', 'ON_ERROR_STOP=1', '-c', `SET default_transaction_read_only = on; ${sql}`], {
  env: { ...process.env, PGPASSWORD: readFileSync(passwordFile, 'utf8').trim() },
  encoding: 'utf8',
});

const rows = out.split('\n').filter((l) => l && !l.startsWith('SET')).map((l) => {
  const [member, scope, ref, revision, date, nodes, edges] = l.split('\t');
  return { member, scope, ref, revision, date, nodes: Number(nodes), edges: Number(edges) };
});

const status = members.map((m) => {
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
    const newest = [...mine].sort((a, b) => b.date.localeCompare(a.date))[0];
    entry.revision = newest.revision;
    entry.ref = newest.ref;
  }
  return entry;
});

writeFileSync(new URL('../src/data/status.json', import.meta.url), `${JSON.stringify({
  generated: new Date().toISOString().slice(0, 10),
  source: 'RSR requirement registry, read-only',
  members: status,
}, null, 2)}\n`);
console.log(`status.json: ${status.length} members, ${status.filter((s) => s.exported).length} exported`);
