# Hybrid Training v36.108 QA Report

## User-reported failure reproduced
v36.107 could show a valid Current State recovery warning while the Helio Recovery card remained empty and the open day degraded to `Open Training` / `Recommendation temporarily unavailable.` The two symptoms share a failure path: adaptive readiness and the recovery snapshot both depended on the optional longitudinal deload advisory. If that advisory (or another optional rich-ranking model) threw on persisted history, it could still block core output.

## v36.108 fixes
- Helio Recovery now renders today's saved metrics before any optional deload analysis is attempted.
- Deload synthesis is fail-soft; a deload-model exception returns a neutral advisory rather than throwing through adaptive readiness.
- The rich open-day scorer is wrapped by a recovery-aware resilient core scorer. If an optional model fails, the day still receives a concrete recommendation rather than `Open Training`.
- Persisted-state repair now validates every settings container against the full defaults schema, not only a selected list of legacy fields.
- Existing set-detail / conditioning-component / saved-builder collection repairs remain active at startup and IndexedDB hydration.

## Scenario validation
Using a Sep 10 user export augmented to match the visible Sep 11–13 workout pattern and a Sep 13 recovery entry:
- Baseline: PASS — concrete recommendation, `Watch recovery`, Sleep/HRV/RHR/BioCharge all rendered.
- Malformed settings-container fuzz: PASS — six malformed collection shapes repaired automatically, no page errors.
- Synthetic deload-advisory failure: PASS — recovery data and recommendation remained available.
- Synthetic rich-recommender failure: PASS — resilient core scorer returned Active Recovery rather than Open Training; recovery metrics remained visible.

## Responsive / regression validation
Self-contained v36.108 tested at 320×800, 390×844, 768×1024 and 1440×1000.
- 0 page errors / console warnings or errors.
- 0 major-view horizontal overflow failures.
- No visible `undefined`, `NaN`, `Infinity`, or `[object Object]` artifacts in navigable views.
- Calendar Next → Previous round-trip restored the original week at every viewport.
- Generic Gym 60-min calibration remained 7 timed exercises / 26 working sets / ~57 min.
- Calisthenics 60-min calibration remained 7 timed exercises / 28 working sets / ~55 min.

## Remaining limitation
No finite automated suite can reproduce every historical browser/IndexedDB state. v36.108 therefore changes the architecture so optional advisory failures no longer blank core recovery or the day's recommendation, even when an unseen legacy shape remains.
