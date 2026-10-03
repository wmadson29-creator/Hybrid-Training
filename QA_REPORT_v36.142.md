# v36.142 validation

Executed with Node 24.19.0, Playwright 1.62.1, Chromium Headless Shell 154.0.8037.92, a 412×915 viewport, and America/Phoenix dates. The browser harness freezes application dates while using a real monotonic clock for waiting. Local Chromium does not reproduce Android hardware.

## Final passed checks

| Check set | Result |
| --- | ---: |
| Syntax, build agreement, required assets/precache, test entry points | 19 / 19 |
| Browser/PWA regression with the supplied export | 90 / 90 |
| KB program, progression, secondary families/execution | 62 / 62 |
| Future assumptions, manual reflow, prescription agreement, variety | 26 / 26 |
| Barbell phase placement and slow ab-machine progression | 56 / 56 |
| Secondary agreement, SE spacing, location, and duration | 39 / 39 |
| Additional empty-history browser/PWA regression | 84 / 84 |

The six static/export-seeded sets total **292** checks; empty-history coverage is reported separately. Synthetic fixtures test edge cases and restore the supplied state. These numbers are checks, not observed user workouts. No uncaught page errors were observed in the final suites.

The unchanged export records v36.138 and contains 165 workout rows, 34 recovery dates, seven bodyweight measurements, no wearable rows, no completed KB work, and no saved custom KB workouts. Workout dates span August 26–September 28. No newer full export was supplied for the current screenshots. Existing preservation checks retain actual workout rows, recovery, measurements, and explicit manual commitment metadata; temporary forecast rows do not append to real history.

## Current-release scenarios

### Barbell and ab-machine behavior

- Deadlift is absent on all seven queried days in each of six Hybrid wave weeks, including future projected Barbell rows and an explicit moved-source prescription. TB-only Monday/Friday retain exactly one work set; Wednesday has none. Pull-up → Squat ordering and the ab finisher remain intact.
- The machine definition and SE machine rounding support 5 lb steps, including an existing 65 lb baseline. Barbell plans call the slower accessory policy; ordinary Gym finishers retain their separate progression rule.
- Each volume step holds after one/two comfortable exposures and advances after three comparable dates. The top 4×20 step holds after three and earns exactly +5 lb after four. Full-ladder simulation requires 19 exposures before the first load increase; the new load resets volume and its success count.
- Duplicate rows, separate same-day sessions, other Gym work, short secondary work, different load/volume, unknown effort, challenging effort, pain, latest skip, partial results, hard top-step results, stale successes, and recovery guard are checked. Backoff/hold behavior blocks inappropriate advancement. Synthetic scenarios restore the original workout rows and recovery data.

### Primary/secondary agreement and SE spacing

- Full actual SE yesterday blocks automatic SE today, including a full secondary. Prospective full SE has the same effect. Short SE does not fabricate a full-session lock. A next-day explicit manual SE reserves the adjacent automatic slot while the deliberate manual selection survives.
- Two old generated future SE snapshots reflow instead of persisting on both dates. A newly stamped future adaptive-recommended snapshot also remains revisable advice. Explicit manual intent stays fixed.
- Secondary matrix state resolves the same primary as the calendar, even when a stale SE session is passed into it. Automatic calendar status and detail model agree.
- A visible future Barbell day’s automatic None renders None in the calendar and No secondary in the card without an automatic action. On a separate unfinished future manual-primary fixture, choosing Best full preserves Recommended: None, shows Selected optional / Your choice, explains that automatic advice remains to stop, and marks the same optional plan Selected in the calendar.
- Historical calendar days continue to display completed work. They do not show an unperformed optional selection as logged completion.

### Location, equipment, and time

- Gym and KB primaries infer gym/home correctly. Gym + stationary bike and home run + KB avoid transfer; gym + home KB adds transfer cost. The same-location preference changes the actual full-secondary rank, not just explanatory text.
- Gym full-secondary candidates include local stationary/row/elliptical/stair cardio. Home SE has at least three feasible exercises and no gym-only machines. Home short work can use its pull-up bar and bells; Gym short context recognizes that the user is already at the gym. The explicit location override changes an otherwise ambiguous primary’s venue.
- A 75-minute shared budget admits a local pairing and rejects the comparable different-location pairing once estimated transfer time is included. Existing physiological, equipment, effort, and anchor gates remain active.
- Unit parsing rejects circuit counts, repetitions/distances, and seconds as minutes; preserves explicit minute ranges; uses 60 minutes for two Triples circuits; and honors an explicit minute target over the circuit estimate. Full automatic aerobic candidates are complete single activities with realistic duration, rather than a tiny Triples session.

## Retained regression coverage

Existing suites cover coherent eleven-file update checks, incomplete-deployment rejection, Later, active-workout deferral, failed backup retaining the current app, worker activation/reload, separate pre-update snapshots, offline reopening, historical primary/full/short roles, actual swim identity, duplicate cardio exclusion, manual constraints, rare Cal/SE reachability, and calendar navigation cancellation.

The KB suite retains the full 2-Barbell + 3-KB + 2-open week, complete movement patterns, actual hardware/single-bell substitutions, fit-to-time/rest, rep/bell/swing-round progression, partial/short/full distinctions, custom preservation, aerobic doubles without Gym, exact activity selection, and correct Start/save behavior after editing a primary.

Forecast regressions retain exact wave/KB/manual prescriptions, prior-day manual target/RPE, upcoming Sunday reservation without treating it as past completion, actual-primary precedence, secondary-only completion, distant variety, and unchanged real logs. A first run caught an explicit 44–61-minute forecast range being interpreted as 61 minutes; the final implementation restores its 52.5-minute midpoint and all 26 checks pass. The final 39-check UI/location suite ran after the optional-choice label changes.

## Visual review

The 412×915 mobile secondary card was inspected after a deliberate Best full choice under automatic None. The badge, selected button, optional preview, Your choice label, explanatory sentence, rows, and opening action fit the card without horizontal overflow. The supplied screenshots were used as problem evidence; they are not phone screenshots of the prepared release.

## Reproduction and limits

Run `npm run test:all`. Individual new commands are `npm run test:barbell` and `npm run test:secondary`. Use `HYBRID_TEST_EXPORT='/absolute/path/export.json'` for private input and `HYBRID_CHROMIUM_PATH` for an existing Chromium executable. `HYBRID_SECONDARY_SCREENSHOT` optionally supplies a local screenshot path. Hooks exist only in the local test server, not deployed HTML.

No fresh performance comparison, current remote HEAD verification, installed-phone check, or deployment was performed for v36.142. Older v36.140/v36.141 reports retain their measurements and the v36.141 85-day activity counts as historical evidence; those exact counts were not re-measured here. KB starting loads remain provisional without direct KB results. Forecasts assume prescribed completion and estimated effort; they remain hypothetical and can change with real outcomes or context. The 3/4-exposure ab thresholds, 42-day evidence window, +3/−6 venue scores, and 15-minute transfer estimate are app policies. They are not claimed as uniquely research-established physiological rules. Missing legacy roles/timing cannot be reconstructed perfectly, and these tests do not establish that every reported chat/app crash is resolved.
