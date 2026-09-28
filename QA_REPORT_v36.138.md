# QA Report — Hybrid Training v36.138

## Result

- **213/213 static and model checks passed.**
- **34/34 Chromium browser checks passed.**
- All standalone and inline JavaScript parsed successfully.
- Build, manifest, service-worker namespace, cache busters, and required deployment files agree on v36.138.
- The browser suite reported no uncaught page exceptions or console errors.

## Adjacent-day model coverage

The tests require that:

- prior-day full Gym work contributes a dose-sensitive focus penalty;
- equal need selects complementary focus areas;
- a deliberately large shoulder need can still override the penalty and repeat shoulders;
- projected workout context participates in future recommendation cache keys;
- obsolete generated plans refresh while manual, active, and completed plans remain fixed; and
- comparable exercises rotate without discarding useful progression continuity.

## Performance and upgrade coverage

The browser suite verifies lazy library rendering, progressive pagination, lazy research hydration, view cleanup, and existing-data startup. A real-export replay verified:

- initial interface: about 3,617 DOM nodes;
- opened Gym library: 36 cards, zero hidden citation rows, about 4,376 nodes;
- after leaving Gym: about 3,617 nodes;
- History: about 6,632 nodes, returning to about 3,617 after exit;
- Trends: about 5,514 nodes, returning to about 3,621 after exit; and
- future-week render: roughly 250–325 ms in the local headless run.

Absolute startup timing varies by browser build and host. The performance changes are guarded by behavioral checks rather than a fragile fixed-time threshold.

## Latest export audit

`hybrid-training-export (20).json` passed the audit. It contains 149 exercise rows across 39 sessions, 32 recovery days, six bodyweight entries, and four rest-day records. Four historical warnings remain:

- 23 legacy strength rows contain a planned-minutes field from an older parsing bug; current classification ignores it for strength.
- One swim row has a distance that differs from pool length multiplied by lengths by more than 5%.
- One historical secondary-outcome link points to a different date, primary, or secondary type.
- One historical date stores a secondary-only session as the day primary even though the completed primary is unambiguous.

These records are retained for auditability. Current schema-54 migration and runtime logic protect new decisions without silently rewriting historical training data.
