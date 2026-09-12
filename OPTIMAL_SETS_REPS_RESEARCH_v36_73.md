# Hybrid Training v36.73 — Optimal Sets & Reps Research and Implementation

## Scope

v36.73 extends the evidence-oriented prescription system to **all 98 Generic Gym exercises** and **all 101 Calisthenics exercises**. Barbell Strength remains governed by its fixed program and is intentionally excluded from this adaptive Optimal prescription engine.

The app retains the separate Generic Gym user choices for **Optimized by Exercise**, **High Reps / Lighter Weight**, **Moderate**, **Lower Reps / Heavier Weight**, and **Power / Explosive**. The exercise-specific rules below apply only to the Optimized option.

## Evidence interpretation

The model does **not** claim that research has discovered one unique scientifically optimal rep count for every named exercise. Instead, research defines defensible boundaries and priorities; the exact exercise-level window is an evidence-informed Hybrid Training programming rule based on loadability, stability, technique cost, local/systemic fatigue, unilateral demands, movement purpose, and available progression methods. The UI states this distinction inside each Sources & evidence drawer.

### Core sources

1. **ACSM Position Stand — Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance** (2026). The overview synthesized 137 systematic reviews (>30,000 participants). It supports heavier loading for maximal voluntary strength, higher volume for hypertrophy, and moderate loads moved quickly for power, while showing that many prescriptions can improve outcomes.  
   PubMed: https://pubmed.ncbi.nlm.nih.gov/41843416/

2. **Progressive overload without progressing load? The effects of load or repetition progression on muscular adaptations** (Plotkin et al., 2022). In resistance-trained participants, progressing repetitions and progressing load were both viable strategies over the study period. This supports bounded double progression when appropriate.  
   PubMed: https://pubmed.ncbi.nlm.nih.gov/36199287/

3. **Effect of Progressive Calisthenic Push-up Training on Muscle Strength and Thickness** (Kotarsky et al., 2018). Progressive calisthenic variations improved upper-body strength and support using leverage/variation progression rather than treating bodyweight exercise as non-progressive.  
   PubMed: https://pubmed.ncbi.nlm.nih.gov/29466268/

4. **Task Specificity of Dynamic Resistance Training and Its Transferability to Non-trained Isometric Muscle Strength** (Saeterbakken et al., 2025). The meta-analysis supports keeping direct performance on the exact task stronger than related-exercise evidence.  
   PubMed: https://pubmed.ncbi.nlm.nih.gov/40314751/

Additional exercise-, anatomy-, rest-, RIR-, volume-, biomechanics-, and modality-specific sources are attached at card level in the app's **Sources & evidence** drawers. The source registry includes status handling for active, corrected, and retracted evidence; retracted sources are excluded from model decisions.

## Generic Gym Optimal model

Every one of the 98 Gym exercises resolves:
- a preferred rep range;
- base, minimum, and maximum useful sets;
- an exercise-appropriate rest prior;
- progression method;
- evidence confidence;
- one or more research citations.

Broad principles include lower/moderate reps and restrained set counts for highly fatiguing floor pulls; moderate ranges for readily loadable compounds; moderate-to-higher ranges for stable machines and single-joint work; higher practical ranges for small isolation/cuff work; and low-repetition, speed-preserving prescriptions for power exercises.

### Progression

Where appropriate, Optimal uses bounded double progression:
1. progress repetitions within the exercise-specific window;
2. require acceptable effort/form/recovery at the upper boundary;
3. increase resistance when the next increment is reasonable;
4. reset toward the lower end of the window;
5. repeat.

The progression is not automatic merely because the displayed rep ceiling was touched. RPE, performance quality, recent recovery, prediction error, and equipment increment size can delay or modify the load increase.

Power exercises do not chase the top of ordinary hypertrophy-style rep windows. Their progression preserves movement speed and quality.

## Calisthenics Optimal model

Every one of the 101 Calisthenics exercises also resolves an Optimal profile and citations. Progression is adapted to the loading mechanism:
- repetitions inside a bounded range for ordinary dynamic movements;
- seconds inside bounded ranges for isometrics;
- leverage/ROM/progression-chain advancement when bodyweight repetitions are mastered;
- reduced assistance or increased band/external resistance where applicable;
- low-rep quality preservation for explosive or demanding eccentric movements.

The model specifically avoids allowing mastered bodyweight exercises to drift indefinitely toward 30–50+ reps when a harder legitimate progression is available.

## Duration interaction

Exercise-specific set ceilings remain hard quality constraints. Long, broad-focus sessions first add legitimate distinct movement roles before exceeding any exercise's useful set ceiling. Narrow sessions are allowed to report that they cannot honestly fill an extreme requested duration instead of manufacturing junk volume.

Fresh-runtime QA covers **every 5-minute Generic Gym duration from 20–120 minutes** and **every 5-minute Calisthenics duration from 20–90 minutes**. All broad-focus targets fit after the v36.73 calibration.

## Anchor/cadence behavior

The rolling six-lane flexible-frequency system applies to both Barbell-focused and Hybrid/KB program structures. In Hybrid mode, scheduled Barbell Strength plus KB Heavy, KB Power, and KB Volume sessions are fixed anchors; flexible Run, Other Cardio, Speed/HIC, Generic Gym, Calisthenics, and Strength-Endurance priorities compete only for remaining capacity. Base Building remains its own independent eight-week scheduling system.

## Research reviewed

September 2026.
