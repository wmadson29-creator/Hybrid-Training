# Hybrid Training v36.44 — Multimodal Research Model

## Purpose

This release extends the evidence-oriented modeling approach used for the v36.42 calisthenics overhaul to the rest of the training system: Generic Gym, conditioning, classes/studio work, kettlebells, and the relationships between all of those modes.

The goal is **not** to turn published group averages into rigid rules. The model uses research to set conservative priors, boundaries, transfer ceilings, and default programming preferences. The user's own direct longitudinal performance remains the strongest evidence and can gradually outweigh generic priors where the app has enough repeated, comparable observations.

The model intentionally distinguishes:

- adaptation from fatigue;
- task-specific performance from broad fitness;
- direct evidence from related-exercise evidence;
- modality-specific aerobic adaptation from general cardiorespiratory adaptation;
- heavy/max-strength work from strength-endurance classes;
- easy endurance, threshold/HIIT, sprint-interval, and power-oriented conditioning;
- true mechanical training load from heart-rate elevation caused partly by heat;
- purposeful exercise variation from random exercise churn.

The fixed Barbell Strength program, including the weighted pull-up progression, remains a fixed anchor and is **not** rewritten by this adaptive layer.

---

## Evidence hierarchy used by the model

1. **Direct completed performance in the exact exercise/modality** — strongest.
2. **Repeated direct performance trends under similar conditions** — stronger than a one-off PR or bad day.
3. **Closely related movement/modality with a justified directional transfer prior** — useful, but capped.
4. **General muscle/fatigue overlap** — informs load management more than capability.
5. **Class labels and broad modality labels** — low-to-moderate confidence unless the user logs actual components/output.
6. **Acute physiology/EMG/biomechanical similarity** — constrains plausibility but does not prove longitudinal strength or hypertrophy transfer.
7. **Wearable-derived secondary metrics** — supporting signals only; calories and isolated VO2 estimates never drive the plan.

This hierarchy prevents a common modeling error: treating “uses the same muscles” as “proves the same performance.”

---

# 1. Generic Gym / Resistance Training

## Key evidence conclusions

### Heavy loading is most specific for maximal strength

The 2026 ACSM Position Stand synthesized 137 systematic reviews (>30,000 participants). Resistance training improves strength, hypertrophy, power, muscular endurance and function across many prescriptions, but maximal voluntary strength is preferentially enhanced by heavier loading (approximately >=80% 1RM), full ROM, 2–3 sets, placing priority exercises earlier, and repeated weekly exposure.

**Model implication:** the app does not treat every rep range as equal for every goal. “Strength” mode preserves lower-rep/heavier compound work, while the default optimized mode can use somewhat higher reps for stable compounds and accessories. The model does not infer that a high-rep isolation exercise proves heavy compound performance.

### Hypertrophy is much less equipment-specific than strength testing

ACSM's synthesis found equipment type itself was not a consistent determinant of training outcome. This fits the broader specificity principle: machine and free-weight training can both produce hypertrophy, while measured strength gains are more specific to the trained/tested movement.

**Model implication:** v36.44 removes any hidden “free weights are automatically higher quality” assumption. Machine, cable, dumbbell and barbell options compete on requested movement, history, fatigue, availability and progression evidence. Cross-implement transfer is meaningful but capped below direct-exercise evidence.

### Volume matters, but more is not automatically better

The ACSM overview found hypertrophy is enhanced by higher weekly volume, with >=10 sets/week commonly associated with better hypertrophy outcomes, while strength can be developed effectively with more modest set counts. The app therefore treats volume as a dose to manage rather than simply maximizing exercise count.

**Model implication:** duration is filled with productive sets within movement-specific ceilings before adding redundant implement variants. The rolling stress model can reshape discretionary volume, but the generator stops rather than padding the session with junk volume.

### Failure is not required

The 2026 ACSM review found momentary muscle fatigue/failure was not a consistent determinant of outcomes. A 2026 systematic review/meta-analysis also found no hypertrophy advantage to failure and a small strength advantage for non-failure training in the included evidence.

**Model implication:** the adaptive engine continues to treat RPE/proximity-to-failure as a useful stimulus and fatigue signal, not as a reward for maximal effort. It can progress from repeated quality work without requiring failure.

### Exercise order matters for the movements that matter most

The ACSM synthesis supports placing priority strength work near the beginning of the session.

**Model implication:** compound/priority exercises remain early. v36.44 additionally gives requested sub-muscle/subregion targets an order bonus so a specific user priority is less likely to be buried behind generic accessories.

### Exercise variation should be systematic rather than random

A 2022 systematic review found that some systematic exercise variation may broaden regional hypertrophy/strength, but excessive or random variation can compromise adaptations.

**Model implication:** the generator now includes a small continuity preference for recently trained direct movements, especially compounds, while avoiding immediate day-to-day repetition when inappropriate. Variation remains purposeful and movement-slot constrained rather than novelty-driven.

## New gym relationship logic

The relationship graph is now directional and movement-aware. Examples:

- Barbell bench press -> machine chest press: substantial but incomplete transfer.
- Machine chest press -> barbell bench press: substantial but incomplete transfer; no exact load conversion.
- One horizontal row variation -> another horizontal row: meaningful transfer.
- Vertical pull -> horizontal row: limited transfer despite shared upper-back muscles.
- Back squat -> split squat/lunge: partial transfer, not skill equivalence.
- Leg curl -> deadlift/RDL: small supporting hamstring evidence, not hinge proof.
- Triceps isolation -> bench/overhead press: supportive muscle evidence with a low ceiling.
- Curl -> pull-up/row: supportive evidence with a low ceiling.
- Different core functions have limited cross-transfer.

Near-identical implements can help initialize an estimate, but direct progression in the actual exercise quickly becomes dominant.

---

# 2. Conditioning / Endurance / HIC

## Key evidence conclusions

### HIIT improves cardiorespiratory fitness, but it is not “only anaerobic”

A 2024 umbrella review of 24 meta-analyses (429 primary studies; 12,967 participants) found HIIT consistently improves cardiorespiratory fitness and often outperforms moderate continuous training for CRF outcomes. Sprint interval training (SIT) also improves aerobic capacity, although protocols, populations and evidence quality vary.

**Model implication:** hard interval work now receives both its anaerobic/repeatability credit **and a smaller aerobic adaptation credit**. The credit stays modality-specific when possible (running, cycling, rowing, swimming) and does not masquerade as a full low-intensity aerobic-base dose.

### SIT and HIIT should not be collapsed into one generic “hard cardio” bucket

SIT uses supramaximal/all-out or near-all-out efforts and has different fatigue/power implications than conventional HIIT. Systematic reviews show both can improve CRF, but the evidence does not justify assuming one is universally superior.

**Model implication:** sprint/power work retains higher power, impact and anaerobic costs. The app can value its aerobic contribution while still protecting power/recovery and distinguishing it from tempo/threshold-style work.

### There is no single universal optimal intensity distribution

Endurance athletes commonly accumulate most volume at low intensity, but recent network/meta-analytic work does not support a single intensity-distribution formula as universally optimal for every athlete and outcome.

**Model implication:** the app uses recent minutes by intensity as **context**, not a rigid 80/20 quota. It penalizes excessive hard-time concentration, gives easy aerobic work a bonus when low-intensity work is underrepresented, and can modestly favor a hard session when hard exposure has been nearly absent and recovery is good.

### Aerobic fitness transfers across modalities, but performance remains specific

Cross-training research supports meaningful central/aerobic transfer between modalities, while sport-specific economy/skill and mechanical tolerance remain more specific. A 2026 running/cycling systematic review found no clear between-group difference in several short-to-moderate-term outcomes, but uncertainty and heterogeneity were substantial; this does **not** justify treating running and cycling as fully interchangeable.

**Model implication:** conditioning substitutions now use explicit modality transfer priors. Same-modality substitutions receive the highest score; running-speed variants are strongly related; cycle/elliptical/stair and walk/hike/ruck/run have moderate relationships; general cross-modal aerobic transfer is capped. The app no longer chooses an “equivalent” modality primarily because both are tagged cardio.

### Strength work can support endurance performance without becoming aerobic training

Systematic reviews show high-load and/or plyometric strength training can improve running economy and running performance in trained runners. That does not mean squats directly raise aerobic-base fitness.

**Model implication:** gym strength can inform running-supportive adaptation through the broader model, but it does not receive fake VO2/aerobic-base credit. Conversely, easy running does not prove squat strength.

### Rucking/load carriage is highly specific

A systematic review/meta-analysis of load-carriage training found the largest improvements when progressive load carriage itself was included, particularly alongside resistance and aerobic training.

**Model implication:** rucking now has explicit loaded-carriage specificity and load-dependent lower-body, axial/hinge, impact and systemic stress. A 50-lb ruck is not modeled like an unloaded walk, and walking/running history can only partially substitute for direct ruck evidence.

---

# 3. Concurrent Strength + Conditioning

## Key evidence conclusions

The modern evidence does **not** support a blanket “cardio kills gains” rule. An updated meta-analysis of 43 studies found concurrent aerobic + strength training did not meaningfully compromise maximal strength or whole-muscle hypertrophy overall. Explosive strength was the more sensitive outcome, particularly when aerobic and strength work occurred in the same session; separation by at least ~3 hours reduced that signal in the available data.

A newer meta-analysis focused on SIT-based concurrent training also found no significant strength/power decrement overall and a CRF benefit, reinforcing that interference is conditional rather than automatic.

## v36.44 concurrent-training behavior

The app therefore uses a **small, contextual interference penalty**, not a prohibition:

- hard, high-impact conditioning on the same day as meaningful lower-body strength receives a moderate penalty;
- hard low-impact conditioning (for example cycling/rowing) receives only a small same-day penalty;
- stacking two highly power-oriented exposures is penalized more than pairing easy aerobic work with strength;
- future-schedule interference still considers local muscle overlap, intensity, duration and proximity;
- easy/active-recovery work remains fundamentally different from another hard session.

This is deliberately conservative: the engine protects session quality/power without telling the user that any cardio near lifting will erase strength or hypertrophy.

---

# 4. Classes / Studio Work

Class labels are especially noisy because two classes with the same name can have very different programming. v36.44 therefore uses a class-specific prior **plus actual logged data**. When a mixed/HIIT studio class has logged components, those components become the stronger movement/fatigue fingerprint.

## Indoor Cycling / Spin

A 2026 systematic review found indoor cycling commonly creates high physiological demand and can improve cardiorespiratory fitness; heat, humidity and sweat/environmental conditions can alter HR and perceived exertion.

**Model:** high aerobic credit, moderate anaerobic credit, low impact, lower-body endurance/fatigue, modality-specific cycle efficiency. It does not prove squat strength.

## Yoga

Yoga is modeled primarily as mobility/control/core/endurance work, with Power Yoga receiving somewhat more muscular-endurance/systemic credit. Yin/restorative variants are recovery/mobility-biased.

### Hot yoga

A 2025 systematic review found hot yoga acutely raises body temperature and heart rate but did **not** increase energetic demand versus comparable non-heated yoga in the reviewed evidence.

**Model:** hot classes add heat/systemic strain, but if HR is the only aerobic signal the app discounts the aerobic inference. HR + RPE/output gets more confidence. Heat is therefore not mistaken for extra cardio work.

## Yoga Sculpt

Yoga Sculpt is separated from ordinary yoga. It receives a mixed strength-endurance/core/mobility profile but deliberately modest strength/hypertrophy confidence because the class format is highly variable.

## Pilates

Systematic reviews in healthy adults support improvements in abdominal muscular endurance, balance/flexibility in some outcomes, and possible CRF improvements with enough accumulated training, but CRF evidence quality is low and Pilates is not superior to other exercise for that outcome.

**Model:** strong core/muscular-endurance credit, moderate mobility/control, modest aerobic credit, limited heavy-strength transfer. Reformer gets slightly more resistance credit than mat Pilates, but neither can prove barbell or advanced calisthenics capability.

## Lagree / Megaformer

Direct longitudinal evidence specific to branded Lagree/Megaformer training is comparatively sparse.

**Model:** strength-endurance/core prior with **low evidence confidence**. The class can create real local/systemic fatigue, but the relationship ceiling prevents it from becoming strong evidence for heavy compound performance.

## Barre

Direct outcome evidence is also relatively sparse and formats vary.

**Model:** lower-body/core muscular-endurance emphasis, low-to-moderate strength credit, modest aerobic credit, conservative confidence.

## BodyPump / high-repetition barbell classes

Trials are mixed across populations. Some have shown strength improvements; another RCT in previously untrained overweight women found individually programmed resistance training outperformed BodyPump for maximal strength. The format is fundamentally high-repetition/low-load relative to conventional maximal-strength training.

**Model:** strong muscular-endurance/whole-session fatigue credit, moderate but capped strength/hypertrophy credit, and no equivalence to heavy squat/bench performance.

## TRX / Suspension

Suspension-training reviews show substantial acute muscle activation in many movements, but EMG is **not** longitudinal evidence that the exercise produces identical strength/hypertrophy transfer to a stable external-load exercise.

**Model:** useful strength-endurance/core/bodyweight relationship priors with a conservative transfer cap. Direct TRX performance remains the strongest evidence for TRX capability.

## Dance / Zumba / Step

A Zumba meta-analysis found possible VO2peak benefit but emphasized the small number of qualifying studies and substantial heterogeneity.

**Model:** aerobic + coordination/technical demand with moderate impact and relatively low strength transfer. It contributes cardio fitness without pretending dance is run-specific or heavy resistance work.

## Aqua Fitness

A systematic review/meta-analysis found water-based training can improve cardiorespiratory fitness, strength and balance in healthy adults, generally with low impact.

**Model:** aerobic and general muscular-endurance credit, almost no impact cost, and conservative task-specific strength transfer. Water-based HR/output is not treated as identical to land exercise.

## Boxing / Kickboxing Fitness

These classes are modeled as mixed aerobic/anaerobic conditioning with substantial technical/coordination and power demand. Because class content varies, direct logged rounds/components/RPE are more important than the label alone.

## HIIT / Bootcamp / Functional Fitness / Mixed Studio

The label alone receives only moderate confidence. If the user logs treadmill/rower/floor/lift components, the app combines those actual components and their stress signatures. This avoids treating a treadmill-heavy OrangeTheory-style class, a burpee circuit, and a barbell bootcamp as the same session merely because all are “HIIT.”

---

# 5. Kettlebells

Kettlebell evidence is useful but heterogeneous. A 2019 scoping review found relatively few strong longitudinal studies and low confidence in broad claims. Individual trials show that some kettlebell programs can improve strength/power/endurance and dense ballistic protocols can create substantial cardiorespiratory demand.

## v36.44 behavior

- Press -> overhead/vertical-push work: meaningful but incomplete transfer.
- Row/pull -> horizontal pulling: meaningful transfer.
- Goblet/front-loaded squat -> squat family: partial transfer.
- Lunge -> unilateral-leg family: partial transfer.
- Hinge/swing/clean -> hinge family: partial, directionally capped transfer.
- Carries and stability drills create useful grip/core/fatigue information but have low ceilings for proving heavy compound strength.
- Dense ballistic/clean work can receive work-capacity credit when the actual set x rep dose is substantial.
- A normal strength-oriented kettlebell session does **not** automatically receive aerobic-base credit simply because kettlebells can be used in conditioning protocols.

This is the same principle used everywhere else: the *protocol* matters, not just the implement.

---

# 6. Research-driven cross-mode relationship graph

v36.44 changes the relationship model from broad muscle overlap toward a directional, capped graph across modes.

### High-confidence relationships

- exact exercise -> itself: 1.00
- same conditioning modality -> another closely related prescription: high
- weighted pull-up -> pull-up: very high (existing calisthenics logic)
- same gym movement slot with another implement: substantial, but below exact

### Moderate relationships

- cycling <-> elliptical/stair aerobic adaptation
- running <-> cycling general aerobic adaptation, with sport-specific ceiling
- squat <-> lunge/unilateral leg
- kettlebell press -> overhead press
- kettlebell row -> horizontal row
- BodyPump/strength-endurance class -> related resistance families

### Deliberately low relationships

- isolation -> compound performance
- vertical pull -> horizontal pull
- hinge -> knee-flexion hamstring exercise
- Pilates/yoga -> heavy barbell strength
- cardio class -> squat strength
- hot-class HR elevation -> aerobic adaptation when no other evidence exists
- TRX EMG activation -> stable heavy strength
- Lagree/Barre label -> heavy strength

The relationship **ceiling** matters as much as the prior. A source can add evidence without ever being allowed to dominate the target's capability estimate.

---

# 7. What remains personalized rather than research-fixed

Research priors initialize and constrain the model, but the following continue to learn from the user's history:

- exercise-specific capability;
- predicted RPE at a proposed prescription;
- progression / hold / regression decisions;
- modality-specific efficiency and repeatability;
- direct conditioning duration/output response;
- recovery signal weighting;
- response to spacing between sessions;
- fatigue half-life behavior within the existing guarded model;
- substitutions and recommendation feedback;
- bodyweight-performance coupling;
- goal balance and hybrid trajectory.

A research prior is therefore not a permanent verdict. If the user's repeated direct data are strong, the direct data win.

---

# 8. Important non-claims / guardrails

The app deliberately does **not** claim:

- that ACWR or another single workload ratio predicts injury;
- that there is a universal 80/20 intensity distribution everyone must follow;
- that cardio automatically compromises hypertrophy/strength;
- that a class's HR proves its caloric/energetic demand;
- that EMG proves long-term hypertrophy;
- that machine training is inferior to free weights;
- that training to failure is required;
- that all kettlebell work is cardio;
- that cycling and running are interchangeable;
- that BodyPump/TRX/Lagree/Pilates directly prove barbell capability;
- that wearable calories are accurate enough to drive programming.

---

# 9. Primary evidence base used for v36.44

This is not an exhaustive bibliography. Sources were prioritized toward systematic reviews, meta-analyses, umbrella reviews, major position stands, and direct trials when class-specific review evidence was sparse.

1. Currier BS, et al. **American College of Sports Medicine Position Stand. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews.** Med Sci Sports Exerc. 2026;58(4):851-872. PMID 41843416. DOI 10.1249/MSS.0000000000003897. https://pubmed.ncbi.nlm.nih.gov/41843416/

2. Kassiano W, et al. **Does Varying Resistance Exercises Promote Superior Muscle Hypertrophy and Strength Gains? A Systematic Review.** J Strength Cond Res. 2022;36(6):1753-1762. PMID 35438660. DOI 10.1519/JSC.0000000000004258. https://pubmed.ncbi.nlm.nih.gov/35438660/

3. Schumann M, et al. **Compatibility of Concurrent Aerobic and Strength Training for Skeletal Muscle Size and Function: An Updated Systematic Review and Meta-Analysis.** Sports Med. 2022. PMID 34757594. https://pubmed.ncbi.nlm.nih.gov/34757594/

4. Poon ETC, et al. **High-intensity interval training and cardiorespiratory fitness in adults: An umbrella review of systematic reviews and meta-analyses.** Scand J Med Sci Sports. 2024. PMID 38760916. DOI 10.1111/sms.14652. https://pubmed.ncbi.nlm.nih.gov/38760916/

5. Hall AJ, et al. **The Effects of Sprint Interval Training on Physical Performance: A Systematic Review and Meta-Analysis.** J Strength Cond Res. 2023;37(2):457-481. PMID 36165995. https://pubmed.ncbi.nlm.nih.gov/36165995/

6. **Sprint interval training effects on aerobic capacity: a systematic review and meta-analysis.** PMID 24129784. https://pubmed.ncbi.nlm.nih.gov/24129784/

7. **Does Sprint Interval Training Cause Interference in Concurrent Training? A Meta-Analysis Study.** PMID 41734815. https://pubmed.ncbi.nlm.nih.gov/41734815/

8. **Which Training Intensity Distribution Intervention will Produce the Greatest Improvements in Maximal Oxygen Uptake and Time-Trial Performance in Endurance Athletes? A Systematic Review and Network Meta-analysis of Individual Participant Data.** PMID 39888556. https://pubmed.ncbi.nlm.nih.gov/39888556/

9. Menges T, et al. **Cross-training between running and cycling: effects on VO2max and running performance — a systematic review and meta-analysis.** 2026. PMID 42267259. DOI 10.3389/fspor.2026.1843803. https://pubmed.ncbi.nlm.nih.gov/42267259/

10. Balsalobre-Fernández C, et al. **Effects of Strength Training on Running Economy in Highly Trained Runners: A Systematic Review With Meta-Analysis of Controlled Trials.** J Strength Cond Res. 2016. PMID 26694507. DOI 10.1519/JSC.0000000000001316. https://pubmed.ncbi.nlm.nih.gov/26694507/

11. **Effect of Strength Training Programs in Middle- and Long-Distance Runners' Economy at Different Running Speeds: A Systematic Review with Meta-analysis.** PMID 38165636. https://pubmed.ncbi.nlm.nih.gov/38165636/

12. Knapik JJ, et al. **A systematic review of the effects of physical training on load carriage performance.** J Strength Cond Res. 2012. PMID 22130400. DOI 10.1519/JSC.0b013e3182429853. https://pubmed.ncbi.nlm.nih.gov/22130400/

13. **Effects of indoor cycling (spinning) on physiological, cardiac and perceived exertion responses in adults: a systematic review.** 2026. PMID 42558479. https://pubmed.ncbi.nlm.nih.gov/42558479/

14. Willmott AGB, et al. **Hot Yoga: A Systematic Review of the Physiological, Functional and Psychological Responses and Adaptations.** Sports Med Open. 2025. PMID 41032153. DOI 10.1186/s40798-025-00917-7. https://pubmed.ncbi.nlm.nih.gov/41032153/

15. Pessôa RAG, et al. **Effects of Pilates exercises on cardiorespiratory fitness: A systematic review and meta-analysis.** Complement Ther Clin Pract. 2023. PMID 37244080. DOI 10.1016/j.ctcp.2023.101772. https://pubmed.ncbi.nlm.nih.gov/37244080/

16. Campos RR, et al. **Effect of the Pilates method on physical conditioning of healthy subjects: a systematic review and meta-analysis.** J Sports Med Phys Fitness. 2016. PMID 26004043. https://pubmed.ncbi.nlm.nih.gov/26004043/

17. Chavarrias M, et al. **Zumba, Fat Mass and Maximum Oxygen Consumption: A Systematic Review and Meta-Analysis.** Int J Environ Res Public Health. 2020. PMID 33375758. DOI 10.3390/ijerph18010105. https://pubmed.ncbi.nlm.nih.gov/33375758/

18. **Benefits of aquatic exercise in adults with and without chronic disease — A systematic review with meta-analysis.** PMID 34913530. DOI 10.1111/sms.14112. https://pubmed.ncbi.nlm.nih.gov/34913530/

19. **Effects of BodyPump and resistance training with and without a personal trainer on muscle strength and body composition in overweight and obese women — A randomized controlled trial.** PMID 28392264. DOI 10.1016/j.orcp.2017.03.003. https://pubmed.ncbi.nlm.nih.gov/28392264/

20. **Low-load high-repetition resistance training improves strength and gait speed in middle-aged and older adults.** PMID 25154701. https://pubmed.ncbi.nlm.nih.gov/25154701/

21. Aguilera-Castells J, et al. **Muscle activation in suspension training: a systematic review.** PMID 29902124. DOI 10.1080/14763141.2018.1472293. https://pubmed.ncbi.nlm.nih.gov/29902124/

22. Meigh NJ, et al. **Kettlebell training in clinical practice: a scoping review.** BMC Sports Sci Med Rehabil. 2019. PMID 31497302. DOI 10.1186/s13102-019-0130-z. https://pubmed.ncbi.nlm.nih.gov/31497302/

23. Manocchia P, et al. **Transference of kettlebell training to strength, power, and endurance.** J Strength Cond Res. 2013. PMID 22549084. DOI 10.1519/JSC.0b013e31825770fe. https://pubmed.ncbi.nlm.nih.gov/22549084/

---

# 10. v36.44 implementation summary

### Generic Gym
- Directional cross-exercise priors and ceilings by movement slot/family.
- Machine/free-weight parity in selection quality; strength remains task-specific.
- Compound/priority-first ordering plus requested subfocus priority.
- Small purposeful continuity preference; excessive random rotation discouraged.
- Isolation/accessory work can support compound estimates but cannot prove them.

### Conditioning
- Research profiles for run, run-speed/SIT, cycle, row, swim, ruck, walk, hike, stair, elliptical, mixed work and power conditioning.
- Modality-specific substitution/transfer scoring.
- HIIT/SIT receive both anaerobic and smaller aerobic adaptation credit.
- Ruck weight changes mechanical/systemic stress.
- Intensity distribution is contextual and majority-easy biased, never a rigid quota.
- Concurrent-training interference is conditional and modest rather than universal.

### Classes
- Class-specific adaptation/fatigue profiles with evidence-confidence values.
- Hot-class HR-only aerobic inference is discounted.
- Pilates/yoga/Barre/Lagree are not treated as heavy strength equivalents.
- Spin/row/run classes build modality-specific aerobic fitness.
- BodyPump/circuit are primarily strength-endurance.
- TRX transfer is useful but capped.
- Mixed classes use actual logged components as stronger evidence than the label.

### Kettlebells
- Directional transfer to related gym/calisthenics movement families.
- Dense ballistic work can build work capacity without automatically becoming aerobic-base training.
- Carries/stability create fatigue and supporting evidence but do not prove heavy lifts.

### Unified model
- Research relationships influence initialization and sparse-data inference.
- Direct longitudinal performance remains strongest.
- Adaptation and fatigue are separate channels.
- Export schema remains 40; only model-version metadata changes.
- Barbell Strength weighted pull-up progression and immediate Week-6 block-review/Short Focus transition logic are regression-preserved.
