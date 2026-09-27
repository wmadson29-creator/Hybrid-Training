# QA Report — Hybrid Training v36.136

## Result

- **195/195 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- Build, manifest, service-worker namespace, loaded modules, and required deployment files agree on v36.136.
- `git diff --check` reports no whitespace errors.

## v36.135 regression and correction

The v36.135 calendar-default fix made the resolution guard date-specific. That allowed a recommendation for one calendar date to start complete recommendation calculations for neighboring dates while the first calculation was still active. Those nested scorers inspect their own nearby schedules, producing a rapidly expanding dependency graph during initial rendering.

v36.136 restores the global in-progress guard while preserving the non-caching behavior that fixes the original stale-default bug.

Regression coverage now requires all of the following:

- only one full open-day dependency walk can be active;
- nested dependency results are marked `transientResolutionFallback`;
- transient values cannot enter the final recommendation cache;
- `expectedSession` neither reads nor writes its stable cache during dependency evaluation; and
- a subsequent canonical request resolves normally after the dependency walk ends.

## Preserved behavior

- The correct Generic Gym primary and easy-swim secondary scoring is unchanged.
- Recovery aggressiveness, stress budgets, fixed anchors, and secondary thresholds are unchanged.
- Automatic Gym exercise variety remains enabled.
- Workout history and recovery data require no migration or repair.

## Browser status

The repository browser test waits for both `HybridCore` and a rendered calendar card. That step would time out on the v36.135 loading regression. GitHub Actions installs Chromium and remains the authoritative real-browser run because Playwright is not installed in this transient workspace.
