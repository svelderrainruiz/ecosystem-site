---
title: "labview-benchmark-actor Wiki"
sidebar:
  label: "labview-benchmark-actor wiki"
editUrl: false
---

*Source: the lba wiki, `Home.md` at commit `5c7de3a`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

The spec-driven documentation of [labview-benchmark-actor](https://github.com/svelderrainruiz/labview-benchmark-actor), a VS Code extension for benchmarking
LabVIEW across Codespaces, golden VMs, and a coordination mesh.

This wiki is an Obsidian vault. Clone `https://github.com/svelderrainruiz/labview-benchmark-actor.wiki.git` and open the folder in Obsidian
("Open folder as vault") for the graph, backlink, and outline views. Links are plain `[Page](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Page)` wikilinks, which
Obsidian and the GitHub wiki both understand.

Every page is generated from the repository's `docs/` folder on `develop` by `scripts/build-wiki.mjs` and
published by the `wiki-publish` workflow. Edit `docs/`, not these pages; a change made here is overwritten.

## Specifications

- [Software-Requirements-Specification](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Software-Requirements-Specification): 103 requirements, one note each under `requirements/`.
- [Requirements-Traceability-Matrix](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Requirements-Traceability-Matrix): requirement to architecture view, decisions, and tests.
- [Architecture-Packet](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Architecture-Packet): the ISO/IEC/IEEE 42010 architecture description; 89 decisions in [ADR-Index](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/ADR-Index).
- [Test-Plan](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Test-Plan) and [Test-Report](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Test-Report): 103 test items, one note each under `tests/`.

## Information for users

- [Audience-And-Task-Model](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Audience-And-Task-Model): Information for Users — Audience and Task Model
- [Command-Reference](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Command-Reference): Command Reference
- [Conformance-Boundary](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Conformance-Boundary): Information for Users — Conformance Boundary
- [Delivery-Profile](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Delivery-Profile): Delivery Profile
- [FAQ](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/FAQ): FAQ
- [Getting-Started](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Getting-Started): Getting Started
- [Glossary](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Glossary): Glossary
- [Join-The-Mesh](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Join-The-Mesh): Join the Mesh
- [Navigation-And-Search](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Navigation-And-Search): Navigation and Search
- [Information-For-Users-Plan](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Information-For-Users-Plan): Information Management Plan
- [Ubuntu-24-04-LabVIEW-2026-Installation](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Ubuntu-24-04-LabVIEW-2026-Installation): Ubuntu 24.04 + LabVIEW 2026 Installation Reference
- [User-Guide](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/User-Guide): User Guide

## Release

- [Release-Procedure](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Release-Procedure): Release procedure
- [Release-Runbook](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Release-Runbook): Release runbook (concrete, agent-executable)

## Process and assurance

- [CM-Plan](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/CM-Plan): Configuration Management Plan
- [Compliance-Posture](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Compliance-Posture): Compliance posture
- [Definition-Of-Done](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Definition-Of-Done): Definition of Done (DoD Gate / dod)

## Testing

- [Reviewer-Manual-Test-Plan](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Reviewer-Manual-Test-Plan): Expert reviewer manual test plan — `labview-benchmark-actor` extension + AGENTS.md

## Benchmarks

- [Benchmark-Grid](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Benchmark-Grid): Cross-Plane Benchmark Grid
- [Benchmark-Observatory](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Benchmark-Observatory): Benchmark Observatory

## Proposals

- [Proposal-CLI-Embedded-Requirements](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Proposal-CLI-Embedded-Requirements): Spec: Requirements built into the CLI (`lbabus docs` bundle)
- [Proposal-Ephemeral-Mesh](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Proposal-Ephemeral-Mesh): Proposal: Canonical Ephemeral Mesh — reproducible, disposable actor VMs (cattle, not pets)
- [Proposal-LabVIEW-Authoring-And-LVKit-Selftest](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Proposal-LabVIEW-Authoring-And-LVKit-Selftest): Proposal: LabVIEW VI authoring actor + lvkit cross-plane static self-test (Windows-first)
- [Proposal-Mesh-Node-Types](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Proposal-Mesh-Node-Types): Spec: Mesh Node Types & Strict Serialization (`bus-msg@1`)

## More documentation

- [Information-Item-Map](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Information-Item-Map): Information Item Map
- [MCP-Tools](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/MCP-Tools): MCP tools
- [Roadmap](https://github.com/svelderrainruiz/labview-benchmark-actor/wiki/Roadmap): Roadmap
