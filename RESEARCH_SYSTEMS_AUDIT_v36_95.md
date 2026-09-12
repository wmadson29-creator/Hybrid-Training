# Hybrid Training v36.95 — Integrated Performance Systems Audit

Reviewed: September 2026

## Objective

The optimization target is **high all-around athletic performance per unit of time and recoverable fatigue**: strength, power/speed, aerobic capacity, repeated-high-intensity ability, running economy, work capacity, and favorable body composition without sacrificing training quality or recovery.

This audit is deliberately different from simply adding more training. The model should connect training stressors and recovery signals correctly, preserve high-value primary work, use low-cost modalities when useful, and avoid reacting strongly to noisy or weak evidence.

## Executive findings

The existing model already had the right broad architecture: local and systemic fatigue are separated, conditioning has multiple quality states rather than one generic cardio score, future sessions create interference constraints, subjective and objective recovery are combined without treating any single wearable metric as truth, bodyweight only matters when performance/recovery context supports an interpretation, and optional secondary work is context-limited.

The audit identified four worthwhile relationship upgrades and one old assumption to remove:

1. **Concurrent endurance + resistance should be proximity-aware, not binary.** Same-session work—especially for trained athletes and overlapping lower-body work—deserves the greatest interference penalty. Separating modalities by hours progressively reduces that concern. Sequence is a smaller modifier than proximity and priority.
2. **Acute poor sleep should affect performance domains differently.** The app already counts sleep in overall recovery; an additional small domain-specific tie-breaker is justified because speed, skill/high-intensity intermittent work, and power are generally more sensitive than easy aerobic work. This must not double-count sleep or automatically create a rest day.
3. **Possible low energy availability should first remove optional volume, not primary training.** Bodyweight loss alone is not diagnostic and should never trigger the rule. A guard should require multiple corroborating performance/recovery signals, then suppress optional secondary work before altering primary strength/conditioning.
4. **Generic fasted-morning and late-day mode biases are not justified.** Fasted training is not inherently a reason to prefer conditioning, and training late is not inherently a reason to avoid demanding work. Generic score shifts were removed; repeated personal performance data can still create small confidence-gated context adjustments.
5. **Several tempting “optimization rules” should remain unautomated.** No rigid 80/20 distribution, no HRV green/red switch, no universal 48-hour recovery ban, no fixed 2% dehydration cutoff without hydration data, and no ACWR injury threshold.

---

## 1. Strength ↔ endurance / conditioning interference

### Evidence

A 2026 umbrella review of 17 meta-analyses (144 studies, 1,492 healthy participants) found that concurrent training generally preserves strength, power, and hypertrophy compared with resistance training while adding aerobic benefit. Sequence did not show a large universal effect, although resistance-before-endurance can favor strength in some contexts.

In trained individuals, a 2021 meta-analysis found lower-body strength interference primarily when endurance and resistance were performed in the **same session**; the effect was not evident when they were performed in different sessions. Another updated meta-analysis found explosive-strength interference was more pronounced in same-session concurrent training and not significant when modalities were separated by at least several hours.

### Model implication

The model now uses a smooth same-day spacing gradient rather than a crude yes/no interference rule:

- highest concern at <=2 hours / same-session proximity,
- lower concern at 2–6 hours,
- progressively smaller interaction through 6–20 hours,
- modest residual relationship after longer separation when the same tissues/qualities are involved.

Sequence is intentionally a **small modifier**, not a command. If strength/power is the priority and two modalities must be close together, resistance-first is slightly favored; easy endurance after resistance is less concerning than hard endurance before priority resistance.

The relationship still depends on local overlap, conditioning intensity/duration, training status, and the importance of upcoming fixed anchors.

### Sources

- Held S, et al. *Maximizing Adaptations in Concurrent Training: An Umbrella Review of Meta-analyses.* Sports Med. 2026. PMID 41762427. https://pubmed.ncbi.nlm.nih.gov/41762427/
- Petré H, et al. *Development of Maximal Dynamic Strength During Concurrent Resistance and Endurance Training in Untrained, Moderately Trained, and Trained Individuals.* Sports Med. 2021. PMID 33751469. https://pubmed.ncbi.nlm.nih.gov/33751469/
- Schumann M, et al. *Compatibility of Concurrent Aerobic and Strength Training for Skeletal Muscle Size and Function.* Sports Med. 2022. PMID 34757594. https://pubmed.ncbi.nlm.nih.gov/34757594/

---

## 2. Strength ↔ running economy / speed

Heavy resistance work is not merely competing with endurance training; it can also improve endurance performance through neuromuscular and economy mechanisms. Meta-analytic evidence supports high-load strength training as a useful adjunct for running economy, with plyometric training also supporting economy and sprint/jump qualities.

### Model implication

The audit supports preserving heavy strength anchors even when the user also wants high conditioning performance. The app should manage interference around them rather than reduce them simply because running/cardio is also a goal.

Likewise, sprint/power exposure is valuable for the “fast + strong” objective, but it should not become a second independent quota layered on top of existing speed/HIC/power quality tracking. Existing speed/power quality and cadence mechanisms are retained.

### Sources

- Llanos-Lagos C, et al. *Effect of Strength Training Programs in Middle- and Long-Distance Runners' Economy at Different Running Speeds.* 2024. PMID 38165636. https://pubmed.ncbi.nlm.nih.gov/38165636/
- Blagrove RC, et al. *Heavy Resistance Training Versus Plyometric Training for Improving Running Economy and Running Time Trial Performance.* 2023. PMID 36370207. https://pubmed.ncbi.nlm.nih.gov/36370207/
- Song I, et al. *Plyometric training enhances jump, sprint, and agility performance across different surface types.* 2026. PMID 41369729. https://pubmed.ncbi.nlm.nih.gov/41369729/

---

## 3. Sleep ↔ recovery ↔ training type

### Evidence

Acute sleep deprivation harms athletic performance, but not uniformly. A 2024 systematic review/meta-analysis reported particularly large effects for high-intensity intermittent performance and skill, with meaningful effects on speed, aerobic endurance, and explosive power.

### Model implication

Sleep was already part of integrated recovery, so v36.95 does **not** add a second full recovery penalty. Instead it adds a small domain-specific tie-breaker:

- strongest de-emphasis for speed/power/high-intensity work,
- smaller effect on hard conditioning,
- still smaller effect on heavy strength,
- no extra penalty on easy aerobic work.

Poor sleep alone never inserts a rest day. It competes alongside body fatigue, soreness, HRV/RHR context, recent training, upcoming anchors, and actual performance trends.

### Source

- Gong Y, et al. *Effects of Acute Sleep Deprivation on Sporting Performance in Athletes: A Comprehensive Systematic Review and Meta-Analysis.* 2024. PMID 39006249. https://pubmed.ncbi.nlm.nih.gov/39006249/

---

## 4. Resistance effort / failure ↔ recovery time

Training to failure can substantially extend short-term neuromuscular recovery compared with matched or lower-effort subfailure work. This supports the existing model distinction between routine subfailure exposure and failure/high-velocity-loss/high-volume/novel-eccentric exposure.

### Model implication

No universal “48 hours per muscle” rule is used. Recovery persistence is graded by the actual exposure and personal history. Failure/high-fatigue work can remain elevated longer; ordinary subfailure work can recover more quickly.

### Source

- Pareja-Blanco F, et al. *Time course of recovery following resistance training leading or not to failure.* Eur J Appl Physiol. 2017. PMID 28965198. https://pubmed.ncbi.nlm.nih.gov/28965198/

---

## 5. Energy availability / leanness ↔ performance / recovery

### Evidence

Low energy availability can impair health and performance in both sexes. Energy-deficit meta-analysis also shows that prolonged deficits can compromise lean-mass gains even when strength changes are less obvious.

### Model implication

The app remains **non-diagnostic** and does not attempt to calculate RED-S or energy availability from wearable calories. Instead it uses a conservative multi-signal performance watch. The v36.95 optional-volume guard requires a bodyweight decline plus corroborating deterioration across multiple domains such as strength trends, conditioning trends, or recovery warnings.

A single weight drop is not enough. Even when the stronger Watch state is reached, the first action is to remove **optional secondary/add-on volume**. Fixed Barbell Strength/KB anchors and the primary session are not automatically cut.

This follows the optimization principle: protect the highest-value work first and stop spending recovery budget on optional volume when adaptation quality appears compromised.

### Sources

- Mountjoy M, et al. *2023 IOC consensus statement on Relative Energy Deficiency in Sport (REDs).* Br J Sports Med. 2023. https://bjsm.bmj.com/content/57/17/1073
- Murphy C, Koehler K. *Energy deficiency impairs resistance training gains in lean mass but not strength: a meta-analysis and meta-regression.* 2022. PMID 34623696. https://pubmed.ncbi.nlm.nih.gov/34623696/

---

## 6. Fed / fasted state ↔ training performance

### Evidence

Pre-exercise feeding improves prolonged aerobic performance compared with fasting, while shorter aerobic performance differences are less consistent. Acute carbohydrate intake can improve resistance-training volume particularly in sessions >45 minutes and after longer fasts. A 2025 fasted-vs-fed resistance-training meta-analysis found similar long-term strength/hypertrophy outcomes, but the evidence base was small and largely high risk of bias.

### Model implication

The old rule that “morning + fasted” should slightly favor conditioning over resistance/SE has been removed. That inference confused “possible to perform fasted” with “optimal mode when fasted.”

Fed/fasted context is still recorded because repeated personal data may reveal a meaningful response. The confidence-gated personal learner remains, but it needs repeated direct exposures before making a small adjustment.

“Very full” remains a modest immediate comfort/logistics consideration rather than a statement about long-term adaptation.

### Sources

- Aird TP, et al. *Effects of fasted vs fed-state exercise on performance and post-exercise metabolism.* 2018. PMID 29315892. https://pubmed.ncbi.nlm.nih.gov/29315892/
- King A, et al. *The Ergogenic Effects of Acute Carbohydrate Feeding on Resistance Exercise Performance.* Sports Med. 2022. PMID 35809162. https://pubmed.ncbi.nlm.nih.gov/35809162/
- Vieira AF, et al. *Resistance training performed in the fasted state compared to the fed state on body composition and strength in adults.* 2025. PMID 41316673. https://pubmed.ncbi.nlm.nih.gov/41316673/

---

## 7. Time of day ↔ performance / sleep

### Evidence

Systematic reviews do not support a universal morning or evening training time as superior for long-term strength/endurance adaptation. Training/testing time congruency can matter, and acute performance can vary by time of day, but this is individual and task-specific.

Evening high-intensity exercise generally does not meaningfully disrupt sleep when it ends a few hours before bedtime; very vigorous exercise ending within about an hour of bedtime is the more plausible edge case.

### Model implication

The generic “late-day = penalize demanding session” rule is removed. The app does not know bedtime precisely enough to infer a sleep conflict from the word “late.”

Time-of-day context remains available for **personal response learning** after repeated performance evidence. That is more defensible than a universal late-session penalty.

### Sources

- Bruggisser F, et al. *Best Time of Day for Strength and Endurance Training to Improve Health and Performance?* 2023. PMID 37208462. https://pubmed.ncbi.nlm.nih.gov/37208462/
- Frimpong E, et al. *The effects of evening high-intensity exercise on sleep in healthy adults.* Sleep Med Rev. 2021. PMID 34416428. https://pubmed.ncbi.nlm.nih.gov/34416428/

---

## 8. Conditioning intensity distribution ↔ aerobic development / fatigue

### Evidence

Most successful endurance programs contain substantial low-intensity work plus some high-intensity work. However, evidence does not justify enforcing one universal polarized ratio. A 2024 meta-analysis found a small VO2peak advantage for polarized training in some contexts, while time-trial/threshold outcomes were similar. A 2025 individual-participant network meta-analysis found no overall POL-vs-pyramidal superiority and suggested training status may influence which distribution works better.

### Model implication

The app keeps training-intensity distribution as **context**, not a quota. Easy aerobic volume, run-specific exposure, speed/HIC, and other cardio remain separate rolling needs. The system can shift toward what is currently underexposed without mechanically forcing “80/20.”

### Sources

- Oliveira PS, et al. *Comparison of Polarized Versus Other Types of Endurance Training Intensity Distribution.* Sports Med. 2024. PMID 38717713. https://pubmed.ncbi.nlm.nih.gov/38717713/
- Rosenblat MA, et al. *Which Training Intensity Distribution Intervention Will Produce the Greatest Improvements in VO2max and Time-Trial Performance?* Sports Med. 2025. PMID 39888556. https://pubmed.ncbi.nlm.nih.gov/39888556/

---

## 9. HRV / wearables ↔ readiness

HRV-guided training has evidence for small benefits in some endurance contexts, but performance advantages are not large or universal. Wearable metrics also carry measurement/context noise.

### Model implication

HRV, resting HR, HR recovery, sleep score, wearable VO2, and similar signals remain **inputs with confidence**, not green/red commands. The system gives subjective body fatigue and direct performance evidence meaningful weight, tests concordance between subjective and objective recovery, and learns metric usefulness only after enough history.

Wearable calories remain reference-only because their error is too large to drive energy-balance programming.

### Source

- Düking P, et al. *Monitoring and adapting endurance training on the basis of heart rate variability monitored by wearable technologies.* 2021. PMID 34489178. https://pubmed.ncbi.nlm.nih.gov/34489178/

---

## 10. Hydration / heat ↔ performance

### Evidence

Meaningful pre-exercise hypohydration can reduce aerobic performance and can impair muscular endurance/strength/power, but effect size depends heavily on dehydration magnitude, environment, induction method, training status, and task.

### Model implication

The app already models heat/environment and heat acclimation. It does **not** infer hydration status from temperature or steps, and it does not impose a universal “2% dehydration” cutoff because it lacks a reliable direct hydration measurement.

If future data provide a reliable hydration input, it could be integrated as another confidence-weighted context signal. Until then, inventing hydration status would be less robust than leaving it unknown.

### Sources

- Goulet EDB. *Impact of Pre-exercise Hypohydration on Aerobic Exercise Performance.* 2020. PMID 31728846. https://pubmed.ncbi.nlm.nih.gov/31728846/
- Savoie FA, et al. *Effect of Hypohydration on Muscle Endurance, Strength, Anaerobic Power and Capacity.* Sports Med. 2015. PMID 26178327. https://pubmed.ncbi.nlm.nih.gov/26178327/

---

## 11. Workload ↔ injury risk

The app uses recent training stress to control recoverability and future interference, but it deliberately does not treat acute:chronic workload ratio as a validated injury-prediction threshold. Methodological reviews have identified major causal/statistical limitations in that use.

### Model implication

Stress budgets answer: **“Is additional training likely to be recoverable/productive?”** They do not answer: **“What is your injury probability?”** Injury prediction remains outside the model.

### Source

- Impellizzeri FM, et al. *Acute:Chronic Workload Ratio: Conceptual Issues and Fundamental Pitfalls.* Sports Med. 2020. PMID 32502973. https://pubmed.ncbi.nlm.nih.gov/32502973/

---

## 12. Relationship map retained from prior model

The audit supports retaining these existing relationships:

- local muscle performance fatigue, systemic fatigue, tissue/soreness, and impact stress are separate channels;
- easy walking can provide aerobic/recovery benefit with low toll, while brisk/hilly/higher-RPE walking costs more;
- activity steps must be entered rather than inferred, so purposeful exercise steps are not double-counted as background load;
- fixed strength/KB anchors remain protected from automatic rest conversion;
- direct exercise performance outranks transfer estimates; cross-exercise transfer is directional and confidence-limited;
- future-schedule interference uses local overlap and session priority;
- active recovery and full rest are distinct, and personal history can weakly favor one when enough evidence exists;
- swim can add low-impact aerobic dose when available, while direct RPE/HR can override a low-fatigue prior;
- optional secondary work receives only partial cadence credit and is removed before primary work when recovery budget becomes questionable;
- background steps, HRV, wearable VO2, HR recovery, and similar weak signals are contextual rather than individually decisive;
- recommendation and dose feedback are confidence-shrunk so a single subjective response nudges rather than rewrites the model.

---

## 13. Things intentionally **not** added

Robustness sometimes means refusing plausible-looking rules:

- **No rigid 80/20 or polarized quota.** Evidence supports substantial easy volume + hard work, not one universal ratio for every athlete/context.
- **No HRV green/red switch.** HRV remains one signal among direct performance, fatigue, sleep, soreness, schedule, and longitudinal context.
- **No universal 48-hour muscle-recovery rule.** Failure/high-volume/novel work may need longer; routine subfailure work can recover faster.
- **No universal fasted-training benefit.** Fasted state is context, not a reason to select cardio.
- **No generic “late workouts are bad” rule.** Bedtime proximity and personal response matter more than a label.
- **No hydration inference from heat or sweat assumptions.** The app has no sufficiently reliable direct hydration input.
- **No wearable-calorie-driven deficit math.** Calories remain reference-only.
- **No ACWR injury threshold.** Stress load is used for recoverability, not injury prophecy.
- **No automatic RED-S diagnosis.** The fueling guard is a conservative performance/recovery watch only.

---

## v36.95 implementation summary

The systems audit changed relationship logic in narrowly defined areas without retuning the normal baseline schedule:

- concurrent spacing/sequence relationship upgraded;
- sleep-domain tie-breaker added without double-counting readiness;
- multi-signal low-energy/fueling Watch suppresses optional extras first;
- generic morning+fasted and generic late-day mode biases removed;
- research provenance expanded for these decisions;
- core cadence, fixed-anchor, pull-up, Barbell Strength, SE, and recommendation-selection functions otherwise remain unchanged.

A 35-date regression on the current saved training state (2026-08-25 through 2026-09-28) produced **zero baseline recommendation/ranking/fatigue mismatches versus v36.94** when no new guard condition required a different action. Synthetic QA separately verified that the new concurrent, sleep, and fueling guardrails activate when their intended conditions are present.
