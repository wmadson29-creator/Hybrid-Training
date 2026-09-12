# Hybrid Training v36.98 — Color Coherence Pass

v36.98 is a visual-only Clean Technical color-system cleanup built on the validated v36.97 model/state release.

## What changed
- Normalized legacy feature-specific colors to one semantic system:
  - blue = selected / primary / informational action,
  - teal = positive / complete / high-confidence,
  - amber = caution / started / watch,
  - red = critical / negative / guard.
- Fixed the Trends active filter, which still used the old near-white selected state.
- Updated older research-confidence badges, set-tracking states, movement-guide cues, good-form cards, recovery/trend status colors, real-media badges/warnings, and self-check confidence/status treatments.
- Updated movement-guide generated diagrams from the legacy green accent to the current teal positive accent.
- Updated the calisthenics auto-building exclusion warning to use the shared warning semantic variable.

## Intentionally preserved
- Training Calendar styling remains the older calendar treatment the user explicitly preferred.
- Barbell plate colors remain unchanged because they encode plate/load information rather than general UI state.
- No training-model coefficient, recommendation logic, fatigue/recovery rule, progression rule, or workout prescription was changed.
