# QA Report — v36.125

## Automated validation

`npm test` runs the repository's executable source and deployment audit. All 60 checks pass.

The audit covers:

- JavaScript parsing for the service worker, personalization module, and all three inline application scripts.
- Build and cache-key agreement across the page, manifest, service worker, storage layer, and version metadata.
- Existence of every required runtime and service-worker asset.
- Direct personalization loading and removal of service-worker HTML rewriting.
- Durable write sequencing, failure propagation, late-hydration reconciliation, verified imports, and durable rollback.
- Actual-versus-planned workout logging and edited-set linkage through save and restore.
- Separate run, swim, and cardio cadence lanes; inclusive 7/14-day windows; bounded multi-card aggregation; and one-time stroke-fatigue accounting.
- Stroke-aware swim comparisons, mixed-stroke block persistence, and custom pool-length handling.
- Muscle-specific frequency and weak-area logic plus comparable-protocol whole-athlete benchmarks.
- Expanded gym ab-machine coverage and per-side prescription for unilateral movements.
- Calendar recommendation synchronization, plain-language recommendation copy, dynamic label checks, unique static IDs, and distinct completed/secondary calendar cues.

## Additional checks

- `git diff --check`: passed.
- `node --check app-shell-v36.119.js`: passed.
- `node --check adaptive-personalization-v36.120.js`: passed.
- `node --check sw.js`: passed.

## Deployment verification

A browser binary is not present in the build workspace, so the final installed-PWA/mobile visual pass should be performed after deployment. Confirm that v36.125 is shown, the service worker has refreshed, custom pool lengths persist, and completed calendar rows appear green with a checkmark while secondary prescriptions remain teal.
