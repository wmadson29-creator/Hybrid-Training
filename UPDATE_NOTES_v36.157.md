# Hybrid Training v36.157

All five approved improvements are implemented:

1. Internal kettlebell changes are prominent; full contents and loading order are expandable.
2. A workout loading overview shows each bell's starting load and an expandable exercise-by-exercise adjustment table. Barbell anchors get a matching per-side overview.
3. Weight changes, substitutions, removals and reorders recalculate physical KB allocation and ordered internal contents without changing entered doses or exercise order.
4. Navigation and forecast profiling led to reuse of forecast signatures, exercise-pair transfer geometry, timestamp parsing, projected stimulus evidence and movement slots. Redundant dashboard/future-date rendering is reduced.
5. Repeated workout metadata moves into a collapsed Workout context section. Instructions and rationale remain accessible inline.

## Plate loading rule

At each exact target, use the minimum possible plate count. Among those combinations, minimize removals/additions across the loaded sequence, accounting for stack order. Keep the longest shared inner prefix; remove from the access end, then add in the listed order. Temporary unloading/reloading of outer plates counts as handling.

For kettlebells, optimize each allocated physical bell independently, retaining it across intervening exercises. Both bells use the saved finite inventory. At 16 kg, the default 12 kg shell uses one 4 kg plate. At 24 → 26 → 24 kg, retain 6 + 3 + 3 kg and add/remove the outer 2 kg plate.

For Barbell Strength squat → deadlift → row, maintain the existing fixed lifting sequence and symmetric stacks. Purple 55 lb plates stay limited to those three lifts on Barbell days. Other plate-loaded exercises use minimum plate counts from their usual sizes. Unavailable exact loads are explained without rounding.

Minimum plate count is now a hard constraint. A setup with extra plates can no longer win solely because it saves a later switch. The optimizer counts plate handling, not seconds, collar/tool work or inaccessible hardware geometry. Only use an internal order your bell permits; the assumed 12 kg shell remains editable.

Upload extracted cumulative-update contents into the existing repository and preserve unrelated assets. No push or deployment has been performed.
