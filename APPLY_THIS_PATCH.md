# Apply Hybrid Training v36.132

This ZIP is an exact content delta from GitHub `origin/main` at commit `44f793a` (v36.131). It contains only files that are missing from or byte-different from that GitHub baseline. It excludes the private training export, screenshots, `.git`, dependencies, and every unchanged repository file.

Upload the ZIP contents at the repository root and preserve the `.github/` and `tests/` directories.

## Recovery-readiness hotfix

v36.131 retained the recovery records but its new historical-observation selector treated the default `null` argument as timestamp zero. Normal lookups therefore returned no current record, causing historical cards to say `Readiness: No data` and preventing recovery inputs from reaching the adaptive model.

v36.132 makes `null`, `undefined`, and an omitted timestamp mean “use the current saved observation.” A real timestamp still returns only the newest observation available by that time. No saved recovery data need to be deleted, cleared, or manually re-entered.

## Travel/day-context visibility

The travel selection was saved, but the app did not show it in History or confirm the save on Home. This update adds a saved-status line, displays meaningful day context in History, and provides per-date Edit/Clear controls with undo. After deployment, clear the accidental September 23 context from History and leave September 24 unchanged.

## Runtime files

- Replace `index.html`, `sw.js`, `version.json`, and `manifest-v36.webmanifest`.
- Replace `decision-integrity-v36.131.js`, `adaptive-personalization-v36.120.js`, and `app-shell-v36.119.js`. Their stable filenames are intentional; the v36.132 cache keys force the corrected contents to install.

## QA files

- Add the included `.github/workflows/qa.yml` and `tests/` files if they are still absent from GitHub.
- Keep `UPDATE_NOTES_v36.132.md` and `QA_REPORT_v36.132.md` with the release audit trail.

## Verify before deployment

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
npm run audit:export -- "/path/to/an/export.json"
```

Suggested commit message:

`Fix recovery lookup and expose saved day context`

After GitHub Pages deploys, reload the installed app once. Existing recovery values should immediately produce readiness labels again; do not clear storage or re-enter the historical records. In History, use **Clear Context** only on 2026-09-23; 2026-09-24 is the real travel day.
