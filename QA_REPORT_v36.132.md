# QA Report — Hybrid Training v36.132

## Result

- **176/176 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- `git diff --check` passed.
- Build, manifest, service-worker cache keys, loaded modules, and required deployment files agree on v36.132.

## Recovery regression reproduction

In v36.131, `dailyRecoveryFor(date)` passed its default `null` timestamp to a numeric finiteness check. JavaScript converts `Number(null)` to `0`, so the selector searched for an observation recorded on or before Unix timestamp zero and returned `null`. The stored record remained present, which is why its raw fields still appeared in History while the derived readiness label said `No data`.

## Fix verification

- An omitted, `null`, `undefined`, empty, or invalid as-of value returns the current saved observation.
- A real as-of timestamp returns the newest eligible observation and returns `null` when no observation yet existed.
- The supplied export contains 30 recovery days before migration and 30 afterward.
- All 30 migrated records are accessible through the normal current lookup.
- All 30 migrated records are accessible at their stored observation timestamps.
- No recovery row is mutated or deleted by the selector.

## Supplied export audit

The read-only export audit still passes with zero errors and two pre-existing data-quality warnings: 23 legacy strength rows carry irrelevant planned-minute values, and one swim row has a distance/pool-length mismatch. Neither warning relates to recovery storage.

## Day-context persistence audit

- The supplied export contains `traveling: true` on 2026-09-23 and 2026-09-24; the user confirmed only 2026-09-24 was intentional.
- The save path was working, but History did not render day context and the Home quick control gave no saved confirmation.
- Meaningful day context is now included in the History date index and rendered on desktop and mobile.
- Edit opens that exact date's context panel. Clear removes only that date's context and offers undo.
- Travel toggles and the full environment selector now canonicalize to the same `traveling`/`travel_indoor` state.
- Automated checks cover canonicalization, summary visibility, History controls, and Home confirmation.

## Browser status

The mobile browser walkthrough remains included in GitHub Actions. This workspace does not contain the Playwright Chromium binary, so the rendered suite could not be run locally; GitHub Actions installs Chromium before executing it.
