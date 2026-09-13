# Hybrid Training v36.106 — QA Report

Release candidate: v36.106
Baseline regression target: v36.105

## Automated checks completed
- All inline/core JavaScript and the extracted shell JavaScript pass syntax checks.
- HTML ID audit found no duplicate IDs.
- Responsive browser smoke tests at 320×800, 390×844, 768×1024, and 1440×1000 produced no page errors, console warnings/errors, or horizontal overflow. Calendar next/previous/today navigation round-tripped correctly at every viewport.
- Focused v36.105→v36.106 regression suite: 27/27 checks passed, including preservation of the v36.105 core API subset, weak-link empty state, second-workout initial behavior, manual Gym/Calisthenics availability, Strength-Endurance presence, and Barbell Strength program context.
- Plateau short-history false-positive test passed.
- Pain-context plateau test passed: recent pain is treated as a confounder rather than evidence of weakness.
- Weak-link pain-only test passed: pain-flagged rows do not create a weak-link hypothesis.
- Deliberately uneven unilateral history produced the expected left-side asymmetry signal with confidence gating.
- Missing-stimulus test passed when all target qualities were recently covered, including indirect coverage.
- Cardio progression scenarios passed for run, swim, and stationary-bike LSS after the bike-classification correction.
- Dynamic warm-up branch tests passed for strength and speed/HIC cases.
- Repeated pain flags correctly surface a data-quality caution.
- 180-day recommendation-frequency simulation produced a 45.5% reduction in automatic Calisthenics + Strength-Endurance recommendations versus the prior cadence policy. Full second-workout ranking now also inherits those preference biases instead of bypassing them.
- Duration sanity regression: a 60-minute full-body Medium Gym build fell from 43 working sets to 26 (~57 min estimated), and equivalent Calisthenics fell from 44 to 28 (~55 min), while 20/30/40-minute builds remain close to their requested time. Long requests stop at quality ceilings rather than padding with redundant work.
- Fresh-profile cadence tie regression now selects Run rather than alphabetically selecting Other Cardio. Dedicated Stationary Bike LSS / Run / Sprint synthetic history correctly updates only the cardio / run / speed lane respectively.
- Travel context disables automatic pool access; No-gym context removes gym access; severe recovery context chooses Full Rest and suppresses add-on/second-session recommendations.
- Two completed full sessions still hard-stop any third full-session recommendation. Very long easy walking remains materially lower modeled local fatigue than a much shorter moderate run.

## Deployment checks
The release uses matching `36.106` identifiers in `index.html`, `version.json`, `manifest-v36.webmanifest`, `sw.js`, and the shell filenames. `version.json` names all required assets so the app's update checker rejects partial deployments. The service worker also fails installation if any required shell asset is unavailable, so a partial deployment cannot take over and purge the prior working cache. The production release is intended to be committed atomically.

## Environment limitation
This execution environment blocks normal localhost/file navigation, so service-worker installation and takeover could not be exercised end-to-end in a live origin. Service-worker JavaScript, asset references, cache versioning, and deployment-bundle consistency were validated statically; the same app was exercised in Chromium by injecting the complete HTML document.
