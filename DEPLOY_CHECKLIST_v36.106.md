# v36.106 Deployment Checklist

- [x] Core build constant is 36.106.
- [x] Manifest start URL is `./?v=36.106`.
- [x] Service-worker build/cache/fallback and shell URLs are v36.106.
- [x] `version.json` declares build 36.106 and all required deployment assets.
- [x] `index.html` references `app-shell-v36.106.css` and `app-shell-v36.106.js`.
- [x] JavaScript syntax checks pass.
- [x] Responsive smoke QA passes.
- [x] Focused v36.105 regression passes.
- [x] Functional diagnostic/model QA passes.
- [x] Recommendation-frequency simulation is near the requested 50% reduction (45.5%).
- [x] Stationary Bike LSS classification issue found in QA is fixed.
- [x] Alphabetical conditioning-cadence tie bug is fixed.
- [x] Gym/Calisthenics long-duration junk-volume overfill is corrected and regression-tested.
- [x] Full second-workout next-day-anchor and Calisthenics/SE preference bypasses are fixed.
- [x] Service-worker required precache is fail-closed; cosmetic icons remain optional.
- [x] Checksums generated after packaging.
- [ ] Live-origin service-worker install/update smoke (environment-blocked here; verify after deployment if desired).
