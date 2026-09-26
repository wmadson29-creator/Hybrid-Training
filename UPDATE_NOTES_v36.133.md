# Hybrid Training v36.133

Release date: 2026-09-26

## Every full-secondary workout has three clear paths

- **Use optimized plan** keeps the fast, model-built option for LSS / Aerobic, Sprints / HIC, Gym, Calisthenics, Strength-Endurance, and each Kettlebell session style.
- **Customize this type** opens a date-specific builder with inputs that fit that modality.
- **Start blank** creates a completely new workout with no model-selected exercises.

The optimized workflow was not replaced. The additional paths make it possible to accept the model's plan most days and build something different when needed.

## Modality-specific customization

- **Gym:** muscle groups and sub-regions, priority, difficulty, rep/load style, time, equipment preferences, and one-time exercise availability.
- **Calisthenics:** available gear, push/pull/legs/core focus, difficulty, and time.
- **LSS / Aerobic:** exact modality, duration, intended effort, and optional structure. Swim plans also accept stroke and standard or custom pool length.
- **Sprints / HIC:** exact sprint, hill, interval, general-conditioning, or power session; time; target RPE; and an editable work/rest target.
- **Strength-Endurance:** equipment, kettlebell setup, time, freshness, and circuit starting emphasis. The model still chooses a full-body dose around recovery and nearby anchors.
- **Kettlebell:** Heavy, Power, or Volume; available bells; time; and focus. Loads snap to settings the selected bells can provide.
- **Class / Activity:** exact class, sport, outdoor session, or activity plus planned duration and effort.

Every generated row remains editable. Exercises or activities can be added, removed, reordered, or swapped before the workout starts.

## Actual work remains authoritative

- Planned duration is stored separately from completed duration.
- A planned 45-minute swim recorded as 20 minutes contributes the 20-minute actual dose; the unused 25 minutes do not create fatigue.
- More work than planned contributes the larger actual dose, with repeated tolerance evidence determining whether future capacity should rise.
- The same rule applies to primary workouts, full second workouts, short secondaries, substitutions, and unplanned work.
- Selecting a swim stroke or pool setup preloads those fields, but actual distance, lengths, time, pace, heart rate, and RPE remain blank until recorded.

## Secondary-role safety

- Every custom full second workout retains `full` secondary identity through the editor, autosaved draft, History Edit, export/import, and final save.
- A full-secondary class/activity cannot replace the date's primary workout or calendar identity.
- Completely blank secondary workouts pass the role to every manually added resistance or conditioning card, including after draft restoration.
- One-time Gym and Calisthenics equipment choices do not alter normal equipment defaults.

## Carried-forward corrections

- Current recovery observations remain visible to readiness and model consumers.
- Saved date context is visible and independently editable/clearable in History.
- The Home context control confirms durable saves.

## Verification

- **185/185 static and model checks passed.**
- JavaScript parse, build/cache coherence, required-file, DOM-ID, role persistence, actual-vs-planned, recovery, import/export, exercise metadata, and model invariants passed.
- The latest supplied export passed with zero errors and two pre-existing data-quality warnings.
- Real-browser coverage now exercises Calisthenics, aerobic/swim, Sprints / HIC, Strength-Endurance, Kettlebell, and Class / Activity secondary builders. GitHub Actions installs Chromium and runs this suite.
