# Hybrid Training v36.117 — Athletic-development scheduling

- Replaced equal open-day modality rotation with rolling adaptation targets for run-specific aerobic work, total aerobic dose, and speed/quality work.
- Other cardio is now an aerobic support/substitution tool rather than an equal-frequency quota.
- Gym, Calisthenics, and Strength-Endurance are need-driven from productive stimulus, weak links, and recent exposure. In Hybrid mode, SE/Cal automatic need is reduced further because three kettlebell anchors already cover overlapping qualities.
- Cardio adaptation credit now accounts for duration plus effort/output context where available; easy aerobic work stays productive, while very short or clearly mis-zoned sessions receive less credit.
- Added single-session run progression guard against a proposed run exceeding about 110% of the longest run in the prior 30 days when usable pace/distance history exists. This is a caution rule, not an injury guarantee or ACWR threshold.
- Saturday in Barbell Strength Only is biased toward a substantial run / running-quality session when recovery permits.
- Sunday in Barbell Strength Only is biased toward a full upper/weak-link Gym session when Gym need is meaningful, followed by a true low-impact aerobic second session (normally 40–50 min swim) when recovery remains normal. Future weekend forecasts include that second main session.
- In Hybrid mode (2 Barbell + 3 KB anchors), compatible double sessions become normal: KB Heavy may pair with easy running, KB Volume with low-impact aerobic work, and KB Power is protected so automatic same-day conditioning stays easy/low-impact.
- Hard running / speed work receives more separation and interference penalty around strength/power than easy low-impact aerobic work.
- Fixed Barbell Strength / KB anchors and Barbell TM progression remain authoritative; this layer does not change TMs mid-block.
- Base Building remains isolated from this optimizer.
- Fixed forecast-cache key so run/cardio/speed lane requests cannot accidentally reuse a plan cached for a different lane.
