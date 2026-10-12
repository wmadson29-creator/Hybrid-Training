# Hybrid Training v36.159 — validation

Final intended scope: within-workout shared-muscle fatigue for generated Gym/Calisthenics work, unavailable-equipment controls including cable attachments, individual exercise stack options, and Trevor research provenance.

## New regression suite

`test:session-fatigue` covers 40 checks: compound-to-isolation overlap for pressing/pulling/legs/back; repeated muscle work; unrelated gaps and longer rest reducing but not erasing fatigue; skipped work; overlap-aware ordering; all four difficulty volume budgets; generated narrow-focus quality limits; unchanged fresh first target; conservative later load/rest; manual load protection; Wrist Roller availability and substitution; other cable exercises remaining available; regular offset grids and bounds; irregular adjacent stack progression/backoff/fatigue loading; invalid input preserving configuration; inline save feedback and stack-ceiling progression; reorder recalculation from fresh baseline; manual actual-field protection; idempotence; avoiding a second deduction from already fatigued historical performance; preparation saving; baseline/manual marker reload; per-exercise option reload; mobile overflow; unchanged History and browser errors.

The regular example uses 7.5 lb increments from 10 lb: 26 snaps to 25, 100 caps at 40 under a 43 lb ceiling, and 25 progresses to 32.5. The irregular example 10/25/40/60/85 uses 60 after 40, 40 before 60, and 40 for a requested fatigue-adjusted load below 60. Other exercises keep their defaults.

A phone screenshot of the inline equipment editor was visually inspected. The disclosure starts closed; fields fit the phone width and the missing-attachment action remains visible. Draft tests preserve entered exercises/doses, baselines and manual markers through reload. Preparation validation now rejects invalid date/week/session drafts.

## Existing protections

The broad 23-suite sequence covers static/deployment/worker assets; actual log/recovery preservation; browser updates/offline; KB progression and hardware allocation; future forecasts and manual commitments; Barbell prescriptions and ordered plates; secondary/frequency/core/class/substitution logic; recovery/calibration/freshness; mobile UI and nine workflows; observed workout evidence; preparation, timer helpers, exact ordered loading and idle mutation regressions.

The new runtime asset is included in index.html, version.required and worker precache. The production app has no test hooks. Required asset checks and syntax compilation pass. Prior fewest-exact-plates and minimum-ordered-switching logic remain unchanged. Timer ticks still leave exercise/plate DOM untouched; idle loop regression remains.

**968 export-based checks + 111 empty-history checks = 1,079 unique checks passed.** The 23-suite broad run completed successfully; focused barbell/substitution checks were repeated after the stack-ceiling guard. Repeated development executions are excluded from unique totals. The first broad pass reached and passed all prior suites but failed the new draft fixture: its week field was invalid. The fixture now supplies a valid week, and production preparation saving also rejects such incomplete drafts. A subsequent comparison was corrected to treat absent and empty manual-marker strings identically; the saved dose and baseline had already restored correctly.

## Boundaries

The new fatigue formula and set budgets are bounded app priors, not individualized measurements or universal physiological ceilings. Targets assume entered doses, effort, order and prescribed rests; they do not measure real muscle fatigue. There is no silent change to completed History, fixed Barbell/KB anchors, custom/manual saved workouts, or physical loading rules. No new real-device performance benchmark or GitHub deployment is claimed. The older supplied export is used as regression data; the exact current workout seen on the user's phone was not supplied in a new export.

The current stack editor has one entry per named exercise within a gym profile. Two stations with that same exercise name share it. Exact labels are in lb, consistent with the app's gym targets; no pulley-ratio conversion is inferred. See SESSION_FATIGUE_MODEL_v36.159.md for implementation assumptions and TREVOR_INSTINCT_RESEARCH_v36.159.md for the coach research review.
