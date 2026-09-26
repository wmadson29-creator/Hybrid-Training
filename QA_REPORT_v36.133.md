# QA Report — Hybrid Training v36.133

## Result

- **185/185 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- `git diff --check` passed.
- Build, manifest, service-worker cache keys, loaded modules, and required deployment files agree on v36.133.

## Universal secondary-builder coverage

The full-secondary chooser now has separate tests for all three user intents:

1. load the optimized plan immediately;
2. open a modality-specific guided builder;
3. start a fully blank workout.

Static regression checks verify the guided routes for aerobic/endurance, sprint/HIC, Gym, Calisthenics, Strength-Endurance, Kettlebell, and Class / Activity. They also verify that all generated full-secondary rows receive `isFullSecondary`, `secondarySessionRole: full`, and the appropriate training-type metadata.

## Actual-versus-planned verification

- Custom conditioning rows retain explicit planned minutes without pre-filling completed time.
- Existing actual-load tests verify that 20 completed minutes from a planned 45-minute swim is under-plan actual work.
- Existing over-plan tests verify that additional completed work raises modeled load and distinguishes tolerated from costly responses.
- Primary and secondary rows use the same actual-load profile.
- Completely unplanned work remains dose-weighted.

## Calendar and draft safety

- Full-secondary rows cannot replace the day primary identity.
- The Class / Activity completion path is explicitly gated by `savedSessionSecondaryOnly`.
- Manually added cards inherit a blank secondary workout's role before the draft is written, so a reload cannot silently turn them into primary work.
- One-time Gym/Calisthenics equipment stays isolated from persistent defaults.

## Swim builder verification

Browser coverage selects LSS Swim, sets a 35-minute plan, chooses breaststroke, and uses a custom 33 m pool. It verifies that:

- planned duration is 35 minutes;
- completed time is still blank;
- stroke and pool configuration reach the editable log card;
- the card remains a full secondary.

## Supplied export audit

The latest supplied export contains 138 exercise rows across 35 sessions and 30 recovery days. It passed with zero errors and the same two pre-existing warnings:

- 23 legacy strength rows carry irrelevant planned-minute values; current strength classification ignores them.
- one swim row has a distance that differs from pool length × lengths by more than 5%.

## Browser status

The expanded browser suite is included in `tests/browser-qa.js` and the GitHub Actions workflow installs Chromium before running it. This workspace could reach neither a preinstalled Chromium binary nor a usable browser download (the download endpoint returned an empty archive), so browser execution remains delegated to CI. This environmental limitation does not affect the 185 passing local checks.
