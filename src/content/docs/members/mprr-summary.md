---
title: "mprr Summary"
sidebar:
  label: "mprr (public summary)"
editUrl: false
---

*Source: the projectbuddy wiki, `mprr-Summary.md` at commit `331e0eb`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

`mprr` is a private member of the [ecosystem](/ecosystem-site/ecosystem/). It is the reusable manual procedure record/replay transport,
aligned to labview-benchmark-actor's shared contract. Its own repository and wiki are private, so this page is the public
summary that the ecosystem wiki standard asks a private member to publish.

## Governed Wiki

mprr's wiki follows `rsr/ecosystem-wiki-standard@7` (VITechnologies/projectbuddy#363, #366).

- **Profile:** `rsr/wiki-profile@2`. The test scope declares three test families: `TEST-UNIT`, `TEST-DOC` and
  `TEST-INTEG`.
- **Requirements:** 184 `MPRR-REQ` pages, from mprr's specification. 99 are Implemented and 85 Planned.
- **Tests:** 148 pages. 146 run their vitest files at member commit mprr `a95122d`, on Linux and under WSL on a
  Windows host, and list those files' test cases verbatim: 850 test-case items, and the observation check passes.
  The other 2 describe their test in prose.
- **Traces:** 382 `verifies` edges.
- **Conformance:** the reference checker reports zero findings, and the wiki is exported to the RSR requirement registry.
