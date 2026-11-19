---
title: "North-Star Business Case"
sidebar:
  label: "North-Star business case"
editUrl: false
---

*Source: the projectbuddy wiki, `North-Star-Business-Case.md` at commit `331e0eb`. This page is copied as it stands, links to wiki pages that the site doesn't carry go to the wiki.*

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
