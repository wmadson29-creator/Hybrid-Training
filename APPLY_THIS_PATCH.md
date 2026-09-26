# Apply Hybrid Training v36.131

This ZIP is an exact content delta from GitHub `origin/main` at commit `0c94421` (v36.128). It contains only files that are new or whose bytes differ from that GitHub baseline. It excludes the private training export, screenshots, `.git`, dependencies, generated browser files, and every unchanged repository file.

Upload the ZIP contents at the repository root and preserve the `.github/` and `tests/` directories.

## Runtime files that must be uploaded together

- Replace `index.html`, `sw.js`, `version.json`, and `manifest-v36.webmanifest`.
- Replace `adaptive-personalization-v36.120.js`, `actual-load-feedback-v36.126.js`, `exercise-expansion-v36.128.js`, `app-shell-v36.119.js`, and `app-shell-v36.119.css`. Their stable filenames are intentional; v36.131 cache keys force the new contents to install.
- Add `decision-integrity-v36.131.js`.

## QA and audit files

- Replace `package.json`.
- Add `.github/workflows/qa.yml` and the `tests/` files. GitHub Actions installs Chromium and runs both the model/static suite and the mobile browser walkthrough.
- Keep the included v36.129–v36.131 notes, research summaries, and QA reports as the audit trail.

## Verify before deployment

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
npm run audit:export -- "/path/to/an/export.json"
```

Suggested commit message:

`Add decision integrity, safer backups, and model/UI QA`

After GitHub Pages deploys, open the app online and reload once if the previous service worker controls the first navigation. Existing on-device training data should migrate in place; do not clear storage or re-import it.
