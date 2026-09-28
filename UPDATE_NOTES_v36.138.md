# Hybrid Training v36.138

Release date: 2026-09-28

## Consecutive Gym days use the existing model, not a hard ban

The planner now treats yesterday's full Generic Gym work as another fatigue-and-spacing input inside automatic focus scoring. The adjustment scales with the actual completed dose when history exists and with the intended dose during a future-calendar projection.

This deliberately remains soft. A repeated muscle can still win when its weakness, due volume, exercise progression, equipment fit, and recovery evidence outweigh the spacing cost. Manual plans are not rewritten, fixed Barbell Strength and kettlebell anchors remain authoritative, and a started or completed workout stays unchanged.

## Future-calendar cache correctness

The adjacent-day screenshot exposed a cache-order problem rather than a missing absolute rule. A later date could reuse a recommendation memoized before the preceding projected workout had been appended to the rolling forecast. Forecast context is now part of the cache key, and the semantic Gym recommendation version is advanced so an obsolete unstarted generated plan refreshes once.

With the supplied v36.133 export, Oct. 10 now forecasts Hamstrings / Glutes + Quads + Biceps and Oct. 11 forecasts Shoulders + Back + Biceps. The single biceps overlap is intentional; the broader near-repeat is removed.

## Mobile responsiveness

- Closed Gym and Calisthenics catalogs create no hidden exercise cards.
- Catalogs render progressively: 36 Gym or 30 Calisthenics cards per batch.
- Research source rows are created only when the user opens a research disclosure.
- Heavy generated views release their markup when the user leaves them.
- Repeated anatomy, relationship, conditioning, bodyweight, history, development, and date calculations use bounded invalidated caches.

In the real-export replay, v36.137 retained roughly 21,474 DOM nodes after visiting Gym, History, and Trends. v36.138 returns to roughly 3,617 nodes after leaving those views. A sampled CPU profile reduced cumulative `utmFingerprint` time from about 2.8 seconds to about 0.25 seconds.

## Existing-data startup safety

The latest-export replay found and fixed a temporal-dead-zone error in the new local-date cache during migration. Browser QA now opens a second page with pre-existing saved workout and recovery data and requires it to reach the full interface without an exception.

## Data safety

This release changes recommendation scoring, cache keys, and rendering lifecycle only. It does not delete or reset training history, recovery observations, body measurements, wearables, scheduled anchors, equipment profiles, or user-authored workouts.
