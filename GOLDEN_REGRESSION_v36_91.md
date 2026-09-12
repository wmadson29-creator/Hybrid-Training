# v36.91 Golden Regression Summary

A fixed export containing 65 real workout rows and associated recovery/bodyweight state was loaded into both v36.90 and v36.91.

The comparison covered 35 consecutive dates from 2026-08-25 through 2026-09-28. For each date it compared:
- fixed-vs-adaptive session status,
- winning adaptive session,
- adaptive option scores,
- modeled muscle fatigue,
- modeled system fatigue.

It also compared the rendered seven-day week prescription.

Result: **0 mismatches** and the week outputs matched exactly in the final comparison harness.

This is intentional. v36.91 introduces the personal-recovery learner conservatively; current learned muscle multipliers remain close to 1.00× and below the operational meaningfulness threshold, so current prescriptions remain identical to v36.90. The golden baseline is expected to change only when a future model revision intentionally changes logic or when enough personal evidence legitimately activates an individualized modifier.

Permanent invariants also include:
- fixed Barbell Strength / KB anchors cannot be converted to automatic rest,
- fatigue channels remain bounded,
- identical state/date inputs produce deterministic adaptive recommendations,
- personal recovery multipliers stay inside bounded confidence-shrunk guardrails,
- worker refreshes cannot revert newer persisted workout rows,
- long History renders progressively rather than placing all dated history in the DOM at once.
