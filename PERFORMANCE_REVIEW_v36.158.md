# Performance QA review — v36.158

## Confirmed causes and changes

1. The personalization layer observed the whole document, rewrote identical status/bodyweight HTML after 60 ms, then observed its own rewrite. It sustained roughly 16 updates per second, including hidden views. It now writes only changed markup. Actual bodyweight changes still refresh.
2. Conditioning buttons and workout stage labels assigned identical text on subsequent observer passes. They now compare before writing. The rest clock also avoids identical writes.
3. UI workflow decoration ran across all four views on every mutation. It now decorates the active view; navigation still installs the corresponding controls.
4. Forecasts repeatedly calculated exercise-pair overlap. Pair redundancy is cached symmetrically per model revision. Related exposure cache capacity no longer causes rapid bulk eviction at the measured forecast workload. Timestamp cache hits compare raw fields and avoid repeated string allocation; fallback date parsing runs only when needed.

No training thresholds, prescriptions, loading priorities or saved-history semantics were intentionally changed. Cache sizes are bounded; model revision invalidates pair values. Existing timestamp edit-invalidation and forecast freshness checks remain.

## Controlled paired measurements

Same supplied export, Phoenix clock October 8 2026 at 22:00, 412×915 viewport, headless Chromium. Separate baseline/fixed runs, no CPU throttle. Counts cover two-second idle/open-workout windows after settling. These are development-machine measurements, not Android benchmarks.

| Observation | v36.157 | v36.158 |
| --- | ---: | ---: |
| Idle body DOM mutations | 128 | 0 |
| Workout-view mutations when opening Log | 1,129 | 93 |
| Hidden dashboard/bodyweight mutations while opening Log | 64 | 0 |
| Startup to ready, ms | 3445.0 | 3212.5 |

Synchronous action timing in a second paired navigation run:

| Action | v36.157 ms | v36.158 ms |
| --- | ---: | ---: |
| history | 29.5 | 29.1 |
| dashboard | 4.2 | 4.4 |
| trends | 112.2 | 105.6 |
| dashboard | 3.6 | 3.9 |
| log | 33.2 | 31.4 |
| dashboard | 3.1 | 2.8 |
| 2026-10-16 | 1748.0 | 1373.2 |
| 2026-10-23 | 2392.9 | 2061.3 |

A direct October 23 jump with its follow-up work still produced a ~3.0-second main-thread long task (baseline ~3.9 seconds). Cold projections remain the largest unresolved responsiveness limit. They project multiple future scheduled sessions synchronously; this patch reduces repeated work but does not move projections to a worker or chunk them across frames. Single-run timings vary with scheduling and concurrent load; no guaranteed percentage or real-device smoothness claim.

## Regression protection

`test:performance` observes idle mutations rather than asserting fragile timing budgets. It checks personalization idempotence, hidden-view inactivity, conditioning label settling, symmetric cache reuse/revision invalidation, actual bodyweight refresh, phone overflow and browser errors. Existing timer QA verifies 100 ticks do not touch exercise/plate DOM. The broad suite validates recommendations, freshness, recovery, UI workflows, preparation, loading and browser/offline behavior.
