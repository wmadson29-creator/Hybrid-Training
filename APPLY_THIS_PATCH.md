# Apply Hybrid Training v36.130

Upload the contents of the GitHub-only ZIP at the repository root, preserving the `tests/` directory. The ZIP is generated as an exact file delta from `origin/main`; it does not include the user's export, screenshots, the `.git` directory, or unchanged repository files.

The runtime changes must stay together:

1. **Replace** `index.html`, `sw.js`, `version.json`, and `manifest-v36.webmanifest`.
2. **Replace** `adaptive-personalization-v36.120.js`, `app-shell-v36.119.js`, and `app-shell-v36.119.css`. Their stable filenames are intentional; the page and service worker use the v36.130 cache key.
3. **Add** `actual-load-feedback-v36.126.js`. It makes completed primary, secondary, substituted, and unplanned work authoritative for later load/fatigue decisions.
4. **Add** `forecast-balance-v36.127.js`. It contains the tested endurance-protection, hard-stack, speed-spacing, and flexible-modality rules.
5. **Add** `exercise-expansion-v36.128.js`. It supplies 43 gym and 44 bodyweight/calisthenics exercises with anatomy and relationship metadata, including Barbell Forearm Curl and the v36.130 exercise additions.
6. **Add or replace** `package.json`, `tests/run-qa.js`, and `tests/audit-export.js` for repeatable validation.
7. **Keep the included notes, research summaries, and QA reports** as the audit trail for the cumulative delta.
8. **Add** `HISTORICAL_ITERATION_AUDIT_v36.129.md` plus the cumulative update/QA/research documents through `UPDATE_NOTES_v36.130.md`, `QA_REPORT_v36.130.md`, and `LOCAL_SORENESS_AND_EXERCISE_RESEARCH_v36.130.md`.

Run the check before deployment:

```sh
npm test
npm run audit:export -- "/path/to/an/export.json"
```

Suggested commit message:

`Stabilize recommendations and add local recovery modeling`

After deployment, open the app online so the v36.130 service worker installs. If an older worker controls the first navigation, reload once more. Existing local training data should be preserved; no clearing or re-import is required.
