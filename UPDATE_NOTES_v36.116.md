# Hybrid Training v36.116 — Update Notes

### Effort now changes training-dose credit
The model now distinguishes **performance evidence** from **training stimulus**. Finishing a prescribed resistance exercise very easily can be useful evidence that capacity is higher, but it no longer counts as though the muscle received a full hard-workout dose.

The inline Exercise Effort choice now directly affects effective muscle volume, strength/hypertrophy stimulus, recent fatigue, Gym muscle targeting, dose-response learning and related diagnostics.

- **Too easy:** strong underloading signal; low muscle-volume credit, but some strength/technique credit remains.
- **Easy:** partial volume credit.
- **Comfortable:** meaningful but not full hard-set credit.
- **Challenging / Very hard:** near-full or full stimulus, with corresponding fatigue cost.
- **Not sure:** neutral; objective performance can carry the model.

This is global for resistance work — Barbell Strength, Gym, KB, Calisthenics, Strength-Endurance and custom resistance rows — not a chest-specific rule.

### Barbell Strength stays protected
This does **not** change Barbell Strength training maxes inside the current block. Easy Barbell work can make a muscle look less fully trained to the discretionary Gym/secondary model, while the fixed Barbell progression itself remains intact.

### Current-data effect
With the current export, recent Easy chest-machine work now counts materially less toward the “already trained” chest volume that suppresses extra Gym work. Chest can therefore rise in Gym priority when appropriate, but it is not forced above other muscles with a larger current need.
