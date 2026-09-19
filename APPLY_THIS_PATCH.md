# Apply Hybrid Training v36.127

Upload the contents of the GitHub-only ZIP at the repository root, preserving the `tests/` directory. The ZIP is an exact delta from `origin/main`; it does not repeat unchanged repository files.

The runtime changes must stay together:

1. **Replace** `index.html`, `sw.js`, `version.json`, and `manifest-v36.webmanifest`.
2. **Replace** `adaptive-personalization-v36.120.js` and `app-shell-v36.119.js`. Their stable filenames remain intentional; the page and service worker use the v36.127 cache key.
3. **Add** `actual-load-feedback-v36.126.js`. It is a required runtime file and must be uploaded beside `index.html`.
4. **Add** `forecast-balance-v36.127.js`. It contains the tested speed-spacing and flexible-modality guardrails.
5. **Add or replace** `package.json` and `tests/run-qa.js` for the repeatable QA check.
6. **Keep the included notes, research summary, and QA reports** as the audit trail for the cumulative update.

Run the check before deployment:

```sh
npm test
```

Suggested commit message:

`Fix export and balance future training forecasts`

After deployment, open the app online so the v36.127 service worker installs. If an older worker controls the first navigation, reload once more. Existing local training data should be preserved; no clearing or re-import is required.
