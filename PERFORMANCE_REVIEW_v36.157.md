# Navigation and forecast profile — v36.157

One paired headless Chromium run used the same supplied export, controlled Phoenix clock (October 8, 2026, 22:00), phone viewport and action sequence. Values below are synchronous action time in milliseconds; they are not real-device benchmarks.

| Action | v36.156 ms | v36.157 ms |
| --- | ---: | ---: |
| history | 29.1 | 29.5 |
| dashboard | 3.8 | 4.2 |
| trends | 117.2 | 112.2 |
| dashboard | 4.3 | 3.6 |
| log | 35.6 | 33.2 |
| dashboard | 3.0 | 3.1 |
| 2026-10-16 | 1939.6 | 1748.0 |
| 2026-10-23 | 2869.9 | 2392.9 |

Cold future-week calculations still take about 1.7–2.4 seconds in this run. Startup-to-ready measured 3914.8 ms versus 3445.0 ms. These single-run values vary with CPU scheduling and concurrent work; they are evidence for investigation, not a guaranteed speedup percentage.

CPU samples identified repeated transfer geometry dot products, date/time parsing, forecast signature construction and projected-row stimulus evaluation. New reuse preserves model-revision invalidation and forecast context. Timestamp memoization detects edits to date, time or explicit timestamp; cached stimulus outputs are copied for callers. Future rendering retains state/time-dependent invalidation. The underlying forecast still projects scheduled workouts in order and respects manual commitments.

The previous one-second timer fix remains: elapsed-time ticks do not rebuild exercise helpers. Unchanged contents retain their DOM. Edit-driven loading refreshes are coalesced into one animation frame.
