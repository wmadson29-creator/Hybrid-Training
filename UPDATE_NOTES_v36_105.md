# Hybrid Training v36.105 — Weak Links + Full Second Workouts

## New: repeated weak-link inference
- Detects a strength movement that is repeatedly harder than predicted while related movements are behaving normally.
- Looks for secondary/stabilizing muscle demands that distinguish the struggling movement.
- Cross-checks direct exercises that strongly train the suspected muscle when those data exist.
- Requires repeated evidence; one anomalous hard set/session is insufficient.
- Poor/sloppy technique can block the inference.
- `Too easy` feedback is directionally negative evidence and cannot create a false “unexpectedly hard” signal.
- Dashboard surfaces the hypothesis, confidence, comparators, and targeted exercise suggestions.
- Moderate/high-confidence weak links receive only a small capped priority boost in adaptive Gym/Calisthenics exercise selection; fixed anchor programming is not rewritten.

## New: full second-workout guidance
- Appears after a completed primary workout is logged today.
- Separate from smart-secondary/add-on logic; this builds a complete second session.
- Ranks full Conditioning, Generic Gym, Calisthenics, and Strength-Endurance options.
- Scores cadence need, same-day overlap, current fatigue/recovery, next fixed anchor, repeated modality, and time since the first session.
- Gives contextual same-day separation guidance (~3–4 h depending on combination).
- Can explicitly recommend stopping after one workout when recovery/fatigue or low-value overlap makes another full session a poor trade.
- Does not recommend a third full workout after two are already logged today.

## Preserved
- v36.102 partial-deployment/update-loop protections.
- Assisted Dip Machine 10-lb selector increments from v36.103.
- v36.104 seven-category exercise-effort scale including `Too easy`.
- Existing Barbell Strength, KB, conditioning, fatigue/recovery, pull-up, storage, and calendar behavior.
