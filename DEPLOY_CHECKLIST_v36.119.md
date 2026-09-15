# Hybrid Training v36.119 — Deploy Checklist

1. Upload the runtime files from this folder together: `index.html`, `app-shell-v36.119.css`, `app-shell-v36.119.js`, `stretching-flexibility-v36.119.js`, `manifest-v36.webmanifest`, `sw.js`, and `version.json`.
2. Do **not** clear browser/app data and do not re-import history just for this update. Existing localStorage/IndexedDB state is intentionally migration-compatible.
3. Confirm `version.json` reports build `36.119` after deployment.
4. Confirm the deployed `sw.js` uses cache key `hybrid-training-v36-119-conditioning-perf1`. This cache revision forces the corrected runtime/assets into a fresh service-worker cache without changing the persisted app-data schema.
5. Re-open the app normally. Verify Today labels conditioning as **LSS / Aerobic** or **Sprints / HIC** rather than a generic Conditioning title where a family is known.
6. Verify the Home Secondary section shows all six simultaneous choices: Model recommended, Recommended short, Custom short, Recommended full, Custom full, and No secondary.
7. Open Custom short and Custom full once and verify the appropriate family choices appear without changing the primary workout.
8. Open Trends and verify separate **LSS / Aerobic** and **Sprints / HIC** filters.
9. Spot-check calendar/day switching on mobile. It should respond promptly rather than exhibiting the prior multi-second post-render delay.
10. Confirm More → Stretching & Flexibility still opens and remains standalone/non-logged.
11. Keep `SHA256SUMS_v36.119.txt` with the release artifacts so deployed files can be compared with this package.
