# Hybrid Training v36.119 — QA Report

## Scope

This release changes multi-session scheduling logic and adds one startup-resilience guard around the existing v36.91 durable-storage hydration path. No workout category or visual layout system was redesigned.

## Exact-state tests using the current user export

Using `hybrid-training-export (14).json`:

- 2026-09-19: primary = Generic Gym; planned second main = LSS Swim 40–50 min.
- 2026-09-20: primary = Conditioning; no second main.
- The weekend therefore contains three main workouts across two days, with the double on Saturday rather than being forced to Sunday.
- Runtime diagnostics remained empty during the targeted weekend test.

A synthetic QA-only recovery degradation was applied to Saturday 2026-09-19. With Saturday recovery materially worse, the allocator moved the double to Sunday instead of preserving Saturday. This verifies that weekend placement is dynamic rather than date-hardcoded.

## Hybrid-phase weekday-double test

Using the same user state projected into the 2-Barbell + 3-KB phase:

- 2026-10-20 KB Heavy: LSS Run 30–40 min is planned as a second full session.
- 2026-10-23 KB Power: no second full session.
- 2026-10-27 KB Heavy: no second full session.
- 2026-10-30 KB Power: LSS Swim 30–40 min is planned as a second full session.

This verifies that weekday doubles actually occur under high-need / compatible conditions but do not attach to every KB or Barbell anchor. The planner uses a rolling spacing window and a materially higher score threshold than the weekend allocator.

## Guardrails checked

- Recovery guard can suppress automatic doubling.
- Low-impact aerobic work is favored when tissue load is elevated.
- Hard running receives a larger same-day interference cost next to strength/power work.
- A fixed next-day Barbell/KB anchor raises the threshold for another strength-oriented full session.
- Manual override remains available when the model stops at one full workout.
- A skipped optional second workout is not written as completed and therefore does not satisfy future adaptation dose.

## Storage migration / startup compatibility

The final release runs a source-exact compatibility harness against the `v3691Init` and `v3691MergeBootIntoSnapshot` functions extracted from this release build. Browser/DOM dependencies are stubbed so the test isolates migration and hydration behavior rather than browser implementation speed.

Using the current export as the legacy full-state fixture (90 log rows, 19 recovery days, 3 bodyweight measurements, 2 rest-day entries):

- Legacy full localStorage state reaches the authoritative render intact and creates the one-time migration safety copy.
- Compact boot-journal + durable IndexedDB state rehydrates correctly. A synthetic durable-only pre-window workout row and recovery day were preserved while recent boot data replaced the overlapping recent window.
- A deliberately never-resolving IndexedDB hydration request no longer leaves the app behind the startup render gate. The release falls back to the boot journal + migration safety state after a bounded 2.4-second hydration wait.
- Immediate IndexedDB failure uses the same safety fallback and preserves the durable-only test history.
- The IndexedDB open helper itself now has a 3.5-second upper bound, preventing self-check, restore-list, and background persistence calls from waiting forever on a blocked request.

The QA-only accelerated timeout harness completed the four compatibility scenarios successfully. The production timeout constants remain 2.4 s for first-render hydration and 3.5 s for a raw IndexedDB open.

## Runtime / static checks

- `node --check` passes for `app-shell-v36.119.js`.
- Every executable inline script in `index.html` parses successfully with Node.
- Targeted current-data tests produced zero runtime diagnostics and zero page/console errors before the final storage-only startup guard; the final patch does not touch recommendation or layout rendering code.
- Responsive smoke testing at 320×800, 390×844, 768×1024, and 1440×1000 showed zero horizontal overflow and no `undefined`, `NaN`, or `[object Object]` leakage before the final storage-only guard.
- `version.json`, service-worker build/cache identifiers, manifest query version, shell filenames, and HTML shell references are all v36.119.
- Release-document scan found no stale Sunday-owned allocator language other than statements explicitly explaining that the old forced-Sunday behavior was removed.
- SHA-256 checksums were regenerated after the final source and documentation pass.

## Standalone Stretching & Flexibility add-on

This additive utility is deliberately isolated from HybridCore and the training-state write paths. It adds a More-menu/desktop navigation view that generates non-logged stretching routines from three explicit inputs: selected body regions, time available, and equipment available right now.

- Granular region selection covers upper body, hips/torso, and lower body rather than broad limb-only categories.
- Available equipment filters the candidate movement library; equipment-dependent movements are excluded unless the tool is selected.
- Every generated card must directly target at least one selected region; secondary-target overlap can only improve ranking.
- 5/10/15/20/30-minute routine generation, empty-state handling, equipment-specific scenarios, YouTube links, and 320 px horizontal-overflow behavior were tested in the standalone browser harness.
- `stretching-flexibility-v36.119.js`, `app-shell-v36.119.js`, and `sw.js` pass syntax checks.
- The feature does not log a session, write recovery, call recommendation/scheduling state mutations, or provide automatic recommendations.

See `STRETCHING_FLEXIBILITY_RESEARCH_v36.119.md` and `STRETCHING_FLEXIBILITY_QA_v36.119.md` for the evidence basis and feature-specific test details.

## Important interpretation

Future recommendations are forecasts, not commitments. They are recalculated from completed history, current recovery, tissue load, learned interference, and remaining development need. A future double-session slot can therefore move after real workouts are completed or skipped.

## Landmine single-ended loading regression fix

The recurring landmine loading defect was traced to the Generic Gym plan-conversion path, which was collapsing every `equipment:"Barbell"` exercise to the boolean `bar:true`. That bypassed the already-correct `plateVisual:"landmine"` metadata when Today cards were rendered, so a 50-lb Half-Kneeling Landmine Press could incorrectly display `2.5 / side`.

The fix is now enforced at multiple levels rather than as an exercise-specific patch:

- `isLandmineExercise()` is the single classification helper and recognizes both library metadata (`plateVisual:"landmine"`) and any exercise name containing `landmine` for custom/renamed variants.
- Generic Gym plan conversion now preserves `bar:"landmine"` instead of reducing landmine movements to `bar:true`.
- The universal core/gym plan row path uses the same classification.
- `appendExerciseCard()` passes the exercise name into the plate renderer, and `visualLoad()` independently re-resolves landmine status before rendering. This is the final UI invariant, so an upstream boolean-bar regression cannot make a landmine card symmetric again.
- Log-view plate helpers continue to label landmine load as total implement weight: 45-lb bar plus plates on the single loaded end.

Regression checks against the exact release helper functions pass:

- Half-Kneeling Landmine Press, 50 total -> **5 on loaded end**, **1×5**, anchored end **no plates**, and no `/ side` text.
- Landmine Row, 70 total -> **25 on loaded end**, no `/ side` text.
- Custom Rotational Landmine Press, 50 total -> caught by the name fallback and rendered single-ended.
- Barbell Bench Press, 95 total -> remains **25 / side**, confirming ordinary barbells are unchanged.
- Every executable inline script in both packaged `index.html` and the self-contained HTML passes `node --check` after the patch.

---

## Final conditioning-family/performance addendum
The final packaged runtime additionally passed the v36.119 conditioning-family/performance audit documented in `CONDITIONING_FAMILY_PERFORMANCE_QA_v36.119.md`:
- LSS / Aerobic and Sprints / HIC are split across the current user-facing planning/log/history/trends surfaces while legacy stored `Conditioning` values remain compatible.
- The six-choice Home Secondary matrix replaces the legacy Optional Secondary/final-second-panel UI.
- Headless current-data regression showed no page or console errors.
- Tested day switches were in the millisecond range (about 4.3–97.5 ms on the measured visible days) and repeated full same-state renders were about 9.9–13.7 ms.
- 320, 390, 768, and 1440 px viewports showed no document-level horizontal overflow.
