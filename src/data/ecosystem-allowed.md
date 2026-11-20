# Ecosystem

<!-- page-kind: note -->
The repositories below form the ecosystem whose wikis share one standard ([#318](https://github.com/VITechnologies/projectbuddy/issues/318)). They are recorded as sources of one
local RSR requirement-registry constellation; this page is the human-readable list.

| Repository | Role | Visibility | Wiki |
| --- | --- | --- | --- |
| [repo-standards-review](https://gitlab.com/svelderrainruiz/repo-standards-review) | the standard every member is assessed against | private | private; 76 requirement pages and 83 test pages (38 canonical, 45 stub), not exported to the registry; [public summary](RSR-Summary) |
| [projectbuddy](https://github.com/VITechnologies/projectbuddy) | VM, runner and SBOM engine; hosts the wiki generator | public | standardized; 133 requirement pages (1 retired), 35 system pages, 133 test pages (96 canonical, 37 stub); registry export at ac8352d |
| [labview-benchmark-actor](https://github.com/svelderrainruiz/labview-benchmark-actor) | VS Code extension for LabVIEW launch capture and benchmarking, released on the Marketplace | public | standardized; 103 requirement pages and 103 test pages (97 canonical, 6 stub); registry export at 3bcdbdd |
| [vi-history-suite](https://github.com/svelderrainruiz/vi-history-suite) | VS Code extension for VI history; a Marketplace release needs a CI change | public | standardized; 141 requirement pages and 141 test pages (22 per-case plus 115 file-level canonical, 4 stub); registry export at 712c018 |
| [mprr](https://gitlab.com/svelderrainruiz/mprr) | aligned to labview-benchmark-actor's shared contract | private | private; 184 requirement pages and 148 test pages (146 with execution evidence, 2 described in prose), exported to the registry; [public summary](mprr-Summary) |
| [lbabus](https://github.com/svelderrainruiz/lbabus) | coordination bus split from labview-benchmark-actor | public | standardized; 8 requirement pages and 8 canonical test pages; registry export at bc555c3 |
| [repo-standards-review-consumer-kit](https://github.com/svelderrainruiz/repo-standards-review-consumer-kit) | RSR's published consumer template | public | standardized, no requirements of its own (registry export at a7df0a0) |

Private members follow the same wiki standard; stakeholders see a public summary page for each. The [ecosystem site](https://svelderrainruiz.github.io/ecosystem-site/) presents all seven members together, with counts only for the private ones.
