# Hybrid Training v36.158 — QA/QC

## Scope

Profile startup, normal navigation, opening Log, idle DOM activity and future-date projection using the supplied export and controlled phone viewport. Fix confirmed mutation feedback loops and repeated forecast calculations. Preserve existing preparation, model and loading behavior.

## Validation

22 suites: static syntax/bundle checks, browser/update/offline behavior, KB progression, forecast, barbell, secondary logic/frequency, core, classes, substitutions, recovery, feedback calibration, freshness, phone UI, UI workflows, KB layouts, plate loading, workout evidence, preparation, compact helpers, ordered loading and new performance regression checks.

Passed suite totals: 927 export-based checks and 71 empty-history checks (preparation 30, helper 8, ordered loading 24, performance 9). Repeated runs are not added to counts. Export suites are validated across the broad run and direct final-suite execution.

The new nine performance checks confirm unchanged personalization refresh is idempotent, hidden views stay idle, conditioning buttons exist and settle, symmetric scores reuse cache, model revision replaces the cache, real bodyweight changes still refresh, phone width stays within viewport and no browser errors occur. Existing suites verify timestamp-field invalidation and recommendation freshness.

Preparation/active reload retains added, removed and swapped exercises without creating completed History rows. Ordered loading still uses minimum exact plate count first, then minimizes exposed stack removal/addition moves; independent exhaustive references remain. KB weight edits refresh contents, while 100 timer ticks leave exercise/plate DOM untouched. Ten unchanged helper renders cause zero content rebuilds.

Current phone helper screenshot inspected after the tests; loading summary and collapsed contents remain legible with no page overflow.

## Findings and limits

Idle body mutations fell from 128 to zero in a paired two-second observation. Opening Log fell from 1,129 Log-view mutations to 93. Future-date synchronous action timing improved in the paired run, but cold future projections still take roughly 1–2 seconds and a longer direct jump still produces a ~3-second main-thread task. See PERFORMANCE_REVIEW_v36.158.md. Measurements are development-machine observations, not Android guarantees.

Build/cache/assets are 36.158. No private export/profile/browser binary is packaged. No GitHub push or deployment was performed.
