# Hybrid Training v36.140

This update addresses slow calendar/startup work, missing update notifications, suppressed optional training, and incorrect completed-workout attribution. It also puts Weighted Pull-up before Squat in generated Barbell Strength workouts.

## Install on the existing GitHub app

1. Extract `Hybrid_Training_v36_140_GitHub_Update.zip`.
2. Upload its contents into the existing Hybrid-Training repository, preserving the `tests/` folders. Commit all files together. The ZIP contains only changed or new files; keep the other existing app assets.
3. Wait for GitHub Pages to finish deploying, then close and reopen the installed app. A client still running v36.139 may need an initial browser refresh before the repaired updater is loaded. Keep the existing browser and app address so the device's workout data stays available.

The baseline is v36.139, commit `093f077a8290b9a1b3d1b80703bf493c6a5073d7`. The release contains no personal export or test-browser downloads.

## Resulting behavior

- **Startup and calendar:** saved completed days are read directly. Remaining dates resolve progressively, and changing weeks cancels stale work. Duplicate calendar decoration, discarded distant workout calculations, and repeated fitness/dose calculations are reduced. Save/import/context changes invalidate the relevant caches.
- **Update notification:** the app checks again on return, connectivity changes, worker changes, and periodically while visible. A prompt appears only for a newer coherent deployment. Active or paused workouts defer the prompt. Later snoozes that build for 30 minutes. Update saves a separate durable safety snapshot and waits for the new worker to activate before reloading. A failed backup or installation leaves the current app open.
- **Rare Calisthenics and Strength-Endurance:** automatic scoring now gives bounded value to a long absence of full sessions. The value ramps after 21 days and reaches its maximum at 42 days. Short work earns partial, decaying credit. Recent full work resets the gap. These dates and points implement a rarity preference; they are not biological recovery rules or a weekly quota. Base Building keeps its prescribed schedule.
- **Optional second workouts:** suitable open-day shorts are no longer hidden by a date lottery. Full weekday sessions keep their higher score threshold, actual-effort checks, time/equipment restrictions, and recovery/anchor protection. Weekends remain the preferred capacity window. Automatic extras stay off Barbell days; KB doubling retains its stricter spacing.
- **Swim followed by swim:** Best full and automatic full advice use completed activity, not the old planned activity. A completed swim excludes another swim from the full recommendation guide, including different swim variants. The strongest complementary option can appear under Best full while the main recommendation remains None. Custom choices remain available.
- **Calendar history:** completed rows, explicit primary/full/short roles, and session times determine attribution. Later planner changes do not replace the completed primary. A full secondary's role takes precedence over older short flags. Completed-day calendar cards show logged secondary work rather than an uncompleted recommendation.
- **Barbell order:** generated workouts, Log cards, and forecast rows put Weighted Pull-up first and Squat second. Pull-up progression, six-week strength waves, the TB-only Monday/Friday single deadlift set, and completed workouts retain their prescriptions.
- **Progression text:** newly generated conditioning prescriptions apply the small personal-trend progression once. Existing explicitly saved targets are preserved.

## Validation

See `QA_REPORT_v36.140.md`. The release passed static/deployment checks and browser checks with both the supplied export and an empty-history fixture. The local startup comparison improved substantially; it is not an Android hardware benchmark.

## Reproduce checks

From the repository root:

```bash
npm install
npx playwright install chromium
npm test
npm run test:browser
```

To test a local export without adding it to GitHub:

```bash
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:browser
npm run audit:export -- '/absolute/path/to/export.json'
```

`HYBRID_CHROMIUM_PATH` optionally selects an installed Chromium executable. `HYBRID_QA_ONLY=engine`, `rare`, or `update` runs one browser group. Test hooks exist only in HTML served by the local test helper; they are absent from the deployed app.
