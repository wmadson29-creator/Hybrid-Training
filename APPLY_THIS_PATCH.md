# Apply Hybrid Training v36.125

Upload the contents of the GitHub-only ZIP at the repository root, preserving the `tests/` directory. The ZIP is an exact delta from `origin/main`; it does not repeat unchanged repository files.

The runtime changes must stay together:

1. **Replace** `index.html`, `sw.js`, `version.json`, and `manifest-v36.webmanifest`.
2. **Replace** `adaptive-personalization-v36.120.js` and `app-shell-v36.119.js`. Their stable filenames remain intentional; the page and service worker use the v36.125 cache key.
3. **Add** `package.json` and `tests/run-qa.js` for the repeatable QA check.
4. **Keep the included notes and reports** as the audit trail for the v36.121 anchor-reflow work and the v36.125 whole-athlete update.

Run the check before deployment:

```sh
npm test
```

Suggested commit message:

`Improve whole-athlete adaptation, swim tracking, and training UI`

After deployment, open the app online so the v36.125 service worker installs. If an older worker controls the first navigation, reload once more. Existing local training data should be preserved; no clearing or re-import is required.
