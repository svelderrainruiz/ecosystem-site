---
title: "RSR Summary"
sidebar:
  label: "RSR (public summary)"
editUrl: false
---

*Source: the projectbuddy wiki, `RSR-Summary.md` at commit `e961433`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

`repo-standards-review` (RSR) is the standard every [ecosystem](/ecosystem-site/ecosystem/) member is assessed against. Its own repository and wiki are private, so this page is the public summary that the ecosystem wiki standard asks a private member to publish.

## Governed Wiki

RSR's wiki is generated from its `docs/` folder by the shared wiki generator in its consumer kit, under `rsr/ecosystem-wiki-standard@8`.

- **Profile:** `rsr/wiki-profile@2`, with a software scope and a test scope.
- **Requirements:** 76 `VHS-REQ` pages, from RSR's specification. 65 are Implemented and 11 Planned.
- **System requirements:** 26, kept on an ordinary specification page rather than as governed pages. RSR numbers its system and software requirements with one `VHS-REQ` prefix, and a wiki profile forbids one prefix in two scopes.
- **Tests:** 83 pages: 38 canonical, with a stimulus and required observation items that the observation check passes against pytest evidence (241 test-case items), and 45 stubs that record no definition yet. The evidence is execution evidence at RSR commit 582cf757, the same tree as develop b3eb9472; it is not verification. 134 test cases passed and 1 skipped on linux-x64, 1 passed on linux-x64-postgres, and 22 passed on windows-x64. 10 of the 38 canonical pages rest on per-test pytest cases. The other 28 rest on script-level or gate-level cases, so these 28 pages say that the script or gate passed, not which check inside it covers the row. 3 of the 38 cover only part of their plan rows.
- **Traces:** 81 `verifies` edges.
- **Conformance:** the reference checker reports zero findings.
- **Registry:** the wiki is not exported to the RSR requirement registry. The registry reads RSR's source tables, which hold the system scope as well.
