# Hybrid Training v36.105 — Weak-Link Inference + Full Second-Session Research

## Scope

v36.105 adds two advisory systems:

1. **Repeated movement weak-link inference** — when one strength movement repeatedly feels materially harder than the app predicts while related movements behave normally, the app can form a conservative hypothesis that a secondary/stabilizing demand may be limiting the target movement.
2. **Full second-workout guidance** — after a complete primary workout has already been logged today, the app can rank complete second sessions separately from the existing short smart-secondary/add-on system.

Neither system is a medical diagnostic tool, and neither changes fixed Barbell Strength / KB programming by itself.

## 1. Weak-link inference

### Why this is deliberately conservative

Performance on a compound movement is not a clean assay of one muscle. Technique, skill, range of motion, fatigue, joint tolerance, motivation, grip, trunk control, and prime-mover strength can all change performance. Stabilizing muscles can contribute to joint stiffness through co-contraction and feed-forward/feedback activation, but the literature does **not** justify diagnosing a specific weak stabilizer from a single disappointing set.

A systematic review on stabilizer-muscle characteristics concluded that stabilizers are characterized primarily by biomechanical and neurological roles, including contribution to joint stiffness by co-contraction and early activation around perturbation. That supports modeling secondary/stabilizing demands, but not treating them as directly observable diagnoses from workout data (PMID 25922556).

The app therefore requires a repeated *discordant pattern* rather than one hard exposure.

### Evidence hierarchy in the model

A weak-link hypothesis requires all of the following:

- **Repeated unexpected difficulty** on the target movement. At least two recent exposures must be harder than the prediction model expected, with enough effective evidence weight.
- **Related movements behaving materially better.** Closely related strength movements must have enough history and cannot show the same large positive hardness residual.
- **A secondary demand that distinguishes the target.** The suspected muscle/function must contribute meaningfully to the target but be less demanded by the related comparison movements, or have corroborating direct evidence from exercises that strongly load it.
- **Technique quality cannot be predominantly poor.** If sloppy technique is common, the system does not call a muscle weak because the movement-quality explanation is too plausible.
- **Confidence is capped.** Even a strong pattern is surfaced as a training hypothesis, not a diagnosis.

### Direction matters

The v36.82 calibration system intentionally treats effort-band misses as absolute calibration error. v36.105 adds a separate signed *hardness residual* for weak-link inference:

- positive = harder than predicted;
- zero = within the expected effort band;
- negative = easier than predicted.

This prevents **Too easy** feedback from accidentally becoming evidence of a weak link.

### How the hypothesis affects programming

The app does **not** automatically rewrite fixed programming or append a mandatory corrective exercise. When confidence is moderate/high:

- Dashboard shows the struggling movement, plausible secondary bottleneck, comparison movements, and targeted exercise suggestions;
- adaptive Gym/Calisthenics exercise scoring gets only a **small capped priority boost** for exercises that strongly train the suspected weak link;
- direct performance on those targeted exercises can later strengthen or weaken the hypothesis.

This keeps the system self-correcting: if the suspected biceps limitation in pull-ups improves but pull-up difficulty does not, future evidence can reduce the plausibility of that explanation.

## 2. Full second-workout guidance

### Why this is separate from smart secondary work

A 10–20 minute accessory or recovery add-on is not the same physiological decision as another complete 40–70 minute training session. v36.105 therefore keeps **Full Second Workout** separate from `adaptiveSecondaryBlock` logic. Second-session rows are normal primary-session rows and do not receive secondary cadence credit.

### Research basis for separation and interference

Concurrent strength/endurance research suggests that interference is context-dependent rather than a universal ban on two-a-day training. In trained participants, a meta-analysis found the negative effect on lower-body strength was more pronounced when resistance and endurance work occurred within the **same session** than when they were performed in different sessions (PMID 33751469).

A 9-week same-day concurrent study separated HIIT and resistance training by about **3 hours**. Strength, lean mass, and aerobic-fitness adaptations were broadly maintained, although some power-development outcomes were sensitive to order (PMID 32407361). This supports treating several hours of separation as materially different from immediately stacking modalities, while not claiming that three hours is a universal biological threshold.

A randomized study in resistance-trained men compared one high-volume resistance session with the same volume divided into two sessions separated by **4 hours**. Splitting the volume allowed higher training intensity and accelerated some recovery/performance measures in that specific protocol (PMID 34982021). This is evidence that two resistance sessions in one day can be viable in some contexts—not evidence that extra daily volume is automatically beneficial.

Older concurrent-training meta-analysis also shows that endurance modality, frequency, and duration influence interference (PMID 22002517), which is why v36.105 scores the actual second-session content rather than applying one generic “two workouts = bad” rule.

### What v36.105 scores

After one full workout is logged today, candidate complete sessions are built for:

- Conditioning
- Generic Gym
- Calisthenics
- Strength-Endurance

For each candidate the model considers:

- current rolling cadence need;
- overlap with the exercises already completed today using muscle, tissue, fatigue, and technique relationship channels;
- current local/systemic fatigue and Recovery Guard/Caution;
- interference with the next fixed training anchor;
- whether the same session type would simply be repeated;
- whether the first and second sessions are both strength-oriented;
- elapsed time since the first workout and a contextual separation target.

The separation target is guidance, not a hard physiological cliff:

- roughly **4 h** for strength + strength;
- roughly **3 h** for cross-modal strength/endurance combinations;
- roughly **3.5 h** for repeated non-strength complete sessions.

### When the app says no

The guide does not need to invent a workout just because the user asks what else they *could* do. It explicitly stops recommending a second full workout when:

- Recovery Guard is active;
- modeled local/systemic fatigue is very high;
- all complete second-session options are low-value after cadence/overlap/anchor scoring;
- **two full workouts are already logged today** (the feature does not recommend a third full session).

It may still show the ranked alternatives for context, but the “open full workout” path is disabled when the model is not recommending another complete session.

## Sources

- Sangwan S, Green RA, Taylor NF. *Characteristics of stabilizer muscles: a systematic review.* Physiother Can. PMID **25922556**.
- Schumann M, et al. *Development of Maximal Dynamic Strength During Concurrent Resistance and Endurance Training in Untrained, Moderately Trained, and Trained Individuals: A Systematic Review and Meta-analysis.* PMID **33751469**.
- Lee MJC, et al. *Order of same-day concurrent training influences some indices of power development, but not strength, lean mass, or aerobic fitness...* PLoS One. PMID **32407361**.
- Bartolomei S, et al. *Two vs. One Resistance Exercise Sessions in One Day: Acute Effects on Recovery and Performance.* Res Q Exerc Sport. PMID **34982021**.
- Wilson JM, et al. *Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises.* J Strength Cond Res. PMID **22002517**.

## Guardrails / non-claims

- A weak-link hypothesis is **not** an injury diagnosis, neurological diagnosis, or proof of isolated muscle weakness.
- The app does not infer a weak link from one anomalous workout.
- The app does not force corrective volume simply because a hypothesis exists.
- Several-hour separation is a practical evidence-informed heuristic, not a universal minimum recovery law.
- A second workout is not automatically better than one well-executed workout; the model can recommend stopping after the first session.
