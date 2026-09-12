# Hybrid Training v36.99 — Calendar Color Unification

This release corrects the interpretation of the calendar-design preference.

## What changed
- The Training Calendar keeps the same layout, information density, week scrolling, date/session/focus content, current-day marker, selected-day behavior, and controls.
- The calendar no longer uses the older standalone green/blue palette.
- Calendar surfaces, borders, buttons, select control, labels, and day cards now use the Clean Technical dark-slate system used elsewhere.
- Selected date uses the primary blue interaction color.
- Today/current date uses teal so “current” and “selected” remain visually distinct.
- Logged/completed calendar status uses the shared positive teal semantic color.
- Barbell plate colors remain unchanged because they encode actual plate values, not theme state.

## Non-changes
- No calendar functionality was removed or condensed.
- No recommendation, fatigue, recovery, progression, scheduling, or training-model logic changed.
