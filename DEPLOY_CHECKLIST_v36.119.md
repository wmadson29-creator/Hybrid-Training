# Hybrid Training v36.119 — Deploy Checklist

1. Upload the runtime files from this folder together: `index.html`, `app-shell-v36.119.css`, `app-shell-v36.119.js`, `manifest-v36.webmanifest`, `sw.js`, and `version.json`.
2. Do **not** clear browser/app data and do not re-import history just for this update. Existing localStorage/IndexedDB state is intentionally migration-compatible.
3. Confirm `version.json` reports build `36.119` after deployment.
4. Re-open the app normally and allow the service worker to move to cache `hybrid-training-v36-119`.
5. On first launch after the update, verify the dashboard reaches its normal authoritative render. If IndexedDB is temporarily blocked/stalled, the startup fallback should use the recent boot journal + safety copy instead of leaving the shell loading indefinitely.
6. Spot-check a future weekend: only one of Saturday/Sunday should normally own the third main weekend workout, and that day may change when recovery/future-anchor context changes.
7. In the future Hybrid phase, verify that occasional KB + aerobic weekday doubles appear without being attached to every KB day.
8. Keep the packaged `SHA256SUMS_v36.119.txt` with the release artifacts so deployed files can be compared against the finalized package.


## Stretching & Flexibility add-on
- [ ] `stretching-flexibility-v36.119.js` is deployed beside the app shell.
- [ ] `app-shell-v36.119.js` can load the standalone utility.
- [ ] Service-worker cache key is `hybrid-training-v36-119-sf1` and the utility script is in required precache.
- [ ] Confirm the More-menu entry opens the standalone utility and no workout/history entry is created.
