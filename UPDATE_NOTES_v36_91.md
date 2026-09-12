# Hybrid Training v36.91 — Update Notes

## Storage and resilience
- Moves durable workout history, recovery, bodyweight, wearable, rest-day, and settings snapshots to IndexedDB when available.
- Keeps a much smaller recent-data boot journal in localStorage for fast startup and crash resilience.
- Maintains bounded durable restore snapshots and exposes them in Settings → Storage, Restore & Model Health.
- Archives the current state before restoring an older snapshot.
- Falls back to localStorage/safety data if IndexedDB is unavailable.
- Emergency backup/recovery now understands both storage tiers.

## Model and performance
- Adds worker-backed history/recovery preprocessing so expensive derived-history work can be prepared away from the main UI path.
- Adds conservative personal muscular-recovery learning. Multipliers are confidence-shrunk, bounded, and require repeated informative exposures.
- Small learned differences stay on the research prior until the evidence/meaningfulness gate is crossed.
- Systemic, impact, soreness/tissue, and other established recovery channels are not overwritten by the personal muscle learner.
- v36.90 recommendation/prescription behavior is preserved unless meaningful personal recovery evidence eventually earns a change.

## Explainability and UI
- Adds “Why this today?” with confidence/margin, ranked drivers, and what changed since yesterday.
- Adds direct comparison against alternative modes.
- Adds Personal Recovery visibility in Trends/Settings.
- Adds progressive History rendering: recent dated entries render first, older entries load in bounded pages.
- Adds one-tap session completion for common cases while leaving exercise effort unknown when the user did not report it.
- Adds an in-app non-destructive self-check panel.

## QA hardening
- Fixed persistence ordering so an asynchronous worker result cannot overwrite a newer user save.
- Fixed storage/recovery helper scoping and recovery-decay references found during QA.
- Excludes missed/skipped work from the new recovery-learning fatigue contribution where appropriate.
- Added/validated fixed-anchor invariants and deterministic recommendation checks.
- Service-worker activation remains scoped to Hybrid Training cache names only.
