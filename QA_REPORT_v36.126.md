# QA Report — v36.126

## Automated validation

`npm test` passes all 80 checks.

The audit covers:

- JavaScript parsing for the service worker, personalization module, actual-load module, and all inline application scripts.
- Build and cache-key agreement across the page, manifest, service worker, storage layer, and version metadata.
- Required deployment files and service-worker precache coverage.
- Planned-duration persistence and auditable actual-load metadata.
- A planned 45-minute swim logged as 20 minutes being classified as under-plan actual work.
- Primary strength sets edited below plan being used directly, without a second partial-completion discount.
- Full-secondary workouts using the same actual-load logic and retaining their role through draft restore, History Edit, and import/export.
- Tolerated versus costly over-plan sessions.
- Unplanned sessions contributing actual dose without inventing a planned comparison.
- Actual-dose-weighted recent workload and confidence-gated capacity learning.
- All prior v36.125 storage, swim, scheduling, gym-library, calendar, and accessibility checks.

## Additional checks

- `git diff --check`: passed.
- `node --check actual-load-feedback-v36.126.js`: passed.
- `node --check adaptive-personalization-v36.120.js`: passed.
- `node --check app-shell-v36.119.js`: passed.
- `node --check sw.js`: passed.

## Browser verification

A browser binary is not installed in this workspace. After deployment, verify that v36.126 appears, reload once if an older service worker controls the first navigation, and complete one test workout to confirm planned and actual values remain distinct in the exported record.
