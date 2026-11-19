---
title: "RSR Summary"
sidebar:
  label: "RSR (public summary)"
editUrl: false
---

*Source: the projectbuddy wiki, `RSR-Summary.md` at commit `331e0eb`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

`repo-standards-review` (RSR) is the standard every [ecosystem](/ecosystem/) member is assessed against. Its own repository and wiki are private, so this page is the public summary that the ecosystem wiki standard asks a private member to publish.

## Governed Wiki

RSR's wiki is generated from its `docs/` folder by the shared wiki generator in its consumer kit, under `rsr/ecosystem-wiki-standard@8`.

- **Profile:** `rsr/wiki-profile@2`, with a software scope and a test scope.
- **Requirements:** 76 `VHS-REQ` pages, from RSR's specification. 65 are Implemented and 11 Planned.
- **System requirements:** 26, kept on an ordinary specification page rather than as governed pages. RSR numbers its system and software requirements with one `VHS-REQ` prefix, and a wiki profile forbids one prefix in two scopes.
- **Tests:** 83 stub pages. Canonical test pages with stimulus and observation items follow.
- **Traces:** 81 `verifies` edges.
- **Conformance:** the reference checker reports zero findings.
- **Registry:** the wiki is not exported to the RSR requirement registry. The registry reads RSR's source tables, which hold the system scope as well.
