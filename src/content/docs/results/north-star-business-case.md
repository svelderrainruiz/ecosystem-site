---
title: "North-Star Business Case"
sidebar:
  label: "North-Star business case"
editUrl: false
---

*Source: the projectbuddy wiki, `North-Star-Business-Case.md` at commit `e961433`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

This is the public summary of the north star (VITechnologies/projectbuddy#328): one measured lbabus wiki change, an
improvement to the standard, and a rerun. Figures are relative. The full case, with absolute figures and the
stakeholder deck, is private.

## Result

Under standard `@4`, implementing the change cost **17.6% less AI** to acceptance than the mean of two control runs
under `@2`, in **12.6% less wall-clock** time. The defect the improvement targeted did not recur. It was missing
scope on the test pages of allocated requirements, and it caused every control-run gate resume.

| Run | Standard | AI cost ÷ control mean | Wall-clock ÷ control mean | Gate resumes |
| --- | --- | --- | --- | --- |
| A | `@2` | 1.13 | 1.16 | 1 |
| A2 | `@2` | 0.87 | 0.84 | 2 |
| B | `@3` | 1.12 | 1.48 | 0 |
| B2 | `@4` | **0.82** | **0.87** | 1 |

## How It Was Measured

- **Pre-registered** in VITechnologies/projectbuddy#337: the same baseline commit, a frozen prompt, the same model,
  and a frozen acceptance gate (the reference checker, plus an independent review).
- **Unattended:** each run is a scripted Copilot CLI session with no operator and no route to any remote. A run that
  fails its gate is resumed with the findings until it passes. Its cost is the total.
- **Metered in AI Units,** the unit the quota is billed in. Each run's AI Units come from its own session records,
  and the account quota measured around each step agreed with them, to between −0.04% and +8.8%
  (VITechnologies/projectbuddy#339).

## What Was Learned

- **A rule that is ambiguous can cost more than it saves.** Standard `@3` said that a test page "names the member
  that verifies" a condition it leaves unverified, and a run read that as "prove it". It audited another repository
  and cost 12% more than the control. Standard `@4` takes the verifying member from the allocating specification
  instead. That fixed the problem and paid back its own cost after about 2.5 changes.
- **Operator time is the largest lever.** It was 70.7% of the workstation's baseline cost, and the measured runs
  needed none of it.
- **Caveat:** the two control runs differ from each other by 25%. With one run per treatment, the 17.6% is not
  statistically significant. The effect on the targeted defect was the clearest result.

## Since Then

Figures are relative. The result above is unchanged. What follows is what happened after it, including what did
not work.

### Ecosystem adoption

Every ecosystem member is now pinned to the same standard, `@8` (repo-standards-review v0.12.0). The pin is not
conformance: bringing each member's wiki to zero findings with a current registry export is the remaining work
(VITechnologies/projectbuddy#318, #405).

### Iteration 3: no paid significance test

Showing the 17.6% to be significant would have cost between about 2 and 28 times the pre-registered gate, depending on
the design. A saving of that size would pay back a test only after about 150 runs, so none was run
(VITechnologies/projectbuddy#328).

- **Adopted on mechanism, not on cost.** Gate findings of the targeted class occurred in 2 of 2 control runs and 0 of 2
  treated runs.
- **The saving is plausible but unproven:** under a weak prior the probability of any saving is about 0.7.

### Iteration 4: standard `@8`, and a test that failed its main endpoint

Standard `@5` added a rule that an observation claims no more than its stimulus shows. `@6` to `@8` extended it to named
test cases and files, with an anchored check against the test code (VITechnologies/projectbuddy#379).

- **Pilot:** under `@7`, on pages with a runnable stimulus, a control already had 3.3% unsupported claims (2 of 60
  sampled), not the 26% measured earlier on `@5` pages (VITechnologies/projectbuddy#362, #398). The test was therefore
  re-registered before any registered run (A4-r2), as a test of the standard stack: `@8` with its anchored check
  against `@5`-era authoring.
- **Design:** 18 pages, each authored under both arms, then audited blind by two reviewers (a third read on
  disagreements). Reference claims were frozen first.

| Endpoint | `@5`-era control | `@8` treatment | Outcome |
| --- | --- | --- | --- |
| Unsupported claims (primary) | 2.8% | 3.3% | **Failed:** +0.7 points pooled (treatment − control); page-mean difference control − treatment −0.7 points, 95% interval −3.5 to +2.2; one-sided p = 0.68 |
| Supported claims retained (91 reference claims) | 92.3% | 87.9% | Passed: −4.5 points, interval −12.6 to +3.1, non-inferior at the 0.20 margin |

The decision rule gives **adopted on mechanism only**, so `@8` stays opt-in. Because the treatment rate is nominally
above the control rate, the rule's last line also applies: the rule wording is re-opened. The primary endpoint had no
room: the control was already at 2.8%, so the 26% did not reproduce for these authors on runnable pages. This is read
as no measurable difference, not as harm. The origin of the 26% is unexplained. Candidates are prose stimuli, other
authors, the earlier labelling, and the author model (VITechnologies/projectbuddy#399).

**Limits:**
- one author model, and reviewers from one model family;
- sessions are confounded with the arm (three sessions each);
- blinding was to the arm label, not to the page form;
- the control used a shape-only gate, so the arms differ in standard text and in gate;
- items on each page were sampled (at most 12 a page), so the figures are weighted estimates;
- agreement between reviewers on unsupported claims was good, not high (kappa 0.60).

### Iteration 5: what a local GPU is worth

Figures are relative. Each number is labelled measured, estimate or to be measured. The ceiling is not a saving.

#### Key figures

| KPI | Definition | Current value | Status |
|---|---|---|---|
| Addressable ceiling | Share of paid AI spend in retrieval and memory calls, the work a local model is used for | 12.5% of paid AI (upper bound) | measured |
| That ceiling as a share of total program cost | Ceiling times the page's own AI share of total cost (about 10%) | about 1% | estimate |
| Context-feasible ceiling, 32,000-token window | Share of those calls' spend whose input fits in 32,000 tokens, times the ceiling | 2.5% of the 12.5%, about 0.3% of paid AI | measured |
| Context-feasible ceiling, 128,000-token window | Same, for 128,000 tokens | 18.1% of the 12.5%, about 2.3% of paid AI | measured |
| Realized share | Share of AI work that ran on local assets | about 0% | measured |
| Quality gate | Accuracy of the best local judge on audited claim labels, against the bar | 0.78 (upper bound 0.87) against 0.90 | measured on the workstation; the operator-owned AI computer is to be measured |
| Cost per million tokens, local against paid | Local cost (power and hardware) over tokens generated, against the paid price | not available | to be measured |

The ceiling is not a saving. It assumes a local model that serves those contexts at the quality bar, and it ignores the cost of running it.

#### How the ceiling was measured

Source: the KPI ledger of model calls, 47,681 calls in 88 sessions from 2026-08-05 to 2026-11-20 (calls with a recorded cost). Each call has a category describing what it did: run 73.7%, explore 12.3%, edit 5.8%, respond 3.5%, delegate 2.9%, ask 1.7%, memory 0.2% of spend. Explore (reading and searching) and memory are the retrieval work: 12.5% together; with every respond call added the bound is at most 16%.

The calls in that work are not small. The median explore call carried about 141,800 input tokens and the 90th percentile about 565,500 (memory calls: 189,400 and 660,000). Counting only calls whose input fits a window, the share of that spend is 1.1% for 8,000 tokens, 2.5% for 32,000 and 18.1% for 128,000 (by number of calls: 2.4%, 6.2% and 45.6%). Local models with 8 GB to 16 GB of memory mostly work in the smaller windows. That is why the context-feasible numbers sit far below the ceiling.

#### Local AI assets today

- Workstation GPU (8 GB of video memory, measured): the model server is not running.
- Farm tables: one run of 6 jobs, with an estimated total saving smaller than the cost of one typical paid call (estimate from a plan reference cost); device utilization has no samples.
- Operator-owned AI computer (NVIDIA Jetson Orin NX 16 GB, vendor data: 16 GB unified memory, 157 TOPS).
- Value realized today: about zero.

#### Quality: the question that decides it

The bar is 0.90 accuracy on audited claim labels. A model is below the bar if the upper bound of its accuracy interval is under 0.90, clears it if the lower bound is at least 0.90, and is inconclusive at that sample size otherwise; the sample size is always shown. This rule is fixed before the measurement. The measurement on the AI computer is one benchmark run that returns aggregates only.

#### Capacity

| System | Memory for models | Status |
|---|---|---|
| Workstation GPU | 8 GB video memory | measured |
| Jetson Orin NX 16 GB | 16 GB unified memory | vendor |

#### Price per unit of input, by model (ratio)

The ledger gives the AI cost per million input tokens by model. Setting claude-opus-5.5 to 1.00: claude-sonnet-5 is 0.50 and claude-sonnet-5.5 is 0.52 (measured, 21,723, 14,605 and 6,871 calls). This compares price per input token, not quality. Routing routine work to the cheaper models changes spend without new hardware; it is a lever next to the local GPU, and its effect on quality is not measured here.

#### What one measurement would settle

One benchmark on the AI computer returns, per model: generation speed, memory in use and judge accuracy with its interval and the decision above. If a model clears the bar, the ceiling becomes a target for that class of work, limited by the context windows above; if not, the local GPU stays a retrieval and drafting tool.

### GPU measurement as a feedback loop for local models (proposed)

*Added on this site. This section is not in the wiki page that the rest of this page is copied from.*

Today the [labview-benchmark-actor](https://github.com/svelderrainruiz/labview-benchmark-actor) VS Code extension
(release 1.6.7) offers 13 [tools](https://github.com/svelderrainruiz/labview-benchmark-actor/blob/main/docs/mcp-tools.md)
to agents over the Model Context Protocol, and a local Ollama model can call them through a command-line bridge. When it
captures a LabVIEW launch, it records the screen at 12 frames a second with processor, memory and disk samples. It does
not measure the GPU. In the 1.6.7 review, a small local model (qwen3:4b, served by Ollama in the reviewer virtual
machine) listed the 13 tools but did not call them; in the next test the default Copilot model called the extension's
tool and passed. No GPU data was recorded, so the review cannot say why the local model did not call them.

The proposal: record GPU use, video memory in use, temperature and clock speed next to the existing samples, on the
same time axis, while a local model, for example a Gemma 4 build, calls the tools. The trace then points to a cause
and to the next change to try:

- **Video memory full,** part of the model running on the processor: slow replies or time-outs. Try a smaller model,
  a smaller quantisation or a shorter context.
- **Temperature up and clocks down:** thermal throttling. Fix cooling or power settings before judging the model.
- **GPU idle while the model answers:** the model runs on the processor. Check the driver and the model server.
- **GPU healthy, still no tool call:** not a resource problem. The model or its tool setup is the cause, so try
  another model.

After each change the same prompt runs again and the traces are compared. This is not built or measured yet.

### The cost shape across the program

- **Operator time dominates.** In the KPI ledger, AI is about 10% of total cost and operator time about 90%
  (`projectbuddy-kpi report`, 2026-11-19, read-only). The 70.7% above was the workstation baseline at the time.
- **A zero-overage cycle is the target, not yet a result.** Context hygiene, model routing and a metered burn aim to cut
  paid AI by about 95% from the 2026-12-01 billing cycle (VITechnologies/projectbuddy#375).
- **The local farm is not cost-effective at this volume.** Its first measured workload avoided about 2% of the AI that
  measuring it cost (VITechnologies/projectbuddy#378).
- **A local judge stopped below its bar.** The best local model reached 0.78 accuracy on audited claim labels (upper
  bound 0.87) against a bar of 0.90. Local models are used only for retrieval and drafting, and the heuristic labels
  were wrong for 31% of claims (VITechnologies/projectbuddy#358).

## Next

- Bring each member's wiki to zero findings under `@8`, with a current registry export (the conformance work behind
  the pin).
- The question of where the 26% came from is closed for now, with `@8` opt-in on mechanism. A cheap re-audit of the
  earlier pages stays as low-priority backlog (VITechnologies/projectbuddy#399).
- Measure the zero-overage cycle after 2026-12-01 against its target, from the KPI ledger.
- Continue evidence-first verification: execution and mutation evidence, and deterministic gates, which need no judge
  (VITechnologies/projectbuddy#358).
- No further significance run is planned. Revisit it only if the cost of a run falls well below the gate.
