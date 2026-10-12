# Hybrid Training v36.161

Refined the within-workout model's handling of timed/unilateral exercise duration, known effort, actual set details and shared grip/bracing demands. Automatic Gym/Calisthenics order and later targets now include bounded shared demand; muscle volume caps remain separate. All-skipped and zero-set work contribute no fictional fatigue. Manual and completed targets and stable baseline recalculation remain protected.

Mixed kettlebell/bodyweight weekly core now includes stationary suitcase/front-rack marches. It selects a suitable light bell, prefers an existing setting when compatible, uses exact ordered loading, and falls back to bodyweight for unsuitable equipment or accumulated fatigue. Its own comparable completed history can progress hold time without automatically increasing weight. Explicit day equipment no longer assigns KB weight to floor core.

The KB overview explains the patio context: no walking carries in the prescribed A/B/C routines. Brief farmer/suitcase holds are optional catalog/substitution choices, not automatic extra exercises. Existing manual workouts remain authoritative.

Build/cache/assets 36.161; recommendation stamp 23; automatic Gym plan version 5. No new runtime module. Two focused QA suites added, plus the broad regression pass. See MODEL_INTERACTION_REVIEW_v36.161.md and QA_REPORT_v36.161.md. Preserves v36.160 calendar/secondary consistency and recovery placement. Prepared for repository upload; not pushed or deployed.
