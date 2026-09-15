# Calendar + Secondary Schedule QA — v36.119

## Scope
This follow-up verifies the calendar/secondary integration and the conditioning-family comparison UI after the Home Secondary matrix and LSS/Sprints split.

## Verified behavior
- Every visible calendar day contains one Primary label and one Secondary status line.
- Secondary status is explicit as Full, Short, or None.
- Model-recommended full second workouts appear in the calendar instead of being suppressed when the Secondary matrix is enabled.
- Synthetic/default-state regression for the Sep 14–20, 2026 week produced a weekend double on Saturday: Saturday primary Sprints / HIC plus a full Gym secondary; Sunday retained its own primary. That is three total weekend workouts across Saturday/Sunday.
- The same regression showed no duplicate Primary label and no legacy short-secondary text embedded in an LSS primary calendar description.
- Compare training modes contains LSS / Aerobic and Sprints / HIC as distinct family entries; the current family is marked Current.
- Custom short/full family choices persist a calendar-readable selection label.

## Performance / runtime
- Cold headless render to Secondary matrix: ~2.0–2.2 s in the regression environment, essentially unchanged versus the immediately preceding conditioning/performance build.
- Seven calendar Secondary lines rendered without additional page or console errors.
- All inline JavaScript blocks pass `node --check`.

## Important model note
The weekend allocator itself was not forced to schedule a double every weekend. It remains recovery/need/interference aware. This change restores visibility of a weekend double when the allocator chooses one; it does not fabricate a second session when the model rejects it.
