# Hybrid Training v36.42 — Calisthenics Research & Model Design Report

## Scope

This release treats calisthenics as resistance training with unusual loading constraints, not as a disconnected exercise category. The goal was to improve four things at once: (1) exercise recommendation quality, (2) progression/regression logic, (3) how evidence from one exercise updates estimates for another exercise, and (4) fatigue/recovery accounting when calisthenics sits beside Barbell Strength, kettlebells, gym work, classes, running, and conditioning.

The largest conceptual change is that **shared muscles no longer imply near-equivalent performance**. Transfer is directional and task-specific. A bench press can be useful evidence about push-up capacity; a biceps curl can contribute a little evidence about elbow-flexor capacity; neither should be treated as proof that a user can perform a harder push-up or pull-up skill. The model now encodes that distinction explicitly.

## Evidence hierarchy used

The model weights evidence in this order:

1. **Direct longitudinal performance on the exact movement** — strongest evidence.
2. **Intervention studies and systematic reviews on transfer/adaptation** — strong prior evidence when available.
3. **Closely matched movement-pattern evidence** — useful but discounted for task specificity.
4. **Biomechanics/kinematics and EMG** — useful for defining movement families, equipment demands, and likely fatigue overlap, but not treated as proof of long-term strength or hypertrophy transfer.
5. **Coaching convention alone** — used only when the literature cannot resolve a practical implementation detail, and kept conservative.

This matters particularly for EMG. Higher activation in one variation can indicate that a muscle is working harder in that acute test; it does not establish that the variation will produce more hypertrophy, strength, or skill transfer over months. v36.42 therefore uses EMG mainly to help classify movement similarity and fatigue, not as a direct progression score.

## Findings that changed the app

### 1. Strength adaptation is highly task-specific

The 2026 ACSM position stand synthesized 137 systematic reviews and more than 30,000 participants. Progressive resistance training reliably improves strength, hypertrophy, power, endurance, and physical function, but the prescription variables that matter depend on the outcome. Higher loads, complete ROM, multiple sets, and sufficient frequency particularly support voluntary strength; higher weekly volume supports hypertrophy; power benefits from intentional fast concentric work with moderate loading. Momentary failure and equipment type were not consistently decisive across outcomes.

A 2025 systematic review of task specificity found substantially larger gains in the trained dynamic strength task than transfer to an untrained isometric strength task. This is exactly why v36.42 does not let “same muscle group” dominate relationship scoring.

**Model consequence:** exact-exercise history remains 1.00 relationship weight; related exercises receive discounted, directional priors and caps. Movement fingerprints now distinguish horizontal push, vertical push, horizontal pull, vertical pull, bilateral squat, unilateral leg, hinge, knee-flexor, power, and distinct core roles.

### 2. Push-ups and presses are genuinely related — but not identical

Randomized/progressive studies comparing push-up and bench-press training at comparable relative loading have reported similar gains in strength and muscle thickness/hypertrophy over the studied periods. This supports a relatively strong cross-exercise prior between horizontal pressing patterns.

**Model consequence:** horizontal press-to-push-up evidence can contribute strongly. Current research prior is 0.78 for push-up capability informed by bench/chest press and 0.72 in the reverse direction. Direct push-up history still outranks either prior, and vertical pressing is capped as a different pattern.

### 3. Pull-ups are not just “lat pulldowns with bodyweight”

Pull-up performance depends on the vertical-pulling musculature, grip/elbow flexors, body mass, trunk/scapular control, and the exact body-moving task. Pull-up grip studies show broadly similar shoulder/arm muscle activation across pronated, supinated, neutral, and rope variations, with some muscle-specific differences rather than a universal “best” grip. Lat-pulldown training can improve pull-up performance, supporting meaningful transfer, but task specificity remains important.

**Model consequence:** weighted pull-up ↔ pull-up evidence is very strong (0.92 prior where applicable), while lat pulldown → pull-up is deliberately lower (0.58). Scapular Pull-Up is preparatory evidence, capped at 0.42 for predicting full pull-up performance; curls/dead hangs are capped at 0.30. They may help the system understand component capacity without unlocking a pull-up progression by themselves.

The existing Barbell Strength weighted pull-up progression is separate from this adaptive calisthenics graph and was left unchanged.

### 4. Body mass is part of calisthenics load

Bodyweight movements are externally under-specified if the model only stores sets/reps. A pull-up performed at a higher body mass is mechanically a higher-load task even if the prescription says “3×6” both times. v36.41 already used bodyweight-adjusted historical capability; however, planned future demand was not scaled by body mass in the same way. That asymmetry could make a future 220-lb pull-up prescription appear no harder than the same reps at 180 lb.

**Model consequence:** v36.42 scales planned calisthenics demand using the same conservative body-mass factor used in historical capability. The regression harness confirms that a 6-rep Pull-Up has higher modeled planned demand at 220 lb than at 180 lb. This affects predicted RPE and planned-vs-performed comparisons without pretending every kilogram of body mass is moved through exactly the same fraction of ROM in every exercise.

### 5. Horizontal rows deserve their own family

Biomechanical work comparing row variations found the inverted row capable of high lat/upper-back activation with lower lumbar erector demand/spinal load than the standing bent-over row in that study. That supports treating the inverted row as a legitimate horizontal-pull strength movement, not as a generic substitute for a pull-up.

**Model consequence:** Inverted Row and Feet-Elevated Inverted Row are a horizontal-pull progression. Horizontal row ↔ horizontal row relation prior is 0.78. Horizontal pull ↔ vertical pull is capped at 0.48. Inverted rows now require an actual low-row/ring/suspension/fixed-low-bar setup rather than being generated merely because a pull-up bar exists.

### 6. Dip variants have materially different shoulder demands

A kinematic/EMG comparison of bench, bar, and ring dips found that the bench dip required greater shoulder extension while bar/ring dips produced different activation demands. The evidence does not justify treating bench dips as an automatically safer or universally preferred gateway to parallel-bar dips.

**Model consequence:** Bodyweight Dip requires parallel dip bars. Bench/chair dip is manual-only. It can still be logged, but the recommendation engine will not automatically choose it as the default progression when equipment or shoulder context is unknown.

### 7. Unilateral and bilateral leg work transfer, but strength is specific

A 2025 systematic review/meta-analysis found no clear hypertrophy advantage of unilateral versus bilateral training, while strength gains favored the trained mode: bilateral training improved bilateral strength more and unilateral training improved unilateral strength more.

**Model consequence:** unilateral-to-unilateral relation prior is 0.72. Bilateral squat → unilateral leg prior is 0.48, and unilateral → bilateral squat is 0.40. Cross-mode transfer is capped at 0.55. The progression graph now includes Single-Leg Squat to Box and Assisted Pistol Squat so the app can build specific single-leg skill/strength rather than jumping directly from a bilateral squat to a pistol.

### 8. Hamstring knee-flexion strength is not the same as a hip hinge

Nordic hamstring training has consistent evidence for increasing eccentric knee-flexor strength and biceps femoris fascicle length. That does not make a Nordic curl interchangeable with a deadlift/RDL: the dominant joint action and task are different.

**Model consequence:** Hamstring Walkout → Assisted Nordic → Nordic is a knee-flexor progression family, while deadlifts/RDLs remain hinge-dominant. Knee-flexor ↔ hinge transfer prior is only 0.34 and capped at 0.42. Assisted and full Nordics are manual-only because they require secure anchoring and impose substantial eccentric tissue loading; the model will not automatically prescribe them simply because a user “needs hamstrings.”

### 9. Full ROM, quality repetition standards, and repeated mastery matter

Systematic-review evidence generally supports full ROM for strength and lower-body hypertrophy compared with consistently shortened ROM, while the exact best ROM can still be exercise- and goal-specific. The model should therefore prefer technically valid, comparable repetitions rather than advancing someone after one high-rep outlier performed with uncertain ROM.

**Model consequence:** progression requires repeated direct evidence. `calExerciseMastery()` looks for at least two quality direct exposures among the last three, at the movement-specific mastery target and with RPE not excessive. A single unusually good session no longer unlocks an entire difficulty tier. Negative Pull-Up uses a quality eccentric-rep target rather than being treated like a high-rep accessory.

### 10. Failure is not a requirement for adaptation

A systematic review/meta-analysis comparing training to repetition failure versus non-failure did not find failure to be consistently superior for strength or hypertrophy. This is especially relevant in a hybrid program where unnecessary fatigue can interfere with running, Barbell Strength lifting, kettlebell work, or later calisthenics quality.

**Model consequence:** the system does not demand failure to validate a session or advance a progression. Quality exposure with manageable RPE can count toward mastery. High-fatigue “proof” is not rewarded just because it hurts more.

### 11. Hard calisthenics needs real strength-training rest

A systematic review of chronic strength adaptations found that resistance-trained individuals generally benefited from longer inter-set rests (>2 min) when the goal was maximizing strength, while shorter/moderate rests can be adequate in less-trained contexts. Treating hard pull-ups, dips, pistols, and archers like 30–60 s circuit exercises would artificially suppress output and distort performance estimates.

**Model consequence:** hard/high-force calisthenics now gets approximately 150 s rest by default, with the hardest level-5 movements reaching 180 s. Tier-3 work gets 120 s; tier-2 gets 90 s; accessories ~75 s; low-strength activation work can be ~60 s. Difficulty can nudge these values. Long requested workouts are filled by legitimate additional sets/movements before simply inflating reps.

### 12. Exercise variation should be systematic, not random novelty

A systematic review on exercise variation concluded that variation can influence strength and hypertrophy, but excessive/random variation may impair adaptation. For a recommendation engine, novelty should preserve the training target rather than constantly replacing a movement with something only vaguely related.

**Model consequence:** substitutions and rebuild variation are constrained by task-specific progression/relationship structure. Near-equivalent options can vary, but the app does not treat every push, pull, or “core” movement as interchangeable.

### 13. Plyometrics are power work, not ordinary leg-strength volume

Meta-analyses show lower-body plyometric training can improve jump, sprint, and lower-body strength outcomes. Its stimulus and fatigue profile is nevertheless different from a squat or lunge hypertrophy/strength set.

**Model consequence:** jump squats and similar movements receive meaningful power/fatigue credit but deliberately lower pure-strength credit. This prevents a high-fatigue jump circuit from convincing the model that heavy squat/lunge strength has been directly proven.

### 14. Isometrics and core movements need role specificity

Isometric training produces useful strength adaptations, with meaningful joint-angle/contraction-mode specificity. Core exercises likewise differ: anti-extension, anti-rotation/lateral stability, flexion, hanging compression, and dynamic locomotion are not a single linear skill ladder.

**Model consequence:** core roles are fingerprinted separately; different roles have a maximum cross-role relationship of 0.45. Planks, Dead Bug, Hollow Body, hanging raises, Pallof-type work, and dynamic crawls contribute different evidence and fatigue. Holds use time-based mastery rather than arbitrary rep conversion.

## Relationship priors and ceilings added in v36.42

These values are **model priors, not biological constants**. They encode conservative starting assumptions until the user's own direct and paired history becomes more informative.

| Relationship | Prior / cap | Design rationale |
|---|---:|---|
| Push-Up target from Bench/Chest Press | 0.78 prior | Strong horizontal-press similarity + intervention evidence |
| Bench/Chest Press target from Push-Up | 0.72 prior | Strong relation, but external loading/skill differ |
| Pull-Up target from Weighted Pull-Up | 0.92 prior | Same core task with added external load |
| Pull-Up target from Lat Pulldown | 0.58 prior | Meaningful vertical-pull transfer, task/body-mass differences |
| Lat Pulldown target from Pull-Up | 0.52 prior | Directional transfer intentionally asymmetric |
| Horizontal row ↔ horizontal row | 0.78 prior | Closely related pulling pattern |
| Vertical push ↔ vertical push | 0.70 prior | Similar overhead/vertical press family |
| Unilateral leg ↔ unilateral leg | 0.72 prior | High pattern/coordination overlap |
| Unilateral leg target from bilateral squat | 0.48 prior | Shared force capacity, lower skill specificity |
| Bilateral squat target from unilateral leg | 0.40 prior | Directional task specificity |
| Knee-flexor ↔ knee-flexor | 0.75 prior | Nordic/walkout/curl family |
| Knee-flexor ↔ hinge | 0.34 prior; 0.42 max | Hamstrings overlap, different dominant joint action |
| Vertical pull ↔ horizontal row | 0.48 max | Shared pulling musculature, different task vector |
| Horizontal push ↔ vertical push | 0.45 max | Shared pressing musculature, different vector/skill |
| Pull-Up target from curl/dead hang | 0.30 max | Component evidence only |
| Pull-Up target from Scapular Pull-Up / straight-arm prep | 0.42 max | Preparatory control/lat evidence, not full-task proof |
| Row target from curls/pull-aparts/Y-T-W | 0.30 max | Accessory/preparatory evidence only |
| Compound push target from fly/triceps/raise accessory | 0.30–0.32 max | Muscle evidence without compound-task proof |
| Squat/lunge target from calf/hip activation | 0.24 max | Support-muscle evidence only |
| Different core roles | 0.45 max | Trunk function is role-specific |

A second cap is applied when the source is a calisthenics exercise with deliberately low “strength credit.” This ensures activation/prehab or conditioning-like movements do not become high-confidence strength evidence through family overlap alone.

## Updated progression architecture

Auto-progression now emphasizes one change at a time: leverage, assistance, unilateral demand, or movement difficulty. Current major chains include:

- Incline Push-Up → Knee Push-Up → Push-Up → Decline Push-Up → Band-Resisted Push-Up → Archer Push-Up
- Pike Push-Up → Elevated Pike Push-Up
- Negative Pull-Up → Pull-Up → Chest-to-Bar Pull-Up → Archer Pull-Up
- Flexed-Arm Hang → Chin-Up
- Inverted Row → Feet-Elevated Inverted Row
- Bodyweight Squat → Tempo Squat → Split Squat → Bulgarian Split Squat → Single-Leg Squat to Box → Assisted Pistol Squat → Pistol Squat
- Reverse Lunge → Walking Lunge → Bulgarian Split Squat → Single-Leg Squat to Box
- Glute Bridge → Single-Leg Glute Bridge
- Hamstring Walkout → Assisted Nordic Hamstring Curl → Nordic Hamstring Curl (Nordic steps manual-only)
- Dead Bug → Hollow Body Hold
- Hanging Knee Raise → Hanging Leg Raise → Toes-to-Bar

Unavailable equipment steps are skipped when a valid next movement exists. Manual-only movements are not silently unlocked. For example, a user without bands can move from Decline Push-Up toward Archer Push-Up rather than having the progression graph stop at Band-Resisted Push-Up.

## Equipment model changes

v36.42 distinguishes four bodyweight-equipment states:

- Pull-up bar
- Bands
- Low-row setup (rings, suspension trainer, or suitably low fixed bar)
- Parallel dip bars

This is deliberately more granular than “has a pull-up bar.” A standard doorway pull-up bar usually does not provide a safe low horizontal row station, and it is not a pair of parallel dip bars.

## Fatigue vs. strength-credit changes

The app now assigns separate strength and fatigue interpretations to several common calisthenics movements. Examples include Dead Hang, Scapular Pull-Up, Prone Y-T-W, Reverse Snow Angel, Bird Dog, Dead Bug, planks, jump squats, burpees, mountain climbers, bear crawls, and crab walks. This prevents a movement that is useful for tissue preparation, trunk control, grip, conditioning, or power from receiving the same cross-exercise credit as a hard compound strength movement.

## What v36.42 intentionally does *not* do

- It does not infer that higher EMG automatically means greater hypertrophy.
- It does not use one universal “push” or “pull” score.
- It does not let curls, hangs, scapular drills, flys, raises, or activation work directly unlock compound skills.
- It does not assume lat pulldowns and pull-ups are load-convertible one-for-one.
- It does not treat a Nordic curl as a deadlift substitute.
- It does not require failure for mastery.
- It does not add random advanced skills purely for variety.
- It does not automatically prescribe Nordics without the user choosing them.
- It does not alter the fixed Barbell Strength weighted pull-up schedule.

## Validation performed for the implementation

The release includes a model-logic regression harness plus structural/static QA. The harness checks the new relationship priors/caps, equipment gates, progression skipping, mastery targets, and body-mass scaling of planned pull-up demand. The calisthenics library contains 93 unique exercise names, and every exercise referenced by the progression graph exists in the library. Critical v36.41 block-transition functions were compared byte-for-byte against the v36.41 baseline and remain unchanged. The fixed weighted pull-up progression was also re-parsed and regression-checked.

Browser runtime automation could not be run in the build environment because local/file URL navigation was blocked by organization policy; therefore this release does **not** claim automated browser UI runtime coverage. JavaScript syntax, DOM-reference structure, PWA versioning, progression invariants, and model-logic tests were run directly.

## Key literature reviewed

1. Currier BS, et al. **American College of Sports Medicine Position Stand. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews.** Med Sci Sports Exerc. 2026. PMID: 41843416. DOI: 10.1249/MSS.0000000000003897.
2. Currier BS, et al. **Resistance training prescription for muscle strength and hypertrophy in healthy adults: a systematic review and Bayesian network meta-analysis.** Br J Sports Med. 2023. PMID: 37414459.
3. Kikuchi N, Nakazato K. **Low-load bench press and push-up induce similar muscle hypertrophy and strength gain.** J Exerc Sci Fit. 2017/2018 indexing. PMID: 29541130.
4. Kotarsky CJ, et al. **Effect of Progressive Calisthenic Push-up Training on Muscle Strength and Thickness.** J Strength Cond Res. 2018. PMID: 29466268.
5. Calatayud J, et al. **Bench press and push-up at comparable levels of muscle activity results in similar strength gains.** J Strength Cond Res. 2015. PMID: 24983847. DOI: 10.1519/JSC.0000000000000589.
6. Fenwick CMJ, et al. **Comparison of different rowing exercises: trunk muscle activation and lumbar spine motion/load.** Med Sci Sports Exerc. 2009. PMID: 19197209.
7. Dickie JA, et al. **Electromyographic analysis of muscle activation during pull-up variations.** J Electromyogr Kinesiol. 2017. PMID: 28011412.
8. Li Q, et al. **Eight-week lat pull-down resistance training with joint instability leads to superior pull-up endurance performance...** Eur J Sport Sci. 2025. PMID: 39716392. DOI: 10.1002/ejsc.12243.
9. McKenzie A, et al. **Bench, Bar, and Ring Dips: Do Kinematics and Muscle Activity Differ?** Int J Sports Phys Ther / indexed 2022. PMID: 36293792.
10. Kassiano W, et al. **Comparison of Muscle Growth and Dynamic Strength Adaptations Induced by Unilateral and Bilateral Resistance Training: A Systematic Review and Meta-analysis.** Sports Med. 2025. PMID: 39794667. DOI: 10.1007/s40279-024-02169-z.
11. Medeiros DM, et al. **Effect of Nordic Hamstring Exercise Training on Knee Flexors Eccentric Strength and Fascicle Length: A Systematic Review and Meta-Analysis.** J Sport Rehabil. 2020/2021. PMID: 33049705.
12. Cuthbert M, et al. **The Effect of Nordic Hamstring Exercise Intervention Volume on Eccentric Strength and Muscle Architecture Adaptations: A Systematic Review and Meta-analyses.** Sports Med. 2020. PMID: 31502142.
13. Pallarés JG, et al. **Effects of range of motion on resistance training adaptations: A systematic review and meta-analysis.** Scand J Med Sci Sports. 2021. PMID: 34170576.
14. Grgic J, et al. **Effects of resistance training performed to repetition failure or non-failure on muscular strength and hypertrophy: A systematic review and meta-analysis.** J Sport Health Sci. 2022. PMID: 33497853.
15. Schoenfeld BJ, et al. **Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training: A Systematic Review and Meta-analysis.** J Strength Cond Res. 2017. PMID: 28834797.
16. Grgic J, et al. **Effects of Rest Interval Duration in Resistance Training on Measures of Muscular Strength: A Systematic Review.** Sports Med. 2018. PMID: 28933024. DOI: 10.1007/s40279-017-0788-x.
17. Kassiano W, et al. **Does Varying Resistance Exercises Promote Superior Muscle Hypertrophy and Strength Gains? A Systematic Review.** J Strength Cond Res. 2022. PMID: 35438660. DOI: 10.1519/JSC.0000000000004258.
18. Oxfeldt M, et al. **Effects of plyometric training on jumping, sprint performance, and lower body muscle strength in healthy adults: A systematic review and meta-analyses.** Scand J Med Sci Sports. 2019. PMID: 31136014. DOI: 10.1111/sms.13487.
19. Ramirez-Campillo R, et al. **Effects of Plyometric Jump Training on Repeated Sprint Ability in Athletes: A Systematic Review and Meta-Analysis.** Sports Med. 2021. PMID: 33909274. DOI: 10.1007/s40279-021-01479-w.
20. Saeterbakken AH, et al. **Task Specificity of Dynamic Resistance Training and Its Transferability to Isometric Strength: A Systematic Review and Meta-Analysis.** Sports Med. 2025. PMID: 40314751.
21. Lum D, Barbosa TM. **Brief Review: Effects of Isometric Strength Training on Strength and Dynamic Performance.** Int J Sports Med. 2019. PMID: 30943568.
22. Oranchuk DJ, et al. **Isometric training and long-term adaptations: Effects of muscle length, intensity, and intent.** Scand J Med Sci Sports. 2019. PMID: 30580468.
23. Gentil P, et al. **Single vs. Multi-Joint Resistance Exercises: Effects on Muscle Strength and Hypertrophy.** Asian J Sports Med. 2015. PMID: 26446291.

## Implementation note

These research priors are deliberately conservative and are meant to be updated by the user's own direct performance history. v36.42 is therefore not a static “exercise ranking.” It is a task-specific evidence graph: literature establishes the starting structure; actual logged performance, RPE, body mass, equipment, recovery, and repeated exposure determine how recommendations evolve for the individual user.
