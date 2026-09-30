# Apply Hybrid Training v36.139

Upload the ZIP contents at the repository root, preserving the `tests/` directory. The ZIP contains only files that are new or changed since v36.138; it excludes exports, screenshots, dependencies, `.git`, and unchanged application files.

## What this release fixes

- A manually selected future conditioning activity is now a first-class schedule commitment even when that date was already labeled `Conditioning`.
- The app now distinguishes an accepted generated recommendation from an explicit manual choice. Generated open-day plans reflow when their evidence changes; manual switches remain fixed.
- Run, swim, other-cardio, and speed commitments reserve their exact lane using a soft adjustment based on proximity and planned duration. A Thursday full swim therefore lowers duplicate-swim priority on Tuesday, while an unusually large swim need can still justify both sessions.
- Earlier open days re-rank from the complete picture: completed work from the prior week, current recovery/load, fixed Barbell or kettlebell anchors, and future manual commitments.
- Future day overrides, conditioning choices, workout intent, and compact future-plan signatures now participate in recommendation evidence. Changing Thursday therefore invalidates and releases a stale generated Tuesday recommendation snapshot immediately.
- Manually committed conditioning rows are marked as manual in future-interference modeling rather than being mistaken for an adaptive placeholder.
- The new future-commitment lookup uses a bounded cache that is cleared with all other model caches.

No workout, recovery, wearable, body-measurement, schedule, equipment, or settings data is cleared.

## Expected behavior

If Tuesday and Thursday are flexible conditioning slots and you set Thursday to `LSS Swim`:

- Thursday remains exactly where you put it.
- Tuesday's prior generated recommendation is released and recalculated immediately.
- Thursday's planned swim duration lowers Tuesday's swim-lane score.
- Tuesday can become a run, speed session, other cardio, Gym, Calisthenics, or SE workout according to the remaining needs.
- Swimming Tuesday is still possible when its need is clearly large enough; this is not a hard no-repeat rule.

## Verification

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
```

Local results: **217/217 static/model checks** and **35/35 browser checks** passed. The browser suite reported no uncaught page exceptions or console errors. It includes the exact regression where Tuesday begins as a generated swim, Thursday is manually set to swim, Thursday stays fixed, and Tuesday re-ranks to a run. Details are in `QA_REPORT_v36.139.md`.

Suggested commit message:

`Rebalance open days around future cardio commitments`

After GitHub Pages deploys, fully close and reopen the installed app once so the v36.139 service worker activates. Do not clear app storage.
