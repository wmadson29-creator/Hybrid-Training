# Hybrid Training v36.114

## Log Workout is now execution-first

The biggest change is the Log screen itself. Today/Home remains the place to choose the app's recommended workout; Log is primarily where that workout gets executed and recorded.

After one full workout is already logged, reopening Log no longer pre-fills the first workout or drops the user into a large configuration form. It starts with three direct inline choices:

- **Short secondary** — brief complementary add-on.
- **Full second workout** — separate complete session, including the existing user override when the model advises against it.
- **Build another** — choose the workout family directly in Log.

Build Another uses persistent inline buttons rather than modal/pop-out menus for Aerobic/LSS, Conditioning/Intervals, Generic Gym, Calisthenics, Strength-Endurance, KB Heavy/Power/Volume, and Custom Workout. Once a choice loads, the family chooser collapses so the screen goes back to logging.

A Custom Workout now starts with one blank exercise card. The large legacy setup/configuration block stays closed under **Advanced setup** unless the user explicitly asks for it.

## Cardio duration is authoritative from the activity card

The Start/Pause/Resume timer remains useful for elapsed session time and autosave, but it no longer controls the training dose for manually entered cardio.

For a pure run, walk, ride, swim, row, etc.:

- the duration entered in the activity card is saved as `sessionDurationMinutes` and is what history/model dose uses;
- the live timer is stored separately as `trackedSessionDurationMinutes`.

Example: timer runs for 6 seconds, but the user enters a 45-minute run → the workout is modeled as **45 minutes**, while the session clock is retained separately as **0.1 minute**.

CSV import/export preserves both fields. Export schema version is 49.

## Aerobic / LSS and Conditioning / Intervals are now distinct user-facing families

The old generic Conditioning bucket was doing too many jobs. v36.114 separates it into two clearer families:

- **Aerobic / LSS** — easy steady run, walk, swim, cycling, rowing, rucking, Triples, and similar endurance work.
- **Conditioning / Intervals** — sprints, HIC, GC, harder intervals, power work, and muscular/circuit conditioning such as Strength-Endurance Circuit.

The Cardio Library has explicit family controls, and the mobile More menu now gives Aerobic/LSS and Conditioning/Intervals their own destinations.

Internally, saved cardio sessions still use the existing `Conditioning` value so prior history remains compatible. The recommendation model still uses its more specific Run / Other Cardio / Speed-HIC lanes underneath the clearer UI grouping.

## Final cleanup fixes

The release-hardening pass also fixed:

- a select-option labeling bug where changing the visible word `Conditioning` accidentally changed the stored select value;
- Build Another remaining expanded after a workout was already chosen;
- Custom Workout forcing Advanced setup open;
- Strength-Endurance Circuit being incorrectly grouped under Aerobic/LSS through an inherited cadence classification.

## Existing behavior preserved

- v36.112 one-ended landmine loading remains intact.
- v36.113 short-secondary and full-second-workout override behavior remains intact.
- v36.111 primary-model scope fix remains intact.
- The user's Sep 13 state still resolves through the primary model to **LSS Run, 40–55 min, RPE 4–5**.
