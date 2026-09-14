# Hybrid Training v36.119 — Update Notes

## Dynamic multi-session allocation

v36.119 removes the remaining hard-coded Sunday ownership of the weekend double-session slot.

The planner now evaluates Saturday and Sunday together and chooses where the third main weekend workout belongs. It compares both days and compatible orderings such as:

- Conditioning / endurance first + full Gym second
- Full Gym first + a substantial low-impact aerobic second session
- Fixed KB work + compatible aerobic work in Hybrid phases

The choice is based on current athletic-development deficits, recovery state, separate mechanical/tissue load, same-day compatibility, learned interference, and the next fixed Barbell/KB anchor. Saturday and Sunday receive the same weekend-capacity treatment; neither day gets an arbitrary bonus simply for being Saturday or Sunday.

## Weekday doubles are possible, but intentionally uncommon

Two full workouts can now be automatically planned on weekdays when the evidence is strong enough. This is deliberately harder to trigger than weekend stacking.

The automatic weekday gate considers:

- rolling running/aerobic/strength-development need
- current recovery and caution/guard status
- mechanical/tissue stress
- the next fixed training anchor
- primary/secondary session compatibility
- learned personal interference when enough evidence exists
- recent weekday double-session history

The planner uses a rolling spacing window rather than assigning a fixed weekday. In the future 2-Barbell + 3-KB phase, KB + easy run/swim doubles can therefore appear without becoming an every-KB-day rule.

Only completed work earns development dose. If a planned second workout is skipped, there is no punishment or fake completion credit; the missing dose remains outstanding and the later calendar is recalculated, allowing the extra session to migrate to a better day.

## Startup / migration hardening

The v36.91 storage architecture is preserved: IndexedDB remains the durable full-history store while localStorage keeps a compact recent boot journal and a migration safety copy.

v36.119 adds a bounded startup fallback so a browser that leaves an IndexedDB request pending cannot hold the app behind the hydration gate indefinitely. The first authoritative render waits up to 2.4 seconds for durable hydration; if that request stalls or fails, the app reconstructs from the recent boot journal plus the migration safety copy and continues loading. Raw IndexedDB opens also have a 3.5-second upper bound so restore/self-check/background calls cannot hang forever.

This is a resilience guard, not a storage reset. Existing history remains compatible; do not clear app data and do not re-import solely for this update.

## Forecast and UI behavior

The existing calendar “Second main” treatment is reused; no new UI complexity was added. The legacy internal `weekendSecondMain` field remains for backward-compatible forecast plumbing even when a planned double occurs on a weekday.

## Preserved behavior

- Fixed Barbell Strength and KB anchors remain authoritative.
- v36.118 tissue-stress, physiology-based endurance prescription, personal interference learning, backtesting, and hysteresis remain intact.
- v36.116 effort-aware resistance stimulus remains intact.
- Manual full-second-workout override remains available even when the automatic threshold is not met.
- Existing export/import and stored-history schemas remain compatible.
