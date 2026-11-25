# Ecosystem site

Live at <https://svelderrainruiz.github.io/ecosystem-site/>. A static stakeholder site: Astro Starlight with
`@astrojs/mdx`. MDX is used only here, never in anything the wiki standard governs. Content comes from public sources
only: the projectbuddy wiki, the public members' wiki Home pages, each public member's `.repo-standards-review.json`,
and `status.json`, generated read-only from the RSR requirement registry. The sync clones anonymously (credential
helpers are disabled), so a repository that is not public fails the sync instead of being read. The revision on a card
is the newest snapshot's, chosen by timestamp; a scope that did not change keeps its earlier snapshot. The export time on
a card is the newest snapshot's acceptance time, shown in UTC to the second.

```bash
npm ci --ignore-scripts          # exact, locked install
npm run status                   # regenerate src/data/status.json (read-only SELECTs; needs the registry settings below)
npm run sync                     # re-copy the public wiki pages into src/content/docs
npm run build                    # astro build, then scripts/check-site.mjs
npm run preview                  # serve dist/ locally, under the site base
```

Publishing: a push to `main` runs `.github/workflows/pages.yml`, which builds and checks the site and deploys it only if
the check passes. Pull requests are built and checked but never deployed. Updating the site is therefore: regenerate
the status and pages locally (the registry is not reachable from CI), commit, push.

The home and Ecosystem pages share a member card. For a public VS Code extension with `ext-v` release tags,
set `extensionRelease` in `src/data/members.json` only after the version is verified on both GitHub and the
Marketplace. After deployment, follow the version and Marketplace links on the live card. Do not edit the
generated wiki copy or use a candidate tag as proof of publication.

The site is served under a base path (`site.config.mjs`). Root-absolute links do not get it automatically: `sync` writes
it into the pages it copies, and the few links in the hand-written MDX and frontmatter carry it by hand.

`status` reads the registry connection from the environment, or from an untracked `.env.local`: `REGISTRY_HOST`,
`REGISTRY_PORT`, `REGISTRY_USER`, `REGISTRY_DB` and `REGISTRY_PASSWORD_FILE` (a path to a file holding the password).
Nothing about the registry is stored in this repository.

`scripts/check-site.mjs` fails the build on a broken internal link or anchor, a link that ignores the site base, an
absolute dollar or AI-unit amount, a secret-looking string, a local path or database name, a GitLab URL the Ecosystem
page doesn't state, extra fields on a private member, a member card on the home or Ecosystem page that lacks its own
export time to the second, and a figure that isn't on the North-Star business case page.
`SITE_DIST=<dir>` points the same checks at another copy of the site, for example a mirror of the live one.

Private members (RSR, mprr) appear as counts, export times and rule names only. Figures are relative.

## License

This repository is licensed under the BSD Zero Clause License ([LICENSE](LICENSE), SPDX `0BSD`), the same license as
labview-benchmark-actor, vi-history-suite and lbabus. The pages under `src/content/docs/members/` and
`src/content/docs/results/north-star-business-case.md` are copies of pages from the members' public wikis (`npm run
sync`): they keep the terms of the repositories they come from, and the license above covers everything else.
