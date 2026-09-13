# Hybrid Training v36.108

## Reliability fixes
- Recovery metrics render independently from the optional deload advisory, so valid Helio data can no longer be replaced by an empty card when a longitudinal model faults.
- Deload synthesis is fail-soft and cannot block adaptive readiness.
- Open-day recommendations have a recovery-aware resilient scorer; an optional model/history exception can no longer degrade the day to `Open Training`.
- Persisted-state normalization now uses the entire defaults schema, catching object/array drift across all settings containers rather than only selected fields.
- Existing v36.107 row/set/component repairs are preserved.
