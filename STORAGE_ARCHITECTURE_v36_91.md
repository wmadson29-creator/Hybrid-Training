# v36.91 Storage Architecture

## Goals
The app must remain responsive as workout history grows, survive ordinary browser/app interruptions, preserve backward compatibility with existing localStorage installs, and avoid silently replacing newer user data with an older asynchronous model result.

## Tiers
### 1. IndexedDB durable state
When IndexedDB is available, it is the canonical durable store for the full training state. Saves are timestamped and reason-tagged. The app also maintains a bounded set of restorable snapshots.

### 2. Recent localStorage boot journal
A compact recent-data state is written for fast startup and crash recovery. It contains settings plus a recent window of logs/recovery/bodyweight/rest data and metadata describing the full durable counts. It is intentionally not the canonical long-history store.

### 3. Safety checkpoint
A bounded safety copy is retained when size permits. This supports migration/fallback recovery if the durable database cannot be opened.

## Startup
The app can paint from the lightweight boot journal first. It then opens IndexedDB, reconciles the durable snapshot with the boot state using persistence timestamps, primes worker-derived history/recovery data, invalidates model caches as needed, and performs the hydrated render.

## Save ordering
User mutations receive a newer persisted timestamp before being queued. Worker-derived learning updates are merged/persisted only against the current state ordering. QA specifically verifies that Quick Complete data remains present after a subsequent worker refresh and durable flush.

## Restore
The Settings restore UI lists durable snapshots with timestamps and content counts. Restoring an older snapshot first archives the current state, then writes the selected snapshot as the new durable state and reloads the app.

## Fallback
If IndexedDB cannot be opened, the app continues from the local boot journal and, when needed, the migration safety copy. The fallback test verifies that old history outside the recent boot window can still be recovered from the safety copy rather than silently disappearing.
