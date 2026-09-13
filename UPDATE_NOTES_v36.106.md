# Hybrid Training v36.106 — Diagnostics, Progression, and Release Hardening

v36.106 keeps the v36.105 program structure intact while adding the advisory/model layers requested after the v36.105 release.

## Added or expanded
- Personalized muscle-recovery learning with confidence aging and data-quality warnings.
- Conservative plateau diagnosis that distinguishes recovery, pain/confounding, technique, exposure, and likely programming causes before calling a strength deficit.
- Left/right asymmetry tracking from repeated unilateral evidence.
- Adaptive cardio progression across running, swimming, cycling, and other aerobic modes.
- Dynamic warm-ups based on the day/session demand.
- Post-workout stimulus summaries and missing-stimulus detection with indirect coverage credit.
- Richer longitudinal exercise history and confidence-aware diagnostics.
- Smarter substitution and pain-aware movement handling carried into the recommendation layer.
- Full second-workout guidance and repeated weak-link inference from v36.105 remain intact.

## Recommendation-frequency calibration
Automatic Calisthenics and Strength-Endurance recommendations are intentionally less frequent on flexible days. In a deterministic 180-day sequential-completion simulation, the combined Calisthenics + Strength-Endurance share fell from 11 recommendations in the baseline policy to 6 in v36.106: a 45.5% reduction. Manual switching remains available.

## QA corrections made before release
A deeper adversarial QA pass found and fixed several issues before deployment:
- `Stationary Bike LSS` could be classified as Speed / HIC when no exact library profile matched it. Obvious easy/LSS/Zone-2 bike, cycle, swim, row, elliptical, and stair modalities are now Other Cardio before hard/sprint fallback logic.
- Exact Run / Other Cardio / Speed cadence ties were being broken alphabetically, which could make a fresh profile prefer Other Cardio for no physiological reason. Ties now use an explicit Run → Other Cardio → Speed/HIC priority while true urgency still wins.
- The v36.70 duration floor had over-corrected the earlier under-filled workout problem: 60–120 minute Gym/Calisthenics requests could be padded with excessive sets/exercises. Duration now credits most prescribed rest and realistic transitions, uses lower quality-aware work floors, and leaves very long requests short rather than adding junk volume.
- Full second-workout scoring could recommend a full strength session the day before a fixed Barbell Strength/KB anchor, and could still favor Calisthenics/SE despite their automatic-frequency reduction. Next-day strength anchors now strongly suppress full strength second sessions, negative net scores are never called recommended, and second-session scoring inherits the same automatic Calisthenics/SE preference biases.
- Service-worker installation previously swallowed required precache failures, so a partial deployment could activate and delete the old working cache. Required app-shell assets now fail the install closed; only cosmetic icons are optional.

## Explicitly not included
- Within-workout autoregulation.
- Weekly schedule optimizer.

Those two systems were intentionally excluded from this release per request.
