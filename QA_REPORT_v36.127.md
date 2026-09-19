# QA Report — v36.127

## Automated validation

`npm test` passes all 99 checks.

New coverage verifies:

- The export finalizer uses the real top-level `adaptiveProgramming` model and executes against a representative payload without throwing.
- Missing optional export metadata cannot block core backup generation.
- Automatic mixed training spaces dedicated speed primaries by six days, while explicit conditioning/running priorities and short focus blocks retain their intended exceptions.
- Recent speed work changes the next automatic conditioning lane to aerobic work.
- Two flexible conditioning primaries without flexible strength work trigger modality variety, while an existing flexible-strength exposure, manual choice, or recovery guard prevents a forced change.
- Height, arm span, waist, body-fat method, import normalization, export snapshot, and context-only guardrails are present.
- The new forecast module is parsed, required by version metadata, loaded by the page, and precached by the service worker.

All cumulative checks still cover actual-versus-planned load, unplanned workouts, full second sessions, swimming stroke/pool handling, storage durability, import rollback, expanded gym ab machines, calendar colors, accessible labels, and build/cache agreement.

## Additional checks

- `git diff --check`: passed after final cleanup.
- `node --check forecast-balance-v36.127.js`: passed.
- `node --check actual-load-feedback-v36.126.js`: passed.
- `node --check adaptive-personalization-v36.120.js`: passed.
- `node --check app-shell-v36.119.js`: passed.
- `node --check sw.js`: passed.

## Browser verification

No browser binary is installed in this workspace. The full application was also attempted under jsdom, but its initialization did not complete in a practical test window. The export defect is covered by executing the isolated production finalizer against a representative payload, not only by text matching. After deployment, reload once if an older service worker controls the first navigation, then run one JSON export and inspect the next seven forecast days.
