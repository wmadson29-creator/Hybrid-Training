# Sprint / Hill Research Model QA — v36.119

Scope: sprint/hill fatigue differentiation and hill-grade logging only. No unrelated scheduling, strength, stretching, logging, or UI model behavior was intentionally changed.

## Implemented
- Added distinct bounded profiles for Short Hills, Standard Issue Hills, Apex Hills, 600 Meter Resets, Oxygen Debt 101, Speed-Endurance Ladders, Connaught Range 10 to 1s, Meat-Eater, Anaerobic Capacity, Meat-Eater III, Bloody Lungs I/II, plus generic hill and flat-sprint fallbacks.
- Profiles now differ in systemic, aerobic, anaerobic, power, impact, high-speed hamstring exposure, major lower-body muscle emphasis, and tissue channels.
- Logged rep count and work:rest density refine acute load where those fields are available.
- Hill grade modifies hill profiles: steeper grades shift the model toward acceleration/positive-work demand and away from maximal-velocity exposure, while increasing calf/Achilles and knee/quad channels within bounded limits.
- Added hill-grade logging presets: Parking garage ramp (model default 11%), 5%, 8%, 10%, 12%, 15%, and exact/custom grade.
- Added Parking Garage as a surface option for hill sessions.
- The parking-garage preset applies to Short Hills, Standard Issue Hills, Apex Hills, Bloody Lungs I/II, and generic hill-named sessions.
- Exact entered grade overrides the preset.
- Existing historical sessions without hill-grade data remain compatible; hill sessions use the user's parking-garage default when no grade was saved.

## Safety / interpretation
The coefficients are research-informed relative priors used for recommendation/fatigue comparisons. They are not injury probabilities, diagnostic claims, or exact EMG percentages.

## Static QA
- All inline JavaScript blocks parse with `node --check`.
- Service-worker cache key changed to `hybrid-training-v36-119-sprint-hill1` so the patched shell is not masked by the prior cached build.

## Runtime-isolated regression harness
A source-exact Node harness loaded the shipped sprint/hill patch with the app interfaces stubbed and verified:
- parking-garage preset resolves to 11% and exact grade overrides it;
- hill UI appears for Short Hills, Standard Issue Hills, Apex Hills and Bloody Lungs hill complexes, but not flat sprint sessions;
- Parking Garage appears as a hill surface option;
- Short Hills has lower systemic and high-speed exposure than Oxygen Debt 101;
- Speed-Endurance Ladders retain the highest accumulated systemic/anaerobic tier;
- increasing Standard Issue Hills from 5% to 15% lowers high-speed exposure while increasing glute and calf/Achilles emphasis;
- row fingerprints and tissue-dose functions consume the new profiles without runtime exceptions.

Result: PASS.
