# QA Report — Hybrid Training v36.131

## Result

- **169/169 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- `git diff --check` passed.
- `version.json`, `package.json`, and `manifest-v36.webmanifest` parsed successfully.
- Build, manifest, service-worker cache keys, loaded modules, and required deployment files agree on v36.131.

## Supplied export audit

The read-only audit of `hybrid-training-export (19).json` passed with **0 errors and 2 warnings**:

- 138 exercise rows across 35 logged sessions;
- 30 recovery days, 6 bodyweight measurements, and 4 rest-day records;
- 14 planned-to-actual exercise changes and 24 rows with actual-load metadata;
- 23 legacy strength rows contain the older erroneous planned-minutes field; current strength classification ignores it;
- one 2026-09-17 swim stores 420 yd while its pool fields imply 2 × 21 yd; new saves require those values to agree;
- 65 current-model prediction rows and 53 legacy rows retained only as history;
- two one-off program-day moves retained.

No user data were rewritten during this audit.

## New regression coverage

- deterministic evidence revisions and stable recommendation snapshots;
- recommendation preference separated from evidence quality;
- sequential schema migration, including recovery timing, after full import restoration;
- encrypted-backup format, local cryptography, and envelope-size handling;
- import preview, durable verification, and rollback path;
- component-level planned-versus-completed conditioning dose;
- pain-area overlap, temporary suppression, and explicit resolution;
- three-week horizon with fixed anchors and a 72-hour firm window;
- independent Main Gym, Home, and Travel profiles, including the same exercise in multiple locations;
- active-profile behavior in both Gym editors;
- mobile calendar affordance, dialog focus handling, plain-language copy, and distinct completed/secondary colors;
- all prior actual-load, endurance balance, sprint-spacing, soreness, swimming, exercise metadata, and recommendation-stability regressions.

## Browser status

`tests/browser-qa.js` and `.github/workflows/qa.yml` are included. The local environment did not contain a Chromium executable, and its restricted network returned an incomplete browser archive, so the rendered walkthrough could not honestly be marked as locally passed. The GitHub Actions job installs Chromium and runs the walkthrough. This is the only incomplete local verification item; it is not being hidden as a pass.

## Commands run

```sh
npm test
npm run audit:export -- "../upload/hybrid-training-export (19).json"
git diff --check
node -c <all JavaScript files>
```

## Deployment smoke test

1. Reload once after GitHub Pages updates and confirm build v36.131.
2. On an open day, switch between Gym and LSS, then use Recommended; the recommendation must not oscillate.
3. In Equipment profile, enable one exercise at Main Gym and Home. Switching either profile must leave the other unchanged.
4. Enter localized soreness or a movement pain stop and confirm overlapping automatic exercise picks are reduced while unrelated areas remain trainable.
5. Export normal JSON, export an encrypted backup, cancel an import preview, and confirm current history is unchanged.
6. Log less and more than a planned primary or secondary dose and confirm later load/fatigue summaries reflect the completed work.
