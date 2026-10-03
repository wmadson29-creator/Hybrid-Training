# v36.140 validation

Validation used Chromium Headless Shell 154.0.8037.92, Playwright 1.62.1, a 412 × 915 viewport, and America/Phoenix time. Deterministic fixtures freeze application dates; performance uses the real monotonic clock. These checks do not reproduce Android hardware or every possible legacy export.

## Passed checks

| Check set | Result |
| --- | ---: |
| JavaScript syntax, version agreement, required assets, and test entry points | 19 / 19 |
| Browser checks using the supplied export | 90 / 90 |
| Browser checks using empty history and the TB-to-hybrid schedule fixture | 84 / 84 |

The supplied export contains 165 workout rows, 34 recovery dates, and 7 bodyweight measurements. Its recorded workouts run August 26–September 28, 2026. Startup and the update/reopen flow preserved the workout rows byte-for-byte after JSON serialization. Recovery records, measurements, the explicit Thursday swim commitment, and its saved target/metadata also passed preservation checks.

The export contains completed Calisthenics and SE sessions, but completion alone does not prove that the model selected them automatically. The validation distinguishes completed primary work, short add-ons, and full second sessions.

Meaningful browser scenarios include:

- Correct pull-up wave prescriptions at weeks 6, 7, and 9; Pull-up → Squat order at multiple waves; protected deadlift placement; fixed anchors; no automatic extras on Barbell days.
- Replanning the generated Tuesday swim around the explicit Thursday swim; a suitable Thursday short; a later eligible weekday full secondary; conservative score-bound optimization retaining eligible candidates.
- Actual easy versus very hard completed effort; short work excluded from full-double counts; full-role precedence over legacy short flags; partial rare-mode credit without counting a short as a full session.
- Automatic Calisthenics and SE wins in separate balanced synthetic histories after a long gap; reduced priority after recent full work; a recovery guard still winning over the gap bonus.
- The screenshot's completed 46.5-minute swim: Best full contains complementary resistance work and excludes another swim. Reversing log insertion order and later planning Gym still leaves the swim primary and the completed Gym full secondary.
- Today and past calendar attribution remaining tied to completed activity; actual metrics in the selected-day view; cancellation of stale calendar jobs; no permanent Loading/Checking placeholders; generated Log order and adding an exercise.
- Current build produces no update prompt; an incomplete newer deployment produces none; a coherent newer build does. Later survives focus return. An active workout defers the prompt, and it returns when the workout ends.
- Failed safety backup prevents navigation. Successful Update activates the newer worker, loads the newer app, preserves all saved rows, and retains the named pre-update snapshot across startup. Offline reopening preserves the same saved rows.

The hypothetical newer build in PWA tests is produced only by the local server. No release was deployed by these tests. No uncaught page errors were observed in either final browser suite. Mobile screenshots were inspected for calendar and secondary-choice layout.

## Local startup comparison

Three alternating runs used the same export and fresh browser contexts. Service workers were blocked to isolate application computation. "Interface ready" means page load, the core bridge, and seven calendar cards available; progressively resolving cards can still be pending. "Calendar resolved" additionally requires all primary/secondary placeholders to finish and remain clear for eight animation frames.

| Metric | v36.139 samples (ms) | v36.140 samples (ms) | Median change |
| --- | --- | --- | --- |
| Interface ready | 3573, 3498, 3245 | 2646, 1557, 1672 | 3498 → 1672; about 53% faster |
| Calendar resolved | 5365, 5279, 4962 | 3438, 3249, 3481 | 5279 → 3438; about 35% faster |
| Repeated unchanged calendar/selected-day call | about 1 each | about 1 each | Already fast in both |

The small sample shows variation and warm OS caches. It does not establish phone timings or prove that every reported crash is resolved. The baseline's blocked-worker benchmark emitted a registration error specific to that blocked-worker setup; the candidate guards that case. Actual worker behavior was tested separately with workers enabled.

## Limits

The export-based 42-day projection for September 29–November 9 contains 42 primary sessions, 5 full second sessions, and 5 short add-ons. One primary is SE and none is Calisthenics; stronger competing needs continue to win. The projection preserved real workout rows and the manually locked swim, and produced no page errors.

Rare-mode fixtures prove reachability, not a promised frequency for every user's history. More optional work remains conditional on effort, readiness, equipment, time, and nearby anchors. Long-range forecast rows are hypothetical, never completed-history entries. Legacy logs without distinct session IDs, roles, or times can only be attributed from the available information; this release does not invent missing workouts.

The previous repository referenced QA scripts that were absent. The scripts included with this release are reproducible checks; the counts above are these actual executed checks, not claims about an unavailable historical suite.
