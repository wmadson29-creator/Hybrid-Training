# Hybrid Training v36.128 — Model, Exercise, and Concurrent-Training Research

Research review date: 2026-09-20

## Product objective

The app is being optimized for broad athletic development: absolute and relative strength, sprint speed, running endurance, swimming endurance, work capacity, power, and recoverability. It is not a bodybuilding-only, running-only, or readiness-only planner.

Fixed Barbell Strength, kettlebell, and Base Building anchors remain authoritative. The adaptive system chooses and scales flexible work around those anchors. A hard day followed by another hard day is allowed when the athlete's recent load, recovery, lower-body state, and upcoming anchors support it; it is not the default and the model avoids turning a temporary sprint deficit into three repeated sprint prescriptions.

## Evidence hierarchy used by the model

1. What the athlete actually completed on the exact exercise or modality.
2. Repeated personal response: performance, effort, recovery, technique, and tolerance after that work.
3. Closely related exercises or modalities, with directional and capped transfer.
4. Population research as a conservative prior.
5. A generic default only when none of the above is available.

The hierarchy matters. A machine row can inform another row pattern, but it cannot prove barbell-row strength. A swim can support general aerobic fitness, but it cannot fully substitute for the tissue tolerance and economy built by running. Height or arm span can explain context, but cannot override the athlete's own results.

## Concurrent strength and endurance

The updated concurrent-training meta-analysis found no meaningful overall compromise to maximal strength or muscle hypertrophy when aerobic and strength work were combined. Explosive-strength development was the clearer area of concern, particularly when both modes occurred in the same session. This supports a local, dose- and timing-aware interference model instead of a blanket rule that strength and endurance must be separated. [Schumann et al., 2022](https://pubmed.ncbi.nlm.nih.gov/34757594/)

Strength training can also improve endurance performance through running economy and neuromuscular qualities. A controlled study in distance runners found improved running economy and time to exhaustion after maximal-strength training, without a body-mass increase. [Støren et al., 2008](https://pubmed.ncbi.nlm.nih.gov/18460997/) Explosive-strength work has likewise improved 5 km performance and running economy in trained runners. [Paavolainen et al., 1999](https://pubmed.ncbi.nlm.nih.gov/10233114/)

Model implications:

- Strength and endurance are allowed to coexist throughout a block.
- Interference is estimated from local muscle overlap, impact, systemic load, session proximity, duration, intensity, training status, and the priority of the next anchor.
- Same-session or tightly spaced explosive work receives more protection than general hypertrophy or maximal-strength work.
- A hard-day stack is a conditional option, not a forbidden state and not a target quota.
- Running, swimming, and other cardio share some aerobic adaptation but retain separate direct-exposure needs.

## Endurance, quality work, and the missing-middle problem

Intervals can strongly improve maximal oxygen uptake, and low-intensity volume remains important for aerobic durability. Trials comparing intensity distributions provide useful evidence for polarized or high-low approaches, but they do not justify forcing one universal 80/20 split on every athlete, week, or mixed-sport schedule. [Helgerud et al., 2007](https://pubmed.ncbi.nlm.nih.gov/17414804/), [Esteve-Lanao et al., 2007](https://pubmed.ncbi.nlm.nih.gov/17685689/), [Stöggl and Sperlich, 2014](https://pubmed.ncbi.nlm.nih.gov/24550842/)

The app therefore tracks rolling exposure rather than Monday-to-Sunday quotas:

- easy aerobic duration;
- direct running exposure;
- long-run durability;
- direct swimming exposure and long-swim durability;
- other aerobic modalities;
- sprint, hill, tempo, threshold, and other quality work.

v36.128 gives an overdue endurance run a bounded priority lift. Speed spacing is a soft recovery-aware guard, not a prohibition: a supported two-day hard stack can still win, while a third crowded hard primary is redirected. This fixes the observed three-sprint forecast without overcorrecting toward easy work or deprioritizing endurance running.

## Strength progression, muscle frequency, and weak links

A large network meta-analysis found that many resistance prescriptions improve strength and hypertrophy. Higher-load prescriptions ranked best for maximal strength, while multiple sets were the more consistent feature of hypertrophy-oriented prescriptions. [Currier et al., 2023](https://pubmed.ncbi.nlm.nih.gov/37414459/)

Frequency is best treated partly as a way to distribute productive volume, practice, and fatigue. In a small trained-participant trial, two versus four weekly sessions produced similar strength and hypertrophy when weekly volume was equal. [Hamarsland et al., 2022](https://pubmed.ncbi.nlm.nih.gov/35069251/) This does not mean all muscles need the same frequency. It means frequency should not be a standalone score detached from dose, exercise specificity, recovery, and the athlete's response.

High fatigue is not automatically superior. In a squat trial, stopping at 20% velocity loss produced similar strength gains and better jump improvement than 40% velocity loss, despite fewer repetitions; the larger velocity-loss condition produced more hypertrophy in some quadriceps measures. [Pareja-Blanco et al., 2017](https://pubmed.ncbi.nlm.nih.gov/27038416/)

Model implications:

- Each muscle and training quality has its own rolling dose, exposure, recovery, and performance state.
- Prime movers and assisting muscles receive different fractional credit.
- Exact exercise performance is stronger evidence than a related movement or a muscle-overlap estimate.
- Weak-link targeting uses the athlete's own dose, readiness, and performance trends rather than fixed population strength ratios.
- No muscle is declared weak merely because the app has no baseline data.
- More weekly frequency is not awarded independently of useful volume; it can still help distribute volume, preserve quality, and practice a skill.
- Exercise order is not modeled as universally optimal. The prioritized movement can be performed early, and the actual completed work remains authoritative. [Simão et al., 2012](https://pubmed.ncbi.nlm.nih.gov/24149379/)

## Actual work versus planned work

The model now stores the original prescription separately from the completed sets, reps, load, exercise, and duration. This applies to primary workouts, full second workouts, short secondary work, substitutions, and unplanned sessions.

- Less than planned: the actual smaller dose drives fatigue and rolling load. It may leave room for more work later, but only if recovery, tissue/impact load, and the next anchor agree.
- More than planned: the actual larger dose increases fatigue and recent load.
- More than planned and repeatedly tolerated: capacity can rise gradually after corroborating recovery or later performance. One good session cannot instantly raise the ceiling.
- More than planned and costly: the system becomes more conservative.
- Unplanned work: it contributes to fatigue, development, cadence, and future choices even though no planned comparison exists.

Legacy workouts are not rewritten. New rows receive auditable actual-load metadata; old rows continue to contribute through their saved actual values.

## Pull-up grips

Overhand and neutral-grip pull-ups train the same main movement and broadly the same primary musculature: latissimus dorsi and upper-back/scapular muscles, with biceps, brachioradialis, grip, and trunk assistance. They are related, not interchangeable records.

In a direct comparison of supinated, pronated, neutral, and rope pull-ups in 19 trained men, complete-repetition activation was broadly similar across grips. Pronated pull-ups produced greater middle-trapezius activation than neutral pull-ups; the study did not establish greater biceps activation for neutral versus overhand. [Dickie et al., 2017](https://pubmed.ncbi.nlm.nih.gov/28011412/)

The intuition that a neutral grip feels more biceps-heavy is mechanically plausible and may be true for an individual, but the direct evidence is not strong enough to encode it as a population rule. A supinated chin-up has clearer evidence of greater biceps contribution than a pronated pull-up, although EMG still does not prove superior long-term hypertrophy. [Youdas et al., 2010](https://pubmed.ncbi.nlm.nih.gov/21068680/)

## Swimming strokes, pools, and fatigue

Swimming is both aerobic and locally muscular, but stroke mechanics change the distribution of work. The app therefore records freestyle, backstroke, breaststroke, butterfly, mixed/IM, and drills separately and permits mixed-stroke blocks within one workout.

The stroke priors are deliberately conservative:

- freestyle and backstroke emphasize repeated shoulder rotation, latissimus/upper-back contribution, trunk control, and continuous kicking;
- breaststroke adds a distinct whip-kick/adductor and coordination demand;
- butterfly carries a high simultaneous upper-body, trunk, and technical demand;
- drills cannot be assumed to equal full-stroke conditioning without actual duration and effort.

Classic fine-wire EMG work documents phase-specific shoulder-muscle activity during swimming, while stroke-specific research shows that fatigue and coordination cannot be reduced to one universal swim multiplier. [Nuber et al., 1986](https://pubmed.ncbi.nlm.nih.gov/3752349/), [Vaz et al., 2016](https://pubmed.ncbi.nlm.nih.gov/26878097/)

Population stroke priors never override direct pace, duration, distance, heart rate, RPE, completion, or the athlete's recovery. Comparable trends require the same stroke, workout type, and pool course. Custom pool lengths now use the same wall-to-wall length conversion as 25 yd, 25 m, and 50 m pools; one length means one trip across the pool.

## Exercise relationships and the expanded libraries

v36.128 adds 30 gym and 30 bodyweight movements. Every added movement declares:

- primary muscles;
- secondary/assisting muscles;
- movement family;
- equipment and load semantics where relevant;
- at least two related exercises;
- a concise technique or logging note.

Relationships are directional, capped priors. The model separates capability transfer, hypertrophy overlap, acute fatigue overlap, technique similarity, tissue/mechanical overlap, and power transfer. It does not convert unlike machine stacks or different exercises into an invented equivalent weight.

The library UI can search by exercise, muscle, family, equipment, or related movement. Machine-specific history remains especially important because lever arms and displayed loads vary across machines.

## Prediction calibration

The athlete often reports effort with broad labels rather than a confident exact RPE. v36.128 treats those labels as ranges. A prediction inside the reported range has zero calibration error; the system no longer invents a point RPE and then learns from its own invention. Only confident exact RPE is treated as a point observation. Legacy prediction versions remain historical evidence but do not recalibrate the current model.

## Anthropometry

Height, arm span, waist, and body-fat estimates are optional context. They do not directly alter today's fatigue, prescribed load, or strength rating. The full evidence review and measurement policy are in `ANTHROPOMETRY_RESEARCH_v36.127.md`.

## Explicit non-claims and guardrails

- EMG activation is not proof of strength transfer, hypertrophy, or injury prevention.
- A population average is not a personal law.
- There is no universal mandatory muscle frequency, 48-hour recovery rule, 80/20 endurance quota, or hard-day ban.
- Readiness scores do not erase fixed anchors or the athlete's explicit manual choice.
- Low fatigue is permission to evaluate more work, not an automatic demand to add it.
- High fatigue is evidence for caution, not a diagnosis.
- The app does not diagnose injury or replace a coach or clinician.

## QA translation

The research policy is backed by executable checks for actual-versus-planned primary and secondary work, unplanned work, tolerated versus costly overload, endurance priority, supported hard-day stacking, speed crowding, exercise metadata, pull-up wording, stroke/pool handling, empty-baseline behavior, and build/cache consistency. See `QA_REPORT_v36.128.md`.
