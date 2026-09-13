# v36.107 Deployment Checklist

- [x] Root cause from the v36.106 real-device screenshot reproduced.
- [x] Malformed persisted set-detail/component arrays repaired before model use.
- [x] IndexedDB hydration runs the same repair.
- [x] Main Today rendering is fault-isolated.
- [x] Built-in self-check includes persisted row-shape validation.
- [x] 8/8 malformed-history regression variants pass.
- [x] 4 responsive viewport regressions pass with no errors/overflow.
- [x] Conditioning lane/context/recovery/third-workout behavioral regressions pass.
- [x] JavaScript syntax passes.
- [x] Live DOM contains no duplicate IDs.
- [x] `version.json`, service worker, manifest, shell filenames, and `index.html` all use 36.107.
- [x] Required service-worker shell precache remains fail-closed.
- [x] Checksums regenerated after final packaging.
- [ ] Real-phone installed-PWA update/takeover smoke after deployment.
