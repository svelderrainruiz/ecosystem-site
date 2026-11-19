# Ecosystem site (local, unpublished)

A static stakeholder site: Astro Starlight with `@astrojs/mdx`. MDX is used only here, never in anything the wiki
standard governs. Content comes from public sources only: the projectbuddy wiki, the public members' wiki Home pages,
and `status.json`, generated read-only from the RSR requirement registry.

```bash
npm ci --ignore-scripts          # exact, locked install
npm run status                   # regenerate src/data/status.json (read-only psql SELECTs; needs the local registry)
npm run sync                     # re-copy the public wiki pages into src/content/docs
npm run build                    # astro build, then scripts/check-site.mjs
```

`scripts/check-site.mjs` fails the build on a broken internal link or anchor, an absolute dollar or AI-unit amount, a
secret-looking string, a local path or database name, a GitLab URL the Ecosystem page doesn't state, extra fields on a
private member, and a figure that isn't on the North-Star business case page.

Private members (RSR, mprr) appear as counts, export dates and rule names only. Figures are relative.
No remote is configured and nothing here is published.
