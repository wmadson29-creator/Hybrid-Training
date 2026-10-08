# Hybrid Training v36.156 — QA

243 focused checks passed with the supplied export: static 22, physical KB layout 43, browser/PWA 90, approved UI workflows 50, pre-start preparation and internal-plate optimization 30, compact helper/performance 8. Preparation and helper suites also passed 38 checks with empty history: 281 checks across the two datasets. Historical release counts are not added to this result.

- 100 clock updates caused zero mutations in the exercise-card subtree; measured total clock update time was about 0.7 ms in headless Chromium. Ten unchanged helper renders caused zero content rebuilds.
- Weight edits refresh without a timer tick. Identical paired setups share one row, with each plate represented once. Assumptions appear in the inventory section rather than every card.
- Independent plate optimization reference checks, exact target totals, unavailable-target handling, separate physical bell states and alternative inventories pass.
- Pre-start saved edits and active-workout reload preserve edited exercise prescriptions. Completed History remains unchanged.
- Phone screenshots reviewed; no horizontal overflow or browser errors in the helper test. Plate chips use the existing theme border variable.
- Browser suite covers workout pause/resume, persistence, service worker update and offline behavior. All nine previously approved UI workflows pass.

Limits: these are desktop headless Chromium measurements at a phone viewport, not an Android hardware benchmark. This release removes known recurring helper work; it does not establish a universal startup or scrolling speed. Physical stack order is still not inferred. The default 12 kg shell remains a labelled assumption, with editable inventory.
