# QA Report — Hybrid Training v36.135

## Result

- **194/194 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- Build, manifest, service-worker cache keys, loaded modules, and required deployment files agree on v36.135.
- `git diff --check` reports no whitespace errors.

## Root-cause verification

The supplied screenshot showed three conflicting surfaces for the same open day:

- the calendar and selected-day header displayed **Active Recovery**;
- the recommendation panel displayed **Generic Gym**; and
- the recommended selection tile also displayed **Generic Gym**.

The exported model state did not support a recovery-day decision: there was no recovery guard, deload, or over-budget stress signal, and the live recommendation had already resolved to Gym. The defect was a temporary same-date fallback being cached by `expectedSession` and the final open-day wrapper during nested schedule evaluation.

Regression coverage now verifies that:

- only a same-date recursion can return the temporary fallback;
- that result is explicitly marked transient;
- the final recommendation cache never stores it;
- `expectedSession` does not read or write its stable cache during a dependency probe; and
- after the probe ends, the calendar session equals the canonical recommendation.

## Gym-variety verification

Regression coverage verifies that automatic Gym plans:

- inspect completed full Gym sessions while excluding short secondary work and untimed core finishers;
- score recent exact repetition separately from exercise-specific progression;
- favor unused comparable exercises without bypassing focus, equipment, or movement-slot constraints;
- cap exact overlap with the last comparable full workout at roughly 40% when valid alternatives exist;
- protect a clearly progressing lift more than an interchangeable accessory; and
- leave manual Gym-builder output exempt from forced rotation.

The browser suite creates one synthetic completed Gym plan, builds the next automatic plan, and checks the actual exercise-name overlap rather than relying only on source-string assertions.

## Export audit

The corrected current export passes with zero errors and one warning. It contains:

- 149 exercise rows across 39 logged sessions;
- 32 recovery days;
- six bodyweight entries;
- four rest-day records;
- zero swim distance/pool-length mismatches;
- zero mismatched secondary-outcome links; and
- zero historical primary-intent mismatches.

The one warning is for 23 preserved legacy strength rows containing obsolete planned-minute fields. Current classification explicitly ignores that field for strength, so rewriting historical records would add risk without changing model behavior.

## Browser status

`tests/browser-qa.js` includes the new canonical-default and Gym-rotation behavioral checks. Playwright is not installed in this transient workspace, so the local result is the 194-check static/model suite; the repository’s GitHub Actions workflow installs Chromium and is the authoritative real-browser run.
