---
title: "repo-standards-review consumer kit"
sidebar:
  label: "consumer kit wiki"
editUrl: false
---

*Source: the kit wiki, `Home.md` at commit `a7df0a0`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

This is the wiki of the repo-standards-review consumer kit, the template that ecosystem members adopt. The kit is a
template, not a program. It has no requirements of its own, so this wiki governs no requirement or test pages.

## What the kit is

A [cookiecutter](https://cookiecutter.readthedocs.io/) template that repositories in the repo-standards-review (RSR)
ecosystem adopt and later update with [cruft](https://cruft.github.io/cruft/). Each RSR release publishes the kit,
with that release's manifest, to this repository, tagged `vX.Y.Z`. The template contains no standards text.

What a repository gets from it:
- a pin of one RSR release in `.repo-standards-review.json`: the tag, the full commit, and the digest-pinned
  assurance-workbench image;
- a generated `.gitattributes` that checks out its executable scripts with LF line endings on every platform;
- `.repo-standards-review/check_consumer.py`, a CI check that needs only Python 3.9+ and Git;
- `.repo-standards-review/observations.py`, which writes and checks the test-case items of the member's wiki test
  pages. CI does not run it, because it needs the wiki and execution evidence.

## How a repository adopts it

Use this repository as the cruft template, with no `--directory`, at the tag of the RSR release to pin. The
release-owned values (`rsr_tag`, `rsr_commit`, `workbench_image`) come from that release's manifest, never from
ordinary answers. An existing repository bakes the kit once and copies the result, `.cruft.json` included. The
README of this repository has the answers, the release-owned values and the adoption steps in full.

## Where the governing requirements live

The kit is maintained in RSR, under `templates/consumer/`, and its requirements and tests are RSR's, not this wiki's.
For example, RSR's `scripts/eval_consumer_template.py` (TEST-159) publishes the kit locally the way the release
pipeline does, bakes it for several members and exercises adoption, drift detection and update. The wiki standard
that this wiki follows is RSR's `rsr/ecosystem-wiki-standard@8`, in `docs/architecture/ecosystem-wiki-standard.md`.

## Conformance

A wiki with no `.wiki-profile.json` has the default profile. It governs the directories `system-requirements`,
`software-requirements` and `tests`, and this wiki has none of them. This page is a `note` page, so no page of this
wiki is a requirement or a test. Nothing was added to stand in for requirements the kit does not have.
