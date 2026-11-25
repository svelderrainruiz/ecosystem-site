---
title: "ecosystem"
sidebar:
  label: "ecosystem wiki"
editUrl: false
---

*Source: the ecosystem wiki, `Home.md` at commit `6a5c5ce`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

The requirements of the Ecosystem Runner installer, which [ecosystem](https://github.com/svelderrainruiz/ecosystem) holds and publishes as test kits. The wiki follows the ecosystem wiki standard (`rsr/ecosystem-wiki-standard@8`), with its profile in `.wiki-profile.json` (`rsr/wiki-profile@2`). The RSR consumer kit's `wiki_generate.py` writes it from the installer specification in `docs/installer-spec/`: one page per requirement (`INST-REQ`), with the specification's exact text, and one page per test case of the test plan (`INST-TC`).

Every test page is a stub: no execution evidence is recorded for this repository yet, so no page claims that a requirement is verified. Each requirement's status is the traceability matrix's, `specified`. The specification's own count line says 101 requirements; it has 102 rows, and each row has a page.

The specification was imported from ecosystem-control at commit `4d71a8a`, the commit that the published test kit `installer-test-4d71a8a09e98` was built from. All of the specification's files are published: the requirements, the traceability matrix, the test plan, the architecture, the slice plan, the decision register, the risks and open questions, and its README.

Every page is generated from the repository's `docs/` folder on `main` by `wiki_generate.py`. Edit `docs/`, not these pages; a change made here is overwritten.

## Specifications

- [Software-Requirements-Specification](https://github.com/svelderrainruiz/ecosystem/wiki/Software-Requirements-Specification): 102 requirements, one page each under `software-requirements/`.
- [Requirements-Traceability-Matrix](https://github.com/svelderrainruiz/ecosystem/wiki/Requirements-Traceability-Matrix): each requirement with its status and tests.
- [Test-Plan](https://github.com/svelderrainruiz/ecosystem/wiki/Test-Plan): 58 test items, one stub page each under `tests/`.

## More documentation

- [README](https://github.com/svelderrainruiz/ecosystem/wiki/README): Installer framework specification
- [Architecture](https://github.com/svelderrainruiz/ecosystem/wiki/Architecture): Installer framework: architecture
- [Decisions](https://github.com/svelderrainruiz/ecosystem/wiki/Decisions): Installer framework: decision register
- [Risks-And-Open-Questions](https://github.com/svelderrainruiz/ecosystem/wiki/Risks-And-Open-Questions): Installer framework: risks, unverified claims and open questions
- [RTM](https://github.com/svelderrainruiz/ecosystem/wiki/RTM): Installer framework: requirements traceability matrix
- [Slice-Plan](https://github.com/svelderrainruiz/ecosystem/wiki/Slice-Plan): Installer framework: slice plan

<!-- sections -->
- [Architecture](https://github.com/svelderrainruiz/ecosystem/wiki/Architecture)
- [Decisions](https://github.com/svelderrainruiz/ecosystem/wiki/Decisions)
- [README](https://github.com/svelderrainruiz/ecosystem/wiki/README)
- [RTM](https://github.com/svelderrainruiz/ecosystem/wiki/RTM)
- [Requirements-Traceability-Matrix](https://github.com/svelderrainruiz/ecosystem/wiki/Requirements-Traceability-Matrix)
- [Risks-And-Open-Questions](https://github.com/svelderrainruiz/ecosystem/wiki/Risks-And-Open-Questions)
- [Slice-Plan](https://github.com/svelderrainruiz/ecosystem/wiki/Slice-Plan)
- [Software-Requirements-Specification](https://github.com/svelderrainruiz/ecosystem/wiki/Software-Requirements-Specification)
- [Test-Plan](https://github.com/svelderrainruiz/ecosystem/wiki/Test-Plan)
<!-- /sections -->
