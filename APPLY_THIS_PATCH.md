# Apply Hybrid Training v36.128

Upload the contents of the GitHub-only ZIP at the repository root, preserving the `tests/` directory. The ZIP is generated as an exact file delta from `origin/main`; it does not include the user's export, screenshots, the `.git` directory, or unchanged repository files.

The runtime changes must stay together:

1. **Replace** `index.html`, `sw.js`, `version.json`, and `manifest-v36.webmanifest`.
2. **Replace** `adaptive-personalization-v36.120.js` and `app-shell-v36.119.js`. Their stable filenames are intentional; the page and service worker use the v36.128 cache key.
3. **Add** `actual-load-feedback-v36.126.js`. It makes completed primary, secondary, substituted, and unplanned work authoritative for later load/fatigue decisions.
4. **Add** `forecast-balance-v36.127.js`. It contains the tested endurance-protection, hard-stack, speed-spacing, and flexible-modality rules.
5. **Add** `exercise-expansion-v36.128.js`. It supplies 30 gym and 30 bodyweight exercises with anatomy and relationship metadata.
6. **Add or replace** `package.json`, `tests/run-qa.js`, and `tests/audit-export.js` for repeatable validation.
7. **Keep the included notes, research summaries, and QA reports** as the audit trail for the cumulative delta.

Run the check before deployment:

```sh
npm test
npm run audit:export -- "/path/to/an/export.json"
```

Suggested commit message:

`Balance hybrid forecasts and learn from completed workload`

After deployment, open the app online so the v36.128 service worker installs. If an older worker controls the first navigation, reload once more. Existing local training data should be preserved; no clearing or re-import is required.
