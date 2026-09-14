# Stretching & Flexibility — QA Addendum

## Scope isolation
- Added one standalone view: `Stretching & Flexibility`.
- Added one mobile More-menu entry and one desktop navigation tab.
- Added one isolated JS file: `stretching-flexibility-v36.119.js`.
- The feature does **not** call the HybridCore state mutation API, the workout logger, recovery writer, recommendation engine, scheduling engine, `save()`, or workout-history functions.
- No existing physiology/recommendation code was edited.

## Interaction tests
- Empty selection returns an instruction instead of a crash.
- Specific-region chips toggle independently.
- Whole-body shortcut populates a representative full-body set while preserving individual-region editing.
- Time choices: 5 / 10 / 15 / 20 / 30 minutes.
- Equipment filtering tested with strap, foam roller, hanging bar, and dowel scenarios.
- Every generated card must have at least one selected region as a primary target.
- Routine cards include method, dose, target badges, instructions, rationale, cautions where relevant, and a YouTube search link.
- Regenerate varies comparable options without logging anything.

## Browser-harness checks
A Chromium DevTools-protocol harness was used to run the standalone module against a minimal replica of the app navigation surface.

- Module installed successfully.
- Desktop navigation entry installed successfully.
- Mobile More-menu entry installed successfully.
- Quads + hamstrings + calves, 10 minutes, strap + foam roller produced a valid in-budget routine.
- Lats with hanging bar + dowel made equipment-specific options eligible.
- No-region state handled cleanly.
- 320 px viewport: zero horizontal overflow in the feature harness.
- `node --check` passes for the feature module, app shell, and service worker.

## Cache/deployment
The app remains build `36.119`; only the service-worker cache key is advanced to `hybrid-training-v36-119-sf1` so installed PWAs fetch the additive feature and updated app shell without changing the adaptive-model release number.
