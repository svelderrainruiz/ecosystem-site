---
title: "lbabus"
sidebar:
  label: "lbabus wiki"
editUrl: false
---

*Source: the lbabus wiki, `Home.md` at commit `bc555c3`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

`lbabus` is the coordination bus CLI of the LabVIEW Benchmark Actor (LBA) ecosystem. This wiki holds its
requirements under the ecosystem wiki standard (`rsr/ecosystem-wiki-standard@8`), with the profile in
`.wiki-profile.json` (`rsr/wiki-profile@2`).

## Requirements

lbabus's requirements are allocated from LBA's: the non-superseded LBA requirements whose code references include
a file of lbabus's code (`tools/collab-cli/`). Each keeps its LBA ID and LBA's text, from [LBA's specification](https://github.com/svelderrainruiz/labview-benchmark-actor/blob/3534e4b/docs/requirements/srs.md) at
`3534e4b`. LBA's specification stays the source of truth for the whole system.

| Requirement | Title | Test | Status |
| --- | --- | --- | --- |
| [LBA-REQ-012](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-012) | Version-pinned agent base instructions | [T-012](https://github.com/svelderrainruiz/lbabus/wiki/T-012) | Proven |
| [LBA-REQ-059](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-059) | Host<->VM-agent closed loop over the lbabus net TCP bus | [T-059](https://github.com/svelderrainruiz/lbabus/wiki/T-059) | Proven |
| [LBA-REQ-060](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-060) | Live-only net coordination -- the receive-log + net poll read side | [T-060](https://github.com/svelderrainruiz/lbabus/wiki/T-060) | Proven |
| [LBA-REQ-065](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-065) | Flip the coordination default to net + graceful no-op when unconfigured | [T-065](https://github.com/svelderrainruiz/lbabus/wiki/T-065) | Proven |
| [LBA-REQ-067](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-067) | Remove the GitHub-Discussion transport from the lbabus CLI | [T-067](https://github.com/svelderrainruiz/lbabus/wiki/T-067) | Proven |
| [LBA-REQ-095](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-095) | System-level SemVer, task chronology, and canonical distribution | [T-095](https://github.com/svelderrainruiz/lbabus/wiki/T-095) | Proven |
| [LBA-REQ-098](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-098) | Signed autonomous actor protocol | [T-098](https://github.com/svelderrainruiz/lbabus/wiki/T-098) | Proven |
| [LBA-REQ-099](https://github.com/svelderrainruiz/lbabus/wiki/LBA-REQ-099) | Persistent lbabus autonomous actor service | [T-099](https://github.com/svelderrainruiz/lbabus/wiki/T-099) | Proven |

Each test page runs lbabus's Docker CI harness (`tools/collab-cli/ci`) at lbabus `2b7b1f1b22d36afd6390ea8eb56b8714923136f7` and lists the cases that exercise its requirement. The cases verify the lbabus-side conditions of `LBA-REQ-012`, `059`, `060`, `065`, `067`, `098` and `099`; each page says which conditions it does not verify and which member verifies them, and no page claims a requirement is covered in full. No case exercises `LBA-REQ-095`, which its page declares not verified here. The `Status` column and each requirement page's `Status` section are LBA's status for the requirement, allocated with its text; this wiki does not claim it.
