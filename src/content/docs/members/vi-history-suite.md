---
title: "vi-history-suite Wiki"
sidebar:
  label: "vi-history-suite wiki"
editUrl: false
---

*Source: the vihs wiki, `Home.md` at commit `712c018`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

Granularity: 22 per-case plus 115 file-level canonical test pages, 4 stub. The copied text below says canonical for both.

The spec-driven documentation of [vi-history-suite](https://github.com/svelderrainruiz/vi-history-suite).

Every page is generated from the repository's `docs/` folder on `develop` by `wiki_generate.py`. Edit `docs/`, not these pages; a change made here is overwritten.

## Specifications

- [Software-Requirements-Specification](https://github.com/svelderrainruiz/vi-history-suite/wiki/Software-Requirements-Specification): 141 requirements, one page each under `software-requirements/`.
- [Requirements-Traceability-Matrix](https://github.com/svelderrainruiz/vi-history-suite/wiki/Requirements-Traceability-Matrix): each requirement with its status and tests.
- [Architecture-Packet](https://github.com/svelderrainruiz/vi-history-suite/wiki/Architecture-Packet): the architecture description; 35 decisions in [ADR-Index](https://github.com/svelderrainruiz/vi-history-suite/wiki/ADR-Index).
- [Test-Plan](https://github.com/svelderrainruiz/vi-history-suite/wiki/Test-Plan): 141 test items, one page each under `tests/`: 137 canonical, 4 stub.

## Information for users

- [Audience-And-Task-Model](https://github.com/svelderrainruiz/vi-history-suite/wiki/Audience-And-Task-Model): Audience And Task Model
- [Delivery-Profile](https://github.com/svelderrainruiz/vi-history-suite/wiki/Delivery-Profile): Delivery Profile
- [Navigation-And-Search](https://github.com/svelderrainruiz/vi-history-suite/wiki/Navigation-And-Search): Navigation And Search
- [Plan](https://github.com/svelderrainruiz/vi-history-suite/wiki/Plan): Information For Users Plan
- [Style-Guide](https://github.com/svelderrainruiz/vi-history-suite/wiki/Style-Guide): Style Guide

## Architecture

- [ADR-Template](https://github.com/svelderrainruiz/vi-history-suite/wiki/ADR-Template): ADR-NNNN: Short Title In Title Case
- [Diagnostics-Bundle](https://github.com/svelderrainruiz/vi-history-suite/wiki/Diagnostics-Bundle): Comparison Runtime Diagnostics Bundle
- [Preview-Cache-Fabric](https://github.com/svelderrainruiz/vi-history-suite/wiki/Preview-Cache-Fabric): Preview-Cache Fabric

## Process and assurance

- [CM-Plan](https://github.com/svelderrainruiz/vi-history-suite/wiki/CM-Plan): Configuration Management Plan

## Requirements

- [Requirements-README](https://github.com/svelderrainruiz/vi-history-suite/wiki/Requirements-README): Requirements
- [Copilot-Web-Issue-Generation-Prompt](https://github.com/svelderrainruiz/vi-history-suite/wiki/Copilot-Web-Issue-Generation-Prompt): Copilot Web Issue Generation Prompt (Requirement Waves)
- [System-Requirements-Specification](https://github.com/svelderrainruiz/vi-history-suite/wiki/System-Requirements-Specification): System Requirements Specification

## More documentation

- [Agent-Workflows-README](https://github.com/svelderrainruiz/vi-history-suite/wiki/Agent-Workflows-README): Agent Workflows
- [Local-Change-Proposal](https://github.com/svelderrainruiz/vi-history-suite/wiki/Local-Change-Proposal): Local agent change proposal
- [Local-Pr-Evidence](https://github.com/svelderrainruiz/vi-history-suite/wiki/Local-Pr-Evidence): Local PR evidence (pre-PR draft)
- [Copilot-Cloud-Agent-MCP-Runbook](https://github.com/svelderrainruiz/vi-history-suite/wiki/Copilot-Cloud-Agent-MCP-Runbook): Copilot cloud-agent MCP runbook (consumer repo)
- [Development](https://github.com/svelderrainruiz/vi-history-suite/wiki/Development): Development
- [Devtools-Release](https://github.com/svelderrainruiz/vi-history-suite/wiki/Devtools-Release): Dev-Tools GitHub Release Channel
- [Documentation-Workbench](https://github.com/svelderrainruiz/vi-history-suite/wiki/Documentation-Workbench): Documentation Workbench
- [FAQ](https://github.com/svelderrainruiz/vi-history-suite/wiki/FAQ): FAQ
- [Glossary](https://github.com/svelderrainruiz/vi-history-suite/wiki/Glossary): Glossary
- [Information-Item-Map](https://github.com/svelderrainruiz/vi-history-suite/wiki/Information-Item-Map): Information Item Map
- [Maintainer-Operations](https://github.com/svelderrainruiz/vi-history-suite/wiki/Maintainer-Operations): Maintainer Operations
- [MCP-Server](https://github.com/svelderrainruiz/vi-history-suite/wiki/MCP-Server): Copilot agent-mode MCP server
- [Coordinate-Frames-Emitter-Spec](https://github.com/svelderrainruiz/vi-history-suite/wiki/Coordinate-Frames-Emitter-Spec): Coordinate-Frames Preview Export — Emitter Spec (VHS-REQ-703.9)
- [Quick-Reference](https://github.com/svelderrainruiz/vi-history-suite/wiki/Quick-Reference): Quick Reference
- [Github-Cutover-Runbook](https://github.com/svelderrainruiz/vi-history-suite/wiki/Github-Cutover-Runbook): GitHub Cutover Runbook
- [Github-First-Simplification-Analysis](https://github.com/svelderrainruiz/vi-history-suite/wiki/Github-First-Simplification-Analysis): GitHub-First Simplification Analysis
- [User-Guide](https://github.com/svelderrainruiz/vi-history-suite/wiki/User-Guide): User Guide
- [Vagrant](https://github.com/svelderrainruiz/vi-history-suite/wiki/Vagrant): Vagrant
- [VHS-REQ-706-Recursive-Load-Repro-Brief](https://github.com/svelderrainruiz/vi-history-suite/wiki/VHS-REQ-706-Recursive-Load-Repro-Brief): VHS-REQ-706 — Linux-headless recursive-load: failure-signature & reproduction brief
- [Windows-Hardening-Host](https://github.com/svelderrainruiz/vi-history-suite/wiki/Windows-Hardening-Host): Windows Hardening Host — Provisioning Checklist (VHS-REQ-713)

<!-- sections -->
- [ADR-Index](https://github.com/svelderrainruiz/vi-history-suite/wiki/ADR-Index)
- [ADR-Template](https://github.com/svelderrainruiz/vi-history-suite/wiki/ADR-Template)
- [Agent-Workflows-README](https://github.com/svelderrainruiz/vi-history-suite/wiki/Agent-Workflows-README)
- [Architecture-Packet](https://github.com/svelderrainruiz/vi-history-suite/wiki/Architecture-Packet)
- [Audience-And-Task-Model](https://github.com/svelderrainruiz/vi-history-suite/wiki/Audience-And-Task-Model)
- [CM-Plan](https://github.com/svelderrainruiz/vi-history-suite/wiki/CM-Plan)
- [Coordinate-Frames-Emitter-Spec](https://github.com/svelderrainruiz/vi-history-suite/wiki/Coordinate-Frames-Emitter-Spec)
- [Copilot-Cloud-Agent-MCP-Runbook](https://github.com/svelderrainruiz/vi-history-suite/wiki/Copilot-Cloud-Agent-MCP-Runbook)
- [Copilot-Web-Issue-Generation-Prompt](https://github.com/svelderrainruiz/vi-history-suite/wiki/Copilot-Web-Issue-Generation-Prompt)
- [Delivery-Profile](https://github.com/svelderrainruiz/vi-history-suite/wiki/Delivery-Profile)
- [Development](https://github.com/svelderrainruiz/vi-history-suite/wiki/Development)
- [Devtools-Release](https://github.com/svelderrainruiz/vi-history-suite/wiki/Devtools-Release)
- [Diagnostics-Bundle](https://github.com/svelderrainruiz/vi-history-suite/wiki/Diagnostics-Bundle)
- [Documentation-Workbench](https://github.com/svelderrainruiz/vi-history-suite/wiki/Documentation-Workbench)
- [FAQ](https://github.com/svelderrainruiz/vi-history-suite/wiki/FAQ)
- [Github-Cutover-Runbook](https://github.com/svelderrainruiz/vi-history-suite/wiki/Github-Cutover-Runbook)
- [Github-First-Simplification-Analysis](https://github.com/svelderrainruiz/vi-history-suite/wiki/Github-First-Simplification-Analysis)
- [Glossary](https://github.com/svelderrainruiz/vi-history-suite/wiki/Glossary)
- [Information-Item-Map](https://github.com/svelderrainruiz/vi-history-suite/wiki/Information-Item-Map)
- [Local-Change-Proposal](https://github.com/svelderrainruiz/vi-history-suite/wiki/Local-Change-Proposal)
- [Local-Pr-Evidence](https://github.com/svelderrainruiz/vi-history-suite/wiki/Local-Pr-Evidence)
- [MCP-Server](https://github.com/svelderrainruiz/vi-history-suite/wiki/MCP-Server)
- [Maintainer-Operations](https://github.com/svelderrainruiz/vi-history-suite/wiki/Maintainer-Operations)
- [Navigation-And-Search](https://github.com/svelderrainruiz/vi-history-suite/wiki/Navigation-And-Search)
- [Plan](https://github.com/svelderrainruiz/vi-history-suite/wiki/Plan)
- [Preview-Cache-Fabric](https://github.com/svelderrainruiz/vi-history-suite/wiki/Preview-Cache-Fabric)
- [Quick-Reference](https://github.com/svelderrainruiz/vi-history-suite/wiki/Quick-Reference)
- [Requirements-README](https://github.com/svelderrainruiz/vi-history-suite/wiki/Requirements-README)
- [Requirements-Traceability-Matrix](https://github.com/svelderrainruiz/vi-history-suite/wiki/Requirements-Traceability-Matrix)
- [Software-Requirements-Specification](https://github.com/svelderrainruiz/vi-history-suite/wiki/Software-Requirements-Specification)
- [Style-Guide](https://github.com/svelderrainruiz/vi-history-suite/wiki/Style-Guide)
- [System-Requirements-Specification](https://github.com/svelderrainruiz/vi-history-suite/wiki/System-Requirements-Specification)
- [Test-Plan](https://github.com/svelderrainruiz/vi-history-suite/wiki/Test-Plan)
- [User-Guide](https://github.com/svelderrainruiz/vi-history-suite/wiki/User-Guide)
- [VHS-REQ-706-Recursive-Load-Repro-Brief](https://github.com/svelderrainruiz/vi-history-suite/wiki/VHS-REQ-706-Recursive-Load-Repro-Brief)
- [Vagrant](https://github.com/svelderrainruiz/vi-history-suite/wiki/Vagrant)
- [Windows-Hardening-Host](https://github.com/svelderrainruiz/vi-history-suite/wiki/Windows-Hardening-Host)
<!-- /sections -->
