# v36.145 validation

Executed with Node 24.19.0, Playwright 1.62.1, Chromium Headless Shell 154.0.8037.92, a 412×915 viewport, and America/Phoenix dates. The harness freezes application dates while retaining a real monotonic clock. Local Chromium does not reproduce Android hardware.

## Executed check sets

| Check set | Result |
| --- | ---: |
| Syntax, build agreement, required assets/precache, test commands | 19 / 19 |
| Browser/PWA regression with the supplied export | 90 / 90 |
| KB program, progression, and secondary execution | 62 / 62 |
| Forecast assumptions, manual reflow, prescriptions, and variety | 26 / 26 |
| Barbell placement and capped slow machine-abs progression | 57 / 57 |
| Secondary agreement, SE spacing, location, and duration | 39 / 39 |
| Secondary frequency, feasibility, and cache context | 29 / 29 |
| Gym hanging/floor abs, availability, load, progression, and UI | 27 / 27 |
| Final class focus, muscle modeling, logging, and persistence | 47 / 47 |
| Substitute prescription recalculation | 18 / 18 |
| Final empty-history browser/PWA regression | 84 / 84 |

The complete `test:all` run passed 411 checks with the initial 44-check class suite. After the final History focus-summary refinement, the final 47-check class suite and 19-check static suite passed. The current check-set coverage totals **414**; the separate empty-history run is additional. Other model behavior was unchanged by the final History refinement. No uncaught page errors occurred in the successful suites.

## Regression reproduced from the screenshot

The screenshot's old text field was stored as `metrics.activities` but did not affect `utmRowFingerprint`. The previous checklist did reach the model. Tests now reproduce a 45-minute Pilates — Reformer class with average HR 107, maximum HR 139, unknown RPE, and Hard but good effort:

- Legacy `core` and `legs` entries produce different muscle fingerprints and actual recent-fatigue outputs. Core focus increases core attribution; leg focus increases quad and glute attribution.
- The same recognized legacy text and muscle checkbox produce identical focus evidence.
- Legacy focus changes bounded long-term muscle estimates without earning direct Hanging Knee Raise progression evidence.
- The old example `core, legs, upper body, springs` recognizes three focus terms and explicitly retains `springs` as unmatched context.
- Case-insensitive muscle/exercise names resolve; duplicate canonical focus is removed. Unknown and negated phrases do not fabricate a muscle map.
- Biceps and triceps selections create distinct attribution. Lats, shoulders, arms, and grip have independent visible choices.
- Checking every available focus choice preserves one bounded class dose. Skipped classes receive no stimulus.

## Actual interface and persistence

- Muscle choices are visible without opening a disclosure; new class cards omit the misleading old standalone muscle field.
- A blank focus states that the model uses the general class estimate. Checking a muscle changes the displayed model focus immediately.
- The actual Log card captures multiple body-area checks and custom notes. Draft restoration, Start/Pause/Complete, and completed History editing preserve them.
- Older saved text survives draft restoration, remains editable, updates the preview, and saves back to the same completed session with matching muscle evidence.
- Import preserves old raw text and its interpretation; malformed focus arrays are rejected. Unknown legacy selected exercises remain editable.
- History distinguishes recognized focus from unmatched focus notes. The mobile layout and feedback were visually inspected.

## Preservation and limits

The unchanged supplied export records v36.138: 165 workout rows, 34 recovery dates, seven bodyweight measurements, no wearable-session rows, and no completed KB work. The synthetic cases preserve and restore original workouts, recovery, and measurements. No personal data, browser downloads, support scripts, or screenshots are in the ZIP. The existing verified 148-commit archive is retained in the handoff.

Focus is a qualitative emphasis report. The existing 25% class prior / 75% mean recognized focus blend remains an app policy; it does not measure exact time under tension, sets, repetitions, or loading by muscle. Duration, effort, class type, and available actual metrics still control the overall class dose. Classes can refine fatigue and development estimates but cannot substitute for actual lift-performance evidence.

No new physiology research or Android startup benchmark was required or performed for this input/persistence correction. This work did not verify the current GitHub HEAD, push, deploy, or establish which build was active on the phone.

## Reproduce

```bash
npm install
npx playwright install chromium
npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:class
```

Use `HYBRID_CHROMIUM_PATH` for an existing Chromium executable. Test hooks are injected only by the local test server.
