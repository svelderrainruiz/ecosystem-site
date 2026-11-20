---
title: "RSR Summary"
sidebar:
  label: "RSR (public summary)"
editUrl: false
---

*Source: the projectbuddy wiki, `RSR-Summary.md` at commit `2077689`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

`repo-standards-review` (RSR) is the standard every [ecosystem](/ecosystem-site/ecosystem/) member is assessed against. Its own repository and wiki are private, so this page is the public summary that the ecosystem wiki standard asks a private member to publish.

## Governed Wiki

RSR's wiki is generated from its `docs/` folder by the shared wiki generator in its consumer kit, under `rsr/ecosystem-wiki-standard@8`.

- **Profile:** `rsr/wiki-profile@2`, with a software scope and a test scope.
- **Requirements:** 76 `VHS-REQ` pages, from RSR's specification. 65 are Implemented and 11 Planned.
- **System requirements:** 26, kept on an ordinary specification page rather than as governed pages. RSR numbers its system and software requirements with one `VHS-REQ` prefix, and a wiki profile forbids one prefix in two scopes.
- **Tests:** 83 pages: 32 canonical, with a stimulus and required observation items that the observation check passes against pytest evidence (208 test-case items), and 51 stubs that record no definition yet. The evidence is execution evidence at RSR commit a18f559c (128 test cases passed and 1 skipped on linux-x64); it is not verification. 9 of the 32 canonical pages rest on per-test pytest cases. The other 23 rest on two script-level cases: `eval_assurance_fixtures.py` and `eval_authoring_guards.py` each run as one case that passes on exit code 0, so these 23 pages say that the script passed, not which check inside it covers the row.
- **Stub reasons:** each stub has one reason, by name only, and the list is machine-readable in RSR. 16 system-requirement pages not in the wiki, 14 no requirement link, 8 need PostgreSQL or Docker, 6 inspection, 3 gate command, 2 not specifically covered, 1 skipped case, 1 reference-checkout procedure.
- **Traces:** 81 `verifies` edges.
- **Conformance:** the reference checker reports zero findings.
- **Registry:** the wiki is not exported to the RSR requirement registry. The registry reads RSR's source tables, which hold the system scope as well.
