# Hybrid Training v36.70 — Research + Model Architecture Upgrade

## Scope

v36.70 is a model-quality release rather than a cosmetic library expansion. It builds on v36.69 duration calibration and v36.68 claim-level research provenance while preserving the fixed Barbell Strength/Tactical Barbell anchors, weighted pull-up progression, adaptive Strength-Endurance circuit logic, walking recovery model, bodyweight-context model, rolling cadence system, and export schema compatibility.

Research reviewed: September 2026.

## 1. Relationship vectors instead of one-dimensional similarity

Exercise-to-exercise relationships now expose separate channels rather than relying on one universal similarity weight:

- capability / strength transfer;
- hypertrophy / effective-volume overlap;
- acute fatigue overlap;
- technique / skill transfer;
- tissue / mechanical overlap;
- power transfer;
- muscle overlap remains available as supporting context.

The old scalar relationship weight is retained only as a compatibility alias to the strength/capability channel. Exact exercise history remains 1.00 and the strongest evidence. Related exercises are directional, capped priors rather than claims of equivalence.

Why this matters: two movements can train similar muscles while differing substantially in skill transfer, joint/tissue loading, stability demand, eccentric demand, or power characteristics.

## 2. Functional-anatomy and mechanical fingerprints

The exercise model now distinguishes more specific functional roles, including:

- hamstring hip-extension vs knee-flexion contribution;
- gastrocnemius vs soleus emphasis;
- adductor demand;
- tibialis/dorsiflexor work;
- serratus contribution;
- triceps long-head / overhead-extension context;
- unilateral demand;
- eccentric/isometric contribution;
- impact / elastic loading;
- grip demand;
- stability/support requirement;
- technical complexity;
- tissue/mechanical loading context.

These fingerprints feed fatigue, exercise selection, overlap, future-session interference, and research provenance. They are not used as an injury-risk predictor.

## 3. Fractional direct/indirect set accounting

Effective muscle volume now uses fractional credit rather than treating every compound set as a full set for every muscle involved.

Current model behavior is calibrated around:

- direct prime-mover work: 1.0 effective-set credit;
- meaningful indirect contribution: typically 0.5;
- smaller secondary contribution: typically 0.25;
- weak involvement: no automatic volume credit.

The fractional values are driven by the movement fingerprint and actual completed set stimulus rather than blindly applied to all exercises.

This feeds:

- rolling effective weekly muscle volume;
- dose-response learning;
- muscle-specific long-term adaptation state;
- future exercise-selection balance.

The dose-response layer also applies diminishing-return utility so the model does not assume that each additional weekly set has equal marginal value.

Core evidence: 2026 resistance-training dose-response meta-regression — https://pubmed.ncbi.nlm.nih.gov/41343037/

## 4. Goal-specific proximity-to-failure modeling

Strength and hypertrophy no longer share a single RIR/RPE stimulus curve.

- Hypertrophy credit is more sensitive to proximity to failure.
- Strength credit preserves meaningful stimulus farther from failure when load/rep characteristics remain strength-specific.
- Power work avoids treating fatigue/failure as desirable simply because RPE is high.

Core evidence:
- 2024 proximity-to-failure meta-regression — https://pubmed.ncbi.nlm.nih.gov/38970765/
- 2026 ACSM resistance-training position stand — https://pubmed.ncbi.nlm.nih.gov/41843416/

## 5. Goal-specific rest and exercise ordering

Rest and ordering are interpreted by the requested outcome rather than with one generic rule.

- Strength-oriented work retains longer-rest preference where appropriate.
- Hypertrophy programming does not receive automatic extra credit for excessively long rest once performance is adequately maintained.
- Power prescriptions protect quality and speed rather than chasing density.
- Explicitly prioritized exercises/body parts may be placed earlier in the session.
- “Compound first” remains a strong default but is no longer an absolute rule when the user's priority is different.

Evidence:
- Rest intervals and hypertrophy, 2024 — https://pubmed.ncbi.nlm.nih.gov/39205815/
- Exercise order meta-analysis, 2020 — https://pubmed.ncbi.nlm.nih.gov/32077380/

## 6. Personalized execution-time calibration

The v36.69 duration model remains the prior, but completed training can now personalize it.

The app can learn:

- actual inter-set rest;
- actual between-exercise transition/setup time;
- actual set work duration and rep cadence when optional Start → Done timing is used.

Important epistemic rule: a Done timestamp by itself cannot reveal rep cadence. The model therefore does not invent cadence from completion timestamps. If the user never uses Start, rep cadence remains a research/default prior while rest/transition calibration can still learn from timestamps.

The learned timing layer feeds Generic Gym and Calisthenics duration estimates, confidence-weighted so a handful of observations cannot overwhelm the prior.

## 7. Updated concurrent-training interference

Interference is no longer modeled as a blanket penalty for combining endurance and resistance work.

The current penalty considers:

- same-session / close-proximity timing;
- training status;
- duration and intensity of the endurance exposure;
- local muscle/fatigue overlap;
- tissue/mechanical overlap;
- technical/power overlap;
- the priority of the upcoming workout;
- elapsed recovery time.

The penalty decays with separation and is intentionally conservative. The newer concurrent-training evidence supports generally compatible strength/hypertrophy/aerobic adaptations while retaining context-specific caution for trained users and close-proximity exposures.

Evidence:
- 2026 umbrella review — https://pubmed.ncbi.nlm.nih.gov/41762427/
- 2021 trained-status meta-analysis — https://pubmed.ncbi.nlm.nih.gov/33751469/

## 8. Generalized active-time model

The Pickleball-specific active-play concept is generalized to intermittent classes and activities where elapsed clock time poorly represents actual work.

The model can now combine:

- elapsed duration;
- active duration;
- work/rest ratio or estimated active ratio;
- RPE;
- modality-specific rest credit;
- HR context when reliable.

This is wired into additional intermittent activities/classes, including skating and mixed interval-style formats. It prevents 60 minutes of stop/start recreation from automatically being treated as 60 minutes of continuous physiological work.

## 9. Generic Gym Power / Explosive mode

Generic Gym now includes a dedicated Power / Explosive programming mode.

The mode:

- prefers legitimate explosive movements;
- uses quality-oriented volume and rest;
- scales exercise breadth with requested duration;
- does not silently substitute ordinary hypertrophy/strength exercises simply to fill the requested time.

If the selected body-part/equipment combination does not support a legitimate power prescription, the builder reports the limitation instead of manufacturing a false power session.

## 10. Exercise-library expansion

### Generic Gym

v36.70: 98 exercises (v36.69: 85).

High-value additions include:

- Trap-Bar Deadlift;
- Single-Leg Dumbbell RDL;
- Dumbbell Lateral Lunge;
- 45° Back Extension / Roman-Chair Hip Extension;
- Landmine Press;
- Landmine Row;
- Smith-Machine Squat;
- Smith-Machine Bench Press;
- Smith-Machine RDL;
- Cable External Rotation;
- Backward Sled Drag;
- Dumbbell Push Press;
- Dumbbell Jump Squat.

### Calisthenics

v36.70: 101 exercises (v36.69: 94).

Additions include:

- Ab Wheel Rollout;
- Short-Lever Copenhagen Adduction;
- Long-Lever Copenhagen Adduction;
- Reverse Nordic;
- Push-Up Plus;
- Tibialis Raise;
- Bent-Knee Bodyweight Soleus Raise.

### Conditioning

Endurance library now contains 21 entries and adds:

- SkiErg;
- VersaClimber.

SkiErg receives direct modality evidence. VersaClimber uses appropriately labeled family/analogue evidence where direct evidence is thinner rather than receiving a fabricated direct citation.

## 11. Research-source governance

The provenance registry now understands source status:

- active;
- corrected;
- retracted.

A retracted source can remain visible as an audit warning but is excluded from the claim/model source set.

### Copenhagen example

Copenhagen adduction remains supported as an adductor/eccentric-strength exercise by direct RCT evidence:
https://pubmed.ncbi.nlm.nih.gov/28806100/

The 2025/2026 Copenhagen injury-prevention meta-analysis was retracted. The app explicitly records the retraction and excludes it from model claims:
https://pubmed.ncbi.nlm.nih.gov/41975640/

The app therefore does not convert Copenhagen work into a strong injury-prevention claim.

## 12. Conservative handling of long-muscle-length evidence

Long-muscle-length / stretch-biased exercise evidence is treated as a modest programming input, not a universal replacement rule.

Evidence:
https://pubmed.ncbi.nlm.nih.gov/40570881/

The model can use the information when choosing among otherwise suitable movements, but it does not automatically replace established exercises with a “stretch-biased” alternative.

## 13. Card-level research provenance retained

The v36.68 Sources & evidence drawers remain available in detailed More surfaces and remain absent from high-level Today/dashboard cards.

The registry now contains 80 unique research-source IDs and includes the new exercise-, dose-response-, RIR-, rest-, order-, concurrent-training-, anatomy-, and modality-specific evidence used in v36.70.

## 14. Important preserved behavior

v36.70 intentionally does not rewrite the user's fixed program anchors. Regression hashes confirm no changes to:

- weighted pull-up progression;
- fixed Barbell Strength/Tactical Barbell logic;
- Short Focus block-date logic;
- Week-6 review behavior;
- transition-pause logic;
- rolling cadence portfolio;
- conditioning cadence-lane classification;
- adaptive SE prescription;
- SE circuit generation;
- easy-walking recovery toll;
- bodyweight observation-context model.

The adaptive SE 2-vs-3-circuit decision remains an app-derived programming decision rather than a literature quotation.

## 15. Validation

Final exact-byte validation after all active-time changes:

**123 / 123 QA and regression checks passed.**

Behavior harness additionally confirms:

- hypertrophy vs strength RIR curves separate as intended;
- dose-response utility has diminishing returns;
- direct / indirect muscle sets resolve to 1.0 / 0.5 / 0.25 in the test fixture;
- personal timing separates transition time from first-set work;
- optional Start → Done timing learns measured rep cadence;
- Power-mode breadth scales with requested duration;
- skating uses the active-time/rest-credit model;
- concurrent interference falls as session separation increases;
- exact-exercise relationship vector remains 1.00.

### Runtime limitation

The environment could not obtain a trustworthy rendered DOM from Chromium for local-file or localhost PWA targets. Validation therefore consists of JavaScript/service-worker syntax, HTML/DOM structural checks, manifest/version checks, deterministic model behavior tests, duration matrices, source-registry validation, and critical-function regression hashes. A one-time installed-PWA touch sanity check on the phone remains appropriate after updating.
