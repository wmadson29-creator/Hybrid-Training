# Apply Hybrid Training v36.137

This is a narrow follow-up to v36.136. Upload the ZIP contents at the repository root, preserving the `tests/` directory. It contains only files that are new or changed since v36.136; it excludes exports, screenshots, dependencies, `.git`, older release notes, and unchanged app files.

## What this fixes

The cross-workout Gym rotation logic was working when a plan was freshly generated, but an already accepted automatic plan bypassed it. Its stored recommendation snapshot was considered current whenever the user's evidence had not changed, even when the recommendation model had changed. The app could therefore progress weights and reps while presenting the exact same exercise list.

v36.137 separates two kinds of stability:

- ordinary re-renders continue to show one stable recommendation;
- a semantic recommendation-model change invalidates an obsolete generated snapshot;
- an unstarted model-generated Gym plan is rebuilt with the current rotation logic;
- manually built plans remain exactly as saved;
- an active workout remains exactly as started; and
- completed workouts remain immutable historical records.

No workout, recovery, wearable, body-measurement, schedule, or settings data is cleared. No import is required.

The same release also addresses the severe mobile lag. Past calendar days no longer run the adaptive planner, secondary labels yield between days instead of blocking the main thread, closed explanation sections no longer pre-build expensive comparisons, repeated history/development calculations are cached until training data changes, and DOM observers batch their work instead of rescanning the whole interface for every new element. The recommendation model and fixed-anchor rules remain intact.

## Expected behavior after deployment

The next unstarted automatic Generic Gym workout should be regenerated once. Comparable accessories and implement variants can rotate, with exact overlap held near 40% when valid alternatives exist. A useful progressing compound may remain when progression value outweighs novelty. Once the v36.137 plan is accepted, it stays stable until relevant training evidence or a later semantic model revision changes it.

## Verification

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
```

Local static/model QA passes **203/203** checks. The browser regression suite now also covers stale generated-plan refresh, manual-plan preservation, active-workout preservation, obsolete recommendation snapshots, and the zero-past-day-forecast performance invariant. Chromium could not be downloaded in this restricted workspace, so GitHub Actions should run the browser suite after upload.

Suggested commit message:

`Refresh Gym rotation and reduce calendar lag`

After GitHub Pages deploys, fully close and reopen the installed app once so the v36.137 service worker activates. Do not clear app storage.
